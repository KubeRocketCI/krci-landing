"use client";

import Link from "next/link";
import CTAButton from "@/app/components/CTAButton";
import { navigationItems } from "@/components/Header/constants";
import { cn } from "@/lib/utils";
import type { Translations } from "@/types/translations";
import { Container } from "../Container";
import Logo from "../Logo";
import { useMobileMenu } from "./hooks/useMobileMenu";

interface HeaderProps {
  className?: string;
  translations: Translations;
}

const Header = ({ className }: HeaderProps) => {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } =
    useMobileMenu();

  return (
    <header className={cn("fixed top-4 z-50 left-0 right-0 w-full", className)}>
      <Container>
        <div
          className={cn(
            "bg-gradient-to-br from-black/20 via-neutral-80/30 to-black/30 backdrop-blur-lg border border-neutral-700 shadow-card rounded-lg px-6 py-4",
          )}
        >
          <div className={cn("flex items-center justify-between")}>
            <Link
              href="/"
              className={cn(
                "flex items-center gap-2 hover:opacity-80 transition-opacity",
              )}
            >
              <Logo />
            </Link>

            <nav className={cn("hidden lg:flex items-center gap-8")}>
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.target}
                  rel={
                    item.target === "_blank" ? "noopener noreferrer" : undefined
                  }
                  className={cn(
                    "font-light",
                    "hover:[background-image:var(--gradient-numbers)] hover:bg-clip-text hover:text-transparent",
                    "transition-colors text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className={cn("hidden lg:flex items-center gap-4")}>
              <CTAButton />
            </div>

            <button
              type="button"
              onClick={toggleMobileMenu}
              className={cn(
                "lg:hidden flex items-center justify-center w-10 h-10",
                "text-neutral-0 hover:bg-neutral-70/50 rounded transition-colors",
              )}
              aria-label="Toggle mobile menu"
            >
              <svg
                className={cn(
                  "w-6 h-6 transition-transform",
                  isMobileMenuOpen ? "rotate-90" : "",
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                role="img"
                aria-label="Menu icon"
              >
                <title>Menu</title>
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {isMobileMenuOpen && (
            <div
              className={cn(
                "lg:hidden border-t border-neutral-70/50 pt-4 mt-4",
              )}
            >
              <nav className={cn("flex flex-col gap-4")}>
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    target={item.target}
                    rel={
                      item.target === "_blank"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className={cn(
                      "text-body text-neutral-0",
                      "hover:text-neutral-20 transition-colors py-2",
                    )}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className={cn("mt-2 space-y-2")}>
                  <CTAButton onClick={closeMobileMenu} />
                </div>
              </nav>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
