// Blood Bank Firestore Service
// Handles all Firestore operations for the 'bloodBanks' collection
// Each blood bank document is linked to an authenticated user via userId

import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "@/integrations/firebase/firebase";
import type { BloodBank, BloodBankCreateData } from "./types";

// Collection name in Firestore
const COLLECTION_NAME = "bloodBanks";

/**
 * Creates a new blood bank document in Firestore
 * The document ID is set to the userId, linking it to the authenticated user
 * 
 * @param userId - The Firebase Auth user ID (from authenticated user)
 * @param bloodBankData - The blood bank information to store
 * @returns Promise<BloodBank> - The created blood bank document
 * @throws Error if the operation fails
 */
export const createBloodBank = async (
  userId: string,
  bloodBankData: BloodBankCreateData
): Promise<BloodBank> => {
  try {
    // Create a document reference with userId as the document ID
    // This ensures one blood bank document per user
    const bloodBankRef = doc(db, COLLECTION_NAME, userId);
    
    // Prepare the document data with timestamps
    // isVerified defaults to false if not provided
    const bloodBankDoc: Omit<BloodBank, "id"> = {
      ...bloodBankData,
      isVerified: bloodBankData.isVerified ?? false,
      createdAt: serverTimestamp() as any, // Firestore server timestamp
      updatedAt: serverTimestamp() as any,
    };
    
    // Write the document to Firestore
    await setDoc(bloodBankRef, bloodBankDoc);
    
    // Return the created blood bank with the userId as id
    return {
      id: userId,
      ...bloodBankData,
      isVerified: bloodBankData.isVerified ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error("Error creating blood bank:", error);
    throw new Error(`Failed to create blood bank: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

/**
 * Reads a single blood bank document by userId
 * 
 * @param userId - The Firebase Auth user ID
 * @returns Promise<BloodBank | null> - The blood bank document or null if not found
 * @throws Error if the operation fails
 */
export const getBloodBank = async (userId: string): Promise<BloodBank | null> => {
  try {
    const bloodBankRef = doc(db, COLLECTION_NAME, userId);
    const bloodBankSnap = await getDoc(bloodBankRef);
    
    if (!bloodBankSnap.exists()) {
      return null;
    }
    
    const data = bloodBankSnap.data();
    
    // Convert Firestore timestamps to JavaScript Date objects
    return {
      id: bloodBankSnap.id,
      name: data.name,
      address: data.address,
      city: data.city,
      state: data.state,
      phone: data.phone,
      isVerified: data.isVerified ?? false,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    };
  } catch (error) {
    console.error("Error getting blood bank:", error);
    throw new Error(`Failed to get blood bank: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

/**
 * Reads all blood bank documents from Firestore
 * 
 * @returns Promise<BloodBank[]> - Array of all blood bank documents
 * @throws Error if the operation fails
 */
export const getAllBloodBanks = async (): Promise<BloodBank[]> => {
  try {
    const bloodBanksRef = collection(db, COLLECTION_NAME);
    const bloodBanksQuery = query(bloodBanksRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(bloodBanksQuery);
    
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        phone: data.phone,
        isVerified: data.isVerified ?? false,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      };
    });
  } catch (error) {
    console.error("Error getting all blood banks:", error);
    throw new Error(`Failed to get blood banks: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

/**
 * Reads blood banks filtered by city
 * 
 * @param city - The city to filter by
 * @returns Promise<BloodBank[]> - Array of blood bank documents in the specified city
 * @throws Error if the operation fails
 */
export const getBloodBanksByCity = async (city: string): Promise<BloodBank[]> => {
  try {
    const bloodBanksRef = collection(db, COLLECTION_NAME);
    const bloodBanksQuery = query(
      bloodBanksRef,
      where("city", "==", city),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(bloodBanksQuery);
    
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        phone: data.phone,
        isVerified: data.isVerified ?? false,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      };
    });
  } catch (error) {
    console.error("Error getting blood banks by city:", error);
    throw new Error(`Failed to get blood banks by city: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

/**
 * Reads only verified blood banks
 * 
 * @returns Promise<BloodBank[]> - Array of verified blood bank documents
 * @throws Error if the operation fails
 */
export const getVerifiedBloodBanks = async (): Promise<BloodBank[]> => {
  try {
    const bloodBanksRef = collection(db, COLLECTION_NAME);
    const bloodBanksQuery = query(
      bloodBanksRef,
      where("isVerified", "==", true),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(bloodBanksQuery);
    
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        phone: data.phone,
        isVerified: data.isVerified ?? false,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      };
    });
  } catch (error) {
    console.error("Error getting verified blood banks:", error);
    throw new Error(`Failed to get verified blood banks: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

/**
 * Reads blood banks filtered by state
 * 
 * @param state - The state to filter by
 * @returns Promise<BloodBank[]> - Array of blood bank documents in the specified state
 * @throws Error if the operation fails
 */
export const getBloodBanksByState = async (state: string): Promise<BloodBank[]> => {
  try {
    const bloodBanksRef = collection(db, COLLECTION_NAME);
    const bloodBanksQuery = query(
      bloodBanksRef,
      where("state", "==", state),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(bloodBanksQuery);
    
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        phone: data.phone,
        isVerified: data.isVerified ?? false,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      };
    });
  } catch (error) {
    console.error("Error getting blood banks by state:", error);
    throw new Error(`Failed to get blood banks by state: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

