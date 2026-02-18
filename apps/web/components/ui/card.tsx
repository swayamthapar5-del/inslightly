import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-3xl bg-white p-6 shadow-soft dark:bg-slate-900", className)} {...props} />;
}
