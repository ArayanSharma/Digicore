import React, { useState } from "react";

import Banner from "../Components/Cards/Seohero";
import ServiceCard from "../Components/Cards/ServiceCard";

import impact from "../assets/impact.webp";
import seoRimg from "../assets/real-seo-result.webp";
import graphImg from "../assets/graph-l.webp";
import Industry from "../Components/Sections/Industry";
import Casestudy from "../Components/Sections/Casestudy";

import seoIcon from "../assets/seo-o.webp";
import socialIcon from "../assets/social-o.webp";
import ppcIcon from "../assets/finger-up-o.webp";
import webIcon from "../assets/ad-o.webp";
import contentIcon from "../assets/pen-tab-o.webp";
import ormIcon from "../assets/head-s-0.webp";
import bgIcon from "../assets/bg-iconnew.webp";
import TestimonialSection from "../Components/Sections/Testimonials";
import Brands from "../Components/Sections/Brands";
import Tools from "../Components/Sections/Tools";
import Blogs from "../Components/Cards/BlogCard";
import Contacts from "../Components/Sections/Contact";
import { Plus, Minus } from "lucide-react";
import Icon1 from "../assets/h1.png";
import Icon2 from "../assets/h2.png";
import Icon3 from "../assets/h3.png";
import Icon4 from "../assets/h4.png";

import eimage from "../assets/BannerImg/PPC.png";
import { usePageContent, resolveImage } from "../hooks/usePageContent";

