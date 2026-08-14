"use client";

import React, { useState } from "react";
import { Building2, Save, Upload, Clock, MapPin, Trash2, ImagePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function GeneralSettingsTab() {
  const [formData, setFormData] = useState({
    hotelName: "StayFlow Hotel & Resort",
    slogan: "Trải nghiệm lưu trú hoàn hảo & hiện đại",
    taxCode: "0109876543",
    email: "contact@stayflow.com",
    phone: "0901 234 567",
    address: "123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    currency: "VND",
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Dung lượng file tối đa là 2MB!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* Thẻ Upload Logo & Nhận diện Thương hiệu */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 md:p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border/40">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center border border-secondary/20">
            <ImagePlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">
              Logo Khách sạn / Thương hiệu
            </h3>
            <p className="text-xs text-muted-foreground">
              Tải lên logo chính thức hiển thị trên hóa đơn thanh toán, phiếu đặt phòng và email xác nhận.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Vùng xem trước Logo */}
          <div className="relative group shrink-0">
            <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-border/80 bg-muted/30 flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-secondary/60">
              {logoPreview ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={logoPreview}
                  alt="Logo Khách sạn"
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                <div className="flex flex-col items-center text-muted-foreground/70 p-2 text-center">
                  <Building2 className="w-7 h-7 mb-1" />
                  <span className="text-[10px] font-semibold">Chưa có logo</span>
                </div>
              )}
            </div>

            {logoPreview && (
              <Button
                type="button"
                variant="destructive"
                size="icon-xs"
                onClick={handleRemoveLogo}
                className="absolute -top-2 -right-2 rounded-full shadow-xs"
                title="Xóa logo"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>

          {/* Bộ điều khiển Upload */}
          <div className="space-y-2.5 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("logo-file-input")?.click()}
                className="cursor-pointer font-semibold rounded-xl"
              >
                <Upload className="w-3.5 h-3.5 text-secondary mr-1.5" />
                {logoPreview ? "Thay đổi logo khác" : "Tải logo lên"}
              </Button>
              <input
                id="logo-file-input"
                type="file"
                accept="image/png, image/jpeg, image/webp, image/svg+xml"
                onChange={handleLogoUpload}
                className="hidden"
              />

              {logoPreview && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveLogo}
                  className="text-rose-500 hover:bg-rose-500/10 hover:text-rose-600 rounded-xl"
                >
                  Xóa logo
                </Button>
              )}
            </div>

            <p className="text-[11px] text-muted-foreground leading-relaxed max-w-md">
              Khuyên dùng ảnh hình vuông hoặc chữ nhật tỉ lệ 1:1, dung lượng tối đa <strong>2MB</strong>. Đột phá hiển thị tốt nhất với định dạng <strong>PNG, SVG, WEBP hoặc JPG</strong> nền trong suốt.
            </p>
          </div>
        </div>
      </div>

      {/* Thẻ Cài đặt Thông tin chính */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 md:p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border/40">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center border border-secondary/20">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">
              Thông tin Khách sạn & Thương hiệu
            </h3>
            <p className="text-xs text-muted-foreground">
              Cập nhật thông tin nhận diện cơ bản hiển thị trên hóa đơn và phiếu đặt phòng.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Tên khách sạn */}
          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Tên Khách sạn / Homestay</label>
            <Input
              type="text"
              value={formData.hotelName}
              onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })}
              required
            />
          </div>

          {/* Slogan */}
          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Khẩu hiệu (Slogan)</label>
            <Input
              type="text"
              value={formData.slogan}
              onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
            />
          </div>

          {/* Số điện thoại */}
          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Số điện thoại Hotline</label>
            <Input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Email liên hệ</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          {/* Mã số thuế */}
          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Mã số thuế doanh nghiệp</label>
            <Input
              type="text"
              value={formData.taxCode}
              onChange={(e) => setFormData({ ...formData, taxCode: e.target.value })}
            />
          </div>

          {/* Tiền tệ mặc định */}
          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Đơn vị tiền tệ hiển thị</label>
            <Select
              value={formData.currency}
              onValueChange={(val) => setFormData({ ...formData, currency: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại tiền tệ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VND">VND (Việt Nam Đồng)</SelectItem>
                <SelectItem value="USD">USD (Đô la Mỹ)</SelectItem>
                <SelectItem value="EUR">EUR (Euro)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Địa chỉ */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="font-semibold text-foreground flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
              Địa chỉ chi tiết
            </label>
            <Input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Thẻ Cài đặt Giờ quy định */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 md:p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border/40">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center border border-secondary/20">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">
              Quy định Giờ Nhận & Trả Phòng
            </h3>
            <p className="text-xs text-muted-foreground">
              Khung giờ tiêu chuẩn áp dụng tự động cho tính năng Đặt phòng & Lịch lưu trú.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Giờ Check-in tiêu chuẩn</label>
            <Input
              type="time"
              value={formData.checkInTime}
              onChange={(e) => setFormData({ ...formData, checkInTime: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Giờ Check-out tiêu chuẩn</label>
            <Input
              type="time"
              value={formData.checkOutTime}
              onChange={(e) => setFormData({ ...formData, checkOutTime: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Action Save Button */}
      <div className="flex items-center justify-end gap-3 pt-2">
        {isSaved && (
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            ✓ Đã lưu thay đổi thành công!
          </span>
        )}
        <Button
          type="submit"
          variant="secondary"
          size="lg"
          className="active:scale-95 shadow-xs cursor-pointer"
        >
          <Save className="w-4 h-4 mr-1.5" />
          <span>Lưu thông tin cài đặt</span>
        </Button>
      </div>
    </form>
  );
}

export default GeneralSettingsTab;
