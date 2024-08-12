import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import Image from "next/image"
import { signIn } from "next-auth/react"
import { Button } from "./ui/button"

const DialogLogin = () => {
  const handleLoginWithGoogleClick = () => signIn("google")

  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça login na plataforma</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta do Google
        </DialogDescription>
      </DialogHeader>

      <Button
        variant={"outline"}
        className="gap-1"
        onClick={() => handleLoginWithGoogleClick()}
      >
        <Image
          src={"/google.svg"}
          alt="Fazer login com Google"
          width={18}
          height={18}
        />
        <p className="font-bold">Google</p>
      </Button>
    </>
  )
}

export default DialogLogin
