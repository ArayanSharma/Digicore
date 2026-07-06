import React, { useEffect, useMemo, useState } from "react";
import { usePageContent, resolveImage } from "../hooks/usePageContent";

import Hero from "../Components/Services/Hero";
import CategoryTabs from "../Components/Services/CategoryTabs";
import ServiceSection from "../Components/Services/ServiceSection";
import WhyChoose from "../Components/Services/WhyChoose";
import ProcessTimeline from "../Components/Services/ProcessTimeline";
import TechStack from "../Components/Services/TechStack";
import Stats from "../Components/Services/Stats";
import FAQ from "../Components/Services/FAQ";
import CTA from "../Components/Services/CTA";
import TestimonialSection from "../Components/Sections/Testimonials";
import Contacts from "../Components/Sections/Contact";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const normalizeMediaUrl = (url) => {
  if (!url || typeof url !== "string") return url;
  if (/^https?:\/\//.test(url) || url.startsWith("data:")) return url;
  if (url.startsWith("/")) return `${API}${url}`;
  if (url.startsWith("uploads/")) return `${API}/${url}`;
  return url;
};

const Services = () => {
  const { content: c } = usePageContent("services");
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSlug, setActiveSlug] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const load = async () => {
      setLoading(true);
      try {
        const [catRes, svcRes] = await Promise.all([
          fetch(`${API}/api/categories?active=true`),
          fetch(`${API}/api/services?active=true`),
        ]);
        const catData = await catRes.json();
        const svcData = await svcRes.json();
        const cats = Array.isArray(catData.categories) ? catData.categories : [];
        const svcs = Array.isArray(svcData.services) ? svcData.services : [];
        setCategories(cats);
        setServices(
          svcs.map((s) => ({
            ...s,
            image: normalizeMediaUrl(s.image),
            icon: normalizeMediaUrl(s.icon),
          }))
        );
        if (cats.length > 0) setActiveSlug(cats[0].slug);
      } catch (err) {
        console.error("Failed to load services catalog:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const servicesByCategory = useMemo(() => {
    const map = {};
    services.forEach((s) => {
      const catId = s.category?._id || s.category;
      if (!map[catId]) map[catId] = [];
      map[catId].push(s);
    });
    return map;
  }, [services]);

  useEffect(() => {
    if (categories.length === 0) return;
    const sections = categories
      .map((cat) => document.getElementById(cat.slug))
      .filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSlug(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [categories]);

  const hero = c?.hero
    ? {
        ...c.hero,
        heroImage: c.hero.heroImage ? resolveImage(c.hero.heroImage) : "",
        backgroundImage: c.hero.backgroundImage ? resolveImage(c.hero.backgroundImage) : "",
      }
    : null;

  return (
    <div className="bg-white">
      <Hero hero={hero} />

      <div className="relative">
        {!loading && categories.length > 0 && (
          <CategoryTabs categories={categories} activeSlug={activeSlug} onSelect={setActiveSlug} />
        )}

        {!loading &&
          categories.map((cat, index) => (
            <ServiceSection
              key={cat._id}
              category={cat}
              services={servicesByCategory[cat._id] || []}
              index={index}
            />
          ))}

        {!loading && categories.length === 0 && (
          <div className="py-24 text-center text-[#6b7280]">
            No service categories available yet. Add them from the admin panel.
          </div>
        )}
      </div>

      <WhyChoose data={c?.whyChoose} />
      <ProcessTimeline data={c?.process} />
      <TechStack data={c?.techStack} />
      <Stats data={c?.stats} />

      <TestimonialSection />

      <FAQ heading={c?.faqHeading} items={c?.faq} />
      <CTA data={c?.cta} />

      <Contacts />
    </div>
  );
};

export default Services;
