// Type definitions for Firestore collections
// These types define the structure of documents stored in Firestore

/**
 * Donor document structure in Firestore
 * Stored in the 'donors' collection
 */
export interface Donor {
  // Document ID is the userId (linked to authenticated user)
  id: string; // userId from Firebase Auth
  
  // Required fields
  name: string;
  bloodGroup: string; // e.g., "A+", "B-", "O+", etc.
  phone: string;
  city: string;
  state: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Donor data for creating a new donor document
 * Excludes auto-generated fields like id, createdAt, updatedAt
 */
export interface DonorCreateData {
  name: string;
  bloodGroup: string;
  phone: string;
  city: string;
  state: string;
}

/**
 * Blood Bank document structure in Firestore
 * Stored in the 'bloodBanks' collection
 */
export interface BloodBank {
  // Document ID is the userId (linked to authenticated user)
  id: string; // userId from Firebase Auth
  
  // Required fields
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  isVerified: boolean; // Verification status of the blood bank
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Blood Bank data for creating a new blood bank document
 * Excludes auto-generated fields like id, createdAt, updatedAt
 */
export interface BloodBankCreateData {
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  isVerified?: boolean; // Optional, defaults to false
}

