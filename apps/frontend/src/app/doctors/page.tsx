"use client";

import React from "react";
import { CustomerTopNav } from "../../components/CustomerLayoutUI";
import Link from "next/link";
import { Search, MapPin, Star, Award, Clock, Loader2 } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "../../lib/api";

export default function DoctorInquiryPage() {
  const { data: dbDoctors, error, isLoading } = useSWR('/doctors', fetcher);

  // Map backend data to UI format, providing defaults for fields not yet in the DB
  const doctors = dbDoctors?.map((doc: any) => ({
    id: doc.id,
    name: doc.name,
    specialty: doc.specialty || "Specialist",
    qualifications: doc.qualifications,
    experience: `${doc.experienceYears}+ Years`,
    rating: 4.5 + Math.random() * 0.5, // Dummy rating for now
    reviews: Math.floor(Math.random() * 200) + 10, // Dummy reviews
    location: doc.hospitals && doc.hospitals.length > 0 ? doc.hospitals[0].hospital.name : "Multiple Locations",
    distance: `${(Math.random() * 10).toFixed(1)} km`,
    image: doc.photo || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop",
    procedures: ["Consultation"],
    availability: "Available Today"
  })) || [];

  return (
    <div className="flex flex-col min-h-screen">
      <CustomerTopNav />

      {/* Main Content */}
      <main className="pt-[104px] pb-24 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto w-full flex-grow animate-in fade-in duration-500">
        
        {/* Search Hero */}
        <section className="mb-12 flex flex-col items-center justify-center pt-8 pb-4 relative">
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-[48px] text-on-surface mb-4 text-center tracking-tight font-bold">
            Find the Right Doctor
          </h1>
          <p className="font-body-lg text-secondary text-center mb-8 max-w-2xl">
            Search for top-rated specialists, view their experience, and book consultations directly.
          </p>
          
          {/* Prominent Search Bar (Glassmorphic) */}
          <div className="w-full max-w-4xl relative mb-8 z-10 flex flex-col md:flex-row gap-2">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="w-6 h-6 text-tertiary" />
              </div>
              <input
                className="w-full bg-surface-container-lowest border border-border-subtle rounded-full md:rounded-r-none py-4 pl-16 pr-6 font-body-lg text-body-lg text-on-surface shadow-sm focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container transition-all placeholder:text-secondary"
                placeholder="Doctor name, specialty..."
                type="text"
                defaultValue="Urologist"
              />
            </div>
            <div className="relative md:w-64">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <MapPin className="w-5 h-5 text-tertiary" />
              </div>
              <input
                className="w-full bg-surface-container-lowest border border-border-subtle rounded-full md:rounded-l-none md:border-l-0 py-4 pl-14 pr-6 font-body-lg text-body-lg text-on-surface shadow-sm focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container transition-all placeholder:text-secondary"
                placeholder="Location"
                type="text"
                defaultValue="New Delhi"
              />
            </div>
            <button className="bg-primary text-surface-white font-label-caps text-label-caps px-8 py-4 rounded-full hover:bg-surface-tint transition-colors cursor-pointer shadow-sm w-full md:w-auto mt-2 md:mt-0">
              Search
            </button>
          </div>
        </section>

        {/* Filters & Results */}
        <div className="flex flex-col lg:flex-row gap-bento-gap">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="glass-panel p-6 rounded-xl sticky top-[120px]">
              <h2 className="font-label-caps text-label-caps text-secondary uppercase tracking-wider mb-6 flex items-center">
                <span className="material-symbols-outlined text-[18px] mr-2">filter_list</span>
                Filters
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-body-md font-bold mb-3 text-on-surface">Experience</h3>
                  <div className="space-y-2">
                    {["5+ Years", "10+ Years", "15+ Years"].map((exp) => (
                      <label key={exp} className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" className="rounded border-border-subtle text-primary focus:ring-primary/20 accent-primary" />
                        <span className="text-sm text-on-surface-variant group-hover:text-primary transition-colors">{exp}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-body-md font-bold mb-3 text-on-surface">Gender</h3>
                  <div className="space-y-2">
                    {["Male", "Female", "Any"].map((gender) => (
                      <label key={gender} className="flex items-center gap-2 cursor-pointer group">
                        <input type="radio" name="gender" className="border-border-subtle text-primary focus:ring-primary/20 accent-primary" />
                        <span className="text-sm text-on-surface-variant group-hover:text-primary transition-colors">{gender}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Results List */}
          <div className="flex-1 space-y-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                {isLoading ? "Searching..." : `${doctors.length} Specialists Found`}
              </h2>
              <select className="bg-surface-container-lowest border border-border-subtle rounded-md px-3 py-1.5 text-sm font-body-md focus:outline-none focus:border-primary">
                <option>Sort by: Relevance</option>
                <option>Sort by: Rating</option>
                <option>Sort by: Experience</option>
              </select>
            </div>

            {isLoading && (
              <div className="flex justify-center items-center py-20 text-secondary">
                <Loader2 className="w-8 h-8 animate-spin mr-2" />
                <span className="font-body-lg">Loading specialists...</span>
              </div>
            )}

            {error && (
              <div className="bento-card p-6 text-center text-error">
                <p>Failed to load doctors. Please try again later.</p>
              </div>
            )}

            {!isLoading && !error && doctors.length === 0 && (
              <div className="bento-card p-6 text-center text-secondary">
                <p>No specialists found.</p>
              </div>
            )}

            {!isLoading && !error && doctors.map((doc: any, idx: number) => (
              <div key={doc.id} className="bento-card p-6 flex flex-col md:flex-row gap-6 items-start bento-hover animate-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: `${idx * 100}ms` }}>
                
                {/* Image */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shrink-0 border border-border-subtle">
                  <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                </div>
                
                {/* Details */}
                <div className="flex-1 w-full">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                    <div>
                      <h3 className="font-headline-lg-mobile text-[24px] font-bold text-on-surface mb-1 hover:text-primary transition-colors">
                        <Link href={`/doctors/${doc.id}`}>{doc.name}</Link>
                      </h3>
                      <p className="font-body-md text-primary font-medium">{doc.specialty}</p>
                      <p className="font-body-md text-sm text-secondary mt-1">{doc.qualifications}</p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1 bg-surface-bright px-3 py-1.5 rounded border border-border-subtle">
                        <Star className="w-4 h-4 text-warning-amber fill-warning-amber" />
                        <span className="font-data-tabular font-bold">{doc.rating}</span>
                        <span className="text-xs text-tertiary">({doc.reviews})</span>
                      </div>
                      <span className="text-xs font-label-caps uppercase tracking-wider text-success-emerald bg-success-emerald/10 px-2 py-1 rounded">
                        {doc.availability}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 border-y border-border-subtle py-4">
                    <div>
                      <span className="flex items-center text-xs text-tertiary uppercase tracking-wider mb-1"><Award className="w-3 h-3 mr-1" /> Experience</span>
                      <span className="font-data-tabular font-bold text-on-surface">{doc.experience}</span>
                    </div>
                    <div>
                      <span className="flex items-center text-xs text-tertiary uppercase tracking-wider mb-1"><MapPin className="w-3 h-3 mr-1" /> Location</span>
                      <span className="font-data-tabular text-sm text-on-surface truncate">{doc.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex gap-2 flex-wrap w-full sm:w-auto">
                      {doc.procedures.map((p: string) => (
                        <span key={p} className="px-2.5 py-1 bg-surface-container text-on-surface-variant font-status-label text-[11px] rounded uppercase tracking-wider">
                          {p}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Link href={`/doctors/${doc.id}`} className="flex-1 sm:flex-none border border-primary text-primary px-6 py-2 rounded-lg font-label-caps uppercase tracking-wider text-[12px] hover:bg-primary/5 transition-colors text-center cursor-pointer">
                        View Profile
                      </Link>
                      <button className="flex-1 sm:flex-none bg-primary text-surface-white px-6 py-2 rounded-lg font-label-caps uppercase tracking-wider text-[12px] hover:bg-surface-tint transition-colors shadow-sm cursor-pointer">
                        Book Consult
                      </button>
                    </div>
                  </div>
                </div>
                
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
