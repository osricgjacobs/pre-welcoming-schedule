import React, { useMemo } from "react";
import { Search, Filter, Download, Printer, X } from "lucide-react";
import { SCHEDULE_DAYS, CATEGORIES } from "../../data/scheduleData";
import DayCard from "./DayCard";

export default function ScheduleTab({
  events,
  role,
  selectedDate,
  setSelectedDate,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  tbcCount,
  confirmDeleteId,
  setConfirmDeleteId,
  onOpenAddModal,
  onOpenEditModal,
  onToggleStatus,
  onDeleteEvent,
  onExportCSV,
}) {
  const filteredEvents = useMemo(() => {
    return events
      .filter((evt) => {
        if (selectedDate !== "ALL" && evt.date !== selectedDate) return false;
        if (selectedCategory === "TBC_ONLY") {
          if (
            evt.status !== "TBC" &&
            !(evt.location || "").toLowerCase().includes("tbc")
          )
            return false;
        } else if (
          selectedCategory !== "ALL" &&
          evt.category !== selectedCategory
        ) {
          return false;
        }
        if (searchQuery.trim() !== "") {
          const q = searchQuery.toLowerCase();
          const searchable = [
            evt.title,
            evt.details,
            evt.who,
            evt.location,
            evt.notes,
            evt.category,
          ]
            .join(" ")
            .toLowerCase();
          if (!searchable.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        return a.startTime.localeCompare(b.startTime);
      });
  }, [events, selectedDate, selectedCategory, searchQuery]);

  const groupedDays = useMemo(() => {
    const daysToRender =
      selectedDate === "ALL"
        ? SCHEDULE_DAYS
        : SCHEDULE_DAYS.filter((d) => d.date === selectedDate);

    return daysToRender.map((day) => ({
      ...day,
      items: filteredEvents.filter((e) => e.date === day.date),
    }));
  }, [filteredEvents, selectedDate]);

  return (
    <div>
      {/* Search & Category Filter Bar */}
      <div className="bg-white rounded-xl p-4 border border-[#dbe2e8] shadow-sm mb-4 space-y-3 no-print">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#506c84] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search activity, residence (e.g. Nemesia, Erica, Dagbreek), person, or venue..."
              className="w-full pl-10 pr-9 py-2.5 text-sm bg-[#f8fafc] border border-[#dbe2e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#506c84] focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-56">
              <Filter className="w-4 h-4 text-[#506c84] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-[#f8fafc] border border-[#dbe2e8] rounded-lg font-medium text-[#202b35] focus:outline-none focus:ring-2 focus:ring-[#506c84] cursor-pointer"
              >
                <option value="ALL">All Categories ({events.length})</option>
                <option value="TBC_ONLY">
                  ⚠️ TBC / Needs Confirmation ({tbcCount})
                </option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={onExportCSV}
              className="p-2.5 rounded-lg border border-[#dbe2e8] bg-[#f8fafc] hover:bg-[#edf1f4] text-[#506c84] transition cursor-pointer"
              title="Download CSV"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={() => window.print()}
              className="hidden sm:flex p-2.5 rounded-lg border border-[#dbe2e8] bg-[#f8fafc] hover:bg-[#edf1f4] text-[#506c84] transition cursor-pointer"
              title="Print Schedule"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Date Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 pb-0.5">
          <button
            onClick={() => setSelectedDate("ALL")}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition shrink-0 cursor-pointer ${
              selectedDate === "ALL"
                ? "bg-[#506c84] text-white shadow-sm"
                : "bg-[#edf1f4] text-[#384c5c] hover:bg-[#dbe2e8]"
            }`}
          >
            All Days (13)
          </button>

          {SCHEDULE_DAYS.map((day) => {
            const count = events.filter((e) => e.date === day.date).length;
            const isSelected = selectedDate === day.date;
            const isWelcomingStart = day.date === "2027-01-25";
            return (
              <button
                key={day.date}
                onClick={() => setSelectedDate(day.date)}
                className={`flex flex-col items-center px-3 py-1.5 rounded-lg border text-xs transition shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-[#506c84] text-white border-[#384c5c] shadow-sm"
                    : isWelcomingStart
                      ? "bg-red-50 text-[#991b1b] border-red-200 hover:bg-red-100"
                      : "bg-white text-[#202b35] border-[#dbe2e8] hover:bg-[#edf1f4]"
                }`}
              >
                <span
                  className={`text-[10px] uppercase font-semibold ${
                    isSelected ? "text-[#dbe2e8]" : "text-slate-500"
                  }`}
                >
                  {day.dayShort}
                </span>
                <span className="font-helshoogte font-bold text-sm">
                  {day.dayNum} {day.month}
                </span>
                <span
                  className={`mt-0.5 text-[10px] px-1.5 rounded-full font-semibold ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : count > 0
                        ? "bg-[#edf1f4] text-[#506c84]"
                        : "text-slate-400"
                  }`}
                >
                  {count} {count === 1 ? "item" : "items"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Indicator */}
      {(selectedDate !== "ALL" ||
        selectedCategory !== "ALL" ||
        searchQuery) && (
        <div className="flex items-center justify-between bg-[#edf1f4] px-4 py-2 rounded-lg mb-4 text-xs text-[#2c3e4e] border border-[#dbe2e8]">
          <span>
            Showing <strong>{filteredEvents.length}</strong> matching schedule
            items
            {selectedDate !== "ALL" &&
              ` on ${SCHEDULE_DAYS.find((d) => d.date === selectedDate)?.label}`}
            {selectedCategory !== "ALL" &&
              ` • Filter: ${
                selectedCategory === "TBC_ONLY" ? "TBC Items" : selectedCategory
              }`}
          </span>
          <button
            onClick={() => {
              setSelectedDate("ALL");
              setSelectedCategory("ALL");
              setSearchQuery("");
            }}
            className="font-bold text-[#506c84] hover:underline cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Day-by-Day Timeline Cards */}
      <div className="space-y-6">
        {groupedDays.map((day) => {
          if (
            day.items.length === 0 &&
            (searchQuery.trim() !== "" || selectedCategory !== "ALL")
          ) {
            return null;
          }
          return (
            <DayCard
              key={day.date}
              day={day}
              role={role}
              confirmDeleteId={confirmDeleteId}
              setConfirmDeleteId={setConfirmDeleteId}
              onOpenAddModal={onOpenAddModal}
              onOpenEditModal={onOpenEditModal}
              onToggleStatus={onToggleStatus}
              onDeleteEvent={onDeleteEvent}
            />
          );
        })}
      </div>
    </div>
  );
}
