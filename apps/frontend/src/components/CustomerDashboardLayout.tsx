"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: "/customer", label: "Dashboard", icon: "dashboard" },
    { href: "/customer/prescriptions", label: "Prescriptions", icon: "description" },
    { href: "/pharmacy/checkout", label: "My Orders", icon: "inventory_2" },
    { href: "/customer/records", label: "Health Records", icon: "folder_shared" },
    { href: "/customer/settings", label: "Settings", icon: "settings" },
  ];

  return (
    <div className="customer-portal font-body-md bg-[#0a0f1c] text-white antialiased min-h-screen flex h-screen overflow-hidden relative selection:bg-teal-500/30 selection:text-teal-400">
      <style dangerouslySetInnerHTML={{ __html: `
        .customer-portal {
          --color-primary: #0d9488;
          --color-primary-variant: #14b8a6;
        }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .material-symbols-outlined.filled {
          font-variation-settings: 'FILL' 1;
        }
      `}} />
      
      {/* SideNavBar Component */}
      <nav className="hidden md:flex flex-col h-full py-6 px-4 gap-4 bg-[#111827]/80 backdrop-blur-lg shadow-md docked left w-64 border-r border-white/10 z-40 relative">
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400">
            <span className="material-symbols-outlined filled">health_and_safety</span>
          </div>
          <div>
            <Link href="/" className="font-headline-md text-headline-md font-extrabold text-white cursor-pointer hover:opacity-80">MediBridge</Link>
            <p className="font-label-caps text-[10px] text-gray-400 uppercase tracking-wider">Customer Portal</p>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col gap-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                  isActive 
                    ? "text-teal-400 font-bold border-l-4 border-teal-500 bg-teal-500/10" 
                    : "text-gray-300 hover:bg-white/5"
                } ${link.href === "/customer/settings" ? "mt-auto" : ""}`}
              >
                <span className={`material-symbols-outlined ${isActive ? 'filled' : ''}`}>{link.icon}</span>
                <span className="font-body-md text-[14px]">{link.label}</span>
              </Link>
            )
          })}
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/10">
          <button className="w-full flex items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-body-md py-3 rounded-lg transition-colors mb-4 cursor-pointer text-[14px] font-medium">
            <span className="material-symbols-outlined text-[18px]">emergency</span>
            Emergency Support
          </button>
          <Link href="/customer/help" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 transition-all cursor-pointer text-[14px]">
            <span className="material-symbols-outlined text-[18px]">help</span>
            <span className="font-body-md">Help Center</span>
          </Link>
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 transition-all cursor-pointer text-[14px]">
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span className="font-body-md">Sign Out</span>
          </Link>
        </div>
      </nav>
      
      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto relative">
        {/* Abstract Background Element */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-teal-500/10 blur-[100px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[100px]"></div>
        </div>
        
        <div className="max-w-[1440px] mx-auto p-4 md:p-8 relative z-10 min-h-full">
          {/* Mobile Top Bar */}
          <div className="md:hidden flex justify-between items-center bg-[#111827]/80 backdrop-blur-xl p-4 rounded-xl shadow-sm border border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400">
                <span className="material-symbols-outlined filled text-[20px]">health_and_safety</span>
              </div>
              <h1 className="font-headline-md text-[20px] font-bold text-white">MediBridge</h1>
            </div>
            <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10 cursor-pointer overflow-hidden hover:border-teal-400 transition-colors">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8bfvPbtnSLXqUE7yf05uXYJnyM_kzVmyvflzdVRVhDZ8JGkyRh9u3v5FSEKXc_l0IQiPxnp5iTE7YiSaQ4c4VwwubIaNsNiWtEybDaQ_azdELSjM7nf46VElmggK63hXZYbxzVaF1IoxxtqWKGMDUh7pBpJluyzWdzSh6WYg0CUYj1f9pKdbQba3DMANWTcf6ydS7s3rr2f75Nw2ULdOLqbHulUmMGunxXM2NkPbEEF9BuR1Y7Mmr" alt="Profile" />
            </button>
          </div>
          
          {children}
          
        </div>
      </main>
      
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#111827]/90 backdrop-blur-lg border-t border-white/10 z-50 px-4 py-2 flex justify-between items-center pb-safe">
        <Link href="/customer" className={`flex flex-col items-center p-2 transition-colors ${pathname === "/customer" ? "text-teal-400" : "text-gray-400 hover:text-teal-400"}`}>
          <span className="material-symbols-outlined filled">dashboard</span>
          <span className="font-label-caps text-[10px] mt-1">Home</span>
        </Link>
        <Link href="/hospitals" className="flex flex-col items-center p-2 text-gray-400 hover:text-teal-400 transition-colors">
          <span className="material-symbols-outlined">search</span>
          <span className="font-label-caps text-[10px] mt-1">Search</span>
        </Link>
        <Link href="/pharmacy/checkout" className="flex flex-col items-center p-2 text-gray-400 hover:text-teal-400 transition-colors">
          <span className="material-symbols-outlined">description</span>
          <span className="font-label-caps text-[10px] mt-1">Orders</span>
        </Link>
        <Link href="/customer/settings" className="flex flex-col items-center p-2 text-gray-400 hover:text-teal-400 transition-colors">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-caps text-[10px] mt-1">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
