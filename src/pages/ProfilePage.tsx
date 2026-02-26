import { Settings, ChevronRight, Ticket, Heart, MapPin, Users, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Eventos", value: "12", icon: Ticket },
  { label: "Seguindo", value: "8", icon: Heart },
  { label: "Amigos", value: "34", icon: Users },
];

const menuItems = [
  { label: "Histórico de Eventos", icon: Ticket, path: null },
  { label: "Eventos Favoritos", icon: Heart, path: "/favorites" },
  { label: "Locais Frequentes", icon: MapPin, path: null },
  { label: "Configurações", icon: Settings, path: null },
];

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background safe-bottom">
      <header className="sticky top-0 z-40 glass border-b border-border px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-black text-foreground">Perfil</h1>
        <button className="p-2 rounded-full bg-secondary">
          <Settings className="h-4 w-4 text-foreground" />
        </button>
      </header>

      <main className="px-4 pt-6 pb-4">
        {/* Avatar + info */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mb-3">
            <span className="text-primary-foreground text-2xl font-black">M</span>
          </div>
          <h2 className="text-lg font-bold text-foreground">Maria Santos</h2>
          <p className="text-sm text-muted-foreground">@mariasantos · Maputo</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl p-3 text-center">
              <stat.icon className="h-4 w-4 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Menu items */}
        <div className="space-y-1">
          {menuItems.map((item) => (
            <motion.button
              key={item.label}
              whileTap={{ scale: 0.98 }}
              onClick={() => item.path && navigate(item.path)}
              className="w-full flex items-center gap-3 bg-card rounded-xl p-3.5 hover:bg-card-hover transition-colors"
            >
              <item.icon className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground flex-1 text-left">{item.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </motion.button>
          ))}
        </div>

        <button className="w-full flex items-center justify-center gap-2 mt-8 py-3 rounded-xl border border-destructive/30 text-destructive text-sm font-semibold hover:bg-destructive/10 transition-colors">
          <LogOut className="h-4 w-4" />
          Terminar Sessão
        </button>
      </main>
    </div>
  );
};

export default ProfilePage;
