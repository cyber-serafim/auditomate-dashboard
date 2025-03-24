
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import MetricCard from '@/components/ui/MetricCard';
import StatusCard from '@/components/dashboard/StatusCard';
import ErrorBoundary from '@/components/ErrorBoundary';
import FixedVulnerabilityChart from '@/components/dashboard/FixedVulnerabilityChart';
import ServiceMonitor from '@/components/dashboard/ServiceMonitor';
import AlertHistory from '@/components/dashboard/AlertHistory';
import { 
  ServerCrash, 
  ShieldAlert, 
  AlertTriangle, 
  Activity,
  Laptop,
  Server,
  Search,
  Link2
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

// Sample data for line chart
const performanceData = [
  { name: '00:00', value: 65 },
  { name: '02:00', value: 59 },
  { name: '04:00', value: 80 },
  { name: '06:00', value: 81 },
  { name: '08:00', value: 56 },
  { name: '10:00', value: 55 },
  { name: '12:00', value: 40 },
  { name: '14:00', value: 70 },
  { name: '16:00', value: 90 },
  { name: '18:00', value: 85 },
  { name: '20:00', value: 75 },
  { name: '22:00', value: 60 },
];

const tooltipStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  border: "1px solid rgba(0, 0, 0, 0.05)",
  borderRadius: "8px",
  padding: "8px 12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  fontSize: "12px",
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-64"> {/* Same width as sidebar */}
        <Header />
        
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight mb-1">Security Dashboard</h1>
            <p className="text-sm text-muted-foreground">Comprehensive overview of your infrastructure security status</p>
          </div>
          
          {/* Summary metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard 
              title="Vulnerabilities" 
              value="104" 
              description="Total across all systems" 
              trend={{ value: 12, isPositive: false }}
              icon={<ShieldAlert />}
            />
            <MetricCard 
              title="Critical Issues" 
              value="7" 
              description="Requiring immediate attention"
              trend={{ value: 3, isPositive: false }}
              icon={<AlertTriangle />} 
            />
            <MetricCard 
              title="Assets Monitored" 
              value="98" 
              description="Servers, applications, and services"
              trend={{ value: 5, isPositive: true }}
              icon={<Laptop />} 
            />
            <MetricCard 
              title="Service Uptime" 
              value="99.8%" 
              description="Average across all services"
              trend={{ value: 0.2, isPositive: true }}
              icon={<Activity />} 
            />
          </div>
          
          {/* System status */}
          <h2 className="text-lg font-medium tracking-tight mb-4">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatusCard 
              title="Web Infrastructure" 
              status="online" 
              description="Web servers and applications"
              timestamp="2 minutes ago"
              details="5/5 services operational" 
            />
            <StatusCard 
              title="Database Cluster" 
              status="warning" 
              description="Primary and replica databases"
              timestamp="1 minute ago"
              details="High load on primary server" 
            />
            <StatusCard 
              title="Authentication Services" 
              status="offline" 
              description="User authentication and SSO"
              timestamp="5 minutes ago"
              details="Scheduled maintenance in progress" 
            />
          </div>
          
          {/* Performance chart */}
          <div className="bg-card rounded-lg p-4 mb-6 border">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">System Performance (24h)</h3>
            </div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <CartesianGrid stroke="rgba(0,0,0,0.05)" strokeDasharray="3 3" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    dot={{ r: 3, strokeWidth: 1 }}
                    activeDot={{ r: 5, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Vulnerability analysis chart */}
            <div className="lg:col-span-2">
              <ErrorBoundary componentName="Vulnerability Chart">
                <FixedVulnerabilityChart />
              </ErrorBoundary>
            </div>
            
            {/* Quick actions */}
            <div className="space-y-4">
              <div className="bg-card rounded-lg p-4 border">
                <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-center justify-center p-3 bg-secondary rounded-md hover:bg-secondary/80 transition-colors">
                    <Search className="h-5 w-5 mb-2" />
                    <span className="text-xs">Run Scan</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 bg-secondary rounded-md hover:bg-secondary/80 transition-colors">
                    <Server className="h-5 w-5 mb-2" />
                    <span className="text-xs">Add Service</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 bg-secondary rounded-md hover:bg-secondary/80 transition-colors">
                    <ShieldAlert className="h-5 w-5 mb-2" />
                    <span className="text-xs">Security Report</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 bg-secondary rounded-md hover:bg-secondary/80 transition-colors">
                    <Link2 className="h-5 w-5 mb-2" />
                    <span className="text-xs">New Connection</span>
                  </button>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-4 border">
                <h3 className="text-sm font-medium mb-3">Last Scan Results</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-red-50 rounded-md">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                      <span className="text-xs font-medium">Critical</span>
                    </div>
                    <span className="text-xs font-bold">7</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-orange-50 rounded-md">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                      <span className="text-xs font-medium">High</span>
                    </div>
                    <span className="text-xs font-bold">15</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-md">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-xs font-medium">Medium</span>
                    </div>
                    <span className="text-xs font-bold">28</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded-md">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs font-medium">Low</span>
                    </div>
                    <span className="text-xs font-bold">54</span>
                  </div>
                </div>
                <div className="pt-3 mt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">Last full scan: <span className="font-medium">Today, 09:45 AM</span></p>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Service monitoring */}
            <ErrorBoundary componentName="Service Monitor">
              <ServiceMonitor />
            </ErrorBoundary>
            
            {/* Alert history */}
            <ErrorBoundary componentName="Alert History">
              <AlertHistory />
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
