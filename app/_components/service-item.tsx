import { BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

interface ServiceItemProps {
  service: BarbershopService
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card className="mb-3">
      <CardContent className="p-3">
        <div className="mb-3 flex items-center gap-2 p-5">
          <div className="relative min-h-[110px] min-w-[110px]">
            <Image
              src={service.imageUrl}
              fill
              className="object cover rounded-lg"
              alt={service.name}
            />
          </div>

          <div>
            <h3 className="font-semibold">{service.description}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-br", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>
              <Button variant="secondary" size="sm">
                Reservar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
