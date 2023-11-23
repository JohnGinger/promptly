'use client'
import React, { useState } from 'react'

export const PromptEngineeringHints = () => {
  const [expanded, setExpanded] = useState(false)
  return (
    <div>
      <div className="bg-slate-400  text-white font-bold pl-4 mt-2 flex">
        <div className='flex-grow p-2 pl-0'>9 hints to prompt engineering</div>
        <button onClick={() => setExpanded(!expanded)} className='hover:bg-teal-400 p-2'>
          {expanded ? 'Hide' : 'Show'}
        </button>
      </div>
      {expanded && (
        <ol className="space-y-1  list-decimal list-inside dark:text-gray-400 mb-4 p-4 border-slate-400 border bg-white">
          <li>
            “Human:” / “Assistant:” formatting
            <div className="text-gray-500">
              For any API prompt, you must start with “\n\nHuman:” and end with
              “\n\nAssistant:”
            </div>
          </li>
          <li>
            Be clear and direct
            <div className="text-gray-500">
              Show your prompt to a friend and ask them to follow the
              instructions themselves to see whether they produce the exact
              result you’re looking for
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
          <li>
            Separate data from instructions
            <div className="text-gray-500">
              When dealing with long documents, always ask your question at the
              bottom of the prompt.
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
            Think step by step{' '}
            <div className="text-gray-500">
              Especially if a task is particularly complex, tell the AI to think
              step by step before it answers. e.g. inside
              &lt;thinking&gt;&lt;/thinking&gt;
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
        </ol>
      )}
    </div>
  )
}
