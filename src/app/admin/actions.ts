"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export interface AdminUserItem {
  id: string;
  email: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  is_admin: boolean;
  phone: string | null;
  full_name: string | null;
  organization_id: string | null;
  role_organization: string | null;
  name_organization: string | null;
}

// Kiểm tra quyền truy cập Super Admin phía Server
async function verifySuperAdminAccess() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Vui lòng đăng nhập để thực hiện thao tác này.");
  }

  const superAdminEmail =
    process.env.SUPER_ADMIN_EMAIL || "sontn2411@gmail.com";
  const isSuperAdminEmail =
    user.email?.toLowerCase() === superAdminEmail.toLowerCase();
  const isAdminMetadata =
    user.app_metadata?.is_admin === true ||
    user.user_metadata?.is_admin === true;

  if (!isSuperAdminEmail && !isAdminMetadata) {
    throw new Error(
      `Quyền truy cập bị từ chối: Tài khoản (${user.email}) không có quyền Super Admin!`,
    );
  }

  return user;
}

// 1. Lấy danh sách toàn bộ người dùng từ auth.users
export async function getAdminUsers(): Promise<{
  users: AdminUserItem[];
  isConfigured: boolean;
  message?: string;
}> {
  await verifySuperAdminAccess();

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey || serviceRoleKey.trim() === "") {
    return {
      users: [],
      isConfigured: false,
      message:
        "Chưa cấu hình SUPABASE_SERVICE_ROLE_KEY trong file .env.local. Vui lòng thêm key để tải danh sách người dùng.",
    };
  }

  try {
    const adminClient = createAdminClient();
    const { data, error } = await adminClient.auth.admin.listUsers();

    if (error) {
      throw new Error(
        `Lỗi khi lấy danh sách user từ Supabase: ${error.message}`,
      );
    }
    // console.log("=====ssss====", data);
    const users: AdminUserItem[] = (data?.users || []).map((u) => {
      const isAdmin =
        u.app_metadata?.is_admin === true || u.user_metadata?.is_admin === true;

      const data = u.user_metadata;
      return {
        id: u.id,
        email: u.email ?? null,
        created_at: u.created_at,
        last_sign_in_at: u.last_sign_in_at ?? null,
        is_admin: isAdmin,
        phone: u.phone ?? null,
        full_name: u.user_metadata?.full_name ?? u.user_metadata?.name ?? null,
        organization_id: data.organization_id ?? null,
        role_organization: data.role_organization ?? null,
        name_organization: data.name_organization ?? null,
      };
    });

    return {
      users,
      isConfigured: true,
    };
  } catch (err: any) {
    return {
      users: [],
      isConfigured: true,
      message: err?.message || "Đã xảy ra lỗi khi truy vấn dữ liệu Admin.",
    };
  }
}

// 2. Chuyển đổi quyền Admin (Toggle Admin Role)
export async function toggleUserAdminRole(
  targetUserId: string,
  newIsAdminStatus: boolean,
) {
  await verifySuperAdminAccess();

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey || serviceRoleKey.trim() === "") {
    throw new Error(
      "Chưa cấu hình SUPABASE_SERVICE_ROLE_KEY trong file .env.local",
    );
  }

  const adminClient = createAdminClient();

  // Cập nhật app_metadata và user_metadata trong auth.users
  const { error: updateAuthError } =
    await adminClient.auth.admin.updateUserById(targetUserId, {
      app_metadata: { is_admin: newIsAdminStatus },
      user_metadata: { is_admin: newIsAdminStatus },
    });

  if (updateAuthError) {
    throw new Error(`Cập nhật Auth thất bại: ${updateAuthError.message}`);
  }

  // Cập nhật vào bảng profiles nếu tồn tại
  try {
    await adminClient
      .from("profiles")
      .update({ is_admin: newIsAdminStatus })
      .eq("id", targetUserId);
  } catch {
    // Bỏ qua nếu bảng profiles chưa được tạo
  }

  return { success: true };
}

// 3. Xóa tài khoản người dùng khỏi auth.users
export async function deleteUserAccount(targetUserId: string) {
  const currentUser = await verifySuperAdminAccess();

  if (currentUser.id === targetUserId) {
    throw new Error("Bạn không thể tự xóa tài khoản của chính mình!");
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey || serviceRoleKey.trim() === "") {
    throw new Error(
      "Chưa cấu hình SUPABASE_SERVICE_ROLE_KEY trong file .env.local",
    );
  }

  const adminClient = createAdminClient();
  const { error } = await adminClient.auth.admin.deleteUser(targetUserId);

  if (error) {
    throw new Error(`Xóa tài khoản thất bại: ${error.message}`);
  }

  return { success: true };
}

