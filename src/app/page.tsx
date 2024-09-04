import BarbershopItem from "@/_components/barbershop-item"
import BookingItem from "@/_components/booking-item"
import Header from "@/_components/header"
import SearchInput from "@/_components/search-input"
import Slick from "@/_components/slick"
import { Button } from "@/_components/ui/button"
import { quickSearchOptions } from "@/_constants/search"
import { authOptions } from "@/_lib/auth"
import { db } from "@/_lib/prisma"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { getServerSession } from "next-auth"
import Image from "next/image"
import Link from "next/link"

const Home = async () => {
  //Chamar banco de dados
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  const session = await getServerSession(authOptions)
  //TODO: Adicionar popup de login
  const confirmedBookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session as any).user.id,
          date: {
            gte: new Date(),
          },
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
        orderBy: {
          date: "asc",
        },
      })
    : []

  return (
    <>
      <Header />
      <div className="p-5 lg:px-32 lg:py-0">
        <div className="lg:flex lg:gap-32 lg:py-16">
          {/* ESQUERDA */}
          <div className="lg:flex lg:w-[30%] lg:flex-col lg:items-start lg:justify-center">
            {/* TEXTO */}
            <div>
              <h2 className="text-xl font-light lg:text-2xl">
                Olá,{" "}
                <span className="font-bold">
                  {session?.user
                    ? session.user.name?.split(" ")[0]
                    : "bem vindo"}
                  !{" "}
                </span>
              </h2>
              <p>
                <span className="capitalize">
                  {format(new Date(), "EEEE, dd", { locale: ptBR })}
                </span>
                <span>&nbsp;de&nbsp;</span>
                <span className="capitalize">
                  {format(new Date(), "MMMM", { locale: ptBR })}
                </span>
              </p>
            </div>

            <div className="mt-6 w-full">
              <SearchInput />
            </div>

            {/* BUSCA RÁPIDA */}
            <div className="mt-6 flex gap-3 overflow-auto lg:hidden [&::-webkit-scrollbar]:hidden">
              {quickSearchOptions.map((option) => (
                <Button
                  key={option.title}
                  variant={"secondary"}
                  className="gap-2"
                  asChild
                >
                  <Link href={`/barbershops?search=${option.title}`}>
                    <Image
                      src={option.imageUrl}
                      width={16}
                      height={16}
                      alt={option.title}
                    />
                    {option.title}
                  </Link>
                </Button>
              ))}
            </div>

            {/* BANNER */}
            <div className="relative mt-6 h-[150px] lg:hidden">
              <Image
                src="/banner-01.png"
                alt="Agende nos melhores com FSW Barber"
                fill
                className="rounded-xl object-cover"
              />
            </div>

            {/* AGENDAMENTO */}
            {confirmedBookings.length > 0 && (
              <div className="w-full">
                <h2 className="mb-3 mt-6 block text-xs font-bold uppercase text-gray-400 lg:hidden">
                  Agendamentos
                </h2>
                <h2 className="mb-3 mt-6 hidden text-xs font-bold uppercase text-gray-400 lg:block">
                  Agendamento mais próximo
                </h2>
                <div className="flex gap-3 overflow-x-auto lg:overflow-hidden [&::-webkit-scrollbar]:hidden">
                  {confirmedBookings.map((booking) => (
                    <BookingItem key={booking.id} booking={booking} />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="hidden w-[60%] flex-col items-start justify-center lg:flex">
            <h2 className="mb-3 mt-6 hidden text-xs font-bold uppercase text-gray-400 lg:flex">
              Barbearias em Alta
            </h2>
            <div className="grid w-full grid-cols-3 gap-5">
              <BarbershopItem barbershop={popularBarbershops[0]} />
              <BarbershopItem barbershop={popularBarbershops[1]} />
              <BarbershopItem barbershop={popularBarbershops[2]} />
            </div>
          </div>
        </div>

        {/* RECOMENDADOS */}
        <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400 lg:mb-5 lg:mt-12 lg:text-xl lg:text-white">
          {" "}
          Recomendados{" "}
        </h2>
        <Slick barbershops={barbershops} />

        {/* POPULARES */}
        <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400 lg:mb-5 lg:mt-10 lg:text-xl lg:text-white">
          {" "}
          Populares{" "}
        </h2>
        {/* <MySwiper barbershops={popularBarbershops}/> */}
        <Slick barbershops={popularBarbershops} />
      </div>
    </>
  )
}

export default Home
