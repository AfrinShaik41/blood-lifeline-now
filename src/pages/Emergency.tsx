import { useState } from "react";
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Clock, 
  Siren, 
  Navigation,
  Send,
  Users,
  Building2
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
<<<<<<< HEAD
    id: "bb-001",
=======
>>>>>>> 7cccfe0ae5813190e82df5b88e8ef7521683e014
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
<<<<<<< HEAD
    id: "bb-002",
=======
>>>>>>> 7cccfe0ae5813190e82df5b88e8ef7521683e014
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
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>("");
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
            We understand every second counts. Our emergency system prioritizes your request and 
            alerts the nearest blood banks and available donors instantly.
          </p>
        </div>
      </section>

      {/* Emergency Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {!isEmergencyActive ? (
              <div className="bg-card rounded-3xl border-2 border-emergency p-6 md:p-8 shadow-emergency">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="w-6 h-6 text-emergency" />
                  <h2 className="font-heading font-bold text-xl text-foreground">
                    Tell us what you need
                  </h2>
                </div>

                {/* Blood Group Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-muted-foreground mb-3">
                    Required Blood Group *
                  </label>
                  <div className="flex flex-wrap gap-3 justify-center">
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
                </div>

                {/* Location */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-muted-foreground mb-3">
                    Your Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Enter hospital or area name"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-12 h-14 text-lg rounded-xl"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary text-sm font-medium hover:underline">
                      Use GPS
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  variant="emergency"
                  size="xl"
                  onClick={handleEmergencySubmit}
                  disabled={!selectedBloodGroup}
                  className="w-full"
                >
                  <Siren className="w-5 h-5" />
                  Activate Emergency Mode
                </Button>

                <p className="text-center text-muted-foreground text-sm mt-4">
                  This will alert nearby blood banks and available donors
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Active Emergency Banner */}
                <div className="bg-emergency/10 border-2 border-emergency rounded-2xl p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-emergency flex items-center justify-center pulse-emergency">
                      <Siren className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h2 className="font-heading font-bold text-2xl text-emergency mb-2">
                    Emergency Mode Active
                  </h2>
                  <p className="text-foreground">
                    Urgent requirement for{" "}
                    <span className="font-bold text-emergency">{selectedBloodGroup}</span> blood in{" "}
                    <span className="font-bold">{location || "Your Area"}</span>
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    Nearby blood banks and donors have been alerted
                  </p>
                </div>

                {/* Emergency Contacts */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-primary" />
                    Emergency Contacts
                  </h3>
                  <div className="grid gap-3">
                    {emergencyContacts.map((contact) => (
                      <a
                        key={contact.number}
                        href={`tel:${contact.number}`}
                        className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
                      >
                        <div>
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {contact.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Available: {contact.available}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-primary font-bold">
                          <Phone className="w-4 h-4" />
                          {contact.number}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Nearest Blood Banks */}
                <div>
                  <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    Nearest Blood Banks with {selectedBloodGroup}
                  </h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    {nearestBloodBanks.map((bank) => (
                      <BloodBankCard key={bank.name} {...bank} />
                    ))}
                  </div>
                </div>

                {/* Request Donors */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Request from Donors
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {3} voluntary donors with {selectedBloodGroup} blood are available nearby. 
                    Send them a request for help.
                  </p>
                  <Button className="w-full">
                    <Send className="w-4 h-4" />
                    Send Request to Nearby Donors
                  </Button>
                </div>

                {/* Cancel Button */}
                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => setIsEmergencyActive(false)}
                  >
                    Cancel Emergency Mode
                  </Button>
                </div>
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
