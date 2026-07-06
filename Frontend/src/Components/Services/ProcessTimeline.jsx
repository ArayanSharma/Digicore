import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ROW_HEIGHT = 200;
const AMP = 16;

function buildCurvePath(count) {
  if (count < 2) return "";
  const points = Array.from({ length: count }, (_, i) => ({ x: 50, y: i * ROW_HEIGHT + ROW_HEIGHT / 2 }));
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const cx = 50 + AMP * (i % 2 === 0 ? 1 : -1);
    const cy = (a.y + b.y) / 2;
    d += ` C ${cx} ${cy}, ${cx} ${cy}, ${b.x} ${b.y}`;
  }
  return d;
}

const ProcessTimeline = ({ data }) => {
  const pathRef = useRef(null);
  const wrapRef = useRef(null);
  const steps = data?.steps || [];

  useEffect(() => {
    const path = pathRef.current;
    const wrap = wrapRef.current;
    if (!path || !wrap || steps.length < 2) return;
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    const st = gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top 75%",
        end: "bottom 60%",
        scrub: 0.6,
      },
    });
    return () => st.scrollTrigger?.kill();
  }, [steps.length]);

  if (!data || (!data.heading && steps.length === 0)) return null;

  const totalHeight = steps.length * ROW_HEIGHT;
  const d = buildCurvePath(steps.length);

  return (
    <section className="w-full py-24 px-5 bg-white border-b border-[#e5e7eb] overflow-hidden">
      <div className="max-w-[1000px] mx-auto">
        {data.heading && (
          <div className="text-center mb-16">
            <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-5 rounded-[10px]" />
            <h2 className="text-[34px] max-[769px]:text-[26px] font-heading font-extrabold text-[#1c1c1e]">
              {data.heading}
            </h2>
          </div>
        )}

        {steps.length > 0 && (
          <div ref={wrapRef} className="relative max-w-[720px] mx-auto" style={{ minHeight: totalHeight }}>
            {steps.length > 1 && (
              <svg
                className="absolute inset-0 w-full h-full hidden md:block"
                viewBox={`0 0 100 ${totalHeight}`}
                preserveAspectRatio="none"
                fill="none"
              >
                <path d={d} stroke="rgba(227,30,36,0.18)" strokeWidth="1.4" />
                <path ref={pathRef} d={d} stroke="#e31e24" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            )}

            <div className="absolute left-4 md:hidden top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-400 via-[#e31e24] to-red-400" />

            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={step.id || i}
                  className="relative grid grid-cols-2 gap-x-14 items-center pl-12 md:pl-0"
                  style={{ height: ROW_HEIGHT }}
                >
                  <div className="absolute left-4 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-[#e31e24] text-[#e31e24] flex items-center justify-center font-extrabold text-sm shadow-[0_6px_18px_rgba(227,30,36,0.2)] overflow-hidden">
                      {step.icon ? <img src={step.icon} alt="" className="w-6 h-6 object-contain" /> : i + 1}
                    </div>
                  </div>

                  <div
                    className={`col-span-2 md:col-span-1 text-left ${
                      isLeft ? "md:col-start-1 md:text-right md:pr-8" : "md:col-start-2 md:pl-8"
                    }`}
                  >
                    <h3 className="font-bold text-slate-900 text-lg font-heading">{step.title}</h3>
                    <p className="text-sm text-[#4b5563] mt-2 leading-relaxed">{step.description}</p>
                  </div>
                  <div className={`hidden md:block ${isLeft ? "col-start-2" : "col-start-1"}`} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProcessTimeline;
