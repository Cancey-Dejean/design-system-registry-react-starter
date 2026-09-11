"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Children, type ComponentProps, useEffect, useState } from "react";

import { cn } from "cn";

import { Container } from "../../components/container/container";
import type { Theme } from "../../files/types";
import { announcementBarVariants } from "./announcement-bar.variants";

export default function AnnouncementBar({
  theme = "light",
  className,
  ...props
}: ComponentProps<"div"> & {
  theme?: Theme;
}) {
  return (
    <div
      data-slot="announcement-bar"
      data-theme={theme}
      className={cn(announcementBarVariants({ theme }), className)}
      {...props}
    />
  );
}

export function AnnouncementBarSlider({
  theme = "light",
  className,
  children,
  opts,
  ...props
}: ComponentProps<"div"> & {
  theme?: Theme;
  opts?: Parameters<typeof useEmblaCarousel>[0];
}) {
  const slideCount = Children.count(children);
  const showControls = slideCount > 1;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    ...opts,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return undefined;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    onSelect();
    emblaApi.on("reInit", onSelect).on("select", onSelect);

    return () => {
      emblaApi.off("reInit", onSelect).off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div
      data-slot="announcement-bar-slider"
      data-theme={theme}
      role="region"
      aria-roledescription="carousel"
      aria-label="Announcements"
      className={cn(announcementBarVariants({ theme }), className)}
      {...props}
    >
      <Container
        size="contained"
        className="flex items-center justify-center gap-3 sm:gap-5"
      >
        {showControls ? (
          <button
            type="button"
            data-slot="announcement-bar-prev"
            aria-label="Previous announcement"
            disabled={!canScrollPrev}
            onClick={scrollPrev}
            className={cn(
              "text-foreground hover:text-foreground/75 shrink-0 transition-colors disabled:pointer-events-none disabled:opacity-30",
              theme === "dark" && "text-white",
              !canScrollPrev && "pointer-events-none opacity-30",
            )}
          >
            <ChevronLeft className="size-4 stroke-[1.5]" aria-hidden />
          </button>
        ) : null}

        <div className="min-w-0 flex-1 overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {Children.map(children, (slide, index) => (
              <div
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${slideCount}`}
                className="text-14 min-w-0 shrink-0 grow-0 basis-full text-center"
              >
                {slide}
              </div>
            ))}
          </div>
        </div>

        {showControls ? (
          <button
            type="button"
            data-slot="announcement-bar-next"
            aria-label="Next announcement"
            disabled={!canScrollNext}
            onClick={scrollNext}
            className={cn(
              "text-foreground hover:text-foreground/75 shrink-0 transition-colors disabled:pointer-events-none disabled:opacity-30",
              !canScrollNext && "pointer-events-none opacity-30",
              theme === "dark" && "text-white",
            )}
          >
            <ChevronRight className="size-4 stroke-[1.5]" aria-hidden />
          </button>
        ) : null}
      </Container>
    </div>
  );
}
