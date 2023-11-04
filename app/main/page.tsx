import Image from 'next/image'
import Chat from '../chat/page';
import Pong from '../pong/page';

export default function Home() {

  return (
    <div className="flex h-screen">
        <div className="w-1/2 bg-blue-500">
            <Chat />
        </div>
        <div className="w-1/2 bg-red-500">
            <Pong />
        </div>
    </div>
  )
}