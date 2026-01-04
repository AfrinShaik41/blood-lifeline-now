// Seed Data Page
// Temporary utility page to seed Firestore with dummy data
// Remove this file or secure the route in production

import { useState } from "react";
import { seedBloodBanks, clearBloodBanks } from "@/services/firestore/seedData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Database, Loader2 } from "lucide-react";

const SeedData = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const { toast } = useToast();

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      await seedBloodBanks();
      toast({
        title: "Success!",
        description: "20 blood banks have been seeded into Firestore.",
      });
    } catch (error) {
      console.error("Seed error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to seed data",
        variant: "destructive",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  const handleClear = async () => {
    if (!confirm("Are you sure you want to clear all blood banks? This cannot be undone.")) {
      return;
    }

    setIsClearing(true);
    try {
      await clearBloodBanks();
      toast({
        title: "Cleared!",
        description: "All blood banks have been cleared from Firestore.",
      });
    } catch (error) {
      console.error("Clear error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to clear data",
        variant: "destructive",
      });
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-6 h-6" />
              Firestore Seed Data Utility
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                This utility seeds Firestore with 20 dummy blood banks across 5 cities:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Tirupati: 4 blood banks</li>
                <li>Hyderabad: 5 blood banks</li>
                <li>Bangalore: 5 blood banks</li>
                <li>Chennai: 3 blood banks</li>
                <li>Mumbai: 3 blood banks</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2">
                13 out of 20 blood banks will be marked as verified.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleSeed}
                disabled={isSeeding || isClearing}
                className="flex-1"
              >
                {isSeeding ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Seeding...
                  </>
                ) : (
                  "Seed Blood Banks"
                )}
              </Button>

              <Button
                onClick={handleClear}
                disabled={isSeeding || isClearing}
                variant="destructive"
                className="flex-1"
              >
                {isClearing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Clearing...
                  </>
                ) : (
                  "Clear All Blood Banks"
                )}
              </Button>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                <strong>Note:</strong> The seed function will skip if blood banks already exist
                to prevent duplicates. Use "Clear All" first if you want to reseed.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SeedData;

