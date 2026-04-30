import type {Metadata} from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'elohz | Tech Gadgets & Action Accessories',
  description: 'Tienda premium de accesorios para cámaras de acción, soportes de moto y pedales de guitarra en Chile.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <Script 
          type="module" 
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js" 
          strategy="afterInteractive"
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary selection:text-black">
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
