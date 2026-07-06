import React, { useEffect, useState } from "react";

import Banner from "../Components/Cards/Seohero";
import ServiceCard from "../Components/Cards/ServiceCard";
import "../Styles/faq.css";

import TestimonialSection from "../Components/Sections/Testimonials";
import Brands from "../Components/Sections/Brands";
import Tools from "../Components/Sections/Tools";
import Blogs from "../Components/Cards/BlogCard";
import Contacts from "../Components/Sections/Contact";
import { Plus, Minus } from "lucide-react";
import eimage from "../assets/BannerImg/AiSeo2.png";
import { usePageContent, resolveImage } from "../hooks/usePageContent";

const AiSeo = () => {
  const { content: c } = usePageContent("ai-seo");
  const banner = c?.banner;
  const about = c?.about;
  const visibility = c?.visibility;
  const performance = c?.performance;
  const seoAgency = c?.seoAgency;
  const discover = c?.discover;
  const whyChoose = c?.whyChoose;
  const video = c?.video;
  const dominate = c?.dominate;
  const whyBusiness = c?.whyBusiness;

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const displayServices = Array.isArray(c?.services)
    ? c.services.map((s) => ({ ...s, icon: resolveImage(s.icon) }))
    : [];

  const displayDominateCards = Array.isArray(dominate?.cards)
    ? dominate.cards.map((card) => ({ ...card, icon: resolveImage(card.icon), desc: card.desc }))
    : [];

  const displayFaq = Array.isArray(c?.faq) ? c.faq : [];

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
          backgroundImage={banner.backgroundImage ? resolveImage(banner.backgroundImage) : eimage}
        />
      )}

      {/* About Section */}
      {about && (about.heading || about.body) && (
        <section className="w-full py-24 px-5 bg-white">
          <div className="max-w-[1200px] mx-auto text-center">
            <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px]"></div>
            {about.heading && (
              <h1 className="text-[40px] max-[769px]:text-[30px] font-heading font-extrabold text-[#1c1c1e] mb-6 leading-tight">
                {about.heading}
              </h1>
            )}
            {about.body && (
              <p className="text-[17px] leading-[1.8] text-[#4b5563] max-w-[900px] mx-auto">
                {about.body}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Visibility Section */}
      {visibility && (visibility.heading || visibility.body || visibility.image) && (
        <section className="w-full py-24 px-5 bg-[#f4f4f5] border-t border-[#e5e7eb]">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {visibility.heading && (
                <h2 className="text-[36px] max-[769px]:text-[28px] font-heading font-extrabold text-[#1c1c1e] mb-6 leading-tight">
                  {visibility.heading}
                </h2>
              )}
              {visibility.body && (
                <div className="text-[16px] leading-[1.8] text-[#4b5563] space-y-6">
                  <p>{visibility.body}</p>
                </div>
              )}
              <div className="w-[120px] h-[4px] bg-[#e31e24] mt-10"></div>
            </div>
            {visibility.image && (
              <div className="relative rounded-3xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.05)] border border-slate-200">
                <img
                  src={resolveImage(visibility.image)}
                  alt="Visibility"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Video Section */}
      {video && video.title && (
        <section className="w-full py-20 px-5 bg-white text-center">
          <div className="max-w-[1200px] mx-auto">
            <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px]"></div>
            <h2 className="text-[36px] max-[769px]:text-[28px] font-heading font-extrabold text-[#1c1c1e] mb-12">
              {video.title}
            </h2>
            {video.url && (
              <div className="w-full max-w-[900px] mx-auto rounded-3xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-slate-100 aspect-[16/9]">
                <iframe
                  src={video.url}
                  title="Digicore Inc Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0 block"
                ></iframe>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Performance Section */}
      {performance && (performance.labelTrack || performance.labelAnalyze || performance.labelScale || performance.labelRepeat || performance.image) && (
        <section className="w-full p-0 m-0 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-0 w-full">
            <div className="bg-gradient-to-br from-[#8b0000] to-[#1c1c1e] min-h-[350px] flex flex-col justify-center px-12 py-[80px] lg:pl-[120px]">
              {performance.labelTrack && (
                <h2 className="m-0 font-heading font-extrabold text-[60px] leading-[75px] max-[992px]:text-[48px] max-[992px]:leading-[58px] max-[769px]:text-[36px] max-[769px]:leading-[46px] text-white uppercase tracking-tight">
                  {performance.labelTrack}
                </h2>
              )}
              {performance.labelAnalyze && (
                <h2 className="m-0 font-heading font-extrabold text-[60px] leading-[75px] max-[992px]:text-[48px] max-[992px]:leading-[58px] max-[769px]:text-[36px] max-[769px]:leading-[46px] text-white uppercase tracking-tight">
                  {performance.labelAnalyze}
                </h2>
              )}
              {performance.labelScale && (
                <h2 className="m-0 font-heading font-extrabold text-[60px] leading-[75px] max-[992px]:text-[48px] max-[992px]:leading-[58px] max-[769px]:text-[36px] max-[769px]:leading-[46px] text-white uppercase tracking-tight">
                  {performance.labelScale}
                </h2>
              )}
              {performance.labelRepeat && (
                <h2 className="m-0 font-heading font-extrabold text-[60px] leading-[75px] max-[992px]:text-[48px] max-[992px]:leading-[58px] max-[769px]:text-[36px] max-[769px]:leading-[46px] text-white uppercase tracking-tight">
                  {performance.labelRepeat}
                </h2>
              )}
            </div>
            {performance.image && (
              <div className="min-h-[390px] max-[992px]:min-h-[350px] max-[769px]:min-h-[250px] overflow-hidden">
                <img
                  src={resolveImage(performance.image)}
                  alt="SEO Performance"
                  className="w-full h-full block object-cover"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* SEO Agency Section */}
      {seoAgency && (
        <section className="w-full py-24 px-5 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <div className="w-[55px] h-1 bg-[#e31e24] mx-auto mb-[18px] rounded-[10px]"></div>
            {seoAgency.heading && (
              <h2   style={{ fontSize: "36px" }} className="text-center text-[38px] max-[769px]:text-[28px] font-heading font-extrabold text-[#1c1c1e] mb-8 uppercase leading-tight">
                {seoAgency.heading}
              </h2>
            )}
            {seoAgency.description && (
              <p className="text-center text-[17px] leading-[1.8] text-[#4b5563] max-w-[1000px] mx-auto mb-16">
                {seoAgency.description}
              </p>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-8">
                {seoAgency.problemTitle && (
                  <div>
                    <h3 className="text-[26px] max-[769px]:text-[20px] text-[#e31e24] font-heading font-extrabold mb-3">
                      {seoAgency.problemTitle}
                    </h3>
                    {seoAgency.problemText && (
                      <p className="text-[16px] leading-[1.8] text-[#4b5563]">
                        {seoAgency.problemText}
                      </p>
                    )}
                  </div>
                )}
                {seoAgency.solutionTitle && (
                  <div>
                    <h3 className="text-[26px] max-[769px]:text-[20px] text-emerald-600 font-heading font-extrabold mb-3">
                      {seoAgency.solutionTitle}
                    </h3>
                    {seoAgency.solutionText && (
                      <p className="text-[16px] leading-[1.8] text-[#4b5563]">
                        {seoAgency.solutionText}
                      </p>
                    )}
                  </div>
                )}
              </div>
              <div className="space-y-6 text-[16px] leading-[1.8] text-[#4b5563] lg:pt-2">
                {seoAgency.rightParagraph1 && (
                  <p>{seoAgency.rightParagraph1}</p>
                )}
                {seoAgency.rightParagraph2 && (
                  <p>{seoAgency.rightParagraph2}</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Grid Section */}
      {displayServices.length > 0 && (
        <section className="w-full py-[100px] px-5 bg-[#f4f4f5] text-center border-b border-[#e5e7eb]">
          <div className="max-w-[1200px] mx-auto px-5">
            <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px] max-[769px]:w-[50px] max-[769px]:mb-[20px]"></div>
            {discover?.heading && (
              <h2 className="text-[48px] max-[993px]:text-[38px] max-[769px]:text-[30px] leading-[1.1] text-[#1c1c1e] mb-[25px] font-heading font-extrabold">
                {discover.heading}
              </h2>
            )}
            {discover?.description && (
              <p className="text-[17px] leading-[1.8] text-[#4b5563] max-w-[850px] mx-auto mb-[60px]">
                {discover.description}
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

      {/* CTA Why Choose Section */}
      {whyChoose && (whyChoose.heading || whyChoose.button1?.text || whyChoose.button2?.text) && (
        <section className="relative overflow-hidden w-full py-20 px-5 bg-gradient-to-br from-[#1c1c1e] to-slate-900 text-center border-t border-b border-[#2b2b2e]">
          <div className="max-w-[1200px] mx-auto text-center space-y-8 relative z-10">
            {whyChoose.heading && (
              <h2 className="text-[36px] max-[769px]:text-[28px] font-heading font-extrabold text-white max-w-3xl mx-auto leading-tight">
                {whyChoose.heading}
              </h2>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {whyChoose.button1?.text && (
                <a
                  href={whyChoose.button1.link || "#"}
                  className="relative overflow-hidden inline-flex items-center gap-2 text-[#22c55e] font-bold px-[34px] py-[15px] rounded-lg bg-white border border-[#22c55e]/25 shadow-[0_6px_20px_rgba(34,197,94,0.16)] transition-all duration-300 hover:bg-[#f0fdf4] hover:text-[#16a34a] hover:scale-[1.03] cursor-pointer"
                >
                  <img
                    src="https://tataresearch.besthr.in/digital-marketar/assets/icon/whatsapp.png"
                    alt="whatsapp"
                    className="w-5 h-5 rounded-full bg-[#22c55e] p-[3px] object-contain"
                  />
                  <span>{whyChoose.button1.text}</span>
                </a>
              )}
              {whyChoose.button2?.text && (
                <a
                  href={whyChoose.button2.link || "#"}
                  className="relative overflow-hidden inline-flex items-center gap-2 bg-transparent border border-white text-white font-bold px-[34px] py-[15px] rounded-lg transition-all duration-300 hover:bg-white/10 hover:scale-[1.03] cursor-pointer"
                >
                  <span>{whyChoose.button2.text}</span>
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Dominate Section */}
      {displayDominateCards.length > 0 && (
        <section className="w-full py-24 px-5 bg-[#f4f4f5] border-b border-[#e5e7eb]">
          <div className="max-w-[1200px] mx-auto">
            <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px]"></div>
            {dominate?.heading && (
              <h2   style={{ fontSize: "36px" }} className="text-center text-[38px] max-[769px]:text-[28px] font-heading font-extrabold text-[#1c1c1e] mb-4">
                {dominate.heading}
              </h2>
            )}
            {dominate?.description && (
              <p className="text-center text-[17px] leading-[1.8] text-[#4b5563] max-w-[900px] mx-auto mb-16">
                {dominate.description}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayDominateCards.map((item, index) => (
                <div
                  className="group bg-white rounded-3xl p-8 border border-[#e5e7eb] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(227,30,36,0.1)] hover:border-[#e31e24]/20 transition-all duration-300 flex flex-col items-center text-center"
                  key={item.id || index}
                >
                  {item.icon && (
                    <div className="w-16 h-16 rounded-full bg-[#fee2e2] flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                      <img
                        src={item.icon}
                        alt={item.title || "Icon"}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  )}
                  {item.title && <h3 className="text-[18px] font-bold text-[#2b2b2e] mb-3">{item.title}</h3>}
                  {item.desc && <p className="text-[14px] leading-relaxed text-[#4b5563]">{item.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Section with Checklists */}
      {whyBusiness && (whyBusiness.heading || whyBusiness.description || whyBusiness.features?.length > 0 || whyBusiness.image) && (
        <section className="w-full py-24 px-5 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px]"></div>
            {whyBusiness.heading && (
              <h2   style={{ fontSize: "36px" }} className="text-center text-[36px] max-[769px]:text-[28px] font-heading font-extrabold text-[#1c1c1e] mb-6 uppercase">
                {whyBusiness.heading}
              </h2>
            )}
            {whyBusiness.description && (
              <p className="text-center text-[17px] leading-[1.8] text-[#4b5563] max-w-[950px] mx-auto mb-16">
                {whyBusiness.description}
              </p>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {whyBusiness.features?.length > 0 && (
                <div className="why-left space-y-4">
                  <ul className="space-y-3.5">
                    {whyBusiness.features.map((item, index) => (
                      <li key={item.id || index} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#4b5563]">
                        <span className="text-[#e31e24] text-lg font-bold shrink-0 mt-0.5">✔</span>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {whyBusiness.image && (
                <div className="relative rounded-3xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.05)] border border-slate-100">
                  <img
                    src={resolveImage(whyBusiness.image)}
                    alt="Why Choose Us"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials section */}
      <div>
        <TestimonialSection />
      </div>

      {/* Brand Logos and Tools */}
      <div>
        <Brands />
      </div>

      <div>
        <Tools />
      </div>

      {/* Blogs Showcase */}
      <div>
        <Blogs />
      </div>

      {/* Accordion FAQ Section */}
      {displayFaq.length > 0 && (
        <section className="w-full py-24 px-5 bg-[#f4f4f5] border-t border-b border-[#e5e7eb]">
          <div className="max-w-[850px] mx-auto">
            <div className="text-center mb-12">
              <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px]"></div>
              <h2 className="text-[36px] font-heading font-extrabold text-[#1c1c1e] uppercase">
                {c?.faqHeading || "FAQ"}
              </h2>
            </div>
            <div className="space-y-4">
              {displayFaq.map((faq, index) => {
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
                      <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                        isOpen ? "bg-[#e31e24] text-white" : "bg-[#e31e24]/8 text-[#e31e24]"
                      }`}>
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
      )}

      {/* Contacts Form footer */}
      <div>
        <Contacts />
      </div>
    </div>
  );
};

export default AiSeo;
