import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageContent, resolveImage } from "../hooks/usePageContent";

import MobileHero from "../Components/MobileApp/MobileHero";
import PlatformsSection from "../Components/MobileApp/PlatformsSection";
import ServicesSection from "../Components/MobileApp/ServicesSection";
import DevelopmentProcess from "../Components/MobileApp/DevelopmentProcess";
import TechStackSection from "../Components/MobileApp/TechStackSection";
import FeaturesBento from "../Components/MobileApp/FeaturesBento";
import WhyChooseSection from "../Components/MobileApp/WhyChooseSection";
import StatsSection from "../Components/MobileApp/StatsSection";
import IndustriesSection from "../Components/MobileApp/IndustriesSection";
import ProjectsShowcase from "../Components/MobileApp/ProjectsShowcase";
import MobileTestimonials from "../Components/MobileApp/MobileTestimonials";
import MobileFAQ from "../Components/MobileApp/MobileFAQ";

gsap.registerPlugin(ScrollTrigger);

const PAGE_SLUG = "android-ios-development";

/* ------------------------------------------------------------------ */
/* Default content (used until admin-saved content loads)              */
/* ------------------------------------------------------------------ */

const defaultPlatformsHeader = {
  eyebrow: "Mobile Platforms We Build",
  title: "Every Platform. One Standard of Excellence.",
  description: "Whether your users live on Android, iOS, or both — we engineer apps native to how each platform actually works.",
};

const defaultPlatforms = [
  {
    id: "android",
    icon: "FaAndroid",
    color: "#3DDC84",
    title: "Native Android",
    description: "High-performance apps built directly for the world's largest mobile ecosystem.",
    chips: "Kotlin, Java, Material Design",
    benefits: "Deep hardware & OS integration, Optimized for diverse device ranges, Distributed via Google Play",
  },
  {
    id: "ios",
    icon: "FaApple",
    color: "#0f172a",
    title: "Native iOS",
    description: "Polished, premium apps engineered for Apple's tightly controlled, high-performing ecosystem.",
    chips: "Swift, SwiftUI, UIKit",
    benefits: "Buttery-smooth, consistent performance, Pixel-perfect Apple HIG compliance, Distributed via the App Store",
  },
  {
    id: "cross",
    icon: "Repeat",
    color: "#3B82F6",
    title: "Cross Platform",
    description: "One codebase, two platforms — ship faster without compromising on native feel.",
    chips: "Flutter, React Native, Expo",
    benefits: "Single codebase, faster delivery, Native-grade UI & performance, Lower long-term maintenance cost",
  },
];

const defaultBentoHeader = {
  eyebrow: "App Features",
  title: "Capabilities Your App Can Ship With",
  description: "Production-ready features we wire into every build, on demand.",
};

const defaultBentos = [
  { id: "b1", icon: "Bell", title: "Push Notifications", desc: "Real-time alerts that bring users back into the experience.", span: "lg:col-span-2 lg:row-span-1" },
  { id: "b2", icon: "MessageCircle", title: "Live Chat", desc: "In-app real-time messaging built for speed and scale." },
  { id: "b3", icon: "MapPin", title: "GPS Tracking", desc: "Precise location for delivery, ride-hailing, and geo apps." },
  { id: "b4", icon: "Fingerprint", title: "Secure Authentication", desc: "Biometric login, 2FA, and rock-solid session security." },
  { id: "b5", icon: "CreditCard", title: "Payment Gateway", desc: "Seamless in-app payments with providers users trust." },
  { id: "b6", icon: "BrainCircuit", title: "AI Integration", desc: "Smart recommendations, chat assistants, and on-device ML baked in.", span: "lg:col-span-2 lg:row-span-1" },
  { id: "b7", icon: "WifiOff", title: "Offline Mode", desc: "Apps that keep working smoothly without a live connection." },
  { id: "b8", icon: "RefreshCw", title: "Cloud Sync", desc: "Seamless data sync across every device your users own." },
  { id: "b9", icon: "QrCode", title: "QR Scanner", desc: "Native scanning for check-ins, payments, and quick actions." },
  { id: "b10", icon: "BarChart3", title: "Analytics", desc: "In-depth behavioral analytics baked into every build." },
  { id: "b11", icon: "Languages", title: "Multi-language", desc: "Full localization support for global audiences." },
  { id: "b12", icon: "Moon", title: "Dark Mode", desc: "Beautiful, accessible dark themes out of the box." },
];

