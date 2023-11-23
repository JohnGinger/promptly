'use client'

import React, { useEffect, useState } from 'react'
import { CodeBlockContainer } from '../CodeBlockContainer'

export default function MineSweeper({
  response,
  code,
  style,
  board,
  status,
  flagsRemaining
}: {
  response?: any
  code?: any
  style: any
  board: any
  status: string
  flagsRemaining: number
}) {
  return (
    <div className="flex flex-col mt-8 relative " style={style}>
      {flagsRemaining > 0 && (
        <div className=" text-xl font-bold font-sans m-4">
          You still need to flag {flagsRemaining} mines
        </div>
      )}
      {status === 'lost' && (
        <div className="font-bold font-sans m-4 absolute text-6xl text-red-600 top-[3em]">
          You lost!
        </div>
      )}
      {status === 'won' && (
        <div className="font-bold font-sans m-4 absolute text-6xl text-green-600 top-[3em]">
          You won!
        </div>
      )}
      {flagsRemaining < 0 && (
        <div className=" text-xl font-bold font-sans m-4">
          You have flagged {Math.abs(flagsRemaining)} too many mines
        </div>
      )}
      <div className=" border-8 border-solid border-black flex flex-col w-[25rem]">
        {board.map((row: any[], i: number) => {
          return (
            <div className="flex flex-row" key={i}>
              {row.map((cell, i) => {
                return (
                  <div
                    key={i}
                    className="h-10 w-10 border border-solid border-black flex items-center justify-center"
                    style={{
                      backgroundImage:
                        'radial-gradient(rgb(255, 255, 255), rgb(230, 230, 230))'
                    }}
                  >
                    <CellIcon cell={cell} />
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const CellIcon = ({ cell }: { cell: any }) => {
  let flagged = cell[0] === 'flagged'
  let unknown = cell[0] === 'unknown'
  let safe = cell[1] === 'safe'
  if (flagged) {
    return '🚩'
  } else if (unknown) {
    return null
  } else if (safe) {
    return cell[2]
  } else {
    return '💣'
  }
}
