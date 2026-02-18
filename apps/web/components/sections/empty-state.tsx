export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
      <div className="mb-4 h-20 w-20 rounded-3xl bg-gradient-to-br from-ocean/30 to-mint/60" />
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="text-sm text-slate-500">{body}</p>
    </div>
  );
}
