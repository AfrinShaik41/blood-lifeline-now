import { useState } from "react";
import { MapPin, Filter, List, Map as MapIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchForm from "@/components/SearchForm";
import BloodBankCard from "@/components/BloodBankCard";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import Chatbot from "@/components/Chatbot";
import { useFilters } from "@/hooks/useFilters";

const allBloodBanks = [
  {
    id: "bb-001",
    name: "City Central Blood Bank",
    address: "123 Main Road, Sector 15, New Delhi",
    distance: "1.2 km",
    phone: "+91 98765 43210",
    lastUpdated: "5 mins ago",
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
    lastUpdated: "12 mins ago",
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
  {
    id: "bb-003",
    name: "Apollo Hospital Blood Bank",
    address: "789 Hospital Road, Saket, New Delhi",
    distance: "4.5 km",
    phone: "+91 98765 43212",
    lastUpdated: "20 mins ago",
    isVerified: true,
    bloodStock: [
      { group: "A+", status: "limited" as const },
      { group: "A-", status: "available" as const },
      { group: "B+", status: "available" as const },
      { group: "B-", status: "available" as const },
      { group: "AB+", status: "available" as const },
      { group: "AB-", status: "available" as const },
      { group: "O+", status: "limited" as const },
      { group: "O-", status: "unavailable" as const },
    ],
  },
  {
    id: "bb-004",
    name: "Government Blood Bank",
    address: "12 Civil Lines, Central Delhi",
    distance: "5.1 km",
    phone: "+91 98765 43213",
    lastUpdated: "8 mins ago",
    isVerified: true,
    bloodStock: [
      { group: "A+", status: "available" as const },
      { group: "A-", status: "unavailable" as const },
      { group: "B+", status: "available" as const },
      { group: "B-", status: "limited" as const },
      { group: "AB+", status: "available" as const },
      { group: "AB-", status: "limited" as const },
      { group: "O+", status: "available" as const },
      { group: "O-", status: "available" as const },
    ],
  },
  {
    id: "bb-005",
    name: "Fortis Healthcare Blood Center",
    address: "34 Vasant Kunj, South Delhi",
    distance: "7.3 km",
    phone: "+91 98765 43214",
    lastUpdated: "15 mins ago",
    isVerified: true,
    bloodStock: [
      { group: "A+", status: "available" as const },
      { group: "A-", status: "available" as const },
      { group: "B+", status: "available" as const },
      { group: "B-", status: "available" as const },
      { group: "AB+", status: "limited" as const },
      { group: "AB-", status: "unavailable" as const },
      { group: "O+", status: "available" as const },
      { group: "O-", status: "limited" as const },
    ],
  },
];

const Search = () => {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  // Use filters hook to get persisted city and blood group
  const { city, bloodGroup } = useFilters();
  
  const handleSearch = (selectedBloodGroup: string, location: string) => {
    // Search logic can be implemented here
    // Filters are automatically persisted via useFilters hook
    console.log("Searching for:", selectedBloodGroup, location);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Search Header */}
      <section className="pt-24 pb-8 bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="font-heading font-bold text-3xl text-foreground mb-6">
            Find Blood Banks
          </h1>
          <SearchForm variant="compact" />
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">
                Showing <strong className="text-foreground">{allBloodBanks.length}</strong> blood banks near{" "}
                <strong className="text-foreground">New Delhi</strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              <div className="flex rounded-lg border border-border overflow-hidden">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${
                    viewMode === "list"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`p-2 ${
                    viewMode === "map"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <MapIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Status Legend */}
          <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-card rounded-xl border border-border">
            <span className="text-sm font-medium text-foreground">Availability:</span>
            <StatusBadge status="available" />
            <StatusBadge status="limited" />
            <StatusBadge status="unavailable" />
          </div>

          {/* Results Grid */}
          {viewMode === "list" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allBloodBanks.map((bank) => (
                <BloodBankCard key={bank.name} {...bank} />
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="h-[500px] flex items-center justify-center bg-secondary/50">
                <div className="text-center p-8">
                  <MapIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                    Map View
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                    Connect Google Maps API to enable interactive map view with navigation
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Search;
