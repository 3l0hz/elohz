"use client"

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const slides = [
  {
    title: "Graba tus rutas como creador pro",
    subtitle: "Producto foco: Soporte moto manillar Insta / GoPro",
    image: PlaceHolderImages.find(img => img.id === "hero-moto")?.imageUrl || "",
    cta: "Comprar ahora",
  },
  {
    title: "Selfie sticks para tomas imposibles",
    subtitle: "Producto foco: Selfie Stick 3 metros",
    image: PlaceHolderImages.find(img => img.id === "hero-selfie")?.imageUrl || "",
    cta: "Ver colección",
  },
  {
    title: "Equipa tu Insta360 X5",
    subtitle: "Producto foco: accesorios X5",
    image: PlaceHolderImages.find(img => img.id === "hero-insta360")?.imageUrl || "",
    cta: "Explorar",
  },
  {
    title: "Sonido pro sin gastar de más",
    subtitle: "Producto foco: pedales de guitarra/bajo",
    image: PlaceHolderImages.find(img => img.id === "hero-guitar")?.imageUrl || "",
    cta: "Ver pedales",
  },
];

export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })

    const intervalId = setInterval(() => {
      api.scrollNext()
    }, 5000)

    return () => clearInterval(intervalId)
  }, [api])

  return (
    <div className="relative w-full">
      <Carousel setApi={setApi} className="w-full h-[60vh] md:h-[70vh]">
        <CarouselContent className="h-full ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0 h-[60vh] md:h-[70vh] relative">
              <div className="absolute inset-0 bg-black/40 z-10" />
              <Image 
                src={slide.image} 
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-6 text-white space-y-4">
                <h2 className="text-3xl md:text-5xl font-black max-w-2xl leading-tight">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl text-white/90 font-medium">
                  {slide.subtitle}
                </p>
                <div className="flex gap-3 pt-4">
                  <Button className="bg-primary hover:bg-[#FFB800] text-black pill-button h-12 px-8 font-bold">
                    {slide.cta}
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black pill-button h-12 px-8">
                    Ver más
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              current === index ? "w-8 bg-primary" : "bg-white/50"
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}