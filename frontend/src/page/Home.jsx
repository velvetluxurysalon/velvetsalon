import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useRef } from "react";
import { ArrowRight, Star, Crown, ChevronLeft, ChevronRight, Scissors, Sparkles, Heart, Leaf } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORY_TABS = [
  { label: "Haircut",   img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=120&h=120&fit=crop&q=80" },
  { label: "Facial",    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=120&h=120&fit=crop&q=80" },
  { label: "Massage",   img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=120&h=120&fit=crop&q=80" },
  { label: "Nail Art",  img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=120&h=120&fit=crop&q=80" },
  { label: "Bridal",    img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=120&h=120&fit=crop&q=80" },
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
    items: "Haircut + Facial + Nail Art",
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
    title: "Nail Studio",
    desc: "Nail art, gel extensions, manicure & pedicure by expert technicians.",
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop&q=80",
  },
  {
    icon: Leaf,
    title: "Body Massage",
    desc: "Swedish, deep tissue, head spa & Ayurvedic relaxation therapies.",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop&q=80",
  },
];

const stats = [
  { value: "8K+",  label: "Happy Clients" },
  { value: "98%",  label: "Satisfaction" },
  { value: "30+",  label: "Services" },
  { value: "12 yrs", label: "Excellence" },
];

const testimonials = [
  { name: "Priya Nair",    role: "Regular Client",  text: "Best salon in the city. My hair has never looked this good. The keratin treatment was flawless!", rating: 5 },
  { name: "Arjun Mehta",  role: "Gold Member",     text: "The beard sculpting and skin ritual combo is unreal. I look 10 years younger after every visit.", rating: 5 },
  { name: "Sneha Kapoor", role: "Bridal Client",   text: "My bridal package was absolutely dreamy. Every detail was taken care of perfectly.", rating: 5 },
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
      {/* BG Image */}
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

      {/* Text */}
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

      {/* Arrows */}
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

      {/* Dots */}
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
            <button
              key={label}
              onClick={() => setActive(i)}
              className="flex flex-col items-center gap-1.5 flex-shrink-0 group"
            >
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                i === active
                  ? "border-[#C8A96E] shadow-[0_0_0_3px_rgba(200,169,110,0.22)]"
                  : "border-[#E8D9C0] group-hover:border-[#C8A96E]/50"
              }`}>
                <img src={img} alt={label} className="w-full h-full object-cover" />
              </div>
              <span className={`text-[10px] tracking-wide font-semibold uppercase transition-colors whitespace-nowrap ${
                i === active ? "text-[#8B5A2B]" : "text-[#9E8572]"
              }`}>
                {label}
              </span>
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
              <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" />
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
// TESTIMONIALS
// ─────────────────────────────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section className="py-16 md:py-22 px-4 bg-[#FAF7F2]">
      <AnimatedSection className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-[#C8A96E] font-semibold mb-2">Client Love</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2C1810]">What Our Clients Say</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map(({ name, role, text, rating }) => (
            <motion.div
              key={name}
              variants={fadeUp}
              className="bg-white rounded-2xl p-6 border border-[#E8D9C0] hover:shadow-[0_8px_30px_rgba(200,169,110,0.10)] transition-shadow duration-300"
            >
              <div className="flex gap-0.5 mb-3">
                {Array(rating).fill(0).map((_, i) => <Star key={i} size={13} className="text-[#C8A96E] fill-[#C8A96E]" />)}
              </div>
              <p className="text-[#4A3728] text-sm leading-relaxed mb-5 italic">"{text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C8A96E] to-[#8B5A2B] flex items-center justify-center text-white text-sm font-bold shadow-sm">
                  {name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#2C1810]">{name}</p>
                  <p className="text-xs text-[#C8A96E] tracking-wide">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </section>
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
        <h2 className="font-serif text-3xl md:text-5xl text-white font-bold mb-3">
          Your Best Look Awaits
        </h2>
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
      <Testimonials />
      <CTABanner />
    </div>
  );
}