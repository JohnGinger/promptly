'use client'

import React, { useEffect, useState } from 'react'
import { CodeBlockContainer } from '../CodeBlockContainer'
import { PromptEngineeringHints } from '../PromptEngineeringHints'

export let pongInstance: any = null

export default function HumanEval({
  response,
  code,
  style,
  testResults,
  testResponses
}: {
  response?: any
  code?: any
  style: any
  testResults: any
  testResponses: any
}) {
  // # Check some simple cases
  // assert candidate(["aa", "a", "aaa"]) == ["aa"]
  // assert candidate(["school", "AI", "asdf", "b"]) == ["AI", "asdf", "school"]
  // assert candidate(["d", "b", "c", "a"]) == []
  // assert candidate(["d", "dcba", "abcd", "a"]) == ["abcd", "dcba"]

  // # Check some edge cases that are easy to work out by hand.
  // assert candidate(["AI", "ai", "au"]) == ["AI", "ai", "au"]
  // assert candidate(["a", "b", "b", "c", "c", "a"]) == []
  // assert candidate(['aaaa', 'bbbb', 'dd', 'cc']) == ["cc", "dd", "aaaa", "bbbb"]

  return (
    <div className="flex flex-col mt-8 p-10" style={style}>
      <div className=" text-xl font-bold font-sans mt-4">Test results</div>
      <div className="mb-2">
        sorted_list_sum([&quot;aa&quot;, &quot;a&quot;, &quot;aaa&quot;]){' '}
        {testResults[0] != null ? (testResults[0] ? '✅' : '❌') : '❓'}
        <div className="text-gray-700 ml-4">Response is {testResponses[0]}</div>
        <div className="text-gray-700 ml-4">Expected aa</div>
      </div>
      <div className="mb-2">
        sorted_list_sum([&quot;school&quot;, &quot;AI&quot;, &quot;asdf&quot;, &quot;b&quot;]){' '}
        {testResults[1] != null ? (testResults[1] ? '✅' : '❌') : '❓'}
        <div className="text-gray-700 ml-4">Response is {testResponses[1]}</div>
        <div className="text-gray-700 ml-4">
          Expected AI,asdf,school
        </div>
      </div>
      <div className="mb-2">
        sorted_list_sum([&quot;d&quot;, &quot;b&quot;, &quot;c&quot;, &quot;a&quot;]){' '}
        {testResults[2] != null ? (testResults[2] ? '✅' : '❌') : '❓'}
        <div className="text-gray-700 ml-4">Response is {testResponses[2]}</div>
        <div className="text-gray-700 ml-4">Expected empty list</div>
      </div>
      <div className="mb-2">
        sorted_list_sum([&quot;d&quot;, &quot;dcba&quot;, &quot;abcd&quot;, &quot;a&quot;]){' '}
        {testResults[3] != null ? (testResults[3] ? '✅' : '❌') : '❓'}
        <div className="text-gray-700 ml-4">Response is {testResponses[3]}</div>
        <div className="text-gray-700 ml-4">Expected abcd,dcba</div>
      </div>
      <div className="mb-2">
        sorted_list_sum([&quot;AI&quot;, &quot;ai&quot;, &quot;au&quot;]){' '}
        {testResults[4] != null ? (testResults[4] ? '✅' : '❌') : '❓'}
        <div className="text-gray-700 ml-4">Response is {testResponses[4]}</div>
        <div className="text-gray-700 ml-4">Expected AI,ai,au</div>
      </div>
      <div className="mb-2">
        sorted_list_sum([&quot;a&quot;, &quot;b&quot;, &quot;b&quot;, &quot;c&quot;, &quot;c&quot;, &quot;a&quot;]){' '}
        {testResults[5] != null ? (testResults[5] ? '✅' : '❌') : '❓'}
        <div className="text-gray-700 ml-4">Response is {testResponses[5]}</div>
        <div className="text-gray-700 ml-4">Expected empty list</div>
      </div>
      <div className="mb-2">
        sorted_list_sum([&quot;aaaa&quot;, &quot;bbbb&quot;, &quot;dd&quot;, &quot;cc&quot;]){' '}
        {testResults[6] != null ? (testResults[6] ? '✅' : '❌') : '❓'}
        <div className="text-gray-700 ml-4">Response is {testResponses[6]}</div>
        <div className="text-gray-700 ml-4">
          Expected cc,dd,aaaa,bbbb
        </div>
      </div>

      {response !== null && (
        <CodeBlockContainer code={code} response={response} />
      )}
    </div>
  )
}
