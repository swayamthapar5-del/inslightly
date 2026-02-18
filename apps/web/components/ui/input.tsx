import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none focus:border-ocean",
        "dark:border-slate-700 dark:bg-slate-950 dark:text-white",
        className
      )}
      {...props}
    />
  );
}
