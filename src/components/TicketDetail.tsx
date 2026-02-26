import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { ChevronDown, HelpCircle, CheckCircle2, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDate, formatMZN, type Event } from "@/data/mockData";
import { Button } from "@/components/ui/button";

export interface TicketData {
  event: Event;
  ticketId: string;
  type: string;
  status: "upcoming" | "past";
  scanned: boolean;
}

interface TicketDetailProps {
  ticket: TicketData | null;
  onClose: () => void;
}

const TicketDetail = ({ ticket, onClose }: TicketDetailProps) => {
  const navigate = useNavigate();

  if (!ticket) return null;

  const isPast = ticket.status === "past";
  const qrPayload = JSON.stringify({
    ticketId: ticket.ticketId,
    eventId: ticket.event.id,
    type: ticket.type,
  });

  return (
    <AnimatePresence>
      {ticket && (
        <motion.div
          key="ticket-detail"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="fixed inset-0 z-50 flex flex-col"
          style={{
            background: "linear-gradient(180deg, hsl(340 82% 30%), hsl(340 82% 18%), hsl(240 6% 4%))",
          }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <button onClick={onClose} className="p-2 -ml-2">
              <ChevronDown className="h-6 w-6 text-primary-foreground" />
            </button>
            <button className="p-2 -mr-2">
              <HelpCircle className="h-5 w-5 text-primary-foreground/70" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-4 pb-8">
            {/* White ticket card */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-elevated mx-auto max-w-sm">
              {/* Event image header */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={ticket.event.image}
                  alt={ticket.event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <h2 className="text-white font-black text-lg leading-tight">
                    {ticket.event.title}
                  </h2>
                  <p className="text-white/70 text-xs mt-0.5">
                    {ticket.event.venue} · {ticket.event.city}
                  </p>
                </div>
              </div>

              {/* Ticket type badge */}
              <div className="px-5 pt-4">
                <span className="inline-block text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  {ticket.type}
                </span>
              </div>

              {/* QR Code area */}
              <div className="px-5 py-6 flex flex-col items-center">
                <div className="relative">
                  <div className={isPast ? "blur-sm opacity-40" : ""}>
                    <QRCodeSVG
                      value={qrPayload}
                      size={200}
                      level="H"
                      bgColor="#ffffff"
                      fgColor="#1a1a1a"
                    />
                  </div>

                  {/* Past overlay badge */}
                  {isPast && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-gray-800/90 rounded-2xl px-5 py-3 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                        <span className="text-white font-bold text-sm">Já digitalizado</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Instruction text */}
                {!isPast && (
                  <p className="text-gray-500 text-sm mt-4 text-center">
                    Mostrar na entrada
                  </p>
                )}
              </div>

              {/* Ticket ID & Price */}
              <div className="px-5 flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 py-3">
                <span>{ticket.ticketId}</span>
                <span className="font-semibold text-gray-700">
                  {formatMZN(ticket.event.price)}
                </span>
              </div>

              {/* Date & Time */}
              <div className="px-5 pb-5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formatDate(ticket.event.date)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{ticket.event.time}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-6 max-w-sm mx-auto">
              <Button
                variant="secondary"
                className="flex-1 rounded-xl h-12 font-bold"
                onClick={() => {
                  onClose();
                  navigate(`/event/${ticket.event.id}`);
                }}
              >
                Ver evento
              </Button>
              <Button
                variant="secondary"
                className="rounded-xl h-12 px-6 font-bold"
              >
                Mais
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TicketDetail;
