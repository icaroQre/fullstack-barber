import { Prisma } from "@prisma/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

// TODO: Receber agendamento como props
const BookingItem = ({ booking }: BookingItemProps) => {
  const isConfirmed = isFuture(booking.date)

  return (
    <>
      <Card className="min-w-[90%]">
        <CardContent className="flex justify-between p-0">
          <div className="flex flex-col gap-2 py-5 pl-5">
            {isConfirmed ? (
              <Badge className="w-fit"> Confirmado </Badge>
            ) : (
              <Badge variant={"secondary"} className="w-fit">
                {" "}
                Finalizado{" "}
              </Badge>
            )}
            <h3 className="font-semibold">{booking.service.name}</h3>
            <div className="flex flex-row items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={booking.service.barbershop.imageUrl} />
              </Avatar>
              <p className="text-sm">{booking.service.barbershop.name}</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
            <p className="text-sm font-light capitalize">
              {format(booking.date, "MMMM", { locale: ptBR })}
            </p>
            <p className="text-2xl">
              {" "}
              {format(booking.date, "d", { locale: ptBR })}{" "}
            </p>
            <p className="text-sm font-light">
              {" "}
              {format(booking.date, "HH:mm", { locale: ptBR })}{" "}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingItem
