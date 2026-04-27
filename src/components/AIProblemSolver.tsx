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
    <section className="py-16 bg-black text-white px-6 rounded-[3rem] mx-4 md:mx-10 my-10 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <Badge className="bg-primary/20 text-primary border-primary/20 hover:bg-primary/30 mb-2">
            AI Solution Finder
          </Badge>
          <h2 className="text-3xl md:text-4xl font-black">¿Qué problema quieres resolver hoy?</h2>
          <p className="text-neutral-400">Describe tu necesidad y nuestra IA te recomendará el equipo perfecto.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
          <Input 
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Ej: Tengo mucha vibración en mis videos de moto..."
            className="bg-neutral-900 border-neutral-800 text-white h-14 rounded-full px-6 focus:ring-primary"
          />
          <Button 
            disabled={loading}
            className="bg-primary hover:bg-[#FFB800] text-black pill-button h-14 px-8 font-bold"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />}
            Buscar Solución
          </Button>
        </form>

        {results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {results.map((res, i) => (
              <Card key={i} className="bg-neutral-900 border-neutral-800 p-6 flex flex-col justify-between hover:border-primary/50 transition-colors">
                <div className="space-y-2">
                  <h4 className="text-primary font-bold">{res.name}</h4>
                  <p className="text-sm text-neutral-400">{res.reason}</p>
                </div>
                <Button variant="link" className="text-primary p-0 h-auto self-start mt-4 font-bold">
                  Ver producto <ShoppingCart className="ml-2 h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}