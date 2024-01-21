"use client"

import React from 'react'
import Image from "next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import amazon from "@/public/amazon.svg"
import meta from "@/public/meta.svg"
import netflix from "@/public/netflix.svg"
import linkedin from "@/public/linkedin.svg"
import microsoft from "@/public/microsoft.svg"

const Images = [amazon, meta, netflix, linkedin, microsoft]

  
  const CarouselModel = () => {
    return (
<Carousel
       plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="max-w-xs"
>
  <CarouselContent>
  {Images.map((image, index) => (
  <CarouselItem key={index} className="flex justify-center">
    <Image 
      src={image} 
      alt="brands" 

      className="w-full h-20"
    />
  </CarouselItem>
))}
  </CarouselContent>
</Carousel>
    )
  }
  
  export default CarouselModel