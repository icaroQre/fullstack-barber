import Header from "@/_components/header"
import { AvatarImage } from "@/_components/ui/avatar"
import { Badge } from "@/_components/ui/badge"
import { Button } from "@/_components/ui/button"
import { Card, CardContent } from "@/_components/ui/card"
import { Input } from "@/_components/ui/input"
import { Avatar } from "@radix-ui/react-avatar"
import { SearchIcon } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <>
      <Header />
      <div className="p-5">
        {/* TEXTO */}
        <h2 className="text-xl font-bold"> Olá, Ícaro!</h2>
        <p> Sábado, 10 de Agosto</p>

        {/* BUSCA */}
        <div className="mt-6 flex flex-row items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* BANNER */}
        <div className="relative mt-6 h-[150px]">
          <Image
            src="/banner-01.png"
            alt="Agende nos melhores com FSW Barber"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400">
          {" "}
          Agendamentos{" "}
        </h2>

        {/* AGENDAMENTOS */}
        <Card>
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit"> Confirmado </Badge>
              <h3 className="font-semibold"> Corte de Cabelo </h3>
              <div className="flex flex-row items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png" />
                </Avatar>
                <p className="text-sm"> Vintage Barber </p>
              </div>
            </div>

            {/* DIV DIREITA */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm font-light"> Fevereiro </p>
              <p className="text-2xl"> 06 </p>
              <p className="text-sm font-light"> 09:45 </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
