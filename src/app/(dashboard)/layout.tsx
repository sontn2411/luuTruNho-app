import Navbar from "@/components/shared/navbar";
import Header from "@/components/shared/header";
import React from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const isConfigured =
    supabaseUrl &&
    !supabaseUrl.includes("placeholder") &&
    !supabaseUrl.includes("your-supabase-project");

  // Kiểm tra nếu hệ thống đã kết nối Supabase thực tế và chưa đăng nhập -> Chuyển về trang /login
  if (isConfigured && !user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Navbar />
      <div className="flex-1 pl-30 flex flex-col min-h-screen transition-all duration-300">
        <Header user={user} />
        <main className="flex-1 ">{children}</main>
      </div>
    </div>
  );
}
