import Image from "next/image"
import { Button } from "./ui/button"
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { signIn } from "next-auth/react"

const SigInDialog = () => {
  const handleLoginWithGoogleClick = () => signIn("google")
  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça seu login na plataforma</DialogTitle>
        <DialogDescription>
          Conect-se usando sua conta do Google
        </DialogDescription>
      </DialogHeader>

      <Button
        onClick={handleLoginWithGoogleClick}
        variant="outline"
        className="flex gap-2 font-bold"
      >
        <Image src="/google.svg" width={18} height={18} alt="google" />
        Google
      </Button>
    </>
  )
}

export default SigInDialog
