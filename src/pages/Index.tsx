import { Link } from "react-router-dom";
import { 
  Heart, 
  Search, 
  MapPin, 
  Users, 
  Clock, 
  Shield, 
  Zap,
  Building2,
  Bell,
  MessageCircle,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchForm from "@/components/SearchForm";
import BloodBankCard from "@/components/BloodBankCard";
import FeatureCard from "@/components/FeatureCard";
import StatCard from "@/components/StatCard";
import EmergencyBanner from "@/components/EmergencyBanner";
import Chatbot from "@/components/Chatbot";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

// Mock data for blood banks
const mockBloodBanks = [
  {
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
];

const features = [
  {
    icon: Search,
    title: "Instant Search",
    description: "Find blood banks near you in seconds with real-time availability status.",
  },
  {
    icon: Clock,
    title: "Live Updates",
    description: "Blood stock levels updated every few minutes by verified blood banks.",
  },
  {
    icon: Zap,
    title: "Emergency Mode",
    description: "Priority alerts to nearest blood banks when you need blood urgently.",
  },
  {
    icon: Users,
    title: "Donor Connect",
    description: "Connect with voluntary donors when blood banks run low on stock.",
  },
  {
    icon: Shield,
    title: "Verified Sources",
    description: "All blood banks are verified with QR codes for authenticity.",
  },
  {
    icon: TrendingUp,
    title: "AI Predictions",
    description: "Smart predictions help blood banks prepare for high-demand periods.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <EmergencyBanner />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 fade-in-up">
              <Heart className="w-4 h-4 heartbeat" fill="currentColor" />
              <span>Every Second Counts</span>
            </div>

            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
              Find Blood Banks{" "}
              <span className="text-primary">Near You</span>
              <br />
              <span className="text-muted-foreground text-3xl md:text-4xl lg:text-5xl">
                When Every Second Matters
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              India's fastest blood availability platform. Real-time stock updates, 
              verified blood banks, and emergency alerts — all in one place.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link to="/emergency">
                <Button variant="emergency" size="xl">
                  <Zap className="w-5 h-5" />
                  Need Blood Urgently
                </Button>
              </Link>
              <Link to="/donors">
                <Button variant="outline" size="xl">
                  <Users className="w-5 h-5" />
                  Become a Donor
                </Button>
              </Link>
            </div>
          </div>

          {/* Search Form */}
          <div className="max-w-3xl mx-auto">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <StatCard
              value="500+"
              label="Blood Banks"
              icon={<Building2 className="w-6 h-6" />}
            />
            <StatCard
              value="10K+"
              label="Active Donors"
              icon={<Users className="w-6 h-6" />}
            />
            <StatCard
              value="50K+"
              label="Lives Saved"
              icon={<Heart className="w-6 h-6" />}
            />
            <StatCard
              value="24/7"
              label="Emergency Support"
              icon={<Clock className="w-6 h-6" />}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
              Why Choose <span className="text-primary">Rapid Blood</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built for emergencies, designed for speed. Our platform ensures you find blood when you need it most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Blood Banks */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-heading font-bold text-3xl text-foreground mb-2">
                Blood Banks Near You
              </h2>
              <p className="text-muted-foreground">
                Real-time availability from verified blood banks in your area
              </p>
            </div>
            <Link to="/search">
              <Button variant="outline">
                View All Blood Banks
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBloodBanks.map((bank) => (
              <BloodBankCard key={bank.name} {...bank} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 gradient-hero opacity-90" />
            <div className="relative z-10 px-8 py-16 md:py-20 text-center text-white">
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                Be a Hero. Donate Blood Today.
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8">
                One donation can save up to 3 lives. Register as a voluntary donor and get notified when someone nearby needs your blood type.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/donors">
                  <Button
                    variant="glass"
                    size="xl"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    <Users className="w-5 h-5" />
                    Register as Donor
                  </Button>
                </Link>
                <Link to="/blood-banks">
                  <Button
                    variant="glass"
                    size="xl"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    <Building2 className="w-5 h-5" />
                    Register Blood Bank
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground text-sm mb-8">
            Trusted by leading hospitals and government health departments
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
            {["AIIMS", "Red Cross", "Apollo", "Max Healthcare", "NACO", "WHO"].map((name) => (
              <div
                key={name}
                className="font-heading font-bold text-lg md:text-xl text-muted-foreground"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
