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
            beforeSend={() => {}}
            onResponse={(completion: any) => {
              setResponse(completion)
              const parsed = extractJSCode(completion)
              console.log('parsed', parsed)
              setCode(parsed)
              try {
                let func = new Function('a', 'b', parsed)

                let responses = [
                  func(2, 10),
                  func(10, 2),
                  func(132, 2),
                  func(17, 89)
                ]
                console.log('responses', responses)
                setTestResponses(responses.map(x => x.join(',')))

                setTestResults([
                  responses[0].join('') === '2468',
                  responses[1].join('') === '2468',
                  responses[2].join('') === '2468',
                  responses[3].join('') === ''
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
                  is when given two positive integers a and b, return the even
                  digits between a and b, in ascending order.
                </span>
                <p>For example:</p>
                <p>generate_integers(2, 8) =&gt; [2, 4, 6, 8]</p>
                <p>generate_integers(8, 2) =&gt; [2, 4, 6, 8]</p>
                <p>generate_integers(10, 14) =&gt; [] </p>
              </div>
            }
            idealPrompt={`Write me a js function that plays pong. if ball_y is above paddle_y, return 1, otherwise, if ball_y is below return -1, else return 0. You should include the code in between <javascript></javascript> tags, do not include the function definition, only the body`}
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
