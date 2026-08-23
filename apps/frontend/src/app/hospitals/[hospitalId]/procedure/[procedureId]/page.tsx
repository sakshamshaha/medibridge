"use client";

import React, { useState } from "react";
import { CustomerTopNav } from "../../../../../components/CustomerLayoutUI";

export default function HospitalProcedureDetailPage({ params }: { params: { hospitalId: string, procedureId: string } }) {
  const [expandConsumables, setExpandConsumables] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface font-body-md antialiased overflow-x-hidden">
      <CustomerTopNav />

      {/* Main Content Canvas */}
      <main className="w-full max-w-[1440px] pt-28 mx-auto px-margin-mobile md:px-margin-desktop py-8 flex flex-col lg:flex-row gap-bento-gap relative">
        {/* Left Content Area (Grid) */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-bento-gap self-start">
          
          {/* Page Header */}
          <div className="md:col-span-12 mb-4">
            <p className="font-label-caps text-label-caps text-tertiary uppercase tracking-wider mb-2">Procedure Details</p>
            <h1 className="font-hero-display text-hero-display text-on-surface mb-2">PCNL Surgery</h1>
            <p className="font-body-lg text-body-lg text-secondary flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">domain</span>
              Memorial Health Center
            </p>
          </div>
          
          {/* 1. Doctor Section (4 cols) */}
          <div className="bento-card md:col-span-4 flex flex-col">
            <p className="font-label-caps text-label-caps text-tertiary uppercase mb-4">Lead Surgeon</p>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary-container">
                <img alt="Dr. Marcus Chen" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0htWMfXmPVdXYUyrUvzxaGWbB3ksvkHtZ9lIxEgyCdiH48zpCrbbVM6BocYlyAtG7ZoAuB50dSLPkcTQi-zul2ibKS1hFDFpie76Vxi7iq0ahHqog9IEzutCK4b3_5W6w3xlWG0ba6p-Z-JB7feHsIFkgWEhDeJXCaF9HLoVVBcWZysF2JDtNV9-og92mBjYXkTjWcgMbKXru4Enx2asyQyAvlGECv8Zn50hx4XvvW6paFuldAx20"/>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Dr. Marcus Chen</h3>
              <p className="font-body-md text-body-md text-secondary mt-1">Interventional Cardiologist</p>
              <div className="mt-6 w-full flex justify-around border-t border-border-subtle pt-4">
                <div>
                  <p className="font-headline-md text-headline-md text-primary">15+</p>
                  <p className="font-label-caps text-label-caps text-tertiary uppercase">Years Exp</p>
                </div>
                <div>
                  <p className="font-headline-md text-headline-md text-primary">500+</p>
                  <p className="font-label-caps text-label-caps text-tertiary uppercase">Procedures</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 2. Hospital Info & 3. Licenses (8 cols) */}
          <div className="bento-card md:col-span-8 flex flex-col gap-6">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-label-caps text-label-caps text-tertiary uppercase mb-1">Facility Overview</p>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">Memorial Health Center</h2>
                  <p className="font-body-md text-body-md text-secondary mt-1">Private Healthcare Facility</p>
                </div>
                <span className="bg-success-emerald/10 text-success-emerald px-3 py-1 rounded-full font-status-label text-status-label flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">verified</span> High Success Rate (94%)
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="p-4 bg-surface-container-low rounded-lg border border-border-subtle">
                  <span className="material-symbols-outlined text-primary mb-2">medical_services</span>
                  <p className="font-headline-md text-headline-md">250+</p>
                  <p className="font-body-md text-body-md text-secondary text-sm">PCNL Procedures</p>
                </div>
                <div className="p-4 bg-surface-container-low rounded-lg border border-border-subtle">
                  <span className="material-symbols-outlined text-primary mb-2">star</span>
                  <p className="font-headline-md text-headline-md">4.8/5</p>
                  <p className="font-body-md text-body-md text-secondary text-sm">Patient Rating</p>
                </div>
                <div className="p-4 bg-surface-container-low rounded-lg border border-border-subtle">
                  <span className="material-symbols-outlined text-primary mb-2">hotel</span>
                  <p className="font-headline-md text-headline-md">150</p>
                  <p className="font-body-md text-body-md text-secondary text-sm">Beds</p>
                </div>
                <div className="p-4 bg-surface-container-low rounded-lg border border-border-subtle">
                  <span className="material-symbols-outlined text-primary mb-2">emergency</span>
                  <p className="font-headline-md text-headline-md">24/7</p>
                  <p className="font-body-md text-body-md text-secondary text-sm">Emergency</p>
                </div>
              </div>
            </div>
            
            {/* Licenses */}
            <div className="border-t border-border-subtle pt-6">
              <p className="font-label-caps text-label-caps text-tertiary uppercase mb-4">Certifications &amp; Licenses</p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-surface border border-border-subtle rounded-lg">
                  <span className="material-symbols-outlined text-primary">bloodtype</span>
                  <span className="font-data-tabular text-data-tabular">Blood Bank License</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-surface border border-border-subtle rounded-lg">
                  <span className="material-symbols-outlined text-primary">policy</span>
                  <span className="font-data-tabular text-data-tabular">DHA Regulatory Standard</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-surface border border-border-subtle rounded-lg">
                  <span className="material-symbols-outlined text-primary">workspace_premium</span>
                  <span className="font-data-tabular text-data-tabular">NABH Accreditation</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 4. Photos Gallery (12 cols) */}
          <div className="bento-card md:col-span-12">
            <p className="font-label-caps text-label-caps text-tertiary uppercase mb-4">Facility Gallery</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="col-span-2 row-span-2 rounded-xl overflow-hidden aspect-video md:aspect-auto">
                <div className="w-full h-full min-h-[300px] bg-cover bg-center transition-transform duration-500 hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCgKGS82wle4ep8unCKI3OXLMWq7bJHAMbx7hY1fKNrAUqmrr2lV8c701BPIw_CSBiPktltmOb7orY_xTNDjxkdJLgzLxeKyw95fJvLfb8jKuWUGvkXz36EW6roMwphaJlAcfemJIPAxOhxIwhzRESFH8RMoKN6N7GXwEnWPFQnujqg9CMJ4flir8mZWAwKFxltSvF7LYF3P9omTofkY4pS-5SAiYPHdlbAqTrg3n03jEzePBV_OAqN')" }}></div>
              </div>
              <div className="rounded-xl overflow-hidden aspect-square">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA4kQgQqdWrGGFKnuKf2VM1t7D-ueDacbhHEqPvQ5jbuMK30OolHMtuOCGYFhEF3OBNXwJMM-37vVBDbvgiUarjA79169_DFh_HUd1UtJiJPLZWAhy0V4m3Sl3FnOgfrIlGtwFoH3p0Jaky99I2bWgFNiq5FfBpVDm5oOxGBIP5kdaoEo732cpYIKYNnpKa6sHO5zAOUQnZl28WEMCazjfF0roAdeFkHvwoEYhgIeh7FV6lh5t8CFAZ')" }}></div>
              </div>
              <div className="rounded-xl overflow-hidden aspect-square">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDqNgjJ0UPXGcs_Ng-hpDxdl2rFOze6iBDrqXBxfCD5oF8Dz4M8peNPCKMFo0qpmAoUaIbwoAF2nkDn9G0QkYW4zpMJ46oU-h4ghenJvCcq4X5RKPOTs460yUZjcrjxRlGGJnT7kadpeFuXhLkFdZqacSkCmtUtM8XSWFTBxydKfpNWH4R7evHyxZajZ4Dtboz8p3MCLoLYMJWCBP906yKr2maB0-iNE08Tvs3Gu0Yhe7jsoxP_-jP0')" }}></div>
              </div>
              <div className="rounded-xl overflow-hidden aspect-square">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDfgqaAEM3uCaNVc9-LoJG3ReP1Ad0-bG7TyFT9Q4j0kwcWB8AIntGbfqnw9kFFHFov4UFBd5KM1T8AvD40CCAhss_OsX6_C_oumpDgrKFU5Olg9MP451UmWq8n9LAC1yVPvBe4BgB7hO0RXmUp9vwX-t5A3iQaaW4Rc53YefPG6XblZlnoh8AFBbVQ00Ozc64EqYMVP8hovFx5RR76XB7ftla9svx6agYTr7NqZkeruRJqqOvsZHK5')" }}></div>
              </div>
              <div className="rounded-xl overflow-hidden aspect-square">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuClhVj700NtVlQNEFD1dIoo6Tsm0pAyX_qn4zWVSFDZ3CJ4Zx3xTn2B8C7smh8rXtg5km7lq-DcuvD_fJAHpaSFqk_lGSi9i5iMzr84aTCzT7KN7KtiSssbgnGZZDtSVfetNkkB4sHEC1P3qECEoBCm_qAKjZj1IRQ1s8w8ahVoHK7L_wyxwCr4tA0LJmyYX7p59V12nopUF9vB-5RraOqvXJtHr9UwufgcPXSbz6cZ4rgzyqNKzsLi')" }}></div>
              </div>
            </div>
          </div>
          
          {/* 5. Directions (6 cols) */}
          <div className="bento-card md:col-span-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <p className="font-label-caps text-label-caps text-tertiary uppercase">Location</p>
              <span className="font-data-tabular text-data-tabular text-secondary">3.2 miles away</span>
            </div>
            <div className="rounded-xl overflow-hidden w-full h-48 mb-4 border border-border-subtle relative group">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcUXPnXJkAXusSUTY_IeKJUzuHim8KvL7Ygzow9dlytTjjUllScG48VutikRfBV6KHRIRHOEIzcIzBOR_FcBFcscHPF9RWMqYL7s3ohhb9SkVm3RiyyRA54O5VUCqZgr83qVD1-K3uxVAfFG2ttITfhfeFh8h3DJWP-teNM94JajGFF90082_s_EChuxb_pRDs-jWwK4OFlqidXmTMRg-diFrPwEAuMQYqqgmNbV7d9clZA1QTWqy5" alt="Map"/>
              <div className="absolute inset-0 bg-on-surface/5 group-hover:bg-transparent transition-colors"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary drop-shadow-md">
                <span className="material-symbols-outlined text-4xl">location_on</span>
              </div>
            </div>
            <p className="font-body-md text-body-md text-on-surface mb-1">123 Healthway Drive, Medical District</p>
            <p className="font-body-md text-body-md text-secondary text-sm mb-4">Metro City, NY 10001</p>
            <button className="w-full py-2 px-4 border border-primary text-primary hover:bg-primary/5 rounded-lg font-data-tabular text-data-tabular transition-colors flex items-center justify-center gap-2 mt-auto">
              <span className="material-symbols-outlined text-sm">directions</span> Get Directions
            </button>
          </div>
          
          {/* 7. Insurance Accepted (6 cols) */}
          <div className="bento-card md:col-span-6">
            <p className="font-label-caps text-label-caps text-tertiary uppercase mb-4">Insurance Accepted</p>
            <p className="font-body-md text-body-md text-secondary text-sm mb-4">This facility accepts most major insurance networks. Co-pays may vary based on your plan.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-16 bg-surface border border-border-subtle rounded-lg flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-default">
                <span className="font-headline-md text-headline-md text-on-surface-variant font-bold">BlueCross</span>
              </div>
              <div className="h-16 bg-surface border border-border-subtle rounded-lg flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-default">
                <span className="font-headline-md text-headline-md text-on-surface-variant font-bold">Aetna</span>
              </div>
              <div className="h-16 bg-surface border border-border-subtle rounded-lg flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-default">
                <span className="font-headline-md text-headline-md text-on-surface-variant font-bold">Cigna</span>
              </div>
              <div className="h-16 bg-surface border border-border-subtle rounded-lg flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-default text-center px-2">
                <span className="font-data-tabular text-data-tabular text-on-surface-variant font-bold text-xs">PMJAY / Ayushman Bharat</span>
              </div>
            </div>
          </div>
          
          {/* 6. Expenses Breakdown (12 cols) */}
          <div className="bento-card md:col-span-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-label-caps text-label-caps text-tertiary uppercase mb-1">Cost Estimation</p>
                <h3 className="font-headline-md text-headline-md text-on-surface">Expenses Breakdown</h3>
              </div>
              <span className="bg-warning-amber/10 text-warning-amber px-3 py-1 rounded-full font-status-label text-status-label flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">info</span> Estimates Only
              </span>
            </div>
            
            <div className="space-y-6">
              {/* Room Tiers */}
              <div>
                <h4 className="font-data-tabular text-data-tabular font-bold text-on-surface mb-3 border-b border-border-subtle pb-2">Room Tiers (Per Day)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-border-subtle rounded-lg hover:border-primary/50 transition-colors cursor-pointer group">
                    <p className="font-body-md text-body-md font-medium text-on-surface group-hover:text-primary transition-colors">General Ward</p>
                    <p className="font-headline-md text-headline-md text-on-surface mt-2">$150</p>
                    <p className="font-body-md text-body-md text-secondary text-sm">Multi-bed occupancy</p>
                  </div>
                  <div className="p-4 border border-primary bg-primary/5 rounded-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-primary text-white text-xs px-2 py-1 rounded-bl-lg font-label-caps">POPULAR</div>
                    <p className="font-body-md text-body-md font-medium text-on-surface">Semi-Private</p>
                    <p className="font-headline-md text-headline-md text-primary mt-2">$300</p>
                    <p className="font-body-md text-body-md text-secondary text-sm">Twin sharing</p>
                  </div>
                  <div className="p-4 border border-border-subtle rounded-lg hover:border-primary/50 transition-colors cursor-pointer group">
                    <p className="font-body-md text-body-md font-medium text-on-surface group-hover:text-primary transition-colors">Private Suite</p>
                    <p className="font-headline-md text-headline-md text-on-surface mt-2">$500</p>
                    <p className="font-body-md text-body-md text-secondary text-sm">Single occupancy + attendee</p>
                  </div>
                </div>
              </div>
              
              {/* Itemized Consumables (Expandable) */}
              <div className="border border-border-subtle rounded-lg bg-surface">
                <input 
                  className="expand-toggle hidden" 
                  id="expand-consumables" 
                  type="checkbox"
                  checked={expandConsumables}
                  onChange={(e) => setExpandConsumables(e.target.checked)}
                />
                <label className="flex justify-between items-center p-4 cursor-pointer hover:bg-surface-container-low transition-colors rounded-lg" htmlFor="expand-consumables">
                  <span className="font-data-tabular text-data-tabular font-bold text-on-surface">Itemized Consumables &amp; Equipment</span>
                  <span className={`material-symbols-outlined expand-icon text-secondary transition-transform duration-300 ${expandConsumables ? "rotate-180" : ""}`}>expand_more</span>
                </label>
                <div className={`expand-content px-4 overflow-hidden transition-all duration-300 ease-out ${expandConsumables ? "max-h-[500px] pb-4" : "max-h-0"}`}>
                  <div className="pt-2 border-t border-border-subtle space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-body-md text-body-md text-secondary">Cannula &amp; IV Sets (approx. 5 units)</span>
                      <span className="font-data-tabular text-data-tabular text-on-surface">$45.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-body-md text-body-md text-secondary">Specific Anesthesia Injections</span>
                      <span className="font-data-tabular text-data-tabular text-on-surface">$350.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-body-md text-body-md text-secondary">Ureteral Stents (standard)</span>
                      <span className="font-data-tabular text-data-tabular text-on-surface">$450.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-body-md text-body-md text-secondary">Guide Wires &amp; Catheters</span>
                      <span className="font-data-tabular text-data-tabular text-on-surface">$120.00</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-border-subtle border-dashed">
                      <span className="font-data-tabular text-data-tabular font-medium text-on-surface">Subtotal (Consumables)</span>
                      <span className="font-data-tabular text-data-tabular font-medium text-on-surface">~$965.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sticky Summary Panel (approx 4 cols space) */}
        <div className="w-full lg:w-[360px] shrink-0">
          <div className="glass-panel rounded-xl p-6 sticky top-28 flex flex-col shadow-lg shadow-on-surface/5">
            <p className="font-label-caps text-label-caps text-tertiary uppercase mb-2">Estimated Total</p>
            <div className="flex items-end gap-2 mb-2">
              <h2 className="font-hero-display text-hero-display text-primary">$4k - $6k</h2>
            </div>
            <p className="font-body-md text-body-md text-secondary text-sm border-b border-border-subtle pb-4 mb-4">
              Final cost depends on room tier selection, exact duration of stay, and specific consumables used during surgery.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-success-emerald text-sm mt-1">check_circle</span>
                <span className="font-body-md text-body-md text-on-surface text-sm">Surgeon &amp; Anesthetist fees included</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-success-emerald text-sm mt-1">check_circle</span>
                <span className="font-body-md text-body-md text-on-surface text-sm">Standard OT charges included</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-warning-amber text-sm mt-1">warning</span>
                <span className="font-body-md text-body-md text-on-surface text-sm">Pre-op diagnostics billed separately</span>
              </div>
            </div>
            <button className="w-full bg-primary-container text-on-primary-fixed font-headline-md text-[20px] font-bold py-4 rounded-xl hover:bg-primary hover:text-white transition-all duration-200 active:scale-95 shadow-md shadow-primary-container/20">
              Book Consultation
            </button>
            <p className="text-center font-label-caps text-label-caps text-tertiary mt-4">
              No payment required to book.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
