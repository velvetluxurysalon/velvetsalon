import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Heart, Star, Shield, Clock, Award,
  CheckCircle, Crown, ChevronDown, ChevronUp, Zap, Eye, Droplets, Sparkles,
  CalendarCheck,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// ─── DATA ───────────────────────────────────────────────────────────────────
// NOTE: these names are kept IDENTICAL to the optgroup labels/options used in
// Contact.jsx's SERVICE_GROUPS so the dropdown there matches automatically.

const menServices = [
  { name: "Hair Cut Basic", price: 300 },
  { name: "Hair Cut Advanced", price: 600 },
  { name: "Hair Cut Creative", price: 800 },
  { name: "Beard Trim", price: 105 },
  { name: "Beard Styling", price: 175 },
  { name: "Shave", price: 105 },
  { name: "Head Shave", price: 200 },
  { name: "Pro 10 Colouring", price: 535 },
  { name: "Global Colouring", price: 2000 },
  { name: "Premium Colouring", price: 799 },
  { name: "Moustache Colour", price: 100 },
  { name: "Beard Colour", price: 265 },
  { name: "Beard Colour (Ammonia Free)", price: 300 },
];

const womenServices = [
  { name: "Kids Cut", price: 170 },
  { name: "Hair Cut Basic", price: 300 },
  { name: "Hair Cut Advanced", price: 600 },
  { name: "Hair Cut Creative", price: 800 },
  { name: "Hair Do Basic", price: 900 },
  { name: "Hair Do Creative", price: 1500 },
  { name: "Saree Draping", price: 500 },
  { name: "Root Touchup (Ammonia Free)", price: 1410 },
  { name: "Global Colouring", price: 2000 },
  { name: "Premium Colouring", price: 2900 },
  { name: "Henna", price: 320 },
  { name: "Ironing", price: 580 },
  { name: "Straightening", price: 3165 },
  { name: "Straightening & Shine", price: 3795 },
  { name: "Smoothening", price: 4775 },
  { name: "Rebond & Shine", price: 9100 },
];

const hairSpaServices = [
  { name: "Wella System Professional Hair Spa", price: 999 },
  { name: "L'Oreal Hair Spa", price: 650 },
  { name: "L'Oreal Hair Detox", price: 850 },
  { name: "L'Oreal Anti Dandruff", price: 880 },
  { name: "Soothing Head Massage", price: 85 },
  { name: "Oil Massage (All Variants)", price: 270 },
  { name: "Body Massage", price: 1500 },
  { name: "Body Massage With Scrub", price: 1800 },
];

const facialServices = [
  { name: "Herbal Cleanup", price: 460 },
  { name: "Skin Miracle Facial", price: 1800 },
  { name: "Fruit Secret Facial", price: 660 },
  { name: "Herbal Facial", price: 700 },
  { name: "Oxygen Facial", price: 1500 },
  { name: "Platinum Glow Facial", price: 2000 },
  { name: "24K Gold Facial", price: 2400 },
  { name: "Hydra Facial", price: 5000 },
  { name: "O3+", price: 3000 },
  { name: "Bleach & Detan (Face)", price: 400 },
  { name: "Bleach & Detan (Neck)", price: 150 },
  { name: "Bleach & Detan (Underarms)", price: 250 },
  { name: "Bleach & Detan (Full Arms)", price: 500 },
  { name: "Bleach & Detan (Full Legs)", price: 700 },
  { name: "Bleach & Detan (Full Body)", price: 3000 },
];

const bridalServices = [
  { name: "Manicure", price: 300 },
  { name: "Manicure Paraffin", price: 400 },
  { name: "Manicure Crystal Crush", price: 800 },
  { name: "Pedicure", price: 300 },
  { name: "Pedicure Paraffin", price: 400 },
  { name: "Pedicure Crystal Crush", price: 800 },
  { name: "Heel Peel", price: 1500 },
  { name: "Classic Makeup", price: 7999 },
  { name: "Makeup", price: 9999 },
  { name: "Makeup MAC", price: 12999 },
  { name: "Bridal Package", price: 29999 },
  { name: "Hair Do", price: 799 },
  { name: "Saree Pre Pleating", price: 499 },
  { name: "Advanced Makeup", price: 24999 },
];

