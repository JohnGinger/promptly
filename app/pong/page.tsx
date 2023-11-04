'use client'
import './pong.css'
import './game'
import './pong'

export default function PongPage() {
  const startGame = () => {
    let pong = window.Game.start('game', window.Pong, {
      sound: true,
      stats: false,
      footprints: false,
      predictions: false
    })
    setTimeout(() => {
      pong.startSinglePlayer()
    }, 200)
    window.pongTest = pong
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
    </>
  )
}
