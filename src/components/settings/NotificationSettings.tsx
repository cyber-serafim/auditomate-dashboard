
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const NotificationSettings = () => {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Налаштування сповіщень</CardTitle>
          <CardDescription>Налаштуйте, як ви хочете отримувати сповіщення та повідомлення.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Сповіщення електронною поштою</Label>
              <p className="text-sm text-muted-foreground">Отримувати сповіщення про безпеку електронною поштою</p>
            </div>
            <Switch />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Адреса електронної пошти</Label>
            <Input id="email" type="email" placeholder="Введіть вашу електронну пошту" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Сповіщення Telegram</Label>
              <p className="text-sm text-muted-foreground">Отримувати сповіщення через Telegram</p>
            </div>
            <Switch />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telegram">ID чату Telegram</Label>
            <Input id="telegram" placeholder="Введіть ваш ID чату Telegram" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
