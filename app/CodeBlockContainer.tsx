'use client'
import React from 'react'
import { CodeBlock } from 'react-code-blocks'

export const CodeBlockContainer = ({
  code,
  response
}: {
  code?: string
  response?: string
}) => {
  return (
    <div className="p-4">
      {code && code?.length > 0 ? (
        <>
          {' '}
          <div className=" text-xl font-bold font-sans ">
            the generated code
          </div>
          <CodeBlock
            text={code}
            language="javascript"
            showLineNumbers={false}
          />
        </>
      ) : (
        <>
          <div className=" text-xl font-bold font-sans ">
            We could not detect any code in the response below, be sure to ask
            to return the code inside &lt;javascript&gt;&lt;/javascript&gt;
          </div>
          <pre>{response}</pre>
        </>
      )}
    </div>
  )
}
