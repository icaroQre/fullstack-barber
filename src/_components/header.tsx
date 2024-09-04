import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import SidebarButton from "./sidebar-button"
import Link from "next/link"
import UserProfileInfo from "./user-profile-info"
import { getServerSession } from "next-auth"
import { authOptions } from "@/_lib/auth"
import BookingButton from "./booking-button"

const Header = async () => {
  const session = await getServerSession(authOptions)

  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5 2xl:px-[128px] 2xl:py-8">
        <Link href={"/"}>
          <Image alt="FSW Barber" src="/logo.png" height={18} width={120} />
        </Link>
        <div className="hidden gap-6 lg:flex">
          <BookingButton />
          <UserProfileInfo user={session?.user} />
        </div>
        <div className="flex lg:hidden">
          <SidebarButton />
        </div>
      </CardContent>
    </Card>
  )
}

export default Header
