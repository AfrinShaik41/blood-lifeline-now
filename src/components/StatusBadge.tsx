import { cn } from "@/lib/utils";

type Status = "available" | "limited" | "unavailable";

interface StatusBadgeProps {
  status: Status;
  showText?: boolean;
  size?: "sm" | "md";
}

const statusConfig = {
  available: {
    label: "Available",
    dotClass: "bg-available",
    textClass: "text-available",
    bgClass: "bg-available/10",
  },
  limited: {
    label: "Limited",
    dotClass: "bg-limited",
    textClass: "text-yellow-700",
    bgClass: "bg-limited/10",
  },
  unavailable: {
    label: "Not Available",
    dotClass: "bg-unavailable",
    textClass: "text-unavailable",
    bgClass: "bg-unavailable/10",
  },
};

const StatusBadge = ({ status, showText = true, size = "md" }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full font-medium",
        config.bgClass,
        config.textClass,
        size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm"
      )}
    >
      <span
        className={cn(
          "rounded-full animate-pulse",
          config.dotClass,
          size === "sm" ? "w-2 h-2" : "w-2.5 h-2.5"
        )}
      />
      {showText && <span>{config.label}</span>}
    </div>
  );
};

export default StatusBadge;
