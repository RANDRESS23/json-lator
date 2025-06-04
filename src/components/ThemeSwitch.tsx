'use client'

import { Moon } from './icons/Moon'
import { useTheme } from 'next-themes'
import { Sun } from './icons/Sun'
import { useEffect, useState } from 'react'

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null

  return (
    <div>
      {
        theme === "dark" ? (
          <button className="p-2 rounded-md flex justify-center items-center transition-all hover:bg-accent cursor-pointer" onClick={() => setTheme("light")}>
            <Sun />
          </button>
        ) : (
          <button className="p-2 rounded-md flex justify-center items-center transition-all hover:bg-accent cursor-pointer" onClick={() => setTheme("dark")}>
            <Moon />
          </button>
        )
      }
    </div>
  )
}
