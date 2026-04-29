
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
    tag: "ACTION GEAR",
    title: "Accesorios profesionales para cámaras deportivas",
    subtitle: "Graba, crea y lleva tu contenido al siguiente nivel",
    image: PlaceHolderImages.find(img => img.id === "hero-action-1")?.imageUrl || "",
    cta: "Explorar Catálogo",
  },
  {
    tag: "MOTOVLOG READY",
    title: "Perspectivas extremas",
    subtitle: "Soportes de precisión para motovloggers y aventureros",
    image: PlaceHolderImages.find(img => img.id === "hero-action-2")?.imageUrl || "",
    cta: "Ver Soportes",
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
      <Carousel setApi={setApi} className="w-full h-[70vh] md:h-[85vh]">
        <CarouselContent className="h-full ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0 h-[70vh] md:h-[85vh] relative">
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/90 z-10" />
              <Image 
                src={slide.image} 
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-6 text-white space-y-6">
                <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 px-6 py-2 uppercase tracking-[0.3em] text-[10px] font-black">
                  {slide.tag}
                </Badge>
                <h2 className="text-4xl md:text-7xl font-black max-w-4xl tracking-tighter leading-[0.95]">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl text-white/80 font-medium tracking-tight max-w-2xl">
                  {slide.subtitle}
                </p>
                <div className="flex gap-4 pt-6">
                  <Button className="pill-button button-primary h-14 px-12 text-xs uppercase tracking-widest">
                    {slide.cta}
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
            className={`w-2 h-2 rounded-full transition-premium ${
              current === index ? "w-10 bg-white" : "bg-white/30"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
