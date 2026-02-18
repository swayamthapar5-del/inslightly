import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { notifications } from "@/lib/sample-data";

export default function NotificationsPage() {
  return (
    <AppShell title="Notifications">
      <Card>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Recent updates</p>
        <div className="mt-6 space-y-4">
          {notifications.map((note) => (
            <div key={note.id} className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-ink">{note.title}</p>
              <p className="text-sm text-slate-500">{note.body}</p>
              <p className="text-xs text-slate-400">{note.time}</p>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
