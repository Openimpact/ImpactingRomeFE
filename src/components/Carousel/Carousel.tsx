"use client";
import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
} from "embla-carousel-react";
import { DotButton, PrevButton, NextButton } from "./ArrowButtons";
import "./embla.css";

type PropType = {
  options?: EmblaOptionsType;
  children: React.ReactNode[];
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
};

export const Carousel: React.FC<PropType> = (props) => {
  const { options, children, showArrows, showDots, className } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <div>
      <div
        className="overflow-hidden relative w-full mx-auto group"
        ref={emblaRef}
      >
        <div
          className={
            "flex flex-row justify-start w-auto ml-0 transform hover:scale-125 " +
            className
          }
        >
          {children}
        </div>
        {showArrows && (
          <div className="opacity-0 group-hover:opacity-100">
            <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
            <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
          </div>
        )}
        {showDots && (
          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => scrollTo(index)}
                className={"embla__dot".concat(
                  index === selectedIndex ? " embla__dot--selected" : ""
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const Slide = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={" md:flex-[0_0_25%] flex-[0_0_50%] " + className}>
      {children}
    </div>
  );
};
