'skip ssr'
'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ChatPage({
  setLoading,
  loading,
  message,
  beforeSend,
  onResponse
}: any) {
  const [newMessage, setNewMessage] = useState('')

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
      <div>
        <textarea
          onChange={e => setNewMessage(e.target.value)}
          readOnly={loading}
          id="message"
          className="bg-gray-50 h-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-4 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
