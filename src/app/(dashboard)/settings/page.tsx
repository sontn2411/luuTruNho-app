"use client";

import React, { useState } from "react";
import { Settings } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import SettingsNavTabs from "@/components/settings/SettingsNavTabs";
import GeneralSettingsTab from "@/components/settings/GeneralSettingsTab";
import RoomsSettingsTab from "@/components/settings/RoomsSettingsTab";
import BookingSettingsTab from "@/components/settings/BookingSettingsTab";
import NotificationSettingsTab from "@/components/settings/NotificationSettingsTab";
import SecuritySettingsTab from "@/components/settings/SecuritySettingsTab";
import DatabaseSettingsTab from "@/components/settings/DatabaseSettingsTab";
import { SettingsTabId } from "@/components/settings/types";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTabId>("general");

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralSettingsTab />;
      case "rooms":
        return <RoomsSettingsTab />;
      case "booking":
        return <BookingSettingsTab />;
      case "notifications":
        return <NotificationSettingsTab />;
      case "security":
        return <SecuritySettingsTab />;
      case "database":
        return <DatabaseSettingsTab />;
      default:
        return <GeneralSettingsTab />;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-6">
      {/* Header trang Cài đặt */}
      <PageHeader
        icon={Settings}
        title="Cài đặt hệ thống"
        description="Quản lý cấu hình thông tin khách sạn, quy định phòng, tài khoản thanh toán QR, thông báo, bảo mật và kết nối cơ sở dữ liệu Supabase."
      />

      {/* Bố cục 2 cột Linear Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        {/* Cột Sidebar Điều hướng bên trái */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-6">
            <SettingsNavTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </div>

        {/* Cột Nội dung Cài đặt rộng rãi bên phải */}
        <div className="lg:col-span-8 xl:col-span-9 transition-all">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
