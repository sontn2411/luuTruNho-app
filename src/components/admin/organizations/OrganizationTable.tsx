"use client";

import { useState } from "react";
import { Building2, Pencil, Trash2, Copy, Check, RefreshCw, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AdminOrgItem } from "@/app/admin/organizations/actions";

interface OrganizationTableProps {
  organizations: AdminOrgItem[];
  isLoadingData: boolean;
  onEditOrg: (org: AdminOrgItem) => void;
  onDeleteOrg: (id: string, name: string) => void;
}

export function OrganizationTable({
  organizations,
  isLoadingData,
  onEditOrg,
  onDeleteOrg,
}: OrganizationTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/60 bg-muted/30 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
              <th className="px-6 py-3.5">Tên Tổ chức / Mã</th>
              <th className="px-6 py-3.5">Liên hệ</th>
              <th className="px-6 py-3.5">Địa chỉ</th>
              <th className="px-6 py-3.5">Ngày tạo</th>
              <th className="px-6 py-3.5 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 text-xs font-medium">
            {isLoadingData ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <RefreshCw className="w-6 h-6 animate-spin text-primary" />
                    <span>Đang tải danh sách tổ chức...</span>
                  </div>
                </td>
              </tr>
            ) : organizations.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                  Không tìm thấy tổ chức nào phù hợp.
                </td>
              </tr>
            ) : (
              organizations.map((org) => (
                <tr key={org.id} className="hover:bg-muted/20 transition-colors">
                  {/* Name & Code / ID */}
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-primary shrink-0" />
                        <span className="font-bold text-foreground text-sm">{org.name}</span>
                        {org.code && (
                          <span className="px-2 py-0.5 rounded-md bg-secondary/15 text-secondary font-mono text-[10px] font-extrabold border border-secondary/30">
                            {org.code}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
                        <span>ID: {org.id}</span>
                        <button
                          onClick={() => copyToClipboard(org.id)}
                          className="p-0.5 hover:text-foreground transition-colors cursor-pointer"
                          title="Sao chép ID"
                        >
                          {copiedId === org.id ? (
                            <Check className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Contact Info */}
                  <td className="px-6 py-4 text-muted-foreground">
                    <div className="space-y-1">
                      {org.email && (
                        <div className="flex items-center gap-1.5 text-xs text-foreground font-medium">
                          <Mail className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          <span>{org.email}</span>
                        </div>
                      )}
                      {org.phone && (
                        <div className="flex items-center gap-1.5 text-xs">
                          <Phone className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          <span>{org.phone}</span>
                        </div>
                      )}
                      {!org.email && !org.phone && <span>Chưa cập nhật</span>}
                    </div>
                  </td>

                  {/* Address */}
                  <td className="px-6 py-4 text-muted-foreground max-w-[200px] truncate">
                    {org.address ? (
                      <div className="flex items-center gap-1.5 truncate" title={org.address}>
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <span className="truncate">{org.address}</span>
                      </div>
                    ) : (
                      "Chưa cập nhật"
                    )}
                  </td>

                  {/* Created At */}
                  <td className="px-6 py-4 text-muted-foreground">
                    {new Date(org.created_at).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEditOrg(org)}
                        title="Chỉnh sửa thông tin tổ chức"
                        className="h-8 text-xs font-semibold px-2.5 gap-1.5 cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Sửa</span>
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDeleteOrg(org.id, org.name)}
                        title="Xóa tổ chức này"
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
