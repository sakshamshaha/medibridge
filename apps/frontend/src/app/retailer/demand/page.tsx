"use client";

import React, { useState } from "react";
import { Warning, Schedule, Memory, CheckCircle, DoneAll, ArrowForward } from "@mui/icons-material"; // Adjust if using lucide-react

export default function DemandNode() {
  const [orderedItems, setOrderedItems] = useState<Record<string, boolean>>({});

  const toggleOrder = (id: string) => {
    setOrderedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <header className="mb-8">
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white mb-2">Demand Node</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Morning Restock Checklist &amp; Operations</p>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-bento-gap">
        
        {/* Column 1: Critical & Upcoming (Spans 8 cols) */}
        <div className="md:col-span-8 flex flex-col gap-bento-gap">
          
          {/* Critical Section */}
          <div>
            <h3 className="font-label-caps text-label-caps text-alert-rose mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">warning</span>
              Critical Restock Required
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-bento-gap">
              
              {/* Card 1 */}
              <div className="glass-panel bg-[rgba(10,25,47,0.6)] backdrop-blur-xl border-l-4 border-l-alert-rose shadow-[0_0_20px_rgba(244,63,94,0.15)] rounded-xl p-card-padding flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-headline-md text-headline-md text-white">Amoxicillin 500mg</h4>
                    <p className="font-data-tabular text-data-tabular text-on-surface-variant mt-1">Capsules / Pfizer</p>
                  </div>
                  <span className="material-symbols-outlined text-alert-rose text-3xl">vaccines</span>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between font-status-label text-status-label mb-2">
                    <span className="text-on-surface-variant">Current Stock</span>
                    <span className="text-alert-rose">12 Units</span>
                  </div>
                  <div className="w-full bg-[#0f172a] rounded-full h-2">
                    <div className="bg-alert-rose h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <div className="flex justify-between font-status-label text-status-label mt-2">
                    <span className="text-on-surface-variant">Required Node Level</span>
                    <span className="text-white">80 Units</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-border-subtle pt-4">
                  <span className="font-body-md text-body-md text-white">Mark as Ordered</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={orderedItems['amox'] || false} onChange={() => toggleOrder('amox')} />
                    <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-border-subtle"></div>
                  </label>
                </div>
              </div>

              {/* Card 2 */}
              <div className="glass-panel bg-[rgba(10,25,47,0.6)] backdrop-blur-xl border-l-4 border-l-alert-rose shadow-[0_0_20px_rgba(244,63,94,0.15)] rounded-xl p-card-padding flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-headline-md text-headline-md text-white">Lisinopril 20mg</h4>
                    <p className="font-data-tabular text-data-tabular text-on-surface-variant mt-1">Tablets / Zestril</p>
                  </div>
                  <span className="material-symbols-outlined text-alert-rose text-3xl">medication</span>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between font-status-label text-status-label mb-2">
                    <span className="text-on-surface-variant">Current Stock</span>
                    <span className="text-alert-rose">4 Units</span>
                  </div>
                  <div className="w-full bg-[#0f172a] rounded-full h-2">
                    <div className="bg-alert-rose h-2 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                  <div className="flex justify-between font-status-label text-status-label mt-2">
                    <span className="text-on-surface-variant">Required Node Level</span>
                    <span className="text-white">100 Units</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-border-subtle pt-4">
                  <span className="font-body-md text-body-md text-white">Mark as Ordered</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={orderedItems['lisin'] || false} onChange={() => toggleOrder('lisin')} />
                    <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-border-subtle"></div>
                  </label>
                </div>
              </div>

            </div>
          </div>

          {/* Upcoming Shortages Section */}
          <div className="mt-4">
            <h3 className="font-label-caps text-label-caps text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              Upcoming Shortages (AI Predicted)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-bento-gap">
              
              {/* Card 3 */}
              <div className="glass-panel bg-[rgba(10,25,47,0.6)] backdrop-blur-xl border-l-4 border-l-primary shadow-[0_0_20px_rgba(45,212,191,0.1)] rounded-xl p-card-padding flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-headline-md text-headline-md text-white">Atorvastatin 40mg</h4>
                    <p className="font-data-tabular text-data-tabular text-on-surface-variant mt-1">Tablets / Lipitor</p>
                  </div>
                  <span className="material-symbols-outlined text-primary text-3xl">prescriptions</span>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between font-status-label text-status-label mb-2">
                    <span className="text-on-surface-variant">Current Stock</span>
                    <span className="text-primary">45 Units</span>
                  </div>
                  <div className="w-full bg-[#0f172a] rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                  <div className="flex justify-between font-status-label text-status-label mt-2">
                    <span className="text-on-surface-variant">Required by Friday</span>
                    <span className="text-white">120 Units</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-border-subtle pt-4">
                  <span className="font-body-md text-body-md text-white">Mark as Ordered</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={orderedItems['atorv'] || false} onChange={() => toggleOrder('atorv')} />
                    <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-border-subtle"></div>
                  </label>
                </div>
              </div>

            </div>
          </div>
          
        </div>

        {/* Column 2: Fulfilled & Summary (Spans 4 cols) */}
        <div className="md:col-span-4 flex flex-col gap-bento-gap">
          
          {/* AI Insight Card */}
          <div className="glass-panel bg-[rgba(30,41,59,0.7)] backdrop-blur-xl border border-border-subtle rounded-xl p-card-padding relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <span className="material-symbols-outlined text-6xl text-primary">memory</span>
            </div>
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-2 relative z-10">AI Node Summary</h3>
            <p className="font-body-lg text-body-lg text-white mb-4 relative z-10">Demand spike detected in seasonal antihistamines. Recommending +15% bulk order increase for regional nodes.</p>
            <button className="text-primary font-status-label text-status-label flex items-center gap-1 hover:text-white transition-colors relative z-10 cursor-pointer">
              View Forecast <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Fulfilled Section */}
          <div>
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              Fulfilled Today
            </h3>
            <div className="flex flex-col gap-3">
              
              {/* Fulfilled Card 1 */}
              <div className="glass-panel bg-[rgba(30,41,59,0.7)] backdrop-blur-xl border border-border-subtle border-l-4 border-l-on-surface-variant opacity-60 grayscale-[40%] rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-surface-variant">done_all</span>
                  </div>
                  <div>
                    <h4 className="font-data-tabular text-data-tabular text-white">Omeprazole 20mg</h4>
                    <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">Ordered: 200 Units</p>
                  </div>
                </div>
                <span className="font-status-label text-status-label text-on-surface-variant">08:14 AM</span>
              </div>

              {/* Fulfilled Card 2 */}
              <div className="glass-panel bg-[rgba(30,41,59,0.7)] backdrop-blur-xl border border-border-subtle border-l-4 border-l-on-surface-variant opacity-60 grayscale-[40%] rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-surface-variant">done_all</span>
                  </div>
                  <div>
                    <h4 className="font-data-tabular text-data-tabular text-white">Metformin 500mg</h4>
                    <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">Ordered: 150 Units</p>
                  </div>
                </div>
                <span className="font-status-label text-status-label text-on-surface-variant">07:30 AM</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </>
  );
}
