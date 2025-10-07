"use client";

import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

interface CarouselProps {
  testimonials: Testimonial[];
}

const Carousel = ({ testimonials }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (emblaApi) {
      onSelect(emblaApi);
      emblaApi.on("select", onSelect);
    }
  }, [emblaApi, onSelect]);

  return (
    <div className={cn("relative")}>
      <div className={cn("flex justify-end mb-4")}>
        <div className={cn("flex gap-3")}>
          <button
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            className={cn(
              "w-6 h-6 transition-colors duration-200",
              "flex items-center justify-center",
              "group",
              prevBtnDisabled ? "cursor-not-allowed" : "hover:opacity-80"
            )}
            aria-label="Previous testimonials"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className={cn(
                "transition-colors duration-200",
                prevBtnDisabled ? "text-neutral-50" : "text-neutral-0"
              )}
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            className={cn(
              "w-6 h-6 transition-colors duration-200",
              "flex items-center justify-center",
              "group",
              nextBtnDisabled ? "cursor-not-allowed" : "hover:opacity-80"
            )}
            aria-label="Next testimonials"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className={cn(
                "transition-colors duration-200",
                nextBtnDisabled ? "text-neutral-50" : "text-neutral-0"
              )}
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className={cn("overflow-hidden")} ref={emblaRef}>
        <div className={cn("flex gap-4")}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                "flex-shrink-0 w-full max-w-[432px] min-w-0",
                "rounded-lg p-[1px] box-shadow-card backdrop-blur-42px",
                "[background-image:var(--gradient-stroke)] bg-size-[150%]"
              )}
            >
              <div
                className={cn(
                  "px-6 py-7 rounded-[calc(0.5rem-1px)] bg-gradient-dark-purple h-full"
                )}
              >
                <div className={cn("flex flex-col gap-6 h-full")}>
                  <div className={cn("flex-shrink-0")}>
                    <div
                      className={cn(
                        "w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500",
                        "flex items-center justify-center text-white font-bold text-lg"
                      )}
                    >
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                  <div className={cn("flex-1 flex flex-col")}>
                    <p
                      className={cn(
                        "text-(length:--font-size-body-2) text-neutral-0 mb-6 line-clamp-5"
                      )}
                    >
                      "{testimonial.content}"
                    </p>
                    <div className={cn("space-y-1 mt-auto")}>
                      <h4
                        className={cn(
                          "text-(length:--font-size-body-2) font-medium text-neutral-0"
                        )}
                      >
                        {testimonial.name}
                      </h4>
                      <p className={cn("text-xs text-neutral-50")}>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
