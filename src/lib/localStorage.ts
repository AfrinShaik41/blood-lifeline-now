// Local Storage Utility
// Provides type-safe local storage operations for user session and filters

// Storage keys
const STORAGE_KEYS = {
  USER_ID: "blood_lifeline_user_id",
  USER_ROLE: "blood_lifeline_user_role",
  SELECTED_CITY: "blood_lifeline_selected_city",
  SELECTED_BLOOD_GROUP: "blood_lifeline_selected_blood_group",
} as const;

// User role type
type AppRole = "donor" | "blood_bank" | "admin" | null;

/**
 * User Session Storage
 * Stores and retrieves logged-in user information
 */
export const userStorage = {
  /**
   * Store user ID and role in local storage
   * @param userId - Firebase Auth user ID
   * @param role - User role (donor, blood_bank, admin)
   */
  set: (userId: string, role: AppRole): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
      localStorage.setItem(STORAGE_KEYS.USER_ROLE, role || "");
    } catch (error) {
      console.error("Error storing user session:", error);
    }
  },

  /**
   * Get stored user ID from local storage
   * @returns User ID or null if not found
   */
  getUserId: (): string | null => {
    try {
      return localStorage.getItem(STORAGE_KEYS.USER_ID);
    } catch (error) {
      console.error("Error getting user ID:", error);
      return null;
    }
  },

  /**
   * Get stored user role from local storage
   * @returns User role or null if not found
   */
  getRole: (): AppRole => {
    try {
      const role = localStorage.getItem(STORAGE_KEYS.USER_ROLE);
      if (role && (role === "donor" || role === "blood_bank" || role === "admin")) {
        return role;
      }
      return null;
    } catch (error) {
      console.error("Error getting user role:", error);
      return null;
    }
  },

  /**
   * Clear user session from local storage
   */
  clear: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER_ID);
      localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
    } catch (error) {
      console.error("Error clearing user session:", error);
    }
  },

  /**
   * Check if user session exists in local storage
   * @returns true if both user ID and role are stored
   */
  exists: (): boolean => {
    return userStorage.getUserId() !== null && userStorage.getRole() !== null;
  },
};

/**
 * Filter Storage
 * Stores and retrieves search filters (city and blood group)
 */
export const filterStorage = {
  /**
   * Store selected city in local storage
   * @param city - City name
   */
  setCity: (city: string): void => {
    try {
      if (city) {
        localStorage.setItem(STORAGE_KEYS.SELECTED_CITY, city);
      } else {
        localStorage.removeItem(STORAGE_KEYS.SELECTED_CITY);
      }
    } catch (error) {
      console.error("Error storing city filter:", error);
    }
  },

  /**
   * Get stored city from local storage
   * @returns City name or empty string if not found
   */
  getCity: (): string => {
    try {
      return localStorage.getItem(STORAGE_KEYS.SELECTED_CITY) || "";
    } catch (error) {
      console.error("Error getting city filter:", error);
      return "";
    }
  },

  /**
   * Store selected blood group in local storage
   * @param bloodGroup - Blood group (e.g., "A+", "O-")
   */
  setBloodGroup: (bloodGroup: string): void => {
    try {
      if (bloodGroup) {
        localStorage.setItem(STORAGE_KEYS.SELECTED_BLOOD_GROUP, bloodGroup);
      } else {
        localStorage.removeItem(STORAGE_KEYS.SELECTED_BLOOD_GROUP);
      }
    } catch (error) {
      console.error("Error storing blood group filter:", error);
    }
  },

  /**
   * Get stored blood group from local storage
   * @returns Blood group or empty string if not found
   */
  getBloodGroup: (): string => {
    try {
      return localStorage.getItem(STORAGE_KEYS.SELECTED_BLOOD_GROUP) || "";
    } catch (error) {
      console.error("Error getting blood group filter:", error);
      return "";
    }
  },

  /**
   * Clear all filter data from local storage
   */
  clear: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.SELECTED_CITY);
      localStorage.removeItem(STORAGE_KEYS.SELECTED_BLOOD_GROUP);
    } catch (error) {
      console.error("Error clearing filters:", error);
    }
  },
};

