import React from "react";
import { motion } from "framer-motion";

const CategoryTabs = ({ categories, activeSlug, onSelect }) => {
  if (!categories.length) return null;

  const handleClick = (slug) => {
    const el = document.getElementById(slug);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top, behavior: "smooth" });
    }
    onSelect?.(slug);
  };

  return (
    <div className="sticky top-[72px] z-30 bg-white/90 backdrop-blur-md border-b border-[#e5e7eb] shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
      <div className="max-w-[1250px] mx-auto px-5">
        <div className="flex items-center gap-1 overflow-x-auto py-3" style={{ scrollbarWidth: "none" }}>
          {categories.map((cat) => {
            const isActive = activeSlug === cat.slug;
            return (
              <button
                key={cat._id}
                type="button"
                onClick={() => handleClick(cat.slug)}
                className={`relative shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors duration-300 ${
                  isActive ? "text-white" : "text-[#4b5563] hover:text-[#e31e24]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="category-tab-pill"
                    className="absolute inset-0 rounded-full bg-[#e31e24] shadow-[0_6px_16px_rgba(227,30,36,0.35)]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
