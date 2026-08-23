"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function CustomerTopNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b backdrop-blur-xl ${
      scrolled 
        ? "bg-surface/95 dark:bg-inverse-surface/95 shadow-md border-border-subtle dark:border-outline-variant" 
        : "bg-surface/80 dark:bg-inverse-surface/80 border-border-subtle dark:border-outline-variant"
    }`} id="main-nav">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 max-w-7xl mx-auto">
        
        {/* Brand & Search */}
        <div className="flex items-center gap-6">
          <Link href="/" className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim tracking-tight">
            MediBridge
          </Link>
          <div className="hidden md:flex items-center pill-search px-4 py-2 w-72 border border-border-subtle rounded-full bg-surface-white/90 backdrop-blur-md">
            <span className="material-symbols-outlined text-tertiary mr-2 text-xl">search</span>
            <input 
              className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-body-md font-body-md text-on-surface p-0" 
              placeholder="Search..." 
              type="text" 
              defaultValue="Kidney Stones" 
            />
          </div>
        </div>
        
        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8 items-center h-full">
          <li className="h-full flex items-center">
            <Link 
              href="/hospitals" 
              className={`h-full flex items-center font-body-md text-body-md transition-colors ${
                pathname?.startsWith("/hospitals") 
                  ? "text-primary dark:text-primary-fixed-dim font-bold border-b-2 border-primary" 
                  : "text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim"
              }`}
            >
              Hospitals
            </Link>
          </li>
          <li className="h-full flex items-center">
            <Link 
              href="/doctors" 
              className={`h-full flex items-center font-body-md text-body-md transition-colors ${
                pathname?.startsWith("/doctors") 
                  ? "text-primary dark:text-primary-fixed-dim font-bold border-b-2 border-primary" 
                  : "text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim"
              }`}
            >
              Doctors
            </Link>
          </li>
          <li className="h-full flex items-center">
            <Link 
              href="/pharmacy" 
              className={`h-full flex items-center font-body-md text-body-md transition-colors ${
                pathname?.startsWith("/pharmacy") 
                  ? "text-primary dark:text-primary-fixed-dim font-bold border-b-2 border-primary" 
                  : "text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim"
              }`}
            >
              Pharmacy
            </Link>
          </li>
          <li className="h-full flex items-center">
            <Link 
              href="/pharmacy/checkout" 
              className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-colors font-body-md text-body-md"
            >
              Orders
            </Link>
          </li>
        </ul>
        
        {/* Trailing Actions */}
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container">
            <span className="material-symbols-outlined">location_on</span>
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <Link href="/retailer/stock" className="hidden lg:flex bg-primary-container text-on-primary-container px-4 py-2 rounded font-body-md text-body-md font-medium hover:opacity-90 transition-opacity">
            Switch Portal
          </Link>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-border-subtle cursor-pointer hover:border-primary transition-colors">
            <img 
              alt="User Profile Avatar" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBI-MdbhkqoQH5Coy9EUO-kv4D2iqL98ucgyJ3ZyFByGvdSiHBwAMdivLtYSRpRt0xQwGHlM_eEWOhDnRF7z62rIXWxbd4qlo2nqgoI_C4Rlk6S5-y_PJ_i9uAQqc-fRna1t_tv2RwtOExc17k_Wcp4LEhbQUGy9KO5xisoFgyZo78Xs93kkRZVimwqp4w4pS-cq2BugAhrphzbZlKK-SfeU61pxIHgrJYmGWM0XR6PfnVzzhVHIgLk"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
