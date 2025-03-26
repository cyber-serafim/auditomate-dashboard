
import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  SidebarProvider,
  Sidebar, 
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset
} from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from './Header';
import { 
  BarChart4, 
  Search, 
  Server, 
  Laptop, 
  AlertTriangle, 
  Activity, 
  Lock,
  Link2, 
  Bell, 
  Settings,
  ShieldAlert
} from 'lucide-react';

export function MainLayout() {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2">
              <ShieldAlert className="h-6 w-6 text-accent" />
              <h1 className="font-bold text-sidebar-foreground">AuditoMate</h1>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Dashboard">
                      <a href="/">
                        <BarChart4 />
                        <span>Dashboard</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Vulnerability Scans">
                      <a href="/scans">
                        <Search />
                        <span>Vulnerability Scans</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Services">
                      <a href="/services">
                        <Server />
                        <span>Services</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Assets">
                      <a href="/assets">
                        <Laptop />
                        <span>Assets</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Alerts">
                      <a href="/alerts">
                        <AlertTriangle />
                        <span>Alerts</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Monitoring">
                      <a href="/monitoring">
                        <Activity />
                        <span>Monitoring</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Security">
                      <a href="/security">
                        <Lock />
                        <span>Security</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Connections">
                      <a href="/connections">
                        <Link2 />
                        <span>Connections</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Notifications">
                      <a href="/notifications">
                        <Bell />
                        <span>Notifications</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Settings">
                      <a href="/settings">
                        <Settings />
                        <span>Settings</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <div className="p-4">
              <div className="flex items-center gap-2 p-2 rounded-md bg-sidebar-accent/50 text-sidebar-foreground/80">
                <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                  <ShieldAlert className="h-4 w-4 text-white" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-sidebar-foreground">Security Status</p>
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <p className="text-xs">Protected</p>
                  </div>
                </div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset>
          <Header />
          <div className="p-6">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default MainLayout;
