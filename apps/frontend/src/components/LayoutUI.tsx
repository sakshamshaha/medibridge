"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, MapPin, Pill, Activity, Stethoscope, UserCircle } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 max-w-7xl mx-auto">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block text-xl text-primary tracking-tight">
              eforma
            </span>
          </Link>
        </div>
        
        {/* Search Bar */}
        <div className="flex flex-1 items-center space-x-2 sm:space-x-4">
          <div className="w-full max-w-lg relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              className="flex h-10 w-full rounded-full border border-border bg-muted/50 px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
              placeholder="Search hospitals, doctors, or medicines..."
            />
          </div>
        </div>
        
        {/* Location Switcher & User Nav */}
        <div className="flex items-center space-x-4 justify-end ml-auto">
          <div className="hidden md:flex items-center text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-200 bg-secondary px-3 py-1.5 rounded-full">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span>New Delhi, DL</span>
          </div>
          <button className="rounded-full overflow-hidden border border-border bg-muted p-1 hover:border-primary transition-colors duration-200">
            <UserCircle className="h-6 w-6 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}

export function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: "/medicines/buy", label: "Buy Medicines", icon: Pill },
    { href: "/hospitals", label: "Hospital Inquiry", icon: Activity },
    { href: "/doctors", label: "Doctor Inquiry", icon: Stethoscope },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-background pt-16 md:block">
        <div className="flex h-full flex-col overflow-y-auto px-4 py-6">
          <nav className="flex flex-1 flex-col space-y-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname?.startsWith(link.href);
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
      
      {/* Mobile Nav (Bottom) */}
      <nav className="fixed bottom-0 left-0 z-40 w-full border-t border-border bg-background/95 backdrop-blur md:hidden">
        <div className="flex justify-around p-3">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname?.startsWith(link.href);
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center justify-center space-y-1 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <main className="flex-1 md:ml-64 pt-6 px-4 md:px-8 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
