/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import { Building2 } from "lucide-react";
import { useLoading } from "@/providers/LoadingProvider";
import {
  getAdminOrganizations,
  deleteOrganization,
  type AdminOrgItem,
} from "./actions";

import { OrganizationHeader } from "@/components/admin/organizations/OrganizationHeader";
import { AdminNavTabs } from "@/components/admin/AdminNavTabs";
import { OrganizationStatsCards } from "@/components/admin/organizations/OrganizationStatsCards";
import { OrganizationSearchToolbar } from "@/components/admin/organizations/OrganizationSearchToolbar";
import { OrganizationTable } from "@/components/admin/organizations/OrganizationTable";
import { AdminConfigAlert } from "@/components/admin/AdminConfigAlert";
import { CreateOrganizationModal } from "@/components/admin/organizations/CreateOrganizationModal";
import { EditOrganizationModal } from "@/components/admin/organizations/EditOrganizationModal";

export default function AdminOrganizationsPage() {
  const { showLoading, hideLoading } = useLoading();
  const [organizations, setOrganizations] = useState<AdminOrgItem[]>([]);
  const [isConfigured, setIsConfigured] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState<AdminOrgItem | null>(null);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setIsLoadingData(true);
    setErrorMessage(null);
    try {
      const result = await getAdminOrganizations();
      setOrganizations(result.organizations);
      setIsConfigured(result.isConfigured);
      if (result.message) {
        setErrorMessage(result.message);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Không thể tải danh sách tổ chức.");
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    getAdminOrganizations()
      .then((result) => {
        if (!isMounted) return;
        setOrganizations(result.organizations);
        setIsConfigured(result.isConfigured);
        if (result.message) {
          setErrorMessage(result.message);
        }
      })
      .catch((err: any) => {
        if (!isMounted) return;
        setErrorMessage(err?.message || "Không thể tải danh sách tổ chức.");
      })
      .finally(() => {
        if (isMounted) setIsLoadingData(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDeleteOrg = async (id: string, name: string) => {
    if (
      !confirm(
        `⚠️ HÀNH ĐỘNG NÀY KHÔNG THỂ HOÀN TÁC!\n\nBạn có chắc chắn muốn xóa vĩnh viễn tổ chức: ${name}?`
      )
    ) {
      return;
    }

    showLoading("Đang xóa tổ chức khỏi hệ thống...");
    try {
      await deleteOrganization(id);
      setActionSuccessMessage(`Đã xóa tổ chức "${name}" thành công!`);
      setTimeout(() => setActionSuccessMessage(null), 4000);
      await loadData();
    } catch (err: any) {
      alert(err?.message || "Xóa tổ chức thất bại.");
    } finally {
      hideLoading();
    }
  };

  const handleOrgCreated = () => {
    setActionSuccessMessage("Đã tạo tổ chức mới thành công!");
    setTimeout(() => setActionSuccessMessage(null), 4000);
    loadData();
  };

  const handleOrgUpdated = () => {
    setActionSuccessMessage("Đã cập nhật thông tin tổ chức thành công!");
    setTimeout(() => setActionSuccessMessage(null), 4000);
    loadData();
  };

  const filteredOrgs = organizations.filter((org) => {
    const q = searchQuery.toLowerCase();
    return (
      org.name.toLowerCase().includes(q) ||
      (org.code && org.code.toLowerCase().includes(q)) ||
      (org.email && org.email.toLowerCase().includes(q)) ||
      (org.address && org.address.toLowerCase().includes(q)) ||
      org.id.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <OrganizationHeader
        isLoadingData={isLoadingData}
        onRefresh={loadData}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
      />

      {/* Navigation Tabs */}
      <AdminNavTabs />

      {/* Success Banner */}
      {actionSuccessMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-sm font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <Building2 className="w-5 h-5 shrink-0 text-emerald-600" />
          <span>{actionSuccessMessage}</span>
        </div>
      )}

      {/* Config & Warning Alerts */}
      <AdminConfigAlert isConfigured={isConfigured} errorMessage={errorMessage} />

      {/* Stats Cards */}
      <OrganizationStatsCards totalOrganizations={organizations.length} />

      {/* Search Toolbar */}
      <OrganizationSearchToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filteredCount={filteredOrgs.length}
        totalCount={organizations.length}
      />

      {/* Organization Table */}
      <OrganizationTable
        organizations={filteredOrgs}
        isLoadingData={isLoadingData}
        onEditOrg={(org) => setEditingOrg(org)}
        onDeleteOrg={handleDeleteOrg}
      />

      {/* Modal Tạo mới */}
      <CreateOrganizationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleOrgCreated}
      />

      {/* Modal Chỉnh sửa */}
      <EditOrganizationModal
        organization={editingOrg}
        isOpen={editingOrg !== null}
        onClose={() => setEditingOrg(null)}
        onSuccess={handleOrgUpdated}
      />
    </div>
  );
}
