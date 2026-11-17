import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { SCHEDULE_DAYS, CATEGORIES } from "../../data/scheduleData";
import { HansStormChickenShieldImg } from "../common/BrandAssets";

export default function EventFormModal({
  isOpen,
  onClose,
  editingEvent,
  presetDate,
  onSaveEvent,
}) {
  const [formState, setFormState] = useState({
    date: "2027-01-26",
    startTime: "10:00",
    endTime: "",
    title: "",
    category: "Welcoming Official",
    details: "",
    who: "Helshoogte HK & Mentors",
    location: "Helshoogte",
    notes: "",
    status: "Confirmed",
  });

  useEffect(() => {
    if (editingEvent) {
      setFormState({
        date: editingEvent.date,
        startTime: editingEvent.startTime,
        endTime: editingEvent.endTime || "",
        title: editingEvent.title,
        category: editingEvent.category,
        details: editingEvent.details || "",
        who: editingEvent.who || "",
        location: editingEvent.location || "",
        notes: editingEvent.notes || "",
        status: editingEvent.status || "Confirmed",
      });
    } else {
      setFormState({
        date: presetDate && presetDate !== "ALL" ? presetDate : "2027-01-26",
        startTime: "10:00",
        endTime: "",
        title: "",
        category: "Welcoming Official",
        details: "",
        who: "Helshoogte HK & Mentors",
        location: "Helshoogte",
        notes: "",
        status: "Confirmed",
      });
    }
  }, [editingEvent, presetDate, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.title.trim()) return;
    onSaveEvent(formState);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-[#dbe2e8] overflow-hidden my-8">
        <div className="bg-[#506c84] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <HansStormChickenShieldImg className="w-8 h-9 object-contain" />
            <h3 className="font-helshoogte text-lg font-bold">
              {editingEvent ? "Edit Schedule Item" : "Add New Schedule Item"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/15 text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#384c5c] mb-1">
                Date *
              </label>
              <select
                value={formState.date}
                onChange={(e) =>
                  setFormState({ ...formState, date: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-[#dbe2e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#506c84]"
                required
              >
                {SCHEDULE_DAYS.map((d) => (
                  <option key={d.date} value={d.date}>
                    {d.label} 2027
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#384c5c] mb-1">
                Confirmation Status
              </label>
              <select
                value={formState.status}
                onChange={(e) =>
                  setFormState({ ...formState, status: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-[#dbe2e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#506c84]"
              >
                <option value="Confirmed">Confirmed</option>
                <option value="TBC">TBC (To Be Confirmed)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#384c5c] mb-1">
                Start Time *
              </label>
              <input
                type="time"
                value={formState.startTime}
                onChange={(e) =>
                  setFormState({ ...formState, startTime: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-[#dbe2e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#506c84]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#384c5c] mb-1">
                End Time (Optional)
              </label>
              <input
                type="time"
                value={formState.endTime}
                onChange={(e) =>
                  setFormState({ ...formState, endTime: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-[#dbe2e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#506c84]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#384c5c] mb-1">
                Activity Title *
              </label>
              <input
                type="text"
                value={formState.title}
                onChange={(e) =>
                  setFormState({ ...formState, title: e.target.value })
                }
                placeholder="e.g. Venustia Braai Social"
                className="w-full px-3 py-2 text-sm border border-[#dbe2e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#506c84]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#384c5c] mb-1">
                Category
              </label>
              <select
                value={formState.category}
                onChange={(e) =>
                  setFormState({ ...formState, category: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-[#dbe2e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#506c84]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#384c5c] mb-1">
                Who / Participating Houses
              </label>
              <input
                type="text"
                value={formState.who}
                onChange={(e) =>
                  setFormState({ ...formState, who: e.target.value })
                }
                placeholder="e.g. Helshoogte + Nemesia HK"
                className="w-full px-3 py-2 text-sm border border-[#dbe2e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#506c84]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#384c5c] mb-1">
                Location / Venue
              </label>
              <input
                type="text"
                value={formState.location}
                onChange={(e) =>
                  setFormState({ ...formState, location: e.target.value })
                }
                placeholder="e.g. Helshoogte Deck / Tokkie"
                className="w-full px-3 py-2 text-sm border border-[#dbe2e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#506c84]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#384c5c] mb-1">
              Description / Details
            </label>
            <textarea
              rows={2}
              value={formState.details}
              onChange={(e) =>
                setFormState({ ...formState, details: e.target.value })
              }
              placeholder="Activity details, dress code, or format..."
              className="w-full px-3 py-2 text-sm border border-[#dbe2e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#506c84]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#384c5c] mb-1">
              Logistics / Transport / Special Notes
            </label>
            <input
              type="text"
              value={formState.notes}
              onChange={(e) =>
                setFormState({ ...formState, notes: e.target.value })
              }
              placeholder="e.g. Will have to Uber / Nemesia has 12 HK"
              className="w-full px-3 py-2 text-sm border border-[#dbe2e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#506c84]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#edf1f4]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-sm font-bold bg-[#506c84] hover:bg-[#384c5c] text-white shadow transition cursor-pointer"
            >
              {editingEvent ? "Save Changes" : "Add to Schedule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
