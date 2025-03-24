
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle, CheckCircle, Clock, Info, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

type AlertType = 'security' | 'performance' | 'availability' | 'info';
type AlertSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';

type Alert = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: AlertType;
  severity: AlertSeverity;
  resolved: boolean;
};

const severityConfig = {
  critical: { color: 'bg-red-100 text-red-800 border-red-200' },
  high: { color: 'bg-orange-100 text-orange-800 border-orange-200' },
  medium: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  low: { color: 'bg-green-100 text-green-800 border-green-200' },
  info: { color: 'bg-blue-100 text-blue-800 border-blue-200' },
};

const typeIcons = {
  security: <ShieldAlert className="h-4 w-4" />,
  performance: <Clock className="h-4 w-4" />,
  availability: <AlertCircle className="h-4 w-4" />,
  info: <Info className="h-4 w-4" />,
};

// Sample data - in a real app, this would come from your API
const alerts: Alert[] = [
  {
    id: '1',
    title: 'Unusual login activity detected',
    description: 'Multiple failed login attempts from IP 192.168.1.105',
    timestamp: '2023-09-15 14:23',
    type: 'security',
    severity: 'high',
    resolved: false,
  },
  {
    id: '2',
    title: 'Database server high CPU usage',
    description: 'CPU usage exceeded 90% for more than 5 minutes',
    timestamp: '2023-09-15 13:05',
    type: 'performance',
    severity: 'medium',
    resolved: true,
  },
  {
    id: '3',
    title: 'Web server unresponsive',
    description: 'Main web server not responding to health checks',
    timestamp: '2023-09-15 10:17',
    type: 'availability',
    severity: 'critical',
    resolved: true,
  },
  {
    id: '4',
    title: 'SSL certificate expiring soon',
    description: 'Certificate for api.example.com expires in 7 days',
    timestamp: '2023-09-14 22:45',
    type: 'security',
    severity: 'medium',
    resolved: false,
  },
  {
    id: '5',
    title: 'Backup job completed',
    description: 'Weekly backup completed successfully',
    timestamp: '2023-09-14 03:00',
    type: 'info',
    severity: 'info',
    resolved: true,
  },
  {
    id: '6',
    title: 'Suspicious file uploaded',
    description: 'Potentially malicious file detected during upload',
    timestamp: '2023-09-13 19:22',
    type: 'security',
    severity: 'high',
    resolved: true,
  },
  {
    id: '7',
    title: 'Network bandwidth threshold exceeded',
    description: 'Outbound traffic spike detected on main gateway',
    timestamp: '2023-09-13 16:08',
    type: 'performance',
    severity: 'low',
    resolved: true,
  },
];

const AlertItem: React.FC<{ alert: Alert }> = ({ alert }) => {
  return (
    <div className={cn(
      "p-3 transition-colors border-l-2 mb-1",
      alert.resolved ? "border-l-gray-300 bg-gray-50/50" : `border-l-${alert.severity} bg-${alert.severity}-50/20`
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className={cn(
            "mt-0.5 p-1.5 rounded-full",
            `text-${alert.severity}-600`,
            alert.resolved ? "bg-gray-100" : `bg-${alert.severity}-100`
          )}>
            {typeIcons[alert.type]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={cn(
                "text-sm font-medium",
                alert.resolved && "text-muted-foreground"
              )}>
                {alert.title}
              </h3>
              {alert.resolved && (
                <Badge variant="outline" className="bg-green-50 text-green-700 text-[10px] h-4 gap-1 flex items-center">
                  <CheckCircle className="h-2.5 w-2.5" />
                  Resolved
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{alert.description}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className={cn(
                "text-[10px] px-1.5 py-0 h-4",
                severityConfig[alert.severity].color
              )}>
                {alert.severity}
              </Badge>
              <span className="text-[10px] text-muted-foreground">{alert.timestamp}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AlertHistory = () => {
  const activeAlerts = alerts.filter(a => !a.resolved);
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Alert History</CardTitle>
          <Badge variant="outline" className="bg-red-50 border-red-100 text-red-800">
            {activeAlerts.length} active
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Recent security and system alerts
        </CardDescription>
      </CardHeader>
      <CardContent className="p-1">
        <ScrollArea className="h-[350px] px-2">
          {alerts.map(alert => (
            <AlertItem key={alert.id} alert={alert} />
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AlertHistory;
