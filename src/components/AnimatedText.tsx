
import { useEffect, useRef } from "react";
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
      wordSpan.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
      wordSpan.style.transitionDelay = `${delay + i * staggerDelay}s`;
      
      if (isHighlighted) {
        wordSpan.className = highlightClass;
      }
      
      textRef.current?.appendChild(wordSpan);
    });
    
    // Trigger animation after a small delay to ensure DOM is ready
    setTimeout(() => {
      if (!textRef.current) return;
      
      Array.from(textRef.current.children).forEach((child) => {
        const span = child as HTMLSpanElement;
        span.style.opacity = "1";
        span.style.transform = "translateY(0)";
      });
    }, 50);
    
    return () => {
      if (textRef.current) {
        textRef.current.innerHTML = "";
      }
    };
  }, [text, highlightWords, highlightClass, delay, staggerDelay]);
  
  return <div ref={textRef} className={cn("", className)} />;
}