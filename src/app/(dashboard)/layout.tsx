import Navbar from "@/components/shared/navbar";
import React from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Navbar />
      <main className="flex-1 pl-24 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
