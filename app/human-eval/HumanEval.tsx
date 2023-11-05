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
  return (
    <div className="flex flex-col mt-8" style={style}>
      <div className=" text-xl font-bold font-sans mt-4">Test results</div>
      <div className="mb-2">
        generate_integers(2, 10){' '}
        {testResults[0] != null ? (testResults[0] ? '✅' : '❌') : '❓'}
        <div className="text-gray-700 ml-4">Response is {testResponses[0]}</div>
        <div className="text-gray-700 ml-4">Expected 2,4,6,8</div>
      </div>
      <div className="mb-2">
        generate_integers(10, 2){' '}
        {testResults[1] != null ? (testResults[1] ? '✅' : '❌') : '❓'}
        <div className="text-gray-700 ml-4">Response is {testResponses[1]}</div>
        <div className="text-gray-700 ml-4">Expected 2,4,6,8</div>
      </div>
      <div className="mb-2">
        generate_integers(132, 2){' '}
        {testResults[2] != null ? (testResults[2] ? '✅' : '❌') : '❓'}
        <div className="text-gray-700 ml-4">Response is {testResponses[2]}</div>
        <div className="text-gray-700 ml-4">Expected 2,4,6,8</div>
      </div>
      <div className="mb-2">
        generate_integers(17,89){' '}
        {testResults[3] != null ? (testResults[3] ? '✅' : '❌') : '❓'}
        <div className="text-gray-700 ml-4">Response is {testResponses[3]}</div>
        <div className="text-gray-700 ml-4">Expected empty list</div>
      </div>

      {response !== null && (
        <CodeBlockContainer code={code} response={response} />
      )}
    </div>
  )
}
