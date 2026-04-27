import React from 'react';
import { HeroCarousel } from '@/components/HeroCarousel';
import { ThreeDProductCard } from '@/components/ThreeDProductCard';
import { AIProblemSolver } from '@/components/AIProblemSolver';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Truck, 
  MessageCircle, 
  CheckCircle, 
  ShieldCheck, 
  Camera, 
  Bike, 
  Music, 
  Instagram, 
  Youtube, 
  Twitter 
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const categories = [
  { name: 'Selfie Sticks', icon: <Camera className="w-5 h-5" /> },
  { name: 'Soportes Moto', icon: <Bike className="w-5 h-5" /> },
  { name: 'Insta360 X5', icon: <Camera className="w-5 h-5" /> },
  { name: 'GoPro', icon: <Camera className="w-5 h-5" /> },
  { name: 'Cargadores', icon: <Truck className="w-5 h-5" /> },
  { name: 'Música / Audio', icon: <Music className="w-5 h-5" /> },
];

const products = [
  {
    id: '1',
    name: 'Selfie Stick Insta360 1.20 m',
    price: '$24.990',
    category: 'Selfie Sticks',
    imageUrl: PlaceHolderImages.find(img => img.id === "product-stick-1")?.imageUrl || "",
    compatibility: ['Insta360', 'GoPro'],
  },
  {
    id: '2',
    name: 'Soporte moto manillar',
    price: '$19.990',
    category: 'Moto',
    imageUrl: PlaceHolderImages.find(img => img.id === "product-moto-mount")?.imageUrl || "",
    compatibility: ['Universal', 'Moto'],
  },
  {
    id: '3',
    name: 'Selfie Stick 3 metros Black',
    price: '$45.990',
    category: 'Selfie Sticks',
    imageUrl: PlaceHolderImages.find(img => img.id === "product-stick-3m")?.imageUrl || "",
    compatibility: ['Insta360', 'GoPro'],
  },
  {
    id: '4',
    name: 'Case metálico Insta360 X5',
    price: '$32.990',
    category: 'Accesorios X5',
    imageUrl: PlaceHolderImages.find(img => img.id === "product-case-x5")?.imageUrl || "",
    compatibility: ['Insta360 X5'],
  },
  {
    id: '5',
    name: 'Pedal Overdrive',
    price: '$39.990',
    category: 'Música',
    imageUrl: PlaceHolderImages.find(img => img.id === "product-pedal-od")?.imageUrl || "",
    compatibility: ['Guitarra', 'Bajo'],
    isPedal: true,
  },
  {
    id: '6',
    name: 'Pedal Delay',
    price: '$42.990',
    category: 'Música',
    imageUrl: PlaceHolderImages.find(img => img.id === "product-pedal-delay")?.imageUrl || "",
    compatibility: ['Guitarra', 'Bajo'],
    isPedal: true,
  },
];

const compatibilityBadges = [
  'GoPro', 'Insta360', 'DJI', 'iPhone', 'Android', 'Moto', 'MTB', 'Guitarra', 'Bajo'
];

