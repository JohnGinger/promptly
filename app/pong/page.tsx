'skip ssr'
'use client'

import NoSSR from 'react-no-ssr'

import Chat from '../chat/page'
import PongGame from './PongGame'
import { useState } from 'react'

export default function PongPage() {
  const [loading, setLoading] = useState(false)
  return (
    <div className="flex h-screen">
      <NoSSR>
        <div className="w-1/2">
          <Chat setLoading={setLoading} />
        </div>
        <div className="w-1/2">
          <PongGame loading={loading} />
        </div>
      </NoSSR>
    </div>
  )
}
