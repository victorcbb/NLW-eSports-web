interface GameBannerProps {
  bannerUrl: string
  title: string
  adsCount: number
}

export function GameBanner({ bannerUrl, title, adsCount}: GameBannerProps) {
  return (
    <a href="" className="relative rounded-lg overflow-hidden w-[11.25rem] inline-block mr-6">
      <img src={bannerUrl} alt="" className="h-full" />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute left-0 bottom-0">
        <strong className="font-bold text-white block">{title}</strong>
        <span className="text-zinc-300 text-small block">{adsCount} {adsCount === 1 ? "anúncio" : "anúncios"}</span>
      </div>
    </a>
  )
}