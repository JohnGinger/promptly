'skip ssr'
'use client'

import { useState } from 'react'
import { LoadingSpinner } from '../pong/LoadingSpinner'

export default function ChatPage({ setLoading, loading }: any) {
  const [newMessage, setNewMessage] = useState('')

  const sendMessage = async () => {
    // @ts-ignore
    let pongInstance = window.pongInstance
    pongInstance.stop()
    pongInstance = null
    setLoading(true)

    function extractJSCode(str: string) {
      const matches = str.match(/<javascript>([\s\S]*?)<\/javascript>/)
      return matches ? matches[1] : ''
    }

    let { completion } = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        message: `
        <code>
        
        ${newMessage}
  
        `
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(x => x.json())
    try {
      window.Pong.Response = completion
      const parsed = extractJSCode(completion)
      // @ts-ignore
      window.Pong.Code = parsed
      // @ts-ignore

      // pongInstance.startSinglePlayer()
      setLoading(false)
    } catch (e) {
      console.error(e)
      console.log('error parsing code')
    }
  }

  return (
    <div className="p-8">
      <div className="text-left text-teal-300 text-5xl font-bold font-sans leading-10 mb-6">
        promptly
      </div>
      <div className=" justify-start items-start gap-4 inline-flex mb-6">
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
            <p className="text-black text-base  font-sans leading-normal">
              You need to write a javascript function <b>body</b> with the
              following inputs:
            </p>
            <p>
              <b>ball_x</b> The ball x position
            </p>
            <p>
              <b>ball_y</b> The ball y position
            </p>
            <p>
              <b>ball_dx</b> The change in ball x position in the last time step
            </p>
            <p>
              <b>ball_dy</b> The change in ball y position in the last time step
            </p>
            <p>
              <b>dt</b> The length of the last timestep
            </p>
            <p>
              <b>paddle_y</b> is the y coordinate of the center of the paddle
            </p>
            <p>
              The function returns either 1 - the paddle should move up 0 - the
              paddle should stay where it is -1 - the paddle should move down
            </p>
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
      <div className=" text-xl font-bold font-sans mt-4">
        The 7 rules of prompt engineering
      </div>
    </div>
  )
}
