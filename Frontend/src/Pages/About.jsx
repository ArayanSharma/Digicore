import React from 'react'
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "../Styles/About.css"
import Banner from "../Components/Cards/Seohero";
import { usePageContent, resolveImage } from "../hooks/usePageContent";

const renderDynamicHeading = (text) => {
  if (!text) return null;
  const words = text.split(" ");
  if (words.length <= 1) return text;
  const lastWord = words.pop();
  return (
    <>
      {words.join(" ")} <span className="text-[#e31e24]">{lastWord}</span>
    </>
  );
};

const About = () => {
  const { content: c } = usePageContent("about");
  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production") console.debug("About page content (hook):", c);
  }, [c]);
  const hero = c?.hero;
  const aboutSection = c?.aboutSection;
  const betterSection = c?.betterSection;
  const rawStats = c?.stats || [];
  const displayStats = rawStats.map((s) => ({ ...s, icon: resolveImage(s.icon) }));

  if (process.env.NODE_ENV !== "production") console.debug("displayStats:", displayStats);
  const contactBanner = c?.contactBanner;
  const displayIndustries = c?.industries
    ? c.industries.map((i) => ({ ...i, icon: resolveImage(i.icon) }))
    : [];
  const industriesTitle = c?.industriesTitle || "";
  const missionSection = c?.missionSection;
  const visionSection = c?.visionSection;

  return (
    <div className="bg-white">
      <Banner
        subtitle={hero?.subtitle}
        title={hero?.title}
        description={hero?.description}
        primaryBtnText={hero?.primaryBtn?.text}
        secondaryBtnText={hero?.secondaryBtn?.text}
        backgroundImage={hero?.image ? resolveImage(hero.image) : undefined}
      />

      {/* Overview Section */}
      <section className="w-full py-24 px-5 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px]"></div>

          <h2
            className="text-center font-heading font-extrabold text-[#1c1c1e] mb-6"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: "1.2" }}
          >
            {aboutSection?.heading}
          </h2>

          <p className="text-center text-[17px] leading-[1.8] text-[#4b5563] max-w-[850px] mx-auto mb-16">
            {aboutSection?.body}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-[16px] leading-[1.8] text-[#4b5563]">
              <p>
                {aboutSection?.paragraph1}
              </p>
              <p>
                {aboutSection?.paragraph2}
              </p>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.05)] border border-slate-100">
              <img
                src={aboutSection?.image ? resolveImage(aboutSection.image) : undefined}
                alt="Company Overview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Better Section */}
      <section className="w-full py-24 px-5 bg-[#f4f4f5] border-t border-b border-[#e5e7eb]">
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="text-center font-heading font-extrabold text-[#1c1c1e] mb-5"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: "1.2" }}
          >
            <span className="text-[#e31e24]">{betterSection?.heading}</span>
          </h2>

          <p className="text-center text-[17px] leading-[1.8] text-[#4b5563] max-w-[800px] mx-auto mb-16">
            {betterSection?.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayStats.map((item, index) => (
              <div
                className="group bg-white rounded-[24px] p-8 border border-[#e5e7eb] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(227,30,36,0.1)] hover:border-[#e31e24]/20 transition-all duration-300 flex flex-col items-center text-center"
                key={item.id || index}
              >
                <div className="w-16 h-16 rounded-full bg-[#fee2e2] flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <h3 className="text-[18px] font-bold text-[#2b2b2e] mb-2">{item.title}</h3>
                <div className="text-[36px] font-heading font-extrabold text-[#e31e24] mb-2">{item.count}</div>
                <p className="text-[14px] leading-relaxed text-[#6b7280]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Banner */}
      <section className="w-full bg-[#1c1c1e] py-12 px-5 border-t border-b border-[#2b2b2e]">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <a
            href={contactBanner?.phone ? `tel:${contactBanner.phone}` : "#"}
            className="flex items-center gap-3 text-white text-[18px] hover:text-[#e31e24] transition-colors duration-200 font-semibold"
          >
            <FaPhoneAlt className="text-[#e31e24] text-xl" />
            <span>{contactBanner?.phone}</span>
          </a>

          <div className="flex items-center justify-center bg-white rounded-lg px-6 py-3">
            {contactBanner?.logo && (
              <img
                src={resolveImage(contactBanner.logo)}
                alt="logo"
                className="h-24 object-contain w-auto"
              />
            )}
          </div>

          <a
            href={contactBanner?.email ? `mailto:${contactBanner.email}` : "#"}
            className="flex items-center gap-3 text-white text-[18px] hover:text-[#e31e24] transition-colors duration-200 font-semibold"
          >
            <FaEnvelope className="text-[#e31e24] text-xl" />
            <span>{contactBanner?.email}</span>
          </a>
        </div>
      </section>

      {/* Industries Section */}
      <section className="w-full py-24 px-5 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px]"></div>

          <h2
            className="text-center font-heading font-extrabold text-[#1c1c1e] mb-16"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: "1.2" }}
          >
            {industriesTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayIndustries.map((item, index) => (
              <div
                className="bg-[#f8f9fa] rounded-2xl p-6 border border-slate-100 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.05)] hover:border-[#e31e24]/10 transition-all duration-300"
                key={item.id || index}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#fee2e2] flex items-center justify-center shrink-0">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <h3 className="text-[18px] font-bold text-[#2b2b2e]">{item.title}</h3>
                </div>
                <p className="text-[14px] leading-relaxed text-[#4b5563]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="w-full py-24 px-5 bg-[#f4f4f5] border-t border-[#e5e7eb]">
        <div className="max-w-[1200px] mx-auto space-y-24">

          {/* Mission Box */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.05)] border border-slate-200">
              <img
                src={missionSection?.image ? resolveImage(missionSection.image) : undefined}
                alt="Mission"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-[36px] max-[769px]:text-[28px] font-heading font-extrabold text-[#1c1c1e] mb-4">
                {renderDynamicHeading(missionSection?.heading)}
              </h2>

              <p className="text-[18px] font-semibold text-[#2b2b2e] leading-relaxed mb-6">
                {missionSection?.intro}
              </p>

              <p className="text-[16px] leading-[1.8] text-[#4b5563]">
                {missionSection?.body}
              </p>
            </div>
          </div>

          {/* Vision Box */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-[36px] max-[769px]:text-[28px] font-heading font-extrabold text-[#1c1c1e] mb-4">
                {renderDynamicHeading(visionSection?.heading)}
              </h2>

              <p className="text-[18px] font-semibold text-[#2b2b2e] leading-relaxed mb-6">
                {visionSection?.intro}
              </p>

              <p className="text-[16px] leading-[1.8] text-[#4b5563]">
                {visionSection?.body}
              </p>
            </div>
            <div className="order-1 lg:order-2 relative rounded-3xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.05)] border border-slate-200">
              <img
                src={visionSection?.image ? resolveImage(visionSection.image) : undefined}
                alt="Vision"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default About