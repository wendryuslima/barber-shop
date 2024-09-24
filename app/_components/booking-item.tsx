"use client"

import { Prisma } from "@prisma/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import PhoneItem from "./phone-item"
import { Button } from "./ui/button"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"
import deleteBooking from "../_actions/delete-booking"
import { toast } from "sonner"
import { useState } from "react"
import BookingSummary from "./booking-summary"
;<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isSheetOpen, setisSheetOpen] = useState(false)
  const {
    service: { barbershop },
  } = booking
  const isConfirmed = isFuture(booking.date)

  const handleDeleteBooking = async () => {
    try {
      await deleteBooking(booking.id)
      setisSheetOpen(false)
      toast.success("Reserva cancelada com sucesso")
    } catch (error) {
      console.log(error)
      toast.error("Erro ao cancelar reserva. Tente novamente")
    }
  }

  const handleCloseSheet = (isOpen: boolean) => {
    setisSheetOpen(isOpen)
  }
  return (
    <Sheet open={isSheetOpen} onOpenChange={handleCloseSheet}>
      <SheetTrigger className="w-full min-w-[90%] md:min-w-[40%]">
        <Card className="min-w-[90%]">
          <CardContent className="flex items-center justify-between p-0">
            {/* {Esquerda} */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge
                variant={isConfirmed ? "default" : "secondary"}
                className="w-fit"
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h3 className="font-semibold">{booking.service.name}</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                </Avatar>
                <p className="text-sm">{booking.service.barbershop.name}</p>
              </div>
            </div>

            {/* {Direita} */}
            <div className="flex flex-col items-center justify-center gap-3 border-l-2 border-solid px-5 pr-5">
              <p className="text-sm">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-xl capitalize">
                {format(booking.date, "dd", { locale: ptBR })}
              </p>
              <p className="text-sm">
                {format(booking.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <SheetHeader>
          <SheetTitle>Informações da reserva</SheetTitle>
        </SheetHeader>

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

        <div className="mt-6">
          <Badge
            variant={isConfirmed ? "default" : "secondary"}
            className="w-fit"
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <div className="mb-3 mt-6">
            <BookingSummary
              barbershop={barbershop}
              service={booking.service}
              selectedDate={booking.date}
              key={barbershop.id}
            />
          </div>

          <div className="space-y-3">
            {barbershop.phones.map((phone) => (
              <PhoneItem key={phone} phone={phone} />
            ))}
          </div>
        </div>

        <SheetFooter>
          <div className="mt-11 flex items-center gap-3 md:mx-auto md:flex md:w-full md:items-center md:justify-center">
            <SheetClose asChild>
              <Button className="w-full" variant="outline">
                Voltar
              </Button>
            </SheetClose>

            {isConfirmed && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full" variant="destructive">
                    Cancelar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-[90%]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancelar reserva</AlertDialogTitle>
                    <AlertDialogDescription>
                      Deseja mesmo cancelar o agendamento?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <div className="flex gap-3">
                      <Button className="w-full" variant="outline">
                        Voltar
                      </Button>
                      <Button
                        onClick={handleDeleteBooking}
                        className="w-full"
                        variant="destructive"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