const waxingServices = [
  { name: "Threading - Eyebrow", price: 40 },
  { name: "Threading - Upper Lip", price: 40 },
  { name: "Threading - Chin", price: 50 },
  { name: "Threading - Full Face", price: 200 },
  { name: "Waxing (Regular) - Half Arms", price: 200 },
  { name: "Waxing (Regular) - Full Arms", price: 300 },
  { name: "Waxing (Regular) - Half Legs", price: 300 },
  { name: "Waxing (Regular) - Full Legs", price: 400 },
  { name: "Waxing (Regular) - Full Body", price: 1500 },
  { name: "Flavoured Wax - Half Arms", price: 400 },
  { name: "Flavoured Wax - Full Arms", price: 500 },
  { name: "Flavoured Wax - Half Legs", price: 500 },
  { name: "Flavoured Wax - Full Legs", price: 700 },
  { name: "Flavoured Wax - Full Body", price: 2500 },
];

const unisexServices = [
  { name: "L'Oreal Shampoo & Conditioning", price: 250 },
  { name: "Shampoo & Blow Styling", price: 400 },
  { name: "Head Massage Coconut", price: 200 },
  { name: "Head Massage Olive", price: 250 },
  { name: "Head Massage Navaratna", price: 300 },
  { name: "Head Massage Almond", price: 250 },
  { name: "Dandruff Treatment", price: 1500 },
  { name: "Regular Manicure & Pedicure", price: 300 },
  { name: "Rose Manicure & Pedicure", price: 700 },
  { name: "Chocolate Manicure & Pedicure", price: 600 },
  { name: "Relaxing Massage - Hand (15 min)", price: 250 },
  { name: "Relaxing Massage - Feet (20 min)", price: 350 },
  { name: "Relaxing Massage - Back & Neck", price: 400 },
];

const menCombos = [
  {
    name: "The Gentleman's Refresh",
    price: 599,
    items: ["Haircut", "Beard Trim", "Head Massage"],
    desc: "Curated grooming experience for the modern gentleman.",
  },
  {
    name: "The Refined Groom",
    price: 599,
    items: ["Haircut", "Beard Trim", "De-tan"],
    desc: "A revitalizing treatment for a polished look.",
  },
  {
    name: "The Bold Statement",
    price: 949,
    items: ["Haircut", "Beard Trim", "Hair Colour"],
    desc: "Transform your style with a touch of color.",
  },
];

const womenCombos = [
  {
    name: "The Velvet Glow Starter",
    price: 699,
    note: "Any 3 Services",
    items: ["Basic Haircut", "De-Tan", "Underarm Wax", "Half Leg Wax"],
    desc: "Effortless elegance, curated for you.",
  },
  {
    name: "The Luxe Indulgence",
    price: 999,
    note: "Any 3 Services",
    items: ["Haircut", "Whitening Pack", "Pedicure", "Full Arms Wax"],
    desc: "Unwind and rejuvenate with our premium selections.",
  },
];

const whyChoosePoints = [
  {
    icon: Shield,
    title: "Hygiene First, Always",
    desc: "Every tool is sterilized before each client. We use single-use applicators, disposable liners, and hospital-grade sanitizers throughout the salon.",
  },
  {
    icon: Award,
    title: "Premium Products Only",
    desc: "We exclusively use L'Oreal, Wella, and other internationally certified brands — no substitutes, no compromises on quality.",
  },
  {
    icon: Star,
    title: "Expert Stylists",
    desc: "Our team undergoes continuous training with global brands. Every stylist is certified and passionate about their craft.",
  },
  {
    icon: Heart,
    title: "Client-First Philosophy",
    desc: "We listen before we cut. Your vision guides every service. We won't rush you, upsell you, or leave you unhappy.",
  },
  {
    icon: Droplets,
    title: "Safe & Skin-Tested",
    desc: "All chemical services include a mandatory patch test. We stock ammonia-free and hypoallergenic alternatives for sensitive skin.",
  },
  {
    icon: Clock,
    title: "Respect for Your Time",
    desc: "No overbooking. Appointments are honoured on time. A seamless experience from arrival to farewell.",
  },
  {
    icon: Zap,
    title: "Modern Techniques",
    desc: "From Hydra Facials to O3+ treatments to Rebond & Shine — we invest in the latest technology so you get the best results.",
  },
  {
    icon: Eye,
    title: "Transparent Pricing",
    desc: "What you see on our menu is what you pay. No hidden charges, no surprise add-ons. Honest service, every visit.",
  },
];

