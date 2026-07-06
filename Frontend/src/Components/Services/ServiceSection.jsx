import React from "react";
import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const ServiceSection = ({ category, services, index }) => {
  const isAlt = index % 2 === 1;

  return (
    <section
      id={category.slug}
      className={`scroll-mt-32 w-full py-20 px-5 ${isAlt ? "bg-[#f4f4f5]" : "bg-white"} border-b border-[#e5e7eb]`}
    >
      <div className="max-w-[1250px] mx-auto">
        <div className="text-center mb-14 max-w-[800px] mx-auto">
          <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-5 rounded-[10px]" />
          <h2 className="text-[34px] max-[769px]:text-[26px] font-heading font-extrabold text-[#1c1c1e] mb-4 leading-tight">
            {category.name}
          </h2>
          {category.description && (
            <p className="text-[16px] leading-[1.8] text-[#4b5563]">{category.description}</p>
          )}
        </div>

        {services.length === 0 ? (
          <p className="text-center text-sm text-[#6b7280] italic">
            Services for this category are coming soon.
          </p>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ServiceSection;
