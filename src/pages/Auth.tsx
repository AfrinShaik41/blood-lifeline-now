import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Mail, Lock, User, Users, Building2, Shield } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];
type UserType = "donor" | "blood_bank" | "admin" | null;

const Auth = () => {
  const [userType, setUserType] = useState<UserType>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, role, signIn, signUp, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect authenticated users
  useEffect(() => {
    if (!loading && user && role) {
      switch (role) {
        case "admin":
          navigate("/admin");
          break;
        case "donor":
          navigate("/donor-dashboard");
          break;
        case "blood_bank":
          navigate("/blood-bank-dashboard");
          break;
        default:
          navigate("/");
      }
    }
  }, [user, role, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have been logged in successfully.",
          });
        }
      } else {
        if (!userType) return;
        const { error } = await signUp(email, password, fullName, userType as AppRole);
        if (error) {
          toast({
            title: "Sign Up Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account Created!",
            description: "Please check your email to confirm your account, or you may be logged in automatically.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUserTypeIcon = () => {
    switch (userType) {
      case "donor":
        return <Users className="w-10 h-10 text-primary mx-auto mb-2" />;
      case "blood_bank":
        return <Building2 className="w-10 h-10 text-primary mx-auto mb-2" />;
      case "admin":
        return <Shield className="w-10 h-10 text-primary mx-auto mb-2" />;
      default:
        return null;
    }
  };

  const getUserTypeLabel = () => {
    switch (userType) {
      case "donor":
        return "Donor";
      case "blood_bank":
        return "Blood Bank";
      case "admin":
        return "Admin";
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Heart className="w-12 h-12 text-primary heartbeat" fill="currentColor" />
      </div>
    );
  }

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

            {/* User Type Selection (for signup only) */}
            {!isLogin && !userType ? (
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
                      <h3 className="font-heading font-bold text-foreground">Blood Donor</h3>
                      <p className="text-sm text-muted-foreground">Register to donate blood</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setUserType("blood_bank")}
                    className="w-full p-4 rounded-xl border-2 border-border hover:border-primary bg-secondary/30 hover:bg-primary/5 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Building2 className="w-7 h-7 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-heading font-bold text-foreground">Blood Bank</h3>
                      <p className="text-sm text-muted-foreground">Manage inventory</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setUserType("admin")}
                    className="w-full p-4 rounded-xl border-2 border-border hover:border-primary bg-secondary/30 hover:bg-primary/5 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Shield className="w-7 h-7 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-heading font-bold text-foreground">Administrator</h3>
                      <p className="text-sm text-muted-foreground">Manage the platform</p>
                    </div>
                  </button>
                </div>

                <p className="text-center text-muted-foreground text-sm mt-6">
                  Already have an account?{" "}
                  <button onClick={() => setIsLogin(true)} className="text-primary font-medium hover:underline">
                    Sign In
                  </button>
                </p>
              </div>
            ) : (
              <div className="bg-card rounded-3xl border border-border p-8 shadow-card">
                {/* Back Button (for signup) */}
                {!isLogin && userType && (
                  <button
                    onClick={() => setUserType(null)}
                    className="text-muted-foreground hover:text-foreground text-sm mb-6 flex items-center gap-1"
                  >
                    ← Choose different type
                  </button>
                )}

                {/* Form Header */}
                <div className="text-center mb-6">
                  {!isLogin && getUserTypeIcon()}
                  {isLogin ? (
                    <Shield className="w-10 h-10 text-primary mx-auto mb-2" />
                  ) : null}
                  <h2 className="font-heading font-bold text-xl text-foreground">
                    {isLogin ? "Sign In" : `${getUserTypeLabel()} Sign Up`}
                  </h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div>
                      <Label htmlFor="name" className="text-foreground">
                        {userType === "blood_bank" ? "Blood Bank Name" : "Full Name"}
                      </Label>
                      <div className="relative mt-2">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="name"
                          type="text"
                          placeholder={userType === "blood_bank" ? "City Blood Bank" : "John Doe"}
                          className="pl-10"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="email" className="text-foreground">Email</Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-foreground">Password</Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  <Button variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
                  </Button>
                </form>

                {/* Toggle */}
                <p className="text-center text-muted-foreground text-sm mt-6">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setUserType(null);
                    }}
                    className="text-primary font-medium hover:underline"
                  >
                    {isLogin ? "Sign Up" : "Sign In"}
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Auth;
