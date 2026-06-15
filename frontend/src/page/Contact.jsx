import { motion } from "framer-motion";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Crown,
  Send,
  CheckCircle2,
  Clock,
  MessageCircle,
  Calendar,
  Scissors,
} from "lucide-react";

const info = [
  {
    icon: Phone,
    label: "Call Us",
    value: "9345678646",
    href: "tel:+919345678646",
  },
  {
    icon: Mail,
    label: "Email",
    value: "Velvetluxurysalon@gmail.com",
    href: "mailto:Velvetluxurysalon@gmail.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "9345678646",
    href: "https://wa.me/919345678646",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Opposite to ICICI bank, KK Nagar, Kalingarayanpalayam, Bhavani Erode Dt, Tamil Nadu",
    href: "https://maps.google.com/?q=KK+Nagar+Kalingarayanpalayam+Bhavani+Erode",
  },
  {
    icon: Clock,
    label: "Opening Hours",
    value: "Check opening hours for details — See location page for full schedule",
    href: null,
  },
];

// WhatsApp number that booking requests are sent to (with country code, no symbols)
const WHATSAPP_NUMBER = "919345678646";

// Services grouped exactly as they appear on the Services page, so guests can
// pick the precise treatment they want when booking.
const SERVICE_GROUPS = [
  {
    label: "Men Services",
    options: [
      "Hair Cut Basic",
      "Hair Cut Advanced",
      "Hair Cut Creative",
      "Beard Trim",
      "Beard Styling",
      "Shave",
      "Head Shave",
      "Pro 10 Colouring",
      "Global Colouring",
      "Premium Colouring",
      "Moustache Colour",
      "Beard Colour",
      "Beard Colour (Ammonia Free)",
    ],
  },
  {
    label: "Women Hair & Chemical Services",
    options: [
      "Kids Cut",
      "Hair Cut Basic",
      "Hair Cut Advanced",
      "Hair Cut Creative",
      "Hair Do Basic",
      "Hair Do Creative",
      "Saree Draping",
      "Root Touchup (Ammonia Free)",
      "Global Colouring",
      "Premium Colouring",
      "Henna",
      "Ironing",
      "Straightening",
      "Straightening & Shine",
      "Smoothening",
      "Rebond & Shine",
    ],
  },
  {
    label: "Hair Spa & Massage",
    options: [
      "Wella System Professional Hair Spa",
      "L'Oreal Hair Spa",
      "L'Oreal Hair Detox",
      "L'Oreal Anti Dandruff",
      "Soothing Head Massage",
      "Oil Massage (All Variants)",
      "Body Massage",
      "Body Massage With Scrub",
    ],
  },
  {
    label: "Facials & Skin Care",
    options: [
      "Herbal Cleanup",
      "Skin Miracle Facial",
      "Fruit Secret Facial",
      "Herbal Facial",
      "Oxygen Facial",
      "Platinum Glow Facial",
      "24K Gold Facial",
      "Hydra Facial",
      "O3+",
      "Bleach & Detan (Face)",
      "Bleach & Detan (Neck)",
      "Bleach & Detan (Underarms)",
      "Bleach & Detan (Full Arms)",
      "Bleach & Detan (Full Legs)",
      "Bleach & Detan (Full Body)",
    ],
  },
  {
    label: "Waxing & Hair Removal",
    options: [
      "Threading - Eyebrow",
      "Threading - Upper Lip",
      "Threading - Chin",
      "Threading - Full Face",
      "Waxing (Regular) - Half Arms",
      "Waxing (Regular) - Full Arms",
      "Waxing (Regular) - Half Legs",
      "Waxing (Regular) - Full Legs",
      "Waxing (Regular) - Full Body",
      "Flavoured Wax - Half Arms",
      "Flavoured Wax - Full Arms",
      "Flavoured Wax - Half Legs",
      "Flavoured Wax - Full Legs",
      "Flavoured Wax - Full Body",
    ],
  },
  {
    label: "Bridal Services & Makeup",
    options: [
      "Manicure",
      "Manicure Paraffin",
      "Manicure Crystal Crush",
      "Pedicure",
      "Pedicure Paraffin",
      "Pedicure Crystal Crush",
      "Heel Peel",
      "Classic Makeup",
      "Makeup",
      "Makeup MAC",
      "Bridal Package",
      "Hair Do",
      "Saree Pre Pleating",
      "Advanced Makeup",
    ],
  },
  {
    label: "Unisex & Relaxation",
    options: [
      "L'Oreal Shampoo & Conditioning",
      "Shampoo & Blow Styling",
      "Head Massage Coconut",
      "Head Massage Olive",
      "Head Massage Navaratna",
      "Head Massage Almond",
      "Dandruff Treatment",
      "Regular Manicure & Pedicure",
      "Rose Manicure & Pedicure",
      "Chocolate Manicure & Pedicure",
      "Relaxing Massage - Hand (15 min)",
      "Relaxing Massage - Feet (20 min)",
      "Relaxing Massage - Back & Neck",
    ],
  },
  {
    label: "Signature Combos",
    options: [
      "The Gentleman's Refresh",
      "The Refined Groom",
      "The Bold Statement",
      "The Velvet Glow Starter",
      "The Luxe Indulgence",
    ],
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Builds a friendly booking message and opens WhatsApp with it pre-filled.
  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedDate = form.date
      ? new Date(form.date + "T00:00:00").toLocaleDateString("en-IN", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "Not specified";

    const formattedTime = form.time
      ? new Date(`2000-01-01T${form.time}`).toLocaleTimeString("en-IN", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      : "Not specified";

    const lines = [
      "Hello Velvet Luxury Salon! ✨",
      "I'd like to book an appointment with the following details:",
      "",
      `*Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
    ];

    if (form.email) lines.push(`*Email:* ${form.email}`);

    lines.push(
      `*Service:* ${form.service || "Not specified"}`,
      `*Preferred Date:* ${formattedDate}`,
      `*Preferred Time:* ${formattedTime}`
    );

    if (form.message) lines.push("", `*Additional Notes:* ${form.message}`);

    const text = encodeURIComponent(lines.join("\n"));
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    setSent(true);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-20">
      {/* Hero */}
      <section className="py-14 md:py-20 px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs tracking-[0.3em] uppercase text-[#C8A96E] font-semibold mb-3"
        >
          Get in Touch
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-serif text-4xl md:text-6xl font-bold text-[#2C1810] mb-4"
        >
          Contact &amp; Book
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-[#7A6050] text-base max-w-md mx-auto"
        >
          Choose your service, pick a date and time, and send us your details directly on WhatsApp.
        </motion.p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-28 md:pb-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Info panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-br from-[#2C1810] to-[#4A2C1A] rounded-3xl p-8 md:p-10 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#C8A96E]/10 blur-3xl" />
          <Crown size={30} className="text-[#C8A96E] mb-6" />
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3">We'd love to hear from you</h2>
          <p className="text-[#A89070] text-sm leading-relaxed mb-10">
            Whether you have a question about a service, membership, or simply wish to connect — we're here.
          </p>

          <div className="space-y-5">
            {info.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C8A96E]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={18} className="text-[#C8A96E]" />
                  </div>
                  <div>
                    <p className="text-xs tracking-wider uppercase text-[#C8A96E] font-semibold mb-0.5">{label}</p>
                    <p className="text-sm text-[#D4C4B0] leading-relaxed">{value}</p>
                  </div>
                </div>
              );

              return href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="block rounded-2xl hover:bg-[#C8A96E]/10 transition-colors duration-200 p-2 -mx-2"
                >
                  {inner}
                </a>
              ) : (
                <div key={label} className="p-2 -mx-2">
                  {inner}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-white rounded-3xl p-8 md:p-10 border border-[#E8D9C0] shadow-sm"
        >
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-10">
              <CheckCircle2 size={52} className="text-[#C8A96E] mb-4" />
              <h3 className="font-serif text-2xl font-bold text-[#2C1810] mb-2">Almost done!</h3>
              <p className="text-[#7A6050] text-sm mb-6">
                We've opened WhatsApp with your booking details. Just hit send there to confirm your appointment.
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-xs tracking-widest uppercase font-semibold text-[#8B5A2B] hover:text-[#C8A96E] transition-colors"
              >
                Book another appointment
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="font-serif text-2xl font-bold text-[#2C1810] mb-6">Book an Appointment</h3>

              {/* Name */}
              <div>
                <label className="text-xs tracking-wider uppercase text-[#8B5A2B] font-semibold block mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full bg-[#FAF7F2] border border-[#E8D9C0] rounded-xl px-4 py-3 text-sm text-[#2C1810] placeholder:text-[#C0A88C] focus:outline-none focus:border-[#C8A96E] focus:ring-2 focus:ring-[#C8A96E]/10 transition-all"
                  required
                />
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs tracking-wider uppercase text-[#8B5A2B] font-semibold block mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 ..."
                    className="w-full bg-[#FAF7F2] border border-[#E8D9C0] rounded-xl px-4 py-3 text-sm text-[#2C1810] placeholder:text-[#C0A88C] focus:outline-none focus:border-[#C8A96E] focus:ring-2 focus:ring-[#C8A96E]/10 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs tracking-wider uppercase text-[#8B5A2B] font-semibold block mb-2">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full bg-[#FAF7F2] border border-[#E8D9C0] rounded-xl px-4 py-3 text-sm text-[#2C1810] placeholder:text-[#C0A88C] focus:outline-none focus:border-[#C8A96E] focus:ring-2 focus:ring-[#C8A96E]/10 transition-all"
                  />
                </div>
              </div>

              {/* Service */}
              <div>
                <label className="text-xs tracking-wider uppercase text-[#8B5A2B] font-semibold block mb-2 flex items-center gap-2">
                  <Scissors size={13} className="text-[#C8A96E]" />
                  Select Service
                </label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full bg-[#FAF7F2] border border-[#E8D9C0] rounded-xl px-4 py-3 text-sm text-[#2C1810] focus:outline-none focus:border-[#C8A96E] focus:ring-2 focus:ring-[#C8A96E]/10 transition-all"
                  required
                >
                  <option value="" disabled>
                    Choose a service...
                  </option>
                  {SERVICE_GROUPS.map((group) => (
                    <optgroup key={group.label} label={group.label}>
                      {group.options.map((opt) => (
                        <option key={`${group.label}-${opt}`} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs tracking-wider uppercase text-[#8B5A2B] font-semibold block mb-2 flex items-center gap-2">
                    <Calendar size={13} className="text-[#C8A96E]" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    min={today}
                    className="w-full bg-[#FAF7F2] border border-[#E8D9C0] rounded-xl px-4 py-3 text-sm text-[#2C1810] focus:outline-none focus:border-[#C8A96E] focus:ring-2 focus:ring-[#C8A96E]/10 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs tracking-wider uppercase text-[#8B5A2B] font-semibold block mb-2 flex items-center gap-2">
                    <Clock size={13} className="text-[#C8A96E]" />
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full bg-[#FAF7F2] border border-[#E8D9C0] rounded-xl px-4 py-3 text-sm text-[#2C1810] focus:outline-none focus:border-[#C8A96E] focus:ring-2 focus:ring-[#C8A96E]/10 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs tracking-wider uppercase text-[#8B5A2B] font-semibold block mb-2">
                  Additional Notes (optional)
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Tell us anything else we should know..."
                  className="w-full bg-[#FAF7F2] border border-[#E8D9C0] rounded-xl px-4 py-3 text-sm text-[#2C1810] placeholder:text-[#C0A88C] focus:outline-none focus:border-[#C8A96E] focus:ring-2 focus:ring-[#C8A96E]/10 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#C8A96E] to-[#8B5A2B] text-white font-semibold tracking-widest uppercase text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                <Send size={15} />
                Send via WhatsApp
              </button>
              <p className="text-center text-[10px] text-[#9A7A60] tracking-wide">
                Clicking the button opens WhatsApp with your details filled in — just tap send to confirm.
              </p>
            </form>
          )}
        </motion.div>
      </section>
    </div>
  );
}