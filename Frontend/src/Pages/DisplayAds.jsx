import React, { useEffect, useState ,useRef} from "react";


import Banner from "../Components/Cards/Seohero";

import ServiceCard from "../Components/Cards/ServiceCard";

import impact from "../assets/impact.webp";

import seoRimg from "../assets/real-seo-result.webp";
import heroImg from "../assets/a.png";
import graphImg from "../assets/graph-l.webp";
 import i1 from "../assets/i1.png";
 import i2 from "../assets/i2.png";
 import i3 from "../assets/i3.png";
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
import geoIcon from "../assets/aeo-o.webp";
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
  import eimage from "../assets/BannerImg/DisplayAds.png";
 import seocase1 from "../assets/case1.png";
import seocase2 from "../assets/case2.png";
import seocase3 from "../assets/case3.png";
import { usePageContent, resolveImage } from "../hooks/usePageContent";


const DisplayAds = () => {
  const { content: c } = usePageContent("display-ads");
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

  const [counts, setCounts] = useState({
    count1: 0,
    count2: 0,
    count3: 0,
    count4: 0,
  });
const [currentCase, setCurrentCase] = useState(0);

const nextCase = () => {
  setCurrentCase((prev) =>
    prev === caseStudies.length - 1 ? 0 : prev + 1
  );
};

const prevCase = () => {
  setCurrentCase((prev) =>
    prev === 0 ? caseStudies.length - 1 : prev - 1
  );
};

const caseStudies = [
  {
    title: "The Moto Men – High-Intent Google Ads Leads with 12.5% Conversion",
    image: seocase1,
    descriptions: [
"For The Moto Men, we executed a Noida-focused PPC campaign to drive high-intent enquiries for premium car detailing services. Nearly 80% of the enquiries were highly relevant, aligned with both location and service intent. From these qualified enquiries, the campaign achieved a conversion rate of up to 12.5%, delivering consistent and measurable business impact. The strategy focused on precise location targeting, intent-driven keywords, and continuous optimisation to maintain lead quality while minimising wasted ad spend."
    ]
  },

  {
    title: "Trusted Hair Transplant Clinic – PPC Performance Case Study (14.52% Conversion)",
    image: seocase2,
    descriptions: [
    "We executed a high-intent Google Search Ads campaign for a hair transplant clinic, targeting users actively searching for treatment-related queries. The campaign delivered a conversion rate of 14.52%, indicating strong intent alignment and effective ad optimisation. The strategy focused on quality enquiries and consistent performance rather than inflated traffic, helping the clinic generate relevant leads and measurable growth."
    ]
  },

  {
    title: "IOD Global – Display Campaign Case Study",
    image: seocase3,
    descriptions: [
    "For IOD Global, we executed a Google Display Campaign focused on increasing brand visibility and recall among the right audience segments. The campaign was designed to build consistent exposure through targeted placements and audience-based targeting. The strategy prioritised relevant impressions, controlled reach, and brand presence. Continuous optimisation ensured stable performance and efficient delivery aligned with the brand’s objectives while avoiding irrelevant traffic."   ]
  }
];
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





    
      useEffect(() => {
    
        let start = 0;
    
        const interval = setInterval(() => {
    
          start += 1;
    
          setCounts({
            count1: start <= 50 ? start : 50,
            count2: start <= 52 ? start : 52,
            count3: start <= 61 ? start : 61,
            count4: start <= 44 ? start : 44,
          });
    
          if (start >= 61) {
            clearInterval(interval);
          }
    
        }, 30);
    
        return () => clearInterval(interval);
    
      }, []);


      const services = [
    
        {
          icon: seoIcon,
          title: "Google Display Ads Management",
          description:
            "With the help of Google Display ads management, we strategically use targeted visuals, smart ad placements and effective data-driven optimization to help you reach the right audience. The objective of these services is to boost conversion, brand awareness and engagement across the Google display network.",
        },
    
        {
          icon: socialIcon,
          title: "Google Display Network (GDN) Advertising",
          description:
            "With the help of Google Display Network advertising, we promote your business across multiple websites and apps. As a part of this service, we use targeted banners and visuals in order to increase reach, engagement, brand awareness and conversions.",
        },
    
        {
          icon: ppcIcon,
          title: "Lead Generation Display Campaigns",
          description:
            "IAs a part of these campaigns, we capture high-quality prospects by working over display ads, optimized placements, compelling creatives. The objective of these campaigns is to drive form submissions, conversions, and inquiries while maximizing ROI.",
        },
    
        {
          icon: webIcon,
          title: "Display Remarketing Campaigns",
          description:
            "With the help of personalized display ads, we re-engage past website visitors by reminding them of your brand through these services. Besides, we encourage return visits, conversions and inquiries across the Google Displaay Network.",
        },
    
        {
          icon: contentIcon,
          title: "Responsive Display Ads",
          description:
            "With the help of these Google display ad management services, our professionals adapt headlines, campaign layouts, and images to fit any screen or placement. These services are aimed at improved engagement, wider reach, improved engagement and brand messaging along with better performance across the Google Display Network.",
        },
    
        {
          icon: ormIcon,
          title: "Audience & Interest-Based Display Targeting",
          description:
            "These services are effectively design to reach users based on demographics, interests, search intent, user behaviour to ensure higher relevance, improved conversion rate, and better engagement.",
        }

      ];

      const displayServices = servicesSection?.services?.length
        ? servicesSection.services.map((s, i) => ({ ...s, icon: resolveImage(s.iconUrl) || [seoIcon, socialIcon, ppcIcon, webIcon, contentIcon, ormIcon][i % 6], title: s.title, description: s.description }))
        : services;


  const industries = [
  {
    image: i1,
    title: "Healthcare",
    desc: "We provide specialized digital marketing solutions to hospitals, clinics and other health institutions to help them build trust and grow their brand.",
  },

  {
    image: i2,
    title: "E-Commerce",
    desc: "We help online retailers and marketplaces with robust strategies to elevate their online presence and turn casual browsers into loyal customers.",
  },

  {
    image: i3,
    title: "Travel",
    desc: "We offer a complete suite of digital marketing solutions for travel brands, helping them showcase their offerings in a unique way and drive bookings.",
  },
  {
    image: i1,
    title: "Healthcare",
    desc: "We provide specialized digital marketing solutions to hospitals, clinics and other health institutions to help them build trust and grow their brand.",
  },

  {
    image: i2,
    title: "E-Commerce",
    desc: "We help online retailers and marketplaces with robust strategies to elevate their online presence and turn casual browsers into loyal customers.",
  },

  {
    image: i3,
    title: "Travel",
    desc: "We offer a complete suite of digital marketing solutions for travel brands, helping them showcase their offerings in a unique way and drive bookings.",
  },
];

 const helpCards = [

  {
    icon: Icon1,
    title: "Get More Leads",
    desc: "We ensure your business get more and more leads through our expertly managed digital marketing services",
  },

  {
    icon: Icon2 ,
    title: "Make More Sales",
    desc: "We help you convert maximum possible leads into sales and grow your business faster",
  },

  {
    icon: Icon3 ,
    title: "Build Brand Awareness",
    desc: "We help your brand gain strong recognition across digital platforms globally",
  },

  {
    icon: Icon4,
    title: "Upskill Your Team",
    desc: "Improve your team capabilities with advanced marketing strategies and guidance",
  },

];

const faqData = [
  {
    question: "In how much time can I expect Google display ads?",
    answer:
      "The initial results in terms of brand visibility reflect in a short span. However, the meaningful conversions and engagement take up to few weeks to improve through consistent optimization.",
  },
  {
    question:
      "Are Google display ads beneficial for remarketing?",
    answer:
      "Yes! Google display ads re-engage the visitors by showing them tailored ads of products & services they have browsed. This is one of the best ways to increase conversion opportunities and brand recall.",
  },
  {
    question:
      "Is it important to optimize Google display ads frequently?",
    answer:
      "Yes! In order to achieve desirable results from Google display ad management services, it is essential to optimize the campaigns regularly. The performance reviews and bid adjustments of these ads should be weekly or consistently monitored.",
  },
  {
    question:
      "Why should I choose Digicore Inc. for Google display ad management services?",
    answer:
      "At Digicore Inc., continuous ad optimization, transparent reporting and data-driven targeting helps our seasoned Google display ad specialists in delivering measurable outcome. We ensure consistent performance and tailored advertising results",
  }

];

const displayFaq = faqSection?.faqItems?.length ? faqSection.faqItems : faqData;


  return (
    <>

     <Banner

      title={banner?.title || "Google Display Ads Management Agency"}
      description={banner?.description || "At Digicore Inc., we help you display ads in front of your audience based on their browsing preferences. Experience the business growth through our strategically planned Google Display ads management services."}
      primaryBtnText={banner?.primaryBtn?.text || "Speak to an SEO Expert"}
      secondaryBtnText={banner?.secondaryBtn?.text || "Our Services"}
      backgroundImage={banner?.backgroundImageUrl ? resolveImage(banner.backgroundImageUrl) : eimage}
    />




      <section className="w-full py-[100px] px-5 max-[769px]:py-[60px] bg-white border-b border-[#e5e7eb]">
        <div className="max-w-[1300px] mx-auto text-center pt-[60px] px-5 pb-20 max-[769px]:p-[50px_15px]">
          <h1 className="font-heading font-extrabold text-[44px] leading-[1.2] max-[993px]:text-[36px] max-[769px]:text-[28px] text-[#2b2b2e] mb-6">
            {aboutSection?.title || (<>Best Google Display Ads Management <br />Services Agency</>)}
          </h1>

          <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px] max-[769px]:w-[50px] max-[769px]:mb-[20px]"></div>

          <p className="font-normal text-[17px] leading-[1.8] text-[#4b5563]">
            {aboutSection?.description || "Digicore Inc. is the best Google Display Ads Management Agency that offers comprehensive display advertising plan to improve ROI of your digital marketing campaigns. We address the customized business goals of our clients while targeting the right audience. Experience the exceptional results to scale up your business with our result-driven display advertising services. Being the premier Google partner, Digicore Inc. focuses on your consistent success in the ecommerce segment and drive quality traffic to your website. Our seasoned professionals prepare captivating ads to attract high-intent shoppers according to their browsing preferences."}
          </p>
        </div>
      </section>

      <section className="w-full py-[100px] bg-white max-[993px]:py-[60px] max-[993px]:px-5 border-b border-[#e5e7eb]">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-[60px] lg:gap-[40px] px-5">
          <div className="flex-1">
            <h2 className="w-full font-heading font-extrabold text-[36px] leading-[1.2] max-[993px]:text-[30px] max-[769px]:text-[26px] text-[#2b2b2e] m-0 pb-[20px]">
              {visibilitySection?.title || "Why Google Display Ad management agency is a must for businesses?"}
            </h2>

            <p className="font-normal text-[16px] leading-[1.8] text-[#4b5563] m-0">
              {visibilitySection?.description || "Get your brand noticed with Digicore Inc.’ top Google display ad management services customized according to your long-term advertising goals. At every stage of digital marketing, our display advertising campaigns help you in identifying new prospects, increasing brand awareness, and addressing the requirements of potential buyers. Being the trusted Google Display Ad management agency, we create uniquely tailored ad message and creative according to the search intent, user behaviour and the browsing history of your audience. These ads are targeted to reach potential customers wherever they have been looking for your services."}
            </p>

            <div className="w-[100px] h-[4px] bg-[#e31e24] mt-[40px]"></div>
          </div>

          <div className="flex-1 flex justify-center lg:justify-end">
            <img src={visibilitySection?.imageUrl ? resolveImage(visibilitySection.imageUrl) : graphImg} alt="Graph" className="w-full max-w-[550px] h-auto object-cover rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.06)] border border-[#e5e7eb]" />
          </div>
        </div>
      </section>

      <section className="w-full p-0 m-0 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-0 w-full">
          <div className="bg-gradient-to-br from-[#8b0000] to-[#1c1c1e] min-h-[350px] flex flex-col justify-center px-12 py-[80px] lg:pl-[120px]">
            {[performanceSection?.items?.[0] || "TRACK", performanceSection?.items?.[1] || "ANALYZE", performanceSection?.items?.[2] || "SCALE", performanceSection?.items?.[3] || "REPEAT"].map((word, i) => (
              <h2 key={i} className="m-0 font-heading font-extrabold text-[60px] leading-[75px] max-[992px]:text-[48px] max-[992px]:leading-[58px] max-[769px]:text-[36px] max-[769px]:leading-[46px] text-white uppercase tracking-tight">
                {word}
              </h2>
            ))}
          </div>

          <div className="min-h-[390px] max-[992px]:min-h-[350px] max-[769px]:min-h-[250px] overflow-hidden">
            <img src={performanceSection?.imageUrl ? resolveImage(performanceSection.imageUrl) : seoRimg} alt="SEO Performance" className="w-full h-full block object-cover" />
          </div>
        </div>
      </section>

      <section className="w-full py-[100px] px-5 bg-white border-b border-[#e5e7eb]">
        <div className="max-w-[1200px] mx-auto text-center px-5">
          <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px] max-[769px]:w-[50px] max-[769px]:mb-[20px]"></div>

          <h2 className="text-[42px] max-[993px]:text-[34px] max-[769px]:text-[26px] text-[#1c1c1e] font-heading font-extrabold mb-[30px] leading-[1.2]">
            {seoAgencySection?.title || "Why do I need Google Display Ad management services?"}
          </h2>

          <p className="text-[17px] leading-[1.8] text-[#4b5563] text-center max-w-[1000px] mx-auto m-0">
            {seoAgencySection?.description || "At Digicore Inc., we prioritize improved visibility and clarity of advertising. With our 360-degrees’ Google Display ad management services, we engage your targeted audience and captivate them right where they browse the most. Whether it is any specific application, website, search engine, YouTube, multiple platforms are covered in addressing the display advertising goals. Our seasoned display ad specialists play a vital role in boosting brand awareness, attracting engagement, driving conversion and nurture prospects. Digicore Inc. utilizes data-driven optimization to ensure ads perform in an exceptional manner and complements your paid media strategy. Besides, our display advertising management services offer sustainable business growth and improved ROI."}
          </p>
        </div>
      </section>


 <section className="w-full py-[100px] px-5 bg-[#f4f4f5] text-center border-b border-[#e5e7eb]">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px] max-[769px]:w-[50px] max-[769px]:mb-[20px]"></div>

          <h2 className="text-[48px] max-[993px]:text-[38px] max-[769px]:text-[30px] leading-[1.1] text-[#1c1c1e] mb-[25px] font-heading font-extrabold">
            {servicesSection?.heading || "Google Display Ad Management Services"}
          </h2>

          <p className="text-[17px] leading-[1.8] text-[#4b5563] max-w-[850px] mx-auto mb-[60px]">
            {servicesSection?.description || "Digicore Inc. offers you a cost-effective of reaching your potential customers and increase ROI through multi-layered Google display ad management services. Being the trusted paid media agency, we ensure targeting, ad placement, bidding and optimization, all the segments of display advertising are addressed by our professionals."}
          </p>
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

      <section
        className="relative py-[100px] px-5 bg-[#1c1c1e] text-center min-h-[300px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(28, 28, 30, 0.9), rgba(28, 28, 30, 0.95)), url(${whyChooseSection?.backgroundImageUrl ? resolveImage(whyChooseSection.backgroundImageUrl) : bgIcon})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b0000]/10 to-transparent pointer-events-none"></div>
        <div className="relative z-10 text-center max-w-[1000px] mx-auto">
          <h1 className="text-white text-[42px] max-[769px]:text-[30px] font-heading font-extrabold leading-[1.2] mb-[40px] uppercase">
            {whyChooseSection?.title || "Ready for More Traffic, Leads & Sales? Start SEO Now."}
          </h1>

          <div className="flex justify-center items-center gap-5 max-[769px]:flex-col">
            <a
              href={whyChooseSection?.buttons?.[0]?.link || "https://wa.me/919818888064"}
              className="flex items-center justify-center gap-[10px] bg-white hover:bg-[#f0fdf4] hover:scale-[1.03] transition-all duration-300 text-[#22c55e] h-12 px-7 rounded-lg text-base font-bold no-underline shadow-[0_4px_15px_rgba(34,197,94,0.16)] border border-[#22c55e]/25"
            >
              <img
                src="https://tataresearch.besthr.in/digital-marketar/assets/icon/whatsapp.png"
                alt="whatsapp"
                className="w-[20px] h-[20px] rounded-full bg-[#22c55e] p-[3px] object-contain"
              />
              {whyChooseSection?.buttons?.[0]?.text || "+91 98188 88064"}
            </a>

            <a
              href={whyChooseSection?.buttons?.[1]?.link || "#"}
              className="flex items-center justify-center gap-[10px] bg-transparent hover:bg-white/10 hover:scale-[1.03] transition-all duration-300 text-white h-12 px-7 rounded-lg text-base font-bold no-underline border border-white"
            >
              {whyChooseSection?.buttons?.[1]?.text || "REQUEST A CALLBACK"}
            </a>
          </div>
        </div>
      </section>
      <section className="py-[100px] px-[7%] bg-white border-b border-[#e5e7eb]">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center gap-[60px] lg:flex-row flex-col px-5">
          <div className="w-full max-w-[500px] lg:max-w-[45%]">
            <img
              src={timelineSection?.imageUrl ? resolveImage(timelineSection.imageUrl) : impact}
              alt="Impact"
              className="w-full block rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.05)] border border-[#e5e7eb]"
            />
          </div>

          <div className="w-full lg:max-w-[50%] pt-10 lg:pt-0">
            <div className="relative border-l border-[#e5e7eb] pl-6 ml-3">
              {(timelineSection?.items?.length ? timelineSection.items : [
                { title: "Contact Us", description: "Reach out to us via email, phone or our website." },
                { title: "SEO and PPC", description: "We were rated the Top SEO and PPC Company of the Year in 2014 by CIO Review." },
                { title: "Share Your Goals:", description: "Share your challenges and objectives." },
                { title: "Consultation:", description: "Our experts will craft SEO strategies tailored to your needs." },
                { title: "Tailored Plan:", description: "Get a customized plan with clear strategies and outcomes." },
                { title: "Out Turn:", description: "Achieve measurable results in record time." },
              ]).map((step, index) => (
                <div key={step.id || index} className="relative mb-[40px] last:mb-0">
                  <div className="absolute left-[-31px] top-1 w-[14px] h-[14px] rounded-full border-2 border-[#e31e24] bg-white shadow-[0_0_8px_rgba(227,30,36,0.4)] z-[2]"></div>

                  <div>
                    <h3 className="mb-[8px] text-[22px] max-[769px]:text-[19px] font-heading font-bold text-[#2b2b2e] leading-tight">{step.title}</h3>

                    <p className="text-[15px] leading-[1.6] text-[#4b5563]">{step.description || step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    
  <Industry />
    <Casestudy />
 


<section className="bg-white py-16 sm:py-20">
  <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto text-center mb-12">
      <div className="mx-auto mb-4 h-1.5 w-20 rounded-full bg-[#e31e24]"></div>
      <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 leading-tight">
        {whyChooseDigicoreSection?.title || (<>Why choose Digicore Inc. for Google Display ad <br /> management services?</>)}
      </h2>
      <p className="mt-5 text-base sm:text-lg text-slate-600 leading-8">
        {whyChooseDigicoreSection?.description || "At Digicore Inc., we employ data driven approach to implement Google Display ad management campaigns. We optimally utilize audience insights, performance analytics and conversion tracking to reach targeted users at the right time across relevant platforms. Our seasoned professionals consistently monitor clicks, impressions, and conversions to optimize creatives, ad placements and bids to attract maximum ROI. From remarkable expertise, transparent reporting and strategic A/B testing, Digicore Inc. assures improved brand visibility, measurable growth and consistent performance in the current ad spend according to your business goals."}
      </p>
    </div>

    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
      <div>
        <ul className="space-y-4 text-base sm:text-lg text-slate-700">
          {whyChooseDigicoreSection?.points?.length ? (
            whyChooseDigicoreSection.points.map((point, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="mt-1 text-[#e31e24]">✔</span>
                <span>{point}</span>
              </li>
            ))
          ) : ([
              "Our seasoned professionals with profound experience tailors and execute Google shopping ad campaigns",
              "We prioritize growth-mindset to deliver data-driven and consistent advertising results for all-sized businesses",
              "Our reporting system maintains clarity and transparency to execute all the Google display ad campaigns according to competitor analysis",
              "We focus on client-centric and result-driven approach to target advertising goals in a specified time span",
              "All our Google display ad management services are sustainable and aimed at consistent business growth",
              "Our proven expertise of Google display ad management has helped businesses of diverse segments to achieve their advertising objectives.",
              "Partner with us to improve the engagement rate, visibility and performance of your business with our cost-effective Google Display ad management services",
            ].map((bullet, index) => (
              <li key={index} className="flex gap-3 items-start">
                <span className="mt-1 text-[#e31e24]">✔</span>
                <span>{bullet}</span>
              </li>
            )))}
        </ul>
      </div>

      <div className="rounded-[32px] bg-slate-50 p-5 shadow-sm">
        <img
          className="w-full rounded-[28px] object-cover"
          src={whyChooseDigicoreSection?.imageUrl ? resolveImage(whyChooseDigicoreSection.imageUrl) : graphImg}
          alt="Graph"
        />
      </div>
    </div>
  </div>
</section>

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

 

 <div>
  <Contacts />
 </div>



    </>
  )
}

export default DisplayAds
