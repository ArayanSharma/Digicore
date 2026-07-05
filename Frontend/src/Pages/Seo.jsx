import React from 'react'
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "../Styles/About.css"
import Hero2 from "../Components/Sections/Hero2";
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
  const { content: c } = usePageContent("seo");
  const aboutSection = c?.aboutSection;
  const betterSection = c?.betterSection;
  const contactBanner = c?.contactBanner;
  const missionSection = c?.missionSection;
  const visionSection = c?.visionSection;

  const rawStats = c?.stats || [];
  const displayStats = rawStats.map((s) => ({ ...s, icon: resolveImage(s.icon) }));

  const displayIndustries = c?.industries
    ? c.industries.map((i) => ({ ...i, icon: resolveImage(i.icon) }))
    : [];
  const industriesTitle = c?.industriesTitle || "";

  return (
    <div>
      <Hero2 />
      <section className="sectionone">
        <div className="container">
          <h1 className="topheading">
            {renderDynamicHeading(aboutSection?.heading)}
          </h1>

          <div className="shrtdesc">
            <p className="text-center">
              {aboutSection?.body}
            </p>
          </div>

          <div className="space"></div>

          <div className="overview-row">
            <div className="overview-content">
              <p>
                {aboutSection?.paragraph1}
              </p>
              <p>
                {aboutSection?.paragraph2}
              </p>
            </div>

            <div className="overview-image">
              <img src={aboutSection?.image ? resolveImage(aboutSection.image) : undefined} alt="Company Overview" />
            </div>
          </div>
        </div>
      </section>

      <section className="wydmbc">
        <div className="container">
          <h2 className="wydm-title">
            {renderDynamicHeading(betterSection?.heading)}
          </h2>

          <p className="wydm-desc">
            {betterSection?.description}
          </p>

          <div className="wydm-grid">
            {displayStats.map((item, index) => (
              <div className="wydm-item" key={item.id || index}>
                {item.icon && <img src={item.icon} alt={item.title} />}
                <h3>{item.title}</h3>
                <div className="count-box">{item.count}</div>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-banner">
        <div className="contact-wrapper">
          <a href={contactBanner?.phone ? `tel:${contactBanner.phone}` : "#"} className="contact-left">
            <FaPhoneAlt />
            <span>{contactBanner?.phone}</span>
          </a>

          <div className="contact-center">
            {contactBanner?.logo && <img src={resolveImage(contactBanner.logo)} alt="logo" />}
          </div>

          <a href={contactBanner?.email ? `mailto:${contactBanner.email}` : "#"} className="contact-right">
            <FaEnvelope />
            <span>{contactBanner?.email}</span>
          </a>
        </div>
      </section>

      <section className="industries-section">
        <div className="container">
          <h2 className="section-title">
            {renderDynamicHeading(industriesTitle)}
          </h2>

          <div className="industries-grid ">
            {displayIndustries.map((item, index) => (
              <div className="industry-card" key={index}>
                <div className="industry-header">
                  {item.icon && (
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="industry-icon"
                    />
                  )}
                  <h3>{item.title}</h3>
                </div>

                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ourmission">
        <div className="mission-wrapper">
          <div className="mission-box">
            <h2>
              {renderDynamicHeading(missionSection?.heading)}
            </h2>

            <p className="intro">
              {missionSection?.intro}
            </p>

            <div className="content-row">
              <div className="image-box">
                <img src={missionSection?.image ? resolveImage(missionSection.image) : undefined} alt="Mission" />
              </div>

              <div className="text-box">
                <p>
                  {missionSection?.body}
                </p>
              </div>
            </div>
          </div>

          <div className="vision-box">
            <h2>
              {renderDynamicHeading(visionSection?.heading)}
            </h2>

            <p className="intro">
              {visionSection?.intro}
            </p>

            <div className="content-row">
              <div className="text-box">
                <p>
                  {visionSection?.body}
                </p>
              </div>

              <div className="image-box">
                <img src={visionSection?.image ? resolveImage(visionSection.image) : undefined} alt="Vision" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
