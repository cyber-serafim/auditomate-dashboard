
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Check, Cloud, Database, ExternalLink, Link, Link2, Network, Plus, Server, Settings, Shield } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Sample connection data
const connectionData = [
  { 
    id: 1, 
    name: 'Production API Gateway', 
    type: 'api', 
    status: 'connected', 
    lastChecked: '2 mins ago',
    encrypted: true,
    host: 'api-gateway.example.com',
    port: 443
  },
  { 
    id: 2, 
    name: 'SQL Database Cluster', 
    type: 'database', 
    status: 'connected', 
    lastChecked: '5 mins ago',
    encrypted: true,
    host: 'db-cluster.example.com',
    port: 5432
  },
  { 
    id: 3, 
    name: 'Cloud Storage Bucket', 
    type: 'storage', 
    status: 'connected', 
    lastChecked: '8 mins ago',
    encrypted: true,
    host: 'storage.example.com',
    port: 443
  },
  { 
    id: 4, 
    name: 'Authentication Server', 
    type: 'auth', 
    status: 'warning', 
    lastChecked: '12 mins ago',
    encrypted: true,
    host: 'auth.example.com',
    port: 443
  },
  { 
    id: 5, 
    name: 'Analytics Pipeline', 
    type: 'data', 
    status: 'disconnected', 
    lastChecked: '20 mins ago',
    encrypted: false,
    host: 'analytics.example.com',
    port: 8080
  },
];

