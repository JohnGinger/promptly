'use client'

import React, { useEffect, useState } from 'react'
import './game'
import './pong'
import { CodeBlock } from 'react-code-blocks'
import { LoadingSpinner } from '../LoadingSpinner'
import { CodeBlockContainer } from '../CodeBlockContainer'
import { PromptEngineeringHints } from '../PromptEngineeringHints'
import './pongFont.css'

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
      <div className="text-left text-teal-300 text-5xl font-bold font-sans leading-10 mb-6 pl-6 ">
        simulator
      </div>
      <div className="flex flex-row justify-between pl-8 pr-8 align-middle items-center ">
        <button
          // @ts-ignore
          onClick={() => window.pongInstance.startSinglePlayer()}
          className="btn"
        >
          Restart
        </button>
      </div>
      <div className="relative  m-[16px]">
        <canvas id="game" className="bg-black absolute left-0 top-0 w-full " />

        <div className="text-white absolute left-32 top-8 text-3xl font-bold pongFont">
          You
        </div>
        <div className="text-white absolute right-32 top-8 text-3xl font-bold pongFont">
          AI
        </div>
      </div>
    </div>
  )
}
