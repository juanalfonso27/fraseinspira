"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Heart, Home, LayoutGrid } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/favorites", label: "Favoritos", icon: Heart },
  { href: "/categories", label: "Categorías", icon: LayoutGrid },
];

/**
 * The main application header, visible on medium screens and up.
 * Includes branding, primary navigation, and the theme toggle button.
 */
export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 hidden w-full border-b bg-background/80 backdrop-blur-sm md:block">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Flame className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-bold">MotivaVerse</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
