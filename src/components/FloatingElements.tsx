
import { useEffect, useRef } from "react";
import { cn } from "../lib/utils";

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  xMovement?: number;
  yMovement?: number;
  duration?: number;
  delay?: number;
}

export function FloatingElement({
  children,
  className,
  xMovement = 10,
  yMovement = 15,
  duration = 3,
  delay = 0,
}: FloatingElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!elementRef.current) return;
    
    // Random starting position for more natural movement
    const randomX = Math.random() * xMovement - xMovement / 2;
    const randomY = Math.random() * yMovement - yMovement / 2;
    
    const element = elementRef.current;
    
    // Set initial styles
    element.style.transition = `transform ${duration}s ease-in-out`;
    element.style.transitionDelay = `${delay}s`;
    element.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    // Animation loop with setTimeout
    const animate = () => {
      // Toggle between positions
      const newX = element.style.transform.includes(`${randomX}px`) ? -randomX : randomX;
      const newY = element.style.transform.includes(`${randomY}px`) ? -randomY : randomY;
      
      element.style.transform = `translate(${newX}px, ${newY}px)`;
      
      // Schedule next animation
      setTimeout(animate, duration * 1000);
    };
    
    // Start animation loop
    const timeoutId = setTimeout(animate, (duration + delay) * 1000);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [xMovement, yMovement, duration, delay]);
  
  return (
    <div ref={elementRef} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Decorative elements */}
      <FloatingElement 
        className="absolute top-[15%] left-[10%]" 
        xMovement={20} 
        yMovement={30}
        delay={0.5}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-sm" />
      </FloatingElement>
      
      <FloatingElement 
        className="absolute top-[30%] right-[15%]" 
        xMovement={25} 
        yMovement={20}
        delay={1.2}
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-sm" />
      </FloatingElement>
      
      <FloatingElement 
        className="absolute bottom-[25%] left-[20%]" 
        xMovement={15} 
        yMovement={25}
        delay={0.8}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 blur-sm" />
      </FloatingElement>
      
      <FloatingElement 
        className="absolute bottom-[15%] right-[10%]" 
        xMovement={30} 
        yMovement={15}
        delay={1.5}
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-sm" />
      </FloatingElement>
      
      {/* Stars */}
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatingElement
          key={i}
          className={`absolute w-1 h-1 bg-white rounded-full opacity-${Math.floor(Math.random() * 3) + 1}0`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          xMovement={5}
          yMovement={5}
          duration={Math.random() * 2 + 2}
          delay={Math.random() * 2}
        />
      ))}
    </div>
  );
}