import BarbershopItem from "@/_components/barbershop-item"
import BookingItem from "@/_components/booking-item"
import Header from "@/_components/header"
import SearchInput from "@/_components/search-input"
import { Button } from "@/_components/ui/button"
import { quickSearchOptions } from "@/_constants/search"
import { authOptions } from "@/_lib/auth"
import { db } from "@/_lib/prisma"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { getServerSession } from "next-auth"
import Image from "next/image"

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
      <div className="p-5">
        {/* TEXTO */}
        <h2 className="text-xl font-bold">
          Olá, {session?.user ? session.user.name : "bem vindo"}!
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

        <div className="mt-6">
          <SearchInput />
        </div>

        {/* BUSCA RÁPIDA */}
        <div className="mt-6 flex gap-3 overflow-auto [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button key={option.title} variant={"secondary"} className="gap-2">
              <Image
                src={option.imageUrl}
                alt={option.title}
                height={16}
                width={16}
              />
              <p>{option.title}</p>
            </Button>
          ))}
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
        <div className="flex flex-row gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

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
    </>
  )
}

export default Home
