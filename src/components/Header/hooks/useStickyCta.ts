import { useEffect, useState } from "react";

const SHOW_AFTER_VIEWPORTS = 0.6;
const HIDE_BEFORE_END_VIEWPORTS = 1.2;

export const useStickyCta = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const scrolled = window.scrollY;
      const remaining =
        document.documentElement.scrollHeight - scrolled - viewport;

      setVisible(
        scrolled > viewport * SHOW_AFTER_VIEWPORTS &&
          remaining > viewport * HIDE_BEFORE_END_VIEWPORTS,
      );
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return visible;
};
