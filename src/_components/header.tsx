import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react"
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

const Header = () => {
  return (
    <Card>
      <div>
        <CardContent className="flex flex-row items-center justify-between p-5">
          <Image alt="FSW Barber" src="/logo.png" height={18} width={120} />
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

              <div className="flex flex-row items-center justify-start gap-3 border-b border-solid py-6">
                <Avatar className="h-[48px] w-[48px]">
                  <AvatarImage
                    className="rounded-full border-2 border-solid border-primary"
                    src="https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png"
                  />
                </Avatar>

                <div className="flex flex-col">
                  <h3 className="text-base font-bold">Ícaro Queiroz</h3>
                  <p className="text-xs">icaro.queiroz.reccanello@gmail.com</p>
                </div>
              </div>

              {/* <div className="flex flex-row items-center justify-between py-6 border-b border-solid">
                <h2 className="font-bold text-lg">Olá, faça seu login!</h2>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </div> */}

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
                    >
                      <Image
                        src={option.imageUrl}
                        alt={option.title}
                        height={18}
                        width={18}
                      />
                      <p className="text-sm">{option.title}</p>
                    </Button>
                  </SheetClose>
                ))}
              </div>

              <div className="flex flex-col gap-1 py-6">
                <Button
                  className="flex items-center justify-start gap-3"
                  variant={"ghost"}
                >
                  {" "}
                  <LogOutIcon size={18} />{" "}
                  <p className="text-sm">Sair da conta</p>{" "}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </CardContent>
      </div>
    </Card>
  )
}

export default Header
