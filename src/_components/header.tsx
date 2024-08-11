import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import SidebarButton from "./sidebar-button"

const Header = () => {
  return (
    <Card>
      <div>
        <CardContent className="flex flex-row items-center justify-between p-5">
          <Image alt="FSW Barber" src="/logo.png" height={18} width={120} />
          <SidebarButton />
        </CardContent>
      </div>
    </Card>
  )
}

export default Header
