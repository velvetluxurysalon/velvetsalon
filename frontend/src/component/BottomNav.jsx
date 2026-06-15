import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Sparkles, Star, Phone } from "lucide-react";

const tabs = [
  { label: "Home", path: "/", icon: Home },
  { label: "Services", path: "/services", icon: Sparkles },
  { label: "Membership", path: "/membership", icon: Star },
  { label: "Contact", path: "/contact", icon: Phone },
];

export default function BottomNav() {
  const location = useLocation();

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#C8A96E]/25 shadow-[0_-4px_24px_rgba(139,90,43,0.10)]">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
        {tabs.map(({ label, path, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              onClick={handleClick}
              className="flex flex-col items-center gap-1 flex-1 py-1 relative"
            >
              {active && (
                <motion.span
                  layoutId="bottom-pill"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-gradient-to-r from-[#C8A96E] to-[#8B5A2B]"
                />
              )}
              <Icon
                size={20}
                className={`transition-colors duration-300 ${
                  active ? "text-[#C8A96E]" : "text-[#9E8572]"
                }`}
              />
              <span
                className={`text-[10px] tracking-wider uppercase font-medium transition-colors duration-300 ${
                  active ? "text-[#C8A96E]" : "text-[#9E8572]"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}