
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Download, Link, Plus, RefreshCw, Settings, XCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import AddConnectionDialog from '@/components/connections/AddConnectionDialog';
import { toast } from 'sonner';

// Sample initial connection data
const initialConnections = [
  {
    id: '1',
    name: 'Database Connection',
    type: 'Database',
    status: 'active',
    lastActivity: '2 minutes ago'
  },
  {
    id: '2',
    name: 'API Integration',
    type: 'API',
    status: 'active',
    lastActivity: '5 minutes ago'
  },
  {
    id: '3',
    name: 'Legacy System',
    type: 'Legacy',
    status: 'inactive',
    lastActivity: '1 week ago'
  },
  {
    id: '4',
    name: 'Backup Server',
    type: 'Backup',
    status: 'failed',
    lastActivity: '1 hour ago'
  }
];

const ConnectionsPage = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [connections, setConnections] = useState(initialConnections);
  const [activeTab, setActiveTab] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Metrics calculation based on connections
  const metrics = {
    total: connections.length,
    active: connections.filter(conn => conn.status === 'active').length,
    inactive: connections.filter(conn => conn.status === 'inactive').length,
    failed: connections.filter(conn => conn.status === 'failed').length
  };

  const handleAddConnection = (values) => {
    const newConnection = {
      id: (connections.length + 1).toString(),
      name: values.name,
      type: values.type.charAt(0).toUpperCase() + values.type.slice(1),
      status: 'active',
      lastActivity: 'just now'
    };
    
    setConnections([...connections, newConnection]);
    setShowAddDialog(false);
    toast.success("Connection added successfully", {
      description: `${values.name} has been added to your connections.`
    });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh process
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Connections refreshed", {
        description: "All connection statuses have been updated."
      });
    }, 1500);
  };

  const handleTestConnection = (id) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: "Testing connection...",
        success: "Connection test successful!",
        error: "Connection test failed"
      }
    );
  };

  const filteredConnections = activeTab === 'all' 
    ? connections
    : connections.filter(conn => conn.status === activeTab);

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Connections</h1>
          <p className="text-muted-foreground">Manage your system's connections and integrations</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="default" 
            size="sm" 
            className="gap-1"
            onClick={() => setShowAddDialog(true)}
          >
            <Plus className="h-4 w-4" />
            New Connection
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
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
            <div className="text-2xl font-bold">{metrics.total}</div>
            <p className="text-sm text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
            <CardDescription>Currently active connections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{metrics.active}</div>
            <p className="text-sm text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Inactive Connections</CardTitle>
            <CardDescription>Connections that are currently inactive</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{metrics.inactive}</div>
            <p className="text-sm text-muted-foreground">-5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Failed Connections</CardTitle>
            <CardDescription>Connections that failed in the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{metrics.failed}</div>
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
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-4">
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
                  {filteredConnections.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center">
                          <Link className="h-12 w-12 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-1">No connections found</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            {activeTab === 'all' 
                              ? "You don't have any connections yet." 
                              : `You don't have any ${activeTab} connections.`}
                          </p>
                          <Button 
                            variant="outline" 
                            onClick={() => setShowAddDialog(true)}
                            className="gap-1"
                          >
                            <Plus className="h-4 w-4" />
                            Add Connection
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredConnections.map((connection) => (
                      <TableRow key={connection.id}>
                        <TableCell className="font-medium">{connection.name}</TableCell>
                        <TableCell>{connection.type}</TableCell>
                        <TableCell>
                          {connection.status === 'active' && (
                            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1 w-fit">
                              <CheckCircle className="h-3 w-3" />
                              Active
                            </Badge>
                          )}
                          {connection.status === 'inactive' && (
                            <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100 flex items-center gap-1 w-fit">
                              <AlertTriangle className="h-3 w-3" />
                              Inactive
                            </Badge>
                          )}
                          {connection.status === 'failed' && (
                            <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100 flex items-center gap-1 w-fit">
                              <XCircle className="h-3 w-3" />
                              Failed
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{connection.lastActivity}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleTestConnection(connection.id)}>
                              Test
                            </Button>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Add Connection Dialog */}
      <AddConnectionDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
        onSubmit={handleAddConnection}
      />
    </main>
  );
};

export default ConnectionsPage;
