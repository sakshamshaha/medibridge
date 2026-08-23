"use client";

import React from "react";
import { CustomerTopNav } from "../../../components/CustomerLayoutUI";
import Link from "next/link";
import { Home, CreditCard, Lock, Plus, Minus } from "lucide-react";

export default function PharmacyCheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col font-body-md text-body-md selection:bg-primary-container selection:text-on-primary-container bg-background">
      <CustomerTopNav />

      {/* Main Content */}
      <main className="flex-grow pt-28 pb-12 px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto w-full animate-in fade-in duration-500">
        <div className="mb-8">
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">Checkout</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Review your items and complete your purchase securely.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-bento-gap">
          {/* Left Column: Main Content (Spans 8 columns on large screens) */}
          <div className="lg:col-span-8 space-y-bento-gap">
            
            {/* Review Your Cart Card */}
            <section className="bento-card bg-surface-white">
              <h2 className="font-label-caps text-label-caps text-tertiary mb-6 uppercase tracking-wider">Review Your Cart</h2>
              <div className="space-y-6">
                
                {/* Item 1 */}
                <div className="flex flex-col sm:flex-row gap-6 pb-6 border-b border-border-subtle">
                  <div className="w-24 h-24 bg-surface-container-low rounded-lg overflow-hidden flex-shrink-0 border border-border-subtle relative group">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZvYgZ1dOOWIIDf8RbPSvSgwwnF5V4MUfFxGT-U0Il4CPBShqSBu0WJ-KpKMF2ljUkYFzBPxuyGf3cn8ls_uhkT_D2ZmiCPhsoeIV0VMliaGMOUqA9rw3OaoWMT14Fc6Ufg6Vweq8n4fncPEISpgcgkF3vw9HQ5f5Pu0GTUBo4t9_vK95shJmLMGimN1IMUXiVS_q2R_ZbyUwIrSWYkqQh2fsnERfYbKw9hFvVNq9HrCgE0EY8YABO" alt="Ventolin HFA" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-data-tabular text-data-tabular font-semibold text-on-surface text-lg">Ventolin HFA</h3>
                        <p className="text-sm text-on-surface-variant">Albuterol Sulfate Inhalation Aerosol</p>
                      </div>
                      <span className="font-data-tabular text-data-tabular font-bold text-on-surface text-lg">$45.00</span>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-border-subtle rounded-full bg-surface-container-lowest h-8">
                          <button aria-label="Decrease quantity" className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low rounded-l-full transition-colors cursor-pointer">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-data-tabular text-data-tabular w-8 text-center flex items-center justify-center h-full">1</span>
                          <button aria-label="Increase quantity" className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low rounded-r-full transition-colors cursor-pointer">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button className="text-sm text-alert-rose hover:underline opacity-80 hover:opacity-100 transition-opacity cursor-pointer">Remove</button>
                      </div>
                      <div className="bg-success-emerald/10 text-success-emerald px-3 py-1 rounded-full flex items-center gap-1 border border-success-emerald/20">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        <span className="font-status-label text-status-label">No Rx Needed</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-24 h-24 bg-surface-container-low rounded-lg overflow-hidden flex-shrink-0 border border-border-subtle relative group">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvopQQKaMLAa7VIVrkVKdOqHf59vmWiDVXyCp0l-z3SjJe5gfOXw4Sf2U5Dp_tBavYU3cXJQCtZBhdC5lu6knOHXUBdZ5IYeTCm9zS2wtQ_4wpQf12WQ37LepSMh8JZCeU1_wUjf-sEgTBubShVKyQ0yy0cSv2AX3UVDDnJwZeiowQLXsSkeV59-GsTYsZDEbLW0Lgw8nyzFnTdVhAjh9k0Z_dI1_rJeQoYU1v_F1jCCFv-l4Oknk7" alt="Lisinopril 10mg" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-data-tabular text-data-tabular font-semibold text-on-surface text-lg">Lisinopril 10mg</h3>
                          <span className="bg-alert-rose/10 text-alert-rose px-2 py-0.5 rounded text-xs font-bold border border-alert-rose/20">Rx Required</span>
                        </div>
                        <p className="text-sm text-on-surface-variant">30 Tablets, Daily Dose</p>
                      </div>
                      <span className="font-data-tabular text-data-tabular font-bold text-on-surface text-lg">$12.50</span>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-border-subtle rounded-full bg-surface-container-lowest h-8">
                          <button aria-label="Decrease quantity" className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low rounded-l-full transition-colors cursor-pointer">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-data-tabular text-data-tabular w-8 text-center flex items-center justify-center h-full">1</span>
                          <button aria-label="Increase quantity" className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low rounded-r-full transition-colors cursor-pointer">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button className="text-sm text-alert-rose hover:underline opacity-80 hover:opacity-100 transition-opacity cursor-pointer">Remove</button>
                      </div>
                      
                      {/* Prescription Status Alert */}
                      <div className="bg-warning-amber/10 border border-warning-amber/30 text-warning-amber px-3 py-1.5 rounded-lg flex items-center gap-2 max-w-[200px]">
                        <span className="material-symbols-outlined text-[16px]">upload_file</span>
                        <div className="flex flex-col">
                          <span className="font-status-label text-status-label leading-tight">Upload Required</span>
                          <a className="text-[10px] underline hover:text-warning-amber/80 cursor-pointer" href="#">Add Prescription</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </section>

            {/* Delivery Address Card */}
            <section className="bento-card bg-surface-white">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-label-caps text-label-caps text-tertiary uppercase tracking-wider">Delivery Details</h2>
                <button className="text-sm font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer">
                  <span className="material-symbols-outlined text-sm">edit</span> Change
                </button>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg bg-surface-container-low border border-border-subtle">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-data-tabular text-data-tabular font-semibold text-on-surface">Home</h3>
                  <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                    Jane Doe<br/>
                    1234 Silicon Valley Blvd, Apt 4B<br/>
                    San Jose, CA 95131
                  </p>
                  <p className="text-sm text-on-surface-variant mt-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">local_shipping</span> Expected delivery: Tomorrow, 2PM - 5PM
                  </p>
                </div>
              </div>
            </section>
            
          </div>

          {/* Right Column: Sidebar (Spans 4 columns on large screens) */}
          <div className="lg:col-span-4 space-y-bento-gap">
            {/* Order Summary Card */}
            <section className="bento-card sticky top-28 bg-surface-white shadow-sm">
              <h2 className="font-label-caps text-label-caps text-tertiary mb-6 uppercase tracking-wider">Order Summary</h2>
              <div className="space-y-3 mb-6 font-data-tabular text-data-tabular text-sm">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal (2 items)</span>
                  <span>$57.50</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Delivery Fee</span>
                  <span>$4.99</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Estimated Taxes</span>
                  <span>$4.89</span>
                </div>
                <div className="pt-3 border-t border-border-subtle flex justify-between items-center mt-3">
                  <span className="font-semibold text-on-surface text-base">Estimated Total</span>
                  <span className="font-bold text-on-surface text-xl">$67.38</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="font-label-caps text-label-caps text-tertiary mb-3 uppercase tracking-wider">Payment Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 border border-primary bg-primary/5 rounded-lg cursor-pointer transition-colors hover:bg-primary/10">
                    <div className="flex items-center gap-3">
                      <input defaultChecked className="text-primary focus:ring-primary h-4 w-4 border-outline-variant accent-primary" name="payment" type="radio"/>
                      <span className="flex items-center gap-2 text-sm font-medium text-on-surface">
                        <CreditCard className="w-4 h-4 text-primary" />
                        •••• 4242
                      </span>
                    </div>
                    <img alt="Mastercard" className="h-4 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfOVSdjEE8hGTjf-BhDZVii1LtULGQmXsObz6oN5AlcyINvYcR8HkDBKq4sMp7qs8BALEx5APMv4ZXpXSGGX5uyK2EBThPa28ESRh7ldpexPiLbgZRgKPp5hS_O21rwkgNJbZ9dXTu_g4y2uZxqFzPiulRQ8s-QpTKmqaYaN7nBl9a53_oenrAB_qLLvhElM7KDN377pGGZ4K-unl3A_wZtiNYIdvFnqaCARknbuByb2-VZpJc6ap_"/>
                  </label>
                  
                  <label className="flex items-center justify-between p-3 border border-border-subtle rounded-lg cursor-pointer transition-colors hover:bg-surface-container-low">
                    <div className="flex items-center gap-3">
                      <input className="text-primary focus:ring-primary h-4 w-4 border-outline-variant accent-primary" name="payment" type="radio"/>
                      <span className="flex items-center gap-2 text-sm font-medium text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                        Digital Wallet
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <button className="bg-primary text-white w-full py-4 text-lg rounded-full font-bold shadow-sm hover:bg-surface-tint transition-colors flex items-center justify-center gap-2 cursor-pointer group">
                Secure Checkout
                <Lock className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-center text-xs text-on-surface-variant mt-4 opacity-80">
                By placing this order, you agree to our <a className="underline cursor-pointer" href="#">Terms of Service</a> and <a className="underline cursor-pointer" href="#">Privacy Policy</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
