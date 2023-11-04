'use client'

import React, { useEffect, useState } from 'react'
import './pong.css'
import './game'
import './pong'

let pongInstance: any = null

export default function PongPage() {
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
      console.log('starting game')
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
    <>
      <canvas id="game" />
      <div className="p-4">
        {/* <textarea
          value={code}
          onChange={handleCodeChange}
          style={{ display: 'block' }}
          className="w-full p-4 h-60 text-base text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        /> */}
        {/* <button
          onClick={() => {
            if (pongInstance === null) return
            // @ts-ignore
            window.Pong.Code = code
            pongInstance.stop()
            pongInstance.startSinglePlayer()
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          update
        </button> */}
      </div>
    </>
  )
}
