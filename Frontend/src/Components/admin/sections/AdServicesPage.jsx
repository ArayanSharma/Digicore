import { useState, useEffect, useCallback } from "react";
import { loadPageContent, savePageContent } from "../../../utils/pageApi";
import { useToast } from "../../../context/ToastContext";
import LeadForm from "../LeadForm";
import {
  PageHeader,
  Section,
  Field,
  TextInput,
  TextArea,
  ButtonFields,
  ImageInput,
  PageStatusBanner,
  SaveBar,
} from "./common/FormKit";

const PAGE_SLUG = "services";

const initialData = {
  hero: {
    heading: "Digital Marketing Services That Drive Real Growth",
    subheading: "OUR SERVICES",
    description:
      "From SEO to paid ads to full-stack development — explore the complete range of services we use to grow ambitious brands.",
    ctaText: "Get a Free Consultation",
    ctaLink: "/contact",
    heroImage: "",
    backgroundImage: "",
  },
  whyChoose: {
    heading: "Why Choose Digicore",
    description: "Here's what makes our team the right partner for your growth.",
    cards: [
      { icon: "", title: "Experienced Team", description: "A team of seasoned specialists across every marketing discipline." },
      { icon: "", title: "ROI Focused", description: "Every strategy is built around measurable business outcomes." },
    ],
  },
  process: {
    heading: "Our Process",
    steps: [
      { icon: "", title: "Research", description: "We study your market, competitors and audience." },
      { icon: "", title: "Strategy", description: "We build a data-backed plan tailored to your goals." },
    ],
  },
  techStack: {
    heading: "Technologies We Work With",
    items: [
      { icon: "", title: "React" },
      { icon: "", title: "Google Ads" },
    ],
  },
  stats: {
    heading: "Our Impact In Numbers",
    items: [
      { icon: "", title: "250+", description: "Projects Delivered" },
      { icon: "", title: "120+", description: "Happy Clients" },
    ],
  },
  faqHeading: "FAQ",
  faq: [{ question: "How long does it take to see SEO results?", answer: "Most clients start seeing measurable movement within 3-6 months." }],
  cta: {
    heading: "Ready to Grow Your Business?",
    description: "Let's build a strategy tailored to your goals.",
    buttonText: "Get Started",
    buttonLink: "/contact",
    backgroundImage: "",
  },
  seo: {
    metaTitle: "Our Services | Digicore",
    metaDescription: "Explore SEO, SMO, Performance Marketing, Web Development and ORM services offered by Digicore.",
    keywords: "digital marketing services, seo agency, web development",
    ogImage: "",
    canonicalUrl: "/services",
  },
};

