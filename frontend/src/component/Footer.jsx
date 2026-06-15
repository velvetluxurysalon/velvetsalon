import { Link } from "react-router-dom";
import { Crown, MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#2C1810] text-[#E8D9C0] pt-14 pb-24 md:pb-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-[#C8A96E]/20">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C8A96E] to-[#8B5A2B] flex items-center justify-center">
                <Crown size={14} className="text-white" />
              </span>
              <span className="font-serif text-2xl tracking-widest text-[#C8A96E] font-bold">VELVET</span>
            </div>
            <p className="text-sm text-[#A89070] leading-relaxed tracking-wide">
              Velvet Premium Unisex Salon — A sanctuary of refined grooming. Experience luxury as it was always meant to be.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#C8A96E] font-semibold mb-4">Navigate</p>
            {["Home", "Services", "Membership", "Contact"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                className="block text-sm text-[#A89070] hover:text-[#C8A96E] transition-colors mb-2.5 tracking-wide"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#C8A96E] font-semibold mb-4">Contact Us</p>
            <div className="space-y-4">

              <a href="tel:+919345678646" className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full border border-[#C8A96E]/30 flex items-center justify-center shrink-0 group-hover:bg-[#C8A96E] transition-all duration-300">
                  <Phone size={13} className="text-[#C8A96E] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] tracking-wider uppercase text-[#C8A96E]/70 font-semibold">Call Us</p>
                  <p className="text-sm text-[#A89070] group-hover:text-[#C8A96E] transition-colors">9345678646</p>
                </div>
              </a>

              <a href="mailto:Velvetluxurysalon@gmail.com" className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full border border-[#C8A96E]/30 flex items-center justify-center shrink-0 group-hover:bg-[#C8A96E] transition-all duration-300">
                  <Mail size={13} className="text-[#C8A96E] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] tracking-wider uppercase text-[#C8A96E]/70 font-semibold">Email</p>
                  <p className="text-sm text-[#A89070] group-hover:text-[#C8A96E] transition-colors">Velvetluxurysalon@gmail.com</p>
                </div>
              </a>

              <a href="https://wa.me/919345678646" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full border border-[#C8A96E]/30 flex items-center justify-center shrink-0 group-hover:bg-[#C8A96E] transition-all duration-300">
                  <MessageCircle size={13} className="text-[#C8A96E] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] tracking-wider uppercase text-[#C8A96E]/70 font-semibold">WhatsApp</p>
                  <p className="text-sm text-[#A89070] group-hover:text-[#C8A96E] transition-colors">9345678646</p>
                </div>
              </a>

              <a
                href="https://maps.google.com/?q=KK+Nagar+Kalingarayanpalayam+Bhavani+Erode"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <div className="w-8 h-8 rounded-full border border-[#C8A96E]/30 flex items-center justify-center shrink-0 group-hover:bg-[#C8A96E] transition-all duration-300 mt-0.5">
                  <MapPin size={13} className="text-[#C8A96E] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] tracking-wider uppercase text-[#C8A96E]/70 font-semibold">Visit Us</p>
                  <p className="text-sm text-[#A89070] group-hover:text-[#C8A96E] transition-colors leading-relaxed">
                    Opposite to ICICI bank, KK Nagar,<br />Kalingarayanpalayam, Bhavani<br />Erode Dt, Tamil Nadu
                  </p>
                </div>
              </a>

            </div>
          </div>

        </div>

        <p className="text-center text-xs text-[#6B5040] tracking-widest mt-8 uppercase">
          © {new Date().getFullYear()} Velvet Premium Unisex Salon. All rights reserved.
        </p>
      </div>
    </footer>
  );
}