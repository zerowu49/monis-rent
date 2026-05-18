import React, { useState } from "react";
import { SelectedItems } from "../data/types";
import Image from "next/image";

interface CheckoutSummaryProps {
  selectedItems: SelectedItems;
  onReset: () => void;
}

export const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  selectedItems,
  onReset,
}) => {
  const [showModal, setShowModal] = useState(false);
  const { desk, chair, accessories } = selectedItems;

  const calculateTotal = () => {
    let total = 0;
    if (desk) total += desk.price;
    if (chair) total += chair.price;
    accessories.forEach((acc) => (total += acc.price));
    return total;
  };

  const total = calculateTotal();
  const hasItems = desk || chair || accessories.length > 0;

  const handleRent = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    alert("🎉 Your workspace has been rented! We'll be in touch soon.");
    onReset();
  };

  if (!hasItems) {
    return (
      <div className="bg-linear-to-br from-orange-100 to-yellow-100 rounded-2xl p-6 text-center border-2 border-orange-200 shadow-lg">
        <div className="text-4xl mb-2">🌺</div>
        <p className="text-amber-700 font-medium">Start selecting items!</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-linear-to-br from-white/95 to-orange-50/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sticky top-6 border-2 border-orange-200">
        <span className="flex flex-row gap-2 text-2xl">
          🏝️
          <div className=" font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-amber-600 mb-2 flex items-center gap-2">
            Your Paradise Setup
          </div>
        </span>
        <div className="space-y-3 mb-6">
          {desk && (
            <div className="flex items-center justify-between p-3 bg-linear-to-r from-orange-100 to-amber-100 rounded-lg border border-orange-200 shadow-sm">
              <div className="flex items-center gap-2">
                <Image src={desk.icon} alt={desk.name} width={64} height={64} />
                <div>
                  <p className="font-semibold text-amber-900">{desk.name}</p>
                  <p className="text-xs text-amber-700">Desk</p>
                </div>
              </div>
              <span className="font-bold text-orange-600">${desk.price}</span>
            </div>
          )}

          {chair && (
            <div className="flex items-center justify-between p-3 bg-linear-to-r from-yellow-100 to-orange-100 rounded-lg border border-orange-200 shadow-sm">
              <div className="flex items-center gap-2">
                <Image
                  src={chair.icon}
                  alt={chair.name}
                  width={64}
                  height={64}
                />
                <div>
                  <p className="font-semibold text-amber-900">{chair.name}</p>
                  <p className="text-xs text-amber-700">Chair</p>
                </div>
              </div>
              <span className="font-bold text-orange-600">${chair.price}</span>
            </div>
          )}

          {accessories.length > 0 && (
            <div className="space-y-2">
              {accessories.map((acc) => (
                <div
                  key={acc.id}
                  className="flex items-center justify-between p-3 bg-linear-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-200 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={acc.icon}
                      alt={acc.name}
                      width={64}
                      height={64}
                    />
                    <div>
                      <p className="font-semibold text-teal-900 text-sm">
                        {acc.name}
                      </p>
                      <p className="text-xs text-teal-700">Accessory</p>
                    </div>
                  </div>
                  <span className="font-bold text-teal-600">${acc.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t-2 border-orange-200 pt-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-amber-700 font-semibold">Grand Total:</span>
            <span className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-600 via-amber-600 to-yellow-600">
              ${total}
            </span>
          </div>
          <p className="text-xs text-amber-600 text-right font-medium">
            per Week
          </p>
        </div>

        <div className="space-y-2">
          <button
            onClick={handleRent}
            className="w-full bg-linear-to-r from-orange-500 via-amber-500 to-yellow-500 text-white font-bold py-2 px-6 rounded-full hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-white"
          >
            Rent Setup
          </button>
          <button
            onClick={onReset}
            className="w-full bg-linear-to-r from-amber-200 to-orange-200 text-amber-800 font-semibold py-2 px-6 rounded-full hover:from-amber-300 hover:to-orange-300 transition-all duration-300"
          >
            Reset Setup
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-linear-to-br from-white to-orange-50 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-fadeIn border-4 border-orange-300">
            <div className="text-center mb-6">
              <div className="text-7xl mb-4 animate-bounce">🌺</div>
              <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-amber-600 mb-2">
                Confirm Your Rental
              </h2>
              <p className="text-amber-700">
                You're about to rent this amazing Bali workspace for
              </p>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-600 via-amber-600 to-yellow-600 my-4">
                ${total}/month
              </div>
            </div>

            <div className="bg-linear-to-br from-orange-100 to-yellow-100 rounded-xl p-4 mb-6 border-2 border-orange-200">
              <p className="text-sm text-amber-800 font-semibold mb-2 flex items-center gap-2">
                <span>🏝️</span> Your paradise setup includes:
              </p>
              <ul className="space-y-1 text-sm text-amber-900">
                {desk && (
                  <li className="flex items-center gap-2">✓ {desk.name}</li>
                )}
                {chair && (
                  <li className="flex items-center gap-2">✓ {chair.name}</li>
                )}
                {accessories.map((acc) => (
                  <li key={acc.id} className="flex items-center gap-2">
                    ✓ {acc.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-linear-to-r from-amber-200 to-orange-200 text-amber-800 font-semibold py-3 px-6 rounded-full hover:from-amber-300 hover:to-orange-300 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 bg-linear-to-r from-orange-500 via-amber-500 to-yellow-500 text-white font-bold py-3 px-6 rounded-full hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 transition-all duration-300 shadow-lg border-2 border-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
