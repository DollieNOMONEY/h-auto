"use server";

import { firestore } from "@/lib/firebase-admin";
import type { Timestamp } from 'firebase-admin/firestore';
import { backendClient } from "@/lib/edgestore-server";

// --- TypeScript Interfaces ---

// Represents the data structure as it exists in Firestore
interface CarDb {
  name: string;
  type: string;
  brandId: string;
  price: string;
  description: string;
  imageUrls: string[];
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

// Represents the data for creating a new car
export interface NewCarData {
  name: string;
  type: string;
  brandId: string;
  price: string;
  description: string;
  imageUrls: string[];
}

// Represents the final, rich car object we send to the client
export interface CarWithBrand extends Omit<NewCarData, 'brandId'> {
    id: string;
    brandId: string;
    brandName: string;
    createdAt: string; // Serialized date
    updatedAt?: string;
}

// Represents the data needed to update a car
export interface UpdateCarData extends Omit<NewCarData, 'imageUrls'> {
    imageUrls: string[];
    urlsToDelete?: string[];
}

// --- Server Actions ---

export async function createCarListing(data: NewCarData) {
  try {
    const docRef = await firestore.collection("cars").add({
      ...data,
      createdAt: new Date(),
    });
    return { success: true, docId: docRef.id };
  } catch (error) {
    console.error("Something went wrong:", error);
    return { success: false, error: "Failed to create listing." };
  }
}
export async function getCars(filters?: { brandName?: string; listOtherBrands?: boolean }) {
  try {
    let query: FirebaseFirestore.Query = firestore.collection("cars");

    const featuredBrandNames = [
      "Cadillac", "Mercedes-Benz", "Nio", "Gac", "Tesla", 
      "Land Rover", "Toyota", "BAIC", "Denza", "Lexus"
    ];

    console.log("\n--- Executing getCars ---");
    console.log("Received filters:", filters);

    if (filters?.listOtherBrands) {
      console.log("✅ Path: 'More Brands' filter is active.");
      
      const otherBrandsSnapshot = await firestore.collection("brands").where("name", "not-in", featuredBrandNames).get();
      
      console.log(`Found ${otherBrandsSnapshot.docs.length} brand(s) that are NOT in the featured list.`);

      const otherBrandIds = otherBrandsSnapshot.docs.map(doc => doc.id);
      
      if (otherBrandIds.length > 0) {
        console.log("Filtering cars by these 'other' brand IDs:", otherBrandIds);
        query = query.where("brandId", "in", otherBrandIds);
      } else {
        console.log("No 'other' brands found. Returning an empty list.");
        return { success: true, data: [] };
      }

    } else if (filters?.brandName) {
      console.log(`✅ Path: Specific brand filter is active for "${filters.brandName}".`);
      const deSlugifiedName = filters.brandName.replace(/-/g, ' ');
      const formattedBrandName = deSlugifiedName.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      const brandSnapshot = await firestore.collection("brands").where("name", "==", formattedBrandName).limit(1).get();

      if (brandSnapshot.empty) {
        console.log(`Brand "${formattedBrandName}" not found. Returning empty list.`);
        return { success: true, data: [] };
      }
      const brandId = brandSnapshot.docs[0].id;
      console.log(`Found brand ID "${brandId}". Applying filter.`);
      query = query.where("brandId", "==", brandId);
    } else {
        console.log("✅ Path: No filter provided. Fetching all cars.");
    }

    const carsSnapshot = await query.orderBy("createdAt", "desc").get();
    console.log(`Final Query Result: Found ${carsSnapshot.docs.length} car(s).`);

    const carsData = carsSnapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...(doc.data() as CarDb),
      };
    });

    const carsWithBrands = await Promise.all(
      carsData.map(async (car) => {
        if (!car.brandId) {
            return { 
                ...car,
                brandName: "N/A",
                createdAt: car.createdAt.toDate().toISOString(),
                updatedAt: car.updatedAt?.toDate().toISOString(),
            };
        }
        const brandDoc = await firestore.collection("brands").doc(car.brandId).get();
        const brandName = brandDoc.exists ? brandDoc.data()?.name : "Unknown Brand";
        
        return { 
            ...car, 
            brandName,
            createdAt: car.createdAt.toDate().toISOString(),
            updatedAt: car.updatedAt?.toDate().toISOString(),
        };
      })
    );
    return { success: true, data: carsWithBrands as CarWithBrand[] };
  } catch (error) {
    console.error("--- !!! getCars Function Crashed !!! ---", error);
    return { success: false, error: "Failed to fetch cars." };
  }
}

export async function getCarById(id: string) {
  try {
    const carDoc = await firestore.collection("cars").doc(id).get();
    if (!carDoc.exists) {
      return { success: false, error: "Car not found." };
    }
    const carData = carDoc.data() as CarDb;
    const brandDoc = await firestore.collection("brands").doc(carData.brandId).get();
    const brandName = brandDoc.exists ? brandDoc.data()?.name : "Unknown Brand";

    const serializableCarData = {
      id: carDoc.id,
      ...carData,
      brandName,
      createdAt: carData.createdAt.toDate().toISOString(),
      // NEW: safely convert updatedAt if it exists
      updatedAt: carData.updatedAt ? carData.updatedAt.toDate().toISOString() : undefined,
    };
    return { success: true, data: serializableCarData as CarWithBrand };
  } catch (error) {
    console.error("Error fetching car by ID:", error);
    return { success: false, error: "Failed to fetch car." };
  }
}


export async function deleteCar(carId: string, imageUrls: string[]) {
  try {
    if (imageUrls && imageUrls.length > 0) {
        await Promise.all(
            imageUrls.map(url => backendClient.carImages.deleteFile({ url }))
        );
    }
    await firestore.collection("cars").doc(carId).delete();
    return { success: true };
  } catch (error) {
    console.error("Error deleting car:", error);
    return { success: false, error: "Failed to delete car." };
  }
}


export async function updateCar(carId: string, data: UpdateCarData) {
  try {
    const { urlsToDelete, ...updateData } = data;
    if (urlsToDelete && urlsToDelete.length > 0) {
      await Promise.all(
        urlsToDelete.map((url) => backendClient.carImages.deleteFile({ url }))
      );
    }

    await firestore.collection("cars").doc(carId).update({
      ...updateData,
      updatedAt: new Date(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating car:", error);
    return { success: false, error: "Failed to update car." };
  }
}
