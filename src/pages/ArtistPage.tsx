import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Music } from "lucide-react";
import { motion } from "framer-motion";
import { artists, events } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventCard from "@/components/EventCard";
import { useState } from "react";

const ArtistPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [following, setFollowing] = useState(false);

  const artist = artists.find((a) => a.id === id);
  if (!artist) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Artista não encontrado</p>
      </div>
    );
  }

  const artistEvents = events.filter((e) => e.lineup?.some((a) => a.id === id));
  const now = new Date().toISOString().split("T")[0];
  const upcoming = artistEvents.filter((e) => e.date >= now);
  const past = artistEvents.filter((e) => e.date < now);

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
            {artist.name.charAt(0)}
          </span>
        </motion.div>
        <h1 className="text-xl font-black text-foreground mb-1">{artist.name}</h1>
        <span className="inline-block bg-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-2">
          <Music className="h-3 w-3 inline mr-1" />
          {artist.genre}
        </span>
        <p className="text-sm text-muted-foreground mb-4">
          {artist.followerCount.toLocaleString()} seguidores
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

      {/* Bio */}
      <div className="px-4 mb-6">
        <h3 className="text-base font-bold text-foreground mb-2">Sobre</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{artist.bio}</p>
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

export default ArtistPage;
