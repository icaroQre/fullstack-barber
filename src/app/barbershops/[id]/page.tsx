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
      <div className="relative h-[250px] w-full">
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
        className="absolute left-4 top-4"
        asChild
      >
        <Link href={"/"}>
          <ChevronLeftIcon />
        </Link>
      </Button>
      <Button
        size="icon"
        variant={"secondary"}
        className="absolute right-4 top-4"
      >
        <SidebarButton />
      </Button>

      <div className="flex flex-col border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop?.name}</h1>
        <div className="mb-2 flex items-center gap-1">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop?.address}</p>
        </div>
        <div className="flex items-center gap-1">
          <StarIcon className="text-primary" size={18} />
          <p className="text-sm">5,0 (889 avaliações)</p>
        </div>
      </div>

      <div className="border-b border-solid p-5">
        <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
          Sobre nós
        </h2>
        <p className="text-sm">{barbershop?.description}</p>
      </div>

      <div className="border-b border-solid p-5">
        <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
          Serviços
        </h2>
        <div className="space-y-3">
          {barbershop.services.map((service) => (
            <ServiceItem
              key={service.id}
              service={JSON.parse(JSON.stringify(service))}
              barbershop={JSON.parse(JSON.stringify(barbershop))}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 p-5">
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
