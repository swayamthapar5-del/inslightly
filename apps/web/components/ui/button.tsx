import { cn } from "@/lib/utils";

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "outline" }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition",
        variant === "primary" && "bg-ink text-white shadow-soft",
        variant === "ghost" && "text-ink hover:bg-slate-100",
        variant === "outline" && "border border-slate-200 bg-white text-ink",
        className
      )}
      {...props}
    />
  );
}
