import Link from "next/link"
import { ShinyButton } from "./magicui/shiny-button"
import { ThemeSwitch } from "./ThemeSwitch"
import { GitHub } from "./icons/GitHub"

export const Header = () => {
  return (
    <header className="w-full py-3 px-4 fixed top-0 bg-background/80 backdrop-blur-lg z-10">
      <nav className="mx-auto max-w-5xl h-full flex justify-between items-center">
        <ul className="list-none flex items-center gap-x-2">
          <li className="flex justify-center items-center">
            <Link href="/" className="font-semibold">JSONLator</Link>
          </li>
        </ul>
        <ul className="list-none flex items-center gap-x-2">
          <li className="flex justify-center items-center">
            <ThemeSwitch />
          </li>
          <li className="hidden md:flex justify-center items-center">
            <Link href="https://github.com/josemasster/JSONLator" target="_blank" rel="noopener noreferrer">
              <ShinyButton>
                <GitHub />
                GitHub ⭐
              </ShinyButton>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