export default function AdServicesPage() {
  const showToast = useToast();
  const [openSection, setOpenSection] = useState("hero");
  const toggle = (key) => setOpenSection(openSection === key ? "" : key);

  const [pageData, setPageData] = useState(initialData);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const updateSection = (section, key, value) => {
    setPageData((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [key]: value,
      },
    }));
  };

  const updateArray = (key, next) => {
    setPageData((current) => ({ ...current, [key]: next }));
  };

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    let d = null;
    try {
      d = await loadPageContent(PAGE_SLUG);
    } catch (err) {
      setLoadError(err.message);
    }
    if (d) {
      setPageData((current) => ({ ...current, ...d }));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    (async () => {
      await load();
    })();
  }, [load]);

  const handleSave = async (e) => {
    e?.preventDefault();
    setStatus("saving");
    try {
      await savePageContent(PAGE_SLUG, pageData);
      setStatus("saved");
      showToast("Services page saved successfully");
      setTimeout(() => setStatus(""), 2000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      showToast("Failed to save — please retry", "error");
    }
  };

  return (
    <div className="min-h-screen bg-bg-card py-8 px-4 md:px-8 lg:px-10 flex flex-col gap-6">
      <PageHeader title="Services Page Content - Admin" description="Edit the Hero, Why Choose, Process, Tech Stack, Stats, FAQ, CTA and SEO sections shown on the public /services page." status={status} />
      <form onSubmit={handleSave} className="w-full">
        <PageStatusBanner loading={loading} error={loadError} onRetry={load} />

        <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_8px_24px_rgba(15,23,42,.06)] hover:shadow-[0_16px_36px_rgba(37,99,235,.10)] transition-all duration-300 p-8 space-y-8 mt-8">
          <Section title="Hero Section" open={openSection === "hero"} onToggle={() => toggle("hero")}>
            <Field label="Subheading">
              <TextInput value={pageData.hero.subheading} onChange={(e) => updateSection("hero", "subheading", e.target.value)} placeholder="OUR SERVICES" />
            </Field>
            <Field label="Heading">
              <TextInput value={pageData.hero.heading} onChange={(e) => updateSection("hero", "heading", e.target.value)} placeholder="Hero heading" />
            </Field>
            <Field label="Description">
              <TextArea value={pageData.hero.description} onChange={(e) => updateSection("hero", "description", e.target.value)} rows={4} placeholder="Hero description" />
            </Field>
            <Field label="CTA Button Text">
              <TextInput value={pageData.hero.ctaText} onChange={(e) => updateSection("hero", "ctaText", e.target.value)} />
            </Field>
            <Field label="CTA Button Link">
              <TextInput value={pageData.hero.ctaLink} onChange={(e) => updateSection("hero", "ctaLink", e.target.value)} />
            </Field>
            <ImageInput label="Hero Image" value={pageData.hero.heroImage} onChange={(e) => updateSection("hero", "heroImage", e.target.value)} />
            <ImageInput label="Background Image" value={pageData.hero.backgroundImage} onChange={(e) => updateSection("hero", "backgroundImage", e.target.value)} />
          </Section>

          <Section title="Why Choose Section" open={openSection === "whyChoose"} onToggle={() => toggle("whyChoose")}>
            <Field label="Heading">
              <TextInput value={pageData.whyChoose.heading} onChange={(e) => updateSection("whyChoose", "heading", e.target.value)} />
            </Field>
            <Field label="Description">
              <TextArea value={pageData.whyChoose.description} onChange={(e) => updateSection("whyChoose", "description", e.target.value)} rows={3} />
            </Field>
            <LeadForm
              title="Why Choose Cards"
              addLabel="Add Card"
              items={pageData.whyChoose.cards}
              onChange={(next) => updateSection("whyChoose", "cards", next)}
              fields={[
                { name: "icon", label: "Card Icon", type: "image" },
                { name: "title", label: "Card Title", type: "text", required: true },
                { name: "description", label: "Card Description", type: "textarea" },
              ]}
            />
          </Section>

          <Section title="Process Section" open={openSection === "process"} onToggle={() => toggle("process")}>
            <Field label="Heading">
              <TextInput value={pageData.process.heading} onChange={(e) => updateSection("process", "heading", e.target.value)} />
            </Field>
            <LeadForm
              title="Process Steps"
              addLabel="Add Step"
              items={pageData.process.steps}
              onChange={(next) => updateSection("process", "steps", next)}
              fields={[
                { name: "icon", label: "Step Icon", type: "image" },
                { name: "title", label: "Step Title", type: "text", required: true },
                { name: "description", label: "Step Description", type: "textarea" },
              ]}
            />
          </Section>

          <Section title="Technology Stack Section" open={openSection === "techStack"} onToggle={() => toggle("techStack")}>
            <Field label="Heading">
              <TextInput value={pageData.techStack.heading} onChange={(e) => updateSection("techStack", "heading", e.target.value)} />
            </Field>
            <LeadForm
              title="Technologies"
              addLabel="Add Technology"
              items={pageData.techStack.items}
              onChange={(next) => updateSection("techStack", "items", next)}
              fields={[
                { name: "icon", label: "Logo", type: "image" },
                { name: "title", label: "Technology Name", type: "text", required: true },
              ]}
            />
          </Section>

          <Section title="Statistics Section" open={openSection === "stats"} onToggle={() => toggle("stats")}>
            <Field label="Heading">
              <TextInput value={pageData.stats.heading} onChange={(e) => updateSection("stats", "heading", e.target.value)} />
            </Field>
            <LeadForm
              title="Stats"
              addLabel="Add Stat"
              items={pageData.stats.items}
              onChange={(next) => updateSection("stats", "items", next)}
              fields={[
                { name: "icon", label: "Icon", type: "image" },
                { name: "title", label: "Number (e.g. 250+)", type: "text", required: true },
                { name: "description", label: "Label (e.g. Projects Delivered)", type: "text" },
              ]}
            />
          </Section>

          <Section title="FAQ Section" open={openSection === "faq"} onToggle={() => toggle("faq")}>
            <Field label="FAQ Heading">
              <TextInput value={pageData.faqHeading} onChange={(e) => updateArray("faqHeading", e.target.value)} />
            </Field>
            <LeadForm
              title="FAQs"
              addLabel="Add FAQ"
              items={pageData.faq}
              onChange={(next) => updateArray("faq", next)}
              fields={[
                { name: "question", label: "FAQ Question", type: "text", required: true },
                { name: "answer", label: "FAQ Answer", type: "textarea" },
              ]}
            />
          </Section>

          <Section title="Final CTA Section" open={openSection === "cta"} onToggle={() => toggle("cta")}>
            <Field label="Heading">
              <TextInput value={pageData.cta.heading} onChange={(e) => updateSection("cta", "heading", e.target.value)} />
            </Field>
            <Field label="Description">
              <TextArea value={pageData.cta.description} onChange={(e) => updateSection("cta", "description", e.target.value)} rows={3} />
            </Field>
            <ButtonFields
              label="Button"
              value={{ text: pageData.cta.buttonText, link: pageData.cta.buttonLink }}
              onChange={(v) => {
                updateSection("cta", "buttonText", v.text);
                updateSection("cta", "buttonLink", v.link);
              }}
            />
            <ImageInput label="Background Image" value={pageData.cta.backgroundImage} onChange={(e) => updateSection("cta", "backgroundImage", e.target.value)} />
          </Section>

          <Section title="SEO Settings" open={openSection === "seo"} onToggle={() => toggle("seo")}>
            <Field label="Meta Title">
              <TextInput value={pageData.seo.metaTitle} onChange={(e) => updateSection("seo", "metaTitle", e.target.value)} />
            </Field>
            <Field label="Meta Description">
              <TextArea value={pageData.seo.metaDescription} onChange={(e) => updateSection("seo", "metaDescription", e.target.value)} rows={3} />
            </Field>
            <Field label="Keywords">
              <TextInput value={pageData.seo.keywords} onChange={(e) => updateSection("seo", "keywords", e.target.value)} placeholder="comma, separated, keywords" />
            </Field>
            <ImageInput label="OG Image" value={pageData.seo.ogImage} onChange={(e) => updateSection("seo", "ogImage", e.target.value)} />
            <Field label="Canonical URL">
              <TextInput value={pageData.seo.canonicalUrl} onChange={(e) => updateSection("seo", "canonicalUrl", e.target.value)} placeholder="/services" />
            </Field>
          </Section>
        </div>

        <SaveBar status={status} onSave={handleSave} />
      </form>
    </div>
  );
}
