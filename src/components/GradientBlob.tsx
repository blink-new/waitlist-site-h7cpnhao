
import { useEffect, useRef } from "react";

interface GradientBlobProps {
  className?: string;
  color1: string;
  color2: string;
  size?: string;
  opacity?: number;
}

export function GradientBlob({ 
  className = "", 
  color1, 
  color2, 
  size = "40rem", 
  opacity = 0.15 
}: GradientBlobProps) {
  const blobRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!blobRef.current) return;
    
    // Random starting position for the animation
    const startX = Math.random() * 10 - 5;
    const startY = Math.random() * 10 - 5;
    
    // Create animation with CSS transitions instead of GSAP
    const blob = blobRef.current;
    
    // Set initial state
    blob.style.transition = "transform 8s ease-in-out, border-radius 8s ease-in-out";
    blob.style.transform = `translate(${startX}%, ${startY}%) scale(1)`;
    blob.style.borderRadius = "60% 40% 70% 30% / 50% 60% 40% 50%";
    
    // Animation loop with setTimeout
    const animate = () => {
      // Generate new random values for each iteration
      const newX = Math.random() * 10 - 5;
      const newY = Math.random() * 10 - 5;
      const newScale = 1 + Math.random() * 0.1;
      const newBorderRadius = `${40 + Math.random() * 30}% ${60 - Math.random() * 20}% ${30 + Math.random() * 40}% ${70 - Math.random() * 40}% / ${50 + Math.random() * 10}% ${50 - Math.random() * 10}% ${50 + Math.random() * 10}% ${50 - Math.random() * 10}%`;
      
      // Apply new styles
      blob.style.transform = `translate(${newX}%, ${newY}%) scale(${newScale})`;
      blob.style.borderRadius = newBorderRadius;
      
      // Schedule next animation
      setTimeout(animate, 8000);
    };
    
    // Start animation loop
    const timeoutId = setTimeout(animate, 8000);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  
  return (
    <div 
      ref={blobRef}
      className={`absolute rounded-full blur-3xl ${className}`}
      style={{
        background: `radial-gradient(circle, ${color1}, ${color2})`,
        width: size,
        height: size,
        opacity,
        willChange: "transform, border-radius",
      }}
    />
  );
}