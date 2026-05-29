import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { TopBar } from "@/components/dashboard/top-bar";

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <MobileNav />
        <main className="flex-1 overflow-hidden px-4 py-6 md:px-8 md:py-8">
          <div className="mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col gap-8 md:max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
