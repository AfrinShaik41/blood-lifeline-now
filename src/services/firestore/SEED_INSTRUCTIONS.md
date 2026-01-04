# Firestore Seed Data Instructions

This document explains how to seed Firestore with dummy blood bank data.

## Seed Data Overview

The seed function creates **20 blood banks** distributed across 5 cities:
- **Tirupati**: 4 blood banks
- **Hyderabad**: 5 blood banks
- **Bangalore**: 5 blood banks
- **Chennai**: 3 blood banks
- **Mumbai**: 3 blood banks

**13 out of 20 blood banks are marked as verified.**

## How to Run the Seed Function

### Option 1: Browser Console (Recommended)

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to your app (usually `http://localhost:5173`)

3. Open the browser's Developer Console (F12 or Right-click → Inspect → Console)

4. Run the following command:
   ```javascript
   // Import and run the seed function
   import { seedBloodBanks } from './src/services/firestore/seedData';
   
   // Or if using the index export:
   import { seedBloodBanks } from './src/services/firestore';
   
   // Execute the seed function
   seedBloodBanks().then(() => {
     console.log('Seed completed!');
   }).catch((error) => {
     console.error('Seed failed:', error);
   });
   ```

   **Note**: If you're using ES modules in the console, you might need to use dynamic import:
   ```javascript
   (async () => {
     const { seedBloodBanks } = await import('/src/services/firestore/seedData.ts');
     await seedBloodBanks();
   })();
   ```

### Option 2: Create a Temporary Admin Page

Create a temporary page component that runs the seed on mount:

```typescript
// src/pages/SeedData.tsx (temporary file - delete after use)
import { useEffect } from "react";
import { seedBloodBanks } from "@/services/firestore/seedData";

const SeedData = () => {
  useEffect(() => {
    seedBloodBanks()
      .then(() => {
        console.log("✅ Seed completed!");
        alert("Seed completed! Check console for details.");
      })
      .catch((error) => {
        console.error("❌ Seed failed:", error);
        alert("Seed failed! Check console for details.");
      });
  }, []);

  return <div>Seeding data... Check console for progress.</div>;
};

export default SeedData;
```

Then add a route in `App.tsx`:
```typescript
<Route path="/seed" element={<SeedData />} />
```

Navigate to `/seed` in your browser to run the seed.

### Option 3: Use React DevTools or Component

You can also create a button in your admin dashboard to trigger the seed:

```typescript
import { seedBloodBanks } from "@/services/firestore/seedData";

const handleSeed = async () => {
  try {
    await seedBloodBanks();
    toast({ title: "Success", description: "Blood banks seeded successfully!" });
  } catch (error) {
    toast({ title: "Error", description: "Failed to seed data." });
  }
};
```

## Clearing Seed Data

If you need to clear all blood banks before reseeding:

```javascript
import { clearBloodBanks } from "@/services/firestore/seedData";

clearBloodBanks().then(() => {
  console.log("Blood banks cleared!");
});
```

## Safety Features

- **Duplicate Prevention**: The seed function checks if blood banks already exist and will skip seeding if any are found. This prevents accidental duplicate data.
- **Idempotent**: Safe to run multiple times (will skip if data exists).
- **Error Handling**: Comprehensive error handling with descriptive messages.

## Seed Data Details

Each blood bank includes:
- **Name**: Realistic hospital/clinic names
- **Address**: Full addresses with pin codes
- **City**: One of the 5 specified cities
- **State**: Corresponding state (Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Maharashtra)
- **Phone**: Indian phone number format (+91-XX-XXXXXXXX)
- **isVerified**: Boolean flag (13 verified, 7 unverified)

## Notes

- Seed data uses **auto-generated document IDs** (not linked to user accounts)
- This is different from user-created blood banks which use `userId` as document ID
- Seed data is meant for development/testing purposes
- Remove or secure the seed functions in production

