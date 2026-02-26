import { create } from "zustand";
import type { Event } from "@/data/mockData";

export interface PurchasedTicket {
  event: Event;
  ticketId: string;
  type: string;
  status: "upcoming" | "past";
  scanned: boolean;
  purchasedAt: string;
  paymentMethod: string;
}

interface TicketStore {
  tickets: PurchasedTicket[];
  addTicket: (ticket: PurchasedTicket) => void;
}

export const useTicketStore = create<TicketStore>((set) => ({
  tickets: [],
  addTicket: (ticket) => set((state) => ({ tickets: [...state.tickets, ticket] })),
}));
