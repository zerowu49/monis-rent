import React from "react";
import { Product } from "../data/types";
import Image from "next/image";

interface ItemSelectorProps {
  title: string;
  products: Product[];
  selectedId?: string;
  onSelect: (product: Product) => void;
  multiSelect?: boolean;
  selectedIds?: string[];
}

export const ItemSelector: React.FC<ItemSelectorProps> = ({
  title,
  products,
  selectedId,
  onSelect,
  multiSelect = false,
  selectedIds = [],
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-700 to-amber-700 mb-3 flex items-center gap-2">
        {title}
        {multiSelect && (
          <span className="text-sm font-normal text-amber-600">
            (Select multiple)
          </span>
        )}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {products.map((product) => {
          const isSelected = multiSelect
            ? selectedIds.includes(product.id)
            : selectedId === product.id;

          return (
            <button
              key={product.id}
              onClick={() => onSelect(product)}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-300
                hover:scale-105 hover:shadow-xl
                ${
                  isSelected
                    ? "border-orange-400 bg-linear-to-br from-orange-50 to-yellow-50 shadow-lg ring-2 ring-orange-300"
                    : "border-orange-200 bg-white/80 backdrop-blur-sm hover:border-orange-300 hover:bg-orange-50/50"
                }
              `}
            >
              {/* Selected badge */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 bg-linear-to-r from-orange-500 via-amber-500 to-yellow-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shadow-lg border-2 border-white">
                  ✓
                </div>
              )}

              <div className="flex items-center gap-3">
                <Image
                  src={product.icon}
                  alt={product.name}
                  width={64}
                  height={64}
                />
                <div className="flex-1 text-left">
                  <h4 className="font-bold text-black">{product.name}</h4>
                  <p className="text-xs text-black mb-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-amber-600">
                      ${product.price}
                      <span className="ml-1 text-sm text-amber-600">/week</span>
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
