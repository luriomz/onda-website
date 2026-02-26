import { useState } from "react";
import { Ticket, QrCode, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { events, formatMZN, formatDate } from "@/data/mockData";
import TicketDetail, { type TicketData } from "@/components/TicketDetail";
import { useTicketStore } from "@/stores/ticketStore";

const mockTickets: TicketData[] = [
  { event: events[0], ticketId: "MV-2026-001", type: "Normal", status: "upcoming", scanned: false },
  { event: events[2], ticketId: "MV-2026-002", type: "VIP", status: "upcoming", scanned: false },
  { event: events[3], ticketId: "MV-2026-003", type: "Normal", status: "past", scanned: true },
];

const TicketsPage = () => {
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const purchasedTickets = useTicketStore((s) => s.tickets);

  // Merge mock + purchased tickets
  const allTickets: TicketData[] = [
    ...mockTickets,
    ...purchasedTickets.map((t) => ({
      event: t.event,
      ticketId: t.ticketId,
      type: t.type,
      status: t.status,
      scanned: t.scanned,
    })),
  ];

  const filteredTickets = allTickets.filter((t) => t.status === activeTab);

  return (
    <div className="min-h-screen bg-background safe-bottom">
      <header className="sticky top-0 z-40 glass border-b border-border px-4 py-4">
        <h1 className="text-xl font-black text-foreground">Meus Bilhetes</h1>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 px-4 pt-4">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`flex-1 py-2 rounded-xl text-sm font-bold transition-colors ${
            activeTab === "upcoming"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          Próximos
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`flex-1 py-2 rounded-xl text-sm font-bold transition-colors ${
            activeTab === "past"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          Passados
        </button>
      </div>

      <main className="px-4 pt-4 pb-4 space-y-4">
        {filteredTickets.length === 0 ? (
          <div className="text-center py-20">
            <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-foreground font-semibold mb-1">
              {activeTab === "upcoming" ? "Sem bilhetes" : "Sem bilhetes passados"}
            </p>
            <p className="text-sm text-muted-foreground">
              {activeTab === "upcoming"
                ? "Os teus bilhetes aparecerão aqui"
                : "Os bilhetes usados aparecerão aqui"}
            </p>
          </div>
        ) : (
          filteredTickets.map((ticket) => (
            <motion.div
              key={ticket.ticketId}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTicket(ticket)}
              className="bg-card rounded-2xl overflow-hidden shadow-card cursor-pointer"
            >
              {/* Ticket top */}
              <div className="relative h-32 overflow-hidden">
                <img
                  src={ticket.event.image}
                  alt={ticket.event.title}
                  className={`w-full h-full object-cover ${ticket.status === "past" ? "opacity-50 grayscale" : ""}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-foreground font-bold text-lg">{ticket.event.title}</h3>
                  <p className="text-muted-foreground text-xs">{ticket.event.venue} · {ticket.event.city}</p>
                </div>
              </div>

              {/* Dashed divider */}
              <div className="relative">
                <div className="absolute left-0 top-0 w-4 h-4 bg-background rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute right-0 top-0 w-4 h-4 bg-background rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="border-t border-dashed border-border mx-6" />
              </div>

              {/* Ticket bottom */}
              <div className="p-4 flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <span className="text-foreground font-medium">{formatDate(ticket.event.date)} · {ticket.event.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-primary/20 text-primary font-semibold px-2 py-0.5 rounded-full">
                      {ticket.type}
                    </span>
                    <span className="text-xs text-muted-foreground">{ticket.ticketId}</span>
                  </div>
                </div>
                <div className={`w-16 h-16 bg-foreground rounded-lg flex items-center justify-center ${ticket.status === "past" ? "opacity-40" : ""}`}>
                  <QrCode className="h-10 w-10 text-background" />
                </div>
              </div>
            </motion.div>
          ))
        )}
      </main>

      {/* Ticket Detail Overlay */}
      <AnimatePresence>
        {selectedTicket && (
          <TicketDetail
            ticket={selectedTicket}
            onClose={() => setSelectedTicket(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TicketsPage;
