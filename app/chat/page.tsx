'skip ssr'
'use client'

import { useState } from 'react'
import { LoadingSpinner } from '../pong/LoadingSpinner'

export default function ChatPage({
  setLoading,
  loading
}: any) {
  const [newMessage, setNewMessage] = useState('')

  const extractJSContent = (str: string) => {
    const matches = str.match(/<javascript>(.*?)<\/javascript>/)
    return matches ? matches[1] : null
  }

  const sendMessage = async () => {
    // @ts-ignore
    let pongInstance = window.pongInstance
    pongInstance.stop()
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
      // @ts-ignore
      window.Pong.Code = JSON.parse(completion).code
      pongInstance.startSinglePlayer()
      setLoading(false)
    } catch (e) {
      console.log('error parsing code')
    }
  }

  return (
    <div className="p-8">
      <div className="text-left text-teal-300 text-5xl font-bold font-sans leading-10 mb-6">
        promptly
      </div>
      <div className="w-96 h-32 justify-start items-start gap-4 inline-flex">
        <img className="h-14" src="/images/mascot.png" />
        <div className="p-4 bg-teal-300 bg-opacity-40 justify-start items-start gap-4 flex">
          <div className="grow shrink basis-0">
            <span className="text-black text-base font-normal font-sans leading-normal">
              Your{' '}
            </span>
            <span className="text-black text-base font-bold font-sans leading-normal">
              goal
            </span>
            <span className="text-black text-base font-normal font-sans leading-normal">
              {' '}
              is to prompt the paddle up or down and win against the computer.{' '}
            </span>
            <span className="text-black text-base font-normal font-sans leading-normal">
              May the best prompt win.
            </span>
          </div>
        </div>
      </div>
      <div>
        <textarea
          onChange={e => setNewMessage(e.target.value)}
          readOnly={loading}
          onKeyDown={e => {
            if (e.key === 'Enter' && !loading) {
              sendMessage()
            }
          }}
          id="message"
          className="bg-gray-50 h-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-4 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your Prompt"
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
