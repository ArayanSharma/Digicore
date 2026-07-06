import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const itemVariant = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const TechStack = ({ data }) => {
  if (!data || (!data.heading && !data.items?.length)) return null;
  const items = data.items || [];

  return (
    <section className="w-full py-24 px-5 bg-[#f4f4f5] border-b border-[#e5e7eb]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-14">
          <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-5 rounded-[10px]" />
          {data.heading && (
            <h2 className="text-[34px] max-[769px]:text-[26px] font-heading font-extrabold text-[#1c1c1e]">
              {data.heading}
            </h2>
          )}
        </div>

        {items.length > 0 && (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6"
          >
            {items.map((item, i) => (
              <motion.div
                key={item.id || i}
                variants={itemVariant}
                whileHover={{ y: -6 }}
                className="flex flex-col items-center justify-center gap-3 bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(227,30,36,0.1)] hover:border-[#e31e24]/20 transition-all duration-300"
              >
                {item.icon && (
                  <img src={item.icon} alt={item.title || ""} className="w-10 h-10 object-contain" />
                )}
                {item.title && (
                  <span className="text-[13px] font-semibold text-[#4b5563] text-center">{item.title}</span>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TechStack;
