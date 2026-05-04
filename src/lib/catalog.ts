import { PlaceHolderImages } from './placeholder-images';

export interface Product {
  id: string;
  name: string;
  price: string;
  brand?: string;
  badge?: string;
  categoryName: string;
  categorySlug: string;
  imageUrl: string;
  description: string;
  compatibility: string;
  recommendedUse: string;
  additionalImages?: string[];
  model3dUrl?: string;
  videoUrl?: string;
}

export const CATEGORIES = [
  { name: "Selfie Sticks", slug: "selfie-sticks" },
  { name: "Soportes Moto / Vehículo", slug: "soportes-moto" },
  { name: "Trípodes", slug: "tripodes" },
  { name: "Soportes Smartphone", slug: "smartphone" },
  { name: "Accesorios Cámara", slug: "accesorios-camara" },
  { name: "Accesorios Corporales", slug: "corporales" },
];

export const PRODUCTS: Product[] = [
  // Selfie Sticks
  { 
    id: 'ss-1', 
    name: 'Selfie stick insta 360 1.20 mt', 
    price: '$19.990', 
    brand: 'Genérico', 
    categoryName: "Selfie Sticks", 
    categorySlug: "selfie-sticks", 
    imageUrl: PlaceHolderImages.find(img => img.id === "prod-stick-120")?.imageUrl || "",
    description: "Selfie stick de 1.20 metros ideal para cámaras Insta360 y grabaciones en movimiento. Su tamaño permite lograr mejores ángulos en viajes, deportes, rutas, paseos y contenido 360°. Recomendado para creadores de contenido que buscan una toma más amplia sin cargar accesorios grandes.",
    compatibility: "Insta360 y cámaras deportivas compatibles con el sistema de montaje adecuado.",
    recommendedUse: "Viajes, deportes, contenido 360°, grabaciones outdoor y tomas en movimiento.",
    additionalImages: [
       "https://picsum.photos/seed/ss1-1/800/800",
       "https://picsum.photos/seed/ss1-2/800/800"
    ]
  },
  { 
    id: 'ss-2', 
    name: 'Selfie Stick 3 metros (black)', 
    price: '$32.990', 
    brand: 'Genérico', 
    badge: '🔥 Más vendido',
    categoryName: "Selfie Sticks", 
    categorySlug: "selfie-sticks", 
    imageUrl: PlaceHolderImages.find(img => img.id === "prod-stick-3m")?.imageUrl || "",
    description: "Selfie stick extensible de 3 metros diseñado para tomas de largo alcance, planos amplios y contenido tipo drone. Ideal para grabar paisajes, deportes, viajes y escenas donde se necesita mayor distancia entre la cámara y la persona.",
    compatibility: "Insta360, GoPro y cámaras deportivas compatibles con adaptador.",
    recommendedUse: "Tomas amplias, contenido outdoor, viajes, paisajes y grabaciones creativas."
  },
  { 
    id: 'ss-3', 
    name: 'Selfie 90 cm telesin', 
    price: '$24.990', 
    brand: 'Telesin', 
    categoryName: "Selfie Sticks", 
    categorySlug: "selfie-sticks", 
    imageUrl: PlaceHolderImages.find(img => img.id === "prod-stick-90")?.imageUrl || "",
    description: "Selfie stick Telesin de 90 cm, compacto y fácil de transportar. Ideal para cámaras deportivas, viajes, grabaciones rápidas y contenido donde se necesita comodidad sin usar un accesorio demasiado largo.",
    compatibility: "GoPro, Insta360, DJI Osmo y cámaras deportivas compatibles.",
    recommendedUse: "Viajes, grabaciones rápidas, redes sociales, YouTube y contenido outdoor."
  },
  
  // Soportes Moto
  { 
    id: 'mv-1', 
    name: 'Soporte moto Manillar/Carenado insta gp', 
    price: '$19.990', 
    brand: 'Genérico', 
    categoryName: "Soportes Moto / Vehículo", 
    categorySlug: "soportes-moto", 
    imageUrl: PlaceHolderImages.find(img => img.id === "prod-moto-handle")?.imageUrl || "",
    description: "Soporte para instalar cámaras deportivas en moto, manillar o carenado. Permite capturar rutas, recorridos y contenido en primera persona con mayor estabilidad. Ideal para youtubers, motociclistas y creadores de contenido en moto que graban desde la moto.",
    compatibility: "GoPro, Insta360 y cámaras deportivas compatibles con adaptador tipo action cam.",
    recommendedUse: "Moto, rutas, grabación POV, viajes y contenido para YouTube."
  },
  { 
    id: 'mv-2', 
    name: 'Soporte parabrisa insta/gopro', 
    price: '$22.990', 
    brand: 'Sunnylife', 
    badge: '🔥 Más vendido',
    categoryName: "Soportes Moto / Vehículo", 
    categorySlug: "soportes-moto", 
    imageUrl: PlaceHolderImages.find(img => img.id === "prod-windshield")?.imageUrl || "",
    description: "Soporte de parabrisa para cámaras deportivas, pensado para grabar desde vehículos con una vista clara del camino. Ideal para viajes, rutas, contenido en auto y registros de trayectos.",
    compatibility: "Insta360, GoPro y cámaras deportivas compatibles.",
    recommendedUse: "Auto, viajes, rutas, grabación desde vehículo y contenido para redes."
  },
  { 
    id: 'mv-3', 
    name: 'Adaptador Casco Moto TELESIN', 
    price: '$15.990', 
    brand: 'Telesin', 
    categoryName: "Soportes Moto / Vehículo", 
    categorySlug: "soportes-moto", 
    imageUrl: PlaceHolderImages.find(img => img.id === "prod-helmet-chin")?.imageUrl || "",
    description: "Adaptador Telesin para montar cámara deportiva en casco de moto. Diseñado para registrar rutas, recorridos y contenido en primera persona de forma más cómoda y segura.",
    compatibility: "GoPro, Insta360, DJI Osmo y cámaras deportivas compatibles.",
    recommendedUse: "Moto, casco, rutas, grabación POV, YouTube y contenido outdoor."
  },
  
  // Trípodes
  { 
    id: 'tr-1', 
    name: 'Mini trípode gopro', 
    price: '$16.990', 
    brand: 'Ulanzi', 
    categoryName: "Trípodes", 
    categorySlug: "tripodes", 
    imageUrl: "https://bwdvsbxwqlnlzfwfsoid.supabase.co/storage/v1/object/public/Products/MinitripodeGoPro/20250912_132852.png",
    description: "Mini trípode compacto para GoPro y cámaras deportivas. Permite apoyar la cámara en superficies planas para grabar contenido estable, hacer tomas fijas, fotos, videos cortos o material para YouTube y redes sociales.",
    compatibility: "GoPro y cámaras deportivas compatibles.",
    recommendedUse: "Grabación fija, escritorio, viajes, contenido para redes y fotos."
  },
  { 
    id: 'tr-2', 
    name: 'Mini trípode insta', 
    price: '$14.990', 
    brand: 'Genérico', 
    categoryName: "Trípodes", 
    categorySlug: "tripodes", 
    imageUrl: PlaceHolderImages.find(img => img.id === "prod-tripod-insta")?.imageUrl || "",
    description: "Mini trípode compacto para cámaras Insta360. Ideal para grabaciones estables, tomas en 360°, contenido en interiores, exteriores, viajes y creación de videos con mejor encuadre.",
    compatibility: "Insta360 y cámaras compatibles con rosca o adaptador adecuado.",
    recommendedUse: "Contenido 360°, grabación fija, viajes, escritorio y redes sociales."
  },
  
  // Smartphone
  { 
    id: 'sp-1', 
    name: 'Soporte smartphone giratorio CNC', 
    price: '$12.990', 
    brand: 'Genérico', 
    categoryName: "Soportes Smartphone", 
    categorySlug: "smartphone", 
    imageUrl: PlaceHolderImages.find(img => img.id === "prod-phone-cnc")?.imageUrl || "",
    description: "Soporte giratorio para smartphone con rotación 360°, fabricado para entregar mayor firmeza y ajuste. Útil para grabar contenido, usar el teléfono como pantalla de apoyo, navegación o captura de videos desde distintos ángulos.",
    compatibility: "Smartphones compatibles según tamaño del soporte.",
    recommendedUse: "Grabación con celular, navegación, contenido para redes y uso diario."
  },
  { 
    id: 'sp-2', 
    name: 'Soporte smartphone giratorio PLA', 
    price: '$8.990', 
    brand: 'Genérico', 
    categoryName: "Soportes Smartphone", 
    categorySlug: "smartphone", 
    imageUrl: PlaceHolderImages.find(img => img.id === "prod-phone-cnc")?.imageUrl || "",
    description: "Soporte liviano para smartphone con giro 360°. Pensado para quienes buscan una solución práctica, simple y funcional para montar el celular en distintas posiciones.",
    compatibility: "Smartphones compatibles según tamaño del soporte.",
    recommendedUse: "Uso diario, grabaciones simples, soporte de celular y contenido casual."
  },
  
  // Accesorios Cámara
  { 
    id: 'ac-1', 
    name: 'Lente repuesto GoPro 9/10/11/12', 
    price: '$18.990', 
    brand: 'Genérico', 
    badge: '🔥 Más vendido',
    categoryName: "Accesorios Cámara", 
    categorySlug: "accesorios-camara", 
    imageUrl: PlaceHolderImages.find(img => img.id === "prod-lens-gp")?.imageUrl || "",
    description: "Lente de repuesto compatible con GoPro Hero 9, 10, 11 y 12. Ayuda a mantener la cámara protegida y lista para grabar cuando el lente original está rayado, dañado o desgastado por el uso.",
    compatibility: "GoPro Hero 9, Hero 10, Hero 11 y Hero 12.",
    recommendedUse: "Repuesto, protección, mantenimiento y uso intensivo de cámara."
  },
  { 
    id: 'ac-2', 
    name: 'Soporte giratorio Insta 360', 
    price: '$15.990', 
    brand: 'Genérico', 
    categoryName: "Accesorios Cámara", 
    categorySlug: "accesorios-camara", 
    imageUrl: PlaceHolderImages.find(img => img.id === "prod-moto-handle")?.imageUrl || "",
    description: "Soporte giratorio para cámaras Insta360, ideal para capturar ángulos dinámicos y movimientos más creativos. Permite mejorar la variedad de tomas en contenido 360° y grabaciones para redes sociales.",
    compatibility: "Insta360 y cámaras compatibles con el montaje adecuado.",
    recommendedUse: "Contenido 360°, tomas dinámicas, redes sociales y creación de video."
  },
  { 
    id: 'ac-3', 
    name: 'Pack soporte giratorio + selfie 1.20', 
    price: '$34.990', 
    brand: 'Genérico', 
    categoryName: "Accesorios Cámara", 
    categorySlug: "accesorios-camara", 
    imageUrl: PlaceHolderImages.find(img => img.id === "prod-stick-120")?.imageUrl || "",
    description: "Pack combinado con soporte giratorio y selfie stick de 1.20 metros. Una opción práctica para creadores de contenido que buscan más versatilidad en un solo kit, permitiendo grabar desde distintos ángulos y distancias.",
    compatibility: "Insta360, GoPro y cámaras deportivas compatibles.",
    recommendedUse: "Creación de contenido, viajes, deportes, grabación 360° y tomas creativas."
  },
  { 
    id: 'ac-4', 
    name: 'Adaptador magnético DJI Osmo Action 5 Pro', 
    price: '$12.990', 
    brand: 'Genérico', 
    categoryName: "Accesorios Cámara", 
    categorySlug: "accesorios-camara", 
    imageUrl: PlaceHolderImages.find(img => img.id === "prod-tripod-insta")?.imageUrl || "",
    description: "Adaptador magnético para cámaras DJI Osmo Action 5 Pro, Osmo 360 y Nano. Permite un montaje rápido y práctico, ideal para cambiar la cámara de posición con mayor facilidad durante la grabación.",
    compatibility: "DJI Osmo Action 5 Pro, DJI Osmo 360 y DJI Osmo Nano.",
    recommendedUse: "Montaje rápido, grabaciones dinámicas, viajes, deporte y creación de contenido."
  },
  
  // Corporales
  { 
    id: 'bc-1', 
    name: 'Pechera Telesin', 
    price: '$26.990', 
    brand: 'Telesin', 
    badge: '🔥 Más vendido',
    categoryName: "Accesorios Corporales", 
    categorySlug: "corporales", 
    imageUrl: PlaceHolderImages.find(img => img.id === "prod-chest-mount")?.imageUrl || "",
    description: "Pechera Telesin para grabación POV en primera persona. Permite registrar actividades dejando las manos libres, ideal para moto, bicicleta, trekking, deporte, rutas y contenido dinámico.",
    compatibility: "GoPro, Insta360, DJI Osmo y cámaras deportivas compatibles.",
    recommendedUse: "Grabación POV, moto, bicicleta, trekking, deporte y contenido en movimiento."
  },
];
