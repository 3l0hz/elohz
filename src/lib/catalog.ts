import { PlaceHolderImages } from './placeholder-images';

export interface Product {
  id: string;
  name: string;
  price: string;
  brand?: string;
  isTopPick?: boolean;
  categoryName: string;
  categorySlug: string;
  imageUrl: string;
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
  { id: 'ss-1', name: 'Selfie stick insta 360 1.20 mt', price: '$19.990', brand: 'Genérico', isTopPick: true, categoryName: "Selfie Sticks", categorySlug: "selfie-sticks", imageUrl: PlaceHolderImages.find(img => img.id === "prod-stick-120")?.imageUrl || "" },
  { id: 'ss-2', name: 'Selfie Stick 3 metros (black)', price: '$32.990', brand: 'Genérico', categoryName: "Selfie Sticks", categorySlug: "selfie-sticks", imageUrl: PlaceHolderImages.find(img => img.id === "prod-stick-3m")?.imageUrl || "" },
  { id: 'ss-3', name: 'Selfie 90 cm telesin', price: '$24.990', brand: 'Telesin', categoryName: "Selfie Sticks", categorySlug: "selfie-sticks", imageUrl: PlaceHolderImages.find(img => img.id === "prod-stick-90")?.imageUrl || "" },
  
  // Soportes Moto
  { id: 'mv-1', name: 'Soporte moto Manillar/Carenado insta gp', price: '$19.990', brand: 'Genérico', isTopPick: true, categoryName: "Soportes Moto / Vehículo", categorySlug: "soportes-moto", imageUrl: PlaceHolderImages.find(img => img.id === "prod-moto-handle")?.imageUrl || "" },
  { id: 'mv-2', name: 'Soporte parabrisa insta/gopro', price: '$22.990', brand: 'Sunnylife', categoryName: "Soportes Moto / Vehículo", categorySlug: "soportes-moto", imageUrl: PlaceHolderImages.find(img => img.id === "prod-windshield")?.imageUrl || "" },
  { id: 'mv-3', name: 'Adaptador Casco Moto TELESIN', price: '$15.990', brand: 'Telesin', categoryName: "Soportes Moto / Vehículo", categorySlug: "soportes-moto", imageUrl: PlaceHolderImages.find(img => img.id === "prod-helmet-chin")?.imageUrl || "" },
  
  // Trípodes
  { id: 'tr-1', name: 'Mini trípode gopro', price: '$16.990', brand: 'Ulanzi', isTopPick: true, categoryName: "Trípodes", categorySlug: "tripodes", imageUrl: PlaceHolderImages.find(img => img.id === "prod-tripod-ulanzi")?.imageUrl || "" },
  { id: 'tr-2', name: 'Mini trípode insta', price: '$14.990', brand: 'Genérico', categoryName: "Trípodes", categorySlug: "tripodes", imageUrl: PlaceHolderImages.find(img => img.id === "prod-tripod-insta")?.imageUrl || "" },
  
  // Smartphone
  { id: 'sp-1', name: 'Soporte smartphone giratorio CNC', price: '$12.990', brand: 'Genérico', categoryName: "Soportes Smartphone", categorySlug: "smartphone", imageUrl: PlaceHolderImages.find(img => img.id === "prod-phone-cnc")?.imageUrl || "" },
  { id: 'sp-2', name: 'Soporte smartphone giratorio PLA', price: '$8.990', brand: 'Genérico', categoryName: "Soportes Smartphone", categorySlug: "smartphone", imageUrl: PlaceHolderImages.find(img => img.id === "prod-phone-cnc")?.imageUrl || "" },
  
  // Accesorios Cámara
  { id: 'ac-1', name: 'Lente repuesto GoPro 9/10/11/12', price: '$18.990', brand: 'Genérico', categoryName: "Accesorios Cámara", categorySlug: "accesorios-camara", imageUrl: PlaceHolderImages.find(img => img.id === "prod-lens-gp")?.imageUrl || "" },
  { id: 'ac-2', name: 'Soporte giratorio Insta 360', price: '$15.990', brand: 'Genérico', categoryName: "Accesorios Cámara", categorySlug: "accesorios-camara", imageUrl: PlaceHolderImages.find(img => img.id === "prod-moto-handle")?.imageUrl || "" },
  { id: 'ac-3', name: 'Pack soporte giratorio + selfie 1.20', price: '$34.990', brand: 'Genérico', isTopPick: true, categoryName: "Accesorios Cámara", categorySlug: "accesorios-camara", imageUrl: PlaceHolderImages.find(img => img.id === "prod-stick-120")?.imageUrl || "" },
  { id: 'ac-4', name: 'Adaptador magnético DJI Osmo Action 5 Pro', price: '$12.990', brand: 'Genérico', categoryName: "Accesorios Cámara", categorySlug: "accesorios-camara", imageUrl: PlaceHolderImages.find(img => img.id === "prod-tripod-insta")?.imageUrl || "" },
  
  // Corporales
  { id: 'bc-1', name: 'Pechera Telesin', price: '$26.990', brand: 'Telesin', isTopPick: true, categoryName: "Accesorios Corporales", categorySlug: "corporales", imageUrl: PlaceHolderImages.find(img => img.id === "prod-chest-mount")?.imageUrl || "" },
];
