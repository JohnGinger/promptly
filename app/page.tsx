import Image from 'next/image'
import Link from 'next/link'

type CardProps = {
  title: string
  level: string
  description: string
  image: string
  link: string
}

const Card = ({ title, level, description, image, link }: CardProps) => {
  return (
    <Link href={link}>
      <div className="relative bg-white flex flex-row rounded-2xl shadow mb-8 p-4 justify-between hover:bg-teal-200">
        <div className="flex-col">
          <div className="text-gray-800 text-xl font-bold font-sans leading-7">
            {title}
          </div>
          <span className="text-gray-800 text-base font-normal font-sans leading-normal">
            {level}
          </span>
          <span className="text-gray-800 text-base font-normal font-sans leading-normal">
            {description}
          </span>
        </div>
        <img className=" h-12" src={image} />
      </div>
    </Link>
  )
}

export default function Home() {
  return (
    <div className=" bg-white flex flex-col h-screen content-center ml-auto mr-auto p-8 flex-nowrap w-[40em]">
      <div className="flex flex-row">
        <div>
          <span className="text-black text-5xl font-bold font-sans leading-10">
            Learn the future of programming with{' '}
          </span>
          <span className="text-teal-300 text-5xl font-bold font-sans leading-10">
            promptly
          </span>
        </div>
        <img className="w-32" src="/images/mascot.png" />
      </div>
      <div className="text-black text-3xl font-bold font-sanas leading-9 mt-8 mb-8">
        How good are you at prompting?
      </div>
      <div className="relative bg-white flex flex-col">
        <Card
          title="PONG"
          level="EASY"
          description="- Prompt Claude to move the pong bat up and down the screen."
          image={'/images/pong.png'}
          link="/pong"
        />
        <Card
          title="MINESWEEPER"
          level="MEDIUM"
          description="- Prompt Claude to learn rules to play the game.."
          image={'/images/minesweeper.png'}
          link="/minesweeper"
        />
        <Card
          title="PAC-MAN"
          level="HARD"
          description="- Prompt Claude to not get eaten by Pac-man."
          image={'/images/pacman.png'}
          link="/pacman"
        />
      </div>
    </div>
  )
}
