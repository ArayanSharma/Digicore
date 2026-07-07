import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowRight, ChevronDown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
  }),
};

const Hero = ({ hero }) => {
  const shapesRef = useRef(null);

  useEffect(() => {
    const shapes = shapesRef.current?.querySelectorAll(".hero-float-shape");
    if (!shapes || shapes.length === 0) return;
    const tweens = Array.from(shapes).map((el, i) =>
      gsap.to(el, {
        y: i % 2 === 0 ? -22 : 18,
        x: i % 2 === 0 ? 10 : -12,
        duration: 4 + i,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })
    );
    return () => tweens.forEach((t) => t.kill());
  }, []);

  if (!hero) return null;

  const { subheading, heading, description, ctaText, ctaLink, heroImage, backgroundImage } = hero;

  return (
    <section
      className="relative overflow-hidden min-h-[560px] lg:min-h-[640px] py-24 bg-[#f4f4f5] flex items-center font-body border-b border-[#e5e7eb] w-full"
      style={{
        backgroundImage: backgroundImage
          ? `linear-gradient(to right, rgba(244,244,245,1) 35%, rgba(244,244,245,0.75) 65%, rgba(244,244,245,0.15) 100%), url("${backgroundImage}")`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center 60%",
      }}
    >
      <div className="absolute top-1/3 left-2/3 -translate-y-1/2 w-[450px] h-[450px] bg-[#e31e24]/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div ref={shapesRef} className="absolute inset-0 pointer-events-none z-0">
        <div className="hero-float-shape absolute top-[18%] left-[8%] w-16 h-16 rounded-2xl border border-[#e31e24]/20 bg-white/40" />
        <div className="hero-float-shape absolute bottom-[22%] left-[18%] w-10 h-10 rounded-full bg-[#e31e24]/10" />
        <div className="hero-float-shape absolute top-[15%] right-[12%] w-8 h-8 rounded-full border border-[#1c1c1e]/15" />
        <div className="hero-float-shape absolute bottom-[15%] right-[20%] w-14 h-14 rounded-2xl bg-[#f5a623]/10" />
      </div>

      <div className="relative z-10 w-full max-w-[1250px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
            {subheading && (
              <motion.p
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="text-xs md:text-sm text-[#e31e24] font-bold tracking-[2px] uppercase mb-4 font-heading"
              >
                {subheading}
              </motion.p>
            )}

            {heading && (
              <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="text-[30px] leading-[1.15] sm:text-[40px] lg:text-[48px] xl:text-[56px] text-slate-900 font-heading font-extrabold mb-6 tracking-tight"
              >
                {heading}
              </motion.h1>
            )}

            {description && (
              <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="text-base lg:text-lg leading-[1.8] text-slate-700 mb-9 max-w-[620px] mx-auto lg:mx-0"
              >
                {description}
              </motion.p>
            )}

            {ctaText && (
              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show">
                <a href={ctaLink || "/contact"} className="no-underline">
                  <button className="inline-flex items-center gap-2 px-9 py-4 text-[15px] font-bold rounded-lg border-0 bg-[#e31e24] text-white shadow-[0_6px_20px_rgba(227,30,36,0.35)] transition-all duration-300 hover:bg-[#c4151a] hover:scale-[1.03] hover:shadow-[0_12px_25px_rgba(227,30,36,0.45)] cursor-pointer">
                    {ctaText}
                    <ArrowRight size={18} />
                  </button>
                </a>
              </motion.div>
            )}
          </div>

          {heroImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative z-10 w-full max-w-[520px] mx-auto"
            >
              <img
                src={heroImage}
                alt={heading || "Digicore services"}
                className="w-full h-auto object-cover rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.08)] border border-white/50"
              />
            </motion.div>
          )}
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[#e31e24]"
      >
        <ChevronDown size={26} />
      </motion.div>
    </section>
  );
};

export default Hero;
