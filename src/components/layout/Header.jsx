import React from "react";
import {
  Calendar,
  Compass,
  Music,
  ShieldCheck,
  UserCheck,
  Plus,
  LogOut,
  Lock,
} from "lucide-react";
import {
  HelshoogteCrestImg,
  HansStormChickenShieldImg,
} from "../common/BrandAssets";

export default function Header({
  role,
  activeTab,
  setActiveTab,
  tbcCount,
  songsCount,
  selectedDate,
  onOpenAddModal,
  onOpenLoginModal,
  onLogout,
}) {
  return (
    <header className="bg-[#506c84] text-white shadow-lg border-b border-[#384c5c] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between py-3 gap-4">
          {/* Brand Identity */}
          <div className="flex items-center gap-3.5">
            <div className="relative group">
              <HansStormChickenShieldImg className="w-11 h-13 sm:w-12 sm:h-14 object-contain drop-shadow-md transition-transform duration-200 group-hover:scale-105" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-helshoogte text-xl sm:text-2xl font-bold tracking-tight text-white leading-none">
                  Helshoogte
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#384c5c] text-[#dbe2e8] border border-white/15">
                  HK 2027
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#dbe2e8] mt-1 font-medium">
                <span>Stellenbosch</span>
                <span className="opacity-60">•</span>
                <span>1973</span>
                <span className="hidden md:inline opacity-60">•</span>
                <span className="hidden md:inline italic text-white/90">
                  Sinyuka Sonke
                </span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2.5 pl-4 ml-2 border-l border-white/20">
              <HelshoogteCrestImg
                className="w-8 h-9 object-contain opacity-90"
                invert
              />
              <div className="text-[11px] leading-tight text-[#dbe2e8]">
                <p className="font-semibold text-white">Hoenderhok</p>
                <p className="opacity-80">Welcoming Portal</p>
              </div>
            </div>
          </div>

          {/* Right Controls: Role Indicator & Auth Switcher */}
          <div className="flex items-center gap-2.5 no-print">
            {role === "admin" ? (
              <div className="flex items-center gap-2 bg-[#d92323] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm border border-amber-300/40">
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>HK Admin Active</span>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5 bg-[#384c5c]/80 text-[#edf1f4] px-3 py-1.5 rounded-full text-xs font-medium border border-white/15">
                <UserCheck className="w-3.5 h-3.5 text-sky-200" />
                <span>Guest View (Read-Only)</span>
              </div>
            )}

            {role === "admin" ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAddModal(selectedDate)}
                  className="flex items-center gap-1.5 bg-[#facc15] hover:bg-amber-300 text-[#202b35] font-bold px-3.5 py-2 rounded-lg text-xs sm:text-sm shadow transition cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Add Event</span>
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1.5 bg-[#384c5c] hover:bg-[#202b35] text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-medium border border-white/15 transition cursor-pointer"
                  title="Sign out to Guest mode"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLoginModal}
                className="flex items-center gap-1.5 bg-white hover:bg-[#edf1f4] text-[#2c3e4e] font-semibold px-3.5 py-2 rounded-lg text-xs sm:text-sm shadow-sm transition cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#506c84]" />
                <span>HK Admin Login</span>
              </button>
            )}
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar pt-1 no-print">
          <button
            onClick={() => setActiveTab("timeline")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-lg border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "timeline"
                ? "bg-[#f4f7f9] text-[#202b35] border-[#facc15]"
                : "text-[#dbe2e8] hover:text-white hover:bg-white/10 border-transparent"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Daily Schedule (15 – 27 Jan)</span>
          </button>

          <button
            onClick={() => setActiveTab("hub")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-lg border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "hub"
                ? "bg-[#f4f7f9] text-[#202b35] border-[#facc15]"
                : "text-[#dbe2e8] hover:text-white hover:bg-white/10 border-transparent"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Logistics & Inter-Res Hub</span>
            {tbcCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-400 text-[#202b35]">
                {tbcCount} TBC
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("songs")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-lg border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "songs"
                ? "bg-[#f4f7f9] text-[#202b35] border-[#facc15]"
                : "text-[#dbe2e8] hover:text-white hover:bg-white/10 border-transparent"
            }`}
          >
            <Music className="w-4 h-4" />
            <span>Hellies House Songs</span>
            <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-white/15 text-white">
              {songsCount}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