// Flat list used to build JSON-LD structured data
const ALL_SERVICES_FOR_SEO = [
  ...menServices, ...womenServices, ...hairSpaServices, ...facialServices,
  ...bridalServices, ...waxingServices, ...unisexServices,
];

// ─── BOOK NOW BUTTON ────────────────────────────────────────────────────────

function BookNowButton({ service, price, size = "sm" }) {
  const navigate = useNavigate();

  const handleBook = (e) => {
    e.stopPropagation();
    navigate("/contact", { state: { service, price } });
  };

  if (size === "sm") {
    return (
      <button
        onClick={handleBook}
        className="shrink-0 inline-flex items-center gap-1.5 text-[10px] tracking-wider uppercase font-semibold text-[#8B5A2B] border border-[#C8A96E]/50 rounded-full px-3 py-1.5 hover:bg-[#C8A96E] hover:text-white hover:border-[#C8A96E] transition-all duration-200 ml-3"
      >
        <CalendarCheck size={12} />
        Book Now
      </button>
    );
  }

  return (
    <button
      onClick={handleBook}
      className="w-full mt-2 inline-flex items-center justify-center gap-2 text-xs tracking-widest uppercase font-semibold text-white bg-gradient-to-r from-[#C8A96E] to-[#8B5A2B] rounded-full py-2.5 hover:shadow-md hover:scale-[1.02] transition-all duration-300"
    >
      <CalendarCheck size={14} />
      Book Now
    </button>
  );
}

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function ServiceRow({ name, price, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -15 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: (index % 8) * 0.04 }}
      className="flex items-center justify-between px-5 py-3.5 border-b border-[#E8D9C0] hover:bg-[#F5EFE6] transition-colors duration-200 group"
    >
      <span className="text-[#5A4535] text-sm group-hover:text-[#2C1810] transition-colors">{name}</span>
      <div className="flex items-center shrink-0 ml-4">
        <span className="text-[#8B5A2B] font-semibold text-sm">₹{price.toLocaleString("en-IN")}</span>
        <BookNowButton service={name} price={price} />
      </div>
    </motion.div>
  );
}

function ServiceTable({ services }) {
  return (
    <div className="rounded-xl overflow-hidden border border-[#E8D9C0]">
      {services.map((s, i) => (
        <ServiceRow key={s.name} name={s.name} price={s.price} index={i} />
      ))}
    </div>
  );
}

function AccordionSection({ eyebrow, title, subtitle, services, children }) {
  const [open, setOpen] = useState(true);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      className="mb-12"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between mb-6 group"
      >
        <div className="text-left">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#C8A96E] font-semibold mb-1">{eyebrow}</p>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#2C1810] group-hover:text-[#8B5A2B] transition-colors">{title}</h2>
          {subtitle && <p className="text-[#7A6050] text-xs mt-1">{subtitle}</p>}
        </div>
        <div className="w-8 h-8 rounded-full border border-[#E8D9C0] flex items-center justify-center text-[#8B5A2B] group-hover:border-[#C8A96E]/60 transition-colors shrink-0 ml-4">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>
      {open && (children || <ServiceTable services={services} />)}
    </motion.section>
  );
}

