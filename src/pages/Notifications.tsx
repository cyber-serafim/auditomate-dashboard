
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Bell, 
  BellOff, 
  Check, 
  CheckCheck, 
  Clock, 
  Cog, 
  Mail, 
  MessageSquare, 
  Phone, 
  Search, 
  Server, 
  Shield, 
  Trash, 
  Users 
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Sample notification data
const notificationData = [
  { 
    id: 1, 
    title: 'Critical vulnerability detected', 
    description: 'CVE-2023-1234 found in web server', 
    type: 'security', 
    priority: 'high', 
    time: '10 minutes ago',
    read: false
  },
  { 
    id: 2, 
    title: 'Database performance degraded', 
    description: 'Query response time increased by 200%', 
    type: 'performance', 
    priority: 'medium', 
    time: '25 minutes ago',
    read: false
  },
  { 
    id: 3, 
    title: 'New user registered', 
    description: 'John Doe (john@example.com) created an account', 
    type: 'user', 
    priority: 'low', 
    time: '1 hour ago',
    read: true
  },
  { 
    id: 4, 
    title: 'Scheduled maintenance completed', 
    description: 'Server patching finished successfully', 
    type: 'system', 
    priority: 'info', 
    time: '3 hours ago',
    read: true
  },
  { 
    id: 5, 
    title: 'New scan results available', 
    description: 'Vulnerability scan completed with 3 findings', 
    type: 'security', 
    priority: 'medium', 
    time: '5 hours ago',
    read: true
  },
];

// Channel configuration data
const channelData = [
  { id: 1, name: 'Email', icon: Mail, enabled: true },
  { id: 2, name: 'SMS', icon: Phone, enabled: false },
  { id: 3, name: 'In-App', icon: Bell, enabled: true },
  { id: 4, name: 'Slack', icon: MessageSquare, enabled: true },
  { id: 5, name: 'Teams', icon: Users, enabled: false },
];

