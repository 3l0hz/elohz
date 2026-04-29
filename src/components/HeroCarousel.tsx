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
import { Badge } from "@/components/ui/badge"

const slides = [
  {
    tag: "MOTO SERIES",
    title: "Precisión en cada ruta",
    subtitle: "Soporte moto manillar elohz PRO",
    image: PlaceHolderImages.find(img => img.id === "hero-moto")?.imageUrl || "",
    cta: "Explorar Gear",
  },
  {
    tag: "360 VISION",
    title: "Ángulos sin límites",
    subtitle: "Carbon Fiber Series 3 metros",
    image: PlaceHolderImages.find(img => img.id === "hero-selfie")?.imageUrl || "",
    cta: "Ver Colección",
  },
  {
    tag: "SONIC MASTER",
    title: "Audio de Grado Profesional",
    subtitle: "Serie Overdrive & Delay elohz",
    image: PlaceHolderImages.find(img => img.id === "hero-guitar")?.imageUrl || "",
    cta: "Ver Pedales",
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
    }, 6000)

    return () => clearInterval(intervalId)
  }, [api])

  return (
    <div className="relative w-full">
      <Carousel setApi={setApi} className="w-full h-[85vh] md:h-[90vh]">
        <CarouselContent className="h-full ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0 h-[85vh] md:h-[90vh] relative">
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 z-10" />
              <Image 
                src={slide.image} 
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-6 text-white space-y-8">
                <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 px-6 py-2 uppercase tracking-[0.3em] text-[10px] font-black">
                  {slide.tag}
                </Badge>
                <h2 className="text-5xl md:text-8xl font-black max-w-5xl tracking-tighter leading-[0.9]">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl text-white/80 font-medium tracking-tight">
                  {slide.subtitle}
                </p>
                <div className="flex gap-4 pt-6">
                  <Button className="pill-button button-primary h-14 px-12 text-xs uppercase tracking-widest">
                    {slide.cta}
                  </Button>
                  <Button className="pill-button button-secondary h-14 px-12 text-xs uppercase tracking-widest">
                    Descubrir
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-premium ${
              current === index ? "w-12 bg-white" : "bg-white/30"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}