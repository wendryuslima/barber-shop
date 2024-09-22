import Header from "./_components/header"

import { Button } from "./_components/ui/button"
import Image from "next/image"

import { db } from "./_lib/prisma"
import BarberShopItem from "./_components/barbershop-item"
import quickSearchOptions from "./_constants/search"

import BookingItem from "./_components/booking-item"

import Search from "./_components/search"
import Link from "next/link"
import { authOptions } from "./_lib/auth"
import { getServerSession } from "next-auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
;<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

const Home = async () => {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularsBarberShop = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  const confirmedBookinhs = session?.user
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
  return (
    <div>
      <>
        <Header />
        <div className="p-5">
          <h2 className="text-xl font-bold">
            Olá,{" "}
            {session?.user ? session.user.name : "Bem vindo, faça seu login"}
          </h2>
          <p>{format(new Date(), "EEE, dd 'de' MMMM", { locale: ptBR })}</p>

          <div className="mt-6">
            <Search />
          </div>

          <div className="mt-6 flex items-center gap-3 overflow-x-scroll md:w-full md:items-center md:justify-center [&::-webkit-scrollbar]:hidden">
            {quickSearchOptions.map((option) => (
              <Button
                className="gap-2"
                variant="secondary"
                key={option.title}
                asChild
              >
                <Link href={`/barbershop?search=${option.title}`}>
                  <Image
                    src={option.imageUrl}
                    alt="Options"
                    width={16}
                    height={16}
                  />
                  {option.title}
                </Link>
              </Button>
            ))}
          </div>

          <div className="relative mt-6 flex h-[150px] w-full md:flex md:w-[50%] md:items-center md:justify-center">
            <Image
              src="/banner-01.png"
              alt="banner"
              fill
              className="rounded-xl object-cover md:flex md:w-[50%] md:items-center md:justify-center"
            />
          </div>

          <div className="mt-3">
            <h1 className="text-xs font-bold uppercase text-gray-400">
              Agendamentos
            </h1>
          </div>
          <div className="mt-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {confirmedBookinhs.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>

          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Recomendados
          </h2>

          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {barbershops.map((barbershop) => (
              <BarberShopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>

          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Populares
          </h2>

          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {popularsBarberShop.map((barbershop) => (
              <BarberShopItem barbershop={barbershop} key={barbershop.id} />
            ))}
          </div>
        </div>
      </>
    </div>
  )
}

export default Home
