import { useState } from "react";
import { 
  Heart, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  CheckCircle2,
  AlertCircle,
  Gift
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BloodGroupBadge from "@/components/BloodGroupBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Chatbot from "@/components/Chatbot";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const benefits = [
  {
    icon: Heart,
    title: "Save Lives",
    description: "One donation can save up to 3 lives. Be someone's hero today.",
  },
  {
    icon: Gift,
    title: "Health Benefits",
    description: "Regular donation reduces risk of heart disease and keeps iron levels in check.",
  },
  {
    icon: Calendar,
    title: "Donation Reminders",
    description: "Get notified when you're eligible to donate again (every 56 days).",
  },
  {
    icon: AlertCircle,
    title: "Emergency Alerts",
    description: "Receive alerts when someone nearby urgently needs your blood type.",
  },
];

const Donors = () => {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    age: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBloodGroup && formData.name && formData.phone) {
      setIsRegistered(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <Heart className="w-4 h-4 heartbeat" fill="currentColor" />
              <span>Become a Lifesaver</span>
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
              Register as a{" "}
              <span className="text-primary">Blood Donor</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Join our community of heroes. Get notified when someone nearby needs 
              your blood type and help save lives.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex items-start gap-4 p-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {!isRegistered ? (
              <div className="bg-card rounded-3xl border border-border p-6 md:p-8 shadow-card">
                <h2 className="font-heading font-bold text-2xl text-foreground mb-6 text-center">
                  Donor Registration Form
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Blood Group */}
                  <div>
                    <Label className="text-foreground mb-3 block">
                      Your Blood Group *
                    </Label>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {bloodGroups.map((group) => (
                        <BloodGroupBadge
                          key={group}
                          bloodGroup={group}
                          interactive
                          selected={selectedBloodGroup === group}
                          onClick={() => setSelectedBloodGroup(group)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Personal Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-foreground">
                        Full Name *
                      </Label>
                      <div className="relative mt-2">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="age" className="text-foreground">
                        Age *
                      </Label>
                      <div className="relative mt-2">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="age"
                          type="number"
                          placeholder="Your age"
                          min="18"
                          max="65"
                          value={formData.age}
                          onChange={(e) =>
                            setFormData({ ...formData, age: e.target.value })
                          }
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-foreground">
                        Phone Number *
                      </Label>
                      <div className="relative mt-2">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="pl-10"
                          required
                        />
                      </div>
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
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="city" className="text-foreground">
                      City / Area *
                    </Label>
                    <div className="relative mt-2">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="city"
                        type="text"
                        placeholder="Enter your city or area"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Consent */}
                  <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl">
                    <input
                      type="checkbox"
                      id="consent"
                      className="mt-1 rounded border-border"
                      required
                    />
                    <label htmlFor="consent" className="text-sm text-muted-foreground">
                      I consent to receive emergency blood request notifications and agree to 
                      the privacy policy. My phone number will not be shared publicly.
                    </label>
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="xl"
                    className="w-full"
                    disabled={!selectedBloodGroup}
                  >
                    <Heart className="w-5 h-5" />
                    Register as Donor
                  </Button>
                </form>
              </div>
            ) : (
              <div className="bg-card rounded-3xl border border-available p-8 text-center shadow-card">
                <div className="w-20 h-20 rounded-full bg-available/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-available" />
                </div>
                <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
                  Registration Successful!
                </h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for registering as a blood donor. You'll receive notifications 
                  when someone nearby needs {selectedBloodGroup} blood.
                </p>
                <div className="bg-secondary/50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-muted-foreground">
                    Your donor ID: <strong className="text-foreground">RB-2024-{Math.floor(Math.random() * 10000)}</strong>
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsRegistered(false);
                    setSelectedBloodGroup("");
                    setFormData({ name: "", email: "", phone: "", city: "", age: "" });
                  }}
                >
                  Register Another Donor
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Eligibility Info */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-2xl text-foreground mb-6 text-center">
              Donor Eligibility Criteria
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Age between 18-65 years",
                "Weight at least 50 kg",
                "Hemoglobin above 12.5 g/dL",
                "No recent tattoos or piercings",
                "Not pregnant or breastfeeding",
                "No chronic diseases",
                "Last donation at least 56 days ago",
                "Good overall health",
              ].map((criteria, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"
                >
                  <CheckCircle2 className="w-5 h-5 text-available flex-shrink-0" />
                  <span className="text-foreground text-sm">{criteria}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Donors;
