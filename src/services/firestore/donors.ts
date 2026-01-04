// Donor Firestore Service
// Handles all Firestore operations for the 'donors' collection
// Each donor document is linked to an authenticated user via userId

import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  serverTimestamp,
  Timestamp 
} from "firebase/firestore";
import { db } from "@/integrations/firebase/firebase";
import type { Donor, DonorCreateData } from "./types";

// Collection name in Firestore
const COLLECTION_NAME = "donors";

/**
 * Creates a new donor document in Firestore
 * The document ID is set to the userId, linking it to the authenticated user
 * 
 * @param userId - The Firebase Auth user ID (from authenticated user)
 * @param donorData - The donor information to store
 * @returns Promise<Donor> - The created donor document
 * @throws Error if the operation fails
 */
export const createDonor = async (
  userId: string,
  donorData: DonorCreateData
): Promise<Donor> => {
  try {
    // Create a document reference with userId as the document ID
    // This ensures one donor document per user
    const donorRef = doc(db, COLLECTION_NAME, userId);
    
    // Prepare the document data with timestamps
    const donorDoc: Omit<Donor, "id"> = {
      ...donorData,
      createdAt: serverTimestamp() as any, // Firestore server timestamp
      updatedAt: serverTimestamp() as any,
    };
    
    // Write the document to Firestore
    await setDoc(donorRef, donorDoc);
    
    // Return the created donor with the userId as id
    return {
      id: userId,
      ...donorData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error("Error creating donor:", error);
    throw new Error(`Failed to create donor: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

/**
 * Reads a single donor document by userId
 * 
 * @param userId - The Firebase Auth user ID
 * @returns Promise<Donor | null> - The donor document or null if not found
 * @throws Error if the operation fails
 */
export const getDonor = async (userId: string): Promise<Donor | null> => {
  try {
    const donorRef = doc(db, COLLECTION_NAME, userId);
    const donorSnap = await getDoc(donorRef);
    
    if (!donorSnap.exists()) {
      return null;
    }
    
    const data = donorSnap.data();
    
    // Convert Firestore timestamps to JavaScript Date objects
    return {
      id: donorSnap.id,
      name: data.name,
      bloodGroup: data.bloodGroup,
      phone: data.phone,
      city: data.city,
      state: data.state,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    };
  } catch (error) {
    console.error("Error getting donor:", error);
    throw new Error(`Failed to get donor: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

/**
 * Reads all donor documents from Firestore
 * 
 * @returns Promise<Donor[]> - Array of all donor documents
 * @throws Error if the operation fails
 */
export const getAllDonors = async (): Promise<Donor[]> => {
  try {
    const donorsRef = collection(db, COLLECTION_NAME);
    const donorsQuery = query(donorsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(donorsQuery);
    
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        bloodGroup: data.bloodGroup,
        phone: data.phone,
        city: data.city,
        state: data.state,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      };
    });
  } catch (error) {
    console.error("Error getting all donors:", error);
    throw new Error(`Failed to get donors: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

/**
 * Reads donors filtered by city
 * 
 * @param city - The city to filter by
 * @returns Promise<Donor[]> - Array of donor documents in the specified city
 * @throws Error if the operation fails
 */
export const getDonorsByCity = async (city: string): Promise<Donor[]> => {
  try {
    const donorsRef = collection(db, COLLECTION_NAME);
    const donorsQuery = query(
      donorsRef,
      where("city", "==", city),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(donorsQuery);
    
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        bloodGroup: data.bloodGroup,
        phone: data.phone,
        city: data.city,
        state: data.state,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      };
    });
  } catch (error) {
    console.error("Error getting donors by city:", error);
    throw new Error(`Failed to get donors by city: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

/**
 * Reads donors filtered by blood group
 * 
 * @param bloodGroup - The blood group to filter by (e.g., "A+", "O-")
 * @returns Promise<Donor[]> - Array of donor documents with the specified blood group
 * @throws Error if the operation fails
 */
export const getDonorsByBloodGroup = async (bloodGroup: string): Promise<Donor[]> => {
  try {
    const donorsRef = collection(db, COLLECTION_NAME);
    const donorsQuery = query(
      donorsRef,
      where("bloodGroup", "==", bloodGroup),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(donorsQuery);
    
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        bloodGroup: data.bloodGroup,
        phone: data.phone,
        city: data.city,
        state: data.state,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      };
    });
  } catch (error) {
    console.error("Error getting donors by blood group:", error);
    throw new Error(`Failed to get donors by blood group: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

/**
 * Reads donors filtered by both city and blood group
 * 
 * @param city - The city to filter by
 * @param bloodGroup - The blood group to filter by
 * @returns Promise<Donor[]> - Array of donor documents matching both criteria
 * @throws Error if the operation fails
 */
export const getDonorsByCityAndBloodGroup = async (
  city: string,
  bloodGroup: string
): Promise<Donor[]> => {
  try {
    const donorsRef = collection(db, COLLECTION_NAME);
    const donorsQuery = query(
      donorsRef,
      where("city", "==", city),
      where("bloodGroup", "==", bloodGroup),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(donorsQuery);
    
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        bloodGroup: data.bloodGroup,
        phone: data.phone,
        city: data.city,
        state: data.state,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      };
    });
  } catch (error) {
    console.error("Error getting donors by city and blood group:", error);
    throw new Error(`Failed to get donors by city and blood group: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