const defaultWhyChooseHeader = {
  eyebrow: "Why Us",
  title: "Why Choose DigiCore",
  description: "Ten reasons founders and enterprises trust us with their most important mobile products.",
};

const defaultWhyChooses = [
  { id: "wc1", icon: "Users", title: "Experienced Mobile Developers", desc: "A senior team that has shipped apps across every major industry." },
  { id: "wc2", icon: "Palette", title: "Pixel Perfect UI", desc: "Interfaces crafted to match design specs down to the last pixel." },
  { id: "wc3", icon: "FaAppStoreIos", title: "App Store Ready", desc: "Smooth, compliant submissions to Apple's App Store." },
  { id: "wc4", icon: "FaGooglePlay", title: "Google Play Ready", desc: "End-to-end Google Play listing, release & rollout management." },
  { id: "wc5", icon: "ShieldCheck", title: "Secure Architecture", desc: "Best-practice encryption, auth, and data handling by default." },
  { id: "wc6", icon: "Gauge", title: "Fast Performance", desc: "Optimized builds engineered for speed on every device." },
  { id: "wc7", icon: "Layers", title: "Scalable Codebase", desc: "Clean, modular architecture built to grow with your business." },
  { id: "wc8", icon: "Repeat2", title: "Agile Development", desc: "Transparent sprints and milestones that keep launches on time." },
  { id: "wc9", icon: "Headphones", title: "Ongoing Support", desc: "Continuous monitoring, patches, and support after release." },
  { id: "wc10", icon: "Cpu", title: "Latest Technologies", desc: "We build on current, battle-tested frameworks — never legacy stacks." },
];

const defaultIndustriesHeader = {
  eyebrow: "Industries We Serve",
  title: "Domain Expertise Across Every Sector",
  description: "We've shipped mobile products for founders and enterprises across a wide range of industries.",
};

const defaultIndustries = [
  { id: "ind1", icon: "HeartPulse", title: "Healthcare", desc: "Telemedicine, patient portals & HIPAA-ready records." },
  { id: "ind2", icon: "Landmark", title: "Finance", desc: "Secure banking, trading & digital wallet apps." },
  { id: "ind3", icon: "ShoppingCart", title: "Ecommerce", desc: "High-converting shopping & marketplace experiences." },
  { id: "ind4", icon: "UtensilsCrossed", title: "Food Delivery", desc: "Live tracking, ordering & kitchen dashboards." },
  { id: "ind5", icon: "Truck", title: "Logistics", desc: "Fleet tracking, route optimization & dispatch tools." },
  { id: "ind6", icon: "GraduationCap", title: "Education", desc: "Interactive learning, live classes & progress tracking." },
  { id: "ind7", icon: "Building2", title: "Real Estate", desc: "Property listings, virtual tours & lead management." },
  { id: "ind8", icon: "Plane", title: "Travel", desc: "Bookings, itineraries & real-time trip updates." },
  { id: "ind9", icon: "Dumbbell", title: "Fitness", desc: "Workout plans, wearable sync & community challenges." },
  { id: "ind10", icon: "Clapperboard", title: "Entertainment", desc: "Streaming, ticketing & fan engagement platforms." },
  { id: "ind11", icon: "Factory", title: "Manufacturing", desc: "IoT dashboards, inventory & plant-floor visibility." },
  { id: "ind12", icon: "Zap", title: "On-Demand Services", desc: "Booking, dispatch & real-time service marketplaces." },
];

const defaultHero = {
  visible: true,
  badge: "📱 DigiCore Mobile Studio",
  title: "Transform Your Ideas Into Powerful Android & iOS Apps",
  description:
    "DigiCore designs and engineers premium native and cross-platform mobile apps — fast, secure, scalable, and built to convert from day one.",
  primaryBtn: { text: "Start Your App Project", link: "/contact" },
  secondaryBtn: { text: "View Mobile Portfolio", link: "#mobile-projects" },
  heroImage: "",
  heroImage2: "",
  backgroundImage: "",
};

