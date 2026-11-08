import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import { DashboardSidebar } from "../components/DashboardSidebar"
import { Toaster } from "@/components/ui/toast"
// DashboardSidebar
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar></DashboardSidebar>

      <main>
        <SidebarTrigger />
        {children}
      </main>
      <Toaster></Toaster>
    </SidebarProvider>
  )
}

export default DashboardLayout
