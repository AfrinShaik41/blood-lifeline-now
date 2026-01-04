import React, { useState, useEffect } from "react";
import { Search, MapPin, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BloodGroupBadge from "./BloodGroupBadge";
import { useFilters } from "@/hooks/useFilters";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

interface SearchFormProps {
  onSearch?: (bloodGroup: string, location: string) => void;
  variant?: "hero" | "compact";
}

const SearchForm = ({ onSearch, variant = "hero" }: SearchFormProps) => {
  // Use filters hook with local storage persistence
  const { city, bloodGroup, setCity, setBloodGroup } = useFilters();
  
  // Use local state for location input (city is stored, but location might be more specific)
  const [location, setLocation] = useState(city);
  
  // Sync location input with stored city on mount
  useEffect(() => {
    if (city) {
      setLocation(city);
    }
  }, [city]);

  const handleSearch = () => {
    // Update stored filters when searching
    if (location) {
      setCity(location);
    }
    if (bloodGroup) {
      setBloodGroup(bloodGroup);
    }
    
    if (onSearch) {
      onSearch(bloodGroup, location);
    }
  };
  
  const handleBloodGroupChange = (group: string) => {
    setBloodGroup(group);
  };
  
  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
  };

  if (variant === "compact") {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Droplets className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <select
            value={bloodGroup}
            onChange={(e) => handleBloodGroupChange(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          >
            <option value="">Blood Group</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter city or area"
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="pl-10 h-11"
          />
        </div>
        <Button onClick={handleSearch} className="h-11 px-6">
          <Search className="w-5 h-5" />
          Search
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-3xl p-6 md:p-8 shadow-card border border-border">
      {/* Blood Group Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-muted-foreground mb-3">
          Select Blood Group
        </label>
        <div className="flex flex-wrap gap-3 justify-center">
          {bloodGroups.map((group) => (
            <BloodGroupBadge
              key={group}
              bloodGroup={group}
              interactive
              selected={bloodGroup === group}
              onClick={() => handleBloodGroupChange(group)}
            />
          ))}
        </div>
      </div>

      {/* Location Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-muted-foreground mb-3">
          Enter Location
        </label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="City, area, or pin code"
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="pl-12 h-14 text-lg rounded-xl"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary text-sm font-medium hover:underline">
            Use my location
          </button>
        </div>
      </div>

      {/* Search Button */}
      <Button
        variant="hero"
        size="xl"
        onClick={handleSearch}
        className="w-full"
      >
        <Search className="w-5 h-5" />
        Find Blood Banks Near Me
      </Button>
    </div>
  );
};

export default SearchForm;
