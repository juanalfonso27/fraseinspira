"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme-toggle";

const navItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/favorites", label: "Favoritos", icon: Heart },
  { href: "/categories", label: "Categorías", icon: LayoutGrid },
];

/**
 * A fixed bottom navigation bar for mobile screens.
 * Provides quick access to the main sections of the app.
 */
export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background/95 backdrop-blur-sm md:hidden">
      <nav className="grid h-16 grid-cols-4 items-center">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors hover:text-primary",
              pathname === item.href ? "text-primary" : "text-muted-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
        <div className="flex flex-col items-center justify-center gap-1">
           <ThemeToggle />
           <span className="text-xs text-muted-foreground">Tema</span>
        </div>
      </nav>
    </div>
  );
}
