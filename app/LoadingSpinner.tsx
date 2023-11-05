'use client'
import React from 'react'

export const LoadingSpinner = () => {
  return (
    <div className="w-full h-full flex align-middle justify-center content-center flex-wrap">
      <img className="w-40 h-40 animate-pulse" src="/images/mascot.png" />
    </div>
  )
}
