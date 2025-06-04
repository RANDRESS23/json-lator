import Link from "next/link";
import { GitHub } from "./icons/GitHub";
import { LinkedIn } from "./icons/LinkedIn";

export const Footer = () => {
  return (
    <footer className="w-full bg-background/80 backdrop-blur-lg mt-12">
      <hr className="mt-4 mb-2 w-full h-[1px] border-t-0 bg-neutral-200 dark:bg-white/10" />
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row mx-auto max-w-5xl">
        <div className="hidden md:flex items-center gap-2">
          <p className="text-sm dark:text-gray-300 text-neutral-800">© 2025 JSONLator</p>
        </div>
        <div className="text-sm dark:text-gray-300 text-neutral-800">
          Hecho con <span className="text-red-500 mx-0.5">❤</span> por{" "}
          <Link
            href="https://www.linkedin.com/in/raul-quimbaya/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm dark:text-gray-300 text-neutral-800 underline-offset-4 hover:underline"
          >
            Raúl Quimbaya
          </Link>
        </div>
        <div className="flex md:hidden items-center gap-2">
          <p className="text-sm dark:text-gray-300 text-neutral-800">© 2025 JSONLator</p>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href='https://www.linkedin.com/in/raul-quimbaya/' 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:dark:text-gray-400 hover:text-neutral-700 transition-all"
          >
            <LinkedIn />
          </Link>
          <Link 
            href='https://github.com/RANDRESS23' 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:dark:text-gray-400 hover:text-neutral-700 transition-all"
          >
            <GitHub />
          </Link>
        </div>
      </div>
    </footer>
  );
};