const defaultServicesHeader = {
  eyebrow: "App Development Services",
  heading: "Everything Your Mobile Product Needs",
  subheading: "From first sketch to store listing — a full-cycle mobile engineering team under one roof.",
};

const defaultServices = [
  { id: "s1", icon: "NativeAndroid", title: "Android App Development", description: "High-performance Kotlin & Java apps tailored for the Android platform.", featured: true, visible: true },
  { id: "s2", icon: "NativeIOS", title: "iPhone App Development", description: "Swift-built iOS apps that feel right at home on every Apple device.", featured: true, visible: true },
  { id: "s3", icon: "CrossPlatform", title: "Cross Platform Apps", description: "One codebase, two platforms — shipped faster without compromise.", featured: false, visible: true },
  { id: "s4", icon: "EnterpriseApps", title: "Enterprise Mobile Apps", description: "Secure, scalable internal and customer-facing apps for large organizations.", featured: true, visible: true },
  { id: "s5", icon: "EcommerceApps", title: "Ecommerce Apps", description: "High-converting shopping experiences with seamless checkout flows.", featured: false, visible: true },
  { id: "s6", icon: "FoodDeliveryApps", title: "Food Delivery Apps", description: "Live tracking, ordering, and kitchen management in one platform.", featured: false, visible: true },
  { id: "s7", icon: "HealthcareApps", title: "Healthcare Apps", description: "Telemedicine and patient-record apps built for compliance and trust.", featured: false, visible: true },
  { id: "s8", icon: "FinTechApps", title: "FinTech Apps", description: "Secure banking, trading, and digital wallet applications.", featured: false, visible: true },
  { id: "s9", icon: "BookingApps", title: "Booking Apps", description: "Reservation and scheduling apps with real-time availability.", featured: false, visible: true },
  { id: "s10", icon: "SocialMediaApps", title: "Social Media Apps", description: "Engaging, scalable social platforms with real-time feeds and chat.", featured: false, visible: true },
  { id: "s11", icon: "EducationApps", title: "Education Apps", description: "Interactive learning apps with live classes and progress tracking.", featured: false, visible: true },
  { id: "s12", icon: "CustomBusinessApps", title: "Custom Business Apps", description: "Bespoke mobile tools engineered around your exact workflow.", featured: false, visible: true },
];

const defaultTechnologies = [
  { id: "t1", name: "Kotlin", description: "Modern, concise language for Android development.", visible: true },
  { id: "t2", name: "Java", description: "Battle-tested language for enterprise Android apps.", visible: true },
  { id: "t3", name: "Swift", description: "Apple's fast, safe language for iOS development.", visible: true },
  { id: "t4", name: "SwiftUI", description: "Declarative UI framework for modern Apple apps.", visible: true },
  { id: "t5", name: "Flutter", description: "Google's UI toolkit for natively compiled apps.", visible: true },
  { id: "t6", name: "React Native", description: "Cross-platform apps with native performance.", visible: true },
  { id: "t7", name: "Node.js", description: "Scalable JavaScript runtime for app backends.", visible: true },
  { id: "t8", name: "Express", description: "Minimal, fast backend framework for REST APIs.", visible: true },
  { id: "t9", name: "Django", description: "Secure, batteries-included Python web framework.", visible: true },
  { id: "t10", name: "MongoDB", description: "Flexible NoSQL database for mobile-scale data.", visible: true },
  { id: "t11", name: "MySQL", description: "Reliable relational database for structured data.", visible: true },
  { id: "t12", name: "PostgreSQL", description: "Advanced open-source relational database.", visible: true },
  { id: "t13", name: "SQLite", description: "Lightweight embedded database for on-device storage.", visible: true },
  { id: "t14", name: "AWS", description: "Cloud infrastructure that scales with your app.", visible: true },
  { id: "t15", name: "Google Cloud", description: "Managed cloud services for global-scale apps.", visible: true },
  { id: "t16", name: "Firebase", description: "Backend-as-a-service for auth, data, and analytics.", visible: true },
  { id: "t17", name: "Appwrite", description: "Open-source backend for auth, storage, and functions.", visible: true },
  { id: "t18", name: "Android Studio", description: "Official IDE for building and debugging Android apps.", visible: true },
  { id: "t19", name: "Xcode", description: "Apple's IDE for building and shipping iOS apps.", visible: true },
  { id: "t20", name: "GitHub", description: "Version control and collaboration for every codebase.", visible: true },
  { id: "t21", name: "Docker", description: "Containerized environments for consistent deployments.", visible: true },
  { id: "t22", name: "Figma", description: "Collaborative design tool for every screen we ship.", visible: true },
  { id: "t23", name: "Postman", description: "API design, testing, and documentation toolkit.", visible: true },
];

