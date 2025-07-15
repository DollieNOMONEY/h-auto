"use client";

import React, { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { MultiFileDropzone, type FileState } from "@/components/MultiFileDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { createCarListing } from "@/app/_actions/carActions";
import withAuth from "@/components/withAuth";
import { getBrands, addBrand } from "@/app/_actions/brandActions";
import type { Brand } from "@/app/_actions/brandActions";

function AddImage() {
  const [animate, setAnimate] = useState(false);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();

  const [carName, setCarName] = useState("");
  const [carType, setCarType] = useState("");
  const [brandId, setBrandId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [brandsList, setBrandsList] = useState<Brand[]>([]);
  const [isLoadingBrands, setIsLoadingBrands] = useState(true);
  const [showNewBrandInput, setShowNewBrandInput] = useState(false);
  const [newBrandName, setNewBrandName] = useState("");

  useEffect(() => {
    const fetchBrands = async () => {
      setIsLoadingBrands(true);
      const result = await getBrands();
      if (result.success && result.data) {
        setBrandsList(result.data);
        if (result.data.length > 0) {
          setBrandId(result.data[0].id);
        }
      }
      setIsLoadingBrands(false);
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    setAnimate(true);
  }, []);

  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find((file) => file.key === key);
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

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
    if (!brandId) {
      alert("Please select a brand.");
      return;
    }
    setIsSubmitting(true);

    try {
      const uploadedImageUrls = await Promise.all(
        fileStates.map(async (fileState) => {
          try {
            const res = await edgestore.carImages.upload({
              file: fileState.file!,
            });
            return res.url;
          } catch (error) {
            console.error(error);
            updateFileProgress(fileState.key, 'ERROR');
            return null;
          }
        })
      );

      const validUrls = uploadedImageUrls.filter((url) => url !== null) as string[];
      if (validUrls.length === 0) {
        alert("Please upload at least one image.");
        setIsSubmitting(false);
        return;
      }
      
      const result = await createCarListing({
        name: carName,
        type: carType,
        brandId: brandId,
        price: price,
        description: description,
        imageUrls: validUrls,
      });

      if (result.success) {
        alert("Car listing created successfully!");
        setCarName("");
        setCarType("");
        setBrandId(brandsList.length > 0 ? brandsList[0].id : "");
        setPrice("");
        setDescription("");
        setFileStates([]);
      } else {
        throw new Error(result.error || "Failed to create listing.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
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
          <h1 className="text-center text-2xl mb-5">Add New Car</h1>
          <div className="w-full lg:w-[50rem] mb-8">
            <MultiFileDropzone
              value={fileStates}
              onChange={(files) => { setFileStates(files); }}
              onFilesAdded={async (addedFiles) => { setFileStates([...fileStates, ...addedFiles]); }}
            />
          </div>
          <div
            className={`mx-6 lg:mx-12 lg:w-[50rem] transition-all duration-700 ease-out ${
              animate ? "fade-in delay-500" : "opacity-0 translate-y-5"
            }`}
          >
            <label className="block text-sm mb-2">Car Name</label>
            <input
              type="text"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              required
              placeholder="e.g., 2025 Mercedes V Class"
              className="text-xl w-full mb-4 px-4 py-2 bg-transparent border border-white rounded focus:outline-none focus:ring-2 focus:ring-[#f3cd4d]"
            />

            <label className="block text-sm mb-2">Type</label>
            <input
              type="text"
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
              required
              placeholder="e.g., Van, SUV, Sedan"
              className="uppercase text-sm w-full mb-4 px-4 py-2 bg-transparent border border-white rounded focus:outline-none focus:ring-2 focus:ring-[#f3cd4d]"
            />

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

            <label className="block text-sm mb-2">Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="e.g., 150000$"
              className="text-[#daab35] text-sm w-full mb-4 px-4 py-2 bg-transparent border border-[#daab35] rounded focus:outline-none focus:ring-2 focus:ring-[#f3cd4d]"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={6}
              placeholder="Detailed description of the car..."
              className="w-full text-sm mb-10 px-4 py-2 bg-transparent border border-white rounded resize-none focus:outline-none focus:ring-2 focus:ring-[#f3cd4d]"
            />

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-4 w-full lg:w-64 bg-[#daab35] rounded-full px-4 py-3 text-black text-lg mb-10 transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating..." : "Create Car Listing"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withAuth(AddImage);