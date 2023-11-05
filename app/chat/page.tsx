'skip ssr'
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { validateResponse } from '@/lib/validation'

export default function ChatPage({
  setLoading,
  loading,
  message,
  beforeSend,
  onResponse
}: any) {
  const [newMessage, setNewMessage] = useState('')
  const [hint, setHint] = useState('');

  const sendMessage = async () => {
    beforeSend()
    setLoading(true)

    let { completion } = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        message: newMessage
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(x => x.json())
    try {
      setHint(validateResponse(completion) ?? '');
      onResponse(completion)
      setLoading(false)
    } catch (e) {
      console.error(e)
      console.log('error parsing code')
    }
  }

  return (
    <div className="p-8">
      <Link href="/">
        <div className="text-left text-teal-300 text-5xl font-bold font-sans leading-10 mb-6">
          promptly
        </div>
      </Link>
      <div className=" justify-start items-start gap-4 inline-flex mb-6">
        <img className="h-14" src="/images/mascot.png" />
        <div className="p-4 bg-teal-300 bg-opacity-40 justify-start items-start gap-4 flex">
          {message}
        </div>
      </div>
      {hint &&
        <div className="fixed bottom-5 left-5 w-full max-w-xs p-4 text-gray-500 bg-teal-300 rounded-lg shadow dark:bg-gray-800 dark:text-gray-400" role="alert">
            <div className="flex">
                <img className="w-8 h-8 rounded-full shadow-lg" src="/images/mascot.png" alt="Promptly"/>
                <div className="ml-3 text-sm font-normal">
                    <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Promptly</span>
                    <div className="mb-2 text-sm font-normal">{hint}</div> 
                </div>
                <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-message-cta" aria-label="Close" onClick={() => setHint('')}>
                    <span className="sr-only">Close</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
            </div>
        </div>

      }
      <div>
        <textarea
          onChange={e => setNewMessage(e.target.value)}
          readOnly={loading}
          id="message"
          className="bg-gray-50 min-h-[25em] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-4 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your prompt here"
        />
      </div>

      {!loading && (
        <button
          onClick={async () => {
            sendMessage()
          }}
          className="bg-blue-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded "
          disabled={loading}
        >
          Generate Code
        </button>
      )}
    </div>
  )
}
