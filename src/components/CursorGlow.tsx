"use client"

import React, { useEffect, useRef, useState } from 'react';

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Posiciones para suavizado (lerp)
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Solo aplicar en desktop
    if (window.innerWidth < 1024) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Detectar si está sobre un elemento interactivo
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, .cursor-pointer, [role="button"]');
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    let animationFrameId: number;

    const updatePosition = () => {
      // Interpolación lineal suave (lerp)
      const ease = 0.12;
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * ease;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  return (
    <div 
      ref={glowRef}
      className={`
        fixed top-0 left-0 pointer-events-none z-[100] transition-opacity duration-700
        hidden lg:block
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
      style={{
        width: '1px',
        height: '1px',
        willChange: 'transform'
      }}
    >
      <div 
        className={`
          absolute -translate-x-1/2 -translate-y-1/2 rounded-full
          bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_70%)]
          transition-all duration-500 ease-out
          ${isHovering ? 'w-[250px] h-[250px] opacity-100 scale-110' : 'w-[180px] h-[180px] opacity-60 scale-100'}
        `}
      />
    </div>
  );
}
