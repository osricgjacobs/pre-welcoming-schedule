import React from "react";
import {
  Clock,
  Users,
  MapPin,
  FileText,
  AlertTriangle,
  Plus,
  Edit3,
  Trash2,
} from "lucide-react";
import { CATEGORY_STYLES } from "../../data/scheduleData";

export default function DayCard({
  day,
  role,
  confirmDeleteId,
  setConfirmDeleteId,
  onOpenAddModal,
  onOpenEditModal,
  onToggleStatus,
  onDeleteEvent,
}) {
  const isWelcomingStart = day.date === "2027-01-25";

  return (
    <div
      className={`bg-white rounded-2xl border overflow-hidden shadow-sm ${
        isWelcomingStart
          ? "border-[#d92323]/40 ring-1 ring-[#d92323]/15"
          : "border-[#dbe2e8]"
      }`}
    >
      {/* Day Header Banner */}
      <div
        className={`px-5 py-3.5 flex flex-wrap items-center justify-between gap-2 border-b ${
          isWelcomingStart
            ? "bg-gradient-to-r from-[#d92323] to-[#991b1b] text-white border-[#991b1b]"
            : "bg-[#edf1f4]/80 text-[#202b35] border-[#dbe2e8]"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center font-helshoogte font-bold leading-none ${
              isWelcomingStart
                ? "bg-white text-[#d92323]"
                : "bg-[#506c84] text-white"
            }`}
          >
            <span className="text-[10px] uppercase opacity-85">
              {day.dayShort}
            </span>
            <span className="text-base mt-0.5">{day.dayNum}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-helshoogte text-base sm:text-lg font-bold">
                {day.label} 2027
              </h3>
              <span
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                  isWelcomingStart
                    ? "bg-[#facc15] text-[#202b35]"
                    : "bg-white text-[#506c84] border border-[#dbe2e8]"
                }`}
              >
                {day.phase}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-medium ${
              isWelcomingStart ? "text-red-100" : "text-slate-500"
            }`}
          >
            {day.items.length}{" "}
            {day.items.length === 1 ? "activity" : "activities"}
          </span>
          {role === "admin" && (
            <button
              onClick={() => onOpenAddModal(day.date)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                isWelcomingStart
                  ? "bg-white/20 hover:bg-white/30 text-white"
                  : "bg-[#506c84] hover:bg-[#384c5c] text-white"
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>

      {/* Day Events List */}
      {day.items.length === 0 ? (
        <div className="p-6 text-center bg-slate-50/50">
          <p className="text-sm font-medium text-slate-600">
            Open Welcoming Programme Slot ({day.label})
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Included from the master CSV date grid — awaiting official
            University Welcoming timetable updates.
          </p>
          {role === "admin" && (
            <button
              onClick={() => onOpenAddModal(day.date)}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#506c84] text-white text-xs font-semibold hover:bg-[#384c5c] transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Schedule Activity for {day.label}</span>
            </button>
          )}
        </div>
      ) : (
        <div className="divide-y divide-[#edf1f4]">
          {day.items.map((evt) => {
            const catStyle =
              CATEGORY_STYLES[evt.category] || CATEGORY_STYLES["Operations"];
            const isTBC =
              evt.status === "TBC" ||
              (evt.location || "").toLowerCase().includes("tbc");

            return (
              <div
                key={evt.id}
                className={`p-4 sm:px-6 hover:bg-[#f8fafc] transition border-l-4 ${catStyle.accent} flex flex-col md:flex-row md:items-center justify-between gap-4`}
              >
                {/* Left: Time + Main Details */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5 flex-1">
                  <div className="flex items-center gap-1.5 sm:w-28 shrink-0 pt-0.5">
                    <Clock className="w-4 h-4 text-[#506c84]" />
                    <span className="font-helshoogte font-bold text-sm sm:text-base text-[#202b35]">
                      {evt.startTime}
                      {evt.endTime ? ` – ${evt.endTime}` : ""}
                    </span>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-helshoogte font-bold text-base text-[#1e293b]">
                        {evt.title}
                      </h4>

                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${catStyle.badge}`}
                      >
                        {evt.category}
                      </span>

                      {isTBC && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                          <AlertTriangle className="w-3 h-3" />
                          TBC
                        </span>
                      )}
                    </div>

                    {evt.details && (
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {evt.details}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-xs text-slate-600">
                      {evt.who && (
                        <span className="inline-flex items-center gap-1.5 font-medium text-[#384c5c]">
                          <Users className="w-3.5 h-3.5 text-[#506c84]" />
                          {evt.who}
                        </span>
                      )}

                      {evt.location && (
                        <span
                          className={`inline-flex items-center gap-1.5 font-medium ${
                            evt.location.toLowerCase().includes("tbc")
                              ? "text-amber-700 font-semibold"
                              : "text-slate-600"
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5 text-[#506c84]" />
                          {evt.location}
                        </span>
                      )}

                      {evt.notes && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200/80 font-medium">
                          <FileText className="w-3 h-3 text-amber-600" />
                          {evt.notes}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: HK Admin Quick Actions */}
                {role === "admin" && (
                  <div className="flex items-center gap-1.5 self-end md:self-center shrink-0 no-print">
                    <button
                      onClick={() => onToggleStatus(evt)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                        isTBC
                          ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200"
                      }`}
                      title={isTBC ? "Mark as Confirmed" : "Flag as TBC"}
                    >
                      {isTBC ? "Confirm" : "Flag TBC"}
                    </button>

                    <button
                      onClick={() => onOpenEditModal(evt)}
                      className="p-2 rounded-lg bg-[#edf1f4] hover:bg-[#dbe2e8] text-[#2c3e4e] transition cursor-pointer"
                      title="Edit Event"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {confirmDeleteId === evt.id ? (
                      <div className="flex items-center gap-1 bg-red-50 border border-red-200 px-2 py-1 rounded-lg">
                        <button
                          onClick={() => onDeleteEvent(evt.id)}
                          className="text-xs font-bold text-red-600 hover:underline px-1 cursor-pointer"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="text-xs text-slate-500 px-1 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(evt.id)}
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition cursor-pointer"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
