'use client'
import React, { useState } from 'react'
import { Info } from '@phosphor-icons/react'

const Arrow = ({ rotate }: { rotate: boolean }) => {
  return (
    <svg
      className={`w-6 h-6 hover:scale-110 transition-all ${
        rotate && 'rotate-180'
      } `}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 8"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
      />
    </svg>
  )
}

export const PromptEngineeringHints = () => {
  const [expanded, setExpanded] = useState(false)
  return (
    <div>
      <div className=" text-black font-bold pl-4 mt-2 flex">
        <div className="flex flex-row flex-grow p-2 pl-0 align-middle gap-2">
          <Info /> Prompting Tips{' '}
        </div>
        <button onClick={() => setExpanded(!expanded)} className=" p-2	">
          <Arrow rotate={expanded} />
        </button>
      </div>
      {expanded && (
        <ol className="space-y-1  list-decimal list-inside dark:text-gray-400 mb-4 p-4 border-slate-400 border bg-white">
          <li>
            Be clear and direct
            <div className="text-gray-500">
              Show your prompt to a friend and ask them to follow the
              instructions themselves to see whether they produce the exact
              result you’re looking for
            </div>
          </li>
          <li>
            Think step by step{' '}
            <div className="text-gray-500">
              Especially if a task is particularly complex, tell the AI to think
              step by step before it answers. e.g. inside
              &lt;thinking&gt;&lt;/thinking&gt;
            </div>
          </li>
          <li>
            Separate data from instructions
            <div className="text-gray-500">
              When dealing with long documents, always ask your question at the
              bottom of the prompt. Claude puts high importance on the last
              piece of information.
            </div>
          </li>
          <li>
            Put words in Claude’s mouth
            <div className="text-gray-500">
              Start the end of your prompt with the beginning of the response
              you want to generate.
            </div>
          </li>
          <li>
            Use examples{' '}
            <div className="text-gray-500">
              Examples are probably the single most effective tool for getting
              the AI to behave as desired
            </div>
          </li>
          <li>
            Let the AI say it doesn&rsquo;t know
            <div className="text-gray-500">
              Give the AI permission to say it doesn&rsquo;t know the answer to
              a question, so it won&rsquo;t make up an answer
            </div>
          </li>
          <li>
            Assign roles (aka role prompting) / be a hype-man
            <div className="text-gray-500">
              Human:{' '}
              <b>
                You are a master logic bot designed to answer complex logic
                problems.
              </b>{' '}
              Solve this logic puzzle. Assistant: [Gives correct response]
            </div>
          </li>
          <li>
            Use XML tags
            <div className="text-gray-500">
              XML tags &lt;&gt;&lt;/&gt; help the AI understand the prompts
              structure
            </div>
          </li>
        </ol>
      )}
    </div>
  )
}
