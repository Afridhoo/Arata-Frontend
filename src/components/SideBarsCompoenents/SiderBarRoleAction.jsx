import { AppSidebar } from "../app-sidebar";

import { SiteHeader } from "../site-header";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";

export default function SiderBarRoleAction({ Route, user, children }) {
  return (
    <SidebarProvider className=" --sidebar-width calc(var(--spacing) * 72) --header-height calc(var(--spacing) * 12)">
      <AppSidebar variant="inset" navMain={Route.navMain} user={user} />

      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
