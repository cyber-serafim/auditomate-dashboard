
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScanSettings } from '@/components/settings/ScanSettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { ApiSettings } from '@/components/settings/ApiSettings';
import { AccountSettings } from '@/components/settings/AccountSettings';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserCog } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Налаштування</h1>
        <p className="text-sm text-muted-foreground">
          Налаштуйте параметри сканування безпеки, сповіщення та API ключі.
        </p>
      </div>

      <div className="flex justify-end mb-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/settings/account')}
          className="gap-2"
        >
          <UserCog className="h-4 w-4" />
          Керування користувачами
        </Button>
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
