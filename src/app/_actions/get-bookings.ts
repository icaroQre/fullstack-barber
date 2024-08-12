"use server"

import { db } from "@/_lib/prisma"
import { endOfDay, startOfDay } from "date-fns"

interface GetBookingsParams {
  date: Date
}

export const getBookings = ({ date }: GetBookingsParams) => {
  return db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })
}
