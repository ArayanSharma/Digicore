import React, { useState } from "react";
import Banner from "../Components/Cards/Seohero";
import ServiceCard from "../Components/Cards/ServiceCard";
import "../Styles/Reseller.css";
import {
  FaSearch,
  FaChartLine,
  FaBullseye,
  FaFilter,
  FaArrowUp,
  FaWhatsapp,
} from "react-icons/fa";
import { usePageContent, resolveImage } from "../hooks/usePageContent";

const BENEFIT_ICON_MAP = {
  FaSearch: <FaSearch />,
  FaChartLine: <FaChartLine />,
  FaBullseye: <FaBullseye />,
  FaFilter: <FaFilter />,
  FaArrowUp: <FaArrowUp />,
};

const Reseller = () => {
  const { content: pc } = usePageContent("Reseller");
  const banner = pc?.banner;
  const seoResellerIntro = pc?.seoResellerIntro;
  const resellerSection = pc?.resellerSection;
  const displayBenefits = Array.isArray(pc?.benefits)
    ? pc.benefits.map((b) => ({ ...b, icon: BENEFIT_ICON_MAP[b.icon] || <FaSearch /> }))
    : [];
  const servicesSection = pc?.servicesSection;
  const displayServices = Array.isArray(pc?.services)
    ? pc.services.map((s) => ({ ...s, icon: resolveImage(s.icon || s.image), description: s.description || s.desc }))
    : [];
  const dmBanner = pc?.dmBanner;
  const seoTeam = pc?.seoTeam;
  const solutionsSection = pc?.solutionsSection;
  const displaySolutions = Array.isArray(pc?.solutions)
    ? pc.solutions.map((s) => ({ ...s, icon: resolveImage(s.icon) }))
    : [];
  const seoCase = pc?.seoCase;
  const displayCaseStudies = Array.isArray(seoCase?.caseStudies)
    ? seoCase.caseStudies.map((cs) => ({ ...cs, logo: resolveImage(cs.logo), poster: resolveImage(cs.poster) }))
    : [];
  const outsourcing = pc?.outsourcing;
  const otherServices = pc?.otherServices;

  const [currentCase, setCurrentCase] = useState(0);

  const nextCase = () => {
    setCurrentCase((prev) =>
      prev === displayCaseStudies.length - 1 ? 0 : prev + 1
    );
  };

  const prevCase = () => {
    setCurrentCase((prev) =>
      prev === 0 ? displayCaseStudies.length - 1 : prev - 1
    );
  };

  const [active, setActive] = useState(0);
  const displayLeftItems = Array.isArray(otherServices?.leftItems) ? otherServices.leftItems : [];
  const displayRightItems = Array.isArray(otherServices?.rightItems) ? otherServices.rightItems : [];
  const additionalBanner = pc?.additionalBanner;
  const benefitsProgram = pc?.benefitsProgram;
  const testimonialsData = pc?.testimonials;
  const displayTestimonials = Array.isArray(testimonialsData?.items)
    ? testimonialsData.items.map((i) => ({ ...i, image: resolveImage(i.image) }))
    : [];
  const brandsData = pc?.brands;
  const displayBrands = Array.isArray(brandsData?.brandLogos)
    ? brandsData.brandLogos.filter((b) => b?.url).map((b) => resolveImage(b.url))
    : [];
  const mapData = pc?.map;

  return (
    <div className="bg-white">
      {banner && (
        <Banner
          subtitle={banner.subtitle}
          title={banner.title}
          description={banner.description}
          primaryBtnText={banner.primaryBtn?.text}
          primaryBtnLink={banner.primaryBtn?.link}
          secondaryBtnText={banner.secondaryBtn?.text}
          secondaryBtnLink={banner.secondaryBtn?.link}
          backgroundImage={banner.backgroundImage ? resolveImage(banner.backgroundImage) : undefined}
        />
      )}

      {/* SEO Reseller Section */}
      {seoResellerIntro && (
        <section className="w-full py-24 px-5 bg-white">
          <div className="max-w-[1200px] mx-auto text-center">
            <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px]"></div>
            {seoResellerIntro.title && (
              <h2 className="text-[38px] max-[769px]:text-[28px] font-heading font-extrabold text-[#1c1c1e] mb-2 leading-tight">
                {seoResellerIntro.title}
              </h2>
            )}
            {seoResellerIntro.subtitle && (
              <p className="text-[17px] leading-[1.8] text-[#e31e24] font-semibold max-w-[850px] mx-auto mb-10">
                {seoResellerIntro.subtitle}
              </p>
            )}
            {Array.isArray(seoResellerIntro.paragraphs) && (
              <div className="text-[16px] leading-[1.8] text-[#4b5563] space-y-6 text-left max-w-[950px] mx-auto">
                {seoResellerIntro.paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Reseller Section */}
      {resellerSection && (
        <section className="w-full py-24 px-5 bg-[#f4f4f5] border-t border-[#e5e7eb]">
          <div className="max-w-[1200px] mx-auto">
            {resellerSection.heading && (
              <h2 className="text-center text-[36px] max-[769px]:text-[28px] font-heading font-extrabold text-[#1c1c1e] mb-[15px] leading-tight">
                {resellerSection.heading}
              </h2>
            )}
            <div className="w-[70px] h-[4px] bg-[#e31e24] mx-auto mb-[30px] rounded-[20px]"></div>
            {Array.isArray(resellerSection.paragraphs) && (
              <div className="text-[16px] leading-[1.8] text-[#4b5563] space-y-6 max-w-[950px] mx-auto mb-16">
                {resellerSection.paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}
            {displayBenefits.length > 0 && (
              <div className="flex justify-center gap-6 flex-wrap pt-4 max-w-[1100px] mx-auto">
                {displayBenefits.map((item, index) => (
                  <div
                    key={index}
                    className={`group w-[190px] h-[190px] rounded-full bg-white border border-slate-200 flex flex-col items-center justify-center text-center p-4 box-border relative overflow-hidden cursor-pointer shadow-[0_4px_15px_rgba(0,0,0,0.02)] transition-all duration-300 hover:bg-[#e31e24] hover:border-[#e31e24] hover:shadow-[0_12px_25px_rgba(227,30,36,0.25)] hover:-translate-y-1.5 ${
                      item.active ? "border-[#e31e24]/30 shadow-[0_10px_25px_rgba(227,30,36,0.08)]" : ""
                    }`}
                  >
                    <div className="relative z-[2] text-[#e31e24] text-3xl mb-3 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      {item.icon}
                    </div>
                    <h4 className="relative z-[2] text-center font-bold text-slate-800 text-[14px] leading-tight m-0 transition-colors duration-300 group-hover:text-white">
                      {item.title}
                    </h4>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Services Grid Section */}
      {displayServices.length > 0 && (
        <section className="w-full py-[100px] px-5 bg-[#f4f4f5] text-center border-b border-[#e5e7eb]">
          <div className="max-w-[1200px] mx-auto px-5">
            <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px] max-[769px]:w-[50px] max-[769px]:mb-[20px]"></div>
            {servicesSection?.heading && (
              <h2 className="text-[48px] max-[993px]:text-[38px] max-[769px]:text-[30px] leading-[1.1] text-[#1c1c1e] mb-[25px] font-heading font-extrabold">
                {servicesSection.heading}
              </h2>
            )}
            {servicesSection?.description && (
              <p className="text-[17px] leading-[1.8] text-[#4b5563] max-w-[850px] mx-auto mb-[60px]">
                {servicesSection.description}
              </p>
            )}
          </div>
          <div className="max-w-[1200px] mx-auto px-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
              {displayServices.map((service, index) => (
                <ServiceCard
                  key={service.id || index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner Section */}
      {dmBanner && (
        <section className="relative overflow-hidden w-full py-20 px-5 bg-gradient-to-br from-[#1c1c1e] to-slate-900 border-t border-b border-[#2b2b2e]">
          <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="text-center lg:text-left space-y-4">
              {dmBanner.heading && (
                <h2 className="text-[36px] max-[769px]:text-[28px] font-heading font-extrabold text-white leading-tight">
                  {dmBanner.heading}
                </h2>
              )}
              {dmBanner.description && (
                <p className="text-[17px] text-slate-300 max-w-2xl leading-relaxed">
                  {dmBanner.description}
                </p>
              )}
            </div>
            {dmBanner.button?.text && (
              <div className="shrink-0">
                <a
                  href={dmBanner.button.link || "https://wa.me/919818888064"}
                  className="relative overflow-hidden inline-flex items-center gap-2 text-[#22c55e] font-bold px-[38px] py-[16px] rounded-lg bg-white border border-[#22c55e]/25 shadow-[0_6px_20px_rgba(34,197,94,0.16)] transition-all duration-300 hover:bg-[#f0fdf4] hover:text-[#16a34a] hover:scale-[1.03] cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="text-xl" />
                  <span>{dmBanner.button.text}</span>
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* SEO Team Section */}
      {seoTeam && (
        <section className="w-full py-24 px-5 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px]"></div>
            {seoTeam.heading && (
              <h2 className="text-center text-[38px] max-[769px]:text-[28px] font-heading font-extrabold text-[#1c1c1e] mb-6 leading-tight">
                {seoTeam.heading}
              </h2>
            )}
            {seoTeam.intro && (
              <p className="text-center text-[17px] leading-[1.8] text-[#4b5563] max-w-[950px] mx-auto mb-16">
                {seoTeam.intro}
              </p>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {seoTeam.image && (
                <div className="relative rounded-3xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.05)] border border-slate-100">
                  <img
                    src={resolveImage(seoTeam.image)}
                    alt="SEO Team"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {Array.isArray(seoTeam.paragraphs) && (
                <div className="text-[16px] leading-[1.8] text-[#4b5563] space-y-6">
                  {seoTeam.paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SEO Solutions Section */}
      {displaySolutions.length > 0 && (
        <section className="w-full py-24 px-5 bg-[#f4f4f5] border-t border-b border-[#e5e7eb]">
          <div className="max-w-[1200px] mx-auto">
            <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px]"></div>
            {solutionsSection?.heading && (
              <h2 className="text-center text-[38px] max-[769px]:text-[28px] font-heading font-extrabold text-[#1c1c1e] mb-4">
                {solutionsSection.heading}
              </h2>
            )}
            {solutionsSection?.subtitle && (
              <p className="text-center text-[17px] leading-[1.8] text-[#4b5563] max-w-[900px] mx-auto mb-16">
                {solutionsSection.subtitle}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displaySolutions.map((item, index) => (
                <div
                  className="group bg-white rounded-3xl p-8 border border-[#e5e7eb] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(227,30,36,0.1)] hover:border-[#e31e24]/20 transition-all duration-300 flex flex-col items-start text-left"
                  key={index}
                >
                  <div className="flex items-center gap-4 mb-6">
                    {item.icon && (
                      <div className="w-14 h-14 rounded-full bg-[#fee2e2] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                        <img
                          src={item.icon}
                          alt={item.title || "Icon"}
                          className="w-7 h-7 object-contain"
                        />
                      </div>
                    )}
                    {item.title && <h3 className="text-[18px] font-bold text-[#2b2b2e] leading-tight">{item.title}</h3>}
                  </div>
                  {item.description && <p className="text-[14px] leading-relaxed text-[#4b5563]">{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SEO Case Section */}
      {displayCaseStudies.length > 0 && (
        <section className="w-full py-24 px-5 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px]"></div>
            {seoCase?.heading && (
              <h2 className="text-center text-[38px] max-[769px]:text-[28px] font-heading font-extrabold text-[#1c1c1e] mb-4">
                {seoCase.heading}
              </h2>
            )}
            {seoCase?.description && (
              <p className="text-center text-[17px] leading-[1.8] text-[#4b5563] max-w-[900px] mx-auto mb-12">
                {seoCase.description}
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-6 mb-16">
              {displayCaseStudies.map((item, index) => (
                <div
                  key={index}
                  className={`relative w-20 h-20 rounded-full border flex items-center justify-center p-3 cursor-pointer transition-all duration-300 ${
                    currentCase === index
                      ? "border-[#e31e24] bg-white shadow-[0_8px_20px_rgba(227,30,36,0.15)] scale-110"
                      : "border-slate-200 bg-slate-50 hover:border-[#e31e24]/40 hover:bg-white"
                  }`}
                  onClick={() => setCurrentCase(index)}
                >
                  <img src={item.logo} alt={`logo-${index}`} className="max-w-full max-h-full object-contain" />
                  {currentCase === index && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#e31e24] rotate-45"></div>
                  )}
                </div>
              ))}
            </div>
            {displayCaseStudies[currentCase] && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <div className="space-y-6">
                  <h3 className="text-[24px] font-bold text-slate-800 border-b border-slate-200 pb-3">Rankings</h3>
                  {Array.isArray(displayCaseStudies[currentCase].rankings) && (
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-[14px]">
                            <th className="px-6 py-4">Keywords</th>
                            <th className="px-6 py-4">Ranking</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {displayCaseStudies[currentCase].rankings.map((item, index) => (
                            <tr key={index} className="text-slate-700 text-sm hover:bg-slate-50/50 transition-colors duration-200">
                              <td className="px-6 py-3.5 font-medium">{item.keyword}</td>
                              <td className="px-6 py-3.5 text-[#e31e24] font-bold">{item.rank}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                {displayCaseStudies[currentCase].poster && (
                  <div className="relative rounded-3xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-slate-200/60 aspect-[16/10]">
                    <img
                      src={displayCaseStudies[currentCase].poster}
                      alt="Case Study"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* SEO Outsourcing Section */}
      {outsourcing && (
        <section className="w-full py-24 px-5 bg-[#f4f4f5] border-t border-b border-[#e5e7eb]">
          <div className="max-w-[1200px] mx-auto text-center">
            <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px]"></div>
            {outsourcing.heading && (
              <h2 className="text-center text-[38px] max-[769px]:text-[28px] font-heading font-extrabold text-[#1c1c1e] mb-10 leading-tight">
                {outsourcing.heading}
              </h2>
            )}
            {Array.isArray(outsourcing.paragraphs) && (
              <div className="text-[17px] leading-[1.8] text-[#4b5563] space-y-6 max-w-[950px] mx-auto text-left">
                {outsourcing.paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Other Reseller Services Section */}
      {otherServices && (
        <section className="w-full py-24 px-5 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px]"></div>
            {otherServices.heading && (
              <h2 className="text-center text-[36px] max-[769px]:text-[28px] font-heading font-extrabold text-[#1c1c1e] mb-4 leading-tight">
                {otherServices.heading}
              </h2>
            )}
            {otherServices.subtitle && (
              <p className="text-center text-[17px] leading-[1.8] text-[#e31e24] font-semibold max-w-[850px] mx-auto mb-16">
                {otherServices.subtitle}
              </p>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-8">
                {otherServices.image && (
                  <div className="relative rounded-3xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.05)] border border-slate-100 mb-8">
                    <img
                      src={resolveImage(otherServices.image)}
                      alt="Other Services"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {displayLeftItems.length > 0 && (
                  <ul className="space-y-4">
                    {displayLeftItems.map((item, i) => (
                      <li className="flex items-start gap-3 text-[15px] leading-relaxed text-[#4b5563]" key={i}>
                        <span className="text-[#e31e24] text-lg font-bold shrink-0 mt-0.5">✔</span>
                        <span>
                          <strong className="text-slate-800 font-bold">{item.title}</strong> – {item.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {displayRightItems.length > 0 && (
                <ul className="space-y-4 lg:pt-2">
                  {displayRightItems.map((item, i) => (
                    <li className="flex items-start gap-3 text-[15px] leading-relaxed text-[#4b5563]" key={i}>
                      <span className="text-[#e31e24] text-lg font-bold shrink-0 mt-0.5">✔</span>
                      <span>
                        <strong className="text-slate-800 font-bold">{item.title}</strong> – {item.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Additional CTA Banner Section */}
      {additionalBanner && (
        <section className="relative overflow-hidden w-full py-20 px-5 bg-gradient-to-br from-[#1c1c1e] to-slate-900 border-t border-b border-[#2b2b2e]">
          <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="text-center lg:text-left space-y-4">
              {additionalBanner.description && (
                <p className="text-[20px] font-bold text-white max-w-3xl leading-relaxed">
                  {additionalBanner.description}
                </p>
              )}
            </div>
            {additionalBanner.button?.text && (
              <div className="shrink-0">
                <a
                  href={additionalBanner.button.link || "https://wa.me/919818888064"}
                  className="relative overflow-hidden inline-flex items-center gap-2 text-[#22c55e] font-bold px-[34px] py-[15px] rounded-lg bg-white border border-[#22c55e]/25 shadow-[0_6px_20px_rgba(34,197,94,0.16)] transition-all duration-300 hover:bg-[#f0fdf4] hover:text-[#16a34a] hover:scale-[1.03] cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="text-xl" />
                  <span>{additionalBanner.button.text}</span>
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Benefits Program Section */}
      {benefitsProgram && (
        <section className="w-full py-24 px-5 bg-white border-b border-[#e5e7eb]">
          <div className="max-w-[1200px] mx-auto">
            <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px]"></div>
            {benefitsProgram.heading && (
              <h2 className="text-center text-[38px] max-[769px]:text-[28px] font-heading font-extrabold text-[#1c1c1e] mb-4">
                {benefitsProgram.heading}
              </h2>
            )}
            {benefitsProgram.subtitle && (
              <p className="text-center text-[17px] leading-[1.8] text-[#4b5563] max-w-[900px] mx-auto mb-16">
                {benefitsProgram.subtitle}
              </p>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {Array.isArray(benefitsProgram.items) && (
                <div className="space-y-4">
                  <ul className="space-y-4">
                    {benefitsProgram.items.map((item, i) => (
                      <li className="flex items-start gap-3 text-[15px] leading-relaxed text-[#4b5563]" key={i}>
                        <span className="text-[#e31e24] text-lg font-bold shrink-0 mt-0.5">✔</span>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {benefitsProgram.image && (
                <div className="relative rounded-3xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.05)] border border-slate-100">
                  <img
                    src={resolveImage(benefitsProgram.image)}
                    alt="SEO Reseller Benefits"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {displayTestimonials.length > 0 && (
        <section className="w-full py-24 px-5 bg-[#f4f4f5]">
          <div className="max-w-[1200px] mx-auto">
            {testimonialsData?.title && (
              <h2 className="text-center text-[38px] max-[769px]:text-[28px] font-heading font-extrabold text-[#1c1c1e] mb-4">
                {testimonialsData.title}
              </h2>
            )}
            {testimonialsData?.subtitle && (
              <p className="text-center text-[17px] leading-[1.8] text-[#4b5563] max-w-[900px] mx-auto mb-16">
                {testimonialsData.subtitle}
              </p>
            )}
            {displayTestimonials[active] && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/60 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
                {testimonialsData?.videoImage && (
                  <div className="relative rounded-3xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.05)] border border-slate-200 aspect-[16/10]">
                    <img
                      src={resolveImage(testimonialsData.videoImage)}
                      alt="Video"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
                    {displayTestimonials[active].image && (
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#e31e24] shadow-[0_4px_15px_rgba(227,30,36,0.15)]">
                        <img
                          src={displayTestimonials[active].image}
                          alt={displayTestimonials[active].name || "Testimonial"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      {displayTestimonials[active].name && (
                        <h4 className="text-[20px] font-bold text-slate-800 leading-tight">
                          {displayTestimonials[active].name}
                        </h4>
                      )}
                      {displayTestimonials[active].designation && (
                        <p className="text-sm text-[#e31e24] mt-1 font-semibold">
                          {displayTestimonials[active].designation}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="relative pt-6">
                    <span className="absolute -top-3 left-0 text-[60px] text-[#e31e24]/10 font-serif leading-none select-none">“</span>
                    {displayTestimonials[active].text && (
                      <p className="text-[16px] leading-[1.8] text-slate-600 relative z-10 italic pl-6">
                        {displayTestimonials[active].text}
                      </p>
                    )}
                    <span className="absolute bottom-0 right-0 text-[60px] text-[#e31e24]/10 font-serif leading-none select-none translate-y-6">”</span>
                  </div>
                  <div className="flex justify-center gap-2 pt-6">
                    {displayTestimonials.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                          active === index ? "bg-[#e31e24] w-6" : "bg-[#e31e24]/20 hover:bg-[#e31e24]/40"
                        }`}
                        onClick={() => setActive(index)}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Brands Section */}
      {displayBrands.length > 0 && (
        <section className="w-full py-16 px-5 bg-white border-b border-slate-100">
          <div className="max-w-[1200px] mx-auto">
            {brandsData?.heading && (
              <h2 className="text-center text-[30px] font-heading font-extrabold text-[#1c1c1e] mb-12">
                {brandsData.heading}
              </h2>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60 hover:opacity-100 transition-opacity duration-300">
              {displayBrands.map((brand, index) => (
                <div className="h-20 flex items-center justify-center" key={index}>
                  <img src={brand} alt={`brand-${index + 1}`} className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Map Section */}
      {mapData?.embedUrl && (
        <div className="w-full h-[450px] relative border-t border-slate-200">
          <iframe
            src={mapData.embedUrl}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
            className="w-full h-full block"
          />
        </div>
      )}
    </div>
  );
};

export default Reseller;
