
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

export const ApiSettings = () => {
  const [showKeys, setShowKeys] = useState(false);

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>Manage your API keys for external services.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="telegram-api">Telegram Bot API Key</Label>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowKeys(!showKeys)}
                >
                  {showKeys ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Input
                id="telegram-api"
                type={showKeys ? "text" : "password"}
                placeholder="Enter your Telegram Bot API key"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-api">Custom Integration API Key</Label>
              <Input
                id="custom-api"
                type={showKeys ? "text" : "password"}
                placeholder="Enter your custom integration API key"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
