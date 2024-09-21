"use client"

import Image from "next/image"
import { Card, CardContent } from "./ui/card"

import MenuItem from "./menu-item"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import Link from "next/link"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src="/logo.png" alt="logo" height={100} width={100} />
          </Link>
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
