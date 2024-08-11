"use client"

import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneItemProps {
  phone: string
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  const handleCopyPhoneClick = (phone: string) => {
    navigator.clipboard.writeText(phone)
    toast.success("Telefone copiado com sucesso!")
  }

  return (
    <div key={phone} className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <SmartphoneIcon />
        <p className="text-sm">{phone}</p>
      </div>
      <Button variant={"outline"} size={"sm"}>
        {" "}
        <p className="font-bold" onClick={() => handleCopyPhoneClick(phone)}>
          Copiar
        </p>
      </Button>
    </div>
  )
}

export default PhoneItem
