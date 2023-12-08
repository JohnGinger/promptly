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
            How good are you at{' '}
          </span>
          <span className="text-teal-300 text-5xl font-bold font-sans leading-10">
            prompting?
          </span>
        </div>
        <img className="w-32" src="/images/mascot.png" />
      </div>

      <div className="relative bg-white flex flex-col">
        <Card
          title="Try PONG"
          level=""
          description="Prompt Claude to move the pong bat up and down the screen."
          image={'/images/pong.png'}
          link="/pong"
        />
        <form
          id="email-form"
          action="https://script.google.com/macros/s/AKfycbzG4CI87VTiUTj1PnrSJxFpyNSP52fGqK9VIGdEbYJWap_V4U4SggfxL_VhpLKB6jZC/exec"
          method="post"
          className="flex w-full gap-3"
        >
          <input
            placeholder="e.g. john@gmail.com"
            className="input input-bordered w-full"
            type="email"
            name="email"
          />
          <button className="btn btn-primary text-white">
            Sign up for more games
          </button>
        </form>
        {/* <Card
          title="HUMAN EVAL"
          level="HARD"
          description=" - Prompt to solve problems that humans can solve but AI can't."
          image={'/images/human_eval.png'}
          link="/human-eval"
        />
        <Card
          title="MINESWEEPER"
          level="INSANE"
          description=" - Prompt Claude to learn rules to play the game.."
          image={'/images/minesweeper.png'}
          link="/minesweeper"
        /> */}
        {/* Hide pacman for now <Card
          title="PAC-MAN"
          level="HARD"
          description="- Prompt Claude to not get eaten by Pac-man."
          image={'/images/pacman.png'}
          link="/pacman"
        /> */}
      </div>
    </div>
  )
}
