"use client";

import { useState, useEffect, useCallback } from "react";
import { UserCheck, UserX, Clock, ShieldCheck, Sparkles, AlertCircle, RefreshCw } from "lucide-react";

export interface PendingTeacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  qualification: string;
  phone: string;
  createdAt: string;
  status: string;
}

interface TeacherApprovalPanelProps {
  onStatusChange?: (msg: string) => void;
}

export function TeacherApprovalPanel({ onStatusChange }: TeacherApprovalPanelProps) {
  const [pendingList, setPendingList] = useState<PendingTeacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchPendingTeachers = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/pending-teachers");
      const data = await res.json();
      if (res.ok && data.success) {
        setPendingList(data.pendingTeachers || []);
      } else {
        setError(data.error || "Failed to load pending teachers.");
      }
    } catch {
      setError("Network error fetching teacher registrations.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPendingTeachers();
  }, [fetchPendingTeachers]);

  const handleAction = async (userId: string, action: "approve" | "reject", name: string) => {
    setActionLoadingId(userId);
    try {
      const res = await fetch("/api/admin/approve-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action }),
      });
      const data = await res.json();
      setActionLoadingId(null);

      if (res.ok && data.success) {
        const msg =
          action === "approve"
            ? `Granted permission! Teacher ${name} can now sign in.`
            : `Registration request for ${name} rejected.`;
        if (onStatusChange) onStatusChange(msg);
        fetchPendingTeachers();
      } else {
        if (onStatusChange) onStatusChange(data.error || "Action failed.");
      }
    } catch {
      setActionLoadingId(null);
      if (onStatusChange) onStatusChange("Network error executing approval action.");
    }
  };

  return (
    <div className="rounded-3xl border-2 border-gold/40 bg-white p-5 sm:p-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-4 gap-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-gold shadow-xs">
            <Clock size={20} />
          </div>
          <div>
            <h3 className="font-display text-base sm:text-lg font-black text-navy flex items-center gap-2">
              Teacher Permission & Approval Center
              {pendingList.length > 0 && (
                <span className="rounded-full bg-amber-500 px-2.5 py-0.5 text-xs font-bold text-white shadow-xs">
                  {pendingList.length} Pending
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Review teacher registration requests and grant authorization for portal sign-in.
            </p>
          </div>
        </div>

        <button
          onClick={fetchPendingTeachers}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
        >
          <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {/* Content Body */}
      <div className="mt-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-7 w-7 animate-spin rounded-full border-3 border-navy border-t-gold" />
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-xs font-semibold text-rose-700">
            <AlertCircle size={16} /> {error}
          </div>
        ) : pendingList.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/50 p-6 text-center space-y-1">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 mb-1">
              <ShieldCheck size={20} />
            </div>
            <h4 className="font-bold text-emerald-900 text-sm">All Clear! No Pending Teacher Approvals</h4>
            <p className="text-xs text-emerald-700 max-w-md mx-auto">
              All teacher registration requests have been reviewed and authorized. New teacher signups will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingList.map((teacher) => {
              const isProcessing = actionLoadingId === teacher.id;
              return (
                <div
                  key={teacher.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-gold/60 hover:shadow-md bg-slate-50/60"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-navy text-white font-black text-sm shadow-xs">
                      {teacher.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-black text-navy text-sm sm:text-base font-display flex items-center gap-2">
                        {teacher.name}
                        <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                          Pending Approval
                        </span>
                      </div>
                      <div className="text-xs font-mono text-slate-600 mt-0.5">{teacher.email}</div>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-medium">
                        <span>Subject: <strong className="text-navy">{teacher.subject}</strong></span>
                        <span>•</span>
                        <span>Qualification: <strong className="text-navy">{teacher.qualification}</strong></span>
                        <span>•</span>
                        <span>Registered: {new Date(teacher.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => handleAction(teacher.id, "approve", teacher.name)}
                      disabled={isProcessing}
                      className="btn primary text-xs font-bold px-3.5 py-2 gap-1.5 shadow-sm bg-emerald-600 hover:bg-emerald-700 border-emerald-600"
                    >
                      {isProcessing ? (
                        <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <>
                          <UserCheck size={15} /> Grant Approval
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleAction(teacher.id, "reject", teacher.name)}
                      disabled={isProcessing}
                      className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition flex items-center gap-1"
                    >
                      <UserX size={15} /> Reject
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
