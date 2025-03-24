
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, CheckCircle, Clock, ServerCrash, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type ServiceStatus = 'online' | 'offline' | 'warning' | 'maintenance';

type Service = {
  id: string;
  name: string;
  status: ServiceStatus;
  uptime: string;
  lastChecked: string;
  type: 'web' | 'database' | 'network' | 'auth' | 'storage';
};

const statusIcons = {
  online: <CheckCircle className="h-4 w-4 text-green-500" />,
  offline: <XCircle className="h-4 w-4 text-red-500" />,
  warning: <Activity className="h-4 w-4 text-yellow-500" />,
  maintenance: <Clock className="h-4 w-4 text-blue-500" />
};

const statusText = {
  online: "Online",
  offline: "Offline",
  warning: "Warning",
  maintenance: "Maintenance"
};

// Sample data - in a real app, this would come from your API
const services: Service[] = [
  { id: '1', name: 'Web Server', status: 'online', uptime: '99.9%', lastChecked: '2 minutes ago', type: 'web' },
  { id: '2', name: 'Database Server', status: 'online', uptime: '99.8%', lastChecked: '5 minutes ago', type: 'database' },
  { id: '3', name: 'Authentication Service', status: 'warning', uptime: '98.5%', lastChecked: '1 minute ago', type: 'auth' },
  { id: '4', name: 'File Storage', status: 'online', uptime: '99.9%', lastChecked: '3 minutes ago', type: 'storage' },
  { id: '5', name: 'API Gateway', status: 'online', uptime: '99.7%', lastChecked: '1 minute ago', type: 'web' },
  { id: '6', name: 'Backup Server', status: 'offline', uptime: '95.2%', lastChecked: '10 minutes ago', type: 'storage' },
  { id: '7', name: 'DNS Server', status: 'online', uptime: '99.9%', lastChecked: '4 minutes ago', type: 'network' },
  { id: '8', name: 'Mail Server', status: 'maintenance', uptime: '-', lastChecked: '30 minutes ago', type: 'web' },
  { id: '9', name: 'Load Balancer', status: 'online', uptime: '99.8%', lastChecked: '2 minutes ago', type: 'network' },
  { id: '10', name: 'Cache Server', status: 'online', uptime: '99.9%', lastChecked: '1 minute ago', type: 'database' },
];

const ServiceStatusItem: React.FC<{ service: Service }> = ({ service }) => {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-accent/5 rounded-md transition-colors">
      <div className="flex items-center gap-3">
        {statusIcons[service.status]}
        <div>
          <p className="text-sm font-medium">{service.name}</p>
          <p className="text-xs text-muted-foreground">Uptime: {service.uptime}</p>
        </div>
      </div>
      <div className="text-right">
        <span className={cn(
          "text-xs font-medium",
          service.status === 'online' && "text-green-500",
          service.status === 'offline' && "text-red-500",
          service.status === 'warning' && "text-yellow-500",
          service.status === 'maintenance' && "text-blue-500",
        )}>
          {statusText[service.status]}
        </span>
        <p className="text-xs text-muted-foreground">{service.lastChecked}</p>
      </div>
    </div>
  );
};

const ServiceMonitor = () => {
  const webServices = services.filter(s => s.type === 'web');
  const networkServices = services.filter(s => s.type === 'network' || s.type === 'auth');
  const storageServices = services.filter(s => s.type === 'database' || s.type === 'storage');

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Service Status</CardTitle>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-xs">{services.filter(s => s.status === 'online').length}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
              <span className="text-xs">{services.filter(s => s.status === 'warning').length}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              <span className="text-xs">{services.filter(s => s.status === 'offline').length}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <span className="text-xs">{services.filter(s => s.status === 'maintenance').length}</span>
            </div>
          </div>
        </div>
        <CardDescription className="text-xs">
          Real-time status of your infrastructure services
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="all">
          <TabsList className="w-full rounded-none border-b grid grid-cols-4 h-9">
            <TabsTrigger value="all" className="text-xs rounded-none">All</TabsTrigger>
            <TabsTrigger value="web" className="text-xs rounded-none">Web</TabsTrigger>
            <TabsTrigger value="network" className="text-xs rounded-none">Network</TabsTrigger>
            <TabsTrigger value="storage" className="text-xs rounded-none">Storage/DB</TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-[350px]">
            <TabsContent value="all" className="m-0 p-0">
              <div className="divide-y divide-border">
                {services.map(service => (
                  <ServiceStatusItem key={service.id} service={service} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="web" className="m-0 p-0">
              <div className="divide-y divide-border">
                {webServices.map(service => (
                  <ServiceStatusItem key={service.id} service={service} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="network" className="m-0 p-0">
              <div className="divide-y divide-border">
                {networkServices.map(service => (
                  <ServiceStatusItem key={service.id} service={service} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="storage" className="m-0 p-0">
              <div className="divide-y divide-border">
                {storageServices.map(service => (
                  <ServiceStatusItem key={service.id} service={service} />
                ))}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ServiceMonitor;
