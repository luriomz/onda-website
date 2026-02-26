import { useNavigate } from "react-router-dom";
import { Calendar, Sparkles, Megaphone, BellOff } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNotificationStore } from "@/stores/notificationStore";
import type { Notification } from "@/data/notificationsData";

const typeIcon: Record<Notification["type"], React.ReactNode> = {
  event_reminder: <Calendar className="h-5 w-5 text-primary" />,
  new_event: <Sparkles className="h-5 w-5 text-accent-foreground" />,
  promo: <Megaphone className="h-5 w-5 text-primary" />,
};

interface NotificationsSheetProps {
  children: React.ReactNode;
}

const NotificationsSheet = ({ children }: NotificationsSheetProps) => {
  const navigate = useNavigate();
  const { notifications, markAsRead, markAllAsRead, unreadCount } =
    useNotificationStore();

  const handleTap = (n: Notification) => {
    markAsRead(n.id);
    if (n.eventId) {
      navigate(`/event/${n.eventId}`);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl">
        <SheetHeader className="flex flex-row items-center justify-between pr-2">
          <SheetTitle className="text-lg font-bold">Notificações</SheetTitle>
          {unreadCount() > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs font-semibold text-primary"
            >
              Marcar tudo como lido
            </button>
          )}
        </SheetHeader>

        <div className="mt-4 space-y-1 overflow-y-auto flex-1">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <BellOff className="h-10 w-10 mb-3" />
              <p className="text-sm">Sem notificações</p>
            </div>
          ) : (
            notifications.map((n) => (
              <button
                key={n.id}
                onClick={() => handleTap(n)}
                className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-colors ${
                  n.read
                    ? "bg-background"
                    : "bg-secondary"
                }`}
              >
                <div className="mt-0.5 shrink-0">{typeIcon[n.type]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground truncate">
                      {n.title}
                    </span>
                    {!n.read && (
                      <span className="shrink-0 w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {n.message}
                  </p>
                  <span className="text-[10px] text-muted-foreground mt-1 block">
                    {formatDistanceToNow(new Date(n.timestamp), {
                      addSuffix: true,
                      locale: pt,
                    })}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationsSheet;
