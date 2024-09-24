import BarberShopDetails from "@/app/_components/barbershop-details"
import Header from "@/app/_components/header"
import MenuItem from "@/app/_components/menu-item"
import PhoneItem from "@/app/_components/phone-item"
import ServiceItem from "@/app/_components/service-item"
import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
;<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const DAY_LIST = [
  "Segunda-feira",
  "9:00 - 18:00",
  "Terça-feira",
  "9:00 - 18:00",
  "Quarta-feira",
  "9:00 - 18:00",
  "Quinta-feira",
  "9:00 - 18:00",
  "Sexta-feira",
  "9:00 - 18:00",
  "Sábado",
  "9:00 - 18:00",
  "Domingo",
  "Fechado",
]

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const dayPairs = []
  for (let i = 0; i < DAY_LIST.length; i += 2) {
    dayPairs.push([DAY_LIST[i], DAY_LIST[i + 1]])
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <>
      <Header />
      <div className="flex flex-col gap-4 p-4 md:flex-row">
        {/* Seção de Imagem e Detalhes */}
        <div className="w-full md:w-7/12">
          {/* IMAGEM */}
          <div className="relative h-[250px] w-full md:flex">
            <Image
              alt={barbershop.name}
              src={barbershop?.imageUrl}
              fill
              className="object-cover md:rounded-md"
            />

            <Button
              size="icon"
              variant="secondary"
              className="absolute left-4 top-4"
              asChild
            >
              <Link href="/">
                <ChevronLeftIcon />
              </Link>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute right-4 top-4"
                >
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <MenuItem />
            </Sheet>
          </div>

          {/* TÍTULO */}
          <div className="border-b border-solid p-5">
            <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>
            <div className="mb-2 flex items-center gap-2">
              <MapPinIcon className="text-primary" size={18} />
              <p className="text-sm">{barbershop?.address}</p>
            </div>

            <div className="flex items-center gap-2">
              <StarIcon className="fill-primary text-primary" size={18} />
              <p className="text-sm">5,0 (499 avaliações)</p>
            </div>
          </div>

          {/* DESCRIÇÃO */}
          <div className="space-y-2 border-b border-solid p-5 md:hidden">
            <h2 className="text-xs font-bold uppercase text-gray-400">
              Sobre nós
            </h2>
            <p className="text-justify text-sm">{barbershop?.description}</p>
          </div>

          {/* SERVIÇOS */}
          <div className="flex flex-col space-y-3 border-b border-solid">
            <h2 className="text-xs font-bold uppercase text-gray-400">
              Serviços
            </h2>
            <div className="space-y-3">
              {barbershop.services.map((service) => (
                <ServiceItem
                  key={service.id}
                  barbershop={JSON.parse(JSON.stringify(barbershop))}
                  service={JSON.parse(JSON.stringify(service))}
                />
              ))}
            </div>
          </div>

          {/* TELEFONES */}
          <div className="space-y-3 p-5">
            {barbershop.phones.map((phone) => (
              <PhoneItem key={phone} phone={phone} />
            ))}
          </div>
        </div>

        <Card className="hidden h-fit w-[50%] md:block">
          <CardContent className="w-[100%]">
            <div className="w-full space-y-4 border-b border-solid py-3">
              <BarberShopDetails key={barbershop.id} barbershop={barbershop} />
              <div className="justify-center">
                <h1 className="font-bold uppercase">Sobre nós</h1>
                <p className="text-sm text-gray-400">
                  {barbershop.description}
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3 border-b border-solid py-3">
              {barbershop.phones.map((phone) => (
                <PhoneItem key={phone} phone={phone} />
              ))}
            </div>

            <div className="mt-5 space-y-2 pt-4">
              {dayPairs.map(([day, time], index) => (
                <div key={index} className="flex justify-between p-2">
                  <span className="text-gray-400">{day}</span>
                  <span>{time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default BarbershopPage
