
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export const ScanSettings = () => {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Scan Configuration</CardTitle>
          <CardDescription>Configure your security scan preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Automatic Scans</Label>
              <p className="text-sm text-muted-foreground">Run scans automatically on a schedule</p>
            </div>
            <Switch />
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Scan Frequency (hours)</Label>
              <Slider defaultValue={[24]} max={72} min={1} step={1} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Deep Scan</Label>
                <p className="text-sm text-muted-foreground">Enable comprehensive security analysis</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
