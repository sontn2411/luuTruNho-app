"use client";

import { useState } from "react";
import { Building2, Mail, Phone, MapPin, Tag, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { createOrganization } from "@/app/admin/organizations/actions";

interface CreateOrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateOrganizationModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateOrganizationModalProps) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      await createOrganization({
        name: name.trim(),
        code: code.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
      });

      setName("");
      setCode("");
      setEmail("");
      setPhone("");
      setAddress("");
      onSuccess();
      onClose();
    } catch (err: any) {
      setErrorMsg(err?.message || "Đã xảy ra lỗi khi tạo tổ chức.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[480px] p-6 space-y-4 rounded-2xl">
        <DialogHeader className="space-y-1 text-left">
          <div className="flex items-center gap-2 text-primary">
            <div className="p-2 rounded-xl bg-primary/10">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <DialogTitle className="text-xl font-bold font-display">
              Tạo Tổ chức mới
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Nhập thông tin chi nhánh / homestay / chuỗi vận hành để thêm vào hệ thống.
          </DialogDescription>
        </DialogHeader>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {/* Tên Tổ chức */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">
              Tên Tổ chức <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <Building2 className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                required
                placeholder="vd: StayFlow Homestay Đà Lạt"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 h-10 text-xs rounded-xl bg-muted/30"
              />
            </div>
          </div>

          {/* Mã Định danh */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">
              Mã Tổ chức (Code)
            </label>
            <div className="relative">
              <Tag className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="vd: STAYFLOW-DL01"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="pl-10 h-10 text-xs rounded-xl bg-muted/30 uppercase font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Email liên hệ</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="contact@stayflow.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-10 text-xs rounded-xl bg-muted/30"
                />
              </div>
            </div>

            {/* Số điện thoại */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Số điện thoại</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="0912 345 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10 h-10 text-xs rounded-xl bg-muted/30"
                />
              </div>
            </div>
          </div>

          {/* Địa chỉ */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">Địa chỉ trụ sở / chi nhánh</label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="vd: 123 Phường 1, TP. Đà Lạt"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="pl-10 h-10 text-xs rounded-xl bg-muted/30"
              />
            </div>
          </div>

          <DialogFooter className="pt-2 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-xl h-10 text-xs font-medium"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="rounded-xl h-10 text-xs font-bold gap-2 cursor-pointer"
            >
              {isLoading ? (
                "Đang tạo..."
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Tạo tổ chức</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
