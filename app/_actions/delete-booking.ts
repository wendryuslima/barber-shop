"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"

const deleteBooking = async (bookingId: string) => {
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  })

  revalidatePath("/bookings")
}

export default deleteBooking
