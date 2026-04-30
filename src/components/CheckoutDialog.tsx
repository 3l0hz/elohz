"use client"

import React, { useState, useMemo } from 'react';
import { useCart } from '@/lib/cart-context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle2, 
  ArrowRight, 
  Truck, 
  ChevronLeft, 
  ShoppingBag,
  Info,
  MapPin,
  Clock
} from "lucide-react";
import { cn } from '@/lib/utils';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Configuración de Tarifas de Envío
const SHIPPING_METHODS = [
  { id: 'stgo-express', name: 'Santiago Cercano (Express)', price: 3500, detail: 'Entrega 24-48 hrs hábiles' },
  { id: 'rm-ext', name: 'Zona RM Extendida', price: 4500, detail: 'Comunas periféricas RM' },
  { id: 'regiones', name: 'Regiones (Starken/Chilexpress)', price: 0, detail: 'Envío por pagar al recibir' },
  { id: 'retiro', name: 'Retiro en Oficina / Especial', price: 0, detail: 'Coordinación por WhatsApp' },
];

const formSchema = z.object({
  fullName: z.string().min(3, "Nombre muy corto"),
  rut: z.string().min(8, "RUT inválido"),
  phone: z.string().min(9, "Mínimo 9 dígitos"),
  email: z.string().email("Correo inválido"),
  region: z.string().min(1, "Selecciona una región"),
  commune: z.string().min(1, "Selecciona una comuna"),
  address: z.string().min(5, "Dirección obligatoria"),
  addressDetail: z.string().optional(),
  shippingMethod: z.string().min(1, "Selecciona método de envío"),
  notes: z.string().optional(),
});

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CheckoutDialog({ open, onOpenChange }: CheckoutDialogProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      rut: "",
      phone: "",
      email: "",
      region: "",
      commune: "",
      address: "",
      addressDetail: "",
      shippingMethod: "stgo-express",
      notes: "",
    },
  });

  const watchFields = form.watch(["address", "commune", "shippingMethod"]);
  const hasDeliveryInfo = !!(watchFields[0] && watchFields[1]);
  
  const selectedMethod = useMemo(() => {
    return SHIPPING_METHODS.find(m => m.id === watchFields[2]) || SHIPPING_METHODS[0];
  }, [watchFields[2]]);

  const grandTotal = totalPrice + (selectedMethod?.price || 0);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const currentShipping = SHIPPING_METHODS.find(m => m.id === values.shippingMethod);
    
    let msg = `*NUEVO PEDIDO ELOHZ*\n\n`;
    msg += `*Cliente:* ${values.fullName}\n`;
    msg += `*RUT:* ${values.rut}\n`;
    msg += `*Teléfono:* ${values.phone}\n`;
    msg += `*Email:* ${values.email}\n`;
    msg += `*Dirección:* ${values.address}, ${values.addressDetail || ''} - ${values.commune}, ${values.region}\n`;
    msg += `*Envío:* ${currentShipping?.name} ($${currentShipping?.price.toLocaleString('es-CL')})\n\n`;
    msg += `*PRODUCTOS:*\n`;
    items.forEach((item, i) => {
      msg += `${i + 1}. ${item.name} x ${item.quantity} - ${item.price}\n`;
    });
    msg += `\n*TOTAL PEDIDO:* $${grandTotal.toLocaleString('es-CL')}\n`;
    if (values.notes) msg += `\n*NOTAS:* ${values.notes}`;

    window.open(`https://wa.me/56940628182?text=${encodeURIComponent(msg)}`, '_blank');
    setIsSuccess(true);
  }

  const handleClose = () => {
    if (isSuccess) clearCart();
    setIsSuccess(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={cn(
        "max-w-[95vw] md:max-w-5xl p-0 overflow-hidden bg-[#0B0B0B] border-white/10 md:rounded-[2.5rem] flex flex-col md:flex-row h-[92vh] md:h-[85vh] transition-all duration-500 ease-out outline-none",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.94] data-[state=open]:slide-in-from-bottom-0"
      )}>
        <DialogHeader className="sr-only">
          <DialogTitle>Formulario de Pedido</DialogTitle>
          <DialogDescription>Completa tus datos para finalizar tu compra en elohz.</DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-8 animate-in zoom-in duration-500">
            <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-accent" />
            </div>
            <div className="space-y-4 max-w-md">
              <h2 className="text-4xl font-black tracking-tighter uppercase text-white">¡Pedido Recibido!</h2>
              <p className="text-muted-foreground font-medium text-lg leading-relaxed uppercase tracking-tight">
                Hemos enviado tu solicitud por WhatsApp. Te contactaremos en breve para confirmar disponibilidad, pago y despacho.
              </p>
            </div>
            <Button 
              onClick={handleClose}
              className="pill-button button-primary h-14 px-12 text-xs font-black uppercase tracking-widest"
            >
              Volver a la tienda
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 flex flex-col bg-[#0B0B0B] overflow-hidden">
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                    <Truck className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black tracking-tighter uppercase text-white">Confirmación Pedido</h2>
                    <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">Despacho Profesional elohz</p>
                  </div>
                </div>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-8 pb-12">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                      <div className="space-y-8">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent flex items-center gap-3">
                          <span className="w-8 h-[1px] bg-accent/30" />
                          Datos Personales
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Nombre Completo</FormLabel>
                                <FormControl>
                                  <Input placeholder="EJ: JUAN PÉREZ" className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-white transition-all text-xs font-bold uppercase" {...field} />
                                </FormControl>
                                <FormMessage className="text-[10px] uppercase font-black text-red-400" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="rut"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">RUT</FormLabel>
                                <FormControl>
                                  <Input placeholder="12.345.678-9" className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-white transition-all text-xs font-bold uppercase" {...field} />
                                </FormControl>
                                <FormMessage className="text-[10px] uppercase font-black text-red-400" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Teléfono</FormLabel>
                                <FormControl>
                                  <Input placeholder="+56 9 1234 5678" className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-white transition-all text-xs font-bold uppercase" {...field} />
                                </FormControl>
                                <FormMessage className="text-[10px] uppercase font-black text-red-400" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="EMAIL@EJEMPLO.COM" className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-white transition-all text-xs font-bold uppercase" {...field} />
                                </FormControl>
                                <FormMessage className="text-[10px] uppercase font-black text-red-400" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="space-y-8">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent flex items-center gap-3">
                          <span className="w-8 h-[1px] bg-accent/30" />
                          Dirección de Entrega
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="region"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Región</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-xs font-bold uppercase">
                                      <SelectValue placeholder="SELECCIONA REGIÓN" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-[#111111] border-white/10 text-white font-bold text-xs uppercase">
                                    <SelectItem value="metropolitana">Región Metropolitana</SelectItem>
                                    <SelectItem value="valparaiso">Región de Valparaíso</SelectItem>
                                    <SelectItem value="biobio">Región del Biobío</SelectItem>
                                    <SelectItem value="otra">Otras Regiones</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="commune"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Comuna</FormLabel>
                                <FormControl>
                                  <Input placeholder="EJ: PROVIDENCIA" className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-white transition-all text-xs font-bold uppercase" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="md:col-span-2">
                            <FormField
                              control={form.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Calle y Número</FormLabel>
                                  <FormControl>
                                    <Input placeholder="EJ: AV. PROVIDENCIA 1234" className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-white transition-all text-xs font-bold uppercase" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <FormField
                              control={form.control}
                              name="addressDetail"
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Depto / Casa / Referencia (Opcional)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="DPTO 502, PORTÓN NEGRO..." className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-white transition-all text-xs font-bold uppercase" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-8">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent flex items-center gap-3">
                          <span className="w-8 h-[1px] bg-accent/30" />
                          Método de Envío
                        </h3>
                        
                        {!hasDeliveryInfo ? (
                          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center space-y-4 animate-in fade-in zoom-in duration-500">
                            <div className="p-3 bg-white/5 rounded-full">
                              <MapPin className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs font-black uppercase tracking-widest text-white">Ingresa tu dirección de envío</p>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Para calcular los métodos disponibles según tu cobertura.</p>
                            </div>
                          </div>
                        ) : (
                          <FormField
                            control={form.control}
                            name="shippingMethod"
                            render={({ field }) => (
                              <FormItem className="space-y-4 animate-in slide-in-from-top-4 duration-500">
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                  >
                                    {SHIPPING_METHODS.map((method) => (
                                      <FormItem key={method.id} className="space-y-0">
                                        <FormControl>
                                          <RadioGroupItem value={method.id} className="sr-only" />
                                        </FormControl>
                                        <FormLabel className={cn(
                                          "flex flex-col p-6 rounded-2xl border transition-all cursor-pointer hover:border-white/20 active:scale-[0.98]",
                                          field.value === method.id 
                                            ? "bg-accent/[0.03] border-accent/50 text-white" 
                                            : "bg-white/[0.02] border-white/5 text-muted-foreground"
                                        )}>
                                          <div className="flex justify-between items-start mb-2">
                                            <span className="text-[11px] font-black uppercase tracking-tight">{method.name}</span>
                                            <span className="text-xs font-black text-white">
                                              {method.price > 0 ? `$${method.price.toLocaleString('es-CL')}` : 'Gratis / Por Pagar'}
                                            </span>
                                          </div>
                                          <p className="text-[9px] font-bold uppercase tracking-[0.1em] opacity-60">{method.detail}</p>
                                        </FormLabel>
                                      </FormItem>
                                    ))}
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>

                      <div className="space-y-8">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent flex items-center gap-3">
                          <span className="w-8 h-[1px] bg-accent/30" />
                          Notas Finales
                        </h3>
                        <FormField
                          control={form.control}
                          name="notes"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Comentarios o Indicaciones Especiales</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="EJ: DEJAR EN CONSERJERÍA, LLAMAR AL LLEGAR..." 
                                  className="min-h-[120px] bg-white/5 border-white/10 rounded-xl focus:border-white transition-all text-xs font-bold uppercase resize-none" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="p-6 rounded-2xl bg-[#111111] border border-white/5 flex gap-4 items-center">
                        <Clock className="w-5 h-5 text-accent flex-shrink-0" />
                        <p className="text-[9px] font-black uppercase tracking-widest leading-relaxed text-muted-foreground">
                          Despacho prioritario: Las compras realizadas antes de las 18:00 hrs se procesan el mismo día hábil.
                        </p>
                      </div>

                      <div className="flex flex-col gap-4">
                        <Button 
                          type="submit"
                          className="w-full h-14 rounded-2xl button-primary font-black text-xs uppercase tracking-widest shadow-xl transition-all"
                        >
                          Confirmar Pedido <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button 
                          type="button"
                          variant="ghost"
                          onClick={() => onOpenChange(false)}
                          className="w-full h-12 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-white"
                        >
                          <ChevronLeft className="w-4 h-4 mr-2" /> Volver al Carrito
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </ScrollArea>
            </div>

            <div className="w-full md:w-[380px] bg-[#0F0F0F] border-l border-white/5 flex flex-col overflow-hidden">
              <div className="p-8 border-b border-white/5 h-20 flex items-center">
                <ShoppingBag className="w-5 h-5 text-accent mr-3" />
                <h3 className="text-sm font-black tracking-[0.3em] uppercase text-white">Resumen Compra</h3>
              </div>
              
              <ScrollArea className="flex-1">
                <div className="p-8 space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-14 w-14 rounded-xl bg-black border border-white/5 flex-shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-[9px] font-black uppercase tracking-tight text-white line-clamp-1">{item.name}</p>
                        <p className="text-[10px] font-bold text-muted-foreground">{item.quantity} x {item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-8 bg-black/40 border-t border-white/5 space-y-4">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${totalPrice.toLocaleString('es-CL')}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                  <span>Costo Envío</span>
                  <span className={cn(selectedMethod?.price > 0 ? "text-white" : "text-accent")}>
                    {selectedMethod?.price > 0 ? `$${selectedMethod.price.toLocaleString('es-CL')}` : 'Por calcular'}
                  </span>
                </div>
                <div className="pt-4 flex justify-between items-center border-t border-white/5">
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-white">Total Final</span>
                  <span className="text-2xl font-black text-white tracking-tighter">${grandTotal.toLocaleString('es-CL')}</span>
                </div>
                <p className="text-[8px] font-bold text-center uppercase tracking-widest text-muted-foreground/60 pt-2">
                  * Pago se coordina vía transferencia por WhatsApp
                </p>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}