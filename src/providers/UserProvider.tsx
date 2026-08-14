"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUserStore } from "@/stores/useUserStore";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const fetchUser = useUserStore((state) => state.fetchUser);
  const setUser = useUserStore((state) => state.setUser);
  const reset = useUserStore((state) => state.reset);

  useEffect(() => {
    // 1. Tải thông tin user và profile ban đầu
    fetchUser();

    // 2. Lắng nghe sự kiện đăng nhập / đăng xuất realtime từ Supabase Auth
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        fetchUser();
      } else if (event === "SIGNED_OUT") {
        reset();
      } else {
        setUser(session?.user ?? null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchUser, setUser, reset]);

  return <>{children}</>;
}
