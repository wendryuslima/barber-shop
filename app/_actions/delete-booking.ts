"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"

const deleteBooking = async (bookingId: string) => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    throw new Error("Usuário não autenticado")
  }

  // Verificar se o booking pertence ao usuário logado
  const booking = await db.booking.findFirst({
    where: {
      id: bookingId,
      userId: (session.user as { id: string }).id,
    },
  })

  if (!booking) {
    throw new Error("Agendamento não encontrado ou não pertence ao usuário")
  }

  await db.booking.delete({
    where: {
      id: bookingId,
    },
  })

  revalidatePath("/bookings")
  revalidatePath("/")
}

export default deleteBooking
