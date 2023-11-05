'skip ssr'
'use client'

import NoSSR from 'react-no-ssr'

import Chat from '../chat/page'
import PongGame from './PongGame'
import { useState } from 'react'
import { LoadingSpinner } from './LoadingSpinner'

export default function PongPage() {
  const [loading, setLoading] = useState(false)
  return (
    <div className="flex h-screen">
      <NoSSR>
        <div className="w-1/2">
          <Chat setLoading={setLoading} loading={loading} />
        </div>
        <div className="w-1/2">
          {loading && <LoadingSpinner />}
          <PongGame loading={loading} style={{'visibility': loading ? 'hidden' : 'initial'}}/>
        </div>
      </NoSSR>
    </div>
  )
}
