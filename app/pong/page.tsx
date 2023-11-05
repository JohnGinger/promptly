'skip ssr'
'use client'

import NoSSR from 'react-no-ssr'

import Chat from '../chat/page'
import PongGame from './PongGame'
import { useState } from 'react'
import { LoadingSpinner } from '../LoadingSpinner'
import { extractJSCode } from '../extractJSCode'

export default function PongPage() {
  const [loading, setLoading] = useState(false)
  return (
    <div className="flex h-screen">
      <NoSSR>
        <div className="w-1/2">
          <Chat
            setLoading={setLoading}
            loading={loading}
            beforeSend={() => {
              // @ts-ignore
              let pongInstance = window.pongInstance
              pongInstance.stop()
              pongInstance = null
            }}
            onResponse={(completion: any) => {
              // @ts-ignore
              window.Pong.Response = completion
              const parsed = extractJSCode(completion)
              // @ts-ignore
              window.Pong.Code = parsed
            }}
            message={
              <div className="grow shrink basis-0">
                <span className="text-black text-base font-normal font-sans leading-normal">
                  Your{' '}
                </span>
                <span className="text-black text-base font-bold font-sans leading-normal">
                  goal
                </span>
                <span className="text-black text-base font-normal font-sans leading-normal">
                  {' '}
                  is to prompt the paddle up or down and win against the
                  computer.{' '}
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
                  <b>ball_dx</b> The change in ball x position in the last time
                  step
                </p>
                <p>
                  <b>ball_dy</b> The change in ball y position in the last time
                  step
                </p>
                <p>
                  <b>dt</b> The length of the last timestep
                </p>
                <p>
                  <b>paddle_y</b> is the y coordinate of the center of the
                  paddle
                </p>
                <p>
                  The function returns either 1 - the paddle should move up 0 -
                  the paddle should stay where it is -1 - the paddle should move
                  down
                </p>
                <span className="text-black text-base font-normal font-sans leading-normal">
                  May the best prompt win.
                </span>
              </div>
            }
            idealPrompt={`Write me a js function that plays pong. if ball_y is above paddle_y, return 1, otherwise, if ball_y is below return -1, else return 0. You should include the code in between <javascript></javascript> tags, do not include the function definition, only the body`}
          />
        </div>
        <div className="w-1/2">
          {loading && <LoadingSpinner />}
          <PongGame
            loading={loading}
            style={{ visibility: loading ? 'hidden' : 'initial' }}
          />
        </div>
      </NoSSR>
    </div>
  )
}
