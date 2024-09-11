"use client"

import Image from "next/image"
import { Card, CardContent } from "./ui/card"

import MenuItem from "./menu-item"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <div className="flex items-center gap-2">
          <Image src="/logo.png3.jpg" alt="logo" height={18} width={80} />
          <p className="text-xl text-primary">Shop</p>
        </div>

        <Sheet>
          <SheetTrigger>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <MenuItem />
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
