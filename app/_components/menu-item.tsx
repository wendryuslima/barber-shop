import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
// import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"
import quickSearchOptions from "../_constants/search"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

const MenuItem = () => {
  return (
    <SheetContent className="overflow-y-scroll">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between gap-2 border-b border-solid py-5">
        <h2 className="flex font-bold">Olá, faça seu loguin</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon">
              <LogInIcon />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90%]">
            <DialogHeader>
              <DialogTitle>Faça seu login na plataforma</DialogTitle>
              <DialogDescription>
                Conect-se usando sua conta do Google
              </DialogDescription>
            </DialogHeader>

            <Button variant="outline" className="flex gap-2 font-bold">
              <Image src="/google.svg" width={18} height={18} alt="google" />
              Google
            </Button>
          </DialogContent>
        </Dialog>
        {/* <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </Avatar>

        <div className="flex flex-col">
          <p className="font-bold">Wendryus Lima</p>
          <p className="text-xs text-gray-400">wendryuslima31@gmail.com</p>
        </div> */}
      </div>

      <div className="flex flex-col gap-4 border-b border-solid py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>

        <Button className="justify-start gap-2" variant="ghost">
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </div>

      <div className="flex flex-col gap-4 border-b border-solid py-5">
        {quickSearchOptions.map((option) => (
          <Button
            key={option.title}
            className="justify-start gap-2"
            variant="ghost"
          >
            <Image src={option.imageUrl} height={18} width={18} alt="Menu" />
            {option.title}
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-4 border-b border-solid py-5">
        <Button className="justify-start gap-2" variant="ghost">
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default MenuItem
