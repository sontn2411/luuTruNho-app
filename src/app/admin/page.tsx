/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import { UserCheck } from "lucide-react";
import { useLoading } from "@/providers/LoadingProvider";
import {
  getAdminUsers,
  deleteUserAccount,
  type AdminUserItem,
} from "./actions";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminNavTabs } from "@/components/admin/AdminNavTabs";
import { AdminStatsCards } from "@/components/admin/AdminStatsCards";
import { AdminSearchToolbar } from "@/components/admin/AdminSearchToolbar";
import { AdminUserTable } from "@/components/admin/AdminUserTable";
import { AdminConfigAlert } from "@/components/admin/AdminConfigAlert";
import { CreateUserModal } from "@/components/admin/CreateUserModal";
import { EditUserModal } from "@/components/admin/EditUserModal";

export default function AdminPage() {
  const { showLoading, hideLoading } = useLoading();
  const [users, setUsers] = useState<AdminUserItem[]>([]);
  const [isConfigured, setIsConfigured] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUserItem | null>(null);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<
    string | null
  >(null);

  const loadData = useCallback(async () => {
    setIsLoadingData(true);
    setErrorMessage(null);
    try {
      const result = await getAdminUsers();

      setUsers(result.users);
      setIsConfigured(result.isConfigured);
      if (result.message) {
        setErrorMessage(result.message);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Không thể tải danh sách người dùng.");
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    getAdminUsers()
      .then((result) => {
        if (!isMounted) return;
        console.log("=======res", result);
        setUsers(result.users);
        setIsConfigured(result.isConfigured);
        if (result.message) {
          setErrorMessage(result.message);
        }
      })
      .catch((err: any) => {
        if (!isMounted) return;
        setErrorMessage(err?.message || "Không thể tải danh sách người dùng.");
      })
      .finally(() => {
        if (isMounted) setIsLoadingData(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDeleteUser = async (userId: string, email: string | null) => {
    if (
      !confirm(
        `⚠️ HÀNH ĐỘNG NÀY KHÔNG THỂ HOÀN TÁC!\n\nBạn có chắc chắn muốn xóa vĩnh viễn tài khoản: ${
          email || userId
        }?`,
      )
    ) {
      return;
    }

    showLoading("Đang xóa tài khoản khỏi hệ thống...");
    try {
      await deleteUserAccount(userId);
      setActionSuccessMessage(`Đã xóa tài khoản thành công!`);
      setTimeout(() => setActionSuccessMessage(null), 4000);
      await loadData();
    } catch (err: any) {
      alert(err?.message || "Xóa tài khoản thất bại.");
    } finally {
      hideLoading();
    }
  };

  const handleUserCreated = () => {
    setActionSuccessMessage("Đã tạo tài khoản mới thành công!");
    setTimeout(() => setActionSuccessMessage(null), 4000);
    loadData();
  };

  const handleUserUpdated = () => {
    setActionSuccessMessage("Đã cập nhật thông tin người dùng thành công!");
    setTimeout(() => setActionSuccessMessage(null), 4000);
    loadData();
  };

  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase();
    return (
      (u.email && u.email.toLowerCase().includes(q)) ||
      (u.full_name && u.full_name.toLowerCase().includes(q)) ||
      u.id.toLowerCase().includes(q)
    );
  });

  const totalUsers = users.length;
  const totalAdmins = users.filter((u) => u.is_admin).length;
  const totalRegularUsers = totalUsers - totalAdmins;

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <AdminHeader
        isLoadingData={isLoadingData}
        onRefresh={loadData}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
      />

      {/* Navigation Tabs */}
      <AdminNavTabs />

      {/* Success Notification Banner */}
      {actionSuccessMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-sm font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <UserCheck className="w-5 h-5 shrink-0 text-emerald-600" />
          <span>{actionSuccessMessage}</span>
        </div>
      )}

      {/* Config & Access Warnings */}
      <AdminConfigAlert
        isConfigured={isConfigured}
        errorMessage={errorMessage}
      />

      {/* Stats Overview Cards */}
      <AdminStatsCards
        totalUsers={totalUsers}
        totalAdmins={totalAdmins}
        totalRegularUsers={totalRegularUsers}
      />

      {/* Search Toolbar */}
      <AdminSearchToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filteredCount={filteredUsers.length}
        totalCount={totalUsers}
      />

      {/* User Data Table */}
      <AdminUserTable
        users={filteredUsers}
        isLoadingData={isLoadingData}
        onEditUser={(user) => setEditingUser(user)}
        onDeleteUser={handleDeleteUser}
      />

      {/* Modal Tạo Người Dùng Mới */}
      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleUserCreated}
      />

      {/* Modal Chỉnh Sửa Profile Người Dùng */}
      <EditUserModal
        user={editingUser}
        isOpen={editingUser !== null}
        onClose={() => setEditingUser(null)}
        onSuccess={handleUserUpdated}
      />
    </div>
  );
}
