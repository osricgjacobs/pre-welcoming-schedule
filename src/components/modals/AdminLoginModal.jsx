import React, { useState } from "react";
import { Lock, Shield, UserCheck, X } from "lucide-react";
import { HansStormChickenShieldImg } from "../common/BrandAssets";

export default function AdminLoginModal({
  isOpen,
  onClose,
  onLoginSubmit,
  onContinueAsGuest,
  loginError,
  isAuthenticating,
}) {
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSubmit(password);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-[#dbe2e8] overflow-hidden animate-fade-in">
        <div className="bg-[#506c84] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HansStormChickenShieldImg className="w-10 h-12 object-contain" />
            <div>
              <h3 className="font-helshoogte text-lg font-bold">
                Helshoogte Access Portal
              </h3>
              <p className="text-xs text-[#dbe2e8]">
                House Committee Admin vs. Guest Viewer
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/15 text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#384c5c]">
              HK Committee Password
            </label>

            <div className="relative">
              <Lock className="w-4 h-4 text-[#506c84] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter HK Password"
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-[#dbe2e8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#506c84]"
                required
                autoFocus
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-600 font-medium">{loginError}</p>
            )}

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full py-2.5 rounded-xl bg-[#506c84] hover:bg-[#384c5c] disabled:opacity-60 text-white font-bold text-sm shadow transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Shield className="w-4 h-4 text-[#facc15]" />
              <span>
                {isAuthenticating
                  ? "Verifying..."
                  : "Unlock HK Admin Controls"}
              </span>
            </button>
          </form>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200" />
            <span className="shrink mx-3 text-xs text-slate-400 uppercase font-semibold">
              Or Browse Publicly
            </span>
            <div className="flex-grow border-t border-slate-200" />
          </div>

          <button
            type="button"
            onClick={onContinueAsGuest}
            className="w-full py-2.5 rounded-xl bg-[#f8fafc] hover:bg-[#edf1f4] text-[#202b35] font-semibold text-sm border border-[#dbe2e8] transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserCheck className="w-4 h-4 text-[#506c84]" />
            <span>Continue as Guest (View Schedule Only)</span>
          </button>
        </div>
      </div>
    </div>
  );
}