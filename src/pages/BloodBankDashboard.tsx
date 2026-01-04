import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "@/components/StatusBadge";
import { Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BloodStock {
  group: string;
  status: "available" | "limited" | "unavailable";
}

interface DonorRequest {
  requestId: string;
  donorName: string;
  bloodGroup: string;
  status: "pending" | "completed";
}

interface BloodBank {
  id: string;
  name: string;
  address: string;
  verified: boolean;
  bloodStock: BloodStock[];
  donorRequests: DonorRequest[];
  lastUpdated: string;
}

const mockBloodBank: BloodBank = {
  id: "bank-101",
  name: "City Central Blood Bank",
  address: "123 Main Road, New Delhi",
  verified: true,
  bloodStock: [
    { group: "A+", status: "available" },
    { group: "A-", status: "limited" },
    { group: "B+", status: "available" },
    { group: "O-", status: "unavailable" },
  ],
  donorRequests: [
    { requestId: "req-001", donorName: "John Doe", bloodGroup: "O+", status: "pending" },
    { requestId: "req-002", donorName: "Jane Smith", bloodGroup: "A+", status: "completed" },
  ],
  lastUpdated: "2025-12-04T10:30:00Z",
};

const BloodBankDashboard = () => {
  const [bank] = useState(mockBloodBank);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-24 pb-16 container mx-auto px-4">
        <h1 className="font-heading font-bold text-3xl text-foreground mb-6">
          Blood Bank Dashboard
        </h1>

        {/* Profile Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{bank.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>Address:</strong> {bank.address}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <StatusBadge status={bank.verified ? "available" : "unavailable"} />
            </p>
            <p>
              <strong>Last Updated:</strong> {new Date(bank.lastUpdated).toLocaleString()}
            </p>
          </CardContent>
        </Card>

        {/* Blood Stock */}
        <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Blood Stock</h2>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {bank.bloodStock.map((stock) => (
            <Card key={stock.group} className="p-3 flex flex-col items-center">
              <span className="font-bold text-lg">{stock.group}</span>
              <StatusBadge status={stock.status} />
            </Card>
          ))}
        </div>

        {/* Donor Requests */}
        <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Donor Requests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bank.donorRequests.map((req) => (
            <Card key={req.requestId}>
              <CardContent className="space-y-2">
                <p className="font-bold">{req.donorName}</p>
                <p>Blood Group: {req.bloodGroup}</p>
                <StatusBadge status={req.status === "pending" ? "limited" : "available"} />
                <Button size="sm" variant="default">
                  View Request
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

export default BloodBankDashboard;
