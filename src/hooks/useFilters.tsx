// useFilters Hook
// Manages search filters (city and blood group) with local storage persistence

import { useState, useEffect, useCallback } from "react";
import { filterStorage } from "@/lib/localStorage";

interface UseFiltersReturn {
  city: string;
  bloodGroup: string;
  setCity: (city: string) => void;
  setBloodGroup: (bloodGroup: string) => void;
  clearFilters: () => void;
}

/**
 * Custom hook for managing search filters with local storage persistence
 * Automatically saves and restores city and blood group filters
 * 
 * @returns Filter state and setter functions
 * 
 * @example
 * const { city, bloodGroup, setCity, setBloodGroup, clearFilters } = useFilters();
 */
export const useFilters = (): UseFiltersReturn => {
  // Initialize state from local storage
  const [city, setCityState] = useState<string>(() => filterStorage.getCity());
  const [bloodGroup, setBloodGroupState] = useState<string>(() => filterStorage.getBloodGroup());

  // Update local storage when city changes
  const setCity = useCallback((newCity: string) => {
    setCityState(newCity);
    filterStorage.setCity(newCity);
  }, []);

  // Update local storage when blood group changes
  const setBloodGroup = useCallback((newBloodGroup: string) => {
    setBloodGroupState(newBloodGroup);
    filterStorage.setBloodGroup(newBloodGroup);
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setCityState("");
    setBloodGroupState("");
    filterStorage.clear();
  }, []);

  // Restore filters from local storage on mount
  useEffect(() => {
    const storedCity = filterStorage.getCity();
    const storedBloodGroup = filterStorage.getBloodGroup();
    
    if (storedCity) {
      setCityState(storedCity);
    }
    if (storedBloodGroup) {
      setBloodGroupState(storedBloodGroup);
    }
  }, []);

  return {
    city,
    bloodGroup,
    setCity,
    setBloodGroup,
    clearFilters,
  };
};

