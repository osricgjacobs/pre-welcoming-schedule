import React from "react";
import { HelshoogteCrestImg } from "../common/BrandAssets";

export default function Footer({ role, onOpenLoginModal, onLogout }) {
  return (
    <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-8 border-t border-[#dbe2e8] text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <HelshoogteCrestImg className="w-6 h-7 object-contain" />
        <div>
          <span className="font-helshoogte font-bold text-[#202b35]">
            Helshoogte Men&apos;s Residence
          </span>{" "}
          • Stellenbosch 1973 • HK Welcoming Schedule 2027
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span>Sinyuka Sonke • Hoenderhok</span>
        {role === "guest" ? (
          <button
            onClick={onOpenLoginModal}
            className="text-[#506c84] font-semibold hover:underline cursor-pointer"
          >
            HK Admin Portal
          </button>
        ) : (
          <button
            onClick={onLogout}
            className="text-[#d92323] font-semibold hover:underline cursor-pointer"
          >
            Exit Admin Mode
          </button>
        )}
      </div>
    </footer>
  );
}
