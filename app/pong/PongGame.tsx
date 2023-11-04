'use client'

import React, { useEffect, useState } from 'react'
import './game'
import './pong'
import { CodeBlock } from 'react-code-blocks'

let pongInstance: any = null

export default function PongGame() {
  // @ts-ignore
  const [code, setCode] = useState()

  useEffect(() => {
    // Event handler for code changes
    function handleCodeChange(e: any) {
      setCode(e.detail)
    }

    // Add event listener for the custom event
    window.addEventListener('codeChange', handleCodeChange)

    // Remove event listener on cleanup
    return () => window.removeEventListener('codeChange', handleCodeChange)
  }, []) // Empty array ensures that effect is only run on mount and unmount

  const handleCodeChange = (e: any) => {
    setCode(e.target.value)
  }

  const startGame = () => {
    // @ts-ignore
    let game = window.Game

    if (pongInstance === null) {
      // @ts-ignore
      pongInstance = game.start('game', window.Pong, {
        sound: true,
        stats: false,
        footprints: false,
        predictions: false
      })

      setTimeout(() => {
        if (pongInstance === null) return
        pongInstance.startSinglePlayer()
        setCode(pongInstance.Code)
      }, 200)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      startGame()
    }, 200)
  }, [])

  return (
    <div className="flex flex-col mt-8">
      <div className="flex flex-row justify-between pl-8 pr-8 align-middle items-center">
        <div className="w-28 text-center text-black text-lg font-bold font-sans leading-snug">
          You
        </div>
        <div className="w-28 text-center text-black text-lg font-bold font-sans leading-snug">
          The Computer
        </div>
      </div>
      <canvas id="game" className="bg-black	m-4" />
      <div className="p-4">
        <div className=" text-xl font-bold font-sans ">the generated code</div>
        <CodeBlock text={code} language="javascript" showLineNumbers={false} />
      </div>
    </div>
  )
}
