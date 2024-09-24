import { Barbershop } from "@prisma/client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"
import BarberShopItem from "./barbershop-item"

interface BarbershopCarouselProps {
  barbershops: Barbershop[]
}

export const BarbershopCarousel = ({
  barbershops,
}: BarbershopCarouselProps) => {
  return (
    <Carousel>
      <CarouselContent className="ml-0 gap-4 first:-ml-4 last:mr-4">
        {barbershops.map((barbershop) => (
          <CarouselItem
            key={barbershop.id}
            className="basis-[167px] md:basis-[213px]"
          >
            <BarberShopItem barbershop={barbershop} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-3 z-50 size-8 md:-left-6 md:size-12" />
      <CarouselNext className="-right-3 size-8 md:-right-6 md:size-12" />
    </Carousel>
  )
}
