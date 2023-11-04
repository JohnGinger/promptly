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
    setLoading(true)

    function extractJSCode(str: string) {
      const matches = str.match(/<javascript>([\s\S]*?)<\/javascript>/);
      return matches ? matches[1] : '';
    }

    let { completion } = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        message: `I have the following skeleton function

        <code>
          // ball_positions is an array of ball positions in (x,y) co-ordinates, with the last element in the array being the current position
        
          // paddle_y is the y coordinate of the center of the paddle
          
          // This function returns either 
          // 1 - the paddle should move up
          // 0 - the paddle should stay where it is
          // -1 - the paddle should move down}
        <code>
        
        ${newMessage}
        
        Please return the code in the following format, on one line, without the function definition <javascript>CODE_WITHOUT_COMMENTS_OR_FORMATTING</javascript>
        
        This is very important to me and I reallly appreciate you helping me out with this.
        `
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(x => x.json())
    try {
      // @ts-ignore
      console.log('🚀 ~ file: page.tsx:54 ~ completion:', completion)
      console.log('🚀 ~ file: page.tsx:54 ~ completion:', extractJSCode(completion));
      const parsed = extractJSCode(completion)?.replace(/\\n/g, '');
      console.log('🚀 ~ file: page.tsx:55 ~ parsed:', parsed)
      window.Pong.Code = extractJSCode(completion)?.replace(/\\n/g, '');
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
      <div className=" text-xl font-bold font-sans mt-4">
        The 7 rules of prompt engineering
      </div>
      
    </div>
  )
}
