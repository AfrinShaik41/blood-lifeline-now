import { AlertTriangle, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const EmergencyBanner = () => {
  return (
    <div className="gradient-emergency text-emergency-foreground py-3 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 animate-pulse" />
          <p className="text-sm font-medium">
            <span className="font-bold">Need blood urgently?</span>{" "}
            <span className="hidden sm:inline">We'll find the nearest available blood bank for you.</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a href="tel:1800-123-4567" className="flex items-center gap-2 text-sm font-bold hover:underline">
            <Phone className="w-4 h-4" />
            1800-123-4567
          </a>
          <Link to="/emergency">
            <Button
              variant="glass"
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              Emergency Mode
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmergencyBanner;
