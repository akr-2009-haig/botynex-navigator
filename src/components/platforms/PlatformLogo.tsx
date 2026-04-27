import { cn } from "@/lib/utils";

interface PlatformLogoProps {
  mark: string;
  color: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "h-9 w-9 text-xs",
  md: "h-12 w-12 text-sm",
  lg: "h-16 w-16 text-lg",
} as const;

export function PlatformLogo({ mark, color, size = "md", className }: PlatformLogoProps) {
  return (
    <div
      className={cn(
        "relative shrink-0 rounded-xl flex items-center justify-center font-extrabold text-white",
        "bg-gradient-to-br shadow-lg",
        color,
        sizes[size],
        className,
      )}
      aria-hidden="true"
    >
      <span className="absolute inset-0 rounded-xl bg-white/10" />
      <span className="relative tracking-tight">{mark}</span>
    </div>
  );
}

export default PlatformLogo;