// 4. Tạo tài khoản người dùng mới
export async function createNewUserAccount({
  email,
  password,
  fullName,
  isAdmin,
}: {
  email: string;
  password: string;
  fullName?: string;
  isAdmin?: boolean;
}) {
  await verifySuperAdminAccess();

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey || serviceRoleKey.trim() === "") {
    throw new Error(
      "Chưa cấu hình SUPABASE_SERVICE_ROLE_KEY trong file .env.local",
    );
  }

  if (!email || !email.includes("@")) {
    throw new Error("Vui lòng nhập định dạng email hợp lệ.");
  }

  if (!password || password.length < 6) {
    throw new Error("Mật khẩu phải có ít nhất 6 ký tự.");
  }

  const adminClient = createAdminClient();

  const { data, error } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName || "",
      is_admin: isAdmin ?? false,
    },
    app_metadata: {
      is_admin: isAdmin ?? false,
    },
  });

  if (error) {
    throw new Error(`Tạo tài khoản thất bại: ${error.message}`);
  }

  if (data.user) {
    try {
      await adminClient.from("profiles").upsert({
        id: data.user.id,
        email: data.user.email,
        full_name: fullName || "",
        is_admin: isAdmin ?? false,
      });
    } catch {
      // Bỏ qua nếu bảng profiles chưa được tạo
    }
  }

  return { success: true, user: data.user };
}

// 5. Cập nhật thông tin profile của người dùng
export async function updateUserProfileAccount({
  userId,
  email,
  fullName,
  roleOrganization,
  organizationId,
  nameOrganization,
  password,
}: {
  userId: string;
  email?: string;
  fullName?: string;
  roleOrganization?: string;
  organizationId?: string;
  nameOrganization?: string;
  password?: string;
}) {
  await verifySuperAdminAccess();

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey || serviceRoleKey.trim() === "") {
    throw new Error(
      "Chưa cấu hình SUPABASE_SERVICE_ROLE_KEY trong file .env.local",
    );
  }

  const adminClient = createAdminClient();

  const { data: userData, error: getUserError } =
    await adminClient.auth.admin.getUserById(userId);
  if (getUserError) {
    throw new Error(
      `Không lấy được thông tin người dùng: ${getUserError.message}`,
    );
  }

  const existingMeta = userData.user?.user_metadata || {};

  const updateAttributes: Record<string, any> = {
    user_metadata: {
      ...existingMeta,
      full_name: fullName !== undefined ? fullName : existingMeta.full_name,
      role_organization:
        roleOrganization !== undefined
          ? roleOrganization
          : existingMeta.role_organization,
      organization_id:
        organizationId !== undefined
          ? organizationId
          : existingMeta.organization_id,
      name_organization:
        nameOrganization !== undefined
          ? nameOrganization
          : existingMeta.name_organization,
    },
  };

  if (email && email.trim() !== "") {
    if (!email.includes("@")) {
      throw new Error("Vui lòng nhập định dạng email hợp lệ.");
    }
    updateAttributes.email = email.trim();
    updateAttributes.email_confirm = true;
  }

  if (password && password.trim() !== "") {
    if (password.length < 6) {
      throw new Error("Mật khẩu mới phải có ít nhất 6 ký tự.");
    }
    updateAttributes.password = password;
  }

  const { data, error } = await adminClient.auth.admin.updateUserById(
    userId,
    updateAttributes,
  );

  if (error) {
    throw new Error(`Cập nhật thông tin thất bại: ${error.message}`);
  }

  // Cập nhật thông tin trong bảng profiles nếu có
  try {
    const profileUpdateData: Record<string, any> = {};
    if (fullName !== undefined) profileUpdateData.full_name = fullName;
    if (roleOrganization !== undefined)
      profileUpdateData.role_organization = roleOrganization;
    if (organizationId !== undefined)
      profileUpdateData.organization_id = organizationId;
    if (nameOrganization !== undefined)
      profileUpdateData.name_organization = nameOrganization;
    if (email) profileUpdateData.email = email;

    if (Object.keys(profileUpdateData).length > 0) {
      await adminClient
        .from("profiles")
        .update(profileUpdateData)
        .eq("id", userId);
    }
  } catch {
    // Bỏ qua nếu bảng profiles chưa được tạo
  }

  return { success: true, user: data.user };
}
