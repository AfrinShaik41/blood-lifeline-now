import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Heart, Building2, Users } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

type UserType = "donor" | "blood_bank" | null;

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { toast } = useToast();

  const [userType, setUserType] = useState<UserType>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      toast({
        title: "Login successful",
        description: "Welcome back!"
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Something went wrong",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <Heart className="w-12 h-12 text-primary mx-auto mb-3" fill="currentColor" />
              <h1 className="font-heading font-bold text-2xl">Login</h1>
              <p className="text-muted-foreground">
                Sign in to continue
              </p>
            </div>

            {!userType ? (
              <div className="bg-card rounded-3xl border p-8 space-y-4">
                <Button
                  className="w-full flex gap-3"
                  variant="outline"
                  onClick={() => setUserType("donor")}
                >
                  <Users /> Donor
                </Button>

                <Button
                  className="w-full flex gap-3"
                  variant="outline"
                  onClick={() => setUserType("blood_bank")}
                >
                  <Building2 /> Blood Bank
                </Button>
              </div>
            ) : (
              <div className="bg-card rounded-3xl border p-8 space-y-4">
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                  />
                </div>

                <Button className="w-full" onClick={handleLogin}>
                  <Lock className="mr-2 h-4 w-4" />
                  Login
                </Button>

                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setUserType(null)}
                >
                  Back
                </Button>

                <p className="text-center text-sm">
                  Don’t have an account?{" "}
                  <Link to="/register" className="text-primary">
                    Register
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
