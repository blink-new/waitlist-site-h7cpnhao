
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

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
    
    // Create animation timeline
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      repeatDelay: 0,
    });
    
    // Animate the blob with random movements
    tl.to(blobRef.current, {
      x: `${startX}%`,
      y: `${startY}%`,
      scale: 1 + Math.random() * 0.1,
      borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
      duration: 8,
      ease: "sine.inOut",
    })
    .to(blobRef.current, {
      x: `${startY}%`,
      y: `${startX}%`,
      scale: 1 - Math.random() * 0.05,
      borderRadius: "40% 60% 30% 70% / 60% 40% 70% 30%",
      duration: 8,
      ease: "sine.inOut",
    })
    .to(blobRef.current, {
      x: `${-startX}%`,
      y: `${-startY}%`,
      scale: 1 + Math.random() * 0.05,
      borderRadius: "70% 30% 50% 50% / 30% 60% 40% 70%",
      duration: 8,
      ease: "sine.inOut",
    });
    
    return () => {
      tl.kill();
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