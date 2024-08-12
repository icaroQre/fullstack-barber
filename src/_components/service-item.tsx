"use client"

import { Barbershop, BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { useState } from "react"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { format, set } from "date-fns"
import { useSession } from "next-auth/react"
import { createBooking } from "@/app/_actions/create-booking"
import { toast } from "sonner"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession()
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )
  const handleDateSelect = (data: Date | undefined) => {
    setSelectedDay(data)
  }
  const handleCreateBooking = async () => {
    try {
      if (!selectedDay || !selectedTime) return
      const hour = Number(selectedTime.split(":")[0])
      const minute = Number(selectedTime.split(":")[1])
      const newDate = set(selectedDay, {
        minutes: minute,
        hours: hour,
      })

      await createBooking({
        serviceId: service.id,
        userId: (data?.user as any).id,
        date: newDate,
      })
      toast.success("Reserva criada com sucesso!")
    } catch (error) {
      console.log(error)
      toast.error("Erro ao criar reserva!")
    }
  }

  const TIME_LIST = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ]

  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex w-full flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-bold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>
          </div>

          <div className="flex flex-row items-center justify-between">
            <p className="text-sm font-bold text-primary">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"secondary"} size={"sm"}>
                  <p className="text-sm font-bold">Reservar</p>
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto p-5 [&::-webkit-scrollbar]:hidden">
                <SheetHeader>
                  <SheetTitle className="flex text-left">
                    Fazer Reserva
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 border-b border-t border-solid py-5">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectedDay}
                    onSelect={handleDateSelect}
                    fromDate={new Date()}
                    styles={{
                      head_cell: {
                        width: "100%",
                        textTransform: "capitalize",
                      },
                      cell: {
                        width: "100%",
                      },
                      button: {
                        width: "100%",
                      },
                      nav_button_previous: {
                        width: "32px",
                        height: "32px",
                      },
                      nav_button_next: {
                        width: "32px",
                        height: "32px",
                      },
                      caption: {
                        textTransform: "capitalize",
                      },
                    }}
                  />
                </div>

                {selectedDay && (
                  <div className="flex gap-3 overflow-x-auto border-b border-solid py-5 [&::-webkit-scrollbar]:hidden">
                    {TIME_LIST.map((time) => (
                      <Button
                        key={time}
                        className="rounded-full"
                        size={"sm"}
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => setSelectedTime(time)}
                      >
                        <p className="text-sm">{time}</p>
                      </Button>
                    ))}
                  </div>
                )}

                {selectedTime && selectedDay && (
                  <div className="py-6">
                    <Card>
                      <CardContent className="flex flex-col gap-3 py-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold">{service.name}</p>
                          <p className="text-sm font-bold">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-400">Data</p>
                          <p className="text-sm text-gray-400">
                            {format(selectedDay, "d 'de' MMMM", {
                              locale: ptBR,
                            })}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-400">Horário</p>
                          <p className="text-sm text-gray-400">
                            {selectedTime}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-400">Barbearia</p>
                          <p className="text-sm text-gray-400">
                            {barbershop.name}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <SheetFooter>
                  <Button
                    onClick={handleCreateBooking}
                    disabled={!selectedDay || !selectedTime}
                  >
                    <p>Confirmar</p>
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
