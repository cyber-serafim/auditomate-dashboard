
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, Clock, Settings, RefreshCw, Trash2, Download } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ConnectionDetailsProps {
  connection: {
    id: string;
    name: string;
    type: string;
    status: string;
    lastActivity: string;
    host?: string;
    port?: string;
    username?: string;
    createdAt?: string;
    metrics?: {
      uptime?: string;
      responseTime?: string;
      throughput?: string;
    };
  };
  onTestConnection?: () => void;
}

const ConnectionDetails: React.FC<ConnectionDetailsProps> = ({ 
  connection,
  onTestConnection 
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'inactive':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return "Active";
      case 'inactive':
        return "Inactive";
      case 'failed':
        return "Failed";
      default:
        return "Unknown";
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active':
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case 'inactive':
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case 'failed':
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{connection.name}</CardTitle>
            <CardDescription>{connection.type} Connection</CardDescription>
          </div>
          <Badge variant="outline" className={`flex items-center gap-1 ${getStatusClass(connection.status)}`}>
            {getStatusIcon(connection.status)}
            {getStatusLabel(connection.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Connection Details</h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Host:</dt>
                <dd className="text-sm font-medium">{connection.host || 'Not specified'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Port:</dt>
                <dd className="text-sm font-medium">{connection.port || 'Not specified'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Username:</dt>
                <dd className="text-sm font-medium">{connection.username || 'Not specified'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Created:</dt>
                <dd className="text-sm font-medium">{connection.createdAt || 'Unknown'}</dd>
              </div>
            </dl>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Performance Metrics</h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Uptime:</dt>
                <dd className="text-sm font-medium">{connection.metrics?.uptime || 'N/A'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Response Time:</dt>
                <dd className="text-sm font-medium">{connection.metrics?.responseTime || 'N/A'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Throughput:</dt>
                <dd className="text-sm font-medium">{connection.metrics?.throughput || 'N/A'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Last Activity:</dt>
                <dd className="text-sm font-medium">{connection.lastActivity}</dd>
              </div>
            </dl>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium mb-2">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">No recent activity available.</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <Button variant="destructive" size="sm" className="gap-1">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Settings className="h-4 w-4" />
            Configure
          </Button>
          <Button variant="outline" size="sm" className="gap-1" onClick={onTestConnection}>
            <RefreshCw className="h-4 w-4" />
            Test Connection
          </Button>
          <Button size="sm">View Details</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ConnectionDetails;
