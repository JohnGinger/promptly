'skip ssr'
'use client'

import NoSSR from 'react-no-ssr'

import Chat from '../chat/page'
import HumanEval from './HumanEval'
import { useState } from 'react'
import { LoadingSpinner } from '../LoadingSpinner'
import { extractJSCode } from '../extractJSCode'

export default function HumanEvalPage() {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [code, setCode] = useState('')
  const [testResults, setTestResults] = useState<Array<boolean | null>>([
    null,
    null,
    null,
    null
  ])
  const [testResponses, setTestResponses] = useState(['', '', '', ''])
  return (
    <div className="flex h-screen">
      <NoSSR>
        <div className="w-1/2">
          <Chat
            setLoading={setLoading}
            loading={loading}
            beforeSend={() => {
              setTestResponses([])
              setTestResults([])
            }}
            onResponse={(completion: any) => {
              setResponse(completion)
              const parsed = extractJSCode(completion)
              console.log('parsed', parsed)
              setCode(parsed)
              try {
                let func = new Function('list', parsed)

// Your goal is to write a function that accepts a list of strings as a parameter, deletes the strings that have odd lengths from it, and returns the resulted list with a sorted order,
// The list is always a list of strings and never an array of numbers, and it may contain duplicates.

// The order of the list should be ascending by length of each word, and you should return the list sorted by that rule.

// If two words have the same length, sort the list alphabetically.

// The function should return a list of strings in sorted order, using standard compare, NOT localCompare.  Return uppercase BEFORE lowercase, all other things being equal.

// You may assume that all words will have the same length.

// For example: sorted_list_sum(["aa", "a", "aaa"]) => ["aa"] sorted_list_sum(["ab", "a", "aaa", "cd"]) => ["ab", "cd"]

// THE FOLLOWING TWO EXAMPLES ARE VERY IMPORTANT, IT MUST WORK FOR BOTH
// sorted_list_sum(['aaaa', 'bbbb', 'dd', 'cc']) => ['cc','dd','aaaa','bbbb']
// sorted_list_sum(['AI', 'ai', 'au']) => ['AI','ai','au']

// Implement the function in Javascript, bracketed in <javascript> tags. Only implement AND RETURN the function body. Pay very close attention to the next instruction: you MUST OMIT the function header, you must not return a variable.

// For example:
// BAD:
// let sortedList = list => { ...the_code }
// GOOD:
// return the_code

                let responses = [
                  func(["aa", "a", "aaa"]),
                  func(["school", "AI", "asdf", "b"]),
                  func(["d", "b", "c", "a"]),
                  func(["d", "dcba", "abcd", "a"]),
                  func(["AI", "ai", "au"]),
                  func(["a", "b", "b", "c", "c", "a"]),
                  func(['aaaa', 'bbbb', 'dd', 'cc'])
                ]
                console.log('responses', responses)
                setTestResponses(responses.map(x => x.join(',')))

                setTestResults([
                  responses[0].join(',') === 'aa',
                  responses[1].join(',') === 'AI,asdf,school',
                  responses[2].join(',') === '',
                  responses[3].join(',') === 'abcd,dcba',
                  responses[4].join(',') === 'AI,ai,au',
                  responses[5].join(',') === '',
                  responses[6].join(',') === 'cc,dd,aaaa,bbbb'
                ])
              } catch (e) {
                console.warn(e)
              }
            }}
            message={
              <div className="grow shrink basis-0">
                <span className="text-black text-base font-normal font-sans leading-normal">
                  Your{' '}
                </span>
                <span className="text-black text-base font-bold font-sans leading-normal">
                  goal
                </span>
                <span className="text-black text-base font-normal font-sans leading-normal">
                  {' '}
                  is to write a function that accepts a list of strings as a parameter, 
    deletes the strings that have odd lengths from it,
    and returns the resulted list with a sorted order,
    </span>
    <p>
    The list is always a list of strings and never an array of numbers,
    and it may contain duplicates. </p>
    <p>The order of the list should be ascending by length of each word, and you 
    should return the list sorted by that rule.</p>
    <p>If two words have the same length, sort the list alphabetically.</p>
    <p>The function should return a list of strings in sorted order.</p>
    <p>You may assume that all words will have the same length.</p>
    <p>For example:
    sorted_list_sum([&quot;aa&quot;, &quot;a&quot;, &quot;aaa&quot;]) =&gt; [&quot;aa&quot;] 
    sorted_list_sum([&quot;ab&quot;, &quot;a&quot;, &quot;aaa&quot;, &quot;cd&quot;]) =&gt; [&quot;ab&quot;, &quot;cd&quot;]</p>
 
              </div>
            }
          />
        </div>
        <div className="w-1/2">
          {loading && <LoadingSpinner />}
          <HumanEval
            response={response}
            code={code}
            style={{ visibility: loading ? 'hidden' : 'initial' }}
            testResults={testResults}
            testResponses={testResponses}
          />
        </div>
      </NoSSR>
    </div>
  )
}
