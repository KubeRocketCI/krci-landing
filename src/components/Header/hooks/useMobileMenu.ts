import { type RefObject, useEffect, useState } from "react";

export const useMobileMenu = (
  panelRef: RefObject<HTMLElement | null>,
  toggleRef: RefObject<HTMLElement | null>,
) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Escape and a tap outside the panel close the menu, as a disclosure should.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      setIsMobileMenuOpen(false);
      if (panelRef.current?.contains(document.activeElement)) {
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isMobileMenuOpen, panelRef, toggleRef]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((open) => !open);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return {
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
  };
};
