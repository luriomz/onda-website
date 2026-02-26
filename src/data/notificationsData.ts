export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: "event_reminder" | "new_event" | "promo";
  eventId?: string;
  read: boolean;
}

export const mockNotifications: Notification[] = [
  {
    id: "n1",
    title: "Marrabenta Fest é amanhã!",
    message: "Não te esqueças do teu bilhete. O evento começa às 18h.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    type: "event_reminder",
    eventId: "1",
    read: false,
  },
  {
    id: "n2",
    title: "Novo evento em Maputo",
    message: "Afro House Night foi adicionado. Confere os detalhes!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    type: "new_event",
    eventId: "2",
    read: false,
  },
  {
    id: "n3",
    title: "Promoção especial 🎉",
    message: "20% de desconto em todos os bilhetes este fim de semana.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    type: "promo",
    read: false,
  },
  {
    id: "n4",
    title: "Lembrete: Jazz no Jardim",
    message: "O evento é no próximo sábado. Garante o teu lugar!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    type: "event_reminder",
    eventId: "3",
    read: true,
  },
  {
    id: "n5",
    title: "Novo artista confirmado",
    message: "DJ Maputo foi adicionado ao lineup do Festival da Cidade.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    type: "new_event",
    read: true,
  },
];
