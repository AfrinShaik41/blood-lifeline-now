// Blood Bank QR Code Component
// Generates QR code for verified blood banks encoding ID and name

import { QRCodeSVG } from "qrcode.react";
import { QrCode, Download } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BloodBankQRCodeProps {
  /** Blood bank ID */
  id: string;
  /** Blood bank name */
  name: string;
  /** Whether the blood bank is verified (QR only shown if true) */
  isVerified: boolean;
  /** Optional size override (default: 200) */
  size?: number;
}

/**
 * Blood Bank QR Code Component
 * 
 * Displays a QR code for verified blood banks that encodes:
 * - Blood bank ID
 * - Blood bank name
 * 
 * The QR code data is formatted as JSON for easy parsing
 * 
 * @example
 * <BloodBankQRCode 
 *   id="blood-bank-123" 
 *   name="City Blood Bank" 
 *   isVerified={true} 
 * />
 */
const BloodBankQRCode = ({ 
  id, 
  name, 
  isVerified, 
  size = 200 
}: BloodBankQRCodeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Only show QR code for verified blood banks
  if (!isVerified) {
    return null;
  }

  // Encode blood bank data as JSON
  // Format: { id: string, name: string }
  const qrData = JSON.stringify({
    id,
    name,
    type: "blood_bank",
  });

  // Download QR code as SVG
  const handleDownload = () => {
    const svg = document.getElementById(`qr-code-${id}`);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name.replace(/\s+/g, "-")}-qr-code.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-muted-foreground hover:text-foreground"
          title="View QR Code"
        >
          <QrCode className="w-4 h-4" />
          QR Code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Blood Bank QR Code</DialogTitle>
          <DialogDescription>
            Scan this QR code to quickly access {name}'s information
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          {/* QR Code Display */}
          <div className="bg-white p-4 rounded-lg border-2 border-border">
            <QRCodeSVG
              id={`qr-code-${id}`}
              value={qrData}
              size={size}
              level="H" // High error correction for better scanning
              includeMargin={true}
            />
          </div>

          {/* Blood Bank Info */}
          <div className="text-center space-y-1">
            <p className="font-heading font-bold text-lg text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">ID: {id}</p>
          </div>

          {/* Download Button */}
          <Button onClick={handleDownload} variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Download QR Code
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BloodBankQRCode;

