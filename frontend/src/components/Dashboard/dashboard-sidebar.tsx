import { BarChart3, ClipboardList, FileSpreadsheet, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface DashboardSidebarProps {
  openNewTest: () => void;
  isCollapsed : boolean;
}

export function DashboardSidebar({ openNewTest,isCollapsed }: DashboardSidebarProps) {

  return (
      <Sidebar 
        className="border-r bg-white shadow-lg h-full" collapsible={isCollapsed ? "collapsed" : "none"}>
        
        <SidebarHeader className="border-b p-4 text-right md:text-center bg-gradient-to-r from-gray-900 to-blue-900">
          <h2 className="text-lg font-semibold text-white">Student Dashboard</h2>
        </SidebarHeader>

        <SidebarContent className="p-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:scale-105">
                    <Link to="/dashboard">
                      <ClipboardList className="mr-2 h-4 w-4 " />
                      All Tests
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:scale-105">
                    <button onClick={openNewTest}>
                      <FileSpreadsheet className="mr-2 h-5 w-5" />
                      New Test
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:scale-105">
                    <Link to="/dashboard/analytics">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Analytics
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:scale-105">
                    <Link to="/dashboard/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:scale-105">
                    <Link to="/dashboard/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
  );
}
