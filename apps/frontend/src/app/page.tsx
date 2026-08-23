"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useScroll, useMotionValueEvent } from "framer-motion";

export default function Homepage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const img = new Image();
    img.src = `/newhomepageurl/ezgif-frame-${index.toString().padStart(3, "0")}.jpg`;
    img.onload = () => {
      if (canvas.width !== img.width) canvas.width = img.width;
      if (canvas.height !== img.height) canvas.height = img.height;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    };
  };

  useEffect(() => {
    renderFrame(1);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const frameCount = 240;
    const maxScroll = 800;
    const progress = Math.min(1, Math.max(0, latest / maxScroll));
    const frameIndex = Math.min(
      frameCount - 1,
      Math.floor(progress * frameCount)
    );
    renderFrame(frameIndex + 1);
  });

  return (
    <div className="font-sans antialiased min-h-screen relative flex flex-col p-4 sm:p-8 bg-[#0f172a] text-[#f8fafc]">
      {/* Background Glow */}
      <div className="home-glow-accent fixed top-0"></div>
      
      {/* Hero Scroll Wrapper */}
      <div className="h-[200vh] w-full relative">
        {/* MainContainer / Hero */}
        <main className="w-full max-w-[1200px] h-[80vh] min-h-[600px] rounded-3xl bg-[#141b26] border border-white/10 overflow-hidden sticky top-4 sm:top-8 shadow-2xl flex flex-col z-10 mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center p-8 absolute top-0 w-full z-20">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-[#2dd4bf]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-4H5v-2h4V7h2v4h4v2h-4v4z"></path>
            </svg>
            <span className="font-bold text-sm tracking-wider uppercase">MediBridge</span>
          </div>
          {/* Optional Small Nav */}
          <nav className="hidden md:flex gap-4">
            <span className="text-xs text-white/50 border border-white/10 rounded-full px-4 py-1.5 cursor-pointer hover:bg-white/5 transition">Services</span>
            <span className="text-xs text-white/50 border border-white/10 rounded-full px-4 py-1.5 cursor-pointer hover:bg-white/5 transition">About</span>
          </nav>
        </header>

        {/* Hero Content */}
        <section className="flex-1 flex flex-col lg:flex-row w-full h-full relative">
          {/* Left Column */}
          <div className="flex-1 flex flex-col justify-end lg:justify-center p-8 lg:p-16 z-20 w-full lg:w-1/2 mt-24 lg:mt-0">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[0.9] tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              Healthcare,<br/>
              Connected.
            </h1>
            <div className="mb-8 hidden lg:block">
              <p className="text-sm text-white/60 max-w-[300px] leading-relaxed">
                A unified command center bridging the gap between patients, providers, and pharmacies through advanced medical intelligence.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-12">
              <Link href="/customer" className="bg-[#2dd4bf] hover:bg-[#2dd4bf]/90 text-[#0f172a] font-bold text-sm px-8 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(45,212,191,0.3)] text-center">
                Login as Customer
              </Link>
              <Link href="/retailer" className="home-glass-panel text-white hover:bg-white/10 font-semibold text-sm px-8 py-4 rounded-full transition-all text-center">
                Login as Retailer
              </Link>
            </div>
          </div>
          {/* Right Column */}
          <div className="absolute lg:relative right-0 top-0 w-full lg:w-1/2 h-full z-10 pointer-events-none flex items-center justify-center">
            <canvas 
              ref={canvasRef} 
              className="w-[90%] h-[90%] object-contain mix-blend-normal" 
              style={{
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 80%)',
                maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 80%)'
              }}
            />
            <div className="absolute top-1/3 left-10 lg:-left-10 home-glass-panel rounded-2xl p-4 w-48 hidden md:block">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-[#2dd4bf]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                <span className="text-xs font-semibold text-white/80">Blood Status</span>
              </div>
              <div className="h-12 flex items-end gap-1">
                <div className="w-1.5 bg-white/20 h-full rounded-t-sm"></div>
                <div className="w-1.5 bg-[#2dd4bf] h-[60%] rounded-t-sm"></div>
                <div className="w-1.5 bg-white/20 h-[80%] rounded-t-sm"></div>
                <div className="w-1.5 bg-[#2dd4bf] h-[40%] rounded-t-sm"></div>
                <div className="w-1.5 bg-white/20 h-[70%] rounded-t-sm"></div>
                <div className="w-1.5 bg-[#2dd4bf] h-[90%] rounded-t-sm"></div>
              </div>
            </div>
            
            <div className="absolute bottom-1/4 right-10 home-glass-panel rounded-3xl p-5 w-56 hidden md:block border-t-white/20 border-l-white/20 shadow-xl backdrop-blur-2xl">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-4 h-4 text-[#2dd4bf]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                <span className="text-xs font-semibold text-white/80">Blood Count</span>
              </div>
              <div className="flex justify-between items-end">
                <svg className="w-24 h-8 text-[#2dd4bf]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 100 30">
                  <path d="M0 15 Q 12.5 0, 25 15 T 50 15 T 75 15 T 100 15"></path>
                  <circle cx="75" cy="15" fill="currentColor" r="3"></circle>
                </svg>
                <div className="text-right">
                  <span className="block text-2xl font-bold">80</span>
                  <span className="block text-[10px] text-white/50">/100</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        </main>
      </div>


      {/* Service Highlights */}
      <section className="max-w-[1200px] w-full mx-auto mt-24 z-10 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4">Comprehensive Care Ecosystem</h2>
          <p className="text-white/60 max-w-2xl mx-auto">Seamlessly connecting patients, practitioners, and pharmacies through an integrated digital platform.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="home-glass-panel rounded-3xl p-8 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#2dd4bf]/20 rounded-full blur-3xl group-hover:bg-[#2dd4bf]/30 transition-colors"></div>
            <span className="material-symbols-outlined text-4xl text-[#2dd4bf] mb-6">local_hospital</span>
            <h3 className="text-2xl font-bold mb-3">Hospital Inquiry</h3>
            <p className="text-white/60 text-sm leading-relaxed">Find specialized procedures with transparent pricing. Compare facilities and read verified patient reviews.</p>
          </div>
          <div className="home-glass-panel rounded-3xl p-8 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-colors"></div>
            <span className="material-symbols-outlined text-4xl text-purple-400 mb-6">stethoscope</span>
            <h3 className="text-2xl font-bold mb-3">Doctor Inquiry</h3>
            <p className="text-white/60 text-sm leading-relaxed">Book consultations with top specialists. Access tele-health services or schedule in-person visits easily.</p>
          </div>
          <div className="home-glass-panel rounded-3xl p-8 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors"></div>
            <span className="material-symbols-outlined text-4xl text-blue-400 mb-6">medication</span>
            <h3 className="text-2xl font-bold mb-3">Smart Pharmacy</h3>
            <p className="text-white/60 text-sm leading-relaxed">Upload prescriptions and get medicines delivered directly to your doorstep with real-time tracking.</p>
          </div>
        </div>
      </section>

      {/* Platform Statistics */}
      <section className="w-[100vw] relative left-1/2 -translate-x-1/2 bg-white/5 border-y border-white/10 mt-32 py-20 backdrop-blur-sm">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="pt-8 md:pt-0">
            <div className="text-5xl font-extrabold text-[#2dd4bf] mb-2">500+</div>
            <div className="text-sm text-white/60 uppercase tracking-widest font-semibold">Verified Hospitals</div>
          </div>
          <div className="pt-8 md:pt-0">
            <div className="text-5xl font-extrabold text-white mb-2">10k+</div>
            <div className="text-sm text-white/60 uppercase tracking-widest font-semibold">Medicines Available</div>
          </div>
          <div className="pt-8 md:pt-0">
            <div className="text-5xl font-extrabold text-[#2dd4bf] mb-2">15<span className="text-3xl text-white/80">min</span></div>
            <div className="text-sm text-white/60 uppercase tracking-widest font-semibold">Restock Cycle</div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="max-w-[1200px] w-full mx-auto mt-32 z-10 relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4">Streamlined Experience</h2>
          <p className="text-white/60 max-w-2xl mx-auto">Get the care you need in three simple steps.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2 -z-10"></div>
          
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full bg-[#141b26] border border-white/20 flex items-center justify-center text-2xl font-bold text-[#2dd4bf] shadow-[0_0_30px_rgba(45,212,191,0.1)] group-hover:border-[#2dd4bf] transition-colors mb-6 z-10">1</div>
            <h3 className="text-xl font-bold mb-3">Select Role</h3>
            <p className="text-white/60 text-sm">Log in as a patient seeking care or a healthcare provider offering services.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full bg-[#141b26] border border-white/20 flex items-center justify-center text-2xl font-bold text-white shadow-[0_0_30px_rgba(255,255,255,0.05)] group-hover:border-white transition-colors mb-6 z-10">2</div>
            <h3 className="text-xl font-bold mb-3">Find Service</h3>
            <p className="text-white/60 text-sm">Browse our network of hospitals, doctors, and smart pharmacies.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full bg-[#141b26] border border-white/20 flex items-center justify-center text-2xl font-bold text-[#2dd4bf] shadow-[0_0_30px_rgba(45,212,191,0.1)] group-hover:border-[#2dd4bf] transition-colors mb-6 z-10">3</div>
            <h3 className="text-xl font-bold mb-3">Get Care</h3>
            <p className="text-white/60 text-sm">Book appointments, order medications, and manage your health seamlessly.</p>
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="max-w-[1200px] w-full mx-auto mt-32 mb-24 home-glass-panel rounded-3xl p-10 md:p-16 z-10 relative flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Security</h2>
          <p className="text-white/60 mb-8">Your health data is protected with end-to-end encryption and complies with global healthcare regulatory standards.</p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
              <span className="material-symbols-outlined text-[#2dd4bf] text-sm">verified</span>
              <span className="text-xs font-semibold">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
              <span className="material-symbols-outlined text-[#2dd4bf] text-sm">lock</span>
              <span className="text-xs font-semibold">End-to-End Encryption</span>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 bg-[#2dd4bf]/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute inset-0 border border-white/10 rounded-full flex items-center justify-center bg-[#141b26] shadow-2xl">
              <span className="material-symbols-outlined text-6xl text-[#2dd4bf]">security</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-[100vw] relative left-1/2 -translate-x-1/2 bg-[#0a0f1a] border-t border-white/10 pt-20 pb-10 z-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-6 h-6 text-[#2dd4bf]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-4H5v-2h4V7h2v4h4v2h-4v4z"></path>
                </svg>
                <span className="font-bold text-sm tracking-wider uppercase">MediBridge</span>
              </div>
              <p className="text-white/40 text-sm">Bridging the gap between patients and premium healthcare services.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-6">Platform</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li><a className="hover:text-[#2dd4bf] transition-colors" href="#">Hospital Directory</a></li>
                <li><a className="hover:text-[#2dd4bf] transition-colors" href="#">Find a Doctor</a></li>
                <li><a className="hover:text-[#2dd4bf] transition-colors" href="#">Pharmacy Services</a></li>
                <li><a className="hover:text-[#2dd4bf] transition-colors" href="#">Patient Portal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li><a className="hover:text-[#2dd4bf] transition-colors" href="#">About Us</a></li>
                <li><a className="hover:text-[#2dd4bf] transition-colors" href="#">Careers</a></li>
                <li><a className="hover:text-[#2dd4bf] transition-colors" href="#">Press</a></li>
                <li><a className="hover:text-[#2dd4bf] transition-colors" href="#">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li><a className="hover:text-[#2dd4bf] transition-colors" href="#">Privacy Policy</a></li>
                <li><a className="hover:text-[#2dd4bf] transition-colors" href="#">Terms of Service</a></li>
                <li><a className="hover:text-[#2dd4bf] transition-colors" href="#">Cookie Policy</a></li>
                <li><a className="hover:text-[#2dd4bf] transition-colors" href="#">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-white/40 text-xs">
            <p>© 2026 MediBridge Healthcare. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a className="hover:text-white transition-colors" href="#">Twitter</a>
              <a className="hover:text-white transition-colors" href="#">LinkedIn</a>
              <a className="hover:text-white transition-colors" href="#">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
