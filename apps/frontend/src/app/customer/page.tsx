"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LocationOn, Search, ArrowForward, CheckCircle, CalendarToday, FolderOpen, CloudDownload, LocalHospital, Stethoscope, Medication } from "@mui/icons-material"; // using icons if needed or span with material-symbols-outlined

export default function CustomerDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero & Search Section */}
      <section className="flex flex-col gap-6 items-center text-center pt-8 pb-4">
        <h2 className="font-hero-display text-[32px] md:text-hero-display text-white font-bold tracking-tight">Find the care you need.</h2>
        <p className="font-body-lg text-[16px] md:text-body-lg text-gray-300 max-w-2xl">Connect with specialists, compare procedure costs, or get your prescriptions delivered seamlessly.</p>
        
        <div className="w-full max-w-3xl flex flex-col md:flex-row gap-4 mt-4">
          {/* Location Selector */}
          <button className="flex items-center gap-2 bg-[#1a2333] border border-white/10 rounded-full px-6 py-4 shadow-lg hover:bg-[#222d42] transition-colors shrink-0 group cursor-pointer">
            <span className="material-symbols-outlined text-teal-400 group-hover:scale-110 transition-transform">location_on</span>
            <span className="font-body-md text-white whitespace-nowrap">New York, NY</span>
            <span className="material-symbols-outlined text-gray-400">arrow_drop_down</span>
          </button>
          
          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-gray-400">search</span>
            </div>
            <input 
              type="text" 
              placeholder="Search diseases, symptoms, doctors, or hospitals..." 
              className="block w-full pl-14 pr-6 py-4 bg-[#1a2333] border border-white/10 rounded-full text-white font-body-md placeholder:text-gray-500 shadow-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none transition-all"
            />
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
              <button className="bg-teal-600 hover:bg-teal-500 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors shadow-sm cursor-pointer">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Services */}
      <section className="bento-grid grid grid-cols-1 md:grid-cols-12 gap-4 mt-8">
        
        {/* Card 1: Hospital Inquiry */}
        <Link href="/hospitals" className="col-span-1 md:col-span-4 glass-panel rounded-2xl p-card-padding flex flex-col gap-6 ambient-glow-teal group cursor-pointer h-full min-h-[320px] relative overflow-hidden block">
          <div className="flex justify-between items-start z-10 relative">
            <div className="w-14 h-14 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-teal-600 text-[32px]">local_hospital</span>
            </div>
            <span className="font-label-caps text-label-caps text-slate-500 uppercase tracking-wider">Facility Search</span>
          </div>
          <div className="absolute inset-0 z-0 flex items-center justify-center pt-8 pb-16 pointer-events-none mix-blend-darken">
            <Image src="/images/hospital_icon.jpg" alt="Hospital Icon" width={180} height={180} className="object-contain opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
          </div>
          <div className="mt-auto z-10 relative">
            <h3 className="font-headline-md text-headline-md font-semibold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">Hospital Inquiry</h3>
            <p className="font-body-md text-body-md text-slate-700">Find specialized procedures with transparent pricing and facility ratings.</p>
          </div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-teal-500/20 to-transparent rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"></div>
        </Link>
        
        {/* Card 2: Doctor Inquiry */}
        <Link href="/doctors" className="col-span-1 md:col-span-4 glass-panel rounded-2xl p-card-padding flex flex-col gap-6 ambient-glow-blue group cursor-pointer h-full min-h-[320px] relative overflow-hidden block">
          <div className="flex justify-between items-start z-10 relative">
            <div className="w-14 h-14 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-sky-600 text-[32px]">stethoscope</span>
            </div>
            <span className="font-label-caps text-label-caps text-slate-500 uppercase tracking-wider">Specialists</span>
          </div>
          <div className="absolute inset-0 z-0 flex items-center justify-center pt-8 pb-16 pointer-events-none mix-blend-darken">
            <Image src="/images/doctor_icon.jpg" alt="Doctor Icon" width={180} height={180} className="object-contain opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
          </div>
          <div className="mt-auto z-10 relative">
            <h3 className="font-headline-md text-headline-md font-semibold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">Doctor Inquiry</h3>
            <p className="font-body-md text-body-md text-slate-700">Connect with world-class specialists for in-person or virtual consultations.</p>
          </div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-sky-500/20 to-transparent rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"></div>
        </Link>
        
        {/* Card 3: Buy Medicines */}
        <Link href="/pharmacy" className="col-span-1 md:col-span-4 glass-panel rounded-2xl p-card-padding flex flex-col gap-6 ambient-glow-purple group cursor-pointer h-full min-h-[320px] relative overflow-hidden block">
          <div className="flex justify-between items-start z-10 relative">
            <div className="w-14 h-14 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-600 text-[32px]">medication</span>
            </div>
            <span className="font-label-caps text-label-caps text-slate-500 uppercase tracking-wider">Pharmacy</span>
          </div>
          <div className="absolute inset-0 z-0 flex items-center justify-center pt-8 pb-16 pointer-events-none mix-blend-darken">
            <Image src="/images/pharmacy_icon.jpg" alt="Pharmacy Icon" width={180} height={180} className="object-contain opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
          </div>
          <div className="mt-auto z-10 relative">
            <h3 className="font-headline-md text-headline-md font-semibold text-slate-900 mb-2 group-hover:text-purple-700 transition-colors">Buy Medicines</h3>
            <p className="font-body-md text-body-md text-slate-700">Order medications directly with instant prescription scanning and verification.</p>
          </div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"></div>
        </Link>
        
      </section>

      {/* Secondary Row: Quick Actions */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Activity Feed (Span 8) */}
        <div className="col-span-1 md:col-span-8 bg-[#111827] rounded-2xl p-card-padding border border-white/10 shadow-lg flex flex-col">
          <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
            <h4 className="font-headline-md text-[20px] md:text-headline-md font-semibold text-white">Recent Activity</h4>
            <button className="text-teal-400 font-body-md hover:underline cursor-pointer">View All</button>
          </div>
          
          <div className="flex flex-col gap-4 flex-1">
            {/* Activity Item 1 */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-emerald-400 text-[20px]">check_circle</span>
              </div>
              <div className="flex-1">
                <p className="font-data-tabular text-data-tabular text-white font-medium">Prescription scan complete</p>
                <p className="font-label-caps text-[11px] text-gray-400 mt-1 uppercase">Lisinopril 10mg • 2 hours ago</p>
              </div>
              <button className="px-4 py-2 border border-white/20 rounded-lg text-white font-body-md text-sm hover:bg-white/10 transition-colors cursor-pointer w-full md:w-auto">Order</button>
            </div>
            
            {/* Activity Item 2 */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-amber-400 text-[20px]">calendar_today</span>
              </div>
              <div className="flex-1">
                <p className="font-data-tabular text-data-tabular text-white font-medium">Appointment tomorrow at 10:00 AM</p>
                <p className="font-label-caps text-[11px] text-gray-400 mt-1 uppercase">Dr. Sarah Jenkins • Cardiology</p>
              </div>
              <button className="px-4 py-2 bg-teal-600 text-white rounded-lg font-body-md text-sm hover:bg-teal-500 transition-colors cursor-pointer w-full md:w-auto">Details</button>
            </div>
          </div>
        </div>
        
        {/* Health Records Quick Access (Span 4) */}
        <div className="col-span-1 md:col-span-4 bg-[#111827] rounded-2xl p-card-padding border border-white/10 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-400">folder_open</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-white font-status-label text-[13px] border border-white/10 font-bold">3 New Docs</span>
            </div>
            <h4 className="font-headline-md text-[24px] font-semibold text-white mb-2">Health Records</h4>
            <p className="font-body-md text-[16px] text-gray-300">Access your latest lab results, imaging, and clinical notes.</p>
          </div>
          <button className="w-full mt-6 py-3 border border-white/20 text-white hover:bg-white/10 font-body-md rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer font-medium">
            <span className="material-symbols-outlined text-[18px]">cloud_download</span>
            View Latest Results
          </button>
        </div>
        
      </section>

      {/* Spacing at bottom */}
      <div className="h-12"></div>
    </div>
  );
}
