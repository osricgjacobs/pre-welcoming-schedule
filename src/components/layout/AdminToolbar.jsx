import React, { useState } from "react";
import { ShieldCheck, Plus, Download, RotateCcw } from "lucide-react";

export default function AdminToolbar({
  selectedDate,
  onOpenAddModal,
  onExportCSV,
  onResetToCSV,
  isSyncing,
}) {
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  return (
    <section className="bg-[#202b35] text-white rounded-xl p-4 mb-6 shadow-md border border-[#506c84] flex flex-wrap items-center justify-between gap-4 no-print">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-[#d92323] text-[#facc15]">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <span>HK Admin Control Mode Active</span>
            {isSyncing && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-white/10 text-sky-300">
                Syncing with Supabase...
              </span>
            )}
          </h2>
          <p className="text-xs text-[#b9c6d2]">
            Add new events, edit TBC venues/times, or export updated schedules.
            Changes sync live to Supabase for all viewers.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => onOpenAddModal(selectedDate)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#facc15] hover:bg-amber-300 text-[#202b35] font-bold text-xs transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Schedule Item</span>
        </button>

        <button
          onClick={onExportCSV}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#506c84] hover:bg-[#61809b] text-white font-semibold text-xs transition cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>

        {!confirmResetOpen ? (
          <button
            onClick={() => setConfirmResetOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#dbe2e8] font-medium text-xs transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset CSV</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 bg-red-950/90 border border-red-500/50 px-2.5 py-1.5 rounded-lg">
            <span className="text-xs text-red-200">Restore original CSV?</span>
            <button
              onClick={() => {
                setConfirmResetOpen(false);
                onResetToCSV();
              }}
              className="px-2 py-0.5 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-bold cursor-pointer"
            >
              Yes
            </button>
            <button
              onClick={() => setConfirmResetOpen(false)}
              className="px-2 py-0.5 bg-white/10 hover:bg-white/20 text-white rounded text-xs cursor-pointer"
            >
              No
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
