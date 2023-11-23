'skip ssr'
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { validateResponse } from '@/lib/validation'
import { LoadingSpinner } from '../LoadingSpinner'
import { extractJSCode } from '../extractJSCode'
import { PromptEngineeringHints } from '../PromptEngineeringHints'

export default function ChatPage({
  setLoading,
  loading,
  message,
  beforeSend,
  onResponse,
  idealPrompt
}: any) {
  const [newMessage, setNewMessage] = useState('')
  const [hint, setHint] = useState('')
  const [helpMessage, setHelpMessage] = useState('')
  const [helpLoading, setHelpLoading] = useState(false)
  const [completion, setCompletion] = useState('')

  const sendMessage = async () => {
    beforeSend()
    setHint('')
    setHelpMessage('')
    setLoading(true)

    let { completion } = await fetch('https://api.trypromptme.com/', {
      method: 'POST',
      body: JSON.stringify({
        message: `
        ${newMessage} . When responding please exclude the function definition, and only include the body, without the enclosing braces. Absolutely DO NOT include the function definition! Any other text should be as a comment 
        `
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(x => x.json())
    try {
      setHint(validateResponse(completion) ?? '')
      onResponse(completion)
      setCompletion(completion)

      setLoading(false)
    } catch (e) {
      console.error(e)
      console.log('error parsing code')
    }
  }
  const getHelpFromClaude = async () => {
    setHelpLoading(true)
    let { completion } = await fetch('https://api.trypromptme.com/', {
      method: 'POST',
      body: JSON.stringify({
        message: `
          You are a professor and you want to help a student with their Claude prompt engineering.
          The student is using the following prompt:
          <studentPrompt>${newMessage}</studentPrompt>
          And here is a prompt that is not ideal, but gets the job done
          <idealPrompt>${idealPrompt}</idealPrompt>
          Please help the student by suggesting how they can get their closer to the ideal prompt by giving hints.
          Respond in less than two sentences, you should reply as if you are directly talking to the student.
        `
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(x => x.json())
    try {
      setHelpMessage(completion)
      setHelpLoading(false)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div
      className="p-8"
      style={{
        backgroundColor: '#F0F7F6'
      }}
    >
      <Link href="/">
        <div className="text-left text-teal-300 text-5xl font-bold font-sans leading-10 mb-6 pl-3">
          promptme
        </div>
      </Link>
      <div className=" justify-start items-start inline-flex mb-6">
        <div className="p-4   justify-start items-start gap-4 flex">
          {message}
        </div>
      </div>
      {hint && (
        <div
          className="fixed bottom-5 left-5 w-full max-w-xs p-4 text-gray-500 bg-teal-300 rounded-lg shadow dark:bg-gray-800 dark:text-gray-400"
          role="alert"
        >
          <div className="flex">
            <img
              className="w-8 h-8 rounded-full shadow-lg"
              src="/images/mascot.png"
              alt="promptme"
            />
            <div className="ml-3 text-sm font-normal">
              <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                promptme
              </span>
              <div className="mb-2 text-sm font-normal">{hint}</div>
            </div>
            <button
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              data-dismiss-target="#toast-message-cta"
              aria-label="Close"
              onClick={() => setHint('')}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      <div className="flex relative flex-col ">
        <div className="bg-teal-300 p-2 text-white font-bold pl-4">
          Type your prompt to generate code in the box below
        </div>
        <textarea
          className="min-h-[25em] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-4 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-4 bg-white bg-opacity-40 justify-start items-start gap-4 flex  z-10"
          onChange={e => setNewMessage(e.target.value)}
          readOnly={loading}
          id="message"
          placeholder="This gets sent to directly to claude, it doesn't know the question you have been asked to solve"
        />
      </div>

      <div className="w-full flex">
        {!loading && (
          <button
            onClick={async () => {
              sendMessage()
            }}
            className="bg-blue-500 hover:bg-teal-300 text-white font-bold py-2 px-4 rounded mr-2 flex-grow"
            disabled={loading}
          >
            Generate Code
          </button>
        )}
        {!loading && (
          <button
            onClick={async () => {
              getHelpFromClaude()
            }}
            className="bg-slate-400 hover:bg-teal-300 text-white font-bold py-2 px-4 rounded "
            disabled={loading}
          >
            I need help!
          </button>
        )}
      </div>
      <PromptEngineeringHints />
      {completion && !loading && (
        <div className="mt-4 mb-4 border-black bg-white">
          <div className="bg-teal-300 p-2 text-white font-bold pl-4">
            This is the response from the AI
          </div>
          <div className="p-4  bg-slate-300 justify-start items-start gap-4 flex">
            <pre
              style={{
                whiteSpace: 'pre-wrap'
              }}
            >
              {completion}
            </pre>
          </div>
        </div>
      )}

      {helpMessage && (
        <div className=" justify-start items-start gap-4 inline-flex mt-6">
          <img className="h-14" src="/images/mascot.png" />
          <div className="p-4 bg-teal-300 bg-opacity-40 justify-start items-start gap-4 flex">
            {helpMessage}
          </div>
        </div>
      )}
    </div>
  )
}
