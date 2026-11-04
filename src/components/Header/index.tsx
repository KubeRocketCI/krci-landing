"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import CTAButton from "@/app/components/CTAButton";
import { navigationItems } from "@/components/Header/constants";
import { cn } from "@/lib/utils";
import { Container } from "../Container";
import Logo from "../Logo";
import { useMobileMenu } from "./hooks/useMobileMenu";
import { useStickyCta } from "./hooks/useStickyCta";

function ExternalMark({ newTabLabel }: { newTabLabel: string }) {
  return (
    <>
      <span className="sr-only"> ({newTabLabel})</span>
      <ArrowUpRight className="size-4 shrink-0" aria-hidden />
    </>
  );
}

interface HeaderProps {
  className?: string;
  newTabLabel: string;
}

const Header = ({ className, newTabLabel }: HeaderProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileMenu(
    panelRef,
    menuToggleRef,
  );
  const showStickyCta = useStickyCta();
  const pathname = usePathname();

  return (
    <header className={cn("fixed top-4 z-50 left-0 right-0 w-full", className)}>
      <Container>
        <div
          ref={panelRef}
          className={cn(
            "bg-gradient-to-br from-black/20 via-neutral-80/30 to-black/30 backdrop-blur-lg border border-neutral-70 shadow-card rounded-lg px-4 py-3 sm:px-6 sm:py-4",
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
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(
                    "group inline-flex items-center gap-1 font-light text-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "transition-colors",
                      "group-hover:[background-image:var(--gradient-numbers)] group-hover:bg-clip-text group-hover:text-transparent",
                      "group-aria-[current=page]:[background-image:var(--gradient-numbers)] group-aria-[current=page]:bg-clip-text group-aria-[current=page]:text-transparent",
                    )}
                  >
                    {item.label}
                  </span>
                  {item.target === "_blank" ? (
                    <ExternalMark newTabLabel={newTabLabel} />
                  ) : null}
                </Link>
              ))}
            </nav>

            <div className={cn("header-cta hidden lg:flex items-center gap-4")}>
              <CTAButton location="header" />
            </div>

            <button
              ref={menuToggleRef}
              type="button"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls={isMobileMenuOpen ? "mobile-menu" : undefined}
              className={cn(
                "lg:hidden flex items-center justify-center size-11",
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
                aria-hidden="true"
              >
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
              id="mobile-menu"
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
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={cn(
                      "text-body text-neutral-0 flex min-h-11 items-center gap-1",
                      "hover:text-neutral-20 transition-colors",
                      "aria-[current=page]:font-medium aria-[current=page]:underline aria-[current=page]:underline-offset-4",
                    )}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                    {item.target === "_blank" ? (
                      <ExternalMark newTabLabel={newTabLabel} />
                    ) : null}
                  </Link>
                ))}

                <div className={cn("mt-2 space-y-2")}>
                  <CTAButton
                    onClick={closeMobileMenu}
                    location="mobile_menu"
                    returnFocusRef={menuToggleRef}
                  />
                </div>
              </nav>
            </div>
          )}
        </div>
      </Container>

      <div
        aria-hidden={!showStickyCta}
        inert={!showStickyCta}
        className={cn(
          "sticky-cta lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-neutral-70 bg-background",
          "pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pr-[max(1rem,env(safe-area-inset-right))] pl-[max(1rem,env(safe-area-inset-left))]",
          "motion-safe:transition-[transform,visibility] motion-safe:duration-300 motion-safe:ease-out",
          showStickyCta
            ? "translate-y-0 visible"
            : "translate-y-full invisible",
        )}
      >
        <CTAButton className="w-full" location="sticky_mobile" />
      </div>
    </header>
  );
};

export default Header;
