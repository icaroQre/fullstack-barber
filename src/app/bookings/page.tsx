import BookingItem from "@/_components/booking-item"
import Header from "@/_components/header"
import { authOptions } from "@/_lib/auth"
import { db } from "@/_lib/prisma"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  //TODO: Adicionar popup de login
  if (!session) {
    notFound()
  }

  const confirmedBookings = session.user
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
  const concluedBookings = session.user
    ? await db.booking.findMany({
        where: {
          userId: (session as any).user.id,
          date: {
            lte: new Date(),
          },
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
      })
    : []

  return (
    <>
      <Header />
      <div className="p-5">
        <p className="text-xl font-bold"> Agendamentos </p>
        <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400">
          {" "}
          Confirmados{" "}
        </h2>
        <div className="flex flex-col gap-3">
          {confirmedBookings.map((booking) => (
            <BookingItem
              key={booking.id}
              booking={JSON.parse(JSON.stringify(booking))}
            />
          ))}
        </div>
        <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400">
          {" "}
          Finalizados{" "}
        </h2>
        <div className="flex flex-col gap-3">
          {concluedBookings.map((booking) => (
            <BookingItem
              key={booking.id}
              booking={JSON.parse(JSON.stringify(booking))}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Bookings
