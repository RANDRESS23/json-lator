"use client";

import { useEffect, useState } from 'react';
import { LineShadowText } from './magicui/line-shadow-text'
import { useTheme } from 'next-themes';

export const Title = () => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null

  const shadowColor = theme === "dark" ? "white" : "black";

  return (
    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl flex gap-x-3 items-center justify-center">
      JSON 
      <LineShadowText className="italic" shadowColor={shadowColor}>
        Translator
      </LineShadowText>
    </h1>
  )
}
