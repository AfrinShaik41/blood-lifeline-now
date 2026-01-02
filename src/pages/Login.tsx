import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, Heart, Building2, Users } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type UserType = "donor" | "bloodbank" | null;

const Login = () => {
  const [userType, setUserType] = useState<UserType>(null);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Logo */}
            <div className="text-center mb-8">
              <Heart className="w-12 h-12 text-primary mx-auto mb-3 heartbeat" fill="currentColor" />
              <h1 className="font-heading font-bold text-2xl text-foreground">
                Welcome to RapidBlood
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                {isLogin ? "Sign in to continue" : "Create your account"}
              </p>
            </div>

            {/* User Type Selection */}
            {!userType ? (
              <div className="bg-card rounded-3xl border border-border p-8 shadow-card">
                <h2 className="font-heading font-bold text-lg text-center text-foreground mb-6">
                  I am a...
                </h2>
                <div className="space-y-4">
                  <button
                    onClick={() => setUserType("donor")}
                    className="w-full p-4 rounded-xl border-2 border-border hover:border-primary bg-secondary/30 hover:bg-primary/5 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Users className="w-7 h-7 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-heading font-bold text-foreground">
                        Blood Donor
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Register to donate blood and save lives
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setUserType("bloodbank")}
                    className="w-full p-4 rounded-xl border-2 border-border hover:border-primary bg-secondary/30 hover:bg-primary/5 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Building2 className="w-7 h-7 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-heading font-bold text-foreground">
                        Blood Bank
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Manage inventory and connect with donors
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-3xl border border-border p-8 shadow-card">
                {/* Back Button */}
                <button
                  onClick={() => setUserType(null)}
                  className="text-muted-foreground hover:text-foreground text-sm mb-6 flex items-center gap-1"
                >
                  ← Choose different type
                </button>

                {/* Form Header */}
                <div className="text-center mb-6">
                  {userType === "donor" ? (
                    <Users className="w-10 h-10 text-primary mx-auto mb-2" />
                  ) : (
                    <Building2 className="w-10 h-10 text-primary mx-auto mb-2" />
                  )}
                  <h2 className="font-heading font-bold text-xl text-foreground">
                    {userType === "donor" ? "Donor" : "Blood Bank"}{" "}
                    {isLogin ? "Login" : "Sign Up"}
                  </h2>
                </div>

                {/* Form */}
                <form className="space-y-4">
                  {!isLogin && (
                    <div>
                      <Label htmlFor="name" className="text-foreground">
                        {userType === "donor" ? "Full Name" : "Blood Bank Name"}
                      </Label>
                      <div className="relative mt-2">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="name"
                          type="text"
                          placeholder={userType === "donor" ? "John Doe" : "City Blood Bank"}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="email" className="text-foreground">
                      Email
                    </Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-foreground">
                      Password
                    </Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {isLogin && (
                    <div className="flex justify-end">
                      <a href="#" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </a>
                    </div>
                  )}

                  <Button variant="hero" size="lg" className="w-full">
                    {isLogin ? "Sign In" : "Create Account"}
                  </Button>
                </form>

                {/* Toggle */}
                <p className="text-center text-muted-foreground text-sm mt-6">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary font-medium hover:underline"
                  >
                    {isLogin ? "Sign Up" : "Sign In"}
                  </button>
                </p>
              </div>
            )}

            {/* Emergency Link */}
            <p className="text-center text-muted-foreground text-sm mt-8">
              Need blood urgently?{" "}
              <Link to="/emergency" className="text-emergency font-medium hover:underline">
                Use Emergency Mode
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
