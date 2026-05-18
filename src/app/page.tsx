"use client";
import { useState } from "react";
import { Product, SelectedItems } from "./data/types";
import {
  getDeskOptions,
  getChairOptions,
  getAccessoryOptions,
} from "./data/products";
import { WorkspaceCanvas } from "./components/WorkspaceCanvas";
import { ItemSelector } from "./components/ItemSelector";
import { CheckoutSummary } from "./components/CheckoutSummary";
import Image from "next/image";

function App() {
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({
    desk: null,
    chair: null,
    accessories: [],
  });

  const [activeTab, setActiveTab] = useState<
    "desks" | "chairs" | "accessories"
  >("desks");

  // useEffect(() => {
  //   if (!selectedItems.desk) {
  //     console.log(selectedItems);
  //     setSelectedItems({
  //       ...selectedItems,
  //       accessories: [],
  //     });
  //   }
  // }, [selectedItems]);

  const handleSelectDesk = (desk: Product) => {
    setSelectedItems((prev) => ({
      ...prev,
      desk: prev.desk?.id === desk.id ? null : desk,
    }));
  };

  const handleSelectChair = (chair: Product) => {
    setSelectedItems((prev) => ({
      ...prev,
      chair: prev.chair?.id === chair.id ? null : chair,
    }));
  };

  const handleSelectAccessory = (accessory: Product) => {
    setSelectedItems((prev) => {
      const isAlreadySelected = prev.accessories.some(
        (a) => a.id === accessory.id,
      );
      return {
        ...prev,
        accessories: isAlreadySelected
          ? prev.accessories.filter((a) => a.id !== accessory.id)
          : [...prev.accessories, accessory],
      };
    });
  };

  const handleReset = () => {
    setSelectedItems({
      desk: null,
      chair: null,
      accessories: [],
    });
    setActiveTab("desks");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: "url(/images/tropical-bg.jpg)" }}
      ></div>
      <div className="fixed inset-0 bg-linear-to-br from-orange-200/40 via-amber-100/30 to-teal-200/40 -z-10"></div>

      {/* Header */}
      <header className="bg-linear-to-r from-amber-50/95 to-orange-50/95 backdrop-blur-md shadow-lg sticky top-0 z-40 border-b-2 border-orange-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <Image
                  src="/images/monis.png"
                  alt="Monis Rent"
                  width={128}
                  height={128}
                />
                <p className="ml-2 text-sm md:text-base text-amber-800 font-medium">
                  Your Workspace Paradise
                </p>
              </div>
            </div>
            <div
              className="hidden md:block text-3xl animate-pulse"
              style={{ animationDuration: "3s" }}
            >
              🌴
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Left 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Workspace Preview */}
            <div className="bg-linear-to-br from-white/90 to-orange-50/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border-2 border-orange-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="flex flex-row gap-2 text-3xl">
                    🌴
                    <div className=" font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-amber-600 mb-2 flex items-center gap-2">
                      Your Dream Workspace
                    </div>
                  </span>
                  <p className="text-amber-700 text-sm md:text-base">
                    Custom your workspace as you like
                  </p>
                </div>
              </div>
              <div className="aspect-video w-full">
                <WorkspaceCanvas selectedItems={selectedItems} />
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-amber-600">
                <span>💡</span>
                <span className="italic">
                  Click items below to furnish your tropical workspace
                </span>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="bg-linear-to-br from-white/90 to-orange-50/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border-2 border-orange-200">
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                <button
                  onClick={() => setActiveTab("desks")}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap
                    ${
                      activeTab === "desks"
                        ? "bg-linear-to-r from-orange-500 via-amber-500 to-yellow-500 text-white shadow-lg border-2 border-white"
                        : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                    }
                  `}
                >
                  <span>🖥️</span>
                  Desks
                  {selectedItems.desk && (
                    <span className="bg-white text-orange-600 text-xs px-2 py-1 rounded-full font-bold">
                      1
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("chairs")}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap
                    ${
                      activeTab === "chairs"
                        ? "bg-linear-to-r from-orange-500 via-amber-500 to-yellow-500 text-white shadow-lg border-2 border-white"
                        : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                    }
                  `}
                >
                  <span>💺</span>
                  Chairs
                  {selectedItems.chair && (
                    <span className="bg-white text-orange-600 text-xs px-2 py-1 rounded-full font-bold">
                      1
                    </span>
                  )}
                </button>

                <button
                  disabled={!selectedItems.desk && !selectedItems.chair}
                  onClick={() => setActiveTab("accessories")}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap
                    ${!selectedItems.desk && !selectedItems.chair ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed" : ""}
                    ${
                      activeTab === "accessories"
                        ? "bg-linear-to-r from-orange-500 via-amber-500 to-yellow-500 text-white shadow-lg border-2 border-white"
                        : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                    }
                  `}
                >
                  <span>✨</span>
                  Accessories
                  {selectedItems.accessories.length > 0 && (
                    <span className="bg-white text-orange-600 text-xs px-2 py-1 rounded-full font-bold">
                      {selectedItems.accessories.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Tab Content */}
              <div className="animate-fadeIn">
                {activeTab === "desks" && (
                  <ItemSelector
                    title="Choose Your Desk"
                    products={getDeskOptions()}
                    selectedId={selectedItems.desk?.id}
                    onSelect={handleSelectDesk}
                  />
                )}

                {activeTab === "chairs" && (
                  <ItemSelector
                    title="Choose Your Chair"
                    products={getChairOptions()}
                    selectedId={selectedItems.chair?.id}
                    onSelect={handleSelectChair}
                  />
                )}

                {activeTab === "accessories" && (
                  <ItemSelector
                    title="Add Accessories"
                    products={getAccessoryOptions()}
                    selectedIds={selectedItems.accessories.map((a) => a.id)}
                    onSelect={handleSelectAccessory}
                    multiSelect
                  />
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Right 1/3 */}
          <div className="lg:col-span-1">
            <CheckoutSummary
              selectedItems={selectedItems}
              onReset={handleReset}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-linear-to-r from-amber-50/95 to-orange-50/95 backdrop-blur-md mt-16 py-8 border-t-2 border-orange-200">
        <div className="container mx-auto px-4 text-center text-amber-800">
          <div className="flex items-center justify-center gap-2 mb-2">
            <p className="font-semibold">
              © 2022-2026 monis.rent. All rights reserved.
            </p>
            <span className="text-2xl">🌺</span>
          </div>
          <p className="text-sm text-amber-700">
            We support you to work from paradise{" "}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
