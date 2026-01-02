import { Link } from "react-router-dom";
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-primary" fill="currentColor" />
              <div>
                <span className="font-heading font-bold text-xl text-background">
                  Rapid<span className="text-primary">Blood</span>
                </span>
              </div>
            </Link>
            <p className="text-background/70 text-sm mb-6">
              Saving Time, Saving Lives. India's fastest blood availability platform connecting those in need with verified blood banks and donors.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Find Blood Banks", href: "/search" },
                { label: "Register as Donor", href: "/donors" },
                { label: "Blood Bank Login", href: "/login" },
                { label: "Emergency", href: "/emergency" },
                { label: "About Us", href: "/about" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              {[
                { label: "Blood Donation FAQs", href: "#" },
                { label: "Eligibility Criteria", href: "#" },
                { label: "Blood Group Info", href: "#" },
                { label: "Partner Hospitals", href: "#" },
                { label: "API for Developers", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Emergency Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:1800-123-4567"
                  className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="block text-xs">24/7 Helpline</span>
                    <span className="font-bold text-background">1800-123-4567</span>
                  </div>
                </a>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">help@rapidblood.in</span>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/50 text-sm text-center md:text-left">
              © 2024 Rapid Blood. All rights reserved. Made with ❤️ for India.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-background/50 hover:text-background text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-background/50 hover:text-background text-sm">
                Terms of Service
              </Link>
              <Link to="/disclaimer" className="text-background/50 hover:text-background text-sm">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
