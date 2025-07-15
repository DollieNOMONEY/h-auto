"use server";

import { firestore } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";

export type Brand = {
  id: string;
  name: string;
};

// get all brands from Firestore
export async function getBrands() {
  try {
    const brandsSnapshot = await firestore.collection("brands").orderBy("name").get();
    const brands = brandsSnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name as string,
    }));
    return { success: true, data: brands };
  } catch (error) {
    console.error("Error fetching brands: ", error);
    return { success: false, error: "Failed to fetch brands." };
  }
}

// add a new brand to Firestore
export async function addBrand(brandName: string) {
  if (!brandName) {
    return { success: false, error: "Brand name cannot be empty." };
  }
  
  const formattedName = brandName
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  try {
    const existingBrand = await firestore.collection("brands").where("name", "==", formattedName).get();
    if (!existingBrand.empty) {
        return { success: false, error: `Brand "${formattedName}" already exists.` };
    }

    const newBrand = { name: formattedName };
    const docRef = await firestore.collection("brands").add(newBrand);
    revalidatePath("/add-image-acp"); 
    return { success: true, data: { id: docRef.id, ...newBrand } };
  } catch (error) {
    console.error("Error adding brand: ", error);
    return { success: false, error: "Failed to add brand." };
  }
}