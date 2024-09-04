"use client"

import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import BarbershopItem from "./barbershop-item"
import { Barbershop } from "@prisma/client"

interface SlickProps {
  barbershops: Barbershop[]
}

const Slick = ({ barbershops }: SlickProps) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
  }

  return (
    <>
      <div className="hidden max-w-[1536px] lg:block">
        <Slider {...settings} className="gap-5">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="px-2">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </Slider>
      </div>
      <div className="mb-6 flex flex-row gap-4 overflow-auto lg:mb-10 lg:hidden lg:gap-5 [&::-webkit-scrollbar]:hidden">
        {barbershops.map((barbershop) => (
          <BarbershopItem key={barbershop.id} barbershop={barbershop} />
        ))}
      </div>
    </>
  )
}

export default Slick
