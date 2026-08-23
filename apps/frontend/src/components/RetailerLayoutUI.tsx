"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function RetailerSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: "/retailer", label: "Dashboard", icon: "dashboard" },
    { href: "/retailer/billing", label: "Billing/Scanner", icon: "barcode_scanner" },
    { href: "/retailer/stock", label: "Stock Management", icon: "inventory_2" },
    { href: "/retailer/sales", label: "AI Sales Monitor", icon: "monitoring" },
    { href: "/retailer/demand", label: "Demand Node", icon: "hub" },
    { href: "/retailer/alerts", label: "Alerts", icon: "notifications_active" },
  ];

  return (
    <div className="retailer-portal font-body-md text-body-md bg-background antialiased min-h-screen flex relative overflow-x-hidden selection:bg-primary/30 selection:text-primary">
      <style dangerouslySetInnerHTML={{ __html: `
        .retailer-portal {
          --color-background: #0f172a;
          --color-surface: rgba(15, 23, 42, 0.6);
          --color-on-surface: #f8fafc;
          --color-surface-container-low: rgba(255, 255, 255, 0.03);
          --color-surface-container-high: rgba(255, 255, 255, 0.08);
          --color-surface-container-highest: rgba(255, 255, 255, 0.1);
          --color-border-subtle: rgba(255, 255, 255, 0.1);
          --color-on-surface-variant: #94a3b8;
          --color-inverse-surface: #e2e8f0;
          --color-inverse-on-surface: #0f172a;
          --color-surface-white: rgba(15, 23, 42, 0.6);
          background-color: var(--color-background);
          color: var(--color-on-surface);
        }
        .retailer-portal .ambient-glow-teal {
            position: absolute;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(45, 212, 191, 0.08) 0%, rgba(15, 23, 42, 0) 70%);
            top: -200px;
            left: -200px;
            z-index: 0;
            pointer-events: none;
        }
        .retailer-portal .ambient-glow-purple {
            position: absolute;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(15, 23, 42, 0) 70%);
            bottom: -200px;
            right: -200px;
            z-index: 0;
            pointer-events: none;
        }
        .retailer-portal .btn-gradient {
            background: linear-gradient(135deg, #2dd4bf 0%, #8b5cf6 100%);
            color: #ffffff;
            box-shadow: 0 4px 15px rgba(45, 212, 191, 0.3);
        }
        .retailer-portal .btn-gradient:hover {
            box-shadow: 0 6px 20px rgba(45, 212, 191, 0.5);
            opacity: 0.95;
        }
      `}} />
      
      {/* Ambient Background Glows */}
      <div className="ambient-glow-teal"></div>
      <div className="ambient-glow-purple"></div>
      
      {/* SideNavBar */}
      <nav className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 border-r border-border-subtle bg-surface-white backdrop-blur-xl py-6 shadow-sm z-50">
        
        {/* Header */}
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-tertiary flex items-center justify-center text-white font-headline-md font-bold shadow-[0_0_15px_rgba(45,212,191,0.3)]">
            M
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">MediBridge</h1>
            <p className="font-label-caps text-label-caps text-on-surface-variant">Retailer Portal</p>
          </div>
        </div>
        
        {/* Main Navigation */}
        <div className="flex-1 px-4 space-y-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-200 ease-in-out active:scale-95 cursor-pointer ${
                  isActive 
                    ? "bg-gradient-to-r from-primary/20 to-transparent text-primary font-bold border-l-4 border-primary" 
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                }`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                  {link.icon}
                </span>
                <span>{link.label}</span>
              </Link>
            )
          })}
        </div>
        
        {/* CTA & Footer */}
        <div className="px-4 mt-auto space-y-4">
          <button className="w-full py-3 rounded-full btn-gradient font-bold transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer">
            <span className="material-symbols-outlined">upload_file</span>
            Upload Script
          </button>
          <div className="space-y-1">
            <Link href="/" className="flex items-center gap-3 px-4 py-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors font-label-caps text-label-caps cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span>Sign Out</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen relative z-10">
        
        {/* TopAppBar */}
        <header className="sticky top-0 z-40 h-16 w-full bg-surface-white backdrop-blur-md border-b border-border-subtle flex justify-between items-center px-gutter">
          
          {/* Mobile Brand (Hidden on MD) */}
          <div className="md:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-tertiary flex items-center justify-center text-white font-bold">M</div>
            <span className="font-headline-md text-headline-md font-bold text-on-surface">MediBridge</span>
          </div>
          
          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input className="w-full h-10 pl-11 pr-4 rounded-full border border-border-subtle bg-surface-container-low focus:outline-none focus:border-primary/50 focus:bg-surface-container-highest transition-all text-sm text-on-surface placeholder:text-on-surface-variant" placeholder="Search invoices, drugs, or patients..." type="text"/>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-4 ml-auto">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors relative cursor-pointer">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-alert-rose shadow-[0_0_8px_rgba(244,63,94,0.6)]"></span>
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors cursor-pointer">
              <span className="material-symbols-outlined">inventory</span>
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors p-1 border border-border-subtle hover:border-primary/50 cursor-pointer">
              <img className="w-full h-full rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3aszdqHOTsVjRfaoT_bQ3aXIPbkmTVMSQG8dKULY_sp-k-rRXSqYMoOF41c6smVTv02SYMLktPeRSkWuFDXTCLuctr5xt4bshE0-q03m15LEsTg5fauNbO8CfT3SvOpAcExcMx8cSq9gSgFDMcBR_sE_bq2QesMOI9Bd5grUgLQmlzaMikvWoZRmFXJR6fBTtJ7jBdxDL4epkzzT5A6OnpKHO5azZOclF1Uh4_Qu9aPhSXUAU0tLr" alt="Profile" />
            </button>
          </div>
        </header>

        {/* Children (Dashboard / other pages) */}
        <main className="flex-1 p-margin-mobile md:p-margin-desktop max-w-[1440px] mx-auto w-full animate-in fade-in duration-500">
          {children}
        </main>
      </div>
    </div>
  );
}
