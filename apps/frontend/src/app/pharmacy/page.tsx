"use client";

import React, { useState } from "react";
import { CustomerTopNav } from "../../components/CustomerLayoutUI";
import Link from "next/link";
import { Search, Loader2 } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "../../lib/api";

export default function PharmacyPage() {
  const [priceRange, setPriceRange] = useState(500);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All Medicines']);
  const [rxRequiredFilter, setRxRequiredFilter] = useState(false);
  const [otcFilter, setOtcFilter] = useState(false);
  
  const params = new URLSearchParams();
  if (searchQuery) params.append('q', searchQuery);
  if (!selectedCategories.includes('All Medicines') && selectedCategories.length > 0) {
    params.append('categories', selectedCategories.join(','));
  }
  if (rxRequiredFilter && !otcFilter) params.append('rx', 'true');
  if (otcFilter && !rxRequiredFilter) params.append('rx', 'false');
  if (priceRange < 500) params.append('maxPrice', priceRange.toString());
  
  const endpoint = `/medicines?${params.toString()}`;

  const { data: products, error, isLoading } = useSWR(endpoint, fetcher);

  return (
    <div className="font-body-md text-body-md text-on-surface antialiased bg-background flex flex-col min-h-screen">
      <CustomerTopNav />

      {/* Main Content */}
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-8 pt-28 flex gap-gutter">
        
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-28 bento-card p-6 h-[calc(100vh-140px)] overflow-y-auto">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Filters</h2>
            
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-label-caps text-label-caps text-tertiary mb-3 uppercase">Categories</h3>
                <div className="space-y-2">
                  {['All Medicines', 'Respiratory', 'Cardiac Care', 'Diabetes', 'Pain Relief'].map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        className="h-4 w-4 text-primary-container border-border-subtle rounded focus:ring-primary-container accent-primary-container" 
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => {
                          if (cat === 'All Medicines') {
                            setSelectedCategories(['All Medicines']);
                          } else {
                            const newCats = selectedCategories.filter(c => c !== 'All Medicines');
                            if (newCats.includes(cat)) {
                              const filtered = newCats.filter(c => c !== cat);
                              setSelectedCategories(filtered.length === 0 ? ['All Medicines'] : filtered);
                            } else {
                              setSelectedCategories([...newCats, cat]);
                            }
                          }
                        }}
                      />
                      <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <hr className="border-border-subtle"/>
              
              {/* Prescription */}
              <div>
                <h3 className="font-label-caps text-label-caps text-tertiary mb-3 uppercase">Prescription</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      className="h-4 w-4 text-primary-container border-border-subtle rounded focus:ring-primary-container accent-primary-container" 
                      type="checkbox"
                      checked={rxRequiredFilter}
                      onChange={(e) => setRxRequiredFilter(e.target.checked)}
                    />
                    <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Required (Rx)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      className="h-4 w-4 text-primary-container border-border-subtle rounded focus:ring-primary-container accent-primary-container" 
                      type="checkbox"
                      checked={otcFilter}
                      onChange={(e) => setOtcFilter(e.target.checked)}
                    />
                    <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Over-the-Counter (OTC)</span>
                  </label>
                </div>
              </div>
              
              <hr className="border-border-subtle"/>
              
              {/* Price Range */}
              <div>
                <h3 className="font-label-caps text-label-caps text-tertiary mb-3 uppercase">Price Range</h3>
                <input 
                  className="w-full h-1 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary-container" 
                  max="500" min="0" type="range" 
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                />
                <div className="flex justify-between mt-2 font-data-tabular text-data-tabular text-tertiary">
                  <span>$0</span>
                  <span>${priceRange}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface">Pharmacy Catalog</h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                Showing {products?.length || 0} results for "All Medicines"
              </p>
            </div>
            
            {/* Search (Mobile) & Sort */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="md:hidden flex-grow relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" />
                <input 
                  className="w-full pl-10 pr-4 py-2 border border-border-subtle rounded-lg focus:outline-none focus:border-primary" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Desktop Search */}
              <div className="hidden md:block relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" />
                <input 
                  className="w-64 pl-10 pr-4 py-2 border border-border-subtle rounded-lg focus:outline-none focus:border-primary" 
                  placeholder="Search medicines..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <span className="font-body-md text-body-md text-tertiary hidden sm:inline">Sort by:</span>
                <select className="bg-surface-white border border-border-subtle rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container shrink-0">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>A-Z</option>
                </select>
              </div>
            </div>
          </div>
          
          {isLoading && (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {error && (
            <div className="text-center py-10 text-alert-rose">
              Failed to load medicines.
            </div>
          )}
          
          {/* Bento Grid for Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-bento-gap">
            {!isLoading && !error && (products || []).map((product: any) => (
              <div key={product.id} className="bento-card p-0 flex flex-col overflow-hidden relative group bg-surface-white">
                
                {/* Prescription Badge */}
                {product.rxRequired ? (
                  <div className="absolute top-3 right-3 bg-alert-rose/10 text-alert-rose font-status-label text-status-label px-2.5 py-1 rounded-full border border-alert-rose/20 z-10 flex items-center gap-1 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-[14px]">prescriptions</span> Rx Required
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 bg-success-emerald/10 text-success-emerald font-status-label text-status-label px-2.5 py-1 rounded-full border border-success-emerald/20 z-10 flex items-center gap-1 backdrop-blur-sm">
                    OTC
                  </div>
                )}
                
                <Link href={`/pharmacy/${product.id}`} className="h-48 bg-surface-container-low relative flex items-center justify-center p-4 cursor-pointer block">
                  <img alt={product.name} className="h-full object-contain transition-transform duration-300 group-hover:scale-105" src={product.image}/>
                </Link>
                
                <div className="p-5 flex flex-col flex-grow">
                  <div className="font-label-caps text-label-caps text-tertiary mb-1 uppercase tracking-wider">{product.category}</div>
                  <h3 className="font-headline-md text-[20px] leading-tight text-on-surface mb-2 font-semibold">
                    <Link href={`/pharmacy/${product.id}`} className="hover:text-primary transition-colors">{product.name}</Link>
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant line-clamp-2 mb-4">{product.desc}</p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className="font-data-tabular text-headline-md font-bold text-primary-container">${product.price.toFixed(2)}</div>
                    <button className="bg-primary-container hover:bg-primary-fixed text-white w-10 h-10 rounded-lg flex items-center justify-center transition-colors shadow-sm cursor-pointer">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Load More */}
          <div className="mt-8 flex justify-center">
            <button className="px-6 py-2.5 bg-surface-white border border-border-subtle text-on-surface font-body-md text-body-md rounded-lg hover:bg-surface-container transition-colors shadow-sm flex items-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">refresh</span> Load More Products
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
