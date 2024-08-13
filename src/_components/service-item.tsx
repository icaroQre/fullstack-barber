"use client"

import { Barbershop, BarbershopService, Booking } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { useEffect, useMemo, useState } from "react"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { format, isPast, isToday, set } from "date-fns"
import { useSession } from "next-auth/react"
import { createBooking } from "@/app/_actions/create-booking"
import { toast } from "sonner"
import { getBookings } from "@/app/_actions/get-bookings"
import DialogLogin from "./dialog-login"
import { Dialog, DialogContent } from "./ui/dialog"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}
interface GetTimeListProps {
  bookings: Booking[]
  selectedDay: Date
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

const getTimeList = ({ bookings, selectedDay }: GetTimeListProps) => {
  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0])
    const minutes = Number(time.split(":")[1])

    const timeIsOnThePast = isPast(set(new Date(), { hours: hour, minutes }))
    if (timeIsOnThePast && isToday(selectedDay)) {
      return false
    }

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    )
    if (hasBookingOnCurrentTime) {
      return false
    }
    return true
  })
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession()
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )
  const [dialogLoginIsOpen, setDialogLoginIsOpen] = useState<boolean>(false)
  const handleBookingClick = () => {
    if (data?.user) {
      return setBookingSheetIsOpen(true)
    }
    return setDialogLoginIsOpen(true)
  }

  const handleDateSelect = (data: Date | undefined) => {
    setSelectedDay(data)
  }
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState<boolean>()

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
        date: newDate,
      })
      toast.success("Reserva criada com sucesso!")
    } catch (error) {
      console.log(error)
      toast.error("Erro ao criar reserva!")
    }
  }

  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  useEffect(() => {
    if (!selectedDay) return
    const fetch = async () => {
      const bookings = await getBookings({ date: selectedDay })
      setDayBookings(bookings)
    }
    fetch()
  }, [selectedDay, service.id])

  const handleBookingSheetChange = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetIsOpen(false)
  }

  const timeList = useMemo(() => {
    if (!selectedDay) return []
    return getTimeList({
      bookings: dayBookings,
      selectedDay,
    })
  }, [dayBookings, selectedDay])

  return (
    <>
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

              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetChange}
              >
                <Button
                  variant={"secondary"}
                  size={"sm"}
                  onClick={handleBookingClick}
                >
                  <p className="text-sm font-bold">Reservar</p>
                </Button>
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
                      {timeList.length > 0 ? (
                        timeList.map((time) => (
                          <Button
                            key={time}
                            variant={
                              selectedTime === time ? "default" : "outline"
                            }
                            className="rounded-full"
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time}
                          </Button>
                        ))
                      ) : (
                        <p className="text-xs">
                          Não há horários disponíveis para este dia.
                        </p>
                      )}
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
                    <SheetClose asChild>
                      <Button
                        onClick={handleCreateBooking}
                        disabled={!selectedDay || !selectedTime}
                      >
                        <p>Confirmar</p>
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={dialogLoginIsOpen}
        onOpenChange={(open) => setDialogLoginIsOpen(open)}
      >
        <DialogContent className="w-[80%] rounded-xl">
          <DialogLogin />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ServiceItem
