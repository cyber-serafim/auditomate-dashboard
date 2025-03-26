import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Download, Link, Plus, RefreshCw, Settings, XCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const ConnectionsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Connections</h1>
            <p className="text-muted-foreground">Manage your system's connections and integrations</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="default" size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              New Connection
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
        
        {/* Connection metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Connections</CardTitle>
              <CardDescription>All active and inactive connections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-sm text-muted-foreground">+20% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
              <CardDescription>Currently active connections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">93</div>
              <p className="text-sm text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Inactive Connections</CardTitle>
              <CardDescription>Connections that are currently inactive</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">35</div>
              <p className="text-sm text-muted-foreground">-5% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Failed Connections</CardTitle>
              <CardDescription>Connections that failed in the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">3</div>
              <p className="text-sm text-muted-foreground">No change from last month</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content */}
        <Card>
          <CardHeader>
            <CardTitle>Connection List</CardTitle>
            <CardDescription>A list of all system connections</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
                <TabsTrigger value="failed">Failed</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Database Connection</TableCell>
                      <TableCell>Database</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                      </TableCell>
                      <TableCell>2 minutes ago</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">API Integration</TableCell>
                      <TableCell>API</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                      </TableCell>
                      <TableCell>5 minutes ago</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Legacy System</TableCell>
                      <TableCell>Legacy</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">Inactive</Badge>
                      </TableCell>
                      <TableCell>1 week ago</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Backup Server</TableCell>
                      <TableCell>Backup</TableCell>
                      <TableCell>
                        <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>
                      </TableCell>
                      <TableCell>1 hour ago</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="active" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Database Connection</TableCell>
                      <TableCell>Database</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                      </TableCell>
                      <TableCell>2 minutes ago</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">API Integration</TableCell>
                      <TableCell>API</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                      </TableCell>
                      <TableCell>5 minutes ago</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="inactive" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Legacy System</TableCell>
                      <TableCell>Legacy</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">Inactive</Badge>
                      </TableCell>
                      <TableCell>1 week ago</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="failed" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Backup Server</TableCell>
                      <TableCell>Backup</TableCell>
                      <TableCell>
                        <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>
                      </TableCell>
                      <TableCell>1 hour ago</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ConnectionsPage;
