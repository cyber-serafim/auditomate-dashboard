
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Bell,
  Info,
  AlertTriangle,
  CheckCircle,
  X,
  MessageSquare,
  Settings,
  Clock,
  Filter,
  Trash
} from 'lucide-react';

const notifications = [
  {
    id: 1,
    category: 'alert',
    title: 'Critical Vulnerability Detected',
    description: 'A critical SQL injection vulnerability was detected in the authentication service.',
    time: '2 hours ago',
    read: false,
    severity: 'critical'
  },
  {
    id: 2,
    category: 'system',
    title: 'System Update Available',
    description: 'A new system update is available. Version 2.4.1 includes security patches.',
    time: '6 hours ago',
    read: true,
    severity: 'medium'
  },
  {
    id: 3,
    category: 'alert',
    title: 'Unusual Network Activity',
    description: 'Unusual network traffic detected from IP 192.168.1.45. Possible port scanning attempt.',
    time: '1 day ago',
    read: false,
    severity: 'high'
  },
  {
    id: 4,
    category: 'message',
    title: 'Message from Security Team',
    description: 'Please review the updated security protocols document by the end of the week.',
    time: '2 days ago',
    read: true,
    severity: 'low'
  },
  {
    id: 5,
    category: 'system',
    title: 'Database Backup Complete',
    description: 'Weekly database backup completed successfully. All systems operational.',
    time: '3 days ago',
    read: true,
    severity: 'info'
  },
  {
    id: 6,
    category: 'alert',
    title: 'Firewall Configuration Change',
    description: 'Firewall rules were updated. New outbound connections to port 8080 are now allowed.',
    time: '5 days ago',
    read: false,
    severity: 'medium'
  },
  {
    id: 7,
    category: 'message',
    title: 'New Comment on Security Report',
    description: 'John added a comment on the monthly security assessment report.',
    time: '1 week ago',
    read: true,
    severity: 'info'
  },
  {
    id: 8,
    category: 'system',
    title: 'Scheduled Maintenance',
    description: 'System maintenance scheduled for Sunday, 02:00 - 04:00 UTC. Expect brief service interruptions.',
    time: '1 week ago',
    read: true,
    severity: 'medium'
  }
];

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'critical':
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    case 'high':
      return <AlertTriangle className="h-5 w-5 text-orange-500" />;
    case 'medium':
      return <Info className="h-5 w-5 text-yellow-500" />;
    case 'low':
      return <Info className="h-5 w-5 text-blue-500" />;
    case 'info':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    default:
      return <Info className="h-5 w-5 text-gray-500" />;
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'alert':
      return <AlertTriangle className="h-5 w-5" />;
    case 'system':
      return <Bell className="h-5 w-5" />;
    case 'message':
      return <MessageSquare className="h-5 w-5" />;
    default:
      return <Info className="h-5 w-5" />;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'high':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'info':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const NotificationItem = ({ notification, onMarkAsRead, onDelete }: { 
  notification: any, 
  onMarkAsRead: (id: number) => void,
  onDelete: (id: number) => void
}) => {
  return (
    <Card className={`mb-3 ${notification.read ? 'bg-background' : 'bg-accent/5 border-l-4 border-l-accent'}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="mt-0.5">
              {getCategoryIcon(notification.category)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{notification.title}</h4>
                <Badge className={`${getSeverityColor(notification.severity)}`}>
                  {notification.severity}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
              <div className="flex items-center text-xs text-muted-foreground mt-2">
                <Clock className="h-3 w-3 mr-1" />
                {notification.time}
              </div>
            </div>
          </div>
          <div className="flex space-x-1">
            {!notification.read && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => onMarkAsRead(notification.id)}
              >
                <CheckCircle className="h-4 w-4" />
                <span className="sr-only">Mark as read</span>
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-destructive" 
              onClick={() => onDelete(notification.id)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notificationList, setNotificationList] = useState(notifications);
  
  const filteredNotifications = notificationList.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.category === activeTab;
  });
  
  const unreadCount = notificationList.filter(n => !n.read).length;
  
  const handleMarkAsRead = (id: number) => {
    setNotificationList(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };
  
  const handleDelete = (id: number) => {
    setNotificationList(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };
  
  const handleMarkAllAsRead = () => {
    setNotificationList(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const handleDeleteAll = () => {
    setNotificationList([]);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Manage your alerts, messages, and system notifications
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch id="auto-archive" />
            <label htmlFor="auto-archive" className="text-sm">Auto-archive read</label>
          </div>
          
          <Button variant="outline" size="sm" className="gap-1">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all" className="relative">
              All
              {unreadCount > 0 && (
                <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">{unreadCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="alert">Alerts</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="message">Messages</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={handleMarkAllAsRead} className="gap-1">
                <CheckCircle className="h-4 w-4" />
                Mark all as read
              </Button>
            )}
            
            {notificationList.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleDeleteAll} className="gap-1 text-destructive hover:text-destructive">
                <Trash className="h-4 w-4" />
                Clear all
              </Button>
            )}
          </div>
        </div>
        
        <TabsContent value="all" className="mt-0">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(notification => (
              <NotificationItem 
                key={notification.id} 
                notification={notification} 
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Bell className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-1">No notifications</h3>
                <p className="text-sm text-muted-foreground text-center">
                  You're all caught up! No notifications to display at the moment.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="alert" className="mt-0">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(notification => (
              <NotificationItem 
                key={notification.id} 
                notification={notification} 
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <AlertTriangle className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-1">No alerts</h3>
                <p className="text-sm text-muted-foreground text-center">
                  You have no active alerts at the moment.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="system" className="mt-0">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(notification => (
              <NotificationItem 
                key={notification.id} 
                notification={notification} 
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Bell className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-1">No system notifications</h3>
                <p className="text-sm text-muted-foreground text-center">
                  No system notifications to display.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="message" className="mt-0">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(notification => (
              <NotificationItem 
                key={notification.id} 
                notification={notification} 
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-1">No messages</h3>
                <p className="text-sm text-muted-foreground text-center">
                  You have no messages at this time.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="unread" className="mt-0">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(notification => (
              <NotificationItem 
                key={notification.id} 
                notification={notification} 
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <CheckCircle className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-1">No unread notifications</h3>
                <p className="text-sm text-muted-foreground text-center">
                  You have read all your notifications.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Configure how you want to receive notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Security Alerts</h4>
                <p className="text-sm text-muted-foreground">Critical security vulnerabilities and threats</p>
              </div>
              <Switch id="security-alerts" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">System Notifications</h4>
                <p className="text-sm text-muted-foreground">Updates, maintenance, and operational notices</p>
              </div>
              <Switch id="system-notifications" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Team Messages</h4>
                <p className="text-sm text-muted-foreground">Messages and comments from other team members</p>
              </div>
              <Switch id="team-messages" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">Send notifications to your email address</p>
              </div>
              <Switch id="email-notifications" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full sm:w-auto">Save Preferences</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotificationsPage;
