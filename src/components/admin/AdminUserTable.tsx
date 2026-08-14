"use client";

import {
  ShieldCheck,
  Shield,
  Trash2,
  Pencil,
  RefreshCw,
  Building2,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AdminUserItem } from "@/app/admin/actions";

interface AdminUserTableProps {
  users: AdminUserItem[];
  isLoadingData: boolean;
  onEditUser: (user: AdminUserItem) => void;
  onDeleteUser: (userId: string, email: string | null) => void;
}

export function AdminUserTable({
  users,
  isLoadingData,
  onEditUser,
  onDeleteUser,
}: AdminUserTableProps) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/60 bg-muted/30 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
              <th className="px-6 py-3.5">Người dùng</th>
              <th className="px-6 py-3.5">Vai trò tổ chức</th>
              <th className="px-6 py-3.5">Tổ chức</th>
              <th className="px-6 py-3.5">Ngày tạo</th>
              <th className="px-6 py-3.5">Đăng nhập gần nhất</th>
              <th className="px-6 py-3.5">Quyền hệ thống</th>
              <th className="px-6 py-3.5 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 text-xs font-medium">
            {isLoadingData ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-2">
                    <RefreshCw className="w-6 h-6 animate-spin text-primary" />
                    <span>Đang tải danh sách người dùng...</span>
                  </div>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center text-muted-foreground"
                >
                  Không tìm thấy người dùng nào phù hợp.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="hover:bg-muted/20 transition-colors">
                  {/* Email & Name */}
                  <td className="px-6 py-4">
                    <div className="space-y-0.5">
                      <p className="font-bold text-foreground">
                        {u.email || "Chưa có email"}
                      </p>
                      {u.full_name && (
                        <p className="text-[11px] text-muted-foreground">
                          {u.full_name}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* Role Organization */}
                  <td className="px-6 py-4 text-muted-foreground font-semibold">
                    {u.role_organization ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                        <Briefcase className="w-3 h-3" />
                        {u.role_organization}
                      </span>
                    ) : (
                      <span className="text-muted-foreground/60 italic">—</span>
                    )}
                  </td>

                  {/* Organization Name */}
                  <td className="px-6 py-4 font-medium text-[12px] text-foreground">
                    {u.name_organization ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/60 text-foreground font-semibold">
                        <Building2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        {u.name_organization}
                      </span>
                    ) : (
                      <span className="text-muted-foreground/60 italic">—</span>
                    )}
                  </td>

                  {/* Created At */}
                  <td className="px-6 py-4 text-muted-foreground">
                    {new Date(u.created_at).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>

                  {/* Last Sign In */}
                  <td className="px-6 py-4 text-muted-foreground">
                    {u.last_sign_in_at
                      ? new Date(u.last_sign_in_at).toLocaleDateString(
                          "vi-VN",
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )
                      : "Chưa từng đăng nhập"}
                  </td>

                  {/* System Role Badge */}
                  <td className="px-6 py-4">
                    {u.is_admin ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                        <ShieldCheck className="w-3 h-3" /> Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-muted text-muted-foreground border border-border/60 uppercase tracking-wider">
                        <Shield className="w-3 h-3" /> User
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEditUser(u)}
                        title="Chỉnh sửa thông tin profile người dùng"
                        className="h-8 text-xs font-semibold px-2.5 gap-1.5 cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Sửa</span>
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDeleteUser(u.id, u.email)}
                        title="Xóa vĩnh viễn tài khoản này"
                        className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
