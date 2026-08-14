"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export interface AdminOrgItem {
  id: string;
  name: string;
  code: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  created_at: string;
}

// Kiểm tra quyền Super Admin phía Server
async function verifySuperAdminAccess() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Vui lòng đăng nhập để thực hiện thao tác này.");
  }

  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || "sontn2411@gmail.com";
  const isSuperAdminEmail = user.email?.toLowerCase() === superAdminEmail.toLowerCase();
  const isAdminMetadata =
    user.app_metadata?.is_admin === true ||
    user.user_metadata?.is_admin === true;

  if (!isSuperAdminEmail && !isAdminMetadata) {
    throw new Error(
      `Quyền truy cập bị từ chối: Tài khoản (${user.email}) không có quyền Super Admin!`
    );
  }

  return user;
}

// 1. Lấy danh sách toàn bộ tổ chức từ public.organizations
export async function getAdminOrganizations(): Promise<{
  organizations: AdminOrgItem[];
  isConfigured: boolean;
  message?: string;
}> {
  await verifySuperAdminAccess();

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey || serviceRoleKey.trim() === "") {
    return {
      organizations: [],
      isConfigured: false,
      message:
        "Chưa cấu hình SUPABASE_SERVICE_ROLE_KEY trong file .env.local. Vui lòng thêm key để truy vấn dữ liệu.",
    };
  }

  try {
    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from("organizations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      // Nếu bảng chưa tồn tại trong Database
      if (error.code === "42P01") {
        return {
          organizations: [],
          isConfigured: true,
          message:
            "Bảng 'public.organizations' chưa tồn tại trong Supabase Database. Vui lòng tạo bảng 'organizations' trong SQL Editor.",
        };
      }
      throw new Error(`Lỗi khi lấy danh sách tổ chức: ${error.message}`);
    }

    const organizations: AdminOrgItem[] = (data || []).map((org) => ({
      id: org.id,
      name: org.name || "Chưa đặt tên",
      code: org.code ?? null,
      email: org.email ?? null,
      phone: org.phone ?? null,
      address: org.address ?? null,
      created_at: org.created_at || new Date().toISOString(),
    }));

    return {
      organizations,
      isConfigured: true,
    };
  } catch (err: any) {
    return {
      organizations: [],
      isConfigured: true,
      message: err?.message || "Đã xảy ra lỗi khi truy vấn danh sách tổ chức.",
    };
  }
}

// 2. Tạo tổ chức mới
export async function createOrganization({
  name,
  code,
  email,
  phone,
  address,
}: {
  name: string;
  code?: string;
  email?: string;
  phone?: string;
  address?: string;
}) {
  await verifySuperAdminAccess();

  if (!name || name.trim() === "") {
    throw new Error("Vui lòng nhập tên tổ chức.");
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey || serviceRoleKey.trim() === "") {
    throw new Error("Chưa cấu hình SUPABASE_SERVICE_ROLE_KEY trong file .env.local");
  }

  const adminClient = createAdminClient();

  const insertData: Record<string, any> = {
    name: name.trim(),
    code: code?.trim() || null,
    email: email?.trim() || null,
    phone: phone?.trim() || null,
    address: address?.trim() || null,
  };

  const { data, error } = await adminClient
    .from("organizations")
    .insert(insertData)
    .select()
    .single();

  if (error) {
    throw new Error(`Tạo tổ chức thất bại: ${error.message}`);
  }

  return { success: true, organization: data };
}

// 3. Cập nhật thông tin tổ chức
export async function updateOrganization({
  id,
  name,
  code,
  email,
  phone,
  address,
}: {
  id: string;
  name: string;
  code?: string;
  email?: string;
  phone?: string;
  address?: string;
}) {
  await verifySuperAdminAccess();

  if (!name || name.trim() === "") {
    throw new Error("Vui lòng nhập tên tổ chức.");
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey || serviceRoleKey.trim() === "") {
    throw new Error("Chưa cấu hình SUPABASE_SERVICE_ROLE_KEY trong file .env.local");
  }

  const adminClient = createAdminClient();

  const updateData: Record<string, any> = {
    name: name.trim(),
    code: code?.trim() || null,
    email: email?.trim() || null,
    phone: phone?.trim() || null,
    address: address?.trim() || null,
  };

  const { data, error } = await adminClient
    .from("organizations")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Cập nhật tổ chức thất bại: ${error.message}`);
  }

  return { success: true, organization: data };
}

// 4. Xóa tổ chức
export async function deleteOrganization(id: string) {
  await verifySuperAdminAccess();

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey || serviceRoleKey.trim() === "") {
    throw new Error("Chưa cấu hình SUPABASE_SERVICE_ROLE_KEY trong file .env.local");
  }

  const adminClient = createAdminClient();

  const { error } = await adminClient
    .from("organizations")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(`Xóa tổ chức thất bại: ${error.message}`);
  }

  return { success: true };
}
