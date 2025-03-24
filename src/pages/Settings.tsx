
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScanSettings } from '@/components/settings/ScanSettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { ApiSettings } from '@/components/settings/ApiSettings';

const Settings = () => {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Configure your security scan preferences, notifications, and API keys.
        </p>
      </div>

      <Tabs defaultValue="scan" className="space-y-4">
        <TabsList>
          <TabsTrigger value="scan">Security Scan</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scan" className="space-y-4">
          <ScanSettings />
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <NotificationSettings />
        </TabsContent>
        
        <TabsContent value="api" className="space-y-4">
          <ApiSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
