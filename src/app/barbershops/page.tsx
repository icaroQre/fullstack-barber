import BarbershopItem from "@/_components/barbershop-item"
import Header from "@/_components/header"
import SearchInput from "@/_components/search-input"
import { db } from "@/_lib/prisma"

interface BarbershopsPageProps {
  searchParams: {
    search?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        {
          name: {
            contains: searchParams?.search,
            mode: "insensitive",
          },
        },
        {
          services: {
            some: {
              name: {
                contains: searchParams?.search,
                mode: "insensitive",
              },
            },
          },
        },
      ],
    },
  })

  return (
    <>
      <Header />
      <div className="mt-6 px-5 lg:mt-10 lg:px-32">
        <SearchInput />
        <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400 lg:mb-5 lg:mt-10 lg:text-xl lg:text-white">
          {" "}
          Resultados para &rdquo;{searchParams.search}&rdquo;{" "}
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </>
  )
}

export default BarbershopsPage
