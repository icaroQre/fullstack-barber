import { Barbershop } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"

interface barbershopItemProps {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: barbershopItemProps) => {
  return (
    <Card className="min-w-[164px] overflow-hidden rounded-2xl">
      <CardContent className="p-0 px-1 pt-1">
        <div className="relative h-[159px] w-full">
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            fill
            className="rounded-2xl object-cover"
          />
        </div>

        <div className="flex flex-col px-2 py-3">
          <h3 className="truncate font-semibold">{barbershop.name}</h3>
          <p className="truncate text-sm text-gray-400">{barbershop.address}</p>
          <Button variant={"secondary"} className="mt-3">
            {" "}
            Reservar{" "}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem
