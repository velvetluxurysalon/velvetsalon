import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle, Wallet, CreditCard, MapPin, Phone, Globe } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const walletTiers = [
  {
    name: "Silver Vault",
    pay: "₹2,000",
    receive: "₹2,400",
    desc: "Pay ₹2,000 and receive a ₹2,400 balance loaded directly into your account.",
  },
  {
    name: "Gold Vault",
    pay: "₹5,000",
    receive: "₹6,200",
    desc: "Pay ₹5,000 and receive a ₹6,200 balance loaded directly into your account.",
  },
  {
    name: "Royal Vault",
    pay: "₹10,000",
    receive: "₹13,000",
    desc: "Pay ₹10,000 and receive a ₹13,000 balance loaded directly into your account.",
  },
];

const walletPerks = [
  "Wallet balances remain strictly valid for 12 months from the date of purchase.",
  "Can be redeemed seamlessly across any grooming, luxury skin care, or chemical option on the menu.",
];

const annualPerks = [
  {
    title: "6 Complimentary Haircuts",
    desc: "Valid for Basic or Advanced haircuts (limited to a maximum of 1 visit every 2 months).",
  },
  {
    title: "2 Complimentary Massages",
    desc: "Enjoy relaxing, premium Soothing Head Massages (Coconut or Olive variants).",
  },
  {
    title: "Flat 15% Off Discount",
    desc: "Enjoy immediate savings on all high-end premium chemical hair or skin care options.",
  },
  {
    title: "Priority Slot Configuration",
    desc: "Priority slot configuration on weekends for ultimate comfort and minimized wait times.",
  },
];

const faqs = [
  { q: "Are membership benefits transferable?", a: "No. Membership balances and benefits are bound to a single user profile and are strictly non-transferable." },
  { q: "Do I need to book in advance?", a: "Prior appointment bookings are highly recommended to ensure your preferred time slot." },
  { q: "Are rates subject to change?", a: "Rates and benefits are subject to standard salon operational guidelines." },
];

