# Firestore Services

This directory contains Firestore service modules for managing donors and blood banks.

## Structure

- `types.ts` - TypeScript type definitions
- `donors.ts` - Donor collection operations
- `bloodBanks.ts` - Blood Bank collection operations
- `index.ts` - Central export point

## Collections

### Donors Collection (`donors`)
Each document is linked to an authenticated user via `userId` as the document ID.

**Fields:**
- `name` (string) - Donor's full name
- `bloodGroup` (string) - Blood group (e.g., "A+", "B-", "O+")
- `phone` (string) - Contact phone number
- `city` (string) - City location
- `state` (string) - State location
- `createdAt` (Date) - Auto-generated timestamp
- `updatedAt` (Date) - Auto-generated timestamp

### Blood Banks Collection (`bloodBanks`)
Each document is linked to an authenticated user via `userId` as the document ID.

**Fields:**
- `name` (string) - Blood bank name
- `address` (string) - Full address
- `city` (string) - City location
- `state` (string) - State location
- `phone` (string) - Contact phone number
- `isVerified` (boolean) - Verification status (defaults to false)
- `createdAt` (Date) - Auto-generated timestamp
- `updatedAt` (Date) - Auto-generated timestamp

## Usage Examples

### Creating a Donor

```typescript
import { createDonor } from "@/services/firestore";
import { useAuth } from "@/hooks/useAuth";

const { user } = useAuth();

// After user signs up as a donor
const donorData = {
  name: "John Doe",
  bloodGroup: "O+",
  phone: "+1234567890",
  city: "New York",
  state: "NY"
};

if (user) {
  const donor = await createDonor(user.uid, donorData);
  console.log("Donor created:", donor);
}
```

### Reading a Donor

```typescript
import { getDonor } from "@/services/firestore";

const donor = await getDonor(userId);
if (donor) {
  console.log("Donor found:", donor);
} else {
  console.log("Donor not found");
}
```

### Creating a Blood Bank

```typescript
import { createBloodBank } from "@/services/firestore";

const bloodBankData = {
  name: "City Blood Bank",
  address: "123 Main St",
  city: "New York",
  state: "NY",
  phone: "+1234567890",
  isVerified: false // Optional, defaults to false
};

if (user) {
  const bloodBank = await createBloodBank(user.uid, bloodBankData);
  console.log("Blood bank created:", bloodBank);
}
```

### Querying Donors

```typescript
import { 
  getAllDonors, 
  getDonorsByCity, 
  getDonorsByBloodGroup,
  getDonorsByCityAndBloodGroup 
} from "@/services/firestore";

// Get all donors
const allDonors = await getAllDonors();

// Get donors in a specific city
const cityDonors = await getDonorsByCity("New York");

// Get donors with a specific blood group
const oPositiveDonors = await getDonorsByBloodGroup("O+");

// Get donors matching both city and blood group
const matchingDonors = await getDonorsByCityAndBloodGroup("New York", "O+");
```

### Querying Blood Banks

```typescript
import { 
  getAllBloodBanks,
  getBloodBanksByCity,
  getVerifiedBloodBanks,
  getBloodBanksByState
} from "@/services/firestore";

// Get all blood banks
const allBloodBanks = await getAllBloodBanks();

// Get blood banks in a specific city
const cityBloodBanks = await getBloodBanksByCity("New York");

// Get only verified blood banks
const verifiedBanks = await getVerifiedBloodBanks();

// Get blood banks in a specific state
const stateBloodBanks = await getBloodBanksByState("NY");
```

## Linking to Authenticated Users

Documents are automatically linked to authenticated users:
- Document ID = User ID (from Firebase Auth)
- This ensures one document per user
- Use `user.uid` from `useAuth()` hook to get the current user's ID

## Error Handling

All functions throw errors that should be caught:

```typescript
try {
  const donor = await createDonor(userId, donorData);
} catch (error) {
  console.error("Failed to create donor:", error);
  // Show error message to user
}
```

