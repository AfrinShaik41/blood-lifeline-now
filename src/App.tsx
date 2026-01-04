// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

// Pages
import Index from "./pages/Index";
import Search from "./pages/Search";
import Emergency from "./pages/Emergency";
import Donors from "./pages/Donors";
import BloodBanks from "./pages/BloodBanks";
import Login from "./pages/Login"; // login page
import AdminDashboard from "./pages/AdminDashboard";
import DonorDashboard from "./pages/DonorDashboard"; // new
import BloodBankDashboard from "./pages/BloodBankDashboard"; // new
import SeedData from "./pages/SeedData";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          {/* Notifications */}
          <Toaster />
          <Sonner />

          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/search" element={<Search />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/donors" element={<Donors />} />
              <Route path="/blood-banks" element={<BloodBanks />} />
              <Route path="/login" element={<Login />} />

              {/* Dashboards */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/donor-dashboard" element={<DonorDashboard />} />
              <Route path="/blood-bank-dashboard" element={<BloodBankDashboard />} />

              {/* Development / Seed Utility */}
              <Route path="/seed" element={<SeedData />} />

              {/* Catch-all 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
