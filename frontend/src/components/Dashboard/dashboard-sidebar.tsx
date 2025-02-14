import { BarChart3, ClipboardList, FileSpreadsheet, LogOut, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

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
import {  useEffect, useState } from "react";

interface DashboardSidebarProps {
  openNewTest: () => void;
  isCollapsed : boolean;
  openLogout:()=>void;
}



export function DashboardSidebar({ openNewTest,isCollapsed,openLogout }: DashboardSidebarProps) {
  const location = useLocation();
  const [id, setId] = useState<number>(1); // Default id = 1
  useEffect(() => {
    if (location.pathname.includes("analytics")) {
      setId(2);
    } else if (location.pathname.includes("profile")) {
      setId(3);
    } else {
      setId(1);
    }
  }, [location.pathname]);
  
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
                  <SidebarMenuButton asChild className={`hover:scale-110   ${id == 1? "bg-blue-900 text-white hover:bg-slate-950 hover:text-white":"text-black"}`}>
                    <Link to="/dashboard" onClick={()=>setId(1)}>
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
                  <SidebarMenuButton asChild className={`hover:scale-105 ${id == 2? "bg-blue-900 text-white hover:bg-slate-950 hover:text-white":"text-black"}`}>
                    <Link to="/dashboard/analytics" onClick={()=>setId(2)}>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Analytics
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:scale-105">
                    <button onClick={openLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={`hover:scale-105 ${id == 3? "bg-blue-900 text-white hover:bg-slate-950 hover:text-white":"text-black"}`}>
                    <Link to="/dashboard/profile" onClick={()=>setId(3)}>
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