function ComboCard({ combo, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-2xl border border-[#E8D9C0] p-6 hover:border-[#C8A96E]/60 hover:shadow-[0_12px_50px_rgba(200,169,110,0.12)] transition-all duration-500"
    >
      <div className="flex items-start justify-between mb-4">
        <h4 className="font-serif text-lg font-bold text-[#2C1810] leading-snug pr-3">{combo.name}</h4>
        <span className="text-[#8B5A2B] font-bold text-lg shrink-0">₹{combo.price.toLocaleString("en-IN")}</span>
      </div>
      {combo.note && (
        <p className="text-[10px] tracking-[0.15em] uppercase text-[#C8A96E] font-semibold mb-3">{combo.note}</p>
      )}
      <ul className="space-y-1.5 mb-4">
        {combo.items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-[#7A6050] text-sm">
            <span className="w-1 h-1 rounded-full bg-[#C8A96E] shrink-0" />
            {item}
          </li>
        ))}
      </ul>
      <p className="text-[#9A7A60] text-xs italic leading-relaxed mb-1">{combo.desc}</p>
      <BookNowButton service={combo.name} price={combo.price} size="lg" />
    </motion.div>
  );
}

function WhyCard({ point, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { icon: Icon, title, desc } = point;
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: (index % 4) * 0.08 }}
      className="group bg-white rounded-2xl border border-[#E8D9C0] p-6 hover:border-[#C8A96E]/60 hover:shadow-[0_12px_50px_rgba(200,169,110,0.12)] transition-all duration-500 flex gap-4"
    >
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C8A96E]/20 to-[#8B5A2B]/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
        <Icon size={20} className="text-[#8B5A2B]" />
      </div>
      <div>
        <h4 className="font-serif text-base font-bold text-[#2C1810] mb-1.5">{title}</h4>
        <p className="text-[#7A6050] text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

function PremiumBanner() {
  const badges = [
    { icon: Shield, text: "Sterilized Tools" },
    { icon: Award, text: "L'Oreal & Wella Certified" },
    { icon: CheckCircle, text: "Patch Test Guaranteed" },
    { icon: Sparkles, text: "Premium Products Only" },
    { icon: Heart, text: "No Hidden Charges" },
    { icon: Clock, text: "On-Time Appointments" },
  ];
  return (
    <div className="bg-[#F5EFE6] border-y border-[#E8D9C0] py-5 mb-16 overflow-hidden">
      <div className="flex gap-10 animate-marquee whitespace-nowrap">
        {[...badges, ...badges].map((b, i) => {
          const Icon = b.icon;
          return (
            <span key={i} className="inline-flex items-center gap-2.5 text-[#8B5A2B] text-xs tracking-widest uppercase font-semibold shrink-0">
              <Icon size={13} className="text-[#C8A96E]" />
              {b.text}
              <span className="text-[#C8A96E]/40 ml-4">✦</span>
            </span>
          );
        })}
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 22s linear infinite; }
      `}</style>
    </div>
  );
}

// ─── SEO ────────────────────────────────────────────────────────────────────

function ServicesSEO() {
  const SITE_URL = "https://www.velvetluxurysalon.com"; // update to your real domain
  const pageUrl = `${SITE_URL}/services`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Velvet Premium Unisex Salon",
    "image": `${SITE_URL}/og-image.jpg`,
    "url": SITE_URL,
    "telephone": "+919345678646",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Opposite to ICICI bank, KK Nagar, Kalingarayanpalayam",
      "addressLocality": "Bhavani, Erode",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN",
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Salon Services",
      "itemListElement": ALL_SERVICES_FOR_SEO.map((s) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": s.name,
        },
        "price": s.price,
        "priceCurrency": "INR",
      })),
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": pageUrl },
    ],
  };

  return (
    <Helmet>
      <title>Salon Services & Price List | Velvet Premium Unisex Salon, Bhavani Erode</title>
      <meta
        name="description"
        content="Explore Velvet Premium Unisex Salon's full price list — haircuts, colouring, hair spa, facials, waxing, bridal makeup & signature combos in Bhavani, Erode. Book your appointment in seconds."
      />
      <meta
        name="keywords"
        content="unisex salon Erode, salon price list Bhavani, hair spa Erode, bridal makeup Bhavani, hair colouring salon, facial spa Erode, Velvet salon services"
      />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Salon Services & Price List | Velvet Premium Unisex Salon" />
      <meta
        property="og:description"
        content="Full service menu with transparent pricing — haircuts, colour, hair spa, facials, waxing, bridal packages & combos."
      />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Salon Services & Price List | Velvet Premium Unisex Salon" />
      <meta
        name="twitter:description"
        content="Explore our full menu of grooming, hair, skin and bridal services with transparent pricing."
      />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
    </Helmet>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

export default function Services() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-20">
      <ServicesSEO />

      {/* Hero */}
      <section className="py-16 md:py-24 px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs tracking-[0.3em] uppercase text-[#C8A96E] font-semibold mb-3"
        >
          Our Offerings
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-serif text-4xl md:text-6xl font-bold text-[#2C1810] mb-5"
        >
          Curated Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-[#7A6050] text-base md:text-lg max-w-xl mx-auto leading-relaxed"
        >
          Every treatment is delivered with premium products, sterilized tools, and a team trained to bring out the best in you.
        </motion.p>
      </section>

      {/* Marquee Banner */}
      <PremiumBanner />

      {/* Service Sections */}
      <div className="max-w-5xl mx-auto px-6 pb-16">

        <AccordionSection eyebrow="For Him" title="Men Services" subtitle="Grooming & Colour — Premium tools, certified colourists" services={menServices} />
        <AccordionSection eyebrow="For Her" title="Women Hair & Chemical Services" subtitle="From everyday cuts to advanced chemical treatments" services={womenServices} />
        <AccordionSection eyebrow="Restore & Revive" title="Hair Spa & Massage Services" subtitle="Wella & L'Oreal professional treatments for deep nourishment" services={hairSpaServices} />
        <AccordionSection eyebrow="Glow Up" title="Facials & Skin Care" subtitle="From herbal cleanups to advanced Hydra Facials — all skin-tested" services={facialServices} />
        <AccordionSection eyebrow="Smooth & Precise" title="Waxing & Hair Removal" subtitle="Threading, regular & flavoured wax — hygienic disposable strips only" services={waxingServices} />
        <AccordionSection eyebrow="Your Big Moment" title="Bridal Services & Makeup" subtitle="Manicures, pedicures, and full bridal packages for your special day" services={bridalServices} />
        <AccordionSection eyebrow="For Everyone" title="Unisex Services & Relaxation" subtitle="Shampoos, head massages, and relaxing treatments for all" services={unisexServices} />

        {/* Signature Combos */}
        <section className="mt-4 mb-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-[#C8A96E] font-semibold mb-2">Best Value</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2C1810] mb-3">Signature Combos</h2>
            <p className="text-[#7A6050] text-sm md:text-base max-w-xl mx-auto leading-relaxed">Handpicked bundles that deliver more for less — no compromise on quality.</p>
          </motion.div>

          <div className="mb-8">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#C8A96E] font-semibold mb-4">Men Signature Combos</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {menCombos.map((c, i) => <ComboCard key={c.name} combo={c} index={i} />)}
            </div>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#C8A96E] font-semibold mb-4">Women Luxury Combos</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {womenCombos.map((c, i) => <ComboCard key={c.name} combo={c} index={i} />)}
            </div>
          </div>
        </section>

        {/* Why Choose Velvet */}
        <section className="mb-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-[#C8A96E] font-semibold mb-2">Why Velvet</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2C1810] mb-3">The Velvet Promise</h2>
            <p className="text-[#7A6050] text-sm md:text-base max-w-xl mx-auto leading-relaxed">We don't just style you — we commit to standards that make every visit worth it.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whyChoosePoints.map((p, i) => <WhyCard key={p.title} point={p} index={i} />)}
          </div>
        </section>

        {/* Premium Products */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl border border-[#E8D9C0] p-8 md:p-12"
          >
            <div className="text-center mb-10">
              <p className="text-xs tracking-[0.3em] uppercase text-[#C8A96E] font-semibold mb-2">Our Standard</p>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#2C1810] mb-3">Premium Products. No Exceptions.</h2>
              <p className="text-[#7A6050] text-sm max-w-lg mx-auto leading-relaxed">
                Every product in our salon is sourced from globally certified brands. We never substitute with unbranded alternatives — your hair and skin deserve the best.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  brand: "L'Oreal Professionnel",
                  desc: "Used for our hair spas, colour treatments, detox, and anti-dandruff services. Salon-exclusive range not available in retail stores.",
                  tags: ["Hair Spa", "Colouring", "Detox", "Anti Dandruff"],
                },
                {
                  brand: "Wella System Professional",
                  desc: "Our Wella Hair Spa uses the complete Wella SP system — a professional-grade nourishment protocol for deeply damaged or chemically treated hair.",
                  tags: ["Hair Spa", "Strengthening", "Scalp Care"],
                },
                {
                  brand: "O3+ & Professional Facials",
                  desc: "Our O3+, Hydra Facial, and Platinum Glow services use dermatologist-recommended formulations trusted by skin clinics across India.",
                  tags: ["Facials", "Skin Brightening", "Anti-Ageing"],
                },
              ].map((p) => (
                <div key={p.brand} className="border border-[#E8D9C0] rounded-xl p-5 hover:border-[#C8A96E]/60 transition-colors">
                  <h4 className="font-serif text-base font-bold text-[#8B5A2B] mb-2">{p.brand}</h4>
                  <p className="text-[#7A6050] text-xs leading-relaxed mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[9px] tracking-wider uppercase font-semibold px-2 py-1 rounded-full bg-[#C8A96E]/10 text-[#8B5A2B] border border-[#C8A96E]/25">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Hygiene & Safety */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#F5EFE6] rounded-2xl border border-[#E8D9C0] p-8 md:p-12"
          >
            <div className="text-center mb-10">
              <Shield size={28} className="text-[#C8A96E] mx-auto mb-3" />
              <p className="text-xs tracking-[0.3em] uppercase text-[#C8A96E] font-semibold mb-2">Non-Negotiable</p>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#2C1810] mb-3">Hygiene & Safety Standards</h2>
              <p className="text-[#7A6050] text-sm max-w-lg mx-auto leading-relaxed">
                At Velvet, cleanliness is not a checklist — it's a culture. Every single visit, without fail.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: "Tool Sterilization", detail: "All scissors, combs, and metal tools are autoclave-sterilized or disinfected with hospital-grade solution between each client." },
                { title: "Single-Use Applicators", detail: "Wax sticks, sponges, disposable gloves, and cotton — used once, discarded immediately. Never reused." },
                { title: "Fresh Linen Every Time", detail: "Towels and neck strips are laundered between each appointment. Disposable alternatives available on request." },
                { title: "Patch Test Protocol", detail: "All chemical services — colour, bleach, smoothening — begin with a mandatory patch test. No exceptions." },
                { title: "Ammonia-Free Options", detail: "Sensitive clients can request ammonia-free colouring and chemical services across all applicable treatments." },
                { title: "Clean Stations Always", detail: "Each styling station is sanitized after every client. Shared surfaces, door handles, and seating areas are wiped regularly." },
              ].map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex gap-3 p-4 rounded-xl bg-white border border-[#E8D9C0]"
                >
                  <CheckCircle size={16} className="text-[#C8A96E] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#2C1810] text-sm font-semibold mb-1">{s.title}</p>
                    <p className="text-[#7A6050] text-xs leading-relaxed">{s.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>

      {/* Bottom CTA */}
      <section className="py-16 bg-[#F5EFE6]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Crown size={28} className="text-[#C8A96E] mx-auto mb-4" />
          <h2 className="font-serif text-3xl md:text-4xl text-[#2C1810] font-bold mb-3">
            Need something bespoke?
          </h2>
          <p className="text-[#7A6050] text-sm md:text-base mb-8">
            Our concierge team is on hand to craft any experience you can imagine.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C8A96E] to-[#8B5A2B] text-white font-semibold text-sm tracking-widest uppercase hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Contact Concierge
          </a>
        </div>
      </section>
    </div>
  );
}