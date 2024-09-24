"use client"

import { Barbershop, BarbershopService, Booking } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useEffect, useMemo, useState } from "react"
import { format, isPast, isToday, set } from "date-fns"

import { createBooking } from "../_actions/create-booking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

import getBookings from "../_actions/get-bookings"
import { Dialog, DialogContent } from "./ui/dialog"
import SigInDialog from "./sign-in-dialog"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

const TIME_LIST = [
  "09:00",
  "09:30",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
]

interface GetTimeListProps {
  bookings: Booking[]
  selectedDay: Date
}

const getTimeList = ({ bookings, selectedDay }: GetTimeListProps) => {
  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0])
    const minute = Number(time.split(":")[1])

    const timeIsOnThePast = isPast(
      set(new Date(), { hours: hour, minutes: minute }),
    )
    if (timeIsOnThePast && isToday(selectedDay)) {
      return false
    }

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minute,
    )
    if (hasBookingOnCurrentTime) {
      return false
    }

    return true
  })
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession()
  const [sigInDialogIsOpen, setsigInDialogIsOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )
  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [bookingSheetIsOpen, setbookingSheetIsOpen] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return

      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      })
      setDayBookings(bookings)
    }

    fetch()
  }, [selectedDay, service.id])

  const handleoBookingClick = () => {
    if (data?.user) {
      return setbookingSheetIsOpen(true)
    }
    return setsigInDialogIsOpen(true)
  }

  const handleBookSheetOpenChange = () => {
    setDayBookings([])
    setSelectedTime(undefined)
    setSelectedDay(undefined)
    setbookingSheetIsOpen(false)
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleCrateBooking = async () => {
    try {
      if (!selectedDay || !selectedTime) return
      const hour = Number(selectedTime.split(":")[0])
      const minutes = Number(selectedTime.split(":")[1])
      const newDate = set(selectedDay, {
        minutes: minutes,
        hours: hour,
      })
      await createBooking({
        serviceId: service.id,
        userId: (data?.user as any).id,
        date: newDate,
      })
      toast.success("Reserva criada com sucesso!")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao reservar")
    }
  }

  const timeList = useMemo(() => {
    if (!selectedDay) return []
    return getTimeList({
      bookings: dayBookings,
      selectedDay,
    })
  }, [dayBookings, selectedDay])

  return (
    <>
      <Card className="mb-3">
        <CardContent className="p-3">
          <div className="mb-3 flex items-center gap-2 p-5">
            <div className="relative min-h-[110px] min-w-[110px]">
              <Image
                src={service.imageUrl}
                fill
                className="rounded-lg object-cover"
                alt={service.name}
              />
            </div>

            <div className="flex w-full flex-col justify-between">
              <h3 className="font-semibold">{service.name}</h3>
              <p className="text-sm text-gray-400">{service.description}</p>

              {/* Bloco de preço e botão */}
              <div className="mt-3 flex flex-col items-start gap-2">
                <p className="text-sm font-bold text-primary">
                  {Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(service.price))}
                </p>

                <Sheet
                  open={bookingSheetIsOpen}
                  onOpenChange={handleBookSheetOpenChange}
                >
                  <Button
                    onClick={handleoBookingClick}
                    variant="secondary"
                    size="sm"
                  >
                    Reservar
                  </Button>

                  <SheetContent className="max-w-3xl overflow-x-scroll md:w-full [&::-webkit-scrollbar]:hidden">
                    <SheetHeader>
                      <SheetTitle>Fazer reserva</SheetTitle>
                    </SheetHeader>

                    <div className="p-5">
                      <div className="md:calendar-container px-4 md:w-full">
                        {/* Calendário com grid fixo e ocupando espaço maior */}
                        <Calendar
                          mode="single"
                          selected={selectedDay}
                          fromDate={new Date()}
                          onSelect={handleDateSelect}
                          styles={{
                            head_cell: {
                              textTransform: "capitalize",
                            },
                            cell: {
                              width: "auto", // Remove o width fixo
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            },
                            button: {
                              width: "100%",
                              height: "auto",
                              padding: "10px", // Dá mais espaço aos botões
                            },
                            nav_button_previous: {
                              width: "32px",
                              height: "32px",
                            },
                            nav_button_next: {
                              width: "32px",
                              height: "32px",
                            },
                            caption: {
                              textTransform: "capitalize",
                            },
                          }}
                          locale={ptBR}
                          className="md:grid md:w-full md:grid-cols-7 md:gap-3 md:text-center" // Mais espaçamento entre os dias
                        />
                      </div>
                    </div>

                    {selectedDay && (
                      <div className="mb-5 flex gap-3 overflow-x-auto border-b border-solid pb-5 [&::-webkit-scrollbar]:hidden">
                        {timeList.length > 0 ? (
                          timeList.map((time) => (
                            <Button
                              className="rounded-full"
                              onClick={() => handleTimeSelect(time)}
                              variant={
                                selectedTime === time ? "default" : "outline"
                              }
                              key={time}
                            >
                              {time}
                            </Button>
                          ))
                        ) : (
                          <p className="text-xs">Não há horários disponíveis</p>
                        )}
                      </div>
                    )}

                    {selectedTime && selectedDay && (
                      <div className="p-5">
                        <Card className="gap-3">
                          <CardContent className="space-y-4 p-5">
                            <div className="flex items-center justify-between">
                              <h2 className="font-bold">{service.name}</h2>
                              <p className="text-sm font-bold">
                                {Intl.NumberFormat("pt-br", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(Number(service.price))}
                              </p>
                            </div>

                            <div className="flex items-center justify-between">
                              <h2 className="text-sm text-gray-400">Data</h2>
                              <p className="text-sm">
                                {format(selectedDay, "d 'de' MMMM", {
                                  locale: ptBR,
                                })}
                              </p>
                            </div>

                            <div className="flex items-center justify-between">
                              <h2 className="text-sm text-gray-400">Horário</h2>
                              <p className="text-sm">{selectedTime}</p>
                            </div>

                            <div className="flex items-center justify-between">
                              <h2 className="text-sm text-gray-400">
                                Barbearia
                              </h2>
                              <p className="text-sm">{barbershop.name}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    {selectedDay && selectedTime && (
                      <SheetFooter className="px-5">
                        <SheetClose asChild>
                          <Button type="submit" onClick={handleCrateBooking}>
                            Confirmar
                          </Button>
                        </SheetClose>
                      </SheetFooter>
                    )}
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={sigInDialogIsOpen}
        onOpenChange={(open) => setsigInDialogIsOpen(open)}
      >
        <DialogContent className="w-[90%]">
          <SigInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ServiceItem
