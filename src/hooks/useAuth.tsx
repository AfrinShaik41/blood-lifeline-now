import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { 
  User as FirebaseUser, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  AuthError
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/integrations/firebase/firebase";
import { userStorage } from "@/lib/localStorage";

// User role type - supports donor and blood_bank (as per requirements)
// Also supports admin for existing functionality
type AppRole = "donor" | "blood_bank" | "admin" | null;

interface AuthContextType {
  user: FirebaseUser | null;
  session: FirebaseUser | null; // For compatibility, using user as session
  role: AppRole | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string, role: AppRole) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [session, setSession] = useState<FirebaseUser | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user role from Firestore
  // Roles are stored in the 'users' collection with document ID = userId
  const fetchUserRole = async (userId: string): Promise<AppRole> => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
      
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        return (userData.role as AppRole) || null;
      }
      return null;
    } catch (error) {
      console.error("Error fetching user role from Firestore:", error);
      return null;
    }
  };

  // Store user role in Firestore after signup
  // Creates a document in 'users' collection with userId as document ID
  const storeUserRole = async (userId: string, role: AppRole, fullName: string, email: string) => {
    try {
      const userDocRef = doc(db, "users", userId);
      await setDoc(userDocRef, {
        role: role,
        fullName: fullName,
        email: email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }, { merge: true });
    } catch (error) {
      console.error("Error storing user role in Firestore:", error);
      throw error;
    }
  };

  // Set up Firebase auth state listener
  // Firebase automatically handles auth state persistence using localStorage
  // We also sync user ID and role to our custom local storage for quick access
  useEffect(() => {
    // Try to restore session from local storage on initial load
    // This provides faster initial render while Firebase auth initializes
    const storedUserId = userStorage.getUserId();
    const storedRole = userStorage.getRole();
    
    if (storedUserId && storedRole) {
      // Set initial state from local storage for faster UI update
      // Firebase will verify and update this when auth state is ready
      setRole(storedRole);
    }

    // onAuthStateChanged automatically handles:
    // - Initial auth state check
    // - Auth state changes (login, logout, token refresh)
    // - Persistence across page reloads
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setSession(firebaseUser); // For compatibility with existing code

      if (firebaseUser) {
        // User is signed in, fetch their role from Firestore
        const userRole = await fetchUserRole(firebaseUser.uid);
        setRole(userRole);
        
        // Sync user ID and role to local storage
        // This allows quick access on app reload without waiting for Firebase
        userStorage.set(firebaseUser.uid, userRole);
      } else {
        // User is signed out
        setRole(null);
        
        // Clear user session from local storage
        userStorage.clear();
      }
      
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Auth state will be updated automatically via onAuthStateChanged
      return { error: null };
    } catch (error) {
      const authError = error as AuthError;
      // Return user-friendly error message
      let errorMessage = "Failed to sign in. Please check your credentials.";
      
      switch (authError.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email address.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address.";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Please try again later.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your connection.";
          break;
      }
      
      return { error: new Error(errorMessage) };
    }
  };

  // Sign up with email and password
  // After successful signup, stores user role in Firestore
  const signUp = async (email: string, password: string, fullName: string, role: AppRole) => {
    if (!role) {
      return { error: new Error("Please select a user type.") };
    }

    try {
      // Create user account with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Store user role and profile data in Firestore
      await storeUserRole(newUser.uid, role, fullName, email);

      // Auth state will be updated automatically via onAuthStateChanged
      return { error: null };
    } catch (error) {
      const authError = error as AuthError;
      // Return user-friendly error message
      let errorMessage = "Failed to create account. Please try again.";
      
      switch (authError.code) {
        case "auth/email-already-in-use":
          errorMessage = "An account with this email already exists.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address.";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Email/password accounts are not enabled.";
          break;
        case "auth/weak-password":
          errorMessage = "Password is too weak. Please use a stronger password.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your connection.";
          break;
      }
      
      return { error: new Error(errorMessage) };
    }
  };

  // Sign out user
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      // Auth state will be updated automatically via onAuthStateChanged
      setUser(null);
      setSession(null);
      setRole(null);
      
      // Clear user session from local storage
      userStorage.clear();
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, role, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
