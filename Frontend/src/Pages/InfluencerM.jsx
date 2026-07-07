import React, { useEffect, useState ,useRef} from "react";


import Banner from "../Components/Cards/Seohero";

import ServiceCard from "../Components/Cards/ServiceCard";
import "../Styles/faq.css";

import impact from "../assets/impact.webp";

import seoRimg from "../assets/real-seo-result.webp";
import heroImg from "../assets/a.png";
import graphImg from "../assets/graph-l.webp";
import Industry from "../Components/Sections/Industry";
import Casestudy from "../Components/Sections/Casestudy";

import seoIcon from "../assets/seo-o.webp";
import socialIcon from "../assets/social-o.webp";
import ppcIcon from "../assets/finger-up-o.webp";
import webIcon from "../assets/ad-o.webp";
import contentIcon from "../assets/pen-tab-o.webp";
import ormIcon from "../assets/head-s-0.webp";
import listenIcon from "../assets/head-pc-o.webp";
import croIcon from "../assets/dolar-o.webp";
import AeoIcon from "../assets/aeo-o.webp";
import seocase from "../assets/seo-case-study-rezaries.webp";
import bgIcon from "../assets/bg-iconnew.webp";
import TestimonialSection from "../Components/Sections/Testimonials";
import Brands from "../Components/Sections/Brands";
import Tools from "../Components/Sections/Tools";
import Blogs from "../Components/Cards/BlogCard";
import Faq from "../Components/Sections/FAQ";
import Contacts from "../Components/Sections/Contact";
import { Plus, Minus } from "lucide-react";
import Icon1 from "../assets/h1.png";
import Icon2 from "../assets/h2.png";
import Icon3 from "../assets/h3.png";
import Icon4 from "../assets/h4.png";
 import i1 from "../assets/i1.png";
 import i2 from "../assets/i2.png";
 import i3 from "../assets/i3.png";
 
import seocase1 from "../assets/case1.png";
import seocase2 from "../assets/case2.png";
import seocase3 from "../assets/case3.png";

import eimage from "../assets/Dimage/0.png";
 import { usePageContent, resolveImage } from "../hooks/usePageContent";


