"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";

const Carousel = () => {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="flex-[0_0_100%] min-w-0 relative">
            <div
              className="h-64 bg-cover bg-center"
              style={{
                backgroundImage: `url(https://source.unsplash.com/random/800x600?sig=${index})`,
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h2 className="text-white text-2xl font-bold">Slide {index}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;