const defaultProcessHeader = {
  eyebrow: "How We Work",
  title: "Mobile App Development Process",
  description: "A proven, transparent path from your first idea to a five-star rated app in production.",
};

const defaultProcess = [
  { title: "Discovery", desc: "Understanding your goals, users, and platform requirements in depth." },
  { title: "Wireframing", desc: "Mapping every screen and flow before a single line of UI is built." },
  { title: "UI/UX Design", desc: "Crafting pixel-perfect, on-brand interfaces for Android and iOS." },
  { title: "App Development", desc: "Building clean, scalable, well-tested native or cross-platform code." },
  { title: "API Integration", desc: "Wiring up payments, auth, and third-party services end-to-end." },
  { title: "Testing", desc: "Rigorous QA across real devices, OS versions, and screen sizes." },
  { title: "App Store Deployment", desc: "Managing App Store and Google Play submissions end-to-end." },
  { title: "Maintenance & Updates", desc: "Ongoing monitoring, updates, and support after launch." },
];

const defaultTechHeader = {
  eyebrow: "Our Tech Stack",
  title: "Technologies We Use",
  description: "A modern, production-proven toolkit spanning mobile, backend, data, cloud, and tooling.",
};

const defaultProjectsHeader = {
  eyebrow: "Portfolio",
  title: "Featured Mobile Projects",
  description: "A sample of Android and iOS products we've designed, engineered, and shipped to real users.",
};

const defaultProjects = [
  {
    id: "p1",
    name: "FitTrack Pro",
    category: "Fitness App",
    description: "A cross-platform fitness companion with live workout tracking and social challenges.",
    coverImage: "",
    playStore: "#",
    appStore: "#",
    github: "#",
    featured: true,
    visible: true,
  },
  {
    id: "p2",
    name: "UrbanEats",
    category: "Food Delivery App",
    description: "A native food delivery app with live GPS tracking and in-app payments.",
    coverImage: "",
    playStore: "#",
    appStore: "#",
    github: "#",
    featured: true,
    visible: true,
  },
  {
    id: "p3",
    name: "WalletWise",
    category: "FinTech App",
    description: "A secure personal finance app with biometric login and real-time analytics.",
    coverImage: "",
    playStore: "#",
    appStore: "#",
    github: "#",
    featured: false,
    visible: true,
  },
  {
    id: "p4",
    name: "RideNow",
    category: "Taxi Booking App",
    description: "An on-demand ride booking app with live driver tracking and fare estimation.",
    coverImage: "",
    playStore: "#",
    appStore: "#",
    github: "#",
    featured: false,
    visible: true,
  },
];

const defaultStatistics = {
  apps: { value: 120, suffix: "+", label: "Apps Delivered" },
  downloads: { value: 250, suffix: "K+", label: "Downloads Generated" },
  clients: { value: 96, suffix: "%", label: "Client Retention" },
  countries: { value: 15, suffix: "+", label: "Countries Served" },
  rating: { value: 4.9, suffix: "★", label: "Average App Rating" },
  satisfaction: { value: 5, suffix: "+", label: "Years Experience" },
};

const defaultTestimonialsHeader = {
  eyebrow: "Client Testimonials",
  title: "What Our Clients Say",
};

const defaultTestimonials = [
  { id: "r1", name: "Ananya Kapoor", company: "Founder, FitTrack Pro", avatar: "", review: "DigiCore took our idea from a sketch to a five-star rated app on both stores in under four months.", rating: 5, visible: true },
  { id: "r2", name: "Marcus Lee", company: "CTO, UrbanEats", avatar: "", review: "Rock-solid engineering and constant communication. Our app hasn't had a single major crash since launch.", rating: 5, visible: true },
  { id: "r3", name: "Priya Nair", company: "Product Lead, WalletWise", avatar: "", review: "The attention to UX detail is unmatched — our retention numbers improved within the first month.", rating: 5, visible: true },
];

