"use client";

import React from "react";
import Link from "next/link";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function RetailerDashboard() {
  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-1 tracking-tight">Store Overview</h2>
        <p className="text-on-surface-variant">Live metrics and insights for today.</p>
      </div>
      
      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-bento-gap">
        
        {/* KPI 1: Revenue */}
        <div className="bento-card col-span-1 md:col-span-3 rounded-2xl p-card-padding flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="font-label-caps text-label-caps text-slate-500">Today's Revenue</span>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_10px_rgba(45,212,191,0.2)]">
              <span className="material-symbols-outlined text-[18px]">payments</span>
            </div>
          </div>
          <div>
            <div className="font-hero-display text-hero-display text-slate-900 mb-1">$4,250</div>
            <div className="flex items-center gap-1 text-primary text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>+12.5% vs yesterday</span>
            </div>
          </div>
        </div>
        
        {/* KPI 2: Bills Issued */}
        <div className="bento-card col-span-1 md:col-span-3 rounded-2xl p-card-padding flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="font-label-caps text-label-caps text-slate-500">Bills Issued</span>
            <div className="w-8 h-8 rounded-full bg-tertiary/20 flex items-center justify-center text-tertiary shadow-[0_0_10px_rgba(139,92,246,0.2)]">
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            </div>
          </div>
          <div>
            <div className="font-hero-display text-hero-display text-slate-900 mb-1">142</div>
            <div className="flex items-center gap-1 text-slate-500 text-sm font-medium">
              <span className="material-symbols-outlined text-[16px]">horizontal_rule</span>
              <span>Steady volume</span>
            </div>
          </div>
        </div>
        
        {/* KPI 3: Low Stock */}
        <div className="bento-card col-span-1 md:col-span-3 rounded-2xl p-card-padding flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-warning-amber/20 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="font-label-caps text-label-caps text-slate-500">Low Stock Items</span>
            <div className="w-8 h-8 rounded-full bg-warning-amber/20 flex items-center justify-center text-warning-amber shadow-[0_0_10px_rgba(245,158,11,0.2)]">
              <span className="material-symbols-outlined text-[18px]">warning</span>
            </div>
          </div>
          <div className="relative z-10">
            <div className="font-hero-display text-hero-display text-slate-900 mb-1">18</div>
            <div className="flex items-center gap-1 text-warning-amber text-sm font-medium">
              <span>Requires attention soon</span>
            </div>
          </div>
        </div>
        
        {/* KPI 4: Near Expiry */}
        <div className="bento-card col-span-1 md:col-span-3 rounded-2xl p-card-padding flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-alert-rose/20 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="font-label-caps text-label-caps text-slate-500">Near Expiry Alerts</span>
            <div className="w-8 h-8 rounded-full bg-alert-rose/20 flex items-center justify-center text-alert-rose shadow-[0_0_10px_rgba(244,63,94,0.2)]">
              <span className="material-symbols-outlined text-[18px]">event_busy</span>
            </div>
          </div>
          <div className="relative z-10">
            <div className="font-hero-display text-hero-display text-slate-900 mb-1">5</div>
            <div className="flex items-center gap-1 text-alert-rose text-sm font-medium">
              <span>Critical review needed</span>
            </div>
          </div>
        </div>

        {/* Main Chart Area */}
        <div className="bento-card col-span-1 md:col-span-8 rounded-2xl p-card-padding min-h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <span className="font-label-caps text-label-caps text-slate-500">Sales Trend (Weekly)</span>
            <select className="text-sm border border-slate-200 rounded-full px-4 py-1.5 bg-slate-50 text-slate-900 focus:outline-none focus:border-primary/50 appearance-none">
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
            </select>
          </div>
          {/* Simulated Area Chart */}
          <div className="flex-1 relative w-full h-full border-b border-l border-slate-200/50 flex items-end pt-4 pl-4 pb-1">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-500/60 -ml-8 py-4">
              <span>$5k</span>
              <span>$4k</span>
              <span>$3k</span>
              <span>$2k</span>
              <span>$1k</span>
              <span>$0</span>
            </div>
            {/* Chart Bars/Lines Simulation */}
            <div className="w-full h-full flex items-end justify-between gap-3 relative">
              <div className="absolute w-full h-1/5 border-t border-slate-200/20 bottom-1/5"></div>
              <div className="absolute w-full h-1/5 border-t border-slate-200/20 bottom-[40%]"></div>
              <div className="absolute w-full h-1/5 border-t border-slate-200/20 bottom-[60%]"></div>
              <div className="absolute w-full h-1/5 border-t border-slate-200/20 bottom-[80%]"></div>
              <div className="absolute w-full h-1/5 border-t border-slate-200/20 top-0"></div>
              
              <div className="w-full bg-gradient-to-t from-primary/10 to-primary/40 h-[40%] rounded-t-md relative group hover:to-primary/60 transition-colors border-t border-primary/50">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs py-1.5 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">$2.1k</div>
              </div>
              <div className="w-full bg-gradient-to-t from-primary/10 to-primary/50 h-[60%] rounded-t-md relative group hover:to-primary/70 transition-colors border-t border-primary/50"></div>
              <div className="w-full bg-gradient-to-t from-primary/10 to-primary/60 h-[50%] rounded-t-md relative group hover:to-primary/80 transition-colors border-t border-primary/60"></div>
              <div className="w-full bg-gradient-to-t from-tertiary/10 to-tertiary/60 h-[75%] rounded-t-md relative group hover:to-tertiary/80 transition-colors border-t border-tertiary/60"></div>
              <div className="w-full bg-gradient-to-t from-tertiary/20 to-tertiary/80 h-[90%] rounded-t-md relative group hover:to-tertiary transition-colors border-t border-tertiary/80"></div>
              <div className="w-full bg-gradient-to-t from-primary/20 to-primary/80 h-[85%] rounded-t-md relative group hover:to-primary transition-colors border-t border-primary/80"></div>
              <div className="w-full bg-gradient-to-t from-primary/30 to-primary h-[95%] rounded-t-md relative group hover:brightness-110 transition-all border-t border-primary shadow-[0_-5px_15px_rgba(45,212,191,0.3)]"></div>
            </div>
          </div>
          {/* X-axis labels */}
          <div className="flex justify-between w-full mt-3 text-xs text-slate-500/60 pl-4">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* AI Sales Monitor */}
        <div className="bento-card col-span-1 md:col-span-4 rounded-2xl p-card-padding flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-tertiary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="flex justify-between items-center mb-6 relative z-10">
            <span className="font-label-caps text-label-caps text-slate-500">AI Sales Monitor</span>
            <span className="material-symbols-outlined text-tertiary drop-shadow-[0_0_8px_rgba(139,92,246,0.4)]">psychology</span>
          </div>
          <div className="space-y-6 flex-1 relative z-10">
            {/* Best Sellers */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Demand Surges
              </h4>
              <ul className="space-y-3">
                <li className="flex justify-between items-center bg-slate-50 border border-slate-200 p-3 rounded-xl hover:border-primary/30 transition-colors">
                  <div>
                    <div className="font-data-tabular text-data-tabular text-slate-900">Amoxicillin 500mg</div>
                    <div className="text-xs text-slate-500">Antibiotics</div>
                  </div>
                  <span className="text-primary font-bold text-sm bg-primary/10 px-2 py-1 rounded-md">+24%</span>
                </li>
                <li className="flex justify-between items-center bg-slate-50 border border-slate-200 p-3 rounded-xl hover:border-primary/30 transition-colors">
                  <div>
                    <div className="font-data-tabular text-data-tabular text-slate-900">Cetirizine 10mg</div>
                    <div className="text-xs text-slate-500">Allergy</div>
                  </div>
                  <span className="text-primary font-bold text-sm bg-primary/10 px-2 py-1 rounded-md">+18%</span>
                </li>
              </ul>
            </div>
            {/* Slow Movers */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-warning-amber" />
                Slow Movers
              </h4>
              <ul className="space-y-3">
                <li className="flex justify-between items-center border border-slate-200 p-3 rounded-xl border-dashed hover:border-warning-amber/30 transition-colors">
                  <div>
                    <div className="font-data-tabular text-data-tabular text-slate-900">Vitamin D3 1000IU</div>
                    <div className="text-xs text-slate-500">Supplements</div>
                  </div>
                  <span className="text-warning-amber font-bold text-sm">-5%</span>
                </li>
              </ul>
            </div>
          </div>
          <Link href="/retailer/sales" className="block text-center w-full mt-4 py-2.5 border border-tertiary/50 text-tertiary rounded-full text-sm font-semibold hover:bg-tertiary/10 hover:border-tertiary transition-all relative z-10">
            View Full Report
          </Link>
        </div>

        {/* Recent Activity Feed */}
        <div className="bento-card col-span-1 md:col-span-12 rounded-2xl p-card-padding">
          <div className="flex justify-between items-center mb-6">
            <span className="font-label-caps text-label-caps text-slate-500">Recent Activity</span>
            <button className="text-primary text-sm font-semibold hover:text-primary-fixed hover:drop-shadow-[0_0_8px_rgba(45,212,191,0.4)] transition-all cursor-pointer">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="pb-3 font-label-caps text-label-caps text-slate-500">Time</th>
                  <th className="pb-3 font-label-caps text-label-caps text-slate-500">Action</th>
                  <th className="pb-3 font-label-caps text-label-caps text-slate-500">Item/Patient</th>
                  <th className="pb-3 font-label-caps text-label-caps text-slate-500">Value</th>
                  <th className="pb-3 font-label-caps text-label-caps text-slate-500 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-slate-200 hover:bg-slate-100 transition-colors">
                  <td className="py-4 text-slate-500">10:42 AM</td>
                  <td className="py-4 font-medium text-slate-900">Sale Processed</td>
                  <td className="py-4 font-data-tabular text-slate-500">Prescription #8492</td>
                  <td className="py-4 font-data-tabular text-slate-500">$45.00</td>
                  <td className="py-4 text-right">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-status-label text-status-label shadow-[0_0_10px_rgba(45,212,191,0.1)]">Completed</span>
                  </td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-100 transition-colors">
                  <td className="py-4 text-slate-500">10:15 AM</td>
                  <td className="py-4 font-medium text-slate-900">Stock Alert</td>
                  <td className="py-4 font-data-tabular text-slate-500">Ibuprofen 400mg</td>
                  <td className="py-4 font-data-tabular text-slate-500">-</td>
                  <td className="py-4 text-right">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-warning-amber/10 text-warning-amber border border-warning-amber/20 font-status-label text-status-label shadow-[0_0_10px_rgba(245,158,11,0.1)]">Low Stock</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-100 transition-colors">
                  <td className="py-4 text-slate-500">09:30 AM</td>
                  <td className="py-4 font-medium text-slate-900">Inventory Delivery</td>
                  <td className="py-4 font-data-tabular text-slate-500">Supplier A - PO#112</td>
                  <td className="py-4 font-data-tabular text-slate-500">$1,240.00</td>
                  <td className="py-4 text-right">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-tertiary/10 text-tertiary border border-tertiary/20 font-status-label text-status-label shadow-[0_0_10px_rgba(139,92,246,0.1)]">Received</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
