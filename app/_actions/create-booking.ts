"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"

interface CreateBookingParams {
  userId: string
  serviceId: string
  date: Date
}
export const createBooking = async (params: CreateBookingParams) => {
  const user = await getServerSession(authOptions)

  if (!user) {
    throw new Error("Usuário não autenticado")
  }

  // Verificar se já existe agendamento no mesmo horário para o mesmo serviço
  const existingBooking = await db.booking.findFirst({
    where: {
      serviceId: params.serviceId,
      date: params.date,
    },
  })

  if (existingBooking) {
    throw new Error("Já existe um agendamento neste horário para este serviço")
  }

  await db.booking.create({
    data: { ...params, userId: (user.user as { id: string }).id },
  })

  revalidatePath("/barbershop/[id]")
  revalidatePath("/bookings")
}

export default createBooking
