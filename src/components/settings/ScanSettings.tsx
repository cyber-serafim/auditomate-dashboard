
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export const ScanSettings = () => {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Конфігурація сканування</CardTitle>
          <CardDescription>Налаштуйте параметри сканування безпеки.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Автоматичне сканування</Label>
              <p className="text-sm text-muted-foreground">Запускати сканування автоматично за розкладом</p>
            </div>
            <Switch />
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Частота сканування (годин)</Label>
              <Slider defaultValue={[24]} max={72} min={1} step={1} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Глибоке сканування</Label>
                <p className="text-sm text-muted-foreground">Увімкнути комплексний аналіз безпеки</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
