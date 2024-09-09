import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"

const Home = () => {
  return (
    <div>
      <>
        <Header />
        <div className="p-5">
          <h2 className="text-xl font-bold">Olá, Wendryus</h2>
          <p>Segunda-feira, 9 de setembro</p>

          <div className="item-center mt-5 flex gap-2">
            <Input placeholder="Buscar" />
            <Button>
              <SearchIcon />
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

          <Card className="mt-6">
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
        </div>
      </>
    </div>
  )
}

export default Home
