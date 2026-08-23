"use client";

import React from "react";
import { AutoAwesome, TrendingUp, Radar, Insights, KeyboardDoubleArrowUp, KeyboardArrowUp, HourglassEmpty } from "@mui/icons-material"; // Adjust if using lucide-react instead

export default function AISalesMonitor() {
  return (
    <>
      {/* Page Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-3">
            AI Sales Monitor
            <span className="material-symbols-outlined text-primary" style={{ textShadow: '0 0 10px rgba(45, 212, 191, 0.5)' }}>auto_awesome</span>
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Real-time performance and predictive intelligence.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Last Updated: Just now</span>
          <div className="w-2 h-2 rounded-full bg-success-emerald animate-pulse"></div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-bento-gap">
        
        {/* Revenue Growth (Line Chart) - span 8 */}
        <div className="glass-panel bg-[rgba(30,41,59,0.7)] backdrop-blur-xl border border-[rgba(51,65,85,0.5)] rounded-xl p-card-padding md:col-span-8 flex flex-col hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-[0px_10px_15px_rgba(15,23,42,0.4)]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Revenue Trajectory</h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-headline-lg text-headline-lg text-on-surface">$124,500</span>
                <span className="font-status-label text-status-label text-success-emerald flex items-center">
                  <span className="material-symbols-outlined text-sm">trending_up</span> +14.2%
                </span>
              </div>
            </div>
            <select className="bg-surface-white/10 border border-border-subtle rounded-lg py-1 px-3 text-sm text-on-surface focus:outline-none">
              <option className="bg-background">This Week</option>
              <option className="bg-background">This Month</option>
            </select>
          </div>
          {/* Mock Chart Area */}
          <div className="flex-1 min-h-[200px] relative w-full flex items-end">
            {/* Abstract SVG Line */}
            <svg className="w-full h-full absolute inset-0 drop-shadow-[0_0_8px_rgba(45,212,191,0.6)]" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0,80 Q10,70 20,75 T40,50 T60,60 T80,30 T100,20" fill="none" stroke="#2DD4BF" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
              <path d="M0,100 L0,80 Q10,70 20,75 T40,50 T60,60 T80,30 T100,20 L100,100 Z" fill="url(#grad)" opacity="0.2"></path>
              <defs>
                <linearGradient id="grad" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#2DD4BF"></stop>
                  <stop offset="100%" stopColor="transparent"></stop>
                </linearGradient>
              </defs>
            </svg>
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
              <div className="border-t border-white w-full"></div>
              <div className="border-t border-white w-full"></div>
              <div className="border-t border-white w-full"></div>
              <div className="border-t border-white w-full"></div>
            </div>
          </div>
        </div>

        {/* Top Selling Categories (Radial) - span 4 */}
        <div className="glass-panel bg-[rgba(30,41,59,0.7)] backdrop-blur-xl border border-[rgba(51,65,85,0.5)] rounded-xl p-card-padding md:col-span-4 flex flex-col hover:-translate-y-1 transition-transform duration-300">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-4">Top Categories</h3>
          <div className="flex-1 flex items-center justify-center relative min-h-[160px]">
            {/* Mock Radial Chart */}
            <div className="relative w-32 h-32 rounded-full border-8 border-primary/20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-8 border-primary border-t-transparent border-r-transparent transform -rotate-45"></div>
              <div className="absolute inset-0 rounded-full border-8 border-[#A855F7]/60 border-l-transparent border-b-transparent transform rotate-[15deg]"></div>
              <div className="text-center">
                <span className="font-headline-md text-headline-md text-on-surface block">Rx</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">42%</span>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="font-data-tabular text-data-tabular">Prescription</span>
              </div>
              <span className="font-status-label text-status-label">42%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#A855F7]/60"></div>
                <span className="font-data-tabular text-data-tabular">OTC Meds</span>
              </div>
              <span className="font-status-label text-status-label">35%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-border-subtle"></div>
                <span className="font-data-tabular text-data-tabular">Supplements</span>
              </div>
              <span className="font-status-label text-status-label">23%</span>
            </div>
          </div>
        </div>

        {/* Demand Prediction - span 6 */}
        <div className="glass-panel bg-[rgba(30,41,59,0.7)] backdrop-blur-xl border border-[rgba(51,65,85,0.5)] rounded-xl p-card-padding md:col-span-6 flex flex-col hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-6xl">radar</span>
          </div>
          <h3 className="font-label-caps text-label-caps text-[#A855F7] uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">insights</span>
            Demand Prediction
          </h3>
          <p className="font-body-md text-body-md text-on-surface mb-6">Local health trends suggest upcoming spikes.</p>
          <div className="space-y-4">
            {/* Item 1 */}
            <div className="bg-surface-white/5 rounded-lg p-3 flex justify-between items-center border border-border-subtle">
              <div>
                <span className="font-data-tabular text-data-tabular font-bold block text-on-surface">Allergy Meds (Cetirizine)</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant block mt-1">High Pollen Count Detected</span>
              </div>
              <div className="text-right">
                <span className="bg-alert-rose/10 text-alert-rose font-status-label text-status-label px-2 py-1 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">keyboard_double_arrow_up</span>
                  +65%
                </span>
                <span className="font-label-caps text-label-caps text-on-surface-variant block mt-1">Expected 48h</span>
              </div>
            </div>
            {/* Item 2 */}
            <div className="bg-surface-white/5 rounded-lg p-3 flex justify-between items-center border border-border-subtle">
              <div>
                <span className="font-data-tabular text-data-tabular font-bold block text-on-surface">Pediatric Electrolytes</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant block mt-1">Regional Flu Outbreak</span>
              </div>
              <div className="text-right">
                <span className="bg-warning-amber/10 text-warning-amber font-status-label text-status-label px-2 py-1 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">keyboard_arrow_up</span>
                  +30%
                </span>
                <span className="font-label-caps text-label-caps text-on-surface-variant block mt-1">Expected 72h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slow Moving Stock - span 6 */}
        <div className="glass-panel bg-[rgba(30,41,59,0.7)] backdrop-blur-xl border border-[rgba(51,65,85,0.5)] rounded-xl p-card-padding md:col-span-6 flex flex-col hover:-translate-y-1 transition-transform duration-300">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">hourglass_empty</span>
            Slow Moving Stock
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-subtle text-on-surface-variant font-label-caps text-label-caps">
                  <th className="pb-2 font-normal">Item</th>
                  <th className="pb-2 font-normal text-right">Days on Shelf</th>
                  <th className="pb-2 font-normal text-right">Value Tied</th>
                </tr>
              </thead>
              <tbody className="font-data-tabular text-data-tabular text-sm">
                <tr className="border-b border-border-subtle/50">
                  <td className="py-3">Premium Sunscreen (SPF 50)</td>
                  <td className="py-3 text-right text-alert-rose">142 Days</td>
                  <td className="py-3 text-right">$1,240</td>
                </tr>
                <tr className="border-b border-border-subtle/50">
                  <td className="py-3">Specialty Wound Care Kit</td>
                  <td className="py-3 text-right text-warning-amber">95 Days</td>
                  <td className="py-3 text-right">$850</td>
                </tr>
                <tr>
                  <td className="py-3">Seasonal Vitamins (C Complex)</td>
                  <td className="py-3 text-right text-warning-amber">88 Days</td>
                  <td className="py-3 text-right">$420</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  );
}
