import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "@/components/StatusBadge";
import { Heart, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmergencyRequest {
  requestId: string;
  bloodGroup: string;
  location: string;
  status: "pending" | "completed";
}

interface Donor {
  id: string;
  fullName: string;
  bloodGroup: string;
  lastDonationDate: string;
  donationCount: number;
  address: string;
  verified: boolean;
  emergencyRequests: EmergencyRequest[];
}

const mockDonor: Donor = {
  id: "donor-123",
  fullName: "John Doe",
  bloodGroup: "O+",
  lastDonationDate: "2025-11-15",
  donationCount: 5,
  address: "New Delhi",
  verified: true,
  emergencyRequests: [
    { requestId: "req-001", bloodGroup: "O+", location: "Saket", status: "pending" },
    { requestId: "req-002", bloodGroup: "A+", location: "Connaught Place", status: "completed" },
  ],
};

const DonorDashboard = () => {
  const [donor] = useState(mockDonor);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-24 pb-16 container mx-auto px-4">
        <h1 className="font-heading font-bold text-3xl text-foreground mb-6">
          Donor Dashboard
        </h1>

        {/* Profile Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" />
              {donor.fullName} ({donor.bloodGroup})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>Address:</strong> {donor.address}
            </p>
            <p>
              <strong>Last Donation:</strong> {donor.lastDonationDate}
            </p>
            <p>
              <strong>Total Donations:</strong> {donor.donationCount}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <StatusBadge status={donor.verified ? "available" : "unavailable"} />
            </p>
          </CardContent>
        </Card>

        {/* Emergency Requests */}
        <h2 className="font-heading font-bold text-2xl text-foreground mb-4">
          Emergency Requests
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {donor.emergencyRequests.map((req) => (
            <Card key={req.requestId}>
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">Blood Group: {req.bloodGroup}</span>
                  <StatusBadge status={req.status === "pending" ? "limited" : "available"} />
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{req.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Status: {req.status}</span>
                </div>
                <Button size="sm" variant="default" className="mt-2">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DonorDashboard;
