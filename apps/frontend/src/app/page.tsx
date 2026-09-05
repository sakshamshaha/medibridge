"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Utility for cross-browser wheel delta normalization
const normalizeWheelDelta = (e: WheelEvent) => {
  // Clamp deltaY to prevent massive single-event jumps from touchpad swipes.
  // This ensures a fast swipe doesn't visually skip the whole animation.
  const MAX_DELTA = 50;
  return Math.max(-MAX_DELTA, Math.min(MAX_DELTA, e.deltaY));
};

export default function Homepage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameCount = 290;
  const currentFrame = useRef({ frame: 0 });
  const targetProgress = useRef(0);
  const displayProgress = useRef(0);
  const preloadedImages = useRef<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const renderFrame = (progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Determine the two adjacent frames to blend
    const frameA = Math.floor(progress);
    let frameB = frameA + 1;
    if (frameB >= frameCount) frameB = frameCount - 1;

    const imgA = preloadedImages.current[frameA];
    const imgB = preloadedImages.current[frameB];

    if (!imgA || !imgA.complete) return;

    // The fractional part determines the crossfade opacity
    const blend = progress - frameA;

    const drawImg = (img: HTMLImageElement, alpha: number) => {
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;  
      
      context.globalAlpha = alpha;
      context.drawImage(img, 0, 0, img.width, img.height,
                        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    };

    // Draw base frame at full opacity
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawImg(imgA, 1);
    
    // Draw the next frame over it with an opacity matching the scroll fraction
    if (imgB && imgB.complete && blend > 0) {
      drawImg(imgB, blend);
    }
    
    // Reset alpha
    context.globalAlpha = 1.0;
  };

  useEffect(() => {
    let loadedCount = 0;
    const promises = [];
    
    // Preload all frames
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `/ezgif-427c29427b1a14d5-jpg/ezgif-frame-${(i + 1).toString().padStart(3, "0")}.jpg`;
      preloadedImages.current[i] = img;
      
      const p = img.decode().catch(() => {
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; 
        });
      }).then(() => {
        loadedCount++;
        setLoadProgress(Math.floor((loadedCount / frameCount) * 100));
      });
      
      promises.push(p);
    }
    
    Promise.all(promises).then(() => {
      setIsLoading(false);
      
      // Initialize canvas size
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
      
      renderFrame(0);
    });
  }, []);

  // Removed GSAP ScrollTrigger as we are using a custom strict scroll lock


  useEffect(() => {
    if (isLoading) return;

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        renderFrame(currentFrame.current.frame);
      }
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;

    const handleWheel = (e: WheelEvent) => {
      if (window.scrollY > 0) return;

      const isAtEnd = currentFrame.current.frame >= frameCount - 1.05;
      const isScrollingDown = e.deltaY > 0;

      // If animation is complete and scrolling down, allow native scroll
      if (isAtEnd && isScrollingDown) return;

      // Otherwise, prevent native scroll and scrub animation
      if (e.cancelable) {
        e.preventDefault();
      }
      
      const normalizedDelta = normalizeWheelDelta(e);
      // Increased sensitivity since we are clamping the delta to 50
      const sensitivity = 0.07;
      targetProgress.current += normalizedDelta * sensitivity;
      targetProgress.current = Math.max(0, Math.min(frameCount - 1, targetProgress.current));
    };

    let touchLastY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchLastY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY > 0) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchLastY - touchY; // Positive when scrolling down
      touchLastY = touchY;

      const isAtEnd = currentFrame.current.frame >= frameCount - 1.05;
      const isScrollingDown = deltaY > 0;

      if (isAtEnd && isScrollingDown) return;

      if (e.cancelable) {
        e.preventDefault();
      }

      // Clamp touch delta similarly to wheel
      const MAX_DELTA = 50;
      const normalizedDelta = Math.max(-MAX_DELTA, Math.min(MAX_DELTA, deltaY));

      const sensitivity = 0.07;
      targetProgress.current += normalizedDelta * sensitivity;
      targetProgress.current = Math.max(0, Math.min(frameCount - 1, targetProgress.current));
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    const renderLoop = () => {
      // Lerp (Linear Interpolation) factor for cinematic smoothing. 
      const ease = 0.035; // Slightly faster to feel responsive but still cinematic
      
      // Smoothly move displayProgress toward targetProgress
      displayProgress.current += (targetProgress.current - displayProgress.current) * ease;
      
      // Render threshold tightened since we are blending sub-frames.
      if (Math.abs(displayProgress.current - currentFrame.current.frame) > 0.001) {
        currentFrame.current.frame = displayProgress.current;
        renderFrame(displayProgress.current);
      }
      
      const isAtEnd = currentFrame.current.frame >= frameCount - 1.05;
      
      // Strict scroll lock: if we are at the top and the animation hasn't finished,
      // prevent the body from scrolling entirely. This guarantees touchpad momentum
      // doesn't escape the hero section.
      if (window.scrollY <= 0 && !isAtEnd) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // Start the cinematic render loop
    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = ""; // Cleanup
    };
  }, [isLoading]);

  return (
    <div className="font-sans antialiased min-h-screen relative flex flex-col bg-black text-[#f8fafc]">
      {/* Fixed Canvas Background */}
      <canvas 
        ref={canvasRef}
        className="fixed top-0 left-0 w-[100vw] h-[100vh] z-0 pointer-events-none brightness-90"
      />

      {/* Loading Overlay */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#0f172a] flex flex-col items-center justify-center transition-opacity duration-500 ${
          isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-[#2dd4bf] transition-all duration-300" style={{ width: `${loadProgress}%` }}></div>
        </div>
        <p className="text-white/60 text-sm font-bold tracking-widest uppercase animate-pulse">Initializing Assets... {loadProgress}%</p>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 w-full flex flex-col">
        
        {/* Main Hero Header */}
        <div id="hero-section" className="w-full min-h-[100vh] flex flex-col relative pt-8">
          <header className="flex justify-between items-center px-8 w-full z-20 max-w-[1200px] mx-auto">
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
            <main className="w-full max-w-[1200px] bg-transparent flex flex-col lg:flex-row z-10 mx-auto px-4 sm:px-8 flex-1 relative">
              
              {/* Main Column */}
              <div className="flex-1 flex flex-col justify-center w-full lg:w-1/2">
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
                  <Link href="/retailer" className="home-glass-panel text-white hover:bg-white/10 border border-white/20 font-semibold text-sm px-8 py-4 rounded-full transition-all text-center backdrop-blur-md">
                    Login as Retailer
                  </Link>
                </div>
              </div>
            </main>
        </div>

        {/* Service Highlights */}
        <section className="max-w-[1200px] w-full mx-auto my-24 px-4 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4">Comprehensive Care Ecosystem</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Seamlessly connecting patients, practitioners, and pharmacies through an integrated digital platform.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#141b26]/60 backdrop-blur-md border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#2dd4bf]/20 rounded-full blur-3xl group-hover:bg-[#2dd4bf]/30 transition-colors"></div>
              <span className="material-symbols-outlined text-4xl text-[#2dd4bf] mb-6">local_hospital</span>
              <h3 className="text-2xl font-bold mb-3">Hospital Inquiry</h3>
              <p className="text-white/60 text-sm leading-relaxed">Find specialized procedures with transparent pricing. Compare facilities and read verified patient reviews.</p>
            </div>
            <div className="bg-[#141b26]/60 backdrop-blur-md border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-colors"></div>
              <span className="material-symbols-outlined text-4xl text-purple-400 mb-6">stethoscope</span>
              <h3 className="text-2xl font-bold mb-3">Doctor Inquiry</h3>
              <p className="text-white/60 text-sm leading-relaxed">Book consultations with top specialists. Access tele-health services or schedule in-person visits easily.</p>
            </div>
            <div className="bg-[#141b26]/60 backdrop-blur-md border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors"></div>
              <span className="material-symbols-outlined text-4xl text-blue-400 mb-6">medication</span>
              <h3 className="text-2xl font-bold mb-3">Smart Pharmacy</h3>
              <p className="text-white/60 text-sm leading-relaxed">Upload prescriptions and get medicines delivered directly to your doorstep with real-time tracking.</p>
            </div>
          </div>
        </section>

        {/* Platform Statistics */}
        <section className="w-full bg-[#141b26]/40 backdrop-blur-xl border-y border-white/10 py-20">
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
        <section className="max-w-[1200px] w-full mx-auto my-32 px-4 sm:px-8">
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
        <section className="max-w-[1200px] w-full mx-auto mb-32 px-4 sm:px-8">
          <div className="bg-[#141b26]/70 backdrop-blur-lg border border-white/10 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl">
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
          </div>
        </section>

        {/* Spacer to allow scrolling to the end of animation */}
        <div className="h-[25vh]"></div>

        {/* Footer */}
        <footer className="w-full bg-[#0a0f1a]/90 backdrop-blur-xl border-t border-white/10 pt-20 pb-10 mt-auto">
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
    </div>
  );
}