// Get type icon
const getTypeIcon = (type: string) => {
  switch (type) {
    case 'security':
      return <Shield className="h-4 w-4 text-red-500" />;
    case 'performance':
      return <Server className="h-4 w-4 text-amber-500" />;
    case 'user':
      return <Users className="h-4 w-4 text-blue-500" />;
    case 'system':
      return <Cog className="h-4 w-4 text-green-500" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

// Get priority badge
const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return <Badge variant="destructive">High</Badge>;
    case 'medium':
      return <Badge className="bg-amber-500 hover:bg-amber-600">Medium</Badge>;
    case 'low':
      return <Badge className="bg-blue-500 hover:bg-blue-600">Low</Badge>;
    case 'info':
      return <Badge variant="outline">Info</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const NotificationsPage = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header />
        
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
              <p className="text-muted-foreground">Manage your notification preferences</p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <CheckCheck className="h-4 w-4" />
                Mark All as Read
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Cog className="h-4 w-4" />
                Notification Settings
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">All Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">Last 7 days</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Unread</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-500">2</div>
                <p className="text-xs text-muted-foreground">Require attention</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">1</div>
                <p className="text-xs text-muted-foreground">Action required</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-500">3</div>
                <p className="text-xs text-muted-foreground">Upcoming events</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="unread">Unread</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="system">System</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="mt-4">
                    <div className="space-y-4">
                      {notificationData.map((notification) => (
                        <Card key={notification.id} className={`overflow-hidden ${!notification.read ? 'border-l-4 border-l-blue-500' : ''}`}>
                          <div className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex gap-3">
                                <div className="mt-0.5">
                                  {getTypeIcon(notification.type)}
                                </div>
                                <div>
                                  <h3 className={`text-sm font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                                    {notification.title}
                                  </h3>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {notification.description}
                                  </p>
                                  <div className="flex items-center gap-3 mt-2">
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <Clock className="h-3 w-3" />
                                      <span>{notification.time}</span>
                                    </div>
                                    {getPriorityBadge(notification.priority)}
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                {!notification.read && (
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Check className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="unread" className="mt-4">
                    <div className="space-y-4">
                      {notificationData
                        .filter(notification => !notification.read)
                        .map((notification) => (
                          <Card key={notification.id} className="overflow-hidden border-l-4 border-l-blue-500">
                            <div className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex gap-3">
                                  <div className="mt-0.5">
                                    {getTypeIcon(notification.type)}
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-semibold">
                                      {notification.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {notification.description}
                                    </p>
                                    <div className="flex items-center gap-3 mt-2">
                                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Clock className="h-3 w-3" />
                                        <span>{notification.time}</span>
                                      </div>
                                      {getPriorityBadge(notification.priority)}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="security" className="mt-4">
                    <div className="space-y-4">
                      {notificationData
                        .filter(notification => notification.type === 'security')
                        .map((notification) => (
                          <Card key={notification.id} className={`overflow-hidden ${!notification.read ? 'border-l-4 border-l-blue-500' : ''}`}>
                            <div className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex gap-3">
                                  <div className="mt-0.5">
                                    {getTypeIcon(notification.type)}
                                  </div>
                                  <div>
                                    <h3 className={`text-sm font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                                      {notification.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {notification.description}
                                    </p>
                                    <div className="flex items-center gap-3 mt-2">
                                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Clock className="h-3 w-3" />
                                        <span>{notification.time}</span>
                                      </div>
                                      {getPriorityBadge(notification.priority)}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-1">
                                  {!notification.read && (
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Check className="h-4 w-4" />
                                    </Button>
                                  )}
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="system" className="mt-4">
                    <div className="space-y-4">
                      {notificationData
                        .filter(notification => notification.type === 'system')
                        .map((notification) => (
                          <Card key={notification.id} className={`overflow-hidden ${!notification.read ? 'border-l-4 border-l-blue-500' : ''}`}>
                            <div className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex gap-3">
                                  <div className="mt-0.5">
                                    {getTypeIcon(notification.type)}
                                  </div>
                                  <div>
                                    <h3 className={`text-sm font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                                      {notification.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {notification.description}
                                    </p>
                                    <div className="flex items-center gap-3 mt-2">
                                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Clock className="h-3 w-3" />
                                        <span>{notification.time}</span>
                                      </div>
                                      {getPriorityBadge(notification.priority)}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-1">
                                  {!notification.read && (
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Check className="h-4 w-4" />
                                    </Button>
                                  )}
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </CardFooter>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Channels</CardTitle>
                  <CardDescription>Configure how you receive alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {channelData.map((channel) => (
                      <div key={channel.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <channel.icon className="h-5 w-5 text-muted-foreground" />
                          <span>{channel.name}</span>
                        </div>
                        <Switch checked={channel.enabled} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Customize your notification preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Security Alerts</h3>
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-muted-foreground">High severity</label>
                        <Switch checked={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-muted-foreground">Medium severity</label>
                        <Switch checked={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-muted-foreground">Low severity</label>
                        <Switch checked={false} />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">System Notifications</h3>
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-muted-foreground">Performance events</label>
                        <Switch checked={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-muted-foreground">System updates</label>
                        <Switch checked={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-muted-foreground">Scheduled maintenance</label>
                        <Switch checked={true} />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full">Save Settings</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Do Not Disturb Schedule</CardTitle>
              <CardDescription>Set quiet hours for notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BellOff className="h-5 w-5 text-muted-foreground" />
                    <span>Enable Do Not Disturb</span>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Day</TableHead>
                      <TableHead>Start Time</TableHead>
                      <TableHead>End Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Weekdays</TableCell>
                      <TableCell>10:00 PM</TableCell>
                      <TableCell>7:00 AM</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Weekends</TableCell>
                      <TableCell>11:00 PM</TableCell>
                      <TableCell>8:00 AM</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Plus className="h-4 w-4" />
                    Add Schedule
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default NotificationsPage;
