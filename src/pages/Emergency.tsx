import { useState } from "react";
import {
  AlertTriangle,
  Phone,
  MapPin,
  Siren,
  Send,
  Users,
  Building2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BloodGroupBadge from "@/components/BloodGroupBadge";
import BloodBankCard from "@/components/BloodBankCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Chatbot from "@/components/Chatbot";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const emergencyContacts = [
  { name: "National Blood Helpline", number: "1800-123-4567", available: "24/7" },
  { name: "Emergency Ambulance", number: "102", available: "24/7" },
  { name: "Red Cross Emergency", number: "1800-RED-CROSS", available: "24/7" },
];

const nearestBloodBanks = [
  {
    id: "bb-001",
    name: "City Central Blood Bank",
    address: "123 Main Road, Sector 15, New Delhi",
    distance: "1.2 km",
    phone: "+91 98765 43210",
    lastUpdated: "Just now",
    isVerified: true,
    bloodStock: [
      { group: "A+", status: "available" as const },
      { group: "A-", status: "limited" as const },
      { group: "B+", status: "available" as const },
      { group: "B-", status: "unavailable" as const },
      { group: "AB+", status: "available" as const },
      { group: "AB-", status: "limited" as const },
      { group: "O+", status: "available" as const },
      { group: "O-", status: "limited" as const },
    ],
  },
  {
    id: "bb-002",
    name: "Red Cross Society Blood Center",
    address: "456 Park Avenue, Connaught Place, New Delhi",
    distance: "2.8 km",
    phone: "+91 98765 43211",
    lastUpdated: "2 mins ago",
    isVerified: true,
    bloodStock: [
      { group: "A+", status: "available" as const },
      { group: "A-", status: "available" as const },
      { group: "B+", status: "limited" as const },
      { group: "B-", status: "available" as const },
      { group: "AB+", status: "limited" as const },
      { group: "AB-", status: "unavailable" as const },
      { group: "O+", status: "available" as const },
      { group: "O-", status: "available" as const },
    ],
  },
];

const Emergency = () => {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);

  const handleEmergencySubmit = () => {
    if (selectedBloodGroup) {
      setIsEmergencyActive(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Emergency Header */}
      <section className="pt-24 pb-8 gradient-emergency text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Siren className="w-8 h-8 animate-pulse" />
            <h1 className="font-heading font-bold text-3xl md:text-4xl">
              Emergency Blood Request
            </h1>
          </div>
          <p className="text-white/80 max-w-2xl">
            Every second counts. We immediately notify nearby blood banks and donors.
          </p>
        </div>
      </section>

      {/* Emergency Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {!isEmergencyActive ? (
              <div className="bg-card rounded-3xl border-2 border-emergency p-6 shadow-emergency">
                <h2 className="font-bold text-xl mb-6">Select Blood Group</h2>

                <div className="flex flex-wrap gap-3 justify-center mb-6">
                  {bloodGroups.map((group) => (
                    <BloodGroupBadge
                      key={group}
                      bloodGroup={group}
                      size="lg"
                      interactive
                      selected={selectedBloodGroup === group}
                      onClick={() => setSelectedBloodGroup(group)}
                    />
                  ))}
                </div>

                <div className="relative mb-6">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2" />
                  <Input
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-12 h-14"
                  />
                </div>

                <Button
                  variant="emergency"
                  size="xl"
                  onClick={handleEmergencySubmit}
                  disabled={!selectedBloodGroup}
                  className="w-full"
                >
                  Activate Emergency Mode
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                <h2 className="text-xl font-bold text-emergency">
                  Emergency Mode Active for {selectedBloodGroup}
                </h2>

                <div className="grid gap-6 md:grid-cols-2">
                  {nearestBloodBanks.map((bank) => (
                    <BloodBankCard key={bank.id} {...bank} />
                  ))}
                </div>

                <Button onClick={() => setIsEmergencyActive(false)} variant="outline">
                  Cancel Emergency
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Emergency;
