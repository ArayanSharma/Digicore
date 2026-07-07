import React, { useState } from "react";
import Banner from "../Components/Cards/Seohero";
import ServiceCard from "../Components/Cards/ServiceCard";
import Industry from "../Components/Sections/Industry";
import Casestudy from "../Components/Sections/Casestudy";
import bgIcon from "../assets/bg-iconnew.webp";
import TestimonialSection from "../Components/Sections/Testimonials";
import Brands from "../Components/Sections/Brands";
import Tools from "../Components/Sections/Tools";
import Blogs from "../Components/Cards/BlogCard";
import Contacts from "../Components/Sections/Contact";
import { Plus, Minus } from "lucide-react";
import eimage from "../assets/BannerImg/metaAds.png";
import { usePageContent, resolveImage } from "../hooks/usePageContent";

const MetaF = () => {
  const { content: c } = usePageContent("meta-facebook-ads");
  const banner = c?.banner;
  const aboutSection = c?.aboutSection;
  const visibilitySection = c?.visibilitySection;
  const performanceSection = c?.performanceSection;
  const seoAgencySection = c?.seoAgencySection;
  const servicesSection = c?.servicesSection;
  const whyChooseSection = c?.whyChooseSection;
  const timelineSection = c?.timelineSection;
  const whyChooseDigicoreSection = c?.whyChooseDigicoreSection;
  const faqSection = c?.faqSection;

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const displayServices = Array.isArray(servicesSection?.services)
    ? servicesSection.services.map((s) => ({ ...s, icon: resolveImage(s.iconUrl) }))
    : [];

  const displayFaq = Array.isArray(faqSection?.faqItems)
    ? faqSection.faqItems
    : [];

  return (
    <>
      {banner && (
        <Banner
          title={banner.title}
          description={banner.description}
          primaryBtnText={banner.primaryBtn?.text}
          primaryBtnLink={banner.primaryBtn?.link || "#"}
          secondaryBtnText={banner.secondaryBtn?.text}
          secondaryBtnLink={banner.secondaryBtn?.link || "#"}
          backgroundImage={banner.backgroundImageUrl ? resolveImage(banner.backgroundImageUrl) : eimage}
        />
      )}

      {aboutSection && (aboutSection.title || aboutSection.description) && (
        <section className="w-full py-[100px] px-5 max-[769px]:py-[60px] bg-white border-b border-[#e5e7eb]">
          <div className="max-w-[1300px] mx-auto text-center pt-[60px] px-5 pb-20 max-[769px]:p-[50px_15px]">
            {aboutSection.title && (
              <h1 className="font-heading font-extrabold text-[44px] leading-[1.2] max-[993px]:text-[36px] max-[769px]:text-[28px] text-[#2b2b2e] mb-6">
                {aboutSection.title}
              </h1>
            )}

            <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px] max-[769px]:w-[50px] max-[769px]:mb-[20px]"></div>

            {aboutSection.description && (
              <p className="font-normal text-[17px] leading-[1.8] text-[#4b5563]">
                {aboutSection.description}
              </p>
            )}
          </div>
        </section>
      )}

      {visibilitySection && (visibilitySection.title || visibilitySection.description || visibilitySection.imageUrl) && (
        <section className="w-full py-[100px] bg-white max-[993px]:py-[60px] max-[993px]:px-5 border-b border-[#e5e7eb]">
          <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-[60px] lg:gap-[40px] px-5">
            <div className="flex-1">
              {visibilitySection.title && (
                <h2 className="w-full font-heading font-extrabold text-[36px] leading-[1.2] max-[993px]:text-[30px] max-[769px]:text-[26px] text-[#2b2b2e] m-0 pb-[20px]">
                  {visibilitySection.title}
                </h2>
              )}

              {visibilitySection.description && (
                <p className="font-normal text-[16px] leading-[1.8] text-[#4b5563] m-0">
                  {visibilitySection.description}
                </p>
              )}

              <div className="w-[100px] h-[4px] bg-[#e31e24] mt-[40px]"></div>
            </div>

            {visibilitySection.imageUrl && (
              <div className="flex-1 flex justify-center lg:justify-end">
                <img src={resolveImage(visibilitySection.imageUrl)} alt="Graph" className="w-full max-w-[550px] h-auto object-cover rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.06)] border border-[#e5e7eb]" />
              </div>
            )}
          </div>
        </section>
      )}

      {performanceSection && (performanceSection.items?.length > 0 || performanceSection.imageUrl) && (
        <section className="w-full p-0 m-0 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-0 w-full">
            <div className="bg-gradient-to-br from-[#8b0000] to-[#1c1c1e] min-h-[350px] flex flex-col justify-center px-12 py-[80px] lg:pl-[120px]">
              {performanceSection.items.map((word, i) => word && (
                <h2 key={i} className="m-0 font-heading font-extrabold text-[60px] leading-[75px] max-[992px]:text-[48px] max-[992px]:leading-[58px] max-[769px]:text-[36px] max-[769px]:leading-[46px] text-white uppercase tracking-tight">
                  {word}
                </h2>
              ))}
            </div>

            {performanceSection.imageUrl && (
              <div className="min-h-[390px] max-[992px]:min-h-[350px] max-[769px]:min-h-[250px] overflow-hidden">
                <img src={resolveImage(performanceSection.imageUrl)} alt="SEO Performance" className="w-full h-full block object-cover" />
              </div>
            )}
          </div>
        </section>
      )}

      {seoAgencySection && (seoAgencySection.title || seoAgencySection.description) && (
        <section className="w-full py-[100px] px-5 bg-white border-b border-[#e5e7eb]">
          <div className="max-w-[1200px] mx-auto text-center px-5">
            <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px] max-[769px]:w-[50px] max-[769px]:mb-[20px]"></div>

            {seoAgencySection.title && (
              <h2 className="text-[42px] max-[993px]:text-[34px] max-[769px]:text-[26px] text-[#1c1c1e] font-heading font-extrabold mb-[30px] leading-[1.2]">
                {seoAgencySection.title}
              </h2>
            )}

            {seoAgencySection.description && (
              <p className="text-[17px] leading-[1.8] text-[#4b5563] text-center max-w-[1000px] mx-auto m-0">
                {seoAgencySection.description}
              </p>
            )}
          </div>
        </section>
      )}

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

      {whyChooseSection && (
        <section
          className="relative py-[100px] px-5 bg-[#1c1c1e] text-center min-h-[300px] flex items-center justify-center overflow-hidden"
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
              <h1 className="text-white text-[42px] max-[769px]:text-[30px] font-heading font-extrabold leading-[1.2] mb-[40px] uppercase">
                {whyChooseSection.title}
              </h1>
            )}

            {whyChooseSection.buttons?.length > 0 && (
              <div className="flex justify-center items-center gap-5 max-[769px]:flex-col">
                {whyChooseSection.buttons.map((btn, index) => {
                  const isFirst = index === 0;
                  return (
                    <a
                      key={btn.id || index}
                      href={btn.link || "#"}
                      className={isFirst 
                        ? "flex items-center justify-center gap-[10px] bg-white hover:bg-[#f0fdf4] hover:scale-[1.03] transition-all duration-300 text-[#22c55e] h-12 px-7 rounded-lg text-base font-bold no-underline shadow-[0_4px_15px_rgba(34,197,94,0.16)] border border-[#22c55e]/25"
                        : "flex items-center justify-center gap-[10px] bg-transparent hover:bg-white/10 hover:scale-[1.03] transition-all duration-300 text-white h-12 px-7 rounded-lg text-base font-bold no-underline border border-white"
                      }
                    >
                      {btn.iconUrl && (
                        <img
                          src={resolveImage(btn.iconUrl)}
                          alt="btn-icon"
                          className="w-[20px] h-[20px] rounded-full bg-[#22c55e] p-[3px] object-contain"
                        />
                      )}
                      {!btn.iconUrl && isFirst && (
                        <img
                          src="https://tataresearch.besthr.in/digital-marketar/assets/icon/whatsapp.png"
                          alt="whatsapp"
                          className="w-[20px] h-[20px] rounded-full bg-[#22c55e] p-[3px] object-contain"
                        />
                      )}
                      {btn.text}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {timelineSection?.items?.length > 0 && (
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

            <div className="w-full lg:max-w-[50%] pt-10 lg:pt-0">
              <div className="relative border-l border-[#e5e7eb] pl-6 ml-3">
                {timelineSection.items.map((item, index) => (
                  <div key={item.id || index} className="relative mb-[40px] last:mb-0">
                    <div className="absolute left-[-31px] top-1 w-[14px] h-[14px] rounded-full border-2 border-[#e31e24] bg-white shadow-[0_0_8px_rgba(227,30,36,0.4)] z-[2]"></div>

                    <div>
                      {item.title && <h3 className="mb-[8px] text-[22px] max-[769px]:text-[19px] font-heading font-bold text-[#2b2b2e] leading-tight">{item.title}</h3>}
                      {(item.description || item.desc) && <p className="text-[15px] leading-[1.6] text-[#4b5563]">{item.description || item.desc}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Industry />
      <Casestudy />

      {whyChooseDigicoreSection && (whyChooseDigicoreSection.title || whyChooseDigicoreSection.description || whyChooseDigicoreSection.points?.length > 0 || whyChooseDigicoreSection.imageUrl) && (
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="mx-auto mb-4 h-1.5 w-20 rounded-full bg-[#e31e24]"></div>
              {whyChooseDigicoreSection.title && (
                <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 leading-tight">
                  {whyChooseDigicoreSection.title}
                </h2>
              )}
              {whyChooseDigicoreSection.description && (
                <p className="mt-5 text-base sm:text-lg text-slate-600 leading-8">
                  {whyChooseDigicoreSection.description}
                </p>
              )}
            </div>

            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
              {whyChooseDigicoreSection.points?.length > 0 && (
                <div>
                  <ul className="space-y-4 text-base sm:text-lg text-slate-700">
                    {whyChooseDigicoreSection.points.map((point, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="mt-1 text-[#e31e24]">✔</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {whyChooseDigicoreSection.imageUrl && (
                <div className="rounded-[32px] bg-slate-50 p-5 shadow-sm">
                  <img
                    className="w-full rounded-[28px] object-cover"
                    src={resolveImage(whyChooseDigicoreSection.imageUrl)}
                    alt="Graph"
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
        <section className="py-[100px] px-5 bg-white border-b border-[#e5e7eb]">
          <div className="text-center mb-[50px]">
            <h2 className="text-[42px] font-heading font-extrabold text-[#1c1c1e] mb-[10px]">{faqSection?.heading || "FAQ"}</h2>
            <div className="w-12 h-1 bg-[#e31e24] mx-auto rounded-[50px]"></div>
          </div>

          <div className="max-w-[950px] mx-auto flex flex-col gap-4">
            {displayFaq.map((faq, index) => (
              <div
                key={index}
                className="border border-[#e5e7eb] rounded-xl bg-white overflow-hidden shadow-sm hover:border-[#e31e24]/20 transition-all duration-300"
              >
                <button
                  className="w-full bg-transparent border-0 flex justify-between items-center py-5 px-6 cursor-pointer text-left transition-colors duration-300"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-[16px] font-heading font-bold text-[#2b2b2e] leading-[1.5] max-w-[90%] group-hover:text-[#e31e24]">{faq.question}</span>

                  {activeIndex === index ? (
                    <Minus className="w-[20px] h-[20px] shrink-0 text-[#e31e24]" />
                  ) : (
                    <Plus className="w-[20px] h-[20px] shrink-0 text-[#e31e24]" />
                  )}
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? "max-h-[300px]" : "max-h-0"}`}
                >
                  <p className="text-[15px] text-[#4b5563] leading-[1.7] pt-0 px-6 pb-6 border-t border-[#e5e7eb]/40">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div>
        <Contacts />
      </div>
    </>
  );
};

export default MetaF;
