
import React from "react";

// 1️⃣ Define the TypeScript interface for each About item
export interface Action {
  Text: string;
  Value: string;
}

export interface AboutItem {
  RecId: number;
  Header?: string;
  WhatHeSaid?: string;
  Name?: string;
  position?: string;
  Image?: string;
  imgposition?: "Left" | "Right" | null;         
  IsBackground?: "True" | "False" | null;
  action?: string | null;
  Order: number;
}

// 2️⃣ Define the props interface
export interface AboutMawaridProps {
  services: AboutItem[];
}

// 3️⃣ Component Implementation
export default function ServicesSection({ services }: AboutMawaridProps) {
  // Sort by Order (like Angular's orderBy:'Order')
  const sortedList = [...services].sort((a, b) => a.Order - b.Order);

  return (
    <>
      {sortedList.map((x) => {
        // Parse JSON action
        let parsedAction: Record<string, string> | null = null;
        if (x.action) {
          try {
            parsedAction = JSON.parse(x.action);
          } catch (err) {
            console.warn("Invalid action JSON for item:", x.RecId);
          }
        }

        const actionText = parsedAction ? Object.keys(parsedAction)[0] : null;
        const actionValue = parsedAction ? Object.values(parsedAction)[0] : null;

        return (
          <div 
            key={x.RecId}
            className={`py-20 px-18  ${x.IsBackground === "True" ? "bg-gray-300/30" : ""}`}
          >
            <div className="container mx-auto px-18 w-screen">
              <div className="flex flex-col md:flex-row items-center py-12 space-y-8 md:space-y-0 md:space-x-8">
                {/* LEFT IMAGE */}
                {x.imgposition === "Left" && x.Image && (
                  <div className="w-full md:w-1/2 text-center">
                    <img
                      src={x.Image}
                      alt={x.Header || "About Mawarid Image"}
                      className="mx-auto max-h-80 object-contain"
                    />
                  </div>
                )}

                {/* TEXT CONTENT */}
                <div className="w-full md:w-1/2 ">
                  {x.Header && <h3 className="text-2xl font-semibold mb-2">{x.Header}</h3>}
                  {x.WhatHeSaid && <p className="mb-2">{x.WhatHeSaid}</p>}
                  {x.Name && <h6 className="font-medium">{x.Name},</h6>}
                  {x.position && <span className="text-yellow-500">{x.position}</span>}
                  <div className="flex justify-end">
                  {actionText && actionValue && (
                    <a
                      href={actionValue}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 px-2 py-2 border-2 border-yellow-500 bg-yellow-500 text-white   hover:bg-transparent hover:text-yellow-500 transition"
                    >
                      {actionText}
                    </a>
                   
                  )}
                   </div>
                </div>

                {/* RIGHT IMAGE */}
                {x.imgposition === "Right" && x.Image && (
                  <div className="w-full md:w-1/2 text-center">
                    <img
                      src={x.Image}
                      alt={x.Header || "About Mawarid Image"}
                      className="mx-auto max-h-80 object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
