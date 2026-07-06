import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCountUp } from "../../hooks/useCountUp";

const parseStat = (raw) => {
  const match = /^(\d+)(.*)$/.exec((raw || "").trim());
  if (!match) return { number: 0, suffix: raw || "" };
  return { number: Number(match[1]), suffix: match[2] || "" };
};

const StatItem = ({ item }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const { number, suffix } = parseStat(item.title);
  const value = useCountUp(inView ? number : 0, 1400);

  return (
    <div ref={ref} className="text-center">
      {item.icon && (
        <img src={item.icon} alt="" className="w-10 h-10 object-contain mx-auto mb-4 opacity-90" />
      )}
      <p className="text-[42px] sm:text-[52px] font-heading font-extrabold text-white leading-none mb-2">
        {value}
        {suffix}
      </p>
      {item.description && (
        <p className="text-sm sm:text-base text-white/70 font-medium">{item.description}</p>
      )}
    </div>
  );
};

const Stats = ({ data }) => {
  if (!data || (!data.heading && !data.items?.length)) return null;
  const items = data.items || [];

  return (
    <section className="relative overflow-hidden w-full py-24 px-5 bg-gradient-to-br from-[#1c1c1e] to-slate-900">
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#e31e24]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="max-w-[1200px] mx-auto relative z-10">
        {data.heading && (
          <div className="text-center mb-16">
            <h2 className="text-[34px] max-[769px]:text-[26px] font-heading font-extrabold text-white">
              {data.heading}
            </h2>
          </div>
        )}

        {items.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {items.map((item, i) => (
              <motion.div
                key={item.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <StatItem item={item} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Stats;
