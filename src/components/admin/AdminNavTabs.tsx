"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Building2 } from "lucide-react";

export function AdminNavTabs() {
  const pathname = usePathname();

  const isUsers = pathname === "/admin";
  const isOrganizations = pathname.startsWith("/admin/organizations");

  return (
    <div className="flex items-center gap-2 border-b border-border/60 pb-3">
      <Link
        href="/admin"
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
          isUsers
            ? "bg-primary text-primary-foreground shadow-xs"
            : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-accent"
        }`}
      >
        <Users className="w-4 h-4" />
        <span>Quản lý Người dùng</span>
      </Link>

      <Link
        href="/admin/organizations"
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
          isOrganizations
            ? "bg-primary text-primary-foreground shadow-xs"
            : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-accent"
        }`}
      >
        <Building2 className="w-4 h-4" />
        <span>Quản lý Tổ chức</span>
      </Link>
    </div>
  );
}
