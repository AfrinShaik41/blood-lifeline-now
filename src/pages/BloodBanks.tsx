import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Building2, 
  LogIn, 
  MapPin, 
  Phone, 
  Mail,
  Clock,
  Shield,
  BarChart3,
  Bell,
  QrCode
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Chatbot from "@/components/Chatbot";

const features = [
  {
    icon: BarChart3,
    title: "Real-time Stock Updates",
    description: "Update your blood inventory in real-time and reach more patients.",
  },
  {
    icon: Bell,
    title: "Emergency Alerts",
    description: "Receive instant notifications for urgent blood requirements.",
  },
  {
    icon: Shield,
    title: "Verified Badge",
    description: "Get verified status and build trust with patients and donors.",
  },
  {
    icon: QrCode,
    title: "Unique QR Code",
    description: "Receive a scannable QR code for quick verification.",
  },
];

const BloodBanks = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <Building2 className="w-4 h-4" />
              <span>For Blood Banks</span>
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
              Join India's Largest{" "}
              <span className="text-primary">Blood Network</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Register your blood bank and help save more lives. Update your stock in 
              real-time and connect with patients who need blood urgently.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="text-center p-6 rounded-2xl bg-card border border-border"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Login/Register Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Tab Switcher */}
            <div className="flex rounded-xl bg-secondary p-1 mb-8">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  activeTab === "login"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  activeTab === "register"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Register
              </button>
            </div>

            <div className="bg-card rounded-3xl border border-border p-6 md:p-8 shadow-card">
              {activeTab === "login" ? (
                <form className="space-y-5">
                  <div className="text-center mb-6">
                    <LogIn className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h2 className="font-heading font-bold text-xl text-foreground">
                      Blood Bank Login
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Access your dashboard to update stock
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-foreground">
                      Email
                    </Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="bloodbank@example.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-foreground">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="mt-2"
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-muted-foreground">
                      <input type="checkbox" className="rounded border-border" />
                      Remember me
                    </label>
                    <a href="#" className="text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>

                  <Button variant="hero" size="lg" className="w-full">
                    <LogIn className="w-4 h-4" />
                    Login to Dashboard
                  </Button>
                </form>
              ) : (
                <form className="space-y-5">
                  <div className="text-center mb-6">
                    <Building2 className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h2 className="font-heading font-bold text-xl text-foreground">
                      Register Your Blood Bank
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Join our network and help save lives
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="bankName" className="text-foreground">
                      Blood Bank Name *
                    </Label>
                    <div className="relative mt-2">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="bankName"
                        type="text"
                        placeholder="Your blood bank name"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="regEmail" className="text-foreground">
                      Official Email *
                    </Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="regEmail"
                        type="email"
                        placeholder="official@bloodbank.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="regPhone" className="text-foreground">
                      Contact Number *
                    </Label>
                    <div className="relative mt-2">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="regPhone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-foreground">
                      Full Address *
                    </Label>
                    <div className="relative mt-2">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <textarea
                        id="address"
                        placeholder="Enter complete address with pin code"
                        rows={3}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="license" className="text-foreground">
                      License Number
                    </Label>
                    <Input
                      id="license"
                      type="text"
                      placeholder="Blood bank license number"
                      className="mt-2"
                    />
                  </div>

                  <Button variant="hero" size="lg" className="w-full">
                    <Shield className="w-4 h-4" />
                    Submit for Verification
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Registration is subject to verification. We'll contact you within 24-48 hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default BloodBanks;
