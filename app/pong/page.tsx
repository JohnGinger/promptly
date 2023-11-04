'skip ssr'
'use client'

import NoSSR from 'react-no-ssr'

import Chat from '../chat/page'
import PongGame from './PongGame'

export default function PongPage() {
  return (
    <div className="flex h-screen">
      <NoSSR>
        <div className="w-1/2">
          <Chat />
        </div>
        <div className="w-1/2">
          <PongGame />
        </div>
      </NoSSR>
    </div>
  )
}
