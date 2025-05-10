import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="grid min-h-screen grid-rows-[var(--header-height)_1fr]">
        <SiteHeader />
        <div className="grid grid-cols-[auto_1fr]">
          <AppSidebar />
          <main className="bg-muted/40">
            <ScrollArea className="h-[calc(100vh-var(--header-height))]">
              <div className="container mx-auto p-6">
                {children}
              </div>
            </ScrollArea>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
