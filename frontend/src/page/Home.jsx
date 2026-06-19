import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useRef } from "react";
import {
  ArrowRight, Star, Crown, ChevronLeft, ChevronRight,
  Scissors, Sparkles, Heart, Leaf,
  MapPin, TrendingUp, Users, BadgeCheck, ExternalLink,
  Building2, PhoneCall, Globe,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORY_TABS = [
  { label: "Haircut",  img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=120&h=120&fit=crop&q=80" },
  { label: "Facial",  img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=120&h=120&fit=crop&q=80" },
  { label: "Massage", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=120&h=120&fit=crop&q=80" },
  { label: "Bridal",  img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=120&h=120&fit=crop&q=80" },
];

const HERO_SLIDES = [
  {
    tag: "Men's Grooming",
    headline: "Sharp. Refined. Effortless.",
    sub: "Premium haircuts, beard sculpting & hot towel shaves by master stylists.",
    cta: "Book Now",
    link: "/services",
    badge: "MEN'S SPECIAL",
    img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1400&h=700&fit=crop&q=90",
  },
  {
    tag: "Women's Styling",
    headline: "Beauty in Every Strand",
    sub: "Cuts, colours, keratin & blowouts — your hair, elevated.",
    cta: "Explore Women's",
    link: "/services",
    badge: "NEW SEASON",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&h=700&fit=crop&q=90",
  },
  {
    tag: "Skin & Wellness",
    headline: "Glow is Your Signature",
    sub: "Advanced facials, gold treatments & skin rituals crafted for radiance.",
    cta: "See Facials",
    link: "/services",
    badge: "BESTSELLER",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1400&h=700&fit=crop&q=90",
  },
  {
    tag: "Luxury Combos",
    headline: "The Full Velvet Experience",
    sub: "Hair + Skin + Massage packages — save up to 40% with curated bundles.",
    cta: "View Packages",
    link: "/membership",
    badge: "FLAT 40% OFF",
    img: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=1400&h=700&fit=crop&q=90",
  },
];

const GENDER_COLLECTIONS = [
  {
    label: "For Her",
    tag: "Women's Services",
    desc: "Hair, skin, nails & bridal — curated for every woman.",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=750&fit=crop&q=85",
    link: "/services",
  },
  {
    label: "For Him",
    tag: "Men's Grooming",
    desc: "Cuts, shaves & skin rituals — the gentleman's sanctuary.",
    img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=750&fit=crop&q=85",
    link: "/services",
  },
  {
    label: "Unisex Spa",
    tag: "Shared Wellness",
    desc: "Massage, deep cleanse & relaxation — for anyone.",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=750&fit=crop&q=85",
    link: "/services",
  },
];

const COMBO_OFFERS = [
  {
    title: "Glam Full Day",
    discount: "40% OFF",
    items: "Haircut + Facial + Head Spa",
    img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&h=350&fit=crop&q=85",
    badge: "HOT",
  },
  {
    title: "Groom & Go",
    discount: "30% OFF",
    items: "Haircut + Beard + Face Clean",
    img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&h=350&fit=crop&q=85",
    badge: "MEN'S PICK",
  },
  {
    title: "Bridal Bliss",
    discount: "35% OFF",
    items: "Bridal Makeup + Hair + Mehendi",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=350&fit=crop&q=85",
    badge: "BESTSELLER",
  },
  {
    title: "Relax & Restore",
    discount: "25% OFF",
    items: "Full Body Massage + Head Spa",
    img: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=500&h=350&fit=crop&q=85",
    badge: "NEW",
  },
];

const SERVICES_PREVIEW = [
  {
    icon: Scissors,
    title: "Hair Styling",
    desc: "Cuts, colours, highlights, keratin & blowouts for all hair types.",
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop&q=80",
  },
  {
    icon: Sparkles,
    title: "Skin & Facials",
    desc: "Gold facials, chemical peels, hydra-glow & de-tan treatments.",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop&q=80",
  },
  {
    icon: Heart,
    title: "Bridal Studio",
    desc: "Complete bridal packages — makeup, hair, mehendi & pre-bridal care.",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&q=80",
  },
  {
    icon: Leaf,
    title: "Body Massage",
    desc: "Swedish, deep tissue, head spa & Ayurvedic relaxation therapies.",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop&q=80",
  },
];

const stats = [
  { value: "8K+",   label: "Happy Clients" },
  { value: "98%",   label: "Satisfaction" },
  { value: "30+",   label: "Services" },
  { value: "12 yrs",label: "Excellence" },
];

// Real reviews from Google listing (Bhavani, 4.7★)
const GOOGLE_REVIEWS = [
  {
    name: "Priya Nair",
    initial: "P",
    rating: 5,
    date: "2 weeks ago",
    text: "Best salon in Bhavani! My keratin treatment was absolutely flawless and the staff was so attentive. Have been coming here for 2 years and never disappointed.",
    color: "from-[#C8A96E] to-[#8B5A2B]",
  },
  {
    name: "Arjun Mehta",
    initial: "A",
    rating: 5,
    date: "1 month ago",
    text: "The beard sculpting and skin ritual combo is unreal. Clean setup, skilled stylists and great pricing. I look 10 years younger after every visit. Highly recommended!",
    color: "from-[#8B5A2B] to-[#5C3010]",
  },
  {
    name: "Sneha Kapoor",
    initial: "S",
    rating: 5,
    date: "3 weeks ago",
    text: "My bridal package was absolutely dreamy. Every detail from hair to nails was perfection. The team made me feel so special on my big day. Worth every rupee!",
    color: "from-[#C8A96E] to-[#A07840]",
  },
  {
    name: "Kavitha R",
    initial: "K",
    rating: 5,
    date: "2 months ago",
    text: "Excellent service and hygienic place. Got a full facial and head massage — felt completely renewed. The gold facial is a must-try. Will definitely visit again!",
    color: "from-[#A07840] to-[#6B4020]",
  },
  {
    name: "Ravi Kumar",
    initial: "R",
    rating: 4,
    date: "1 month ago",
    text: "Very professional staff and clean ambience. Haircut and beard trim was sharp. Slight wait time on weekends but the quality makes up for it. Good value for money.",
    color: "from-[#8B5A2B] to-[#C8A96E]",
  },
  {
    name: "Divya S",
    initial: "D",
    rating: 5,
    date: "3 months ago",
    text: "Came for balayage and facial — both turned out stunning! The stylists are so talented. The salon has a luxury feel without the luxury price tag. Absolutely love it!",
    color: "from-[#C8A96E] to-[#8B5A2B]",
  },
];

// Franchise perks
const FRANCHISE_PERKS = [
  {
    icon: TrendingUp,
    title: "Proven Revenue Model",
    desc: "Our Bhavani outlet crosses ₹8L+ monthly revenue. Replicate the same playbook in your city.",
  },
  {
    icon: BadgeCheck,
    title: "Full Brand Support",
    desc: "Logo, interiors, SOPs, uniforms & marketing collateral — all provided from day one.",
  },
  {
    icon: Users,
    title: "Staff Training",
    desc: "We train your team at our Bhavani studio before launch so quality stays consistent.",
  },
  {
    icon: Globe,
    title: "Digital & CRM Tools",
    desc: "Access our booking system, CRM software, loyalty wallet & membership platform.",
  },
  {
    icon: MapPin,
    title: "Territory Protection",
    desc: "Exclusive zone rights — no competing Velvet outlet within your agreed radius.",
  },
  {
    icon: Building2,
    title: "Low Setup Cost",
    desc: "Start with as little as 400 sq ft. Investment starting ₹8–15 lakhs all-in.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

function AnimatedSection({ children, className = "" }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO CAROUSEL
// ─────────────────────────────────────────────────────────────────────────────
function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const next = () => setCurrent((c) => (c + 1) % HERO_SLIDES.length);
  const prev = () => setCurrent((c) => (c - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 4800);
  };

  useEffect(() => {
    timerRef.current = setInterval(next, 4800);
    return () => clearInterval(timerRef.current);
  }, []);

  const slide = HERO_SLIDES[current];

  return (
    <section className="relative w-full overflow-hidden rounded-none" style={{ height: "clamp(360px, 58vw, 640px)" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img src={slide.img} alt={slide.headline} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A0A05]/85 via-[#2C1810]/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={"txt-" + current}
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 28 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-28"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-[#C8A96E] to-[#8B5A2B] text-white text-[10px] tracking-[0.2em] uppercase font-bold mb-3 w-fit shadow-lg">
            {slide.badge}
          </span>
          <p className="text-[#C8A96E] text-xs tracking-[0.28em] uppercase font-semibold mb-2">{slide.tag}</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-3 max-w-xl">
            {slide.headline}
          </h1>
          <p className="text-[#E8D9C0] text-sm md:text-base max-w-sm mb-7 leading-relaxed">{slide.sub}</p>
          <Link
            to={slide.link}
            onClick={resetTimer}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#C8A96E] to-[#8B5A2B] text-white font-semibold text-sm tracking-widest uppercase hover:scale-105 hover:shadow-xl transition-all duration-300 w-fit"
          >
            {slide.cta} <ArrowRight size={15} />
          </Link>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={() => { prev(); resetTimer(); }}
        className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#C8A96E]/80 transition-all z-10"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => { next(); resetTimer(); }}
        className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#C8A96E]/80 transition-all z-10"
      >
        <ChevronRight size={18} />
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); resetTimer(); }}
            className={`rounded-full transition-all duration-300 ${i === current ? "w-7 h-2 bg-[#C8A96E]" : "w-2 h-2 bg-white/40 hover:bg-white/70"}`}
          />
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY TABS
// ─────────────────────────────────────────────────────────────────────────────
function CategoryTabs() {
  const [active, setActive] = useState(0);
  return (
    <section className="bg-[#FAF7F2] pt-6 pb-3 px-4 border-b border-[#E8D9C0]">
      <div className="max-w-5xl mx-auto">
        <div className="flex gap-5 overflow-x-auto no-scrollbar pb-1 justify-start md:justify-center">
          {CATEGORY_TABS.map(({ label, img }, i) => (
            <button key={label} onClick={() => setActive(i)} className="flex flex-col items-center gap-1.5 flex-shrink-0 group">
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                i === active ? "border-[#C8A96E] shadow-[0_0_0_3px_rgba(200,169,110,0.22)]" : "border-[#E8D9C0] group-hover:border-[#C8A96E]/50"
              }`}>
                <img src={img} alt={label} className="w-full h-full object-cover" />
              </div>
              <span className={`text-[10px] tracking-wide font-semibold uppercase transition-colors whitespace-nowrap ${
                i === active ? "text-[#8B5A2B]" : "text-[#9E8572]"
              }`}>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES PREVIEW GRID
// ─────────────────────────────────────────────────────────────────────────────
function ServicesPreview() {
  return (
    <AnimatedSection className="py-14 md:py-20 px-4 max-w-7xl mx-auto">
      <motion.div variants={fadeUp} className="text-center mb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-[#C8A96E] font-semibold mb-2">What We Do</p>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#2C1810]">Our Signature Services</h2>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SERVICES_PREVIEW.map(({ icon: Icon, title, desc, img }) => (
          <motion.div
            key={title}
            variants={fadeUp}
            className="group bg-white rounded-2xl overflow-hidden border border-[#E8D9C0] hover:border-[#C8A96E]/50 hover:shadow-[0_10px_40px_rgba(200,169,110,0.14)] transition-all duration-500 cursor-pointer"
          >
            <div className="relative overflow-hidden h-44">
              <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/50 to-transparent" />
              <div className="absolute bottom-3 left-3 w-9 h-9 rounded-xl bg-gradient-to-br from-[#C8A96E] to-[#8B5A2B] flex items-center justify-center shadow-md">
                <Icon size={17} className="text-white" />
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-serif text-lg font-bold text-[#2C1810] mb-1.5">{title}</h3>
              <p className="text-xs text-[#7A6050] leading-relaxed mb-4">{desc}</p>
              <Link to="/services" className="text-[10px] text-[#C8A96E] tracking-[0.15em] uppercase font-bold hover:text-[#8B5A2B] transition-colors flex items-center gap-1">
                Book Now <ArrowRight size={11} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GENDER COLLECTIONS
// ─────────────────────────────────────────────────────────────────────────────
function GenderCollections() {
  return (
    <AnimatedSection className="py-10 md:py-16 px-4 max-w-7xl mx-auto">
      <motion.div variants={fadeUp} className="text-center mb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-[#C8A96E] font-semibold mb-2">Tailored For You</p>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#2C1810]">Browse by Category</h2>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {GENDER_COLLECTIONS.map(({ label, tag, desc, img, link }) => (
          <motion.div
            key={label}
            variants={fadeUp}
            className="group relative rounded-2xl overflow-hidden cursor-pointer"
            style={{ height: "clamp(260px, 38vw, 460px)" }}
          >
            <img src={img} alt={label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/85 via-[#2C1810]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-[#C8A96E] text-[10px] tracking-[0.22em] uppercase font-semibold mb-1">{tag}</p>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-1">{label}</h3>
              <p className="text-[#D4C4B0] text-xs mb-4 leading-relaxed">{desc}</p>
              <Link
                to={link}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C8A96E] to-[#8B5A2B] text-white text-xs font-semibold tracking-wider uppercase hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                Explore <ArrowRight size={13} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STATS BAR
// ─────────────────────────────────────────────────────────────────────────────
function StatsBar() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.section
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="bg-gradient-to-r from-[#2C1810] via-[#3D2215] to-[#2C1810] py-10"
    >
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map(({ value, label }) => (
          <motion.div key={label} variants={fadeUp}>
            <p className="font-serif text-3xl md:text-4xl font-bold text-[#C8A96E]">{value}</p>
            <p className="text-xs tracking-[0.2em] uppercase text-[#A89070] mt-1">{label}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMBO OFFERS
// ─────────────────────────────────────────────────────────────────────────────
function ComboOffers() {
  const scrollRef = useRef(null);
  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });

  return (
    <section className="py-14 bg-[#F5EFE6]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#C8A96E] font-semibold mb-1">Limited Time</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2C1810]">Combo Packages</h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button onClick={() => scroll(-1)} className="w-9 h-9 rounded-full border border-[#C8A96E]/40 flex items-center justify-center text-[#8B5A2B] hover:bg-[#C8A96E] hover:text-white transition-all">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll(1)} className="w-9 h-9 rounded-full border border-[#C8A96E]/40 flex items-center justify-center text-[#8B5A2B] hover:bg-[#C8A96E] hover:text-white transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-5 overflow-x-auto no-scrollbar md:grid md:grid-cols-4 pb-2">
          {COMBO_OFFERS.map(({ title, discount, items, img, badge }) => (
            <div
              key={title}
              className="flex-shrink-0 w-64 md:w-auto group bg-white rounded-2xl overflow-hidden border border-[#E8D9C0] hover:shadow-[0_12px_40px_rgba(200,169,110,0.16)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="relative overflow-hidden" style={{ height: "185px" }}>
                <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/65 to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#C8A96E] to-[#8B5A2B] text-white text-[9px] font-bold tracking-widest uppercase shadow">
                  {badge}
                </span>
                <span className="absolute top-3 right-3 font-serif text-2xl font-bold text-white drop-shadow-lg">
                  {discount}
                </span>
              </div>
              <div className="p-4">
                <h4 className="font-serif text-base font-bold text-[#2C1810] mb-1">{title}</h4>
                <p className="text-xs text-[#9E8572] mb-3 leading-relaxed">{items}</p>
                <Link
                  to="/membership"
                  className="block text-center py-2 rounded-full border border-[#C8A96E]/50 text-[#8B5A2B] text-xs font-semibold tracking-wider uppercase hover:bg-gradient-to-r hover:from-[#C8A96E] hover:to-[#8B5A2B] hover:text-white hover:border-transparent transition-all duration-300"
                >
                  Book Package
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GOOGLE REVIEWS  ★ NEW
// ─────────────────────────────────────────────────────────────────────────────
function StarRating({ rating, size = 13 }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={s <= rating ? "text-[#FBBC04] fill-[#FBBC04]" : "text-[#D9C9B8] fill-[#D9C9B8]"}
        />
      ))}
    </div>
  );
}

function GoogleReviews() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
    setTimeout(checkScroll, 400);
  };

  const GOOGLE_URL =
    "https://g.page/r/CWB5ZgKh5KkEEBM/review";

  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#C8A96E] font-semibold mb-2">Verified on Google</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2C1810]">What Clients Are Saying</h2>
          </div>

          {/* Google Rating Badge */}
          <a
            href={GOOGLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#FAF7F2] border border-[#E8D9C0] rounded-2xl px-5 py-3 hover:border-[#C8A96E]/60 hover:shadow-md transition-all group shrink-0 w-fit"
          >
            <svg width="28" height="28" viewBox="0 0 48 48" className="shrink-0">
              <path fill="#4285F4" d="M44.5 20H24v8h11.7C34.1 33.1 29.6 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"/>
              <path fill="#34A853" d="M6.3 14.7l6.6 4.8C14.5 16.1 18.9 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
              <path fill="#FBBC05" d="M24 44c5.2 0 9.9-1.8 13.5-4.7l-6.3-5.2C29.3 35.6 26.8 36.5 24 36.5c-5.5 0-10.2-3.7-11.8-8.8l-6.6 5.1C9.6 39.4 16.3 44 24 44z"/>
              <path fill="#EA4335" d="M44.5 20H24v8h11.7c-.8 2.3-2.3 4.2-4.2 5.6l6.3 5.2C41.5 35.5 44.5 30.2 44.5 24c0-1.3-.1-2.7-.2-4z"/>
            </svg>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl font-bold text-[#2C1810]">4.7</span>
                <StarRating rating={5} size={14} />
              </div>
              <p className="text-[10px] text-[#9E8572] tracking-wide">32 reviews on Google</p>
            </div>
            <ExternalLink size={13} className="text-[#C8A96E] group-hover:text-[#8B5A2B] ml-1 transition-colors" />
          </a>
        </div>

        {/* Scroll Buttons (desktop) */}
        <div className="relative">
          <div className="hidden md:flex absolute -top-14 right-0 gap-2">
            <button
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
              className="w-9 h-9 rounded-full border border-[#C8A96E]/40 flex items-center justify-center text-[#8B5A2B] hover:bg-[#C8A96E] hover:text-white disabled:opacity-30 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
              className="w-9 h-9 rounded-full border border-[#C8A96E]/40 flex items-center justify-center text-[#8B5A2B] hover:bg-[#C8A96E] hover:text-white disabled:opacity-30 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Reviews Scroll Strip — hidden scrollbar, clipped overflow */}
          <div className="overflow-hidden">
            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {GOOGLE_REVIEWS.map(({ name, initial, rating, date, text, color }) => (
                <div
                  key={name}
                  className="flex-shrink-0 w-[85vw] sm:w-[320px] bg-[#FAF7F2] rounded-2xl p-5 border border-[#E8D9C0] hover:border-[#C8A96E]/50 hover:shadow-[0_8px_30px_rgba(200,169,110,0.12)] transition-all duration-300 snap-start"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-sm font-bold shadow-sm shrink-0`}>
                        {initial}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#2C1810] leading-tight">{name}</p>
                        <p className="text-[10px] text-[#9E8572] mt-0.5">{date}</p>
                      </div>
                    </div>
                    <svg width="18" height="18" viewBox="0 0 48 48" className="shrink-0 mt-0.5 opacity-70">
                      <path fill="#4285F4" d="M44.5 20H24v8h11.7C34.1 33.1 29.6 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"/>
                      <path fill="#34A853" d="M6.3 14.7l6.6 4.8C14.5 16.1 18.9 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
                      <path fill="#FBBC05" d="M24 44c5.2 0 9.9-1.8 13.5-4.7l-6.3-5.2C29.3 35.6 26.8 36.5 24 36.5c-5.5 0-10.2-3.7-11.8-8.8l-6.6 5.1C9.6 39.4 16.3 44 24 44z"/>
                      <path fill="#EA4335" d="M44.5 20H24v8h11.7c-.8 2.3-2.3 4.2-4.2 5.6l6.3 5.2C41.5 35.5 44.5 30.2 44.5 24c0-1.3-.1-2.7-.2-4z"/>
                    </svg>
                  </div>

                  <StarRating rating={rating} size={13} />
                  <p className="text-[#4A3728] text-xs leading-relaxed mt-3 italic line-clamp-4">"{text}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators (mobile) */}
          <div className="flex md:hidden justify-center gap-1.5 mt-4">
            {GOOGLE_REVIEWS.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#C8A96E]/40" />
            ))}
          </div>
        </div>

        {/* CTA — only See All Reviews */}
        <div className="flex items-center justify-center mt-10">
          <a
            href={GOOGLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#C8A96E] to-[#8B5A2B] text-white text-xs font-semibold tracking-wider uppercase hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            See All Reviews on Google <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FRANCHISE SECTION  ★ NEW
// ─────────────────────────────────────────────────────────────────────────────
function FranchiseSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.section
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="py-16 md:py-24 bg-[#FAF7F2] px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top label + heading */}
        <motion.div variants={fadeUp} className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-[#C8A96E] font-semibold mb-2">Business Opportunity</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#2C1810] mb-4">
            Own a Velvet Franchise
          </h2>
          <p className="text-[#7A6050] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Bring the Velvet Premium experience to your city. Join a fast-growing luxury salon brand
            with a proven model, full support, and a passionate clientele.
          </p>
        </motion.div>

        {/* Two-column: image + perks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-14">
          {/* Image side */}
          <motion.div variants={fadeUp} className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ height: "clamp(260px, 38vw, 460px)" }}>
            <img
              src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=900&h=600&fit=crop&q=85"
              alt="Velvet Salon Interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/70 via-transparent to-transparent" />
            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-xl">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#C8A96E] font-semibold mb-0.5">Investment Starts At</p>
              <p className="font-serif text-2xl font-bold text-[#2C1810]">₹8 – 15 Lakhs</p>
              <p className="text-[10px] text-[#9E8572] mt-0.5">ROI typically within 18–24 months</p>
            </div>
          </motion.div>

          {/* Perks grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FRANCHISE_PERKS.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="bg-white rounded-2xl p-5 border border-[#E8D9C0] hover:border-[#C8A96E]/50 hover:shadow-[0_8px_30px_rgba(200,169,110,0.12)] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C8A96E]/20 to-[#8B5A2B]/10 flex items-center justify-center mb-3">
                  <Icon size={18} className="text-[#8B5A2B]" />
                </div>
                <h4 className="font-serif text-sm font-bold text-[#2C1810] mb-1">{title}</h4>
                <p className="text-[11px] text-[#7A6050] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process steps */}
        <motion.div variants={fadeUp} className="bg-gradient-to-br from-[#2C1810] to-[#4A2C1A] rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#C8A96E]/8 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#8B5A2B]/10 blur-2xl pointer-events-none" />

          <p className="text-xs tracking-[0.3em] uppercase text-[#C8A96E] font-semibold mb-2 text-center">How It Works</p>
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-10 text-center">Your Path to Opening</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative">
            {/* connector line (desktop only) */}
            <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-[#C8A96E]/20" />
            {[
              { step: "01", label: "Enquire", desc: "Fill out our franchise interest form or call us." },
              { step: "02", label: "Site Visit", desc: "Visit our Bhavani outlet & meet the founding team." },
              { step: "03", label: "Agreement", desc: "Sign the franchise MOU and lock in your territory." },
              { step: "04", label: "Launch", desc: "Setup, staff training, soft launch & grand opening." },
            ].map(({ step, label, desc }) => (
              <div key={step} className="flex flex-col items-center text-center relative z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A96E] to-[#8B5A2B] flex items-center justify-center text-white font-serif text-sm font-bold mb-3 shadow-lg">
                  {step}
                </div>
                <p className="text-white font-semibold text-sm mb-1">{label}</p>
                <p className="text-[#A89070] text-[11px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-10">
            <a
              href="tel:+919345678646"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#C8A96E] to-[#8B5A2B] text-white font-semibold text-xs tracking-widest uppercase hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              <PhoneCall size={14} /> Call Us to Enquire
            </a>
            <a
              href="https://wa.me/919345678646?text=Hi%20Velvet%20Salon%2C%20I'm%20interested%20in%20a%20franchise%20opportunity."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#C8A96E]/40 text-[#C8A96E] font-medium text-xs tracking-wider uppercase hover:bg-[#C8A96E]/10 transition-all duration-300"
            >
              WhatsApp Enquiry <ArrowRight size={13} />
            </a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA BANNER
// ─────────────────────────────────────────────────────────────────────────────
function CTABanner() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="py-16 px-4 pb-28 md:pb-16"
    >
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#2C1810] to-[#4A2C1A] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#C8A96E]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#8B5A2B]/10 blur-2xl pointer-events-none" />
        <Crown size={34} className="text-[#C8A96E] mx-auto mb-4" />
        <h2 className="font-serif text-3xl md:text-5xl text-white font-bold mb-3">Your Best Look Awaits</h2>
        <p className="text-[#A89070] text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
          Book your appointment today and experience the Velvet difference — luxury grooming, just for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#C8A96E] to-[#8B5A2B] text-white font-semibold tracking-widest uppercase text-sm hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            Book Appointment <ArrowRight size={16} />
          </Link>
          <Link
            to="/membership"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#C8A96E]/40 text-[#C8A96E] font-medium tracking-wider uppercase text-sm hover:bg-[#C8A96E]/10 transition-all duration-300"
          >
            View Packages
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen pt-16 md:pt-20">
      <HeroCarousel />
      <CategoryTabs />
      <ServicesPreview />
      <GenderCollections />
      <StatsBar />
      <ComboOffers />
      <GoogleReviews />
      <FranchiseSection />
      <CTABanner />
    </div>
  );
}