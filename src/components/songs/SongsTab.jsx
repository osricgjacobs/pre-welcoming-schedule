import React, { useState, useMemo } from "react";
import { Search, Languages, Printer, Info, X } from "lucide-react";
import { HOUSE_SONGS } from "../../data/houseSongs";

export default function SongsTab() {
  const [songSearch, setSongSearch] = useState("");
  const [selectedSongId, setSelectedSongId] = useState("ALL");
  const [showTranslations, setShowTranslations] = useState(true);

  const filteredSongs = useMemo(() => {
    return HOUSE_SONGS.filter((song) => {
      if (selectedSongId !== "ALL" && song.id !== selectedSongId) return false;
      if (songSearch.trim() !== "") {
        const q = songSearch.toLowerCase();
        const combined = [
          song.title,
          song.tag,
          song.languages,
          song.lyrics,
          song.translation || "",
          song.notes || "",
        ]
          .join(" ")
          .toLowerCase();
        if (!combined.includes(q)) return false;
      }
      return true;
    });
  }, [songSearch, selectedSongId]);

  return (
    <div className="space-y-6">
      {/* Songbook Header & Controls */}
      <div className="bg-white rounded-2xl border border-[#dbe2e8] shadow-sm p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#edf1f4] pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#506c84]">
              Helshoogte Songbook • Welcoming & Geest
            </span>
            <h2 className="font-helshoogte text-2xl font-bold text-[#202b35] mt-1">
              Hellies House Songs & Chants
            </h2>
            <p className="text-sm text-slate-600 mt-0.5">
              Official anthem, traditional serenade, war cries, and rooster
              chants for Song Practice & Welcoming Week.
            </p>
          </div>

          <div className="flex items-center gap-2 no-print">
            <button
              onClick={() => setShowTranslations((prev) => !prev)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                showTranslations
                  ? "bg-[#506c84] text-white border-[#384c5c]"
                  : "bg-[#f8fafc] text-[#202b35] border-[#dbe2e8] hover:bg-[#edf1f4]"
              }`}
            >
              <Languages className="w-4 h-4" />
              <span>
                {showTranslations
                  ? "Translations: Shown"
                  : "Translations: Hidden"}
              </span>
            </button>

            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl border border-[#dbe2e8] bg-[#f8fafc] hover:bg-[#edf1f4] text-[#506c84] transition cursor-pointer"
              title="Print Songbook"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search & Quick Jump Pills */}
        <div className="space-y-3 no-print">
          <div className="relative">
            <Search className="w-4 h-4 text-[#506c84] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={songSearch}
              onChange={(e) => setSongSearch(e.target.value)}
              placeholder="Search song title or lyrics (e.g. Blou Hoender, Sinyuka, Kamers, C3, Vere)..."
              className="w-full pl-10 pr-9 py-2.5 text-sm bg-[#f8fafc] border border-[#dbe2e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#506c84] focus:bg-white transition"
            />
            {songSearch && (
              <button
                onClick={() => setSongSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setSelectedSongId("ALL")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition cursor-pointer ${
                selectedSongId === "ALL"
                  ? "bg-[#506c84] text-white"
                  : "bg-[#edf1f4] text-[#384c5c] hover:bg-[#dbe2e8]"
              }`}
            >
              All Songs ({HOUSE_SONGS.length})
            </button>
            {HOUSE_SONGS.map((song) => (
              <button
                key={song.id}
                onClick={() => setSelectedSongId(song.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 border transition cursor-pointer ${
                  selectedSongId === song.id
                    ? "bg-[#506c84] text-white border-[#384c5c]"
                    : "bg-white text-[#202b35] border-[#dbe2e8] hover:bg-[#edf1f4]"
                }`}
              >
                {song.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Song Cards Grid */}
      {filteredSongs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#dbe2e8] p-8 text-center">
          <p className="text-sm font-semibold text-slate-700">
            No house songs matched your search.
          </p>
          <button
            onClick={() => {
              setSongSearch("");
              setSelectedSongId("ALL");
            }}
            className="mt-2 text-xs font-bold text-[#506c84] hover:underline cursor-pointer"
          >
            Reset Song Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSongs.map((song, idx) => {
            const isAnthem = song.id === "house-anthem";
            return (
              <div
                key={song.id}
                className={`bg-white rounded-2xl border overflow-hidden shadow-sm flex flex-col ${
                  isAnthem
                    ? "lg:col-span-2 border-[#506c84] ring-1 ring-[#506c84]/20"
                    : "border-[#dbe2e8]"
                }`}
              >
                <div
                  className={`px-5 py-3.5 flex flex-wrap items-center justify-between gap-2 border-b ${
                    isAnthem
                      ? "bg-[#506c84] text-white border-[#384c5c]"
                      : "bg-[#edf1f4]/80 text-[#202b35] border-[#dbe2e8]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-helshoogte text-xs font-bold ${
                        isAnthem
                          ? "bg-[#facc15] text-[#202b35]"
                          : "bg-[#506c84] text-white"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <h3 className="font-helshoogte text-base sm:text-lg font-bold">
                      {song.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                        isAnthem
                          ? "bg-white/15 text-white"
                          : "bg-white text-[#506c84] border border-[#dbe2e8]"
                      }`}
                    >
                      {song.tag}
                    </span>
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                        isAnthem
                          ? "text-[#dbe2e8]"
                          : "text-slate-500 bg-slate-100"
                      }`}
                    >
                      {song.languages}
                    </span>
                  </div>
                </div>

                {song.notes && (
                  <div className="px-5 py-2 bg-amber-50 border-b border-amber-200/80 text-xs font-medium text-amber-900 flex items-center gap-2">
                    <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{song.notes}</span>
                  </div>
                )}

                <div
                  className={`p-5 grid gap-5 flex-1 ${
                    song.translation && showTranslations
                      ? "grid-cols-1 md:grid-cols-2"
                      : "grid-cols-1"
                  }`}
                >
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#506c84] mb-2">
                      Lyrics
                    </p>
                    <pre className="font-sans text-sm text-[#1e293b] whitespace-pre-wrap leading-relaxed">
                      {song.lyrics}
                    </pre>
                  </div>

                  {song.translation && showTranslations && (
                    <div className="pt-4 md:pt-0 md:pl-5 border-t md:border-t-0 md:border-l border-[#edf1f4]">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        English Translation
                      </p>
                      <pre className="font-sans text-sm text-slate-600 whitespace-pre-wrap leading-relaxed italic">
                        {song.translation}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
