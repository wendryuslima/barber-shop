import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import { Button } from "./_components/ui/button"
import Image from "next/image"

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
        </div>
      </>
    </div>
  )
}

export default Home
