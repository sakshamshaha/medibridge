"use client";

import React from "react";
import { FilterList, Download, Add, Category, AccountBalanceWallet, Warning, TrendingUp, HorizontalRule, Medication, ShoppingCart, MoreVert, Pill, CheckCircle, Vaccines, EventBusy, Prescriptions, ChevronLeft, ChevronRight } from "@mui/icons-material"; // Adjust if using lucide-react

export default function StockManagement() {
  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
        <div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white">Stock Management</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Real-time inventory tracking and AI-driven reorder insights.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="glass-panel text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/5 transition-colors border border-border-subtle text-[14px] font-medium cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">filter_list</span> Filter
          </button>
          <button className="glass-panel text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/5 transition-colors border border-border-subtle text-[14px] font-medium cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">download</span> Export
          </button>
          <button className="bg-primary text-background px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors text-[14px] font-medium cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">add</span> Add Stock
          </button>
        </div>
      </div>

      {/* Summary Banners (Bento layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-bento-gap">
        <div className="glass-panel bg-[rgba(30,41,59,0.7)] backdrop-blur-xl border border-border-subtle p-card-padding rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Total SKU Count</span>
            <div className="p-2 rounded-lg bg-white/5">
              <span className="material-symbols-outlined text-primary" data-icon="category">category</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="font-headline-lg text-headline-lg text-white">4,821</span>
            <div className="flex items-center gap-1 text-success-emerald mt-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span className="text-[12px] font-medium">+12 from last week</span>
            </div>
          </div>
        </div>
        <div className="glass-panel bg-[rgba(30,41,59,0.7)] backdrop-blur-xl border border-border-subtle p-card-padding rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Total Inventory Value</span>
            <div className="p-2 rounded-lg bg-white/5">
              <span className="material-symbols-outlined text-primary" data-icon="account_balance_wallet">account_balance_wallet</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="font-headline-lg text-headline-lg text-white">$1.24M</span>
            <div className="flex items-center gap-1 text-on-surface-variant mt-1">
              <span className="material-symbols-outlined text-[14px]">horizontal_rule</span>
              <span className="text-[12px] font-medium">Stable over 30 days</span>
            </div>
          </div>
        </div>
        <div className="glass-panel bg-[rgba(30,41,59,0.7)] backdrop-blur-xl border border-border-subtle p-card-padding rounded-xl flex flex-col justify-between border-l-4 border-l-alert-rose">
          <div className="flex justify-between items-start">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Action Required</span>
            <div className="p-2 rounded-lg bg-alert-rose/10">
              <span className="material-symbols-outlined text-alert-rose" data-icon="warning">warning</span>
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <div>
              <span className="font-headline-md text-headline-md text-alert-rose">24</span>
              <span className="block text-[12px] text-on-surface-variant">Low Stock</span>
            </div>
            <div className="w-[1px] bg-border-subtle"></div>
            <div>
              <span className="font-headline-md text-headline-md text-[#c084fc]">8</span>
              <span className="block text-[12px] text-on-surface-variant">Near Expiry</span>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="glass-panel bg-[rgba(30,41,59,0.7)] backdrop-blur-xl border border-border-subtle rounded-xl overflow-hidden mt-4 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-subtle bg-white/5">
                <th className="font-label-caps text-label-caps text-on-surface-variant py-4 px-6 font-semibold tracking-wider">Medicine Name</th>
                <th className="font-label-caps text-label-caps text-on-surface-variant py-4 px-6 font-semibold tracking-wider">Category</th>
                <th className="font-label-caps text-label-caps text-on-surface-variant py-4 px-6 font-semibold tracking-wider">Stock Level</th>
                <th className="font-label-caps text-label-caps text-on-surface-variant py-4 px-6 font-semibold tracking-wider">Avg Daily Sales</th>
                <th className="font-label-caps text-label-caps text-on-surface-variant py-4 px-6 font-semibold tracking-wider">Expiry Date</th>
                <th className="font-label-caps text-label-caps text-on-surface-variant py-4 px-6 font-semibold tracking-wider">Status / Reorder</th>
                <th className="py-4 px-6"></th>
              </tr>
            </thead>
            <tbody className="font-data-tabular text-data-tabular divide-y divide-border-subtle">
              
              {/* Row 1: Low Stock (Teal Warning) */}
              <tr className="hover:bg-primary/5 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant text-[18px]">medication</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Amoxicillin 500mg</p>
                      <p className="text-[12px] text-on-surface-variant">Capsules • 100 ct</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-on-surface-variant">Antibiotics</td>
                <td className="py-4 px-6 text-white font-medium">12 units</td>
                <td className="py-4 px-6 text-on-surface-variant">15 units/day</td>
                <td className="py-4 px-6 text-on-surface-variant">2025-10-14</td>
                <td className="py-4 px-6">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
                    <span className="material-symbols-outlined text-[14px]">shopping_cart</span>
                    <span className="font-status-label text-status-label">Reorder +18</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-on-surface-variant hover:text-white cursor-pointer">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
              
              {/* Row 2: Normal */}
              <tr className="hover:bg-primary/5 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant text-[18px]">pill</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Lisinopril 10mg</p>
                      <p className="text-[12px] text-on-surface-variant">Tablets • 30 ct</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-on-surface-variant">Cardiovascular</td>
                <td className="py-4 px-6 text-white font-medium">85 units</td>
                <td className="py-4 px-6 text-on-surface-variant">8 units/day</td>
                <td className="py-4 px-6 text-on-surface-variant">2026-03-22</td>
                <td className="py-4 px-6">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success-emerald/10 text-success-emerald">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    <span className="font-status-label text-status-label">Optimal</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-on-surface-variant hover:text-white cursor-pointer">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
              
              {/* Row 3: Near Expiry (Purple Alert) */}
              <tr className="hover:bg-primary/5 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant text-[18px]">vaccines</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Insulin Glargine</p>
                      <p className="text-[12px] text-on-surface-variant">Injection • 10ml</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-on-surface-variant">Antidiabetic</td>
                <td className="py-4 px-6 text-white font-medium">42 units</td>
                <td className="py-4 px-6 text-on-surface-variant">3 units/day</td>
                <td className="py-4 px-6 text-on-surface-variant">2024-01-15</td>
                <td className="py-4 px-6 flex gap-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#c084fc]/10 text-[#c084fc] border border-[#c084fc]/30">
                    <span className="material-symbols-outlined text-[14px]">event_busy</span>
                    <span className="font-status-label text-status-label">Expiring Soon</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-on-surface-variant hover:text-white cursor-pointer">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
              
              {/* Row 4: Low Stock & Near Expiry */}
              <tr className="hover:bg-primary/5 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant text-[18px]">prescriptions</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Albuterol Sulfate</p>
                      <p className="text-[12px] text-on-surface-variant">Inhaler • 8.5g</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-on-surface-variant">Respiratory</td>
                <td className="py-4 px-6 text-white font-medium">4 units</td>
                <td className="py-4 px-6 text-on-surface-variant">12 units/day</td>
                <td className="py-4 px-6 text-on-surface-variant">2024-02-01</td>
                <td className="py-4 px-6 flex flex-col gap-2 items-start">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
                    <span className="material-symbols-outlined text-[14px]">shopping_cart</span>
                    <span className="font-status-label text-status-label">Reorder +20</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#c084fc]/10 text-[#c084fc] border border-[#c084fc]/30">
                    <span className="material-symbols-outlined text-[14px]">event_busy</span>
                    <span className="font-status-label text-status-label">Expiring Soon</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-right align-top">
                  <button className="text-on-surface-variant hover:text-white mt-2 cursor-pointer">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-border-subtle flex items-center justify-between bg-white/5">
          <span className="text-[14px] text-on-surface-variant">Showing 1 to 4 of 4,821 entries</span>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded flex items-center justify-center border border-border-subtle text-on-surface-variant hover:bg-white/10 transition-colors disabled:opacity-50 cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded flex items-center justify-center bg-primary/20 text-primary border border-primary/30 font-medium text-[14px] cursor-pointer">1</button>
            <button className="w-8 h-8 rounded flex items-center justify-center border border-border-subtle text-on-surface-variant hover:bg-white/10 transition-colors font-medium text-[14px] cursor-pointer">2</button>
            <button className="w-8 h-8 rounded flex items-center justify-center border border-border-subtle text-on-surface-variant hover:bg-white/10 transition-colors font-medium text-[14px] cursor-pointer">3</button>
            <span className="w-8 h-8 flex items-center justify-center text-on-surface-variant">...</span>
            <button className="w-8 h-8 rounded flex items-center justify-center border border-border-subtle text-on-surface-variant hover:bg-white/10 transition-colors disabled:opacity-50 cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
