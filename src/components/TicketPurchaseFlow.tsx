import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Smartphone, X } from "lucide-react";
import { type Event, formatMZN } from "@/data/mockData";
import { useTicketStore } from "@/stores/ticketStore";
import confetti from "canvas-confetti";

type Step = "type" | "payment" | "confirm";

interface TicketPurchaseFlowProps {
  event: Event;
  onClose: () => void;
}

const ticketTypes = [
  { id: "Normal", label: "Normal", multiplier: 1, perks: ["Acesso geral", "1 bebida incluída"] },
  { id: "VIP", label: "VIP", multiplier: 2.5, perks: ["Acesso VIP", "Open bar", "Zona exclusiva", "Meet & Greet"] },
];

const paymentMethods = [
  { id: "mpesa", label: "M-Pesa", color: "hsl(142 71% 45%)", icon: "📱" },
  { id: "emola", label: "EMOLA", color: "hsl(217 91% 60%)", icon: "💳" },
  { id: "mkesh", label: "mKesh", color: "hsl(38 92% 50%)", icon: "📲" },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

const TicketPurchaseFlow = ({ event, onClose }: TicketPurchaseFlowProps) => {
  const [step, setStep] = useState<Step>("type");
  const [direction, setDirection] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const addTicket = useTicketStore((s) => s.addTicket);

  const selectedTypeData = ticketTypes.find((t) => t.id === selectedType);
  const totalPrice = selectedTypeData ? event.price * selectedTypeData.multiplier : event.price;

  const goTo = (next: Step) => {
    const steps: Step[] = ["type", "payment", "confirm"];
    setDirection(steps.indexOf(next) > steps.indexOf(step) ? 1 : -1);
    setStep(next);
  };

  const handleConfirm = async () => {
    setProcessing(true);
    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 2000));
    setProcessing(false);
    setConfirmed(true);

    // Fire confetti
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#e11d69", "#ff6b9d", "#ffffff"],
    });

    // Add ticket to store
    const ticketId = `MV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    addTicket({
      event,
      ticketId,
      type: selectedType || "Normal",
      status: "upcoming",
      scanned: false,
      purchasedAt: new Date().toISOString(),
      paymentMethod: selectedPayment || "mpesa",
    });
  };

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 300 }}
      className="fixed inset-0 z-[60] bg-background flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        {step !== "type" && !confirmed ? (
          <button onClick={() => goTo(step === "payment" ? "type" : "payment")} className="p-2 -ml-2">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
        ) : (
          <div className="w-9" />
        )}
        <h2 className="text-base font-bold text-foreground">
          {confirmed ? "Confirmado!" : step === "type" ? "Escolher bilhete" : step === "payment" ? "Pagamento" : "Confirmar"}
        </h2>
        <button onClick={onClose} className="p-2 -mr-2">
          <X className="h-5 w-5 text-foreground" />
        </button>
      </div>

      {/* Progress bar */}
      {!confirmed && (
        <div className="flex gap-1.5 px-4 mb-4">
          {["type", "payment", "confirm"].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${
                ["type", "payment", "confirm"].indexOf(s) <= ["type", "payment", "confirm"].indexOf(step)
                  ? "bg-primary"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait" custom={direction}>
          {/* Step 1: Ticket Type */}
          {step === "type" && (
            <motion.div
              key="type"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
              className="absolute inset-0 px-4 overflow-y-auto pb-32"
            >
              {/* Event mini card */}
              <div className="flex items-center gap-3 bg-card rounded-xl p-3 mb-6">
                <img src={event.image} alt={event.title} className="w-14 h-14 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-foreground truncate">{event.title}</h3>
                  <p className="text-xs text-muted-foreground">{event.venue} · {event.city}</p>
                </div>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-4">Tipo de bilhete</h3>

              <div className="space-y-3">
                {ticketTypes.map((type) => {
                  const price = event.price * type.multiplier;
                  const isSelected = selectedType === type.id;
                  return (
                    <motion.button
                      key={type.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedType(type.id)}
                      className={`w-full text-left rounded-2xl p-4 border-2 transition-colors ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-foreground">{type.label}</span>
                        <span className="font-black text-foreground">{formatMZN(price)}</span>
                      </div>
                      <div className="space-y-1">
                        {type.perks.map((perk) => (
                          <div key={perk} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Check className="h-3 w-3 text-primary flex-shrink-0" />
                            <span>{perk}</span>
                          </div>
                        ))}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 2: Payment Method */}
          {step === "payment" && (
            <motion.div
              key="payment"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
              className="absolute inset-0 px-4 overflow-y-auto pb-32"
            >
              <h3 className="text-lg font-bold text-foreground mb-2">Método de pagamento</h3>
              <p className="text-sm text-muted-foreground mb-6">Escolhe como queres pagar</p>

              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const isSelected = selectedPayment === method.id;
                  return (
                    <motion.button
                      key={method.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`w-full flex items-center gap-4 rounded-2xl p-4 border-2 transition-colors ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${method.color}20` }}>
                        {method.icon}
                      </div>
                      <div className="text-left flex-1">
                        <span className="font-bold text-foreground">{method.label}</span>
                        <p className="text-xs text-muted-foreground">Pagamento móvel</p>
                      </div>
                      <Smartphone className={`h-5 w-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-6 bg-card rounded-xl p-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Bilhete {selectedType}</span>
                  <span className="text-foreground">{formatMZN(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Taxa de serviço</span>
                  <span className="text-foreground">{formatMZN(0)}</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-black text-foreground">{formatMZN(totalPrice)}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirm / Success */}
          {step === "confirm" && !confirmed && (
            <motion.div
              key="confirm"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
              className="absolute inset-0 px-4 overflow-y-auto pb-32"
            >
              <h3 className="text-lg font-bold text-foreground mb-6">Resumo da compra</h3>

              <div className="bg-card rounded-2xl overflow-hidden mb-6">
                <div className="relative h-28 overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <h4 className="text-foreground font-bold">{event.title}</h4>
                    <p className="text-xs text-muted-foreground">{event.venue}</p>
                  </div>
                </div>
                <div className="p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tipo</span>
                    <span className="font-semibold text-foreground">{selectedType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pagamento</span>
                    <span className="font-semibold text-foreground">
                      {paymentMethods.find((m) => m.id === selectedPayment)?.label}
                    </span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="font-black text-primary">{formatMZN(totalPrice)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Success state */}
          {confirmed && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex flex-col items-center justify-center px-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 15, delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mb-6"
              >
                <Check className="h-10 w-10 text-primary-foreground" />
              </motion.div>
              <h3 className="text-2xl font-black text-foreground mb-2">Bilhete comprado!</h3>
              <p className="text-sm text-muted-foreground text-center mb-2">
                O teu bilhete <span className="font-bold text-foreground">{selectedType}</span> para{" "}
                <span className="font-bold text-foreground">{event.title}</span> está pronto.
              </p>
              <p className="text-xs text-muted-foreground text-center">
                Vai a <span className="text-primary font-semibold">Meus Bilhetes</span> para ver o QR code.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      {!confirmed && (
        <div className="px-4 pb-6 pt-2" style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}>
          {step === "type" && (
            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={!selectedType}
              onClick={() => goTo("payment")}
              className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-primary text-primary-foreground shadow-elevated disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continuar · {selectedType ? formatMZN(totalPrice) : "Seleciona um bilhete"}
            </motion.button>
          )}
          {step === "payment" && (
            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={!selectedPayment}
              onClick={() => goTo("confirm")}
              className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-primary text-primary-foreground shadow-elevated disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continuar
            </motion.button>
          )}
          {step === "confirm" && (
            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={processing}
              onClick={handleConfirm}
              className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-primary text-primary-foreground shadow-elevated disabled:opacity-60"
            >
              {processing ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="inline-block w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                  />
                  A processar...
                </span>
              ) : (
                `Pagar ${formatMZN(totalPrice)}`
              )}
            </motion.button>
          )}
        </div>
      )}

      {/* Done button */}
      {confirmed && (
        <div className="px-4 pb-6 pt-2" style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
            className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-primary text-primary-foreground shadow-elevated"
          >
            Fechar
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default TicketPurchaseFlow;
