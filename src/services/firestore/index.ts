// Firestore Services Index
// Central export point for all Firestore service functions
// This makes it easy to import services from a single location

// Export type definitions
export type { Donor, DonorCreateData, BloodBank, BloodBankCreateData } from "./types";

// Export donor service functions
export {
  createDonor,
  getDonor,
  getAllDonors,
  getDonorsByCity,
  getDonorsByBloodGroup,
  getDonorsByCityAndBloodGroup,
} from "./donors";

// Export blood bank service functions
export {
  createBloodBank,
  getBloodBank,
  getAllBloodBanks,
  getBloodBanksByCity,
  getVerifiedBloodBanks,
  getBloodBanksByState,
} from "./bloodBanks";

// Export seed data functions
export { seedBloodBanks, clearBloodBanks } from "./seedData";