const defaultFaqHeader = {
  eyebrow: "FAQ",
  title: "Frequently Asked Questions",
  description: "Straight answers to the questions we hear most often about mobile app development.",
};

const defaultFaq = [
  { id: "f1", question: "Android vs iOS — which should I build first?", answer: "It depends on where your users are. We'll help you decide based on your target market, budget, and timeline — or build both from a single cross-platform codebase.", visible: true },
  { id: "f2", question: "Flutter vs Native — what's the difference?", answer: "Native (Swift/Kotlin) gives maximum performance and platform-specific polish. Flutter and React Native ship faster from one codebase with near-native quality. We recommend the right fit after a quick discovery call.", visible: true },
  { id: "f3", question: "How much does app development cost?", answer: "Most projects range from $20k to $100k+ depending on scope, platforms, and integrations. We provide a detailed, fixed-scope quote after our discovery session.", visible: true },
  { id: "f4", question: "How long does delivery take?", answer: "Most apps take 10-16 weeks from kickoff to launch, depending on scope, platform count, and integrations required.", visible: true },
  { id: "f5", question: "Do you handle App Store submission?", answer: "Yes — we manage the full App Store and Google Play submission process, including compliance and review handling.", visible: true },
  { id: "f6", question: "Do you provide maintenance after launch?", answer: "Every project includes an optional ongoing maintenance plan covering updates, monitoring, and support.", visible: true },
];

