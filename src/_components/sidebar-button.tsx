"use client"

import Image from "next/image"
import { Button } from "./ui/button"
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { quickSearchOptions } from "@/_constants/search"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { signIn, signOut, useSession } from "next-auth/react"

const SidebarButton = () => {
  const handleLoginWithGoogleClick = () => signIn("google")
  const { data } = useSession()
  const handleLogoutClick = () => signOut()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <SheetHeader>
          <SheetTitle className="flex text-left">Menu</SheetTitle>
        </SheetHeader>

        {data?.user ? (
          <>
            <div className="flex flex-row items-center justify-start gap-3 border-b border-solid py-6">
              <Avatar className="h-[48px] w-[48px]">
                <AvatarImage
                  className="rounded-full border-2 border-solid border-primary"
                  src={data.user.image ?? ""}
                />
              </Avatar>

              <div className="flex flex-col">
                <h3 className="text-base font-bold">{data.user.name}</h3>
                <p className="text-xs">{data.user.email}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-row items-center justify-between border-b border-solid py-6">
            <h2 className="text-lg font-bold">Olá, faça seu login!</h2>

            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>

              <DialogContent className="w-[80%] rounded-xl">
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
              </DialogContent>
            </Dialog>
          </div>
        )}

        <div className="flex flex-col gap-1 border-b border-solid py-6">
          <SheetClose asChild>
            <Button
              className="flex items-center justify-start gap-3"
              variant={"ghost"}
              asChild
            >
              <Link href={"/"}>
                <HomeIcon size={18} /> <p className="text-sm">Início</p>
              </Link>
            </Button>
          </SheetClose>

          <SheetClose asChild>
            <Button
              variant={"ghost"}
              className="flex items-center justify-start gap-3"
              asChild
            >
              <Link href={"/"}>
                <CalendarIcon size={18} />{" "}
                <p className="text-sm">Agendamentos</p>
              </Link>
            </Button>
          </SheetClose>
        </div>

        <div className="flex flex-col gap-1 border-b border-solid py-6">
          {quickSearchOptions.map((option) => (
            <SheetClose key={option.title} asChild>
              <Button
                variant={"ghost"}
                className="flex items-center justify-start gap-3"
                asChild
              >
                <Link href={`/barbershops?search=${option.title}`}>
                  <Image
                    src={option.imageUrl}
                    alt={option.title}
                    height={18}
                    width={18}
                  />
                  <p className="text-sm">{option.title}</p>
                </Link>
              </Button>
            </SheetClose>
          ))}
        </div>

        {data?.user ? (
          <div className="flex flex-col gap-1 py-6">
            <Button
              className="flex items-center justify-start gap-3"
              variant={"ghost"}
              onClick={() => handleLogoutClick()}
            >
              {" "}
              <LogOutIcon size={18} /> <p className="text-sm">Sair da conta</p>{" "}
            </Button>
          </div>
        ) : (
          <></>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default SidebarButton