export default function Home() {
  return (
    <main className="min-h-screen pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <HeroCarousel />

      {/* Benefits Bar */}
      <div className="bg-white border-b border-border py-4 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 min-w-[600px] gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full"><Truck className="w-5 h-5 text-black" /></div>
            <span className="text-sm font-semibold whitespace-nowrap">Despacho en Chile</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full"><MessageCircle className="w-5 h-5 text-black" /></div>
            <span className="text-sm font-semibold whitespace-nowrap">Atención WhatsApp</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full"><CheckCircle className="w-5 h-5 text-black" /></div>
            <span className="text-sm font-semibold whitespace-nowrap">Productos Seleccionados</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full"><ShieldCheck className="w-5 h-5 text-black" /></div>
            <span className="text-sm font-semibold whitespace-nowrap">Garantía Real</span>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black">Categorías</h2>
          <Button variant="link" className="text-muted-foreground">Ver todo</Button>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <div key={i} className="flex flex-col items-center gap-3 group cursor-pointer">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white border border-border rounded-full flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300 shadow-sm">
                {cat.icon}
              </div>
              <span className="text-xs font-bold text-center">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-2">
          <div>
            <Badge className="bg-primary text-black mb-2">Top Picks</Badge>
            <h2 className="text-3xl font-black">Productos Destacados</h2>
          </div>
          <p className="text-muted-foreground max-w-sm">Los accesorios más buscados por creadores de contenido y músicos.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ThreeDProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* AI Problem Solver Section */}
      <AIProblemSolver />

      {/* Compatibility Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-2xl font-black mb-8">Compatibilidad Garantizada</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {compatibilityBadges.map((badge) => (
            <Badge key={badge} variant="outline" className="px-6 py-2 text-sm font-bold border-border bg-white hover:border-primary transition-colors cursor-default">
              {badge}
            </Badge>
          ))}
        </div>
      </section>

      {/* Music Focused Section */}
      <section className="py-16 bg-neutral-100 mt-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
          <div className="space-y-6">
            <Badge className="bg-black text-white">Music & Audio</Badge>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">Para músicos creadores</h2>
            <p className="text-muted-foreground text-lg">Pedales de efecto económicos con calidad profesional. Overdrive, Delay, Chorus y más para llevar tu sonido al siguiente nivel sin gastar una fortuna.</p>
            <div className="flex gap-4 pt-4">
              <Button className="bg-black text-white pill-button h-12 px-8 font-bold hover:bg-neutral-800">Explorar Pedales</Button>
            </div>
          </div>
          <div className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src={PlaceHolderImages.find(img => img.id === "hero-guitar")?.imageUrl || ""}
              alt="Music Gear"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-12">Preguntas Frecuentes</h2>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-border">
            <h4 className="font-black mb-2">¿Son compatibles con mi cámara?</h4>
            <p className="text-muted-foreground text-sm">Nuestros accesorios usan monturas universales estándar de 1/4" y sistema de hebilla GoPro, compatibles con el 99% de cámaras de acción del mercado.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-border">
            <h4 className="font-black mb-2">¿Cómo realizo la compra?</h4>
            <p className="text-muted-foreground text-sm">Operamos principalmente vía WhatsApp para brindarte asesoría personalizada antes de pagar. Hacemos envíos a todo Chile.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-border">
            <h4 className="font-black mb-2">¿Tienen garantía?</h4>
            <p className="text-muted-foreground text-sm">Todos nuestros productos cuentan con garantía real contra defectos de fábrica por 3 meses.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-black tracking-tighter">GEARVIBE</h3>
            <p className="text-muted-foreground text-sm">Tu tienda premium de gadgets tecnológicos y accesorios para creadores en Chile.</p>
            <div className="flex gap-4">
              <Instagram className="w-5 h-5 cursor-pointer hover:text-primary" />
              <Youtube className="w-5 h-5 cursor-pointer hover:text-primary" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-primary" />
            </div>
          </div>
          <div>
            <h4 className="font-black mb-4">Productos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-black cursor-pointer">Selfie Sticks</li>
              <li className="hover:text-black cursor-pointer">Soportes Moto</li>
              <li className="hover:text-black cursor-pointer">Cámaras 360</li>
              <li className="hover:text-black cursor-pointer">Pedales Guitarra</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-4">Ayuda</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-black cursor-pointer">Envíos</li>
              <li className="hover:text-black cursor-pointer">Pagos</li>
              <li className="hover:text-black cursor-pointer">Contacto</li>
              <li className="hover:text-black cursor-pointer">Garantía</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-black">Suscríbete</h4>
            <p className="text-xs text-muted-foreground">Recibe ofertas exclusivas de lanzamiento.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-neutral-100 border-none rounded-full px-4 text-sm h-10 w-full" />
              <Button size="sm" className="bg-black text-white pill-button">OK</Button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2024 GearVibe Chile. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <span>Privacidad</span>
            <span>Términos</span>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/56912345678" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 whitespace-nowrap font-bold text-sm">
          ¿En qué te ayudamos?
        </span>
      </a>
    </main>
  );
}

import Image from 'next/image';