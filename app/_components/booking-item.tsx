import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

const BookingItem = () => {
  return (
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
  )
}

export default BookingItem
