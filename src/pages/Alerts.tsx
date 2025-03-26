
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Bell, CheckCircle, Clock, Info, Settings } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const alertData = [
  { 
    id: 1, 
    severity: 'critical', 
    title: 'Unauthorized access attempt', 
    source: 'Firewall', 
    timestamp: '2023-05-15 14:23:45',
    status: 'active'
  },
  { 
    id: 2, 
    severity: 'high', 
    title: 'Database connection failure', 
    source: 'Database Server', 
    timestamp: '2023-05-15 13:45:12',
    status: 'active'
  },
  { 
    id: 3, 
    severity: 'medium', 
    title: 'CPU usage above 90%', 
    source: 'Application Server', 
    timestamp: '2023-05-15 12:30:22',
    status: 'acknowledged'
  },
  { 
    id: 4, 
    severity: 'low', 
    title: 'SSL certificate expiring soon', 
    source: 'Web Server', 
    timestamp: '2023-05-15 11:15:37',
    status: 'resolved'
  },
  { 
    id: 5, 
    severity: 'info', 
    title: 'Routine backup completed', 
    source: 'Backup System', 
    timestamp: '2023-05-15 10:05:18',
    status: 'resolved'
  },
];

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'critical':
      return <AlertTriangle className="h-4 w-4 text-destructive" />;
    case 'high':
      return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    case 'medium':
      return <Info className="h-4 w-4 text-amber-500" />;
    case 'low':
      return <Info className="h-4 w-4 text-blue-500" />;
    case 'info':
      return <Info className="h-4 w-4 text-gray-500" />;
    default:
      return <Info className="h-4 w-4" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge variant="destructive">Active</Badge>;
    case 'acknowledged':
      return <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">Acknowledged</Badge>;
    case 'resolved':
      return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Resolved</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const AlertsPage = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header />
        
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Alerts</h1>
              <p className="text-muted-foreground">Monitor and manage system alerts</p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Bell className="h-4 w-4" />
                Configure Notifications
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Settings className="h-4 w-4" />
                Alert Settings
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">Last 24 hours</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Critical</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">2</div>
                <p className="text-xs text-muted-foreground">Require immediate action</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-500">7</div>
                <p className="text-xs text-muted-foreground">Pending resolution</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">15</div>
                <p className="text-xs text-muted-foreground">Successfully addressed</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="acknowledged">Acknowledged</TabsTrigger>
                  <TabsTrigger value="resolved">Resolved</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Severity</TableHead>
                        <TableHead>Alert</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {alertData.map((alert) => (
                        <TableRow key={alert.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getSeverityIcon(alert.severity)}
                              <span className="capitalize">{alert.severity}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{alert.title}</TableCell>
                          <TableCell>{alert.source}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              {alert.timestamp}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(alert.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                Details
                              </Button>
                              {alert.status === 'active' && (
                                <>
                                  <Button variant="outline" size="sm">
                                    Acknowledge
                                  </Button>
                                  <Button variant="default" size="sm">
                                    Resolve
                                  </Button>
                                </>
                              )}
                              {alert.status === 'acknowledged' && (
                                <Button variant="default" size="sm">
                                  Resolve
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="active" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Severity</TableHead>
                        <TableHead>Alert</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {alertData.filter(alert => alert.status === 'active').map((alert) => (
                        <TableRow key={alert.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getSeverityIcon(alert.severity)}
                              <span className="capitalize">{alert.severity}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{alert.title}</TableCell>
                          <TableCell>{alert.source}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              {alert.timestamp}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(alert.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                Details
                              </Button>
                              <Button variant="outline" size="sm">
                                Acknowledge
                              </Button>
                              <Button variant="default" size="sm">
                                Resolve
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="acknowledged" className="mt-4">
                  {/* Similar content for acknowledged alerts */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Severity</TableHead>
                        <TableHead>Alert</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {alertData.filter(alert => alert.status === 'acknowledged').map((alert) => (
                        <TableRow key={alert.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getSeverityIcon(alert.severity)}
                              <span className="capitalize">{alert.severity}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{alert.title}</TableCell>
                          <TableCell>{alert.source}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              {alert.timestamp}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(alert.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                Details
                              </Button>
                              <Button variant="default" size="sm">
                                Resolve
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="resolved" className="mt-4">
                  {/* Similar content for resolved alerts */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Severity</TableHead>
                        <TableHead>Alert</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {alertData.filter(alert => alert.status === 'resolved').map((alert) => (
                        <TableRow key={alert.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getSeverityIcon(alert.severity)}
                              <span className="capitalize">{alert.severity}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{alert.title}</TableCell>
                          <TableCell>{alert.source}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              {alert.timestamp}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(alert.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Alert History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-52">
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-1">Alert History Visualization</h3>
                  <p className="text-sm text-muted-foreground">A chart showing alert trends over time would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AlertsPage;
