"use client";

import { CustomerTopNav } from "../../../components/CustomerLayoutUI";
import React from "react";

export default function DoctorProfilePage({ params }: { params: { doctorId: string } }) {
  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col antialiased">
      <CustomerTopNav />
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-8 pt-[104px] grid grid-cols-1 md:grid-cols-12 gap-bento-gap relative animate-in fade-in duration-500">
        
        {/* Left Content Area (8 Columns) */}
        <div className="md:col-span-8 flex flex-col gap-bento-gap">
          
          {/* Hero Profile Card */}
          <section className="bento-card flex flex-col md:flex-row gap-8 items-start relative overflow-hidden bg-surface-white">
            {/* Subtle background accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-xl overflow-hidden shrink-0 border border-border-subtle shadow-sm relative group bg-surface-container">
              <img 
                alt="Dr. Marcus Chen" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbAGafWljyB6nY2c8_xThd8yr6y6b2dfjyvzuTTm1QHGhi4JWce2B3Fy8ezLVP9jBG-pjp3-APzL6UlRp5zAEC4AAX0-0GvOEUBu38zy7tGteC8-vHhGwx08gccSEb56T3X9O-klvEW-fb8L62KuGBfFzHi3Elr0xtQVt4bKPL__CyAX06Wyooo-ZMsJUX2bPzUQVHQtQw5hRtmTUEy549SdexcfkLXOiB-6-LMRtM1H9VQMhhCV11"
              />
              <div className="absolute bottom-2 right-2 bg-success-emerald/10 backdrop-blur-md rounded-full px-2 py-1 flex items-center gap-1 border border-success-emerald/20">
                <span className="material-symbols-outlined text-[14px] text-success-emerald" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
            </div>
            
            <div className="flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-1">Dr. Marcus Chen</h1>
                  <p className="font-body-lg text-body-lg text-tertiary">Interventional Cardiologist</p>
                </div>
                <div className="flex items-center gap-1 bg-surface-container rounded-lg px-3 py-1.5 border border-border-subtle">
                  <span className="material-symbols-outlined text-warning-amber" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-status-label text-status-label text-on-surface">4.9</span>
                  <span className="text-secondary text-sm">(120+)</span>
                </div>
              </div>
              
              <p className="font-data-tabular text-data-tabular text-on-surface-variant mb-4">MBBS, MD Cardiology, FACC</p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                  </div>
                  <span className="font-data-tabular text-data-tabular text-on-surface">15+ Years</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                  </div>
                  <span className="font-data-tabular text-data-tabular text-on-surface">500+ Procedures</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[18px]">local_hospital</span>
                  </div>
                  <span className="font-data-tabular text-data-tabular text-on-surface">Memorial Health Center</span>
                </div>
              </div>
            </div>
          </section>
          
          {/* Bento Grid - 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-bento-gap">
            
            {/* About Section */}
            <section className="bento-card md:col-span-2 bg-surface-white">
              <h2 className="font-label-caps text-label-caps text-tertiary mb-4 uppercase tracking-wider">About</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                Dr. Marcus Chen is a board-certified Interventional Cardiologist with over 15 years of experience in diagnosing and treating complex cardiovascular conditions. He specializes in minimally invasive structural heart procedures and is dedicated to providing patient-centered care utilizing the latest advancements in cardiac technology.
              </p>
              <h3 className="font-status-label text-status-label text-on-surface mb-3">Areas of Expertise</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-surface-container-low border border-border-subtle rounded-full px-4 py-1.5 font-data-tabular text-data-tabular text-on-surface-variant">Angioplasty</span>
                <span className="bg-surface-container-low border border-border-subtle rounded-full px-4 py-1.5 font-data-tabular text-data-tabular text-on-surface-variant">Echocardiogram</span>
                <span className="bg-surface-container-low border border-border-subtle rounded-full px-4 py-1.5 font-data-tabular text-data-tabular text-on-surface-variant">Heart Valve Repair</span>
                <span className="bg-surface-container-low border border-border-subtle rounded-full px-4 py-1.5 font-data-tabular text-data-tabular text-on-surface-variant">Cardiac Catheterization</span>
              </div>
            </section>
            
            {/* Practice Locations */}
            <section className="bento-card flex flex-col h-full bg-surface-white">
              <h2 className="font-label-caps text-label-caps text-tertiary mb-4 uppercase tracking-wider">Practice Locations</h2>
              <div className="space-y-4 flex-1">
                <div className="p-4 rounded-lg bg-surface-container-lowest border border-border-subtle hover:border-primary-container transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-body-md text-body-md font-semibold text-on-surface">Memorial Health Center</h3>
                    <span className="bg-primary-container/10 text-primary font-label-caps text-[10px] px-2 py-0.5 rounded-full">PRIMARY</span>
                  </div>
                  <p className="font-data-tabular text-data-tabular text-on-surface-variant mb-3 flex items-start gap-1">
                    <span className="material-symbols-outlined text-[16px] text-tertiary mt-0.5">location_on</span>
                    1200 Healthcare Blvd, Suite 400<br/>Metropolis, NY 10001
                  </p>
                  <a className="inline-flex items-center gap-1 text-primary font-status-label text-status-label hover:underline" href="#">
                    Get Directions <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>
                <div className="p-4 rounded-lg bg-surface-container-lowest border border-border-subtle hover:border-primary-container transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-body-md text-body-md font-semibold text-on-surface">City General Hospital</h3>
                  </div>
                  <p className="font-data-tabular text-data-tabular text-on-surface-variant mb-3 flex items-start gap-1">
                    <span className="material-symbols-outlined text-[16px] text-tertiary mt-0.5">location_on</span>
                    450 Medical Way, East Wing<br/>Metropolis, NY 10005
                  </p>
                  <a className="inline-flex items-center gap-1 text-primary font-status-label text-status-label hover:underline" href="#">
                    Get Directions <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>
              </div>
            </section>
            
            {/* Procedures */}
            <section className="bento-card flex flex-col h-full bg-surface-white">
              <h2 className="font-label-caps text-label-caps text-tertiary mb-4 uppercase tracking-wider">Procedures</h2>
              <ul className="space-y-3 flex-1">
                <li className="flex items-center gap-3 p-3 rounded-lg border border-border-subtle bg-surface-container-lowest">
                  <div className="w-10 h-10 rounded-full bg-secondary-container/30 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">vital_signs</span>
                  </div>
                  <div>
                    <h4 className="font-data-tabular text-data-tabular text-on-surface font-semibold">Cardiac Stenting</h4>
                    <p className="text-[12px] text-on-surface-variant">Minimally invasive</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 p-3 rounded-lg border border-border-subtle bg-surface-container-lowest">
                  <div className="w-10 h-10 rounded-full bg-secondary-container/30 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">monitor_heart</span>
                  </div>
                  <div>
                    <h4 className="font-data-tabular text-data-tabular text-on-surface font-semibold">TAVI / TAVR</h4>
                    <p className="text-[12px] text-on-surface-variant">Transcatheter aortic valve</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 p-3 rounded-lg border border-border-subtle bg-surface-container-lowest">
                  <div className="w-10 h-10 rounded-full bg-secondary-container/30 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">medical_services</span>
                  </div>
                  <div>
                    <h4 className="font-data-tabular text-data-tabular text-on-surface font-semibold">PCNL Surgery Coordination</h4>
                    <p className="text-[12px] text-on-surface-variant">Multidisciplinary care</p>
                  </div>
                </li>
              </ul>
            </section>
            
            {/* Experience & Awards */}
            <section className="bento-card md:col-span-2 bg-surface-white">
              <h2 className="font-label-caps text-label-caps text-tertiary mb-6 uppercase tracking-wider">Experience &amp; Awards</h2>
              <div className="relative border-l-2 border-border-subtle ml-3 space-y-6">
                {/* Timeline Item 1 */}
                <div className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5 shadow-[0_0_0_4px_white]"></div>
                  <h3 className="font-body-md text-body-md font-semibold text-on-surface">Head of Interventional Cardiology</h3>
                  <p className="font-data-tabular text-data-tabular text-primary font-medium">Memorial Health Center | 2018 - Present</p>
                  <p className="font-data-tabular text-data-tabular text-on-surface-variant mt-1">Leading a team of 15 specialists in advancing minimally invasive cardiac care.</p>
                </div>
                {/* Timeline Item 2 */}
                <div className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-surface-variant rounded-full -left-[7px] top-1.5 shadow-[0_0_0_4px_white]"></div>
                  <h3 className="font-body-md text-body-md font-semibold text-on-surface">Excellence in Patient Care Award</h3>
                  <p className="font-data-tabular text-data-tabular text-tertiary font-medium">National Cardiac Association | 2021</p>
                  <p className="font-data-tabular text-data-tabular text-on-surface-variant mt-1">Recognized for outstanding patient outcomes and satisfaction rates.</p>
                </div>
                {/* Timeline Item 3 */}
                <div className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-surface-variant rounded-full -left-[7px] top-1.5 shadow-[0_0_0_4px_white]"></div>
                  <h3 className="font-body-md text-body-md font-semibold text-on-surface">Fellowship in Structural Heart Disease</h3>
                  <p className="font-data-tabular text-data-tabular text-tertiary font-medium">Johns Hopkins Medicine | 2010 - 2012</p>
                </div>
              </div>
            </section>
          </div>
        </div>
        
        {/* Right Sticky Sidebar (4 Columns) */}
        <div className="md:col-span-4">
          <div className="glass-panel rounded-xl p-6 shadow-md sticky top-[100px]">
            <h2 className="font-headline-md text-headline-md font-semibold text-on-surface mb-6">Book Appointment</h2>
            
            {/* Consultation Type Toggle */}
            <div className="flex p-1 bg-surface-container rounded-lg mb-6">
              <button className="flex-1 py-2 text-center rounded-md bg-surface-white shadow-sm font-status-label text-status-label text-primary transition-all">
                In-person
              </button>
              <button className="flex-1 py-2 text-center rounded-md text-on-surface-variant font-status-label text-status-label hover:text-on-surface transition-all">
                Virtual
              </button>
            </div>
            
            {/* Date Picker Skeleton */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-data-tabular text-data-tabular font-medium text-on-surface">October 2023</h3>
                <div className="flex gap-2">
                  <button className="w-6 h-6 flex items-center justify-center rounded bg-surface-container hover:bg-surface-container-high"><span className="material-symbols-outlined text-[16px]">chevron_left</span></button>
                  <button className="w-6 h-6 flex items-center justify-center rounded bg-surface-container hover:bg-surface-container-high"><span className="material-symbols-outlined text-[16px]">chevron_right</span></button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                <div className="font-label-caps text-label-caps text-tertiary">M</div>
                <div className="font-label-caps text-label-caps text-tertiary">T</div>
                <div className="font-label-caps text-label-caps text-tertiary">W</div>
                <div className="font-label-caps text-label-caps text-tertiary">T</div>
                <div className="font-label-caps text-label-caps text-tertiary">F</div>
                <div className="font-label-caps text-label-caps text-tertiary">S</div>
                <div className="font-label-caps text-label-caps text-tertiary">S</div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center font-data-tabular text-data-tabular">
                <div className="p-1 text-tertiary opacity-50">25</div><div className="p-1 text-tertiary opacity-50">26</div><div className="p-1 text-tertiary opacity-50">27</div><div className="p-1 text-tertiary opacity-50">28</div><div className="p-1 text-tertiary opacity-50">29</div>
                <div className="p-1 text-on-surface hover:bg-surface-container rounded cursor-pointer">30</div>
                <div className="p-1 text-on-surface hover:bg-surface-container rounded cursor-pointer">1</div>
                <div className="p-1 text-on-surface hover:bg-surface-container rounded cursor-pointer">2</div>
                <div className="p-1 text-on-surface hover:bg-surface-container rounded cursor-pointer">3</div>
                <div className="p-1 bg-primary text-on-primary rounded font-semibold shadow-sm cursor-pointer">4</div>
                <div className="p-1 text-on-surface hover:bg-surface-container rounded cursor-pointer">5</div>
                <div className="p-1 text-on-surface hover:bg-surface-container rounded cursor-pointer">6</div>
                <div className="p-1 text-on-surface hover:bg-surface-container rounded cursor-pointer">7</div>
                <div className="p-1 text-on-surface hover:bg-surface-container rounded cursor-pointer">8</div>
              </div>
            </div>
            
            {/* Time Slots */}
            <div className="mb-6">
              <h3 className="font-data-tabular text-data-tabular font-medium text-on-surface mb-3">Available Slots</h3>
              <div className="mb-3">
                <span className="font-label-caps text-label-caps text-tertiary block mb-2">Morning</span>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1.5 border border-border-subtle rounded-md font-data-tabular text-data-tabular text-on-surface hover:border-primary hover:text-primary transition-colors">09:00 AM</button>
                  <button className="px-3 py-1.5 border border-primary bg-primary-container/10 rounded-md font-data-tabular text-data-tabular text-primary font-medium transition-colors">10:30 AM</button>
                  <button className="px-3 py-1.5 border border-border-subtle rounded-md font-data-tabular text-data-tabular text-on-surface opacity-50 cursor-not-allowed">11:00 AM</button>
                </div>
              </div>
              <div>
                <span className="font-label-caps text-label-caps text-tertiary block mb-2">Afternoon</span>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1.5 border border-border-subtle rounded-md font-data-tabular text-data-tabular text-on-surface hover:border-primary hover:text-primary transition-colors">02:00 PM</button>
                  <button className="px-3 py-1.5 border border-border-subtle rounded-md font-data-tabular text-data-tabular text-on-surface hover:border-primary hover:text-primary transition-colors">03:30 PM</button>
                </div>
              </div>
            </div>
            
            <hr className="border-border-subtle mb-6"/>
            <div className="flex justify-between items-center mb-6">
              <span className="font-body-md text-body-md text-on-surface-variant">Consultation Fee</span>
              <span className="font-headline-md text-headline-md font-semibold text-on-surface">$150</span>
            </div>
            <button className="w-full py-3 bg-primary text-on-primary rounded-lg font-status-label text-status-label hover:bg-surface-tint transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer">
              Book Consultation <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
