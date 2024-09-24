import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Barbershop } from "@prisma/client"

interface BarberShopDetailsProp {
  barbershop: Barbershop
}

const BarberShopDetails = ({ barbershop }: BarberShopDetailsProp) => {
  return (
    <>
      <div className="relative mt-5 flex h-[180px] w-full items-end">
        <Image src="/map.png" alt="barber" fill className="object-cover" />

        <Card className="z-50 mx-5 mb-3 w-full">
          <CardContent className="px-5 py-3">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl} />
              </Avatar>

              <div>
                <h3 className="font-bold">{barbershop.name}</h3>
                <p className="text-xs">{barbershop.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default BarberShopDetails
