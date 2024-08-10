import BarbershopItem from "@/_components/barbershop-item"
import Header from "@/_components/header"
import { AvatarImage } from "@/_components/ui/avatar"
import { Badge } from "@/_components/ui/badge"
import { Button } from "@/_components/ui/button"
import { Card, CardContent } from "@/_components/ui/card"
import { Input } from "@/_components/ui/input"
import { db } from "@/_lib/prisma"
import { Avatar } from "@radix-ui/react-avatar"
import { EyeIcon, SearchIcon } from "lucide-react"
import Image from "next/image"

const Home = async () => {
  //Chamar banco de dados
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

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

        {/* BUSCA RÁPIDA */}
        <div className="mt-6 flex gap-3 overflow-auto [&::-webkit-scrollbar]:hidden">
          <Button variant={"secondary"} className="gap-2">
            <Image src={"/cabelo.svg"} alt="Cabelo" height={16} width={16} />
            <p>Cabelo</p>
          </Button>

          <Button variant={"secondary"} className="gap-2">
            <Image src={"/barba.svg"} alt="Barba" height={16} width={16} />
            <p>Barba</p>
          </Button>

          <Button variant={"secondary"} className="gap-2">
            <Image
              src={"/acabamento.svg"}
              alt="Acabamento"
              height={16}
              width={16}
            />
            <p>Acabamento</p>
          </Button>
          <Button variant={"secondary"} className="gap-2">
            <EyeIcon size={16} />
            <p>Sobrancelha</p>
          </Button>

          <Button variant={"secondary"} className="gap-2">
            <Image src={"/barba.svg"} alt="Barba" height={16} width={16} />
            <p>Barba</p>
          </Button>

          <Button variant={"secondary"} className="gap-2">
            <Image
              src={"/acabamento.svg"}
              alt="Acabamento"
              height={16}
              width={16}
            />
            <p>Acabamento</p>
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

        {/* AGENDAMENTOS */}
        <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400">
          {" "}
          Agendamentos{" "}
        </h2>
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

        {/* RECOMENDADOS */}
        <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400">
          {" "}
          Recomendados{" "}
        </h2>

        <div className="flex flex-row gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        {/* POPULARES */}
        <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400">
          {" "}
          Populares{" "}
        </h2>

        <div className="flex flex-row gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <footer>
        <Card className="mt-7">
          <CardContent className="px-5 py-6">
            <p className="text-sm font-light text-gray-400">
              © 2023 Copyright <span className="font-bold">FSW Barber</span>
            </p>
          </CardContent>
        </Card>
      </footer>
    </>
  )
}

export default Home
