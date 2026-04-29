import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS, CATEGORIES } from '@/lib/catalog';
import { ThreeDProductCard } from '@/components/ThreeDProductCard';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find(c => c.slug === slug);
  
  if (!category) return { title: 'Categoría no encontrada | elohz' };

  return {
    title: `${category.name} | elohz Chile`,
    description: `Equipamiento premium de ${category.name.toLowerCase()} para cámaras de acción. Solo en elohz.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find(c => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = PRODUCTS.filter(p => p.categorySlug === slug);

  return (
    <main className="min-h-screen pb-20 bg-background pt-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb & Title */}
        <div className="space-y-8 mb-16">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-white transition-premium text-[10px] font-black uppercase tracking-widest"
          >
            <ChevronLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-4 border-accent pl-8">
            <div className="space-y-2">
              <Badge className="bg-accent/10 text-accent border-accent/20 font-black text-[9px] tracking-[0.2em] px-3">
                CATÁLOGO PROFESIONAL
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">{category.name}</h1>
            </div>
            <p className="text-muted-foreground font-medium text-sm md:text-base max-w-xs">
              {categoryProducts.length} productos encontrados en esta categoría.
            </p>
          </div>
        </div>

        {/* Grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {categoryProducts.map((product) => (
              <ThreeDProductCard 
                key={product.id} 
                {...product} 
                category={product.categoryName} 
              />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center space-y-4">
            <h3 className="text-2xl font-black uppercase tracking-tighter">Sin stock por el momento</h3>
            <p className="text-muted-foreground">Estamos renovando nuestro inventario. Vuelve pronto.</p>
          </div>
        )}
      </div>
    </main>
  );
}
