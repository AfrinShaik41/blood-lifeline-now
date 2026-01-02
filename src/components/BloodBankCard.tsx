import { MapPin, Phone, Clock, Navigation, Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "./StatusBadge";
import BloodGroupBadge from "./BloodGroupBadge";

interface BloodStock {
  group: string;
  status: "available" | "limited" | "unavailable";
}

interface BloodBankCardProps {
  name: string;
  address: string;
  distance: string;
  phone: string;
  lastUpdated: string;
  isVerified?: boolean;
  bloodStock: BloodStock[];
  onNavigate?: () => void;
  onCall?: () => void;
}

const BloodBankCard = ({
  name,
  address,
  distance,
  phone,
  lastUpdated,
  isVerified = false,
  bloodStock,
  onNavigate,
  onCall,
}: BloodBankCardProps) => {
  return (
    <div className="group bg-card rounded-2xl border border-border p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            {isVerified && (
              <div className="flex items-center gap-1 text-available">
                <Shield className="w-4 h-4" fill="currentColor" />
                <span className="text-xs font-medium">Verified</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="line-clamp-1">{address}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-primary font-bold text-lg">{distance}</span>
          <span className="text-xs text-muted-foreground">away</span>
        </div>
      </div>

      {/* Blood Stock Grid */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {bloodStock.map((stock) => (
          <div
            key={stock.group}
            className="flex flex-col items-center gap-1 p-2 rounded-lg bg-secondary/50"
          >
            <span className="font-heading font-bold text-sm">{stock.group}</span>
            <StatusBadge status={stock.status} showText={false} size="sm" />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
          <Clock className="w-3.5 h-3.5" />
          <span>Updated {lastUpdated}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCall}
            className="text-muted-foreground hover:text-primary"
          >
            <Phone className="w-4 h-4" />
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={onNavigate}
            className="gap-1.5"
          >
            <Navigation className="w-4 h-4" />
            Navigate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BloodBankCard;
