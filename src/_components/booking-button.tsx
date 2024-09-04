import Link from "next/link"
import { Button } from "./ui/button"
import { CalendarIcon } from "lucide-react"

const BookingButton = () => {
  return (
    <Button
      variant={"ghost"}
      className="flex items-center justify-start gap-3"
      asChild
    >
      <Link href={"/bookings"}>
        <CalendarIcon size={18} />{" "}
        <p className="text-sm lg:font-bold">Agendamentos</p>
      </Link>
    </Button>
  )
}

export default BookingButton
