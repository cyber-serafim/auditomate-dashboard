
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Activity, 
  AlertTriangle, 
  BarChart4, 
  Bell, 
  ChevronLeft, 
  ChevronRight,
  Laptop,
  Link2, 
  Lock, 
  Search, 
  Server, 
  Settings, 
  ShieldAlert
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/contexts/AuthContext';

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  collapsed?: boolean;
  to: string;
  pageName: string;
};

const NavItem: React.FC<NavItemProps> = ({ 
  icon: Icon, 
  label, 
  isActive = false, 
  collapsed = false,
  to,
  pageName
}) => {
  const { hasAccess } = useAuth();
  
  // Якщо немає доступу до сторінки, не показуємо пункт меню
  if (!hasAccess(pageName)) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to={to}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group",
            isActive 
              ? "bg-sidebar-accent text-sidebar-accent-foreground" 
              : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
          )}
        >
          <Icon className="h-5 w-5" />
          <span className={cn("text-sm transition-all", {
            "opacity-0 w-0": collapsed,
            "opacity-100": !collapsed
          })}>
            {label}
          </span>
        </Link>
      </TooltipTrigger>
      {collapsed && (
        <TooltipContent side="right">
          {label}
        </TooltipContent>
      )}
    </Tooltip>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside className={cn(
      "h-screen bg-sidebar flex flex-col border-r border-sidebar-border transition-all duration-300 fixed left-0 top-0 z-40",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        <div className={cn("flex items-center gap-2 overflow-hidden transition-all", {
          "opacity-0 w-0": collapsed,
          "opacity-100": !collapsed
        })}>
          <ShieldAlert className="h-6 w-6 text-accent" />
          <h1 className="font-bold text-sidebar-foreground">AuditoMate</h1>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
      
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto scrollbar-none">
        <NavItem 
          icon={BarChart4} 
          label="Dashboard" 
          isActive={location.pathname === '/'} 
          to="/" 
          collapsed={collapsed}
          pageName="dashboard"
        />
        <NavItem 
          icon={Search} 
          label="Vulnerability Scans" 
          isActive={location.pathname === '/scans'} 
          to="/scans" 
          collapsed={collapsed}
          pageName="scans"
        />
        <NavItem 
          icon={Server} 
          label="Services" 
          isActive={location.pathname === '/services'} 
          to="/services" 
          collapsed={collapsed}
          pageName="services"
        />
        <NavItem 
          icon={Laptop} 
          label="Assets" 
          isActive={location.pathname === '/assets'} 
          to="/assets" 
          collapsed={collapsed}
          pageName="assets"
        />
        <NavItem 
          icon={AlertTriangle} 
          label="Alerts" 
          isActive={location.pathname === '/alerts'} 
          to="/alerts" 
          collapsed={collapsed}
          pageName="alerts"
        />
        <NavItem 
          icon={Activity} 
          label="Monitoring" 
          isActive={location.pathname === '/monitoring'} 
          to="/monitoring" 
          collapsed={collapsed}
          pageName="monitoring"
        />
        <NavItem 
          icon={Lock} 
          label="Security" 
          isActive={location.pathname === '/security'} 
          to="/security" 
          collapsed={collapsed}
          pageName="security"
        />
        <NavItem 
          icon={Link2} 
          label="Connections" 
          isActive={location.pathname === '/connections'} 
          to="/connections" 
          collapsed={collapsed}
          pageName="connections"
        />
        <NavItem 
          icon={Bell} 
          label="Notifications" 
          isActive={location.pathname === '/notifications'} 
          to="/notifications" 
          collapsed={collapsed}
          pageName="notifications"
        />
        <NavItem 
          icon={Settings} 
          label="Settings" 
          isActive={location.pathname.startsWith('/settings')} 
          to="/settings" 
          collapsed={collapsed}
          pageName="settings"
        />
      </nav>
      
      <div className="p-3 border-t border-sidebar-border mt-auto">
        <div className={cn(
          "flex items-center gap-3 rounded-md bg-sidebar-accent/50 p-3 text-sidebar-foreground/80",
          { "justify-center": collapsed }
        )}>
          {!collapsed ? (
            <>
              <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                <ShieldAlert className="h-4 w-4 text-white" />
              </div>
              <div className="space-y-1 overflow-hidden">
                <p className="text-xs font-medium text-sidebar-foreground">Security Status</p>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  <p className="text-xs">Protected</p>
                </div>
              </div>
            </>
          ) : (
            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
              <ShieldAlert className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
