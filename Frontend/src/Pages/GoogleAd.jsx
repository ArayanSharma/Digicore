import React, { useEffect, useState, useRef } from "react";


import Banner from "../Components/Cards/Seohero";

import ServiceCard from "../Components/Cards/ServiceCard";

import impact from "../assets/impact.webp";
import i1 from "../assets/i1.png";
import i2 from "../assets/i2.png";
import i3 from "../assets/i3.png";

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
import SeoCaseStudies from "../Pages/SeoCaseStudies";
import eimage from "../assets/BannerImg/googleShoppingAds.png";
import seocase1 from "../assets/case1.png";
import seocase2 from "../assets/case2.png";
import seocase3 from "../assets/case3.png";
import { usePageContent, resolveImage } from "../hooks/usePageContent";

const GoogleAd = () => {
  const { content: c } = usePageContent("google-shopping-ads");
  const hero = c?.hero;
  const about = c?.about;
  const visibility = c?.visibility;
  const performance = c?.performance;
  const seoAgency = c?.seoAgency;
  const discoverServices = c?.discoverServices;
  const ctaSection = c?.ctaSection;
  const impactSection = c?.impact;
  const whyChooseDigicore = c?.whyChooseDigicore;
  const dominate = c?.dominate;
  const faqSection = c?.faq;

  const [counts, setCounts] = useState({
    count1: 0,
    count2: 0,
    count3: 0,
    count4: 0,
  });

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
        "For The Moto Men, we executed a Noida-focused PPC campaign to drive high-intent enquiries for premium car detailing services. Nearly 80% of the enquiries were highly relevant, aligned with both location and service intent. From these qualified enquiries, the campaign achieved a conversion rate of up to 12.5%, delivering consistent and measurable business impact. The strategy focused on precise location targeting, intent-driven keywords, and continuous optimisation to maintain lead quality while minimising wasted ad spend."]
    },

    {
      title: "Trusted Hair Transplant Clinic – PPC Performance Case Study (14.52% Conversion)",
      image: seocase2,
      descriptions: [
        "We executed a high-intent Google Search Ads campaign for a hair transplant clinic, targeting users actively searching for treatment-related queries. The campaign delivered a conversion rate of 14.52%, indicating strong intent alignment and effective ad optimisation. The strategy focused on quality enquiries and consistent performance rather than inflated traffic, helping the clinic generate relevant leads and measurable growth."]
    },

    {
      title: "IOD Global – Display Campaign Case Study",
      image: seocase3,
      descriptions: [
        "For IOD Global, we executed a Google Display Campaign focused on increasing brand visibility and recall among the right audience segments. The campaign was designed to build consistent exposure through targeted placements and audience-based targeting. The strategy prioritised relevant impressions, controlled reach, and brand presence. Continuous optimisation ensured stable performance and efficient delivery aligned with the brand’s objectives while avoiding irrelevant traffic."]
    }
  ];
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
      title: "Merchant Center Setup",
      description:
        "A Google Merchant Center account is set up by our experts to maintain accuracy of products being listed and recommended in Google shopping results to the users.",
    },

    {
      icon: socialIcon,
      title: "GCampaign Setup",
      description:
        "As a part of this step, smart bidding and targeting are attained through well-planned shopping campaigns. The objective is to improve conversions and attract high-intent traffic.",
    },

    {
      icon: ppcIcon,
      title: "Feed Optimisation",
      description:
        "The product feed is regularly updated by our campaign managers to maintain accuracy and consistency of listings. This step is aimed at avoiding errors in the product listings.",
    },

    {
      icon: webIcon,
      title: "Competitor Analysis",
      description:
        "Based on the evaluation of competitors’ shopping ads, our campaign management experts, strategic ads are planned to keep your ecommerce store ahead in Google shopping results.",
    },

    {
      icon: contentIcon,
      title: "Smart Product Targeting",
      description:
        "Our Google ads management experts focus on the ad-spend allocated on popular or best-selling products to connect with the potential high-intent shoppers.",
    },

    {
      icon: ormIcon,
      title: "Performance Tracking",
      description:
        "This step involves constantly monitoring Google shopping ads keywords optimization, adjustment of bids to maximize ROI and attain the positive campaign search results.",
    }

  ];

  const displayServices = services;


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
      icon: Icon2,
      title: "Make More Sales",
      desc: "We help you convert maximum possible leads into sales and grow your business faster",
    },

    {
      icon: Icon3,
      title: "Build Brand Awareness",
      desc: "We help your brand gain strong recognition across digital platforms globally",
    },

    {
      icon: Icon4,
      title: "Upskill Your Team",
      desc: "Improve your team capabilities with advanced marketing strategies and guidance",
    },

  ];

  const defaultIcons = [Icon1, Icon2, Icon3, Icon4];
  const displayHelpCards = dominate?.cards?.length
    ? dominate.cards.map((item, index) => ({
        ...item,
        icon: item.icon ? resolveImage(item.icon) : defaultIcons[index % 4],
      }))
    : helpCards;

  const faqData = [
    {
      question: "How long will it take for my website to start ranking on Google?",
      answer:
        "The time a website to rank on Google varies between 3 – 6 months. The major components that affect your website ranking and timeline include, your industry competition, SEO efforts and content quality.",
    },
    {
      question:
        "How many keywords will you work on as part of my SEO campaign?",
      answer:
        "The number of keywords will depend on the type of your business, industry, market trends and your competitors. We choose ROI-driven and high-intent and commercial keywords for your site to attract high-quality traffic and convert it into lead. In addition, we keep on testing our keywords and optimize them according to the market scenario and Google trends so as to ensure your rankings on online platforms and visibility on social media handles stays consistently high.",
    },
    {
      question:
        "Do you offer monthly, quarterly, or custom SEO payment plans?",
      answer:
        "Yes, we have all sort of SEO payment plans. However, to understand our plans, you are advised to connect with us via email or phone. Our experts will first understand your business, digital marketing goals and challenges that you are facing to curate an appropriate payment plan according to your business needs and budget.",
    },
    {
      question:
        "What is the size of your in-house SEO and digital marketing team?",
      answer:
        "Our in-house SEO and digital marketing team comprises experienced professionals across strategy, content, social media, PPC, analytics, development and design, working hand-in-hand to deliver comprehensive digital solutions and help you achieve unforgettable outcomes.",
    },
    {
      question:
        "Which industries and types of clients do you primarily work with?",
      answer:
        "We work with diverse range of clients across industries, including education, finance, e-commerce, travel, B2B, healthcare, and so on. We have a huge clientele across Pan India. We help both startups and already established brands elevate their online presence and achieve measurable results.",
    },
    {
      question:
        "Will my website be optimized to rank in AI-powered search platforms like ChatGPT and Google AI?",
      answer:
        "Yes, we utilize the most advanced tools and cutting-edge technology to ensure your website is optimized for AI-powered search platforms as well. Our team of experts will optimise your website for AI search like ChatGPT and Google AI by targeting high-intent customer queries and creating high-quality and high-authority content. Visit our site or connect with the AI First SEO team via email or phone for more details.",
    },
    {
      question:
        "Which is the best SEO agency in Delhi, and how do I choose the right one?",
      answer:
        "Digicore Inc. is a leading AI SEO agency in Delhi NCR with proven results. We offer comprehensive SEO marketing solutions to a diverse range of clients across industries. We utilize years of experience and cutting-edge tools and technology to help you achieve desired results. You can visit our site and go through our SEO case studies to know how we have helped our clients improve their digital presence and achieve ROI-driven results to make the right choice.",
    },
    {
      question:
        "Have you worked with clients from my industry before?",
      answer:
        "Yes, we have worked with clients from your industry and we are excited to serve you with our innovative digital marketing solutions to help you leave a lasting impression across all online platforms, including social media handles.",
    },
    {
      question:
        "How do you share SEO performance reports and how frequently will I receive them?",
      answer:
        "We provide a bi-monthly SEO performance reports to help you track key metrics such as rankings, traffic, conversions and more. If you want, we can provide you report more frequently; however, we believe that a bi-monthly reporting system is more appropriate as you get enough insights to ponder on.",
    }
    , {
      question:
        "Can you share real client case studies and past SEO results?",
      answer:
        "Yes, we can! Aside from that, you can also visit the SEO case studies section in our website to learn more about our existing and past clients’ experience with us.",
    }

    , {
      question:
        "Apart from SEO, what other digital marketing services do you provide?",
      answer:
        "We provide comprehensive digital marketing services, including SEO, SMM, PPC, Content Marketing, Performance Marketing, Website Design & Development, Online Reputation Marketing, Conversion Rate Optimisation, AEO+AIO+GEO, Display Advertising Services, Social Media Listing, Response Marketing and many more.",
    }

    , {
      question:
        "My website has a high spam score. How will you reduce and fix it?",
      answer:
        "Don’t worry about that. We will fix it! We will first conduct a thorough audit to identify the issues causing it, such as low-quality backlinks, thin content or technical SEO problems. After identifying the real cause, we will implement a comprehensive cleanup SEO strategy to eliminate the issue and restore your website’s credibility and improve its search engine trustworthiness.",
    }

    , {
      question:
        "I have been working with another SEO agency for over a year but my rankings haven’t improved. Can you fix this?",
      answer:
        "Well, we have no idea what strategies your previous SEO partner was using. But worry not! We will thoroughly audit your site and know what exactly is the reason for your site’s low ranking. After that, we would be in better position to tell you our exact course of action. But rest assured, Digicore Inc. is the best SEO company in Delhi. Our team of experts will help you achieve your digital marketing goals, including first page ranking & high-intent leads effortlessly. We will use the most advanced tools and technology to elevate your site’s ranking and drive measurable growth.",
    }

    , {
      question:
        "How much monthly traffic and how many leads can I realistically expect from SEO?",
      answer:
        "The monthly traffic and leads you can expect from SEO depend on various factors like your industry, competition, current website authority and the scope of SEO efforts. But you don’t need to worry. Our team of experts will craft specialized digital marketing strategies tailored to your brand to ensure increased targeted traffic and high-quality leads within 3-6 months.",
    }

    , {
      question:
        "If I stop SEO in the future, will my rankings remain stable?",
      answer:
        "Stopping in today’s scenario simply translates to falling behind fast. The moment you will stop implementing digital marketing strategies, your ranking will drop, let alone remaining stable. Digital marketing isn’t a one-time fix; it’s a continuous process of consistent effort and growth. With technological advancements and SEO evolution, your brand also evolves. If you will stop after a time being, you will lead to nowhere. Hence, you are advised to actively implement digital marketing effort to reap consistent outcomes. Partner with Digicore Inc. – the most reliable AI First SEO agency in Delhi to have stable ranking across platforms!",
    }

    , {
      question:
        "For how long will I need to continue SEO for my website to maintain results?",
      answer:
        "As said earlier, SEO is not a one-time fix; it is a continuous process. You need to keep implementing SEO strategies in order to maintain consisting results and stay ahead across online and social media platforms. With the best AI-first digital marketing company by your side you can ensure consistent online growth and robust outcomes!",
    }

  ];

  const displayFaq = faqSection?.items?.length ? faqSection.items : faqData;


  return (
    <>

      <Banner

        title={hero?.title || "Google Shopping Ads Management Services"}
        description={hero?.description || "At Digicore Inc., we use strategically planned Google shopping ads management services that help ecommerce business owners to connect with the high-intent shoppers. Be it through improved product visibility, better conversion or using data-driven services, the idea is to drive more sales through shopping ad management services."}
        primaryBtnText={hero?.primaryBtnText || "Speak to an SEO Expert"}
        secondaryBtnText={hero?.secondaryBtnText || "Our Services"}
        backgroundImage={hero?.backgroundImage ? resolveImage(hero.backgroundImage) : eimage}
      />




      <section className="w-full py-[100px] px-5 max-[769px]:py-[60px] bg-white border-b border-[#e5e7eb]">
        <div className="max-w-[1300px] mx-auto text-center pt-[60px] px-5 pb-20 max-[769px]:p-[50px_15px]">
          <h1 className="font-heading font-extrabold text-[44px] leading-[1.2] max-[993px]:text-[36px] max-[769px]:text-[28px] text-[#2b2b2e] mb-6">
            {about?.heading || "Best Google Shopping Ads Management Agency"}
          </h1>

          <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px] max-[769px]:w-[50px] max-[769px]:mb-[20px]"></div>

          <p className="font-normal text-[17px] leading-[1.8] text-[#4b5563]">
            {about?.paragraph ? about.paragraph : (
              <>
                The ecommerce brands planning to improve their business and boost sales through strategic inventory management require professional assistance. At Digicore Inc., we employ targeting capabilities and well-planned shopping ads management services to help businesses connect with their audience while they are searching for their products.
                <br /><br /> <br />
                Being the trusted Google shopping ads management agency, our comprehensive campaign assessment is aimed at bridging the gaps between targeted audience and the brand. Whether it is converting the improved product visibility into sales growth or relying on ecommerce trends to optimizing ad placements, we use real-time data to deliver customized outcome for business growth.
              </>
            )}
          </p>
        </div>
      </section>

      <section className="w-full py-[100px] bg-white max-[993px]:py-[60px] max-[993px]:px-5 border-b border-[#e5e7eb]">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-[60px] lg:gap-[40px] px-5">
          <div className="flex-1">
            <h2 className="w-full font-heading font-extrabold text-[36px] leading-[1.2] max-[993px]:text-[30px] max-[769px]:text-[26px] text-[#2b2b2e] m-0 pb-[20px]">
              {visibility?.heading || "Why Google Shopping Ads Management Is Important for Business Growth?"}
            </h2>

            <p className="font-normal text-[16px] leading-[1.8] text-[#4b5563] m-0">
              {visibility?.paragraph || "Most of the users count on Google initially in order to address their shopping requirements. At Digicore Inc., we believe shopping ads are among the powerful tools for the success of ecommerce. From attracting qualified traffic, improving conversion to working on enhancing product visibility, we customize ad campaign aligned with your business goals. Our comprehensive approach of Google shopping ads management services includes product feed optimization, optimizing ad placements, bidding assessment and tracking results. Keeping in mind the objectives of clients, we analyse product range, understand the customer journey to finalize the ad campaign."}
            </p>

            <div className="w-[100px] h-[4px] bg-[#e31e24] mt-[40px]"></div>
          </div>

          <div className="flex-1 flex justify-center lg:justify-end">
            <img src={visibility?.image ? resolveImage(visibility.image) : graphImg} alt="Graph" className="w-full max-w-[550px] h-auto object-cover rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.06)] border border-[#e5e7eb]" />
          </div>
        </div>
      </section>

      <section className="w-full p-0 m-0 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-0 w-full">
          <div className="bg-gradient-to-br from-[#8b0000] to-[#1c1c1e] min-h-[350px] flex flex-col justify-center px-12 py-[80px] lg:pl-[120px]">
            {[performance?.label1 || "TRACK", performance?.label2 || "ANALYZE", performance?.label3 || "SCALE", performance?.label4 || "REPEAT"].map((word, i) => (
              <h2 key={i} className="m-0 font-heading font-extrabold text-[60px] leading-[75px] max-[992px]:text-[48px] max-[992px]:leading-[58px] max-[769px]:text-[36px] max-[769px]:leading-[46px] text-white uppercase tracking-tight">
                {word}
              </h2>
            ))}
          </div>

          <div className="min-h-[390px] max-[992px]:min-h-[350px] max-[769px]:min-h-[250px] overflow-hidden">
            <img src={performance?.image ? resolveImage(performance.image) : seoRimg} alt="SEO Performance" className="w-full h-full block object-cover" />
          </div>
        </div>
      </section>

      <section className="w-full py-[100px] px-5 bg-white border-b border-[#e5e7eb]">
        <div className="max-w-[1200px] mx-auto text-center px-5">
          <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px] max-[769px]:w-[50px] max-[769px]:mb-[20px]"></div>

          <h2 className="text-[42px] max-[993px]:text-[34px] max-[769px]:text-[26px] text-[#1c1c1e] font-heading font-extrabold mb-[30px] leading-[1.2]">
            {seoAgency?.heading || "Why Do I Need Google Shopping Ads Management Services?"}
          </h2>

          <p className="text-[17px] leading-[1.8] text-[#4b5563] text-center max-w-[1000px] mx-auto m-0">
            {seoAgency?.paragraph || "With the help of our well-planned Google shopping ads management services, we help you in reaching customers who are interested in purchasing your products. By working on the details of the products ranging from images, price, specifications, and overall optimization of products, our ads drive high-intent shoppers and qualified traffic. Our professional ad management services keep the campaigns structured, maintain accurate product feeds and allocate the budget related to campaign effectively. This continuous optimization and performance tracking helps our Google ad management experts in reduction of waste ad spend, enhancing product visibility and increasing conversions. If you want to experience the consistent growth of your ecommerce business, then, continuous sales, better returns and optimized business profile will be possible through our Google shopping ads."}
          </p>
        </div>
      </section>


      <section className="w-full py-24 px-5 bg-[#f4f4f5] text-center border-b border-[#e5e7eb]">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px] max-[769px]:w-[50px] max-[769px]:mb-[20px]"></div>

          <h2 className="text-[48px] max-[993px]:text-[38px] max-[769px]:text-[30px] leading-[1.1] text-[#1c1c1e] mb-[25px] font-heading font-extrabold uppercase">
            {discoverServices?.heading || "Google Shopping Ads Services"}
          </h2>

          <p className="text-[17px] leading-[1.8] text-[#4b5563] max-w-[850px] mx-auto mb-6">
            {discoverServices?.paragraph || "At Digicore Inc., we provide tailored strategies related to Google shopping ads management services to increase conversions and maximize ROI. Our campaign management experts focus on boosting the product visibility, drive high-intent buyers and attract qualified users to your ecommerce store. Our methodology includes bid management, consistent performance tracking, product feed optimization and campaign setup. We target the right shoppers through our strategically planned ads management."}
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto px-5 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          backgroundImage: `linear-gradient(rgba(28, 28, 30, 0.9), rgba(28, 28, 30, 0.95)), url(${ctaSection?.backgroundImage ? resolveImage(ctaSection.backgroundImage) : bgIcon})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b0000]/10 to-transparent pointer-events-none"></div>
        <div className="relative z-10 text-center max-w-[1000px] mx-auto">
          <h1 className="text-white text-[42px] max-[769px]:text-[30px] font-heading font-extrabold leading-[1.2] mb-[40px] uppercase">
            {ctaSection?.heading || "Ready for More Traffic, Leads & Sales? Start SEO Now."}
          </h1>

          <div className="flex justify-center items-center gap-5 max-[769px]:flex-col">
            <a
              href={ctaSection?.whatsappLink || "#"}
              className="flex items-center justify-center gap-[10px] bg-white hover:bg-[#f0fdf4] hover:scale-[1.03] transition-all duration-300 text-[#22c55e] h-12 px-7 rounded-lg text-base font-bold no-underline shadow-[0_4px_15px_rgba(34,197,94,0.16)] border border-[#22c55e]/25"
            >
              <img
                src="https://tataresearch.besthr.in/digital-marketar/assets/icon/whatsapp.png"
                alt="whatsapp"
                className="w-[20px] h-[20px] rounded-full bg-[#22c55e] p-[3px] object-contain"
              />
              {ctaSection?.whatsappText || "+91 98188 88064"}
            </a>

            <a
              href={ctaSection?.callbackBtnLink || "#"}
              className="flex items-center justify-center gap-[10px] bg-transparent hover:bg-white/10 hover:scale-[1.03] transition-all duration-300 text-white h-12 px-7 rounded-lg text-base font-bold no-underline border border-white"
            >
              {ctaSection?.callbackBtnText || "REQUEST A CALLBACK"}
            </a>
          </div>
        </div>
      </section>
      <section className="py-[100px] px-[7%] bg-white border-b border-[#e5e7eb]">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center gap-[60px] lg:flex-row flex-col px-5">
          <div className="w-full max-w-[500px] lg:max-w-[45%]">
            <img src={impactSection?.image ? resolveImage(impactSection.image) : impact} alt="Impact" className="w-full block rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.05)] border border-[#e5e7eb]" />
          </div>

          <div className="w-full lg:max-w-[50%] pt-10 lg:pt-0">
            <div className="relative border-l border-[#e5e7eb] pl-6 ml-3">
              {(impactSection?.timeline?.length ? impactSection.timeline : [
                { title: "Contact Us", description: "Reach out to us via email, phone or our website." },
                { title: "SEO and PPC", description: "We were rated the Top SEO and PPC Company of the Year in 2014 by CIO Review." },
                { title: "Share Your Goals:", description: "Share your challenges and objectives." },
                { title: "Consultation:", description: "Our experts will craft SEO strategies tailored to your needs." },
                { title: "Tailored Plan:", description: "Get a customized plan with clear strategies and outcomes." },
                { title: "Out Turn:", description: "Achieve measurable results in record time." },
              ]).map((item, index) => (
                <div key={item.id || index} className="relative mb-[40px] last:mb-0">
                  <div className="absolute left-[-31px] top-1 w-[14px] h-[14px] rounded-full border-2 border-[#e31e24] bg-white shadow-[0_0_8px_rgba(227,30,36,0.4)] z-[2]"></div>

                  <div>
                    <h3 className="mb-[8px] text-[22px] max-[769px]:text-[19px] font-heading font-bold text-[#2b2b2e] leading-tight">{item.title}</h3>

                    <p className="text-[15px] leading-[1.6] text-[#4b5563]">{item.description || item.desc}</p>
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
              {whyChooseDigicore?.heading || (<>Why Choose Digicore Inc. for Google Shopping Ads<br /> Management Services?</>)}
            </h2>
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-8">
              {whyChooseDigicore?.paragraph || "With the result-driven Google shopping ads management services, Digicore Inc. focuses on innovative and world-class techniques to scale your e-commerce business. Our campaign experts optimize product feeds, target shoppers with high-intent to purchase products from your online store, refine bidding strategies and lower cost per conversion. We ensure increased visibility, increased return on ad spend and align continuous data analysis and optimization for ecommerce business growth. At Digicore Inc., our seasoned professionals adhere to customized business results, product range and competition analysis backed by transparent reporting and constant performance. We help you in targeting the right customer, staying competitive in Google shopping marketplace while increasing sales."}
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div>
              <ul className="space-y-4 text-base sm:text-lg text-slate-700">
                {whyChooseDigicore?.points?.length ? (
                  whyChooseDigicore.points.map((point, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="mt-1 text-[#e31e24]">✔</span>
                      <span>{point}</span>
                    </li>
                  ))
                ) : ([
                  "Our seasoned professionals with profound experience tailors and execute Google shopping ad campaigns",
                  "We address the ad management requirements of all-sized business and deliver unmatched results",
                  "Our Google shopping ads management services maintain transparency and clarity in the reporting system through competitor analysis insights",
                  "Our cost-effective ad management services are result-driven and focus on client-centric outcome",
                  "Our future-ready and dedicated ads management services contribute to the success of diverse ecommerce businesses",
                  "Our consistent ads management excellence and unmatched results have made us the right choice among the ecommerce business owners",
                  "Product visibility, business growth, and increased conversions are assured by our well-tailored Google shopping ads management services",
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
                src={whyChooseDigicore?.image ? resolveImage(whyChooseDigicore.image) : graphImg}
                alt="Graph"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dominate Section */}
      <section className="w-full py-24 px-5 bg-[#f4f4f5] border-b border-[#e5e7eb] text-center">
        <div className="max-w-[1200px] mx-auto">
          <div className="w-[60px] h-[4px] bg-[#e31e24] mx-auto mb-[25px] rounded-[10px]"></div>

          <h2 className="text-center text-[48px] max-[993px]:text-[38px] max-[769px]:text-[30px] font-heading font-extrabold text-[#1c1c1e] mb-[15px] uppercase">
            {dominate?.heading || "How Can We Help You Grow"}
          </h2>

          <p className="text-center text-[17px] leading-[1.8] text-[#4b5563] max-w-[900px] mx-auto mb-16">
            {dominate?.paragraph || "We provide tailored Google Shopping Ads solutions to help businesses maximize brand exposure, drive high-intent buyer traffic, and scale digital campaigns efficiently."}
          </p>
        </div>

        <div className="flex justify-center gap-10 flex-wrap mt-[30px]">
          {displayHelpCards.map((item, index) => (
            <div
              className="group w-[260px] h-[260px] max-[769px]:w-[220px] max-[769px]:h-[220px] rounded-full bg-white border border-[#e5e7eb] flex flex-col items-center justify-center text-center p-6 box-border relative overflow-hidden cursor-pointer shadow-sm transition-all duration-300 hover:bg-[#e31e24] hover:border-[#e31e24] hover:shadow-[0_12px_25px_rgba(227,30,36,0.25)] hover:-translate-y-1.5"
              key={index}
            >
              <div className="relative z-[2] w-12 h-12 mb-4 flex items-center justify-center transition-colors duration-300">
                <img src={item.icon} alt={item.title} className="w-full h-full object-contain filter group-hover:brightness-0 group-hover:invert transition-all duration-300" />
              </div>

              <h3 className="relative z-[2] text-[18px] max-[769px]:text-[15px] font-heading font-bold text-[#2b2b2e] leading-tight m-0 transition-colors duration-300 group-hover:text-white group-hover:mb-[10px]">{item.title}</h3>

              <p className="relative z-[2] mt-0 text-[12px] leading-[1.5] text-white opacity-0 max-h-0 overflow-hidden transition-all duration-300 group-hover:opacity-90 group-hover:max-h-[120px]">{item.desc}</p>
            </div>
          ))}
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

export default GoogleAd
