import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

// TODO: Receber agendamento como props
const BookingItem = () => {
  return (
    <>
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
          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
            <p className="text-sm font-light"> Fevereiro </p>
            <p className="text-2xl"> 06 </p>
            <p className="text-sm font-light"> 09:45 </p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingItem
