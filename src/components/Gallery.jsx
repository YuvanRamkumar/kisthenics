"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { cn } from "../lib/utils";

const galleryImages = [
  { src: "/gallery/IMG_7897.jpeg", alt: "Gallery 1" },
  { src: "/gallery/IMG_7898.jpeg", alt: "Gallery 2" },
  // { src: "/gallery/IMG_7899.jpeg", alt: "Gallery 3" },
  { src: "/gallery/IMG_7900.jpeg", alt: "Gallery 4" },
  { src: "/gallery/IMG_7901.jpeg", alt: "Gallery 5" },
  // { src: "/gallery/IMG_7902.jpeg", alt: "Gallery 6" },
  { src: "/gallery/IMG_7903.jpeg", alt: "Gallery 7" },
  { src: "/gallery/IMG_7904.jpeg", alt: "Gallery 8" },
  { src: "/gallery/IMG_7905.jpeg", alt: "Gallery 9" },
];

const Gallery = () => {
  const swiperRef = useRef(null);

  return (
    <section className="relative w-full overflow-hidden py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-12 text-center"
      >
        <h2 className="font-display text-5xl tracking-[0.2em] text-gold md:text-7xl">
          GALLERY
        </h2>
        <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative w-full px-4"
      >
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          slidesPerView={2.43}
          spaceBetween={40}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          navigation={{
            nextEl: ".gallery-next",
            prevEl: ".gallery-prev",
          }}
          modules={[EffectCoverflow, Autoplay, Navigation]}
          className="!pb-12"
        >
          {galleryImages.map((image, index) => (
            <SwiperSlide key={index} className="!h-[360px]">
              <div className="glass h-full w-full overflow-hidden rounded-xl border border-white/10">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className={cn(
            "gallery-prev absolute left-4 top-1/2 z-20 -translate-y-1/2",
            "flex h-12 w-12 items-center justify-center rounded-full",
            "bg-black/60 backdrop-blur-sm border border-white/10",
            "text-gold hover:bg-gold hover:text-black transition-all duration-300",
            "cursor-pointer group"
          )}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ChevronLeft className="h-6 w-6 transition-transform group-hover:scale-110" />
        </button>

        <button
          className={cn(
            "gallery-next absolute right-4 top-1/2 z-20 -translate-y-1/2",
            "flex h-12 w-12 items-center justify-center rounded-full",
            "bg-black/60 backdrop-blur-sm border border-white/10",
            "text-gold hover:bg-gold hover:text-black transition-all duration-300",
            "cursor-pointer group"
          )}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ChevronRight className="h-6 w-6 transition-transform group-hover:scale-110" />
        </button>
      </motion.div>
    </section>
  );
};

export default Gallery;
