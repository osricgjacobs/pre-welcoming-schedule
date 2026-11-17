import React from "react";
import {
  CheckSquare,
  Square,
  FileText,
  Building2,
  ChevronRight,
} from "lucide-react";
import { PARTNER_RESIDENCES } from "../../data/logisticsData";

export default function LogisticsHub({
  logistics,
  role,
  onToggleLogisticItem,
  onOpenLoginModal,
  onSelectResidence,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left 7 Cols: Logistics & CSV Notes Action Tracker */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white rounded-2xl border border-[#dbe2e8] shadow-sm overflow-hidden">
          <div className="bg-[#506c84] text-white px-5 py-4 flex items-center justify-between">
            <div>
              <h3 className="font-helshoogte text-lg font-bold">
                HK Logistics & CSV Notes Tracker
              </h3>
              <p className="text-xs text-[#dbe2e8] mt-0.5">
                Extracted directly from floating notes & TBC cells in
                HK_Welcoming_Schedule.csv
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-white/15 text-xs font-bold">
              {logistics.filter((l) => l.completed).length}/{logistics.length}{" "}
              Resolved
            </span>
          </div>

          <div className="divide-y divide-[#edf1f4]">
            {logistics.map((item) => (
              <div
                key={item.id}
                onClick={() => onToggleLogisticItem(item)}
                className={`p-4 flex items-start gap-3.5 transition ${
                  role === "admin" ? "cursor-pointer hover:bg-[#f8fafc]" : ""
                } ${item.completed ? "bg-slate-50/80 opacity-70" : ""}`}
              >
                <div className="pt-0.5 text-[#506c84]">
                  {item.completed ? (
                    <CheckSquare className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Square className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4
                      className={`font-semibold text-sm ${
                        item.completed
                          ? "line-through text-slate-500"
                          : "text-[#202b35]"
                      }`}
                    >
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#edf1f4] text-[#506c84]">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {role === "guest" && (
            <div className="bg-[#edf1f4] px-5 py-3 text-xs text-[#384c5c] flex items-center justify-between">
              <span>
                Viewing in Guest mode. Log in as HK Admin to check off action
                items.
              </span>
              <button
                onClick={onOpenLoginModal}
                className="font-bold text-[#506c84] hover:underline cursor-pointer"
              >
                Admin Login →
              </button>
            </div>
          )}
        </div>

        {/* Budget Presentations Breakdown */}
        <div className="bg-white rounded-2xl border border-[#dbe2e8] shadow-sm p-5">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2 rounded-lg bg-[#edf1f4] text-[#506c84]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-helshoogte text-base font-bold text-[#202b35]">
                HK Budget Presentation Lineup
              </h3>
              <p className="text-xs text-slate-500">
                Sunday, 17 Jan (15:00 – 18:00) & Follow-up Wednesday, 20 Jan
                (13:00)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#dbe2e8]">
              <span className="text-xs font-bold text-[#506c84]">
                15:00 • Slot 1
              </span>
              <p className="font-semibold text-sm text-[#202b35] mt-1">
                Anco, Tjeerdo, Martin, Matthew
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#dbe2e8]">
              <span className="text-xs font-bold text-[#506c84]">
                16:00 • Slot 2
              </span>
              <p className="font-semibold text-sm text-[#202b35] mt-1">
                Lucas, Dante, Braam
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#dbe2e8]">
              <span className="text-xs font-bold text-[#506c84]">
                17:00 • Slot 3
              </span>
              <p className="font-semibold text-sm text-[#202b35] mt-1">
                Remaining Portfolios & Sign-off
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right 5 Cols: Inter-Residence & Cluster Partners Directory */}
      <div className="lg:col-span-5">
        <div className="bg-white rounded-2xl border border-[#dbe2e8] shadow-sm overflow-hidden">
          <div className="bg-[#384c5c] text-white px-5 py-4 flex items-center justify-between">
            <div>
              <h3 className="font-helshoogte text-lg font-bold">
                Partner Residences Directory
              </h3>
              <p className="text-xs text-[#dbe2e8] mt-0.5">
                Click any residence to filter their social on the timeline
              </p>
            </div>
            <Building2 className="w-5 h-5 text-[#facc15]" />
          </div>

          <div className="divide-y divide-[#edf1f4]">
            {PARTNER_RESIDENCES.map((res) => (
              <button
                key={res.name}
                onClick={() => onSelectResidence(res.name.split(" ")[0])}
                className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-[#f8fafc] transition text-left group cursor-pointer"
              >
                <div>
                  <p className="font-helshoogte font-bold text-sm text-[#202b35] group-hover:text-[#506c84]">
                    {res.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {res.event} •{" "}
                    <span className="font-medium text-slate-700">
                      {res.date}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#edf1f4] text-[#506c84]">
                    {res.note}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#506c84] group-hover:translate-x-0.5 transition" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
