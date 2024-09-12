import Header from "./_components/header"

import { Button } from "./_components/ui/button"
import Image from "next/image"

import { db } from "./_lib/prisma"
import BarberShopItem from "./_components/barbershop-item"
import quickSearchOptions from "./_constants/search"

import BookingItem from "./_components/booking-item"

import Search from "./_components/search"
import Link from "next/link"

const Home = async () => {
  const barbershops = await db.barbershop.findMany({})
  const popularsBarberShop = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  return (
    <div>
      <>
        <Header />
        <div className="p-5">
          <h2 className="text-xl font-bold">Olá, Wendryus</h2>
          <p>Segunda-feira, 9 de setembro</p>

          <div className="mt-6">
            <Search />
          </div>

          <div className="mt-6 flex items-center gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
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

          <div className="relative mt-6 flex h-[150px] w-full">
            <Image
              src="/banner-01.png"
              alt="banner"
              fill
              className="rounded-xl object-cover"
            />
          </div>

          <div>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Agendamentos
            </h2>
            <BookingItem />
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
