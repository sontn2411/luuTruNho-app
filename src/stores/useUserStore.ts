import { create } from "zustand";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

export interface UserProfile {
  id?: string;
  email?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  is_admin?: boolean;
  [key: string]: any;
}

export interface UserState {
  user: User | null;
  profile: UserProfile | null;
  userId: string | null;
  email: string | null;
  isAdmin: boolean;
  isLoading: boolean;
  error: Error | null;

  // Actions
  setUser: (user: User | null, profile?: UserProfile | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  reset: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  profile: null,
  userId: null,
  email: null,
  isAdmin: false,
  isLoading: true,
  error: null,

  setUser: (user, profile = null) => {
    const currentProfile = profile ?? get().profile;
    const isAdmin =
      currentProfile?.is_admin === true ||
      user?.app_metadata?.is_admin === true ||
      user?.user_metadata?.is_admin === true;

    set({
      user,
      profile: currentProfile,
      userId: user?.id ?? null,
      email: user?.email ?? null,
      isAdmin,
      isLoading: false,
      error: null,
    });
  },

  setProfile: (profile) => {
    const user = get().user;
    const isAdmin =
      profile?.is_admin === true ||
      user?.app_metadata?.is_admin === true ||
      user?.user_metadata?.is_admin === true;

    set({
      profile,
      isAdmin,
    });
  },

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error, isLoading: false }),

  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const supabase = createClient();
      const {
        data: { user },
        error: fetchError,
      } = await supabase.auth.getUser();

      if (fetchError && fetchError.name !== "AuthSessionMissingError") {
        throw fetchError;
      }

      if (!user) {
        set({
          user: null,
          profile: null,
          userId: null,
          email: null,
          isAdmin: false,
          isLoading: false,
          error: null,
        });
        return;
      }

      // Thử lấy profile từ bảng profiles trong DB
      let profileData: UserProfile | null = null;
      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        profileData = profile;
      } catch {
        // Bảng profiles có thể chưa tồn tại hoặc đổi tên
      }

      const isAdmin =
        profileData?.is_admin === true ||
        user.app_metadata?.is_admin === true ||
        user.user_metadata?.is_admin === true;

      set({
        user,
        profile: profileData,
        userId: user.id,
        email: user.email ?? null,
        isAdmin,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      set({
        user: null,
        profile: null,
        userId: null,
        email: null,
        isAdmin: false,
        isLoading: false,
        error:
          err instanceof Error
            ? err
            : new Error("Lỗi khi lấy thông tin người dùng"),
      });
    }
  },

  logout: async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Lỗi khi đăng xuất:", err);
    } finally {
      get().reset();
    }
  },

  reset: () =>
    set({
      user: null,
      profile: null,
      userId: null,
      email: null,
      isAdmin: false,
      isLoading: false,
      error: null,
    }),
}));
