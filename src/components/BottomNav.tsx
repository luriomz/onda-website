import { Link, useLocation } from "react-router-dom";
import { Home, Search, Ticket, User } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { path: "/", icon: Home, label: "Início" },
  { path: "/search", icon: Search, label: "Explorar" },
  { path: "/tickets", icon: Ticket, label: "Bilhetes" },
  { path: "/profile", icon: User, label: "Perfil" },
];

const BottomNav = () => {
  const location = useLocation();

  // Hide on event detail pages
  if (location.pathname.startsWith("/event/")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border">
      <div className="flex items-center justify-around px-2 py-2" style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}>
        {tabs.map((tab) => {
          const isActive = tab.path === "/" 
            ? location.pathname === "/" 
            : location.pathname.startsWith(tab.path);
          
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <tab.icon
                className={`h-5 w-5 relative z-10 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-[10px] font-medium relative z-10 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
