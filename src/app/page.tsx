import Header from "@/_components/header"
import { Button } from "@/_components/ui/button"
import { Input } from "@/_components/ui/input"
import { SearchIcon } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold"> Olá, Ícaro!</h2>
        <p> Sábado, 10 de Agosto</p>

        <div className="mt-6 flex flex-row items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative mt-6 h-[150px]">
          <Image
            src="/banner-01.png"
            alt="Agende nos melhores com FSW Barber"
            fill
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </>
  )
}
