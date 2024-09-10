"use client"

import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { useState } from "react"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleMenuClick = () => {
    setIsOpen(true)
  }
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <div className="flex items-center gap-2">
          <Image src="/logo.png3.jpg" alt="logo" height={18} width={80} />
          <p className="text-xl text-primary">Shop</p>
        </div>

        <Button variant="ghost" size="icon">
          <MenuIcon onClick={handleMenuClick} />
        </Button>
      </CardContent>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </Card>
  )
}

export default Header
