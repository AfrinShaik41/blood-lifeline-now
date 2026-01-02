import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
  className?: string;
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  iconColor = "text-primary",
  className,
}: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover",
        className
      )}
    >
      <div
        className={cn(
          "w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
          "bg-primary/10"
        )}
      >
        <Icon className={cn("w-7 h-7", iconColor)} />
      </div>
      <h3 className="font-heading font-bold text-lg mb-2 text-foreground">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
