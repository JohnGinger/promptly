import Image from 'next/image'
import Chat from './chat/page';
import Pong from './pong/page';

export default function Home() {


  return (

    <>
        <Chat />
        <Pong />
    </>

  )
}