const PPC = () => {
  const { content: c } = usePageContent("PPC");
  const banner = c?.banner;
  const aboutSection = c?.aboutSection;
  const visibilitySection = c?.visibilitySection;
  const performanceSection = c?.performanceSection;
  const whyPPCSection = c?.whyPPCSection;
  const whyChooseSection = c?.whyChooseSection;
  const timelineSection = c?.timelineSection?.items?.length ? c.timelineSection : null;
  const ppcManagementSection = c?.ppcManagementSection;
  const helpCardsSection = c?.helpCardsSection;
  const whyChooseDigicoreSection = c?.whyChooseDigicoreSection;
  const servicesSection = c?.servicesSection;

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const displayServices = Array.isArray(c?.services)
    ? c.services.map((s) => ({ ...s, icon: resolveImage(s.iconUrl) }))
    : [];

  const displayLeftItems = Array.isArray(ppcManagementSection?.leftItems)
    ? ppcManagementSection.leftItems
    : [];

  const displayRightItems = Array.isArray(ppcManagementSection?.rightItems)
    ? ppcManagementSection.rightItems
    : [];

  const displayHelpCards = Array.isArray(helpCardsSection?.helpCards)
    ? helpCardsSection.helpCards.map((hc) => ({ ...hc, icon: resolveImage(hc.iconUrl) }))
    : [];

  const displayFaq = Array.isArray(c?.faqSection?.faqItems)
    ? c.faqSection.faqItems
    : [];

  const performanceLabels = Array.isArray(performanceSection?.items)
    ? performanceSection.items
    : [];

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
          backgroundImage={banner.backgroundImageUrl ? resolveImage(banner.backgroundImageUrl) : eimage}
        />
      )}

      {/* About Section */}
      {aboutSection && (aboutSection.title || aboutSection.description) && (
        <section className="w-full py-24 px-5 bg-white">
          <div className="max-w-[1200px] mx-auto text-center">
            <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px]"></div>

            {aboutSection.title && (
              <h1 className="text-[40px] max-[769px]:text-[30px] font-heading font-extrabold text-[#1c1c1e] mb-6 leading-tight">
                {aboutSection.title}
              </h1>
            )}

            {aboutSection.description && (
              <p className="text-[17px] leading-[1.8] text-[#4b5563] max-w-[900px] mx-auto">
                {aboutSection.description}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Visibility Section */}
      {visibilitySection && (visibilitySection.title || visibilitySection.description || visibilitySection.imageUrl) && (
        <section className="w-full py-24 px-5 bg-[#f4f4f5] border-t border-[#e5e7eb]">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {visibilitySection.title && (
                <h2 className="text-[36px] max-[769px]:text-[28px] font-heading font-extrabold text-[#1c1c1e] mb-6 leading-tight">
                  {visibilitySection.title}
                </h2>
              )}

              {visibilitySection.description && (
                <div className="text-[16px] leading-[1.8] text-[#4b5563] space-y-6">
                  <p>{visibilitySection.description}</p>
                </div>
              )}

              <div className="w-[120px] h-[4px] bg-[#e31e24] mt-10"></div>
            </div>

            {visibilitySection.imageUrl && (
              <div className="relative rounded-3xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.05)] border border-slate-200">
                <img
                  src={resolveImage(visibilitySection.imageUrl)}
                  alt="Graph"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Performance Section */}
      {performanceSection && (performanceLabels.length > 0 || performanceSection.imageUrl) && (
        <section className="w-full p-0 m-0 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-0 w-full">
            <div className="bg-gradient-to-br from-[#8b0000] to-[#1c1c1e] min-h-[350px] flex flex-col justify-center px-12 py-[80px] lg:pl-[120px]">
              {performanceLabels.map((label, i) => (
                <h2
                  key={i}
                  className="m-0 font-heading font-extrabold text-[60px] leading-[75px] max-[992px]:text-[48px] max-[992px]:leading-[58px] max-[769px]:text-[36px] max-[769px]:leading-[46px] text-white uppercase tracking-tight"
                >
                  {label}
                </h2>
              ))}
            </div>

            {performanceSection.imageUrl && (
              <div className="min-h-[390px] max-[992px]:min-h-[350px] max-[769px]:min-h-[250px] overflow-hidden">
                <img
                  src={resolveImage(performanceSection.imageUrl)}
                  alt="Performance Section"
                  className="w-full h-full block object-cover"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Why PPC / Problem-Solution Section */}
      {whyPPCSection && (
        <section className="w-full py-24 px-5 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <div className="w-[55px] h-1 bg-[#e31e24] mx-auto mb-[18px] rounded-[10px]"></div>

            {whyPPCSection.heading && (
              <h2  style={{ fontSize: "36px" }} className="text-center text-[38px] max-[769px]:text-[28px] font-heading font-extrabold text-[#1c1c1e] mb-8 uppercase leading-tight">
                {whyPPCSection.heading}
              </h2>
            )}

            {whyPPCSection.headingDescription && (
              <p className="text-center text-[17px] leading-[1.8] text-[#4b5563] max-w-[1000px] mx-auto mb-16">
                {whyPPCSection.headingDescription}
              </p>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-12">
              <div className="space-y-8">
                {whyPPCSection.problemTitle && (
                  <div>
                    <h3 className="text-[26px] max-[769px]:text-[20px] text-[#e31e24] font-heading font-extrabold mb-3">
                      {whyPPCSection.problemTitle}
                    </h3>
                    {whyPPCSection.problemDescription && (
                      <p className="text-[16px] leading-[1.8] text-[#4b5563]">
                        {whyPPCSection.problemDescription}
                      </p>
                    )}
                  </div>
                )}

                {whyPPCSection.solutionTitle && (
                  <div>
                    <h3 className="text-[26px] max-[769px]:text-[20px] text-emerald-600 font-heading font-extrabold mb-3">
                      {whyPPCSection.solutionTitle}
                    </h3>
                    {whyPPCSection.solutionDescription && (
                      <p className="text-[16px] leading-[1.8] text-[#4b5563]">
                        {whyPPCSection.solutionDescription}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {whyPPCSection.additionalDescription && (
                <div className="space-y-6 text-[16px] leading-[1.8] text-[#4b5563] lg:pt-2">
                  <p>{whyPPCSection.additionalDescription}</p>
                </div>
              )}
            </div>
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

      {/* CTA Why Choose Section */}
      {whyChooseSection && (
        <section
          className="relative py-[100px] px-5 bg-[#1c1c1e] text-center min-h-[300px] flex items-center justify-center"
          style={{
            backgroundImage: `linear-gradient(rgba(28, 28, 30, 0.9), rgba(28, 28, 30, 0.95)), url(${whyChooseSection.backgroundImageUrl ? resolveImage(whyChooseSection.backgroundImageUrl) : bgIcon})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#8b0000]/10 to-transparent pointer-events-none"></div>
          <div className="relative z-10 text-center max-w-[1000px] mx-auto">
            {whyChooseSection.title && (
              <h1 className="text-white text-[42px] max-[769px]:text-[30px] font-heading font-extrabold leading-[1.2] mb-[40px]">
                {whyChooseSection.title}
              </h1>
            )}

            {whyChooseSection.buttons && (
              <div className="flex justify-center items-center gap-5 max-[769px]:flex-col">
                {whyChooseSection.buttons.map((btn, index) => (
                  <a
                    key={index}
                    href={btn.link || "#"}
                    className={index === 0
                      ? "flex items-center justify-center gap-[10px] bg-white hover:bg-red-50/30 hover:scale-[1.03] transition-all duration-300 text-[#e31e24] h-12 px-7 rounded-lg text-base font-bold no-underline shadow-[0_4px_15px_rgba(227,30,36,0.12)] border border-[#e31e24]/25"
                      : "flex items-center justify-center gap-[10px] bg-transparent hover:bg-white/10 hover:scale-[1.03] transition-all duration-300 text-white h-12 px-7 rounded-lg text-base font-bold no-underline border border-white"
                    }
                  >
                    {btn.iconUrl ? (
                      <img
                        src={resolveImage(btn.iconUrl)}
                        alt="icon"
                        className="w-[20px] h-[20px]"
                      />
                    ) : index === 0 ? (
                      <img
                        src="https://tataresearch.besthr.in/digital-marketar/assets/icon/whatsapp.png"
                        alt="whatsapp"
                        className="w-[20px] h-[20px]"
                      />
                    ) : null}
                    {btn.text}
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Impact Timeline Section */}
      {timelineSection && (timelineSection.items?.length > 0 || timelineSection.imageUrl) && (
        <section className="py-[100px] px-[7%] bg-white border-b border-[#e5e7eb]">
          <div className="max-w-[1200px] mx-auto flex justify-between items-center gap-[60px] lg:flex-row flex-col px-5">
            {timelineSection.imageUrl && (
              <div className="w-full max-w-[500px] lg:max-w-[45%]">
                <img
                  src={resolveImage(timelineSection.imageUrl)}
                  alt="Impact"
                  className="w-full block rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.05)] border border-[#e5e7eb]"
                />
              </div>
            )}

            {timelineSection.items?.length > 0 && (
              <div className="w-full lg:max-w-[50%] pt-10 lg:pt-0">
                <div className="relative border-l border-[#e5e7eb] pl-6 ml-3">
                  {timelineSection.items.map((item, index) => (
                    <div key={item.id || index} className="relative mb-[40px] last:mb-0">
                      <div className="absolute left-[-31px] top-1 w-[14px] h-[14px] rounded-full border-2 border-[#e31e24] bg-white shadow-[0_0_8px_rgba(227,30,36,0.4)] z-[2]"></div>

                      <div>
                        {item.title && <h3 className="mb-[8px] text-[22px] max-[769px]:text-[19px] font-heading font-bold text-[#2b2b2e] leading-tight">{item.title}</h3>}
                        {item.description && <p className="text-[15px] leading-[1.6] text-[#4b5563]">{item.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Industry Section */}
      <Industry />

      {/* Case Study Section */}
      <Casestudy />

      {/* PPC Management Checklist Section */}
      {ppcManagementSection && (ppcManagementSection.title || ppcManagementSection.description || displayLeftItems.length > 0 || displayRightItems.length > 0) && (
        <section className="w-full py-24 px-5 bg-[#f4f4f5] border-b border-[#e5e7eb]">
          <div className="max-w-[1200px] mx-auto text-center">
            <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px]"></div>

            {ppcManagementSection.title && (
              <h2 className="text-[38px] max-[769px]:text-[28px] font-heading font-extrabold text-[#1c1c1e] mb-6 uppercase leading-tight">
                {ppcManagementSection.title}
              </h2>
            )}

            {ppcManagementSection.description && (
              <p className="text-[17px] leading-[1.8] text-[#4b5563] max-w-[1000px] mx-auto mb-16">
                {ppcManagementSection.description}
              </p>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
              {displayLeftItems.length > 0 && (
                <div className="flex flex-col gap-4">
                  {displayLeftItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 text-[15px] leading-[1.6] bg-white p-5 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-[#e5e7eb]/60 transition-all duration-300 hover:translate-x-[8px] hover:border-[#e31e24]/20">
                      <span className="text-[#e31e24] font-bold mr-1 shrink-0">☑</span>
                      <p className="text-[#4b5563] m-0">{item}</p>
                    </div>
                  ))}
                </div>
              )}

              {displayRightItems.length > 0 && (
                <div className="flex flex-col gap-4">
                  {displayRightItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 text-[15px] leading-[1.6] bg-white p-5 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-[#e5e7eb]/60 transition-all duration-300 hover:translate-x-[8px] hover:border-[#e31e24]/20">
                      <span className="text-[#e31e24] font-bold mr-1 shrink-0">☑</span>
                      <p className="text-[#4b5563] m-0">{item}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Dominate Section */}
      {helpCardsSection && (helpCardsSection.heading || displayHelpCards.length > 0) && (
        <section className="w-full py-24 px-5 bg-[#f4f4f5] border-b border-[#e5e7eb] text-center">
          <div className="max-w-[1200px] mx-auto">
            <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px]"></div>

            {helpCardsSection.heading && (
              <h2  style={{ fontSize: "36px" }} className="text-center text-[48px] max-[993px]:text-[38px] max-[769px]:text-[30px] font-heading font-extrabold text-[#1c1c1e] mb-[15px] uppercase">
                {helpCardsSection.heading}
              </h2>
            )}
          </div>

          {displayHelpCards.length > 0 && (
            <div className="flex justify-center gap-10 flex-wrap mt-[30px]">
              {displayHelpCards.map((item, index) => (
                <div
                  className="group w-[260px] h-[260px] max-[769px]:w-[220px] max-[769px]:h-[220px] rounded-full bg-white border border-[#e5e7eb] flex flex-col items-center justify-center text-center p-6 box-border relative overflow-hidden cursor-pointer shadow-sm transition-all duration-300 hover:bg-[#e31e24] hover:border-[#e31e24] hover:shadow-[0_12px_25px_rgba(227,30,36,0.25)] hover:-translate-y-1.5"
                  key={index}
                >
                  {item.icon && (
                    <div className="relative z-[2] w-12 h-12 mb-4 flex items-center justify-center transition-colors duration-300">
                      <img src={item.icon} alt={item.title} className="w-full h-full object-contain filter group-hover:brightness-0 group-hover:invert transition-all duration-300" />
                    </div>
                  )}

                  {item.title && <h3 className="relative z-[2] text-[18px] max-[769px]:text-[15px] font-heading font-bold text-[#2b2b2e] leading-tight m-0 transition-colors duration-300 group-hover:text-white group-hover:mb-[10px]">{item.title}</h3>}

                  {item.desc && <p className="relative z-[2] mt-0 text-[12px] leading-[1.5] text-white opacity-0 max-h-0 overflow-hidden transition-all duration-300 group-hover:opacity-90 group-hover:max-h-[120px]">{item.desc}</p>}
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Why Choose Section with Checklists */}
      {whyChooseDigicoreSection && (whyChooseDigicoreSection.title || whyChooseDigicoreSection.description || whyChooseDigicoreSection.points?.length > 0 || whyChooseDigicoreSection.imageUrl) && (
        <section className="w-full py-24 px-5 bg-[#f4f4f5]">
          <div className="max-w-[1200px] mx-auto">
            <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px]"></div>

            {whyChooseDigicoreSection.title && (
              <h2 style={{ fontSize: "36px" }}  className="text-center text-[48px] max-[993px]:text-[38px] max-[769px]:text-[30px] font-heading font-extrabold text-[#1c1c1e] mb-6 uppercase">
                {whyChooseDigicoreSection.title}
              </h2>
            )}

            {whyChooseDigicoreSection.description && (
              <p className="text-center text-[17px] leading-[1.8] text-[#4b5563] max-w-[950px] mx-auto mb-16">
                {whyChooseDigicoreSection.description}
              </p>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {whyChooseDigicoreSection.points?.length > 0 && (
                <div className="space-y-4">
                  <ul className="space-y-3.5">
                    {whyChooseDigicoreSection.points.map((point, index) => (
                      point && (
                        <li key={index} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#4b5563] bg-white p-5 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-[#e5e7eb]/60 transition-all duration-300 hover:translate-x-[8px] hover:border-[#e31e24]/20">
                          <span className="text-[#e31e24] text-lg font-bold shrink-0 mt-0.5">✔</span>
                          <span>{point}</span>
                        </li>
                      )
                    ))}
                  </ul>
                </div>
              )}

              {whyChooseDigicoreSection.imageUrl && (
                <div className="relative rounded-3xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.05)] border border-slate-200">
                  <img
                    src={resolveImage(whyChooseDigicoreSection.imageUrl)}
                    alt="Graph"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
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
        <section className="w-full py-24 px-5 bg-white border-t border-b border-[#e5e7eb]">
          <div className="max-w-[850px] mx-auto">
            <div className="text-center mb-12">
              <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px]"></div>
              <h2 className="text-[36px] font-heading font-extrabold text-[#1c1c1e] uppercase">
                {c?.faqSection?.title || "PPC AGENCY DELHI FAQS"}
              </h2>
            </div>

            <div className="space-y-4">
              {displayFaq.map((faq, index) => {
                const isOpen = activeIndex === index;
                return (
                  <div
                    key={faq.id || index}
                    className={`bg-white border rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.01)] transition-all duration-300 ${isOpen ? "border-[#e31e24]/30 shadow-[0_12px_32px_rgba(227,30,36,0.08)]" : "border-slate-200 hover:border-[#e31e24]/20"
                      }`}
                  >
                    <button
                      className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 cursor-pointer bg-transparent border-0 select-none"
                      onClick={() => toggleFAQ(index)}
                    >
                      <span className="font-semibold text-slate-900 text-[15px]">{faq.question}</span>
                      <span
                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? "bg-[#e31e24] text-white" : "bg-[#e31e24]/8 text-[#e31e24]"
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
      )}

      {/* Contacts Form footer */}
      <div>
        <Contacts />
      </div>
    </div>
  );
};

export default PPC;
