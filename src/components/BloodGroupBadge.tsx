import { cn } from "@/lib/utils";

interface BloodGroupBadgeProps {
  bloodGroup: string;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

const BloodGroupBadge = ({
  bloodGroup,
  size = "md",
  interactive = false,
  selected = false,
  onClick,
}: BloodGroupBadgeProps) => {
  const sizeClasses = {
    sm: "w-10 h-10 text-sm",
    md: "w-14 h-14 text-lg",
    lg: "w-20 h-20 text-2xl",
  };

  return (
    <button
      onClick={onClick}
      disabled={!interactive}
      className={cn(
        "flex items-center justify-center rounded-full font-heading font-bold transition-all duration-200",
        sizeClasses[size],
        interactive && "cursor-pointer hover:scale-110",
        selected
          ? "bg-primary text-primary-foreground shadow-lg glow-primary"
          : "bg-secondary text-foreground border-2 border-border",
        interactive && !selected && "hover:border-primary hover:text-primary"
      )}
    >
      {bloodGroup}
    </button>
  );
};

export default BloodGroupBadge;
