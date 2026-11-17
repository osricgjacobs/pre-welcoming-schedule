import React from "react";
import { Calendar, Users, AlertTriangle, Sparkles } from "lucide-react";

export default function KpiStrip({ stats, onFilterTbc }) {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      <div className="bg-white rounded-xl p-4 border border-[#dbe2e8] shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#506c84]">
            Scheduled Blocks
          </p>
          <p className="font-helshoogte text-2xl sm:text-3xl font-bold text-[#202b35] mt-1">
            {stats.totalEvents}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">15 Jan – 27 Jan 2027</p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-[#edf1f4] flex items-center justify-center text-[#506c84]">
          <Calendar className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-[#dbe2e8] shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#506c84]">
            Inter-Res & Cluster
          </p>
          <p className="font-helshoogte text-2xl sm:text-3xl font-bold text-[#202b35] mt-1">
            {stats.interResCount}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">11 Partner Residences</p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-[#edf1f4] flex items-center justify-center text-[#506c84]">
          <Users className="w-5 h-5" />
        </div>
      </div>

      <div
        onClick={onFilterTbc}
        className="bg-white rounded-xl p-4 border border-[#dbe2e8] hover:border-amber-400 shadow-sm flex items-center justify-between cursor-pointer transition"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            TBC / Action Items
          </p>
          <p className="font-helshoogte text-2xl sm:text-3xl font-bold text-amber-600 mt-1">
            {stats.tbcCount}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            Click to filter TBC slots
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
          <AlertTriangle className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#506c84] to-[#384c5c] text-white rounded-xl p-4 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#dbe2e8]">
            Official Kickoff
          </p>
          <p className="font-helshoogte text-xl sm:text-2xl font-bold mt-1">
            Mon, 25 Jan
          </p>
          <p className="text-xs text-[#dbe2e8] mt-0.5">
            07:00 • Newcomer Arrival
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center text-[#facc15]">
          <Sparkles className="w-5 h-5" />
        </div>
      </div>
    </section>
  );
}
