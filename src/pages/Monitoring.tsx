
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ActivitySquare, CheckCircle, Download, Gauge, RefreshCw, Server, Settings } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

const serverData = [
  { id: 1, name: 'Web Server', status: 'online', cpu: 45, memory: 62, disk: 38, network: 27 },
  { id: 2, name: 'Database Server', status: 'online', cpu: 72, memory: 81, disk: 45, network: 53 },
  { id: 3, name: 'Application Server', status: 'online', cpu: 28, memory: 42, disk: 22, network: 18 },
  { id: 4, name: 'Authentication Server', status: 'online', cpu: 15, memory: 33, disk: 21, network: 14 },
  { id: 5, name: 'Backup Server', status: 'maintenance', cpu: 5, memory: 12, disk: 65, network: 3 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'online':
      return 'bg-green-500';
    case 'warning':
      return 'bg-yellow-500';
    case 'critical':
      return 'bg-red-500';
    case 'maintenance':
      return 'bg-blue-500';
    default:
      return 'bg-gray-500';
  }
};

const getUsageColor = (value: number) => {
  if (value >= 90) return 'bg-red-500';
  if (value >= 70) return 'bg-yellow-500';
  return 'bg-green-500';
};

const MonitoringPage = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header />
        
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">System Monitoring</h1>
              <p className="text-muted-foreground">Real-time performance metrics and system health</p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32%</div>
                <Progress value={32} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">Average across all servers</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">46%</div>
                <Progress value={46} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">Average across all servers</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Disk Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">38%</div>
                <Progress value={38} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">Average across all servers</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Network Traffic</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23 MB/s</div>
                <Progress value={23} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">Current throughput</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Server Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="servers">
                <TabsList>
                  <TabsTrigger value="servers">Servers</TabsTrigger>
                  <TabsTrigger value="applications">Applications</TabsTrigger>
                  <TabsTrigger value="databases">Databases</TabsTrigger>
                  <TabsTrigger value="network">Network</TabsTrigger>
                </TabsList>
                
                <TabsContent value="servers" className="mt-4 space-y-4">
                  {serverData.map((server) => (
                    <Card key={server.id} className="overflow-hidden">
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-3">
                            <Server className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <h3 className="font-medium">{server.name}</h3>
                              <div className="flex items-center gap-2">
                                <span className={`h-2 w-2 rounded-full ${getStatusColor(server.status)}`}></span>
                                <span className="text-xs text-muted-foreground capitalize">{server.status}</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Details</Button>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-muted-foreground">CPU</span>
                              <span className="text-xs font-medium">{server.cpu}%</span>
                            </div>
                            <Progress value={server.cpu} className={`h-1 ${getUsageColor(server.cpu)}`} />
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-muted-foreground">Memory</span>
                              <span className="text-xs font-medium">{server.memory}%</span>
                            </div>
                            <Progress value={server.memory} className={`h-1 ${getUsageColor(server.memory)}`} />
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-muted-foreground">Disk</span>
                              <span className="text-xs font-medium">{server.disk}%</span>
                            </div>
                            <Progress value={server.disk} className={`h-1 ${getUsageColor(server.disk)}`} />
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-muted-foreground">Network</span>
                              <span className="text-xs font-medium">{server.network} MB/s</span>
                            </div>
                            <Progress value={server.network} className={`h-1 ${getUsageColor(server.network)}`} />
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="applications" className="mt-4">
                  <div className="flex items-center justify-center h-52">
                    <div className="text-center">
                      <ActivitySquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-1">Application Monitoring</h3>
                      <p className="text-sm text-muted-foreground">Detailed application performance metrics would appear here</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="databases" className="mt-4">
                  <div className="flex items-center justify-center h-52">
                    <div className="text-center">
                      <Gauge className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-1">Database Performance</h3>
                      <p className="text-sm text-muted-foreground">Database performance metrics would appear here</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="network" className="mt-4">
                  <div className="flex items-center justify-center h-52">
                    <div className="text-center">
                      <ActivitySquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-1">Network Monitoring</h3>
                      <p className="text-sm text-muted-foreground">Network traffic and performance data would appear here</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Uptime</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-52">
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-1">99.97%</h3>
                    <p className="text-sm text-muted-foreground">Last 30 days</p>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Downtime</p>
                        <p className="font-medium">8m 32s</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Incidents</p>
                        <p className="font-medium">2</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">MTTR</p>
                        <p className="font-medium">4m 16s</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-52">
                  <div className="text-center">
                    <ActivitySquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-1">Performance Analytics</h3>
                    <p className="text-sm text-muted-foreground">Historical performance data would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MonitoringPage;
