"use client";

import React from "react";
import { Warning, EventBusy, ProductionQuantityLimits, TrendingUp, SmartToy, Thermostat, LocalShipping, ShoppingCartCheckout, Tune } from "@mui/icons-material"; // Adjust if using lucide-react instead

export default function AlertsCenter() {
  return (
    <>
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-hero-display text-hero-display text-white mb-2">Alerts Center</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Monitor and action operational anomalies across your retail network. Prioritize by urgency to maintain compliance and stock liquidity.</p>
        </div>
        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button className="px-4 py-1.5 rounded-full bg-white/10 text-white font-data-tabular text-data-tabular border border-white/20 hover:bg-white/20 transition-colors whitespace-nowrap">All (12)</button>
          <button className="px-4 py-1.5 rounded-full bg-alert-rose/10 text-alert-rose font-data-tabular text-data-tabular border border-alert-rose/30 hover:bg-alert-rose/20 transition-colors flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-alert-rose"></span> Urgent (3)
          </button>
          <button className="px-4 py-1.5 rounded-full bg-warning-amber/10 text-warning-amber font-data-tabular text-data-tabular border border-warning-amber/30 hover:bg-warning-amber/20 transition-colors flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-warning-amber"></span> Warning (5)
          </button>
          <button className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-data-tabular text-data-tabular border border-primary/30 hover:bg-primary/20 transition-colors flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Info (4)
          </button>
        </div>
      </div>

      {/* Single Most Critical Alert Banner */}
      <div className="mb-bento-gap relative rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-alert-rose to-transparent opacity-30 blur-lg rounded-xl z-0"></div>
        <div className="glass-panel bg-[rgba(18,30,66,0.6)] backdrop-blur-xl border border-alert-rose/50 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 relative overflow-hidden z-10" style={{ animation: 'pulse-border 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
          {/* Icon */}
          <div className="w-14 h-14 rounded-full bg-alert-rose/20 border border-alert-rose/50 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(244,63,94,0.15)] z-10">
            <span className="material-symbols-outlined text-alert-rose text-[28px]">warning</span>
          </div>
          {/* Content */}
          <div className="flex-1 z-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-status-label text-status-label text-alert-rose uppercase tracking-wider bg-alert-rose/10 px-2 py-0.5 rounded">Critical Incident</span>
              <span className="font-data-tabular text-[12px] text-on-surface-variant">Just now</span>
            </div>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white mb-1 leading-tight">Temperature Excursion: Cold Storage Unit B</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Sensor indicates temp dropped below 2°C for &gt;15 mins. Affects 42 NDCs (Insulin, Vaccines). Immediate inspection required to prevent spoilage.</p>
          </div>
          {/* Action */}
          <div className="mt-4 md:mt-0 z-10 w-full md:w-auto flex flex-col gap-2">
            <button className="w-full md:w-auto px-6 py-3 bg-alert-rose hover:opacity-90 text-white font-body-md text-body-md font-semibold rounded-lg transition-colors shadow-[0_0_20px_rgba(244,63,94,0.15)] flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[20px]">thermostat</span>
              Initiate Protocol
            </button>
            <button className="w-full md:w-auto px-6 py-2 bg-transparent border border-white/20 hover:bg-white/5 text-white font-body-md text-[14px] rounded-lg transition-colors text-center">
              View Affected Inventory
            </button>
          </div>
        </div>
      </div>

      {/* Bento Grid for Feed */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-bento-gap mt-8">
        
        {/* Left Column: Primary Feed (8 cols on desktop) */}
        <div className="md:col-span-8 space-y-bento-gap">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-4">Recent Activity</h3>
          
          {/* Alert Card: Warning (Near Expiry) */}
          <div className="glass-panel bg-[rgba(30,41,59,0.7)] backdrop-blur-xl border border-border-subtle rounded-xl p-card-padding hover:-translate-y-1 transition-transform duration-300 group border-l-4 border-l-warning-amber">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-warning-amber/10 flex items-center justify-center shrink-0 mt-1">
                <span className="material-symbols-outlined text-warning-amber">event_busy</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-headline-md text-[18px] text-white group-hover:text-warning-amber transition-colors">High-Value Stock Expiring Soon</h4>
                  <span className="font-data-tabular text-[12px] text-on-surface-variant whitespace-nowrap">2 hrs ago</span>
                </div>
                <p className="font-body-md text-[14px] text-on-surface-variant mb-4">3 units of 'Humira 40mg' (NDC: 00074-4339-02) expiring in 30 days. Estimated value at risk: $12,400.</p>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 bg-warning-amber/10 hover:bg-warning-amber/20 text-warning-amber border border-warning-amber/30 rounded-lg font-data-tabular text-[13px] transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                    Process Return
                  </button>
                  <button className="px-4 py-2 bg-transparent text-on-surface-variant hover:text-white rounded-lg font-data-tabular text-[13px] transition-colors">
                    Discount Authorization
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Alert Card: Urgent (Out of Stock) */}
          <div className="glass-panel bg-[rgba(30,41,59,0.7)] backdrop-blur-xl border border-border-subtle rounded-xl p-card-padding hover:-translate-y-1 transition-transform duration-300 group border-l-4 border-l-alert-rose">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-alert-rose/10 flex items-center justify-center shrink-0 mt-1">
                <span className="material-symbols-outlined text-alert-rose">production_quantity_limits</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-headline-md text-[18px] text-white group-hover:text-alert-rose transition-colors">Critical Stockout: Amoxicillin</h4>
                  <span className="font-data-tabular text-[12px] text-on-surface-variant whitespace-nowrap">4 hrs ago</span>
                </div>
                <p className="font-body-md text-[14px] text-on-surface-variant mb-4">Zero inventory for 'Amoxicillin 500mg'. 5 prescriptions pending in queue. Secondary supplier has available stock.</p>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 bg-white text-background hover:bg-surface-variant rounded-lg font-data-tabular text-[13px] font-semibold transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">shopping_cart_checkout</span>
                    Emergency Reorder
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Alert Card: Info (Demand Surge) */}
          <div className="glass-panel bg-[rgba(30,41,59,0.7)] backdrop-blur-xl border border-border-subtle rounded-xl p-card-padding hover:-translate-y-1 transition-transform duration-300 group border-l-4 border-l-primary">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                <span className="material-symbols-outlined text-primary">trending_up</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-headline-md text-[18px] text-white group-hover:text-primary transition-colors">Demand Surge Detected</h4>
                  <span className="font-data-tabular text-[12px] text-on-surface-variant whitespace-nowrap">Yesterday</span>
                </div>
                <p className="font-body-md text-[14px] text-on-surface-variant mb-4">AI Monitor detects a 45% week-over-week increase in Loratadine requests in your region. Current stock covers ~5 days.</p>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-lg font-data-tabular text-[13px] transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">tune</span>
                    Adjust Pars
                  </button>
                  <button className="px-4 py-2 bg-transparent text-on-surface-variant hover:text-white rounded-lg font-data-tabular text-[13px] transition-colors">
                    View Forecast
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full py-4 border border-dashed border-border-subtle hover:border-primary hover:bg-primary/5 text-on-surface-variant hover:text-primary rounded-xl font-body-md text-[14px] transition-all duration-300 cursor-pointer">
            Load More Alerts
          </button>
        </div>

        {/* Right Column: Context/Widgets (4 cols on desktop) */}
        <div className="md:col-span-4 space-y-bento-gap">
          {/* Quick Stats Bento */}
          <div className="glass-panel bg-[rgba(30,41,59,0.7)] backdrop-blur-xl border border-border-subtle rounded-xl p-card-padding relative overflow-hidden">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4">System Health</h3>
            <div className="space-y-6 relative z-10">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-body-md text-[14px] text-white">Stock Availability</span>
                  <span className="font-data-tabular text-[14px] text-primary">94.2%</span>
                </div>
                <div className="w-full bg-[#0f172a] rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: '94.2%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-body-md text-[14px] text-white">Compliance Status</span>
                  <span className="font-data-tabular text-[14px] text-warning-amber">Attention Req</span>
                </div>
                <div className="w-full bg-[#0f172a] rounded-full h-1.5">
                  <div className="bg-warning-amber h-1.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="pt-2 border-t border-white/10">
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">update</span>
                  <span className="font-data-tabular text-[12px]">Last synced: 2 mins ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Automated Rules Bento */}
          <div className="glass-panel bg-gradient-to-br from-surface-white/20 to-[#0f172a]/80 backdrop-blur-xl border border-white/5 rounded-xl p-card-padding">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant">Auto-Resolutions</h3>
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">smart_toy</span>
            </div>
            <div className="bg-[#0f172a]/50 rounded-lg p-4 border border-border-subtle">
              <p className="font-body-md text-[13px] text-on-surface-variant mb-3">AI Monitor handled <strong className="text-white">14</strong> low-priority alerts in the last 24h via automated supplier POs.</p>
              <button className="w-full py-2 bg-transparent border border-primary/50 hover:bg-primary/10 text-primary rounded-md font-data-tabular text-[12px] transition-colors cursor-pointer">
                Review Automated Logs
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
