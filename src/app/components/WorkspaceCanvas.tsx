import React from "react";
import { SelectedItems } from "../data/types";
import Image from "next/image";

interface WorkspaceCanvasProps {
  selectedItems: SelectedItems;
}

export const WorkspaceCanvas: React.FC<WorkspaceCanvasProps> = ({
  selectedItems,
}) => {
  const { desk, chair, accessories } = selectedItems;

  const totalAccesories = 3;
  const shownAccesories = accessories.slice(0, totalAccesories);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
      {/* Room Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/bali-room-empty.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/10"></div>
      </div>

      {/* Empty state with room visible */}
      {!desk && !chair && accessories.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center p-10 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-orange-300 max-w-md mx-4 animate-fadeIn">
            <div
              className="text-7xl mb-4 animate-bounce"
              style={{ animationDuration: "2s" }}
            >
              🌺
            </div>
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-amber-600 mb-3">
              Design Your Workspace!
            </h3>
            <p className="text-amber-800 text-lg mb-2">
              Start building your dream workspace
            </p>
          </div>
        </div>
      )}

      {/* Workspace Items Layer */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {/* Desk positioned in the room */}
        {desk && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 pointer-events-auto">
            {/* Desk with 3D perspective */}
            <div className="relative">
              {/* Desk surface */}
              <div
                className="relative top-24 rounded-xl shadow-2xl transition-all duration-500 ease-out animate-fadeIn"
                style={{
                  width: "360px",
                  height: "28px",
                  backgroundColor: desk.color,
                  border: "3px solid rgba(0,0,0,0.2)",
                  boxShadow:
                    "0 25px 50px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3)",
                }}
              >
                {/* Desk front edge for 3D effect */}
                <div
                  className="absolute top-full left-0 right-0 h-2 rounded-b-lg"
                  style={{
                    backgroundColor: desk.color,
                    filter: "brightness(0.7)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                  }}
                ></div>

                {/* Desk legs */}
                <div
                  className="absolute -bottom-24 left-8 w-5 h-24 rounded-sm shadow-xl"
                  style={{
                    backgroundColor: desk.color,
                    filter: "brightness(0.8)",
                    boxShadow: "2px 0 10px rgba(0,0,0,0.3)",
                  }}
                ></div>

                <div
                  className="absolute -bottom-24 right-8 w-5 h-24 rounded-sm shadow-xl"
                  style={{
                    backgroundColor: desk.color,
                    filter: "brightness(0.8)",
                    boxShadow: "2px 0 10px rgba(0,0,0,0.3)",
                  }}
                ></div>

                {/* Accessories on desk - improved layout */}
                <div className="absolute -top-12 left-0 right-0 flex flex-wrap justify-center gap-4">
                  {shownAccesories.map((accessory, index) => (
                    <div
                      key={accessory.id}
                      className="flex flex-col items-center animate-fadeIn"
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <Image
                        src={accessory.icon}
                        alt={accessory.name}
                        width={64}
                        height={64}
                      />
                    </div>
                  ))}
                </div>

                {/* Extra accessories notification if more than 8 */}
                {accessories.length > totalAccesories && (
                  <div className="absolute -top-20 -right-8 bg-linear-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    +{accessories.length - totalAccesories} more
                  </div>
                )}
              </div>

              {/* Desk label */}
              <div className="mt-28 flex flex-col items-center text-center gap-4">
                <Image
                  className="justify-center"
                  src={desk.icon}
                  alt={desk.name}
                  width={96}
                  height={96}
                />
                <div className="inline-block text-sm font-bold text-amber-900 bg-linear-to-r from-orange-100 via-yellow-100 to-orange-100 px-4 py-2 rounded-full shadow-xl border-3 border-orange-300">
                  {desk.name}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chair positioned in front of desk */}
        {chair && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 -ml-48 animate-fadeIn pointer-events-auto">
            <div className="mt-28 flex flex-col items-center text-center">
              <Image
                className="justify-center"
                src={chair.icon}
                alt={chair.name}
                width={128}
                height={128}
              />

              <div className="inline-block text-sm font-bold text-amber-900 bg-linear-to-r from-yellow-100 via-orange-100 to-yellow-100 px-4 py-2 rounded-full shadow-xl border-3 border-orange-300">
                {chair.name}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