const defaultSeo = {
  metaTitle: "Android & iOS App Development Services | DigiCore",
  metaDescription:
    "DigiCore designs and builds high-performance native and cross-platform Android and iOS apps with Flutter, React Native, Swift, and Kotlin.",
  keywords: "android app development, ios app development, flutter, react native, mobile app agency, DigiCore",
  ogImage: "",
};

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function AndroidandIso() {
  const { content: c } = usePageContent(PAGE_SLUG);
  const rootRef = useRef(null);

  const hero = { ...defaultHero, ...(c?.hero || {}) };
  const platformsHeader = {
    eyebrow: c?.platformsHeader?.eyebrow || defaultPlatformsHeader.eyebrow,
    title: c?.platformsHeader?.title || defaultPlatformsHeader.title,
    description: c?.platformsHeader?.description || defaultPlatformsHeader.description,
  };
  const platforms = c?.platforms?.length ? c.platforms : defaultPlatforms;

  const servicesHeader = {
    eyebrow: c?.servicesHeader?.eyebrow || defaultServicesHeader.eyebrow,
    heading: c?.servicesHeader?.heading || defaultServicesHeader.heading,
    subheading: c?.servicesHeader?.subheading || defaultServicesHeader.subheading,
  };
  const services = (c?.services?.length ? c.services : defaultServices).filter((s) => s.visible !== false);

  const techHeader = {
    eyebrow: c?.techHeader?.eyebrow || defaultTechHeader.eyebrow,
    title: c?.techHeader?.title || defaultTechHeader.title,
    description: c?.techHeader?.description || defaultTechHeader.description,
  };
  const technologies = (c?.technologies?.length ? c.technologies : defaultTechnologies).filter((t) => t.visible !== false);

  const bentoHeader = {
    eyebrow: c?.bentoHeader?.eyebrow || defaultBentoHeader.eyebrow,
    title: c?.bentoHeader?.title || defaultBentoHeader.title,
    description: c?.bentoHeader?.description || defaultBentoHeader.description,
  };
  const bentos = c?.bentos?.length ? c.bentos : defaultBentos;

  const processHeader = {
    eyebrow: c?.processHeader?.eyebrow || defaultProcessHeader.eyebrow,
    title: c?.processHeader?.title || defaultProcessHeader.title,
    description: c?.processHeader?.description || defaultProcessHeader.description,
  };
  const processSteps = c?.process?.length ? c.process : defaultProcess;

  const whyChooseHeader = {
    eyebrow: c?.whyChooseHeader?.eyebrow || defaultWhyChooseHeader.eyebrow,
    title: c?.whyChooseHeader?.title || defaultWhyChooseHeader.title,
    description: c?.whyChooseHeader?.description || defaultWhyChooseHeader.description,
  };
  const whyChooses = c?.whyChooses?.length ? c.whyChooses : defaultWhyChooses;

  const projectsHeader = {
    eyebrow: c?.projectsHeader?.eyebrow || defaultProjectsHeader.eyebrow,
    title: c?.projectsHeader?.title || defaultProjectsHeader.title,
    description: c?.projectsHeader?.description || defaultProjectsHeader.description,
  };
  const projects = (c?.projects?.length ? c.projects : defaultProjects).filter((p) => p.visible !== false);
  const statistics = {
    apps: { ...defaultStatistics.apps, ...(c?.statistics?.apps || {}) },
    downloads: { ...defaultStatistics.downloads, ...(c?.statistics?.downloads || {}) },
    clients: { ...defaultStatistics.clients, ...(c?.statistics?.clients || {}) },
    countries: { ...defaultStatistics.countries, ...(c?.statistics?.countries || {}) },
    rating: { ...defaultStatistics.rating, ...(c?.statistics?.rating || {}) },
    satisfaction: { ...defaultStatistics.satisfaction, ...(c?.statistics?.satisfaction || {}) },
  };

  const industriesHeader = {
    eyebrow: c?.industriesHeader?.eyebrow || defaultIndustriesHeader.eyebrow,
    title: c?.industriesHeader?.title || defaultIndustriesHeader.title,
    description: c?.industriesHeader?.description || defaultIndustriesHeader.description,
  };
  const industries = c?.industries?.length ? c.industries : defaultIndustries;

  const testimonialsHeader = {
    eyebrow: c?.testimonialsHeader?.eyebrow || defaultTestimonialsHeader.eyebrow,
    title: c?.testimonialsHeader?.title || defaultTestimonialsHeader.title,
  };
  const testimonials = (c?.testimonials?.length ? c.testimonials : defaultTestimonials).filter((t) => t.visible !== false);
  const faqHeader = {
    eyebrow: c?.faqHeader?.eyebrow || defaultFaqHeader.eyebrow,
    title: c?.faqHeader?.title || defaultFaqHeader.title,
    description: c?.faqHeader?.description || defaultFaqHeader.description,
  };
  const faqs = (c?.faq?.length ? c.faq : defaultFaq).filter((f) => f.visible !== false);
  const seo = { ...defaultSeo, ...(c?.seo || {}) };

  /* SEO tags */
  useEffect(() => {
    if (seo.metaTitle) document.title = seo.metaTitle;
    const setMeta = (name, content, attr = "name") => {
      if (!content) return;
      let tag = document.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };
    setMeta("description", seo.metaDescription);
    setMeta("keywords", seo.keywords);
    setMeta("og:image", seo.ogImage ? resolveImage(seo.ogImage) : "", "property");
  }, [seo.metaTitle, seo.metaDescription, seo.keywords, seo.ogImage]);

  /* Shared scroll-reveal GSAP wiring — bespoke local interactions (hero
     parallax, process curve draw, counters, carousel) live inside their
     own components. */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".mp-hero-fade", { y: 28, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.12 });
      gsap.from(".mp-hero-phone-a", { x: -50, y: 30, opacity: 0, rotate: -6, duration: 1.1, ease: "power3.out", delay: 0.25 });
      gsap.from(".mp-hero-phone-b", { x: 60, opacity: 0, rotate: 6, duration: 1.1, ease: "power3.out", delay: 0.1 });
      gsap.from(".mp-hero-chip", { scale: 0, opacity: 0, duration: 0.6, ease: "back.out(1.7)", stagger: 0.15, delay: 0.75 });
      gsap.from([".mp-hero-orbit-a", ".mp-hero-orbit-b"], { scale: 0, opacity: 0, duration: 0.6, ease: "back.out(1.8)", stagger: 0.15, delay: 0.5 });

      gsap.utils.toArray(".mp-reveal").forEach((el) => {
        gsap.from(el, { y: 36, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });

      gsap.utils.toArray(".mp-stagger-group").forEach((group) => {
        gsap.utils.toArray(group.children).forEach((card, i) => {
          gsap.from(card, {
            y: 28,
            opacity: 0,
            duration: 0.6,
            delay: (i % 4) * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 94%", once: true },
          });
        });
      });

      gsap.utils.toArray(".mp-timeline-step").forEach((el) => {
        gsap.from(el, { y: 24, opacity: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
      gsap.utils.toArray(".mp-timeline-dot").forEach((el) => {
        gsap.from(el, { scale: 0, opacity: 0, duration: 0.5, ease: "back.out(2)", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
      });

      ScrollTrigger.refresh();
    }, rootRef);

    return () => ctx.revert();
  }, [c]);

  return (
    <div ref={rootRef} className="overflow-x-hidden bg-white">
      {hero.visible !== false && <MobileHero hero={hero} />}

      <PlatformsSection header={platformsHeader} platforms={platforms} />

      <ServicesSection services={services} eyebrow={servicesHeader.eyebrow} heading={servicesHeader.heading} subheading={servicesHeader.subheading} />

      <div id="mobile-process">
        <DevelopmentProcess header={processHeader} steps={processSteps} />
      </div>

      <TechStackSection header={techHeader} technologies={technologies} />

      <FeaturesBento header={bentoHeader} features={bentos} />

      <WhyChooseSection header={whyChooseHeader} reasons={whyChooses} />

      <StatsSection statistics={statistics} />

      <IndustriesSection header={industriesHeader} industries={industries} />

      <div id="mobile-projects">
        <ProjectsShowcase header={projectsHeader} projects={projects} />
      </div>

      <MobileTestimonials header={testimonialsHeader} testimonials={testimonials} />

      <MobileFAQ header={faqHeader} faqs={faqs} />


      <style>{`
        .mp-ripple-host { position: relative; }
        .mp-ripple {
          position: absolute;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.45);
          transform: scale(0);
          animation: mp-ripple-burst 0.6s ease-out;
          pointer-events: none;
        }
        @keyframes mp-ripple-burst {
          to { transform: scale(1); opacity: 0; }
        }

        @keyframes mp-blob-drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(24px, -22px); }
        }
        .mp-blob { animation: mp-blob-drift 9s ease-in-out infinite; }
        .mp-blob-alt { animation: mp-blob-drift 11s ease-in-out infinite reverse; }

        @keyframes mp-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .mp-float { animation: mp-float 4.5s ease-in-out infinite; }
        .mp-float-delayed { animation: mp-float 5.5s ease-in-out infinite; animation-delay: 1.2s; }

        @keyframes mp-phone-wobble {
          0%, 100% { transform: translate(0, 0) rotate(-3deg); }
          50% { transform: translate(0, -12px) rotate(-1deg); }
        }
        @keyframes mp-phone-wobble-alt {
          0%, 100% { transform: translate(0, 0) rotate(3deg); }
          50% { transform: translate(0, -14px) rotate(1deg); }
        }
        .mp-phone-wobble { animation: mp-phone-wobble 6.5s ease-in-out infinite; }
        .mp-phone-wobble-alt { animation: mp-phone-wobble-alt 7.5s ease-in-out infinite; }

        @keyframes mp-orbit-a {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(8px, -14px); }
        }
        @keyframes mp-orbit-b {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-10px, 12px); }
        }
        .mp-hero-orbit-a { animation: mp-orbit-a 5s ease-in-out infinite; }
        .mp-hero-orbit-b { animation: mp-orbit-b 6s ease-in-out infinite; }

        @keyframes mp-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .mp-marquee { animation: mp-marquee-scroll 30s linear infinite; }
        .mp-marquee:hover { animation-play-state: paused; }

        @keyframes mp-gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .mp-gradient-shift { animation: mp-gradient-shift 8s ease infinite; }

        @keyframes mp-morph {
          0%, 100% { border-radius: 42% 58% 65% 35% / 45% 45% 55% 55%; }
          50% { border-radius: 60% 40% 35% 65% / 55% 60% 40% 45%; }
        }
        .mp-morph { animation: mp-morph 10s ease-in-out infinite; }

        @keyframes mp-testimonial-fade {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mp-testimonial-fade { animation: mp-testimonial-fade 0.5s ease-out; }
      `}</style>
    </div>
  );
}
