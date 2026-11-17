import React, { useState, useEffect, useMemo } from "react";
import { CheckCircle2, Info, Loader2 } from "lucide-react";
import { supabase } from "./lib/supabase";
import { INITIAL_EVENTS } from "./data/scheduleData";
import { INITIAL_LOGISTICS } from "./data/logisticsData";
import { HOUSE_SONGS } from "./data/houseSongs";

import Header from "./components/layout/Header";
import KpiStrip from "./components/layout/KpiStrip";
import AdminToolbar from "./components/layout/AdminToolbar";
import Footer from "./components/layout/Footer";
import ScheduleTab from "./components/schedule/ScheduleTab";
import LogisticsHub from "./components/hub/LogisticsHub";
import SongsTab from "./components/songs/SongsTab";
import AdminLoginModal from "./components/modals/AdminLoginModal";
import EventFormModal from "./components/modals/EventFormModal";

export default function App() {
  // Supabase Data State
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [logistics, setLogistics] = useState(INITIAL_LOGISTICS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  // Supabase Auth State
  const [session, setSession] = useState(null);
  const role = session ? "admin" : "guest";
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Navigation & Filtering State
  const [activeTab, setActiveTab] = useState("timeline"); // 'timeline' | 'hub' | 'songs'
  const [selectedDate, setSelectedDate] = useState("ALL");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Event Modal & Feedback State
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [presetModalDate, setPresetModalDate] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3600);
  };

  // 1. Check active Supabase session & subscribe to auth changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Fetch live schedule & logistics from Supabase on mount
  useEffect(() => {
    async function fetchSupabaseData() {
      setIsLoading(true);
      try {
        const [eventsRes, logisticsRes] = await Promise.all([
          supabase.from("schedule_events").select("*"),
          supabase
            .from("logistics_items")
            .select("*")
            .order("id", { ascending: true }),
        ]);

        if (eventsRes.error) throw eventsRes.error;
        if (logisticsRes.error) throw logisticsRes.error;

        if (eventsRes.data) setEvents(eventsRes.data);
        if (logisticsRes.data) setLogistics(logisticsRes.data);
      } catch (err) {
        console.error("Supabase fetch error:", err.message);
        showToast(
          "Could not connect to Supabase — showing local backup.",
          "info",
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchSupabaseData();
  }, []);

  // Auth Handlers
  const handleAdminLogin = async (email, password) => {
    setIsAuthenticating(true);
    setLoginError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setIsAuthenticating(false);

    if (error) {
      setLoginError(error.message);
    } else {
      setShowLoginModal(false);
      showToast(
        "Logged in as HK Admin — Live Supabase editing unlocked.",
        "success",
      );
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setConfirmDeleteId(null);
    showToast("Signed out to Guest View (Read-Only).", "info");
  };

  // Schedule CRUD Handlers (Persisted to Supabase)
  const openAddModal = (presetDate = null) => {
    setEditingEvent(null);
    setPresetModalDate(presetDate);
    setIsEventModalOpen(true);
  };

  const openEditModal = (evt) => {
    setEditingEvent(evt);
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = async (formData) => {
    setIsSyncing(true);
    try {
      if (editingEvent) {
        const { error } = await supabase
          .from("schedule_events")
          .update(formData)
          .eq("id", editingEvent.id);

        if (error) throw error;

        setEvents((prev) =>
          prev.map((item) =>
            item.id === editingEvent.id ? { ...item, ...formData } : item,
          ),
        );
        showToast(`Updated "${formData.title}"`, "success");
      } else {
        const newEvent = { id: `evt-${Date.now()}`, ...formData };
        const { error } = await supabase
          .from("schedule_events")
          .insert([newEvent]);

        if (error) throw error;

        setEvents((prev) => [...prev, newEvent]);
        showToast(`Added "${formData.title}" to live schedule`, "success");
      }
      setIsEventModalOpen(false);
      setEditingEvent(null);
    } catch (err) {
      showToast(`Save failed: ${err.message}`, "info");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    const target = events.find((e) => e.id === id);
    setIsSyncing(true);
    try {
      const { error } = await supabase
        .from("schedule_events")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setEvents((prev) => prev.filter((item) => item.id !== id));
      setConfirmDeleteId(null);
      if (target) showToast(`Removed "${target.title}"`, "info");
    } catch (err) {
      showToast(`Delete failed: ${err.message}`, "info");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleToggleEventStatus = async (evt) => {
    const nextStatus = evt.status === "TBC" ? "Confirmed" : "TBC";
    setIsSyncing(true);
    try {
      const { error } = await supabase
        .from("schedule_events")
        .update({ status: nextStatus })
        .eq("id", evt.id);

      if (error) throw error;

      setEvents((prev) =>
        prev.map((item) =>
          item.id === evt.id ? { ...item, status: nextStatus } : item,
        ),
      );
      showToast(`Marked "${evt.title}" as ${nextStatus}`, "success");
    } catch (err) {
      showToast(`Status update failed: ${err.message}`, "info");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleToggleLogisticItem = async (item) => {
    if (role !== "admin") {
      showToast("Log in as HK Admin to check off logistics items.", "info");
      return;
    }
    const nextCompleted = !item.completed;
    setIsSyncing(true);
    try {
      const { error } = await supabase
        .from("logistics_items")
        .update({ completed: nextCompleted })
        .eq("id", item.id);

      if (error) throw error;

      setLogistics((prev) =>
        prev.map((l) =>
          l.id === item.id ? { ...l, completed: nextCompleted } : l,
        ),
      );
    } catch (err) {
      showToast(`Update failed: ${err.message}`, "info");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleResetToCSV = async () => {
    setIsSyncing(true);
    try {
      await supabase.from("schedule_events").delete().neq("id", "");
      await supabase.from("schedule_events").insert(INITIAL_EVENTS);

      await supabase.from("logistics_items").delete().neq("id", "");
      await supabase.from("logistics_items").insert(INITIAL_LOGISTICS);

      setEvents(INITIAL_EVENTS);
      setLogistics(INITIAL_LOGISTICS);
      showToast("Supabase database restored to original CSV seed.", "success");
    } catch (err) {
      showToast(`Reset failed: ${err.message}`, "info");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "Date",
      "Start Time",
      "End Time",
      "Activity",
      "Category",
      "Details",
      "Who",
      "Location",
      "Status",
      "Logistics Notes",
    ];
    const sorted = [...events].sort((a, b) =>
      a.date === b.date
        ? a.startTime.localeCompare(b.startTime)
        : a.date.localeCompare(b.date),
    );
    const rows = sorted.map((e) => [
      e.date,
      e.startTime,
      e.endTime || "",
      `"${(e.title || "").replace(/"/g, '""')}"`,
      `"${(e.category || "").replace(/"/g, '""')}"`,
      `"${(e.details || "").replace(/"/g, '""')}"`,
      `"${(e.who || "").replace(/"/g, '""')}"`,
      `"${(e.location || "").replace(/"/g, '""')}"`,
      e.status,
      `"${(e.notes || "").replace(/"/g, '""')}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Helshoogte_HK_Welcoming_Schedule_2027.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Exported schedule to CSV!", "success");
  };

  const stats = useMemo(() => {
    const totalEvents = events.length;
    const interResCount = events.filter(
      (e) =>
        e.category === "Inter-Res Social" || e.category === "Connect & Cluster",
    ).length;
    const tbcCount = events.filter(
      (e) =>
        e.status === "TBC" || (e.location || "").toLowerCase().includes("tbc"),
    ).length;
    return { totalEvents, interResCount, tbcCount };
  }, [events]);

  return (
    <div className="min-h-screen bg-[#f4f7f9] text-[#1e293b] font-sans selection:bg-[#506c84] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-helshoogte { font-family: 'Montserrat', sans-serif; letter-spacing: -0.02em; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @media print { .no-print { display: none !important; } body { background: white !important; } }
      `}</style>

      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border bg-[#202b35] text-white border-[#506c84]/50 animate-fade-in">
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <Info className="w-5 h-5 text-sky-300 shrink-0" />
          )}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      <Header
        role={role}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tbcCount={stats.tbcCount}
        songsCount={HOUSE_SONGS.length}
        selectedDate={selectedDate}
        onOpenAddModal={openAddModal}
        onOpenLoginModal={() => {
          setLoginError("");
          setShowLoginModal(true);
        }}
        onLogout={handleLogout}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <KpiStrip
          stats={stats}
          onFilterTbc={() => {
            setActiveTab("timeline");
            setSelectedCategory(
              selectedCategory === "TBC_ONLY" ? "ALL" : "TBC_ONLY",
            );
          }}
        />

        {role === "admin" && (
          <AdminToolbar
            selectedDate={selectedDate}
            onOpenAddModal={openAddModal}
            onExportCSV={handleExportCSV}
            onResetToCSV={handleResetToCSV}
            isSyncing={isSyncing}
          />
        )}

        {isLoading ? (
          <div className="bg-white rounded-2xl border border-[#dbe2e8] p-12 flex flex-col items-center justify-center text-center">
            <Loader2 className="w-8 h-8 text-[#506c84] animate-spin mb-3" />
            <p className="font-helshoogte font-bold text-[#202b35]">
              Loading Helshoogte Schedule...
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Syncing live events from Supabase
            </p>
          </div>
        ) : (
          <>
            {activeTab === "timeline" && (
              <ScheduleTab
                events={events}
                role={role}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                tbcCount={stats.tbcCount}
                confirmDeleteId={confirmDeleteId}
                setConfirmDeleteId={setConfirmDeleteId}
                onOpenAddModal={openAddModal}
                onOpenEditModal={openEditModal}
                onToggleStatus={handleToggleEventStatus}
                onDeleteEvent={handleDeleteEvent}
                onExportCSV={handleExportCSV}
              />
            )}

            {activeTab === "hub" && (
              <LogisticsHub
                logistics={logistics}
                role={role}
                onToggleLogisticItem={handleToggleLogisticItem}
                onOpenLoginModal={() => setShowLoginModal(true)}
                onSelectResidence={(resName) => {
                  setSearchQuery(resName);
                  setSelectedDate("ALL");
                  setSelectedCategory("ALL");
                  setActiveTab("timeline");
                }}
              />
            )}

            {activeTab === "songs" && <SongsTab />}
          </>
        )}
      </main>

      <Footer
        role={role}
        onOpenLoginModal={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />

      <AdminLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSubmit={handleAdminLogin}
        onContinueAsGuest={() => {
          setShowLoginModal(false);
          showToast("Continuing as Guest (View-Only Mode).", "info");
        }}
        loginError={loginError}
        isAuthenticating={isAuthenticating}
      />

      {role === "admin" && (
        <EventFormModal
          isOpen={isEventModalOpen}
          onClose={() => setIsEventModalOpen(false)}
          editingEvent={editingEvent}
          presetDate={presetModalDate}
          onSaveEvent={handleSaveEvent}
        />
      )}
    </div>
  );
}
