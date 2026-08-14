"use client";

import { useState, useEffect, startTransition } from "react";
import {
  UserCheck,
  Mail,
  User as UserIcon,
  Briefcase,
  Building2,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  updateUserProfileAccount,
  type AdminUserItem,
} from "@/app/admin/actions";
import {
  getAdminOrganizations,
  type AdminOrgItem,
} from "@/app/admin/organizations/actions";

interface EditUserModalProps {
  user: AdminUserItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditUserModal({
  user,
  isOpen,
  onClose,
  onSuccess,
}: EditUserModalProps) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [roleOrganization, setRoleOrganization] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [organizations, setOrganizations] = useState<AdminOrgItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (isOpen) {
      getAdminOrganizations()
        .then((res) => {
          if (isMounted && res.organizations) {
            startTransition(() => {
              setOrganizations(res.organizations);
            });
          }
        })
        .catch(() => {});
    }
    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  useEffect(() => {
    if (user) {
      startTransition(() => {
        setEmail(user.email || "");
        setFullName(user.full_name || "");
        setRoleOrganization(user.role_organization || "");
        setOrganizationId(user.organization_id || "");
        setErrorMsg(null);
      });
    }
  }, [user]);

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    const selectedOrg = organizations.find((o) => o.id === organizationId);
    const nameOrganization = selectedOrg ? selectedOrg.name : "";

    try {
      await updateUserProfileAccount({
        userId: user.id,
        fullName: fullName.trim(),
        roleOrganization: roleOrganization.trim(),
        organizationId: organizationId.trim(),
        nameOrganization: nameOrganization.trim(),
      });

      onSuccess();
      onClose();
    } catch (err: any) {
      setErrorMsg(err?.message || "Đã xảy ra lỗi khi cập nhật tài khoản.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[460px] p-6 space-y-4 rounded-2xl">
        <DialogHeader className="space-y-1 text-left">
          <div className="flex items-center gap-2 text-primary">
            <div className="p-2 rounded-xl bg-primary/10">
              <UserCheck className="w-5 h-5 text-primary" />
            </div>
            <DialogTitle className="text-xl font-bold font-display">
              Chỉnh sửa thông tin Người dùng
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Cập nhật thông tin profile và tổ chức cho tài khoản ({user.email}).
          </DialogDescription>
        </DialogHeader>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {/* Email (Disabled) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">
              Địa chỉ Email (Không thể thay đổi)
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                disabled
                value={email}
                className="pl-10 h-10 text-xs rounded-xl bg-muted/60 text-muted-foreground cursor-not-allowed border-border/40"
              />
            </div>
          </div>

          {/* Họ và tên */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">
              Họ và tên
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="vd: Nguyễn Văn A"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="pl-10 h-10 text-xs rounded-xl bg-muted/30"
              />
            </div>
          </div>

          {/* Vai trò tổ chức (role_organization) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">
              Vai trò tổ chức (role_organization)
            </label>
            <Select
              value={roleOrganization || "none"}
              onValueChange={(val) =>
                setRoleOrganization(val === "none" ? "" : val)
              }
            >
              <SelectTrigger className="h-10 text-xs rounded-xl bg-muted/30">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="w-4 h-4 shrink-0 text-muted-foreground" />
                  <SelectValue placeholder="Chọn vai trò tổ chức..." />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Chưa chọn vai trò</SelectItem>
                <SelectItem value="owner">Owner (Chủ sở hữu)</SelectItem>
                <SelectItem value="staff">Staff (Nhân viên)</SelectItem>
                <SelectItem value="lock">Lock (Bị khóa)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Chọn Tổ chức (organization_id) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">
              Tổ chức (organization_id)
            </label>
            <Select
              value={organizationId || "none"}
              onValueChange={(val) =>
                setOrganizationId(val === "none" ? "" : val)
              }
            >
              <SelectTrigger className="h-10 text-xs rounded-xl bg-muted/30">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="w-4 h-4 shrink-0 text-muted-foreground" />
                  <SelectValue placeholder="Chọn tổ chức..." />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Chưa chọn tổ chức</SelectItem>
                {organizations.map((org) => (
                  <SelectItem key={org.id} value={org.id}>
                    {org.name} {org.code ? `(${org.code})` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              className="rounded-xl h-10 text-xs font-bold gap-2"
            >
              {isLoading ? (
                "Đang lưu..."
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>Lưu thay đổi</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
