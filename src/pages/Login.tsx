<<<<<<< HEAD
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
=======
import { useState } from "react";
import { Link } from "react-router-dom";
>>>>>>> 7cccfe0ae5813190e82df5b88e8ef7521683e014
import { User, Mail, Lock, Heart, Building2, Users } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
<<<<<<< HEAD
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

// User role type
type UserType = "donor" | "blood_bank" | null;
=======

type UserType = "donor" | "bloodbank" | null;
>>>>>>> 7cccfe0ae5813190e82df5b88e8ef7521683e014

const Login = () => {
  const [userType, setUserType] = useState<UserType>(null);
  const [isLogin, setIsLogin] = useState(true);
<<<<<<< HEAD
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, role, signIn, signUp, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect authenticated users safely
  useEffect(() => {
    if (!loading && user && role) {
      switch (role) {
        case "admin":
          navigate("/admin");
          break;
        case "donor":
          // if dashboard doesn't exist, redirect home
          navigate("/"); 
          break;
        case "blood_bank":
          // if dashboard doesn't exist, redirect home
          navigate("/"); 
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
        if (!userType) {
          toast({
            title: "Role Required",
            description: "Please select whether you are a Donor or Blood Bank.",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }

        const { error } = await signUp(email, password, fullName, userType);
        if (error) {
          toast({
            title: "Sign Up Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account Created!",
            description: "You are now logged in.",
          });
        }
      }
    } catch {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Heart className="w-12 h-12 text-primary heartbeat" fill="currentColor" />
      </div>
    );
  }
=======
>>>>>>> 7cccfe0ae5813190e82df5b88e8ef7521683e014

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
<<<<<<< HEAD
=======
            {/* Logo */}
>>>>>>> 7cccfe0ae5813190e82df5b88e8ef7521683e014
            <div className="text-center mb-8">
              <Heart className="w-12 h-12 text-primary mx-auto mb-3 heartbeat" fill="currentColor" />
              <h1 className="font-heading font-bold text-2xl text-foreground">
                Welcome to RapidBlood
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                {isLogin ? "Sign in to continue" : "Create your account"}
              </p>
            </div>

<<<<<<< HEAD
=======
            {/* User Type Selection */}
>>>>>>> 7cccfe0ae5813190e82df5b88e8ef7521683e014
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
<<<<<<< HEAD
                    onClick={() => setUserType("blood_bank")}
=======
                    onClick={() => setUserType("bloodbank")}
>>>>>>> 7cccfe0ae5813190e82df5b88e8ef7521683e014
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
<<<<<<< HEAD
=======
                {/* Back Button */}
>>>>>>> 7cccfe0ae5813190e82df5b88e8ef7521683e014
                <button
                  onClick={() => setUserType(null)}
                  className="text-muted-foreground hover:text-foreground text-sm mb-6 flex items-center gap-1"
                >
                  ← Choose different type
                </button>

<<<<<<< HEAD
=======
                {/* Form Header */}
>>>>>>> 7cccfe0ae5813190e82df5b88e8ef7521683e014
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

<<<<<<< HEAD
                <form onSubmit={handleSubmit} className="space-y-4">
=======
                {/* Form */}
                <form className="space-y-4">
>>>>>>> 7cccfe0ae5813190e82df5b88e8ef7521683e014
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
<<<<<<< HEAD
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
=======
>>>>>>> 7cccfe0ae5813190e82df5b88e8ef7521683e014
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
<<<<<<< HEAD
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
=======
>>>>>>> 7cccfe0ae5813190e82df5b88e8ef7521683e014
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
<<<<<<< HEAD
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
=======
>>>>>>> 7cccfe0ae5813190e82df5b88e8ef7521683e014
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

<<<<<<< HEAD
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
                  </Button>
                </form>

                <p className="text-center text-muted-foreground text-sm mt-6">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setUserType(null);
                      setEmail("");
                      setPassword("");
                      setFullName("");
                    }}
=======
                  <Button variant="hero" size="lg" className="w-full">
                    {isLogin ? "Sign In" : "Create Account"}
                  </Button>
                </form>

                {/* Toggle */}
                <p className="text-center text-muted-foreground text-sm mt-6">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
>>>>>>> 7cccfe0ae5813190e82df5b88e8ef7521683e014
                    className="text-primary font-medium hover:underline"
                  >
                    {isLogin ? "Sign Up" : "Sign In"}
                  </button>
                </p>
              </div>
            )}

<<<<<<< HEAD
=======
            {/* Emergency Link */}
>>>>>>> 7cccfe0ae5813190e82df5b88e8ef7521683e014
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
