
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Eye, FileText, Lock, RefreshCw, Search, Shield, UserCheck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Sample data for security vulnerabilities
const vulnerabilityData = [
  { 
    id: 1, 
    name: 'CVE-2023-1234', 
    severity: 'critical', 
    system: 'Web Server', 
    status: 'open', 
    discovered: '2023-05-10',
    description: 'Remote code execution vulnerability in Apache'
  },
  { 
    id: 2, 
    name: 'CVE-2023-5678', 
    severity: 'high', 
    system: 'Database', 
    status: 'in-progress', 
    discovered: '2023-05-12',
    description: 'SQL injection vulnerability'
  },
  { 
    id: 3, 
    name: 'CVE-2023-9101', 
    severity: 'medium', 
    system: 'Authentication', 
    status: 'in-progress', 
    discovered: '2023-05-14',
    description: 'Weak password policy enforcement'
  },
  { 
    id: 4, 
    name: 'CVE-2023-1122', 
    severity: 'low', 
    system: 'API Gateway', 
    status: 'resolved', 
    discovered: '2023-05-01',
    description: 'Insecure direct object references'
  },
  { 
    id: 5, 
    name: 'CVE-2023-3344', 
    severity: 'medium', 
    system: 'File Storage', 
    status: 'resolved', 
    discovered: '2023-04-28',
    description: 'Improper access control'
  },
];

// Get badge for vulnerability severity
const getSeverityBadge = (severity: string) => {
  switch (severity) {
    case 'critical':
      return <Badge variant="destructive">Critical</Badge>;
    case 'high':
      return <Badge className="bg-orange-500 hover:bg-orange-600">High</Badge>;
    case 'medium':
      return <Badge className="bg-amber-500 hover:bg-amber-600">Medium</Badge>;
    case 'low':
      return <Badge className="bg-blue-500 hover:bg-blue-600">Low</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

// Get badge for vulnerability status
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'open':
      return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Open</Badge>;
    case 'in-progress':
      return <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">In Progress</Badge>;
    case 'resolved':
      return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Resolved</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const SecurityPage = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header />
        
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Security Center</h1>
              <p className="text-muted-foreground">Monitor and manage security threats</p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="default" size="sm" className="gap-1">
                <Search className="h-4 w-4" />
                Run Security Scan
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <FileText className="h-4 w-4" />
                Reports
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="col-span-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Security Score
                </CardTitle>
                <CardDescription>Overall security posture assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-bold text-blue-700">78/100</span>
                  <Badge className="bg-amber-500 hover:bg-amber-600">Moderate Risk</Badge>
                </div>
                <Progress value={78} className="h-2 bg-blue-100" />
                <div className="grid grid-cols-4 gap-4 mt-6">
                  <div className="text-center">
                    <Lock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm font-medium">Authentication</p>
                    <p className="text-xs text-muted-foreground">90/100</p>
                  </div>
                  <div className="text-center">
                    <Shield className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm font-medium">Network</p>
                    <p className="text-xs text-muted-foreground">82/100</p>
                  </div>
                  <div className="text-center">
                    <Eye className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm font-medium">Data</p>
                    <p className="text-xs text-muted-foreground">75/100</p>
                  </div>
                  <div className="text-center">
                    <UserCheck className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm font-medium">Access Control</p>
                    <p className="text-xs text-muted-foreground">68/100</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground">
                Last updated: May 15, 2023 at 09:45 AM
              </CardFooter>
            </Card>
          </div>
          
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Critical Vulnerabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">2</div>
                <p className="text-xs text-muted-foreground">Require immediate action</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-500">7</div>
                <p className="text-xs text-muted-foreground">Pending remediation</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">15</div>
                <p className="text-xs text-muted-foreground">In the last 30 days</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Security Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">129</div>
                <p className="text-xs text-muted-foreground">In the last 24 hours</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Vulnerabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="open">Open</TabsTrigger>
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                  <TabsTrigger value="resolved">Resolved</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vulnerability</TableHead>
                        <TableHead>System</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Discovered</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vulnerabilityData.map((vuln) => (
                        <TableRow key={vuln.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{vuln.name}</p>
                              <p className="text-xs text-muted-foreground">{vuln.description}</p>
                            </div>
                          </TableCell>
                          <TableCell>{vuln.system}</TableCell>
                          <TableCell>{getSeverityBadge(vuln.severity)}</TableCell>
                          <TableCell>{getStatusBadge(vuln.status)}</TableCell>
                          <TableCell>{vuln.discovered}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                Details
                              </Button>
                              {(vuln.status === 'open' || vuln.status === 'in-progress') && (
                                <Button variant="default" size="sm">
                                  Remediate
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="open" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vulnerability</TableHead>
                        <TableHead>System</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Discovered</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vulnerabilityData
                        .filter(vuln => vuln.status === 'open')
                        .map((vuln) => (
                          <TableRow key={vuln.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{vuln.name}</p>
                                <p className="text-xs text-muted-foreground">{vuln.description}</p>
                              </div>
                            </TableCell>
                            <TableCell>{vuln.system}</TableCell>
                            <TableCell>{getSeverityBadge(vuln.severity)}</TableCell>
                            <TableCell>{getStatusBadge(vuln.status)}</TableCell>
                            <TableCell>{vuln.discovered}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm">
                                  Details
                                </Button>
                                <Button variant="default" size="sm">
                                  Remediate
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="in-progress" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vulnerability</TableHead>
                        <TableHead>System</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Discovered</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vulnerabilityData
                        .filter(vuln => vuln.status === 'in-progress')
                        .map((vuln) => (
                          <TableRow key={vuln.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{vuln.name}</p>
                                <p className="text-xs text-muted-foreground">{vuln.description}</p>
                              </div>
                            </TableCell>
                            <TableCell>{vuln.system}</TableCell>
                            <TableCell>{getSeverityBadge(vuln.severity)}</TableCell>
                            <TableCell>{getStatusBadge(vuln.status)}</TableCell>
                            <TableCell>{vuln.discovered}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm">
                                  Details
                                </Button>
                                <Button variant="default" size="sm">
                                  Remediate
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="resolved" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vulnerability</TableHead>
                        <TableHead>System</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Discovered</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vulnerabilityData
                        .filter(vuln => vuln.status === 'resolved')
                        .map((vuln) => (
                          <TableRow key={vuln.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{vuln.name}</p>
                                <p className="text-xs text-muted-foreground">{vuln.description}</p>
                              </div>
                            </TableCell>
                            <TableCell>{vuln.system}</TableCell>
                            <TableCell>{getSeverityBadge(vuln.severity)}</TableCell>
                            <TableCell>{getStatusBadge(vuln.status)}</TableCell>
                            <TableCell>{vuln.discovered}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">GDPR</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">HIPAA</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">PCI DSS</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">ISO 27001</span>
                      <span className="text-sm font-medium">88%</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Security Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Failed login attempts detected</p>
                      <p className="text-xs text-muted-foreground">May 15, 2023 at 14:32 - Admin Portal</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Shield className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Firewall rules updated</p>
                      <p className="text-xs text-muted-foreground">May 15, 2023 at 13:15 - Network Gateway</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Unusual data access pattern detected</p>
                      <p className="text-xs text-muted-foreground">May 15, 2023 at 11:45 - Customer Database</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Shield className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Security patches applied</p>
                      <p className="text-xs text-muted-foreground">May 15, 2023 at 09:30 - Web Servers</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SecurityPage;
