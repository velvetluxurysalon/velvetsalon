import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Membership", path: "/membership" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-[0_2px_24px_rgba(139,90,43,0.10)] border-b border-[#C8A96E]/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo.webp"
            alt="Velvet Premium Unisex Salon logo"
            width="160"
            height="68"
            loading="eager"
            fetchpriority="high"
            className="h-12 md:h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm tracking-[0.12em] uppercase font-medium transition-colors duration-300 ${
                  active ? "text-[#C8A96E]" : "text-[#4A3728] hover:text-[#C8A96E]"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#C8A96E] to-[#8B5A2B] rounded-full"
                  />
                )}
              </Link>
            );
          })}
          <Link
            to="/membership"
            className="ml-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#C8A96E] to-[#8B5A2B] text-white text-xs tracking-widest uppercase font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Join Now
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-[#4A3728] hover:text-[#C8A96E] transition-colors"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#FAF7F2]/98 backdrop-blur-md border-t border-[#C8A96E]/20 shadow-xl px-6 pb-6 pt-4 space-y-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2.5 text-sm uppercase tracking-widest font-medium border-b border-[#E8D9C0]/60 transition-colors ${
                  location.pathname === link.path
                    ? "text-[#C8A96E]"
                    : "text-[#4A3728] hover:text-[#C8A96E]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/membership"
              className="block mt-2 text-center py-3 rounded-full bg-gradient-to-r from-[#C8A96E] to-[#8B5A2B] text-white text-xs tracking-widest uppercase font-semibold shadow"
            >
              Join Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}