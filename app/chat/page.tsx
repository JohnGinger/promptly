'use client'
import { useState } from 'react'

export default function ChatPage() {
  const [messages, setMessages] = useState([''])
  const [newMessage, setNewMessage] = useState('')

  const sendMessage = async () => {
    // send a post request to the server
    let { completion } = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        message: newMessage
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(x => x.json())
    setMessages([...messages, completion]);
    try {
      // (window as any).Pong.Code = JSON.parse(completion).code;
      const event = new CustomEvent('codeChange', { detail: JSON.parse(completion).code });
      window.dispatchEvent(event);
    } catch (e) {
      console.log('error parsing code');
    }
    setNewMessage('')
  }

  return (
    <div>
      {messages.map(message => {
        return <div key={message}>{message}</div>
      })}
      <div>
        <input
          onChange={e => setNewMessage(e.target.value)}
          type="text"
          id="message"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your Message"
        />
      </div>
      <button
        onClick={async () => {
          setMessages([...messages, newMessage])
          await sendMessage()
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Ask
      </button>
    </div>
  )
}
