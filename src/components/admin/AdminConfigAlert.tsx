"use client";

import { AlertTriangle, Lock } from "lucide-react";

interface AdminConfigAlertProps {
  isConfigured: boolean;
  errorMessage: string | null;
}

export function AdminConfigAlert({
  isConfigured,
  errorMessage,
}: AdminConfigAlertProps) {
  return (
    <>
      {/* Service Role Key Warning Banner */}
      {!isConfigured && (
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-bold text-amber-900 dark:text-amber-300 text-base">
                Yêu cầu cấu hình SUPABASE_SERVICE_ROLE_KEY
              </h3>
              <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
                Để hiển thị và quản lý danh sách `auth.users`, bạn cần lấy **service_role secret** từ Supabase Dashboard và dán vào file `.env.local`:
              </p>
              <div className="mt-2 p-3 bg-card/80 rounded-lg text-xs font-mono border border-amber-500/20 text-foreground overflow-x-auto">
                SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi... (Lấy từ Supabase Dashboard -&gt; Settings -&gt; API)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Access Banner */}
      {errorMessage && isConfigured && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm font-semibold flex items-center gap-3">
          <Lock className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </>
  );
}
