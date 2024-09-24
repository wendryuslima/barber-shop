import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"

import BookingItem from "../_components/booking-item"
import { notFound } from "next/navigation"

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return notFound()
  }

  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: (session?.user as any).id,
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

  const concluedBookings = await db.booking.findMany({
    where: {
      userId: (session?.user as any).id,
      date: {
        lt: new Date(),
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

  return (
    <>
      <Header />

      <div className="space-y-4 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {confirmedBookings.length === 0 && concluedBookings.length === 0 && (
          <p className="text-gray-400">Voce não possui agendamentos</p>
        )}
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="text-xs font-bold uppercase text-gray-400">
              Confirmados
            </h2>
            <div className="space-y-3">
              {confirmedBookings.map((booking) => (
                <BookingItem booking={booking} key={booking.id} />
              ))}
            </div>
          </>
        )}

        {concluedBookings.length > 0 && (
          <>
            <h2 className="text-xs font-bold uppercase text-gray-400">
              Finalizados
            </h2>
            <div className="space-y-3">
              {concluedBookings.map((booking) => (
                <BookingItem booking={booking} key={booking.id} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Bookings
