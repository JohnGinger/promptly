'skip ssr'
'use client'

import NoSSR from 'react-no-ssr'

import Chat from '../chat/page'
import Pong from '../pong/page'

export default function Home() {
  return (
    <div className="flex h-screen">
      <NoSSR>
        <div className="w-1/2 bg-blue-500">
          <Chat />
        </div>
        <div className="w-1/2 bg-red-500">
          <Pong />
        </div>
      </NoSSR>
    </div>
  )
}
