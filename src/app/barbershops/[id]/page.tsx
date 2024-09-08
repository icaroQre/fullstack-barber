import Header from "@/_components/header"
import PhoneItem from "@/_components/phone-item"
import ServiceItem from "@/_components/service-item"
import SidebarButton from "@/_components/sidebar-button"
import { Button } from "@/_components/ui/button"
import { db } from "@/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })
  if (!barbershop) {
    return notFound()
  }

  return (
    <>
      <div className="hidden lg:block">
        <Header />
      </div>
      <div className="relative h-[250px] w-full lg:hidden">
        <Image
          src={barbershop?.imageUrl}
          alt={barbershop?.name}
          fill
          className="object-cover"
        />
      </div>
      <Button
        size="icon"
        variant={"secondary"}
        className="absolute left-4 top-4 lg:hidden"
        asChild
      >
        <Link href={"/"}>
          <ChevronLeftIcon />
        </Link>
      </Button>
      <Button
        size="icon"
        variant={"secondary"}
        className="absolute right-4 top-4 lg:hidden"
      >
        <SidebarButton />
      </Button>

      <div className="gap-10 lg:grid lg:grid-cols-2 lg:px-32 lg:pb-5 lg:pt-10">
        <div className="relative hidden h-[480px] overflow-hidden rounded-xl lg:flex">
          <Image
            src={barbershop?.imageUrl}
            alt={barbershop?.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col border-b border-solid p-5 lg:border-none lg:p-0">
          <h1 className="mb-3 text-xl font-bold">{barbershop?.name}</h1>
          <div className="mb-2 flex items-center gap-1">
            <MapPinIcon className="text-primary" size={18} />
            <p className="text-sm">{barbershop?.address}</p>
          </div>
          <div className="flex items-center gap-1">
            <StarIcon className="text-primary" size={18} />
            <p className="text-sm">5,0 (889 avaliações)</p>
          </div>

          <div className="mt-5 hidden lg:block">
            <h2 className="mb-3 text-xs font-bold uppercase text-gray-400 lg:text-sm">
              Sobre nós
            </h2>
            <p className="text-sm">{barbershop?.description}</p>
          </div>

          <div className="mt-3 hidden flex-col gap-3 lg:flex">
            <h2 className="mb-3 text-xs font-bold uppercase text-gray-400 lg:text-sm">
              Contato
            </h2>
            {barbershop.phones.map((phone) => (
              <PhoneItem key={phone} phone={phone} />
            ))}
          </div>
        </div>
      </div>

      <div className="border-b border-solid p-5 lg:hidden lg:px-32">
        <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
          Sobre nós
        </h2>
        <p className="text-sm">{barbershop?.description}</p>
      </div>

      <div className="border-b border-solid p-5 lg:border-none lg:px-32">
        <h2 className="mb-3 text-xs font-bold uppercase text-gray-400 lg:text-sm">
          Serviços
        </h2>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {barbershop.services.map((service) => (
            <ServiceItem
              key={service.id}
              service={JSON.parse(JSON.stringify(service))}
              barbershop={JSON.parse(JSON.stringify(barbershop))}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 p-5 lg:hidden">
        <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
          Contato
        </h2>
        {barbershop.phones.map((phone) => (
          <PhoneItem key={phone} phone={phone} />
        ))}
      </div>
    </>
  )
}

export default BarbershopPage
