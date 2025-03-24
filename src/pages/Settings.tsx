
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScanSettings } from '@/components/settings/ScanSettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { ApiSettings } from '@/components/settings/ApiSettings';

const Settings = () => {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Налаштування</h1>
        <p className="text-sm text-muted-foreground">
          Налаштуйте параметри сканування безпеки, сповіщення та API ключі.
        </p>
      </div>

      <Tabs defaultValue="scan">
        <TabsList>
          <TabsTrigger value="scan">Сканування безпеки</TabsTrigger>
          <TabsTrigger value="notifications">Сповіщення</TabsTrigger>
          <TabsTrigger value="api">API ключі</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scan">
          <div className="space-y-4">
            <ScanSettings />
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <div className="space-y-4">
            <NotificationSettings />
          </div>
        </TabsContent>
        
        <TabsContent value="api">
          <div className="space-y-4">
            <ApiSettings />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
