import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Download, Fingerprint, Lock, RefreshCw, Settings, Shield, ShieldAlert } from 'lucide-react';

const SecurityPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Security Center</h1>
            <p className="text-muted-foreground">Manage your organization's security posture</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
        
        {/* Security score and metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Security Score</CardTitle>
              <CardDescription>Overall security posture</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">86</div>
              <p className="text-xs text-muted-foreground">+4% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Vulnerabilities</CardTitle>
              <CardDescription>Identified security weaknesses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-500">12</div>
              <p className="text-xs text-muted-foreground">3 new this week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Threats Detected</CardTitle>
              <CardDescription>Malicious activities blocked</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">3</div>
              <p className="text-xs text-muted-foreground">1 critical this week</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Main security tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Security Overview</CardTitle>
            <CardDescription>Review and manage security settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="firewall">Firewall</TabsTrigger>
                <TabsTrigger value="intrusion">Intrusion Detection</TabsTrigger>
                <TabsTrigger value="access">Access Control</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-4">
                <div className="flex items-center justify-center h-52">
                  <div className="text-center">
                    <ShieldAlert className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-1">Security Overview</h3>
                    <p className="text-sm text-muted-foreground">A summary of your security status would appear here</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="firewall" className="mt-4">
                <div className="flex items-center justify-center h-52">
                  <div className="text-center">
                    <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-1">Firewall Settings</h3>
                    <p className="text-sm text-muted-foreground">Firewall configuration and status would appear here</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="intrusion" className="mt-4">
                <div className="flex items-center justify-center h-52">
                  <div className="text-center">
                    <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-1">Intrusion Detection</h3>
                    <p className="text-sm text-muted-foreground">Intrusion detection system logs and settings would appear here</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="access" className="mt-4">
                <div className="flex items-center justify-center h-52">
                  <div className="text-center">
                    <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-1">Access Control</h3>
                    <p className="text-sm text-muted-foreground">Access control lists and user permissions would appear here</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SecurityPage;
