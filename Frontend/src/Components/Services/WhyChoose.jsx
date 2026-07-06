import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const WhyChoose = ({ data }) => {
  if (!data || (!data.heading && !data.cards?.length)) return null;
  const cards = data.cards || [];

  return (
    <section className="w-full py-24 px-5 bg-white border-b border-[#e5e7eb]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16 max-w-[800px] mx-auto">
          <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-5 rounded-[10px]" />
          {data.heading && (
            <h2 className="text-[36px] max-[769px]:text-[28px] font-heading font-extrabold text-[#1c1c1e] mb-4">
              {data.heading}
            </h2>
          )}
          {data.description && (
            <p className="text-[16px] leading-[1.8] text-[#4b5563]">{data.description}</p>
          )}
        </div>

        {cards.length > 0 && (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {cards.map((card, i) => (
              <motion.div
                key={card.id || i}
                variants={cardVariant}
                className="group bg-[#f4f4f5] rounded-3xl p-8 border border-[#e5e7eb] hover:bg-white hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(227,30,36,0.1)] hover:border-[#e31e24]/20 transition-all duration-300 text-center flex flex-col items-center"
              >
                {card.icon && (
                  <div className="w-16 h-16 rounded-full bg-[#fee2e2] flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                    <img src={card.icon} alt={card.title || ""} className="w-8 h-8 object-contain" />
                  </div>
                )}
                {card.title && <h3 className="text-[18px] font-bold text-[#2b2b2e] mb-3">{card.title}</h3>}
                {card.description && (
                  <p className="text-[14px] leading-relaxed text-[#4b5563]">{card.description}</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default WhyChoose;