function AnimatedSection({ children, delay = 0 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Membership() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-20">

      {/* Hero */}
      <section className="py-14 md:py-20 px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs tracking-[0.3em] uppercase text-[#C8A96E] font-semibold mb-3"
        >
          Velvet Premium Unisex Salon
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-serif text-4xl md:text-6xl font-bold text-[#2C1810] mb-4"
        >
          Membership Programs
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-[#7A6050] text-base md:text-lg max-w-xl mx-auto leading-relaxed"
        >
          Experience <span className="text-[#8B5A2B] font-semibold">premium grooming redefined.</span> Enjoy unmatched upfront value, international-grade styling, uncompromising safety, and luxury comfort.
        </motion.p>
      </section>

      <div className="max-w-5xl mx-auto px-6 pb-20 space-y-10">

        {/* ── Program 1: Velvet Bank Wallet ── */}
        <AnimatedSection>
          <div className="bg-white rounded-3xl border-2 border-[#E8D9C0] overflow-hidden hover:border-[#C8A96E]/60 hover:shadow-[0_12px_50px_rgba(200,169,110,0.12)] transition-all duration-500">
            {/* Header bar */}
            <div className="bg-gradient-to-r from-[#C8A96E]/15 to-[#FAF7F2] border-b border-[#E8D9C0] px-8 py-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C8A96E] to-[#8B5A2B] flex items-center justify-center shrink-0 shadow-md">
                  <span className="text-white font-serif font-bold text-lg">1</span>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#C8A96E] font-semibold mb-0.5">Program One</p>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#2C1810]">The Velvet Bank Wallet</h2>
                </div>
              </div>
              <div className="sm:ml-auto flex items-center gap-2">
                <Wallet size={16} className="text-[#C8A96E]" />
                <span className="text-sm font-semibold text-[#8B5A2B] tracking-wide">₹2,000 / ₹5,000 / ₹10,000</span>
              </div>
            </div>

            <div className="p-8">
              {/* Vault tiers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
                {walletTiers.map((t) => (
                  <div
                    key={t.name}
                    className="rounded-2xl border border-[#E8D9C0] bg-[#FAF7F2] p-5 hover:border-[#C8A96E]/50 transition-colors"
                  >
                    <p className="text-xs tracking-[0.15em] uppercase text-[#C8A96E] font-bold mb-2">{t.name}</p>
                    <p className="text-[#7A6050] text-sm leading-relaxed">
                      Pay <span className="font-semibold text-[#2C1810]">{t.pay}</span> and receive a{" "}
                      <span className="font-bold text-[#8B5A2B]">{t.receive}</span> balance loaded directly into your account.
                    </p>
                  </div>
                ))}
              </div>

              {/* Wallet perks */}
              <div className="space-y-3">
                {walletPerks.map((p) => (
                  <div key={p} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-[#C8A96E] shrink-0 mt-0.5" />
                    <p className="text-sm text-[#7A6050] leading-relaxed">{p}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ── Program 2: Grooming Essentials Annual Pass ── */}
        <AnimatedSection delay={0.1}>
          <div className="bg-white rounded-3xl border-2 border-[#E8D9C0] overflow-hidden hover:border-[#C8A96E]/60 hover:shadow-[0_12px_50px_rgba(200,169,110,0.12)] transition-all duration-500">
            {/* Header bar */}
            <div className="bg-gradient-to-r from-[#C8A96E]/15 to-[#FAF7F2] border-b border-[#E8D9C0] px-8 py-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C8A96E] to-[#8B5A2B] flex items-center justify-center shrink-0 shadow-md">
                  <span className="text-white font-serif font-bold text-lg">2</span>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#C8A96E] font-semibold mb-0.5">Program Two</p>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#2C1810]">Grooming Essentials Annual Pass</h2>
                </div>
              </div>
              <div className="sm:ml-auto flex items-center gap-2">
                <CreditCard size={16} className="text-[#C8A96E]" />
                <span className="text-sm font-semibold text-[#8B5A2B] tracking-wide">₹2,999 / Year</span>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {annualPerks.map((p) => (
                  <div key={p.title} className="flex items-start gap-3 rounded-2xl border border-[#E8D9C0] bg-[#FAF7F2] p-5 hover:border-[#C8A96E]/50 transition-colors">
                    <CheckCircle size={16} className="text-[#C8A96E] shrink-0 mt-0.5" />
                    <p className="text-sm text-[#7A6050] leading-relaxed">
                      <span className="font-semibold text-[#2C1810]">{p.title}:</span> {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ── Terms / FAQ ── */}
        <AnimatedSection delay={0.15}>
          <div className="bg-[#F5EFE6] rounded-3xl border border-[#E8D9C0] p-8">
            <h3 className="font-serif text-2xl font-bold text-[#2C1810] mb-6 text-center">Terms & Conditions</h3>
            <div className="space-y-4 max-w-2xl mx-auto">
              {faqs.map(({ q, a }) => (
                <div key={q} className="bg-white rounded-2xl p-5 border border-[#E8D9C0]">
                  <p className="font-semibold text-[#2C1810] text-sm mb-1.5">{q}</p>
                  <p className="text-sm text-[#7A6050] leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ── Contact Footer ── */}
        <AnimatedSection delay={0.2}>
          <div className="text-center py-6">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#C8A96E] font-semibold mb-2">Visit Us</p>
            <p className="font-serif text-xl font-bold text-[#2C1810] mb-5">Velvet Premium Unisex Salon</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 text-sm text-[#7A6050]">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-[#C8A96E]" />
                Laxminagar, Bhavani
              </span>
              <span className="hidden sm:block text-[#E8D9C0]">|</span>
              <span className="flex items-center gap-1.5">
                <Phone size={14} className="text-[#C8A96E]" />
                +91 9345678646
              </span>
              <span className="hidden sm:block text-[#E8D9C0]">|</span>
              <span className="flex items-center gap-1.5">
                <Globe size={14} className="text-[#C8A96E]" />
                www.velvetluxurysalon.in
              </span>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}