"use server"

import { authOptions } from "@/_lib/auth"
import { db } from "@/_lib/prisma"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

interface createBookingParams {
  serviceId: string
  date: Date
}

export const createBooking = async (params: createBookingParams) => {
  const user = await getServerSession(authOptions)

  if (!user) {
    throw new Error("Usuário não autenticado!")
  }

  await db.booking.create({
    data: { ...params, userId: (user as any).user.id },
  })
  revalidatePath("/barbershops/[id]")
}
