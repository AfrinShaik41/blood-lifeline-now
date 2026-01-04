// Firestore Seed Data
// This file contains seed data functions to populate Firestore with dummy data
// Run this function once to populate the database with initial data

import { collection, doc, setDoc, getDocs, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/integrations/firebase/firebase";
import type { BloodBankCreateData } from "./types";

// Collection name in Firestore
const BLOOD_BANKS_COLLECTION = "bloodBanks";

/**
 * Seed data for 20 blood banks
 * Distributed across: Tirupati, Hyderabad, Bangalore, Chennai, Mumbai
 * Some blood banks are marked as verified
 */
const BLOOD_BANK_SEED_DATA: (BloodBankCreateData & { id?: string })[] = [
  // Tirupati (4 blood banks)
  {
    name: "Sri Venkateswara Blood Bank",
    address: "SVIMS Hospital, Alipiri Road, Tirupati - 517507",
    city: "Tirupati",
    state: "Andhra Pradesh",
    phone: "+91-877-2287777",
    isVerified: true,
  },
  {
    name: "Tirupati City Blood Centre",
    address: "Near Bus Stand, Renigunta Road, Tirupati - 517501",
    city: "Tirupati",
    state: "Andhra Pradesh",
    phone: "+91-877-2234567",
    isVerified: true,
  },
  {
    name: "Balaji Blood Bank",
    address: "Srinivasa Nagar, Tirupati - 517502",
    city: "Tirupati",
    state: "Andhra Pradesh",
    phone: "+91-877-2245678",
    isVerified: false,
  },
  {
    name: "Red Cross Blood Bank Tirupati",
    address: "Gandhi Road, Tirupati - 517501",
    city: "Tirupati",
    state: "Andhra Pradesh",
    phone: "+91-877-2256789",
    isVerified: true,
  },

  // Hyderabad (5 blood banks)
  {
    name: "Apollo Blood Bank Hyderabad",
    address: "Apollo Hospitals, Jubilee Hills, Hyderabad - 500033",
    city: "Hyderabad",
    state: "Telangana",
    phone: "+91-40-23607777",
    isVerified: true,
  },
  {
    name: "Yashoda Blood Bank",
    address: "Yashoda Hospital, Somajiguda, Hyderabad - 500082",
    city: "Hyderabad",
    state: "Telangana",
    phone: "+91-40-23456789",
    isVerified: true,
  },
  {
    name: "Continental Blood Centre",
    address: "Banjara Hills, Road No. 2, Hyderabad - 500034",
    city: "Hyderabad",
    state: "Telangana",
    phone: "+91-40-23345678",
    isVerified: false,
  },
  {
    name: "KIMS Blood Bank",
    address: "KIMS Hospital, Secunderabad, Hyderabad - 500003",
    city: "Hyderabad",
    state: "Telangana",
    phone: "+91-40-23456780",
    isVerified: true,
  },
  {
    name: "Red Cross Society Hyderabad",
    address: "Red Hills, Lakdikapul, Hyderabad - 500004",
    city: "Hyderabad",
    state: "Telangana",
    phone: "+91-40-23234567",
    isVerified: true,
  },

  // Bangalore (5 blood banks)
  {
    name: "Manipal Blood Bank",
    address: "Manipal Hospital, HAL Airport Road, Bangalore - 560017",
    city: "Bangalore",
    state: "Karnataka",
    phone: "+91-80-25023456",
    isVerified: true,
  },
  {
    name: "Narayana Health Blood Centre",
    address: "Narayana Health City, Bommanahalli, Bangalore - 560099",
    city: "Bangalore",
    state: "Karnataka",
    phone: "+91-80-27835000",
    isVerified: true,
  },
  {
    name: "Fortis Blood Bank",
    address: "Fortis Hospital, Bannerghatta Road, Bangalore - 560076",
    city: "Bangalore",
    state: "Karnataka",
    phone: "+91-80-66214444",
    isVerified: true,
  },
  {
    name: "Bangalore Blood Services",
    address: "Indiranagar, 100 Feet Road, Bangalore - 560038",
    city: "Bangalore",
    state: "Karnataka",
    phone: "+91-80-25223456",
    isVerified: false,
  },
  {
    name: "Victoria Blood Bank",
    address: "Victoria Hospital Campus, KR Market, Bangalore - 560002",
    city: "Bangalore",
    state: "Karnataka",
    phone: "+91-80-26701234",
    isVerified: true,
  },

  // Chennai (3 blood banks)
  {
    name: "Apollo Blood Bank Chennai",
    address: "Apollo Hospitals, Greams Road, Chennai - 600006",
    city: "Chennai",
    state: "Tamil Nadu",
    phone: "+91-44-28290200",
    isVerified: true,
  },
  {
    name: "Global Blood Centre",
    address: "Anna Nagar, Chennai - 600040",
    city: "Chennai",
    state: "Tamil Nadu",
    phone: "+91-44-26234567",
    isVerified: false,
  },
  {
    name: "Stanley Medical College Blood Bank",
    address: "Stanley Medical College, Old Washermanpet, Chennai - 600001",
    city: "Chennai",
    state: "Tamil Nadu",
    phone: "+91-44-25281234",
    isVerified: true,
  },

  // Mumbai (3 blood banks)
  {
    name: "Lilavati Blood Bank",
    address: "Lilavati Hospital, Bandra West, Mumbai - 400050",
    city: "Mumbai",
    state: "Maharashtra",
    phone: "+91-22-26751000",
    isVerified: true,
  },
  {
    name: "Jaslok Blood Centre",
    address: "Jaslok Hospital, Pedder Road, Mumbai - 400026",
    city: "Mumbai",
    state: "Maharashtra",
    phone: "+91-22-23534567",
    isVerified: true,
  },
  {
    name: "Kokilaben Blood Bank",
    address: "Kokilaben Hospital, Andheri West, Mumbai - 400053",
    city: "Mumbai",
    state: "Maharashtra",
    phone: "+91-22-30991234",
    isVerified: false,
  },
];

/**
 * Seeds the bloodBanks collection with 20 dummy blood banks
 * This function can be run once to populate the database
 * 
 * @returns Promise<void>
 * @throws Error if the operation fails
 * 
 * Usage:
 * import { seedBloodBanks } from "@/services/firestore/seedData";
 * await seedBloodBanks();
 */
export const seedBloodBanks = async (): Promise<void> => {
  try {
    console.log("Starting to seed blood banks...");

    // Check if data already exists
    const existingDocs = await getDocs(collection(db, BLOOD_BANKS_COLLECTION));
    if (existingDocs.size > 0) {
      console.warn(
        `Warning: ${existingDocs.size} blood bank documents already exist. ` +
        "Skipping seed to avoid duplicates. Clear the collection first if you want to reseed."
      );
      return;
    }

    // Create documents with auto-generated IDs
    // Note: These are seed data, not linked to actual user accounts
    const bloodBanksRef = collection(db, BLOOD_BANKS_COLLECTION);
    const promises = BLOOD_BANK_SEED_DATA.map(async (bloodBankData, index) => {
      // Create a new document reference with auto-generated ID
      const docRef = doc(bloodBanksRef);
      
      const bloodBankDoc = {
        name: bloodBankData.name,
        address: bloodBankData.address,
        city: bloodBankData.city,
        state: bloodBankData.state,
        phone: bloodBankData.phone,
        isVerified: bloodBankData.isVerified ?? false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(docRef, bloodBankDoc);
      console.log(`✓ Created blood bank ${index + 1}/20: ${bloodBankData.name}`);
    });

    // Wait for all documents to be created
    await Promise.all(promises);

    console.log("✅ Successfully seeded 20 blood banks into Firestore!");
    console.log(`   - Tirupati: 4 blood banks`);
    console.log(`   - Hyderabad: 5 blood banks`);
    console.log(`   - Bangalore: 5 blood banks`);
    console.log(`   - Chennai: 3 blood banks`);
    console.log(`   - Mumbai: 3 blood banks`);
    console.log(`   - Verified: ${BLOOD_BANK_SEED_DATA.filter(b => b.isVerified).length} blood banks`);
  } catch (error) {
    console.error("Error seeding blood banks:", error);
    throw new Error(
      `Failed to seed blood banks: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};

/**
 * Clears all blood banks from the collection
 * Use this before reseeding if needed
 * 
 * @returns Promise<void>
 * @throws Error if the operation fails
 * 
 * Usage:
 * import { clearBloodBanks } from "@/services/firestore/seedData";
 * await clearBloodBanks();
 */
export const clearBloodBanks = async (): Promise<void> => {
  try {
    const bloodBanksRef = collection(db, BLOOD_BANKS_COLLECTION);
    const querySnapshot = await getDocs(bloodBanksRef);

    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    console.log(`✅ Cleared ${querySnapshot.docs.length} blood bank documents from Firestore`);
  } catch (error) {
    console.error("Error clearing blood banks:", error);
    throw new Error(
      `Failed to clear blood banks: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};

