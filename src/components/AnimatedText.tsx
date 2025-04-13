
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "../lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClass?: string;
  delay?: number;
  staggerDelay?: number;
}

export function AnimatedText({
  text,
  className,
  highlightWords = [],
  highlightClass = "bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500",
  delay = 0,
  staggerDelay = 0.03,
}: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!textRef.current) return;
    
    // Split text into words
    const words = text.split(" ");
    textRef.current.innerHTML = "";
    
    // Create spans for each word
    words.forEach((word, i) => {
      const isHighlighted = highlightWords.includes(word);
      const wordSpan = document.createElement("span");
      wordSpan.innerHTML = word + (i < words.length - 1 ? "&nbsp;" : "");
      wordSpan.style.display = "inline-block";
      wordSpan.style.opacity = "0";
      wordSpan.style.transform = "translateY(20px)";
      
      if (isHighlighted) {
        wordSpan.className = highlightClass;
      }
      
      textRef.current?.appendChild(wordSpan);
    });
    
    // Animate each word
    gsap.to(textRef.current.children, {
      opacity: 1,
      y: 0,
      stagger: staggerDelay,
      duration: 0.5,
      ease: "power2.out",
      delay,
    });
    
    return () => {
      gsap.killTweensOf(textRef.current?.children);
    };
  }, [text, highlightWords, highlightClass, delay, staggerDelay]);
  
  return <div ref={textRef} className={cn("", className)} />;
}