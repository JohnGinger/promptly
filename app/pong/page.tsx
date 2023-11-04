'use client'
import React from 'react'
import './pong.css'
import './game'
import './pong'
import { pongCode } from './pong';

export default function PongPage() {

  const [code, setCode] = React.useState('');

  const handleCodeChange = (e: any) => {
    setCode(e.target.value);
    (window as any).Pong.Code = code;
  };

  const startGame = () => {
    // @ts-ignore
    let pong = window.Game.start('game', window.Pong, {
      sound: true,
      stats: false,
      footprints: false,
      predictions: false
    })

    window.pongAI = pong
    setTimeout(() => {
      pong.startSinglePlayer()
    }, 200)
  }
  
  return (
    <>
      <button
        onClick={startGame}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        play
      </button>
      <canvas id="game" />
      <div className='p-4'>
        <textarea value={code} onChange={handleCodeChange} className='w-full p-4 h-60 text-base text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'/>
      </div>
    </>
  )
}
