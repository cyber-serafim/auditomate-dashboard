
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const NotificationSettings = () => {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Configure how you want to receive alerts and notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive security alerts via email</p>
            </div>
            <Switch />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Telegram Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive alerts via Telegram</p>
            </div>
            <Switch />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telegram">Telegram Chat ID</Label>
            <Input id="telegram" placeholder="Enter your Telegram Chat ID" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