const InfluencerM  = () => {
  const { content: c } = usePageContent("InfluencerM");
  const banner = c?.banner;
  const about = c?.about;
  const visibility = c?.visibility;
  const performance = c?.performance;
  const seoAgency = c?.seoAgency;
  const discover = c?.discover;
  const whyChoose = c?.whyChoose;
  const impactData = c?.impact?.items?.length ? c.impact : null;
  const whyBusiness = c?.whyBusiness;

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const sliderRef = useRef(null);
  
  const scrollLeft = () => {
    const card = sliderRef.current.querySelector(".workindustry-card");
    if (card) {
      const cardWidth = card.offsetWidth + 40;
      sliderRef.current.scrollBy({
        left: -(cardWidth * 3),
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    const card = sliderRef.current.querySelector(".workindustry-card");
    if (card) {
      const cardWidth = card.offsetWidth + 40; // 40 = gap
      sliderRef.current.scrollBy({
        left: cardWidth * 3,
        behavior: "smooth",
      });
    }
  };

  const displayServices = Array.isArray(c?.services)
    ? c.services.map((s) => ({ ...s, icon: resolveImage(s.icon) }))
    : [];

  const displayFaq = Array.isArray(c?.faqSection?.items)
    ? c.faqSection.items
    : [];


  return (
    <div className="bg-white">
      {banner && (
        <Banner
          title={banner.title}
          description={banner.description}
          primaryBtnText={banner.primaryBtn?.text}
          primaryBtnLink={banner.primaryBtn?.link}
          secondaryBtnText={banner.secondaryBtn?.text}
          secondaryBtnLink={banner.secondaryBtn?.link}
          backgroundImage={banner.backgroundImage ? resolveImage(banner.backgroundImage) : eimage}
        />
      )}

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
                  alt="Graph" 
                  className="w-full h-full object-cover" 
                />
              </div>
            )}
          </div>
        </section>
      )}

      {performance && (performance.label1 || performance.label2 || performance.label3 || performance.label4 || performance.image) && (
        <section className="w-full p-0 m-0 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-0 w-full">
            <div className="bg-gradient-to-br from-[#8b0000] to-[#1c1c1e] min-h-[350px] flex flex-col justify-center px-12 py-[80px] lg:pl-[120px]">
              {performance.label1 && (
                <h2 className="m-0 font-heading font-extrabold text-[60px] leading-[75px] max-[992px]:text-[48px] max-[992px]:leading-[58px] max-[769px]:text-[36px] max-[769px]:leading-[46px] text-white uppercase tracking-tight">
                  {performance.label1}
                </h2>
              )}
              {performance.label2 && (
                <h2 className="m-0 font-heading font-extrabold text-[60px] leading-[75px] max-[992px]:text-[48px] max-[992px]:leading-[58px] max-[769px]:text-[36px] max-[769px]:leading-[46px] text-white uppercase tracking-tight">
                  {performance.label2}
                </h2>
              )}
              {performance.label3 && (
                <h2 className="m-0 font-heading font-extrabold text-[60px] leading-[75px] max-[992px]:text-[48px] max-[992px]:leading-[58px] max-[769px]:text-[36px] max-[769px]:leading-[46px] text-white uppercase tracking-tight">
                  {performance.label3}
                </h2>
              )}
              {performance.label4 && (
                <h2 className="m-0 font-heading font-extrabold text-[60px] leading-[75px] max-[992px]:text-[48px] max-[992px]:leading-[58px] max-[769px]:text-[36px] max-[769px]:leading-[46px] text-white uppercase tracking-tight">
                  {performance.label4}
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

      {seoAgency && (
        <section className="w-full py-24 px-5 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <div className="w-[55px] h-1 bg-[#e31e24] mx-auto mb-[18px] rounded-[10px]"></div>

            {seoAgency.heading && (
              <h2 className="text-center text-[38px] max-[769px]:text-[28px] font-heading font-extrabold text-[#1c1c1e] mb-8 uppercase leading-tight">
                {seoAgency.heading}
              </h2>
            )}

            {seoAgency.intro && (
              <p className="text-center text-[17px] leading-[1.8] text-[#4b5563] max-w-[1000px] mx-auto mb-16">
                {seoAgency.intro}
              </p>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-12">
              <div className="space-y-8">
                {seoAgency.problemTitle && (
                  <div>
                    <h3 className="text-[26px] max-[769px]:text-[20px] text-[#e31e24] font-heading font-extrabold mb-3">
                      {seoAgency.problemTitle}
                    </h3>
                    {seoAgency.problemBody && (
                      <p className="text-[16px] leading-[1.8] text-[#4b5563]">
                        {seoAgency.problemBody}
                      </p>
                    )}
                  </div>
                )}

                {seoAgency.solutionTitle && (
                  <div>
                    <h3 className="text-[26px] max-[769px]:text-[20px] text-emerald-600 font-heading font-extrabold mb-3">
                      {seoAgency.solutionTitle}
                    </h3>
                    {seoAgency.solutionBody && (
                      <p className="text-[16px] leading-[1.8] text-[#4b5563]">
                        {seoAgency.solutionBody}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {seoAgency.rightBody && (
                <div className="space-y-6 text-[16px] leading-[1.8] text-[#4b5563] lg:pt-2">
                  <p>{seoAgency.rightBody}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

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
                    className="w-5 h-5 object-contain"
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

      {impactData?.items?.length > 0 && (
        <section className="w-full py-24 px-5 bg-white border-b border-[#e5e7eb]">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {impactData.image && (
              <div className="relative flex justify-center items-center">
                <div className="absolute w-[350px] h-[350px] rounded-full bg-[#fee2e2] -z-10 animate-pulse"></div>
                <img
                  src={resolveImage(impactData.image)}
                  alt="Impact"
                  className="max-w-full h-auto rounded-3xl shadow-[0_15px_30px_rgba(0,0,0,0.05)] border border-slate-100 object-cover"
                />
              </div>
            )}

            <div className="space-y-8">
              <div className="relative pl-8 border-l-2 border-[#e5e7eb] space-y-8">
                {impactData.items.map((item, index) => (
                  <div className="relative group" key={item.id || index}>
                    <div className="absolute -left-[37px] top-1.5 w-[10px] h-[10px] rounded-full bg-slate-300 group-hover:bg-[#e31e24] group-hover:scale-125 transition-all duration-300"></div>
                    {item.title && <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#e31e24] transition-colors duration-300 mb-1">{item.title}</h3>}
                    {item.desc && <p className="text-sm leading-relaxed text-slate-500">{item.desc}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Industry />
      <Casestudy />

      {whyBusiness && (whyBusiness.heading || whyBusiness.description || whyBusiness.features?.length > 0 || whyBusiness.image) && (
        <section className="w-full py-24 px-5 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px]"></div>

            {whyBusiness.heading && (
              <h2 style={{ fontSize: "36px" }}  className="text-center text-[36px] max-[769px]:text-[28px] font-heading font-extrabold text-[#1c1c1e] mb-6 uppercase">
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
                    alt="Graph"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <div>
        <TestimonialSection />
      </div>

      <div>
        <Brands />
      </div>

      <div>
        <Tools />
      </div>

      <div>
        <Blogs />
      </div>

      {displayFaq.length > 0 && (
        <section className="w-full py-24 px-5 bg-[#f4f4f5] border-t border-b border-[#e5e7eb]">
          <div className="max-w-[850px] mx-auto">
            <div className="text-center mb-12">
              <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px]"></div>
              <h2 className="text-[36px] font-heading font-extrabold text-[#1c1c1e] uppercase">
                {c?.faqSection?.heading || "DISPLAY ADS MARKETING FAQS"}
              </h2>
            </div>

            <div className="space-y-4">
              {displayFaq.map((faq, index) => {
                const isOpen = activeIndex === index;
                return (
                  <div
                    key={index}
                    className={"bg-white border rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.01)] transition-all duration-300 " + (
                      isOpen ? "border-[#e31e24]/30 shadow-[0_12px_32px_rgba(227,30,36,0.08)]" : "border-slate-200 hover:border-[#e31e24]/20"
                    )}
                  >
                    <button
                      className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 cursor-pointer bg-transparent border-0 select-none"
                      onClick={() => toggleFAQ(index)}
                    >
                      <span className="font-semibold text-slate-900 text-[15px]">{faq.question}</span>
                      <span className={"shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 " + (
                        isOpen ? "bg-[#e31e24] text-white" : "bg-[#e31e24]/8 text-[#e31e24]"
                      )}>
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

      <div>
        <Contacts />
      </div>
    </div>
  );
}

export default InfluencerM;
