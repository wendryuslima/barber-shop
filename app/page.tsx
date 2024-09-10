import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import { db } from "./_lib/prisma"
import BarberShopItem from "./_components/barbershop-item"

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

          <div className="item-center mt-5 flex gap-2">
            <Input placeholder="Buscar" />
            <Button className="gap-2" variant="secondary">
              <SearchIcon />
            </Button>
          </div>

          <div className="mt-6 flex w-full items-center gap-3">
            <Button className="gap-2" variant="secondary">
              <Image src="/cabelo.png" alt="cabelo" width={16} height={16} />
              Cabelo
            </Button>

            <Button className="gap-2" variant="secondary">
              <Image src="/barba.svg" alt="cabelo" width={16} height={16} />
              Barba
            </Button>

            <Button className="gap-2" variant="secondary">
              <Image
                src="/sombrancelha.svg"
                alt="cabelo"
                width={16}
                height={16}
              />
              Acabamento
            </Button>
          </div>

          <div className="relative mt-6 flex h-[150px] w-full">
            <Image
              src="/banner-01.png"
              alt="banner"
              fill
              className="rounded-xl object-cover"
            />
          </div>

          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Agendamentos
          </h2>
          <Card>
            <CardContent className="flex justify-between p-0">
              {/* {Esquerda} */}
              <div className="flex flex-col gap-2 py-5 pl-5">
                <Badge>Confirmado</Badge>
                <h3>Corte de cabelo</h3>

                <div className="flex items-center gap-2 py-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <p className="text-sm">Vintage Barber</p>
                </div>
              </div>

              {/* {Direita} */}
              <div className="flex flex-col items-center justify-center gap-3 border-l-2 border-solid px-5 pr-5">
                <p className="text-sm">Setembro</p>
                <p className="text-xl">06</p>
                <p className="text-sm">09:45</p>
              </div>
            </CardContent>
          </Card>

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
        <footer>
          <Card className="mt-6">
            <CardContent className="px-5 py-6">
              <p className="text-sm text-gray-400">
                {" "}
                © 2023 Copyright FSW Barber
              </p>
            </CardContent>
          </Card>
        </footer>
      </>
    </div>
  )
}

export default Home
