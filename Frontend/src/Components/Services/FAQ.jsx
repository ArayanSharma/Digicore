import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQ = ({ heading, items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!items || items.length === 0) return null;

  const toggleFAQ = (index) => setActiveIndex(activeIndex === index ? null : index);

  return (
    <section className="w-full py-24 px-5 bg-[#f4f4f5] border-t border-b border-[#e5e7eb]">
      <div className="max-w-[850px] mx-auto">
        <div className="text-center mb-12">
          <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px]" />
          <h2 className="text-[36px] max-[769px]:text-[26px] font-heading font-extrabold text-[#1c1c1e] uppercase">
            {heading || "FAQ"}
          </h2>
        </div>
        <div className="space-y-4">
          {items.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={faq.id || index}
                className={`bg-white border rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.01)] transition-all duration-300 ${
                  isOpen ? "border-[#e31e24]/30 shadow-[0_12px_32px_rgba(227,30,36,0.08)]" : "border-slate-200 hover:border-[#e31e24]/20"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 cursor-pointer bg-transparent border-0 select-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-semibold text-slate-900 text-[15px]">{faq.question}</span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isOpen ? "bg-[#e31e24] text-white" : "bg-[#e31e24]/8 text-[#e31e24]"
                    }`}
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                <div className="grid transition-all duration-300 ease-in-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm text-slate-500 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
