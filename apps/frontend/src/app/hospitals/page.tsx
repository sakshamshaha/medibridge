"use client";

import { CustomerTopNav } from "../../components/CustomerLayoutUI";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../lib/api";
import { Loader2 } from "lucide-react";

export default function HospitalsPage() {
  const { data: procedureGroups, error, isLoading } = useSWR('/hospitals', fetcher);
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
          
          {isLoading && (
            <div className="flex justify-center items-center py-20 text-secondary">
              <Loader2 className="w-8 h-8 animate-spin mr-2" />
              <span className="font-body-lg">Loading hospitals...</span>
            </div>
          )}

          {error && (
            <div className="bento-card p-6 text-center text-error">
              <p>Failed to load hospitals. Please try again later.</p>
            </div>
          )}

          {!isLoading && !error && procedureGroups?.map((group: any) => (
            <section key={group.id}>
              <div className="mb-6 flex items-center gap-4">
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                  {group.name}{" "}
                  <span className="font-body-md text-[16px] text-tertiary font-normal tracking-normal ml-2">
                    ({group.description})
                  </span>
                </h2>
                <div className="flex-grow h-px bg-border-subtle hidden md:block opacity-50"></div>
              </div>
              
              <div className="flex overflow-x-auto gap-bento-gap pb-6 hide-scrollbar snap-x">
                {group.hospitals?.map((hospital: any) => (
                  <div key={hospital.id} className="bento-card min-w-[320px] md:min-w-[400px] w-full md:w-1/3 flex flex-col gap-4 bento-hover snap-start shrink-0 p-0 overflow-hidden group">
                    <div className="h-40 relative overflow-hidden">
                      <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={hospital.photo || "https://lh3.googleusercontent.com/aida-public/AB6AXuCTAfCkNBUTgPT8di5BkiPrr39C1vY2q7RU96Npbz52JvkWFBkU4FfalTLU0RL7HVT9UpV_YSz9-Kz89ostYxZoeUCCRftojU-zfBLLLzSDilShhOuBP2jwMsjoicuC3SirDHlrOZBP53K__MYhA36ZarZeMXKesYtnmuFrQ-hyWbAvUTsf2nRZVZQeB-8r9pefBpa9dHJL42n8ch6PSQPOVtPExb1OfQ6IDv2mScEofw68PFW2Vum0"}
                        alt="Hospital"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 to-transparent opacity-80"></div>
                      
                      <div className="absolute top-4 right-4 glass-panel px-2 py-1 rounded text-primary-container font-data-tabular font-bold flex items-center gap-1 shadow-sm border-none">
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 
                        {4.5 + Math.random() * 0.5 /* Mock rating */}
                      </div>
                      
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="font-label-caps text-label-caps text-surface-white/80 mb-1 tracking-wider uppercase block">
                          {hospital.type}
                        </span>
                        <h3 className="font-headline-md text-headline-md text-surface-white text-[22px] leading-tight">
                          {hospital.name}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="flex flex-col flex-grow px-6 pb-6 pt-2">
                      <div className="flex items-center gap-2 text-secondary font-data-tabular text-data-tabular mb-6">
                        <span className="material-symbols-outlined text-[18px]">location_on</span>
                        {hospital.distance} away
                      </div>
                      <div className="mt-auto pt-4 border-t border-border-subtle flex justify-between items-center">
                        <div>
                          <span className="font-label-caps text-[10px] text-tertiary block mb-1 uppercase tracking-wider">
                            Patients Treated
                          </span>
                          <span className="font-data-tabular text-[18px] font-bold text-on-surface">
                            {hospital.treated}
                          </span>
                        </div>
                        <button className="bg-primary text-surface-white font-label-caps text-[12px] px-6 py-3 rounded-full hover:bg-surface-tint transition-colors cursor-pointer shadow-sm uppercase tracking-wider">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
