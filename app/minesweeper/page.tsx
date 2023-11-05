'skip ssr'
'use client'

import NoSSR from 'react-no-ssr'

import Chat from '../chat/page'
import MineSweeper from './Minesweeper'
import { useEffect, useState } from 'react'
import { LoadingSpinner } from '../LoadingSpinner'
import { extractJSCode } from '../extractJSCode'

function createMinesweeperBoard(size: number, numberOfMines: number) {
  // Initialize the board with 'unknown' and 'safe' for all cells
  let board = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ['unknown', 'safe'])
  )

  // Helper function to generate random integer within a range
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  // Place mines in random locations on the board
  let minesPlaced = 0
  while (minesPlaced < numberOfMines) {
    let row = getRandomInt(size)
    let col = getRandomInt(size)

    // Only place a mine if the cell is currently 'safe'
    if (board[row][col][1] === 'safe') {
      board[row][col][1] = 'mine'
      minesPlaced++
    }
  }

  return board
}

function countAdjacentMines(board: any[]) {
  const size = board.length

  // Helper function to check if a given cell is within the grid bounds
  function isInBounds(x: number, y: number) {
    return x >= 0 && x < size && y >= 0 && y < size
  }

  // Helper function to count mines around a given cell
  function countMines(x: number, y: number) {
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1], // top row
      [0, -1],
      /* current cell */ [0, 1], // middle row
      [1, -1],
      [1, 0],
      [1, 1] // bottom row
    ]

    let mineCount = 0

    directions.forEach(([dx, dy]) => {
      const newX = x + dx
      const newY = y + dy
      if (isInBounds(newX, newY) && board[newX][newY][1] === 'mine') {
        mineCount++
      }
    })

    return mineCount
  }

  // Iterate over each cell to find and set the count of adjacent mines
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (board[x][y][1] === 'safe') {
        // Only calculate for safe cells; mines don't need a count
        const mines = countMines(x, y)
        if (mines > 0) {
          board[x][y].push(mines) // Append the mine count to the cell
        }
      }
    }
  }

  return board
}

function countFlaggedSquares(board: string | any[]) {
  let flaggedCount = 0
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col][0] === 'flagged') {
        flaggedCount++
      }
    }
  }
  return flaggedCount
}

function gameWon(board: string | any[]) {
  // Check if all mines are flagged
  let flaggedCount = countFlaggedSquares(board)
  if (flaggedCount !== 20) {
    return false
  }

  // Check if all safe cells are revealed
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (
        board[row][col][0] !== 'flagged' &&
        board[row][col][1] === 'safe' &&
        board[row][col][2] === 'unknown'
      ) {
        return false
      }
    }
  }

  return true
}

export default function MineSweeperPage() {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState('this is a great response')
  const [code, setCode] = useState('//this is great code')
  const [board, setBoard] = useState<string[][][]>(
    createMinesweeperBoard(10, 20)
  )
  const [status, setStatus] = useState('playing')
  const [flagsRemaining, setFlagsRemaining] = useState(20)

  useEffect(() => {
    let board = createMinesweeperBoard(10, 20)
    board = countAdjacentMines(board)
    setBoard(board)
  }, [code])

  return (
    <div className="flex h-screen">
      <NoSSR>
        <div className="w-1/2">
          <Chat
            setLoading={setLoading}
            loading={loading}
            beforeSend={() => {}}
            onResponse={(completion: any) => {
              setResponse(completion)
              const parsed = extractJSCode(completion)
              console.log('parsed', parsed)
              setCode(parsed)

              try {
                let func = new Function('board', parsed)
                let interval = setInterval(() => {
                  const action = func(board)

                  const x = action[0]
                  const y = action[1]
                  const actionType = action[2]

                  setBoard(board => {
                    let newBoard = JSON.parse(JSON.stringify(board))
                    if (actionType === 'flag') {
                      newBoard[y][x][0] = 'flagged'
                    } else {
                      newBoard[y][x][0] = 'known'
                      if (newBoard[y][x][1] === 'mine') {
                        setStatus('lost')
                        clearInterval(interval)
                      }
                    }
                    const flagsRemaining = 20 - countFlaggedSquares(newBoard)
                    setFlagsRemaining(flagsRemaining)
                    if (gameWon(newBoard)) {
                      setStatus('won')
                      clearInterval(interval)
                    }
                    return newBoard
                  })
                }, 200)
              } catch (e) {
                console.log(e)
              }
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
                  is to win the game of minesweeper. To win you need to write a
                  program to flag all of the mines without clicking on any.
                </span>
                <p className="text-black text-base  font-sans leading-normal">
                  You need to write a javascript function <b>body</b> with the
                  input <b>squares</b> This is an array of arrays of integers.
                  e.g. [ [ [&apos;unknown&apos;], [&apos;flagged&apos;], [2], ... ], [ [&apos;unknown&apos;],
                  [&apos;flagged&apos;], [2], ... ], ... [ [[&apos;unknown&apos;], [&apos;flagged&apos;], [2],
                  ... ]] ]
                </p>
                <p>
                  The function returns an array of the form [x, y, &apos;flag|click&apos;]
                </p>
              </div>
            }
          />
        </div>
        <div className="w-1/2">
          {loading && <LoadingSpinner />}
          <MineSweeper
            response={response}
            code={code}
            style={{ visibility: loading ? 'hidden' : 'initial' }}
            board={board}
            status={status}
            flagsRemaining={flagsRemaining}
          />
        </div>
      </NoSSR>
    </div>
  )
}
