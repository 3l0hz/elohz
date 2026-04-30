"use client"

import React, { useState } from 'react';
import { findProductSolutions } from '@/ai/flows/product-solution-finder';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sparkles, Loader2, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AIProblemSolver() {
  const [problem, setProblem] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem.trim()) return;
    
    setLoading(true);
    try {
      const { suggestedProducts } = await findProductSolutions({ problemDescription: problem });
      setResults(suggestedProducts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-[#0B0B0B] text-white px-8 rounded-[3rem] border border-border overflow-hidden relative">
      {/* AI Energy Field Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Animated Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 animate-drift opacity-60" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/[0.05] blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 animate-drift-reverse opacity-40" />
        
        {/* Tech Mesh / Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Subtle Ambient Radial Mask */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>
      
      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-4">
          <Badge className="bg-accent/10 text-accent border-accent/20 hover:bg-accent/20 mb-4 px-6 py-2 uppercase tracking-[0.2em] text-[10px] font-black">
            AI Engine elohz
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">¿Cuál es tu próximo desafío?</h2>
          <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl mx-auto">Nuestra inteligencia artificial seleccionará el equipamiento técnico de precisión que tu proyecto necesita.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
          <Input 
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Ej: Necesito estabilidad total en mis rutas de moto..."
            className="bg-card/80 backdrop-blur-md border-border text-white h-16 rounded-2xl px-8 focus:border-white transition-premium text-lg"
          />
          <Button 
            disabled={loading}
            className="pill-button button-primary h-16 px-10 font-black uppercase text-xs tracking-widest"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles className="mr-3 h-5 w-5 text-accent" />}
            Analizar
          </Button>
        </form>

        {results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {results.map((res, i) => (
              <Card key={i} className="bg-card/40 backdrop-blur-md border-border p-8 flex flex-col justify-between hover:border-white transition-premium rounded-[2rem]">
                <div className="space-y-4">
                  <h4 className="text-white text-xl font-black tracking-tight">{res.name}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{res.reason}</p>
                </div>
                <Button variant="link" className="text-accent p-0 h-auto self-start mt-8 font-black uppercase text-[10px] tracking-widest hover:text-white transition-premium">
                  Ver especificaciones <ShoppingCart className="ml-2 h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}