"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import { type CarWithBrand, updateCar } from "@/app/_actions/carActions";
import { getBrands, addBrand } from "@/app/_actions/brandActions";
import withAuth from "@/components/withAuth";
import type { Brand } from "@/app/_actions/brandActions";
import { MultiFileDropzone, type FileState } from "@/components/MultiFileDropzone";
import { useEdgeStore } from "@/lib/edgestore";

function EditCarForm({ initialData }: { initialData: CarWithBrand }) {
  const { edgestore } = useEdgeStore();
  const router = useRouter();
  const [_animate, setAnimate] = useState(false);

  // Form state initialized with existing car data
  const [carName, setCarName] = useState(initialData.name);
  const [carType, setCarType] = useState(initialData.type);
  const [brandId, setBrandId] = useState(initialData.brandId);
  const [price, setPrice] = useState(initialData.price);
  const [description, setDescription] = useState(initialData.description);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Image management state
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [originalImageUrls] = useState(initialData.imageUrls);

  // Brand dropdown state
  const [brandsList, setBrandsList] = useState<Brand[]>([]);
  const [isLoadingBrands, setIsLoadingBrands] = useState(true);
  const [showNewBrandInput, setShowNewBrandInput] = useState(false);
  const [newBrandName, setNewBrandName] = useState("");

  // Re-enabled: Fetches the list of brands for the dropdown
  useEffect(() => {
    const fetchBrands = async () => {
      setIsLoadingBrands(true);
      const result = await getBrands();
      if (result.success && result.data) {
        setBrandsList(result.data);
      }
      setIsLoadingBrands(false);
    };
    fetchBrands();
  }, []);

  // Initializes the image previews with existing images
  useEffect(() => {
    setFileStates(
      initialData.imageUrls.map((url, index) => ({
        key: `${url}-${index}`,
        url: url,
        progress: 'COMPLETE',
      }))
    );
  }, [initialData.imageUrls]);

  useEffect(() => { setAnimate(true); }, []);

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "add_new_brand") {
      setShowNewBrandInput(true);
    } else {
      setBrandId(selectedValue);
      setShowNewBrandInput(false);
    }
  };

  const handleAddNewBrand = async () => {
    if (!newBrandName.trim()) {
      alert("Please enter a brand name.");
      return;
    }
    const result = await addBrand(newBrandName.trim());
    if (result.success && result.data) {
      const newBrand = result.data;
      setBrandsList([...brandsList, newBrand].sort((a, b) => a.name.localeCompare(b.name)));
      setBrandId(newBrand.id);
      setShowNewBrandInput(false);
      setNewBrandName("");
      alert(`Brand "${newBrand.name}" added successfully!`);
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const newFilesToUpload = fileStates.filter(fs => fs.file);
      const existingUrls = fileStates.filter(fs => fs.url).map(fs => fs.url!);

      const newUrls = await Promise.all(
        newFilesToUpload.map(async (fileState) => {
          const res = await edgestore.carImages.upload({ file: fileState.file! });
          return res.url;
        })
      );
      
      const urlsToDelete = originalImageUrls.filter(
        (url) => !existingUrls.includes(url)
      );

      const finalImageUrls: string[] = [];
      let newUrlIndex = 0;
      fileStates.forEach(fs => {
        if (fs.url) {
          finalImageUrls.push(fs.url);
        } else {
          if (newUrls[newUrlIndex]) {
            finalImageUrls.push(newUrls[newUrlIndex]);
            newUrlIndex++;
          }
        }
      });
      
      const result = await updateCar(initialData.id, {
        name: carName,
        type: carType,
        brandId,
        price,
        description,
        imageUrls: finalImageUrls,
        urlsToDelete,
      });
      
      if (result.success) {
        alert("Car updated successfully!");
        router.push(`/cars/${initialData.brandName.toLowerCase().replace(/ /g, '-')}/${initialData.id}`);
        router.refresh();
      } else {
        throw new Error(result.error || "Failed to update car.");
      }
    } catch (error) {
      alert("An error occurred during update.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#001135] text-white">
      <Navigation />
      <div className="inset-0 lg:flex items-start justify-center lg:mx-12 lg:mt-24 lg:mb-24">
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <h1 className="text-center text-2xl mb-5">Edit Car Details</h1>
          
          <div className="w-full lg:w-[50rem] mb-8">
            <label className="block text-sm mb-2">Manage Images (Add, Reorder, Delete)</label>
             <MultiFileDropzone
                value={fileStates}
                onChange={setFileStates}
                onFilesAdded={(addedFiles) => {
                  setFileStates([...fileStates, ...addedFiles]);
                }}
              />
          </div>

          <div className={`mx-6 lg:mx-12 lg:w-[50rem]`}>
            {/* Car Name */}
            <label className="block text-sm mb-2">Car Name</label>
            <input
              type="text"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              required
              className="text-xl w-full mb-4 px-4 py-2 bg-transparent border border-white rounded focus:outline-none focus:ring-2 focus:ring-[#f3cd4d]"
            />

            {/* Car Type */}
            <label className="block text-sm mb-2">Type</label>
            <input
              type="text"
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
              required
              className="uppercase text-sm w-full mb-4 px-4 py-2 bg-transparent border border-white rounded focus:outline-none focus:ring-2 focus:ring-[#f3cd4d]"
            />

            {/* Car Brand */}
            <label className="block text-sm mb-2">Brand</label>
            <select
              value={brandId}
              onChange={handleBrandChange}
              required
              disabled={isLoadingBrands}
              className="uppercase text-sm w-full mb-4 px-3 py-2 bg-[#001135] text-white border border-white rounded focus:outline-none focus:ring-2 focus:ring-[#f3cd4d] disabled:opacity-50"
            >
              {isLoadingBrands ? (
                <option>Loading Brands...</option>
              ) : (
                <>
                  {brandsList.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                  <option value="add_new_brand" className="text-[#f3cd4d]">
                    + Add New Brand...
                  </option>
                </>
              )}
            </select>

            {/* Conditional input for adding a new brand */}
            {showNewBrandInput && (
              <div className="mb-4 p-4 border border-dashed border-[#f3cd4d] rounded-lg">
                <label className="block text-sm mb-2">New Brand Name</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newBrandName}
                    onChange={(e) => setNewBrandName(e.target.value)}
                    placeholder="Enter new brand name"
                    className="flex-grow text-sm w-full px-4 py-2 bg-transparent border border-white rounded focus:outline-none focus:ring-2 focus:ring-[#f3cd4d]"
                  />
                  <button
                    type="button"
                    onClick={handleAddNewBrand}
                    className="bg-[#daab35] text-black font-bold px-4 py-2 rounded hover:bg-[#f3cd4d] transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            {/* Price */}
            <label className="block text-sm mb-2">Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="text-[#daab35] text-sm w-full mb-4 px-4 py-2 bg-transparent border border-[#daab35] rounded focus:outline-none focus:ring-2 focus:ring-[#f3cd4d]"
            />

            {/* Description */}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={6}
              className="w-full text-sm mb-10 px-4 py-2 bg-transparent border border-white rounded resize-none focus:outline-none focus:ring-2 focus:ring-[#f3cd4d]"
            />
            
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-4 w-full lg:w-64 bg-[#daab35] rounded-full px-4 py-3 text-black text-lg mb-10 transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withAuth(EditCarForm);