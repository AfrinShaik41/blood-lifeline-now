import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Shield, LogOut, Users, Building2, Droplets, 
  TrendingUp, CheckCircle, XCircle, Clock, Eye 
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type Donor = Database["public"]["Tables"]["donors"]["Row"];
type BloodBank = Database["public"]["Tables"]["blood_banks"]["Row"];
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

interface DonorWithProfile extends Donor {
  profiles?: Profile | null;
}

interface BloodBankWithProfile extends BloodBank {
  profiles?: Profile | null;
}

const AdminDashboard = () => {
  const { user, role, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [donors, setDonors] = useState<DonorWithProfile[]>([]);
  const [bloodBanks, setBloodBanks] = useState<BloodBankWithProfile[]>([]);
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalBloodBanks: 0,
    pendingVerifications: 0,
    activeDonors: 0,
  });
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && (!user || role !== "admin")) {
      navigate("/auth");
      return;
    }

    if (user && role === "admin") {
      fetchData();
    }
  }, [user, role, loading, navigate]);

  const fetchData = async () => {
    setLoadingData(true);
    try {
      // Fetch donors
      const { data: donorsData, error: donorsError } = await supabase
        .from("donors")
        .select("*")
        .order("created_at", { ascending: false });

      if (donorsError) throw donorsError;

      // Fetch profiles for donors
      const donorUserIds = donorsData?.map(d => d.user_id) || [];
      let donorProfiles: Profile[] = [];
      if (donorUserIds.length > 0) {
        const { data: profilesData } = await supabase
          .from("profiles")
          .select("*")
          .in("id", donorUserIds);
        donorProfiles = profilesData || [];
      }

      const donorsWithProfiles = donorsData?.map(donor => ({
        ...donor,
        profiles: donorProfiles.find(p => p.id === donor.user_id) || null,
      })) || [];

      setDonors(donorsWithProfiles);

      // Fetch blood banks
      const { data: bloodBanksData, error: bloodBanksError } = await supabase
        .from("blood_banks")
        .select("*")
        .order("created_at", { ascending: false });

      if (bloodBanksError) throw bloodBanksError;

      // Fetch profiles for blood banks
      const bbUserIds = bloodBanksData?.map(b => b.user_id) || [];
      let bbProfiles: Profile[] = [];
      if (bbUserIds.length > 0) {
        const { data: profilesData } = await supabase
          .from("profiles")
          .select("*")
          .in("id", bbUserIds);
        bbProfiles = profilesData || [];
      }

      const bloodBanksWithProfiles = bloodBanksData?.map(bb => ({
        ...bb,
        profiles: bbProfiles.find(p => p.id === bb.user_id) || null,
      })) || [];

      setBloodBanks(bloodBanksWithProfiles);

      // Calculate stats
      setStats({
        totalDonors: donorsData?.length || 0,
        totalBloodBanks: bloodBanksData?.length || 0,
        pendingVerifications: bloodBanksData?.filter(b => b.verification_status === "pending").length || 0,
        activeDonors: donorsData?.filter(d => d.is_active && d.is_available).length || 0,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
      });
    } finally {
      setLoadingData(false);
    }
  };

  const handleVerifyBloodBank = async (id: string, status: "approved" | "rejected") => {
    try {
      const { error } = await supabase
        .from("blood_banks")
        .update({
          verification_status: status,
          verified_at: new Date().toISOString(),
          verified_by: user?.id,
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Blood bank ${status === "approved" ? "approved" : "rejected"} successfully`,
      });

      fetchData();
    } catch (error) {
      console.error("Error updating blood bank:", error);
      toast({
        title: "Error",
        description: "Failed to update blood bank status",
        variant: "destructive",
      });
    }
  };

  const handleToggleDonorStatus = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from("donors")
        .update({ is_active: !isActive })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Donor ${isActive ? "deactivated" : "activated"} successfully`,
      });

      fetchData();
    } catch (error) {
      console.error("Error updating donor:", error);
      toast({
        title: "Error",
        description: "Failed to update donor status",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Shield className="w-12 h-12 text-primary animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <h1 className="font-heading font-bold text-xl text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">RapidBlood Management</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalDonors}</p>
                  <p className="text-sm text-muted-foreground">Total Donors</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalBloodBanks}</p>
                  <p className="text-sm text-muted-foreground">Blood Banks</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-limited/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-limited" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.pendingVerifications}</p>
                  <p className="text-sm text-muted-foreground">Pending Verifications</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-available/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-available" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.activeDonors}</p>
                  <p className="text-sm text-muted-foreground">Active Donors</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="donors" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="donors">
              <Users className="w-4 h-4 mr-2" />
              Donors ({donors.length})
            </TabsTrigger>
            <TabsTrigger value="blood-banks">
              <Building2 className="w-4 h-4 mr-2" />
              Blood Banks ({bloodBanks.length})
            </TabsTrigger>
          </TabsList>

          {/* Donors Tab */}
          <TabsContent value="donors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Registered Donors</CardTitle>
              </CardHeader>
              <CardContent>
                {donors.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No donors registered yet</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Blood Group</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">City</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Donations</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {donors.map((donor) => (
                          <tr key={donor.id} className="border-b border-border hover:bg-muted/30">
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium text-foreground">
                                  {donor.profiles?.full_name || "Unknown"}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {donor.profiles?.email}
                                </p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                {donor.blood_group}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-foreground">{donor.city}</td>
                            <td className="py-3 px-4">
                              {donor.is_active ? (
                                <Badge className="bg-available text-available-foreground">Active</Badge>
                              ) : (
                                <Badge variant="secondary">Inactive</Badge>
                              )}
                            </td>
                            <td className="py-3 px-4 text-foreground">{donor.total_donations}</td>
                            <td className="py-3 px-4">
                              <Button
                                size="sm"
                                variant={donor.is_active ? "destructive" : "default"}
                                onClick={() => handleToggleDonorStatus(donor.id, donor.is_active)}
                              >
                                {donor.is_active ? "Deactivate" : "Activate"}
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blood Banks Tab */}
          <TabsContent value="blood-banks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Registered Blood Banks</CardTitle>
              </CardHeader>
              <CardContent>
                {bloodBanks.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No blood banks registered yet</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">City</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Contact</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">License</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bloodBanks.map((bank) => (
                          <tr key={bank.id} className="border-b border-border hover:bg-muted/30">
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium text-foreground">{bank.name}</p>
                                <p className="text-sm text-muted-foreground">{bank.address}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-foreground">{bank.city}</td>
                            <td className="py-3 px-4">
                              <div>
                                <p className="text-foreground">{bank.phone || "N/A"}</p>
                                <p className="text-sm text-muted-foreground">{bank.email || "N/A"}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              {bank.verification_status === "approved" ? (
                                <Badge className="bg-available text-available-foreground">Verified</Badge>
                              ) : bank.verification_status === "pending" ? (
                                <Badge className="bg-limited text-limited-foreground">Pending</Badge>
                              ) : (
                                <Badge variant="destructive">Rejected</Badge>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              {bank.license_url ? (
                                <Button size="sm" variant="outline" asChild>
                                  <a href={bank.license_url} target="_blank" rel="noopener noreferrer">
                                    <Eye className="w-4 h-4 mr-1" />
                                    View
                                  </a>
                                </Button>
                              ) : (
                                <span className="text-muted-foreground text-sm">Not uploaded</span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              {bank.verification_status === "pending" && (
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => handleVerifyBloodBank(bank.id, "approved")}
                                    className="bg-available hover:bg-available/90"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleVerifyBloodBank(bank.id, "rejected")}
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </Button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
