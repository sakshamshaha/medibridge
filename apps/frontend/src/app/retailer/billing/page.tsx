"use client";

import React, { useState } from "react";
import { DocumentScanner, Search, Warning, Prescriptions, Add, Remove, Delete, PointOfSale } from "@mui/icons-material"; // Adjust if using lucide-react

export default function SmartBillingScanner() {
  const [items, setItems] = useState([
    { id: '1', name: 'Amoxicillin 500mg', desc: 'Pfizer • Cap x 20', price: 24.50, qty: 2, gated: false },
    { id: '2', name: 'Alprazolam 0.5mg', desc: 'Generic • Tab x 10', price: 18.00, qty: 1, gated: true, prescriber: 'Dr. Smith (Verified)' },
    { id: '3', name: 'Ibuprofen 400mg', desc: 'Advil • Tab x 50', price: 9.99, qty: 1, gated: false },
  ]);

  const updateQty = (id: string, delta: number) => {
    setItems(items.map(i => {
      if (i.id === id) {
        return { ...i, qty: Math.max(1, i.qty + delta) };
      }
      return i;
    }));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="flex-1 overflow-hidden flex flex-col lg:flex-row p-bento-gap gap-bento-gap bg-[#0f172a] absolute inset-0 -top-16">
      
      <style dangerouslySetInnerHTML={{ __html: `
        .scanner-viewfinder {
            position: relative;
            overflow: hidden;
        }
        .scanner-viewfinder::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            border: 2px solid rgba(45, 212, 191, 0.3); /* Teal glow */
            border-radius: 12px;
            pointer-events: none;
            box-shadow: inset 0 0 20px rgba(45, 212, 191, 0.1);
        }
        .scanner-corner {
            position: absolute;
            width: 40px;
            height: 40px;
            border-color: #2dd4bf;
            border-style: solid;
        }
        .top-left { top: 16px; left: 16px; border-width: 3px 0 0 3px; border-radius: 8px 0 0 0; }
        .top-right { top: 16px; right: 16px; border-width: 3px 3px 0 0; border-radius: 0 8px 0 0; }
        .bottom-left { bottom: 16px; left: 16px; border-width: 0 0 3px 3px; border-radius: 0 0 0 8px; }
        .bottom-right { bottom: 16px; right: 16px; border-width: 0 3px 3px 0; border-radius: 0 0 8px 0; }
        
        .scan-line {
            position: absolute;
            width: 100%;
            height: 2px;
            background: #2dd4bf;
            box-shadow: 0 0 10px #2dd4bf, 0 0 20px #2dd4bf;
            animation: scan 2s infinite linear;
        }
        @keyframes scan {
            0% { top: 10%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 90%; opacity: 0; }
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255,255,255,0.05); 
            border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.2); 
            border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255,255,255,0.3); 
        }
      `}} />

      {/* Left Canvas: Scanner & Input */}
      <div className="flex-1 flex flex-col gap-bento-gap overflow-y-auto mt-20">
        {/* Scanner Bento */}
        <div className="glass-panel bg-[rgba(30,41,59,0.7)] backdrop-blur-xl border border-border-subtle rounded-xl p-card-padding flex flex-col flex-1 min-h-[400px]">
          <h2 className="font-label-caps text-label-caps text-on-surface-variant mb-4 uppercase tracking-wider">Smart Scanner</h2>
          <div className="flex-1 bg-black/40 rounded-lg scanner-viewfinder relative flex items-center justify-center">
            {/* Simulated Camera Feed */}
            <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDXtTwF5BDw35jPkpHCk2K8cprAzsPdW2KIDQasWxGE1PPPom_l5GJRnmsa18QElWrw_-gU7vbVoL3wW3AMXVur4HRuOpqYpvyb_id8xnEb35YcqbThG-fDL-x8P38tabr6puqVDaZBi6Ba9rLwpgDA2vBnDRWiRlbyM5ctuQF3atYCkPeFehczF6SuxeMa_tAh410eFKVX4tQfbz7jxlGlwYMBYXlhJXmcQrhOfSUQtfJz0uTp8EPK')" }}></div>
            {/* Scanner Overlay */}
            <div className="scanner-corner top-left"></div>
            <div className="scanner-corner top-right"></div>
            <div className="scanner-corner bottom-left"></div>
            <div className="scanner-corner bottom-right"></div>
            <div className="scan-line"></div>
            <div className="z-10 flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-primary text-5xl mb-2">document_scanner</span>
              <p className="font-body-md text-body-md text-white">Align barcode or medicine box within frame</p>
            </div>
          </div>
        </div>

        {/* Manual Input Bento */}
        <div className="glass-panel bg-[rgba(30,41,59,0.7)] backdrop-blur-xl border border-border-subtle rounded-xl p-card-padding mb-8">
          <h2 className="font-label-caps text-label-caps text-on-surface-variant mb-4 uppercase tracking-wider">Manual Entry</h2>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input className="w-full bg-[#0f172a] border border-border-subtle rounded-lg py-3 pl-10 pr-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md" placeholder="Search by name or NDC..." type="text"/>
            </div>
            <button className="bg-primary/20 text-primary border border-primary/50 px-6 py-3 rounded-lg font-data-tabular hover:bg-primary hover:text-white transition-colors cursor-pointer">Add</button>
          </div>

          {/* Gated Medicine Input (Schedule H Demo) */}
          <div className="mt-6 p-4 border border-alert-rose/50 bg-alert-rose/10 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-alert-rose text-[20px]">warning</span>
              <h3 className="font-status-label text-status-label text-alert-rose">Prescription Required (Schedule H)</h3>
            </div>
            <div className="space-y-3">
              <input className="w-full bg-[#0f172a] border border-alert-rose/50 rounded-lg py-2 px-3 text-white focus:border-alert-rose focus:ring-1 focus:ring-alert-rose outline-none font-body-md" placeholder="Prescribing Doctor Name *" type="text"/>
              <div className="flex flex-col sm:flex-row gap-3">
                <input className="flex-1 bg-[#0f172a] border border-border-subtle rounded-lg py-2 px-3 text-white focus:border-primary outline-none font-body-md" placeholder="License No." type="text"/>
                <input className="flex-1 bg-[#0f172a] border border-alert-rose/50 rounded-lg py-2 px-3 text-white focus:border-alert-rose outline-none font-body-md" placeholder="Patient Name *" type="text"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Checkout / Running Bill */}
      <div className="w-full lg:w-96 glass-panel bg-[rgba(30,41,59,0.7)] backdrop-blur-xl border-l border-border-subtle rounded-xl p-card-padding flex flex-col h-full overflow-hidden mt-20 mb-8 z-10 lg:-mr-4">
        <h2 className="font-headline-md text-headline-md font-bold text-white mb-1">Current Bill</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-6">Order #4920-BX</p>

        {/* Bill Items */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {items.map(item => (
            <div key={item.id} className="flex justify-between items-start pb-4 border-b border-border-subtle">
              <div>
                {item.gated ? (
                  <div className="flex items-center gap-1 mb-1">
                    <h4 className="font-data-tabular text-data-tabular text-white">{item.name}</h4>
                    <span className="material-symbols-outlined text-alert-rose text-[14px]" title="Schedule H">warning</span>
                  </div>
                ) : (
                  <h4 className="font-data-tabular text-data-tabular text-white">{item.name}</h4>
                )}
                
                <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">{item.desc}</p>
                {item.prescriber && (
                  <p className="font-label-caps text-[10px] text-primary mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">prescriptions</span> {item.prescriber}
                  </p>
                )}
                <div className="flex items-center mt-2 bg-[#0f172a] rounded-full border border-border-subtle w-fit">
                  <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-white cursor-pointer"><span className="material-symbols-outlined text-[16px]">remove</span></button>
                  <span className="font-data-tabular text-[12px] px-2 text-white">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-white cursor-pointer"><span className="material-symbols-outlined text-[16px]">add</span></button>
                </div>
              </div>
              <div className="text-right">
                <span className="font-data-tabular text-data-tabular text-white">${(item.price * item.qty).toFixed(2)}</span>
                <button onClick={() => removeItem(item.id)} className="block ml-auto mt-2 text-on-surface-variant hover:text-alert-rose transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Totals & CTA */}
        <div className="pt-4 mt-auto border-t border-border-subtle">
          <div className="flex justify-between mb-2">
            <span className="font-body-md text-on-surface-variant">Subtotal</span>
            <span className="font-data-tabular text-white">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="font-body-md text-on-surface-variant">Tax (8%)</span>
            <span className="font-data-tabular text-white">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-end mb-6">
            <span className="font-headline-md text-headline-md font-bold text-white">Total</span>
            <span className="font-headline-md text-headline-md font-bold text-primary">${total.toFixed(2)}</span>
          </div>
          <button className="w-full bg-primary hover:bg-primary/90 text-[#0f172a] font-headline-md font-bold text-[18px] py-4 rounded-xl shadow-[0_0_15px_rgba(45,212,191,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer">
            <span className="material-symbols-outlined">point_of_sale</span>
            Generate Bill
          </button>
        </div>
      </div>
    </div>
  );
}
