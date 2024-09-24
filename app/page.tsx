import { Button } from "./_components/ui/button"
import Image from "next/image"

import { db } from "./_lib/prisma"

import quickSearchOptions from "./_constants/search"

import BookingItem from "./_components/booking-item"

import Link from "next/link"
import { authOptions } from "./_lib/auth"
import { getServerSession } from "next-auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { BarbershopCarousel } from "./_components/barbershop-carousel"

import { cn } from "./_lib/utils"

import Search from "./_components/search"
import Header from "./_components/header"
;<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

const Home = async () => {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularsBarberShop = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  const confirmedBookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session.user as any).id,
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
  const hasBooking = confirmedBookings.length > 0 && !!session?.user
  return (
    <div>
      <Header />
      <main>
        <div className="relative bg-cover bg-top md:bg-[url('/hero.png')]">
          <div className="absolute inset-0 z-0 grayscale md:bg-black/90" />
          <div className="relative mx-auto max-w-[1440px] px-5 md:px-8">
            <div className="gap-16 md:flex md:py-16 xl:gap-32">
              <div
                className={cn(
                  "flex-col gap-4 md:flex md:min-w-[354px]",
                  hasBooking && "justify-between gap-0",
                )}
              >
                <div className="gap-1 py-6 md:py-0">
                  <h2 className="truncate text-[28px]">
                    Olá,{" "}
                    <span className="font-bold">
                      {session?.user
                        ? `${session.user.name}`
                        : "Faça seu login"}
                    </span>
                  </h2>
                  <p className="text-sm">
                    {format(new Date(), "dd 'de' MMMM", { locale: ptBR })}
                  </p>
                </div>

                <Search />

                <div className="no-scrollbar flex w-full gap-2.5 overflow-x-auto pt-6 md:pt-0 [&::-webkit-scrollbar]:hidden">
                  {quickSearchOptions.map((item) => (
                    <Button
                      key={item.title}
                      variant="outline"
                      className="flex w-fit shrink-0 items-center gap-2.5 bg-card"
                      asChild
                    >
                      <Link href={`/barbershops?service=${item.title}`}>
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          width={16}
                          height={16}
                        />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </Button>
                  ))}
                </div>

                <div className="pt-6 md:hidden">
                  <div className="relative h-[150px] w-full overflow-hidden rounded-lg">
                    <Image
                      src="/banner-01.png"
                      alt="Agende nos melhores com FSW Barber"
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                {hasBooking && (
                  <div className="pt-6 md:pt-0">
                    <h2 className="mb-2 text-2xl font-bold uppercase">
                      Agendamentos
                    </h2>
                    <div className="no-scrollbar flex items-center gap-3 overflow-x-auto">
                      {confirmedBookings.map((booking) => (
                        <BookingItem key={booking.id} booking={booking} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-1 md:w-[275px] lg:w-[520px] xl:w-[600px]">
                <div className="space-y-3 pt-6 md:pt-0">
                  <h2 className="text-2xl font-bold uppercase">Recomendados</h2>
                  <BarbershopCarousel barbershops={barbershops} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <div className="space-y-3 pt-6 md:pt-10">
            <h2 className="title-separator">Populares</h2>
            <BarbershopCarousel barbershops={popularsBarberShop} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
