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
    <div className="flex flex-col lg:flex-row lg:h-screen">
      <NoSSR>
        <div className="w-full lg:overflow-scroll lg:h-screen">
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
              // @ts-ignore
              window.Pong.Code = completion
            }}
            message={
              <div className="grow shrink basis-0">
                <p className="text-black text-2xl font-bold font-sanas leading-9">
                  to win a game of pong
                </p>
                <br />
                <p className="text-black text-base  font-sans leading-normal">
                  Write a prompt that will make claude describe a function body
                  to move the paddle up or down, keep in mind:
                </p>
                <br />
                {/* <p>
                  <b>ball_x</b> The ball x position
                </p> */}
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
                {/* <p>
                  <b>dt</b> The length of the last timestep
                </p> */}
                <p>
                  <b>paddle_y</b> is the y coordinate of the center of the
                  paddle
                </p>
                <br />
                <p>
                  The function returns either 1 - the paddle should move up 0 -
                  the paddle should stay where it is -1 - the paddle should move
                  down
                </p>
              </div>
            }
            idealPrompt={`Write me a js function that plays pong. if ball_y is above paddle_y, return 1, otherwise, if ball_y is below return -1, else return 0. You should include the code in between <javascript></javascript> tags, do not include the function definition, only the body`}
          />
        </div>
        <div className="w-full min-h-screen">
          {loading && <LoadingSpinner />}
          <PongGame
            loading={loading}
            style={{ visibility: loading ? 'hidden' : 'initial' }}
          />
        </div>
        <div className="lg:absolute bottom-0 right-0 p-4 bg-white ">
          💬 What do you think? Let us know at feedback@trypromptme.com
        </div>
      </NoSSR>
    </div>
  )
}