// Get status indicator color
const getStatusColor = (status: string) => {
  switch (status) {
    case 'connected':
      return 'bg-green-500';
    case 'warning':
      return 'bg-amber-500';
    case 'disconnected':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

// Get type icon
const getTypeIcon = (type: string) => {
  switch (type) {
    case 'api':
      return <ExternalLink className="h-4 w-4" />;
    case 'database':
      return <Database className="h-4 w-4" />;
    case 'storage':
      return <Cloud className="h-4 w-4" />;
    case 'auth':
      return <Shield className="h-4 w-4" />;
    case 'data':
      return <Network className="h-4 w-4" />;
    default:
      return <Link2 className="h-4 w-4" />;
  }
};

const ConnectionsPage = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header />
        
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Connections</h1>
              <p className="text-muted-foreground">Manage external connections and integrations</p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="default" size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                New Connection
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Settings className="h-4 w-4" />
                Connection Settings
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">4 types of connections</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Connected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">9</div>
                <p className="text-xs text-muted-foreground">Healthy connections</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Warnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-500">2</div>
                <p className="text-xs text-muted-foreground">Need attention</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Disconnected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">1</div>
                <p className="text-xs text-muted-foreground">Connection failures</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>External Connections</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="api">API</TabsTrigger>
                  <TabsTrigger value="database">Database</TabsTrigger>
                  <TabsTrigger value="storage">Storage</TabsTrigger>
                  <TabsTrigger value="auth">Auth</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Status</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Host</TableHead>
                        <TableHead>Port</TableHead>
                        <TableHead>Security</TableHead>
                        <TableHead>Last Check</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {connectionData.map((connection) => (
                        <TableRow key={connection.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className={`h-2 w-2 rounded-full ${getStatusColor(connection.status)}`}></span>
                              <span className="capitalize">{connection.status}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{connection.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTypeIcon(connection.type)}
                              <span className="capitalize">{connection.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>{connection.host}</TableCell>
                          <TableCell>{connection.port}</TableCell>
                          <TableCell>
                            {connection.encrypted ? (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                <div className="flex items-center gap-1">
                                  <Shield className="h-3 w-3" />
                                  <span>Encrypted</span>
                                </div>
                              </Badge>
                            ) : (
                              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                                <div className="flex items-center gap-1">
                                  <AlertTriangle className="h-3 w-3" />
                                  <span>Unencrypted</span>
                                </div>
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>{connection.lastChecked}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                Details
                              </Button>
                              <Button variant="outline" size="sm">
                                Test
                              </Button>
                              {connection.status !== 'connected' && (
                                <Button variant="default" size="sm">
                                  Reconnect
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="api" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Status</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Host</TableHead>
                        <TableHead>Port</TableHead>
                        <TableHead>Security</TableHead>
                        <TableHead>Last Check</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {connectionData
                        .filter(conn => conn.type === 'api')
                        .map((connection) => (
                          <TableRow key={connection.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className={`h-2 w-2 rounded-full ${getStatusColor(connection.status)}`}></span>
                                <span className="capitalize">{connection.status}</span>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">{connection.name}</TableCell>
                            <TableCell>{connection.host}</TableCell>
                            <TableCell>{connection.port}</TableCell>
                            <TableCell>
                              {connection.encrypted ? (
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                  <div className="flex items-center gap-1">
                                    <Shield className="h-3 w-3" />
                                    <span>Encrypted</span>
                                  </div>
                                </Badge>
                              ) : (
                                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                                  <div className="flex items-center gap-1">
                                    <AlertTriangle className="h-3 w-3" />
                                    <span>Unencrypted</span>
                                  </div>
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>{connection.lastChecked}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm">
                                  Details
                                </Button>
                                <Button variant="outline" size="sm">
                                  Test
                                </Button>
                                {connection.status !== 'connected' && (
                                  <Button variant="default" size="sm">
                                    Reconnect
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                {/* Similar content for other tabs */}
                <TabsContent value="database" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Status</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Host</TableHead>
                        <TableHead>Port</TableHead>
                        <TableHead>Security</TableHead>
                        <TableHead>Last Check</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {connectionData
                        .filter(conn => conn.type === 'database')
                        .map((connection) => (
                          <TableRow key={connection.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className={`h-2 w-2 rounded-full ${getStatusColor(connection.status)}`}></span>
                                <span className="capitalize">{connection.status}</span>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">{connection.name}</TableCell>
                            <TableCell>{connection.host}</TableCell>
                            <TableCell>{connection.port}</TableCell>
                            <TableCell>
                              {connection.encrypted ? (
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                  <div className="flex items-center gap-1">
                                    <Shield className="h-3 w-3" />
                                    <span>Encrypted</span>
                                  </div>
                                </Badge>
                              ) : (
                                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                                  <div className="flex items-center gap-1">
                                    <AlertTriangle className="h-3 w-3" />
                                    <span>Unencrypted</span>
                                  </div>
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>{connection.lastChecked}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm">
                                  Details
                                </Button>
                                <Button variant="outline" size="sm">
                                  Test
                                </Button>
                                {connection.status !== 'connected' && (
                                  <Button variant="default" size="sm">
                                    Reconnect
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="storage" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Status</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Host</TableHead>
                        <TableHead>Port</TableHead>
                        <TableHead>Security</TableHead>
                        <TableHead>Last Check</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {connectionData
                        .filter(conn => conn.type === 'storage')
                        .map((connection) => (
                          <TableRow key={connection.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className={`h-2 w-2 rounded-full ${getStatusColor(connection.status)}`}></span>
                                <span className="capitalize">{connection.status}</span>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">{connection.name}</TableCell>
                            <TableCell>{connection.host}</TableCell>
                            <TableCell>{connection.port}</TableCell>
                            <TableCell>
                              {connection.encrypted ? (
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                  <div className="flex items-center gap-1">
                                    <Shield className="h-3 w-3" />
                                    <span>Encrypted</span>
                                  </div>
                                </Badge>
                              ) : (
                                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                                  <div className="flex items-center gap-1">
                                    <AlertTriangle className="h-3 w-3" />
                                    <span>Unencrypted</span>
                                  </div>
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>{connection.lastChecked}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm">
                                  Details
                                </Button>
                                <Button variant="outline" size="sm">
                                  Test
                                </Button>
                                {connection.status !== 'connected' && (
                                  <Button variant="default" size="sm">
                                    Reconnect
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="auth" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Status</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Host</TableHead>
                        <TableHead>Port</TableHead>
                        <TableHead>Security</TableHead>
                        <TableHead>Last Check</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {connectionData
                        .filter(conn => conn.type === 'auth')
                        .map((connection) => (
                          <TableRow key={connection.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className={`h-2 w-2 rounded-full ${getStatusColor(connection.status)}`}></span>
                                <span className="capitalize">{connection.status}</span>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">{connection.name}</TableCell>
                            <TableCell>{connection.host}</TableCell>
                            <TableCell>{connection.port}</TableCell>
                            <TableCell>
                              {connection.encrypted ? (
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                  <div className="flex items-center gap-1">
                                    <Shield className="h-3 w-3" />
                                    <span>Encrypted</span>
                                  </div>
                                </Badge>
                              ) : (
                                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                                  <div className="flex items-center gap-1">
                                    <AlertTriangle className="h-3 w-3" />
                                    <span>Unencrypted</span>
                                  </div>
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>{connection.lastChecked}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm">
                                  Details
                                </Button>
                                <Button variant="outline" size="sm">
                                  Test
                                </Button>
                                {connection.status !== 'connected' && (
                                  <Button variant="default" size="sm">
                                    Reconnect
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Connection Health</CardTitle>
                <CardDescription>Status of all connection endpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 border border-green-100 rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="font-medium text-green-700">Healthy</span>
                      </div>
                      <p className="text-2xl font-bold text-green-700">9</p>
                      <p className="text-xs text-green-600">Connections operating normally</p>
                    </div>
                    
                    <div className="p-4 bg-red-50 border border-red-100 rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <span className="font-medium text-red-700">Issues</span>
                      </div>
                      <p className="text-2xl font-bold text-red-700">3</p>
                      <p className="text-xs text-red-600">Connections with warnings or failures</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Latest Issues</h3>
                    <div className="space-y-2">
                      <div className="p-3 bg-amber-50 border border-amber-100 rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-amber-800">Authentication Server</p>
                            <p className="text-xs text-amber-700">High latency detected (230ms)</p>
                          </div>
                          <Badge className="bg-amber-500">Warning</Badge>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-red-50 border border-red-100 rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-red-800">Analytics Pipeline</p>
                            <p className="text-xs text-red-700">Connection timeout after 30s</p>
                          </div>
                          <Badge variant="destructive">Disconnected</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Connection Activity</CardTitle>
                <CardDescription>Recent connection events and changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative pl-6 pb-6 border-l border-border">
                    <div className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-blue-500"></div>
                    <div>
                      <p className="text-sm font-medium">Added new Production API Gateway connection</p>
                      <p className="text-xs text-muted-foreground">Today at 10:32 AM</p>
                    </div>
                  </div>
                  
                  <div className="relative pl-6 pb-6 border-l border-border">
                    <div className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-green-500"></div>
                    <div>
                      <p className="text-sm font-medium">Analytics Pipeline reconnected successfully</p>
                      <p className="text-xs text-muted-foreground">Yesterday at 6:15 PM</p>
                    </div>
                  </div>
                  
                  <div className="relative pl-6 pb-6 border-l border-border">
                    <div className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-amber-500"></div>
                    <div>
                      <p className="text-sm font-medium">Authentication Server showing high latency</p>
                      <p className="text-xs text-muted-foreground">Yesterday at 2:45 PM</p>
                    </div>
                  </div>
                  
                  <div className="relative pl-6 pb-6 border-l border-border">
                    <div className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-red-500"></div>
                    <div>
                      <p className="text-sm font-medium">Analytics Pipeline disconnected</p>
                      <p className="text-xs text-muted-foreground">Yesterday at 11:20 AM</p>
                    </div>
                  </div>
                  
                  <div className="relative pl-6">
                    <div className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-blue-500"></div>
                    <div>
                      <p className="text-sm font-medium">Updated SQL Database Cluster connection settings</p>
                      <p className="text-xs text-muted-foreground">May 14, 2023 at 4:30 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" size="sm" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ConnectionsPage;
