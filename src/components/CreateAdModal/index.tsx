import * as Dialog from "@radix-ui/react-dialog"
import * as Checkbox from "@radix-ui/react-checkbox"
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Check, GameController } from "phosphor-react"
import { useEffect, useState, FormEvent } from "react"
import axios from "axios"

import { Input } from "../Form/Input"

export interface Game {
  id: string
  name: string
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  useEffect(() => {
    axios("http://localhost:3333/games").then(response => {
        setGames(response.data)
      })
  }, [])

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    
    if(!data.game) {
      return alert("informe o jogo!")
    }
    
    if(!data.name) {
      return alert("informe seu nickname!")
    }

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        years_playing: Number(data.years_playing),
        discord: data.discord,
        week_days: weekDays.map(Number),
        hour_start: data.hour_start,
        hour_end: data.hour_end,
        use_voice_channel: useVoiceChannel
      })

      alert("Anuncio criado com sucesso!")
    } catch (error) {
      console.log(error)

      alert("Falha ao criar o anúncio. Tente novamente.")
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[30rem] shadow-lg shadow-black/50">
        <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">

          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="game">
              Qual o jogo?
            </label>
            <select
            name="game"
              id="game"
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
              defaultValue="Selecione o jogo que deseja jogar"
            >
              <option disabled value="Selecione o jogo que deseja jogar">Selecione o jogo que deseja jogar</option>

              {games.map(game => (
                <option key={game.id} value={game.id}>{game.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nickname</label>
            <Input name="name" id="name" type="text" placeholder="Como te chamam dentro dos jogos?" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="years_playing">Joga a quantos anos?</label>
              <Input name="years_playing" id="years_playing" type="number" placeholder="Tudo bem ser ZERO" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual o seu discord?</label>
              <Input name="discord" id="discord" type="text" placeholder="Usuário#0000" />
            </div>
          </div>

          <div className="flex gap-6">

            <div className="flex flex-col gap-2">
              <label htmlFor="week_days">Quando costuma jogar</label>
              <ToggleGroup.Root 
                type="multiple" 
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  title="Domingo"
                  className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('0') && 'bg-violet-500'}`}
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  title="Segunda"
                  className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('1') && 'bg-violet-500'}`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  title="Terça"
                  className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('2') && 'bg-violet-500'}`}
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  title="Quarta"
                  className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('3') && 'bg-violet-500'}`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  title="Quinta"
                  className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('4') && 'bg-violet-500'}`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  title="Sexta"
                  className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('5') && 'bg-violet-500'}`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  title="Sábado"
                  className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('6') && 'bg-violet-500'}`}
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hour_start">Qual o horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input name="hour_start" id="hour_start" type="time" placeholder="De" />
                <Input name="hour_end" id="hour_end" type="time" placeholder="Até" />
              </div>
            </div>
          </div>

          <label className="mt-2 flex gap-2 text-sm items-center">
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(true)
                } else {
                  setUseVoiceChannel(false)
                }
              }} 
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check className="text-emerald-400" weight="bold" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
            >
              Cancelar
            </Dialog.Close>

            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>

      </Dialog.Content>
    </Dialog.Portal>
  )
}