"use client";

import { CustomerTopNav } from "../../components/CustomerLayoutUI";
import Link from "next/link";
import { useState } from "react";

export default function HospitalsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <CustomerTopNav />

      {/* Main Content Canvas */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto p-margin-mobile md:p-margin-desktop bg-surface-container-lowest">
        {/* Search Header */}
        <section className="relative rounded-3xl bg-surface-container-low p-8 md:p-12 mb-12 overflow-hidden flex flex-col items-center text-center">
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary-container to-tertiary-container"></div>
          
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4 z-10">
            Find the Right Hospital
          </h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-2xl mb-8 z-10">
            Compare facilities, check real-time availability, and get accurate cost estimates for your procedure.
          </p>
          
          {/* Search Bar */}
          <div className="w-full max-w-2xl flex bg-surface-container-lowest rounded-full border border-border-subtle overflow-hidden focus-within:ring-2 focus-within:ring-primary-container/50 transition-all z-10 mb-6 shadow-sm">
            <div className="flex items-center pl-4 pr-2 text-secondary">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input 
              type="text" 
              placeholder="Search hospitals, locations, or specialties..." 
              className="flex-1 py-4 px-2 outline-none bg-transparent font-body-md text-on-surface"
            />
            <button className="bg-primary text-surface-white font-label-caps text-label-caps px-8 py-4 hover:bg-surface-tint transition-colors cursor-pointer uppercase tracking-wider">
              Search
            </button>
          </div>
          {/* Filters (Bento Chips) */}
          <div className="flex flex-wrap items-center justify-center gap-4 z-10">
            <span className="font-label-caps text-label-caps text-tertiary mr-2 uppercase tracking-wider">Filters:</span>
            
            <button className="flex items-center gap-2 bg-primary-container/20 text-primary-fixed-variant px-5 py-3 rounded-full border border-primary-container hover:bg-primary-container/30 transition-colors cursor-pointer shadow-sm">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>near_me</span>
              <span className="font-label-caps text-label-caps uppercase">
                Proximity: <span className="font-bold">&lt; 10 Miles</span>
              </span>
            </button>
            
            <button className="flex items-center gap-2 bg-surface-container-lowest text-secondary px-5 py-3 rounded-full border border-border-subtle hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer shadow-sm">
              <span className="material-symbols-outlined text-[20px]">payments</span>
              <span className="font-label-caps text-label-caps uppercase">
                Price: <span className="font-bold">All</span>
              </span>
              <span className="material-symbols-outlined text-[20px]">arrow_drop_down</span>
            </button>
            
            <button className="flex items-center gap-2 bg-surface-container-lowest text-secondary px-5 py-3 rounded-full border border-border-subtle hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer shadow-sm">
              <span className="material-symbols-outlined text-[20px]">star</span>
              <span className="font-label-caps text-label-caps uppercase">
                Rating: <span className="font-bold">4.0+</span>
              </span>
              <span className="material-symbols-outlined text-[20px]">arrow_drop_down</span>
            </button>
          </div>
        </section>

        {/* Bento Grid: Procedure Categories */}
        <div className="flex flex-col gap-12">
          
          {/* Category: PCNL */}
          <section>
            <div className="mb-6 flex items-center gap-4">
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                PCNL{" "}
                <span className="font-body-md text-[16px] text-tertiary font-normal tracking-normal ml-2">
                  (Percutaneous Nephrolithotomy)
                </span>
              </h2>
              <div className="flex-grow h-px bg-border-subtle hidden md:block opacity-50"></div>
              <div className="hidden md:flex items-center gap-2 bg-surface-container-high px-3 py-1 rounded-full text-secondary font-label-caps text-[10px] uppercase tracking-wider">
                <span className="material-symbols-outlined text-[14px]">info</span>
                Stones &gt; 2cm
              </div>
            </div>
            
            <div className="flex overflow-x-auto gap-bento-gap pb-6 hide-scrollbar snap-x">
              
              {/* Hospital Card 1 */}
              <div className="bento-card min-w-[320px] md:min-w-[400px] w-full md:w-1/3 flex flex-col gap-4 bento-hover snap-start shrink-0 p-0 overflow-hidden group">
                <div className="h-40 relative overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTAfCkNBUTgPT8di5BkiPrr39C1vY2q7RU96Npbz52JvkWFBkU4FfalTLU0RL7HVT9UpV_YSz9-Kz89ostYxZoeUCCRftojU-zfBLLLzSDilShhOuBP2jwMsjoicuC3SirDHlrOZBP53K__MYhA36ZarZeMXKesYtnmuFrQ-hyWbAvUTsf2nRZVZQeB-8r9pefBpa9dHJL42n8ch6PSQPOVtPExb1OfQ6IDv2mScEofw68PFW2Vum0"
                    alt="Operating theater"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 to-transparent opacity-80"></div>
                  
                  <div className="absolute top-4 right-4 glass-panel px-2 py-1 rounded text-primary-container font-data-tabular font-bold flex items-center gap-1 shadow-sm border-none">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 
                    4.9
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="font-label-caps text-label-caps text-surface-white/80 mb-1 tracking-wider uppercase block">
                      Urology Center of Excellence
                    </span>
                    <h3 className="font-headline-md text-headline-md text-surface-white text-[22px] leading-tight">
                      Cityview Memorial Hospital
                    </h3>
                  </div>
                </div>
                
                <div className="flex flex-col flex-grow px-6 pb-6 pt-2">
                  <div className="flex items-center gap-2 text-secondary font-data-tabular text-data-tabular mb-6">
                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                    2.4 miles away
                  </div>
                  <div className="mt-auto pt-4 border-t border-border-subtle flex justify-between items-center">
                    <div>
                      <span className="font-label-caps text-[10px] text-tertiary block mb-1 uppercase tracking-wider">
                        Est. PCNL Cost
                      </span>
                      <span className="font-data-tabular text-[18px] font-bold text-on-surface">
                        $4,200 - $5,500
                      </span>
                    </div>
                    <button className="bg-primary text-surface-white font-label-caps text-[12px] px-6 py-3 rounded-full hover:bg-surface-tint transition-colors cursor-pointer shadow-sm uppercase tracking-wider">
                      View Details
                    </button>
                  </div>
                </div>
              </div>

              {/* Hospital Card 2 */}
              <div className="bento-card min-w-[320px] md:min-w-[400px] w-full md:w-1/3 flex flex-col gap-4 bento-hover snap-start shrink-0 p-0 overflow-hidden group border-primary-container">
                <div className="h-40 relative overflow-hidden bg-primary/10 flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(var(--color-primary) 1px, transparent 1px)", backgroundSize: "16px 16px" }}></div>
                  <span className="material-symbols-outlined text-[64px] text-primary/40 relative z-10 transition-transform duration-700 group-hover:scale-110">local_hospital</span>
                  <div className="absolute top-4 right-4 bg-surface-container-lowest px-2 py-1 rounded text-primary font-data-tabular font-bold flex items-center gap-1 shadow-sm border border-border-subtle z-20">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 
                    4.7
                  </div>
                  <div className="absolute top-4 left-4 bg-primary text-surface-white px-2 py-1 rounded font-label-caps text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-sm z-20">
                    <span className="material-symbols-outlined text-[14px]">verified</span> 
                    Top Rated
                  </div>
                </div>
                
                <div className="flex flex-col flex-grow px-6 pb-6 pt-4">
                  <span className="font-label-caps text-label-caps text-tertiary mb-1 tracking-wider uppercase">
                    Surgical Institute
                  </span>
                  <h3 className="font-headline-md text-headline-md text-on-surface text-[22px] leading-tight mb-2">
                    Metro West Medical Center
                  </h3>
                  <div className="flex items-center gap-2 text-secondary font-data-tabular text-data-tabular mb-6">
                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                    5.1 miles away
                  </div>
                  <div className="mt-auto pt-4 border-t border-border-subtle flex justify-between items-center">
                    <div>
                      <span className="font-label-caps text-[10px] text-tertiary block mb-1 uppercase tracking-wider">
                        Est. PCNL Cost
                      </span>
                      <span className="font-data-tabular text-[18px] font-bold text-on-surface">
                        $3,800 - $4,900
                      </span>
                    </div>
                    <button className="bg-primary text-surface-white font-label-caps text-[12px] px-6 py-3 rounded-full hover:bg-surface-tint transition-colors cursor-pointer shadow-sm uppercase tracking-wider">
                      View Details
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Category: RIRS */}
          <section>
            <div className="mb-6 flex items-center gap-4">
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                RIRS{" "}
                <span className="font-body-md text-[16px] text-tertiary font-normal tracking-normal ml-2">
                  (Retrograde Intrarenal Surgery)
                </span>
              </h2>
              <div className="flex-grow h-px bg-border-subtle hidden md:block opacity-50"></div>
              <div className="hidden md:flex items-center gap-2 bg-surface-container-high px-3 py-1 rounded-full text-secondary font-label-caps text-[10px] uppercase tracking-wider">
                <span className="material-symbols-outlined text-[14px]">info</span>
                Stones &lt; 2cm
              </div>
            </div>
            
            <div className="flex overflow-x-auto gap-bento-gap pb-6 hide-scrollbar snap-x">
              
              {/* Hospital Card 3 */}
              <div className="bento-card min-w-[320px] md:min-w-[400px] w-full md:w-1/3 flex flex-col gap-4 bento-hover snap-start shrink-0 p-0 overflow-hidden group">
                <div className="h-40 relative overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk1SF9PveO16jCqWsZg9XZ7OZhaoJbFKwjji0QQT3KgxPWbXTwAWWvl4oVJJ-hFq-EO0ZBXQF2_ZM7Ogfmp3aTljwEnX36uyy0srK4GU6P21x5bIeuLr-uzrMsuPAp0jTgVPMBh9sopsqisntHpn3R8N7UHqcPfZXICZC6Ce84S6yP0AOY4IFZ3W_kV7NfEpebc0njmA2K65jL5jkehFoFxlOW4dYp6oxnZA3RN21B-5x5nJIo8tNC"
                    alt="Consultation room"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 to-transparent opacity-80"></div>
                  
                  <div className="absolute top-4 right-4 glass-panel px-2 py-1 rounded text-primary-container font-data-tabular font-bold flex items-center gap-1 shadow-sm border-none">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 
                    4.8
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="font-label-caps text-label-caps text-surface-white/80 mb-1 tracking-wider uppercase block">
                      Laser Surgery Hub
                    </span>
                    <h3 className="font-headline-md text-headline-md text-surface-white text-[22px] leading-tight">
                      Northside Kidney Specialists
                    </h3>
                  </div>
                </div>
                
                <div className="flex flex-col flex-grow px-6 pb-6 pt-2">
                  <div className="flex items-center gap-2 text-secondary font-data-tabular text-data-tabular mb-6">
                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                    3.8 miles away
                  </div>
                  <div className="mt-auto pt-4 border-t border-border-subtle flex justify-between items-center">
                    <div>
                      <span className="font-label-caps text-[10px] text-tertiary block mb-1 uppercase tracking-wider">
                        Est. RIRS Cost
                      </span>
                      <span className="font-data-tabular text-[18px] font-bold text-on-surface">
                        $2,900 - $3,500
                      </span>
                    </div>
                    <button className="bg-primary text-surface-white font-label-caps text-[12px] px-6 py-3 rounded-full hover:bg-surface-tint transition-colors cursor-pointer shadow-sm uppercase tracking-wider">
                      View Details
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
