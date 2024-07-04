import { GeistMono } from "geist/font/mono";
import Link from "next/link";

import { cn } from "@/lib/utils";

export const Footer = () => {
  return (
    <footer className="w-full py-4 text-center">
      <Link
        href="https://github.com/aarabii"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(GeistMono.variable, "font-mono text-sm")}
      >
        Made with ❤️ Aarab<sup>&copy;</sup>.
      </Link>
    </footer>
  );
};
