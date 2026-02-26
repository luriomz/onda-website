import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import { organizers, events } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventCard from "@/components/EventCard";
import { useState } from "react";

const OrganizerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [following, setFollowing] = useState(false);

  const organizer = organizers.find((o) => o.id === id);
  if (!organizer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Organizador não encontrado</p>
      </div>
    );
  }

  const orgEvents = events.filter((e) => e.organizer.id === id);
  const now = new Date().toISOString().split("T")[0];
  const upcoming = orgEvents.filter((e) => e.date >= now);
  const past = orgEvents.filter((e) => e.date < now);
  const totalAttendees = orgEvents.reduce((sum, e) => sum + e.interestedCount, 0);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="p-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full glass mb-4">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
      </div>

      {/* Profile */}
      <div className="flex flex-col items-center px-4 mb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mb-3"
        >
          <span className="text-primary-foreground text-2xl font-black">
            {organizer.name.charAt(0)}
          </span>
        </motion.div>
        <h1 className="text-xl font-black text-foreground mb-1">{organizer.name}</h1>
        <p className="text-sm text-muted-foreground mb-4">
          {organizer.followerCount.toLocaleString()} seguidores
        </p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setFollowing(!following)}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-colors ${
            following
              ? "bg-primary/20 text-primary border border-primary/30"
              : "bg-gradient-primary text-primary-foreground"
          }`}
        >
          {following ? "A seguir ✓" : "Seguir"}
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 px-4 mb-6">
        <div className="bg-card rounded-xl p-4 flex items-center gap-3">
          <CalendarDays className="h-5 w-5 text-primary" />
          <div>
            <p className="text-lg font-bold text-foreground">{orgEvents.length}</p>
            <p className="text-xs text-muted-foreground">Eventos</p>
          </div>
        </div>
        <div className="bg-card rounded-xl p-4 flex items-center gap-3">
          <Users className="h-5 w-5 text-primary" />
          <div>
            <p className="text-lg font-bold text-foreground">{totalAttendees.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Participantes</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="upcoming" className="flex-1">Próximos</TabsTrigger>
            <TabsTrigger value="past" className="flex-1">Passados</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            {upcoming.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm py-8">Sem eventos próximos</p>
            ) : (
              <div className="space-y-2 mt-2">
                {upcoming.map((e) => (
                  <EventCard key={e.id} event={e} variant="compact" />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="past">
            {past.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm py-8">Sem eventos passados</p>
            ) : (
              <div className="space-y-2 mt-2">
                {past.map((e) => (
                  <EventCard key={e.id} event={e} variant="compact" />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OrganizerPage;
