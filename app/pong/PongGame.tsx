'use client'

import React, { useEffect, useState } from 'react'
import './game'
import './pong'
import { CodeBlock } from 'react-code-blocks'
import { LoadingSpinner } from './LoadingSpinner'

let pongInstance: any = null

export default function PongGame({
  loading,
  style
}: {
  loading: boolean
  style: any
}) {
  // @ts-ignore
  const [code, setCode] = useState()

  const startGame = () => {
    // @ts-ignore
    let game = window.Game

    if (pongInstance === null) {
      console.log('starting game')
      // @ts-ignore
      pongInstance = game.start('game', window.Pong, {
        sound: true,
        stats: false,
        footprints: false,
        predictions: false
      })
      // @ts-ignore
      window.pongInstance = pongInstance

      setTimeout(() => {
        if (pongInstance === null) return
        pongInstance.startSinglePlayer()
        setCode(pongInstance.Code)
      }, 200)
    }
  }

  useEffect(() => {
    if (pongInstance !== null) {
      setCode(pongInstance.Code)
      pongInstance.startSinglePlayer()
    }
    setTimeout(() => {
      startGame()
    }, 200)
  }, [loading])

  return (
    <div className="flex flex-col mt-8" style={style}>
      <div className="max-h-[480px] max-w-[600px]  ">
        <div className="flex flex-row justify-between pl-8 pr-8 align-middle items-center ">
          <div className="w-28 text-center text-black text-lg font-bold font-sans leading-snug">
            You
          </div>
          <div className="w-28 text-center text-black text-lg font-bold font-sans leading-snug">
            The Computer
          </div>
        </div>
        <canvas id="game" className="bg-black	m-4 " />
      </div>
      {pongInstance !== null && <CodeBlockContainer code={code} />}
    </div>
  )
}

const CodeBlockContainer = ({ code }: { code?: string }) => {
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
          <pre>{pongInstance?.Response}</pre>
        </>
      )}
    </div>
  )
}
