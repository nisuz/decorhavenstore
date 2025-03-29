
import React from 'react';
import NotificationSettings from '@/components/admin/NotificationSettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const NotificationSettingsPage = () => {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Notification Settings</h1>
      <p className="text-muted-foreground mb-8">
        Configure where and how order notifications are sent when customers place orders.
      </p>
      
      <Tabs defaultValue="discord">
        <TabsList className="mb-6">
          <TabsTrigger value="discord">Discord</TabsTrigger>
          <TabsTrigger value="telegram">Telegram</TabsTrigger>
        </TabsList>
        <TabsContent value="discord" className="mt-0">
          <div className="max-w-2xl">
            <NotificationSettings />
          </div>
        </TabsContent>
        <TabsContent value="telegram" className="mt-0">
          <div className="max-w-2xl">
            <NotificationSettings />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationSettingsPage;
