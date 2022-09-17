import { useEffect, useState } from "react"
import { CaretLeft, CaretRight } from "phosphor-react"
import * as Dialog from "@radix-ui/react-dialog"
import axios from "axios"

import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import "./styles/main.css"

import logo from "./assets/logo.svg"
import { CreateAdModal } from "./components/CreateAdModal"

export interface Game {
  id: string
  name: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

export function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios("http://localhost:3333/games").then(response => {
        setGames(response.data)
      })
  }, [])

  const slideLeft = () => {
    let slider = document.getElementById("slider")
    if (slider) {
      slider.scrollLeft = slider.scrollLeft - 500
    }
  }

  const slideRight = () => {
    let slider = document.getElementById("slider")
    if (slider) {
      slider.scrollLeft = slider.scrollLeft + 500
    }
  }

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center">
      <img src={logo} alt="" className="my-20" />
      <h1 className="text-6xl text-white font-black">
        Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>

      <div className="mt-16 relative flex items-center">
        <CaretLeft size={48} className="text-zinc-400 cursor-pointer opacity-50 hover:opacity-100" onClick={slideLeft} />
        <div id="slider" className="mx-6 overflow-x-hidden w-[1200px] h-full scroll whitespace-nowrap scroll-smooth">
          {
            games.map(game => (
              <GameBanner
                key={game.id}
                bannerUrl={game.bannerUrl}
                title={game.name}
                adsCount={game._count.ads}
              />
            ))
          }
        </div>
        <CaretRight size={48} className="text-zinc-400 cursor-pointer opacity-50 hover:opacity-100" onClick={slideRight} />
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

// grid grid-cols-6 gap-6 mt-16
