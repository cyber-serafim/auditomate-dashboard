
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, CheckCircle, Download, Shield, XCircle, Link2, ArrowDown, ArrowUp, ExternalLink, Book, FileText, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose
} from "@/components/ui/drawer";
import { useMobile } from "@/hooks/use-mobile";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Vulnerability {
  id: string;
  name: string;
  description: string;
  level: 'critical' | 'high' | 'medium' | 'low';
  location: string;
  recommendations: string;
  remediation?: string;
  cveIds?: string[];
  complianceImpact?: string[];
  references?: {url: string; title: string}[];
  detailedDescription?: string;
  affectedSystems?: string[];
  exploitAvailable?: boolean;
  publiclyDisclosed?: boolean;
  patchAvailable?: boolean;
}

interface ScanResult {
  id: number;
  name: string;
  date: string;
  time: string;
  status: string;
  critical: number;
  high: number;
  medium: number;
  low: number;
  vulnerabilities: Vulnerability[];
  complianceResults?: {
    standard: string;
    passRate: number;
    totalChecks: number;
    passedChecks: number;
    failedChecks: number;
  }[];
  scanType?: string;
  scanTarget?: string;
  scanDuration?: string;
  scanDepth?: string;
}

interface ScanResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: ScanResult | null;
}

const ScanResultDialog = ({ open, onOpenChange, result }: ScanResultDialogProps) => {
  const isMobile = useMobile();
  const [selectedVulnerability, setSelectedVulnerability] = useState<Vulnerability | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("summary");
  
  if (!result) return null;
  
  const totalVulnerabilities = result.critical + result.high + result.medium + result.low;
  
  const getLevelIcon = (level: string) => {
    switch(level) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <Shield className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };
  
  const getLevelText = (level: string) => {
    switch(level) {
      case 'critical':
        return 'Критичний';
      case 'high':
        return 'Високий';
      case 'medium':
        return 'Середній';
      case 'low':
        return 'Низький';
      default:
        return '';
    }
  };
  
  const handleShowVulnerabilityDetails = (vulnerability: Vulnerability) => {
    setSelectedVulnerability(vulnerability);
    setDrawerOpen(true);
  };
  
  const getLevelColor = (level: string) => {
    switch(level) {
      case 'critical':
        return 'bg-red-100 text-red-500 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-500 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-500 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-600 border-green-200';
      default:
        return 'bg-gray-100 text-gray-500 border-gray-200';
    }
  };

  const renderComplianceSection = () => {
    if (!result.complianceResults || result.complianceResults.length === 0) {
      return (
        <div className="bg-muted rounded-md p-6 text-center text-muted-foreground">
          Для цього сканування не було виконано перевірок на відповідність стандартам
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {result.complianceResults.map((compliance, index) => (
            <Card key={index} className="overflow-hidden">
              <div className={`h-2 ${compliance.passRate >= 80 ? 'bg-green-500' : compliance.passRate >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}></div>
              <CardContent className="pt-4">
                <h3 className="font-semibold">{compliance.standard}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Відповідність:</span>
                  <span className={`font-medium ${compliance.passRate >= 80 ? 'text-green-600' : compliance.passRate >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
                    {compliance.passRate}%
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Перевірено:</span>
                  <span className="font-medium">{compliance.totalChecks} пунктів</span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Пройдено:</span>
                  <span className="font-medium text-green-600">{compliance.passedChecks}</span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Не пройдено:</span>
                  <span className="font-medium text-red-600">{compliance.failedChecks}</span>
                </div>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${compliance.passRate >= 80 ? 'bg-green-500' : compliance.passRate >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${compliance.passRate}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Результати сканування #{result.id}</DialogTitle>
            <DialogDescription>
              {result.name} - {result.date} {result.time}
            </DialogDescription>
          </DialogHeader>

          <Tabs 
            value={currentTab} 
            onValueChange={setCurrentTab} 
            className="w-full"
          >
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="summary">Підсумок</TabsTrigger>
              <TabsTrigger value="vulnerabilities">Вразливості</TabsTrigger>
              <TabsTrigger value="compliance">Відповідність</TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1 pr-4 h-[calc(90vh-240px)]">
              <TabsContent value="summary" className="pt-4 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {result.scanType && (
                    <div className="col-span-2">
                      <Card>
                        <CardContent className="pt-6">
                          <h3 className="text-sm font-medium mb-2">Інформація про сканування</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Тип сканування:</span>
                            </div>
                            <div className="font-medium">{result.scanType}</div>
                            
                            <div>
                              <span className="text-muted-foreground">Ціль:</span>
                            </div>
                            <div className="font-medium">{result.scanTarget}</div>
                            
                            <div>
                              <span className="text-muted-foreground">Тривалість:</span>
                            </div>
                            <div className="font-medium">{result.scanDuration || "15:30"}</div>
                            
                            <div>
                              <span className="text-muted-foreground">Глибина:</span>
                            </div>
                            <div className="font-medium">{result.scanDepth || "Стандартна"}</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                
                  <Card className="col-span-1">
                    <CardContent className="p-4 flex flex-col items-center">
                      <div className="rounded-full bg-red-100 p-3 mb-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      </div>
                      <p className="text-sm font-medium">Критичні</p>
                      <p className="text-3xl font-bold mt-1">{result.critical}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="col-span-1">
                    <CardContent className="p-4 flex flex-col items-center">
                      <div className="rounded-full bg-orange-100 p-3 mb-2">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                      </div>
                      <p className="text-sm font-medium">Високі</p>
                      <p className="text-3xl font-bold mt-1">{result.high}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="col-span-1">
                    <CardContent className="p-4 flex flex-col items-center">
                      <div className="rounded-full bg-yellow-100 p-3 mb-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      </div>
                      <p className="text-sm font-medium">Середні</p>
                      <p className="text-3xl font-bold mt-1">{result.medium}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="col-span-1">
                    <CardContent className="p-4 flex flex-col items-center">
                      <div className="rounded-full bg-green-100 p-3 mb-2">
                        <Shield className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="text-sm font-medium">Низькі</p>
                      <p className="text-3xl font-bold mt-1">{result.low}</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium mb-4">Розподіл вразливостей за рівнем ризику</h3>
                    <div className="w-full bg-gray-100 rounded-full h-6 overflow-hidden">
                      {result.critical > 0 && (
                        <div 
                          className="h-6 bg-red-500 float-left flex items-center justify-center"
                          style={{ width: `${(result.critical / totalVulnerabilities) * 100}%` }}
                        >
                          <span className="text-white text-xs font-medium">
                            {result.critical > 0 && `${result.critical}`}
                          </span>
                        </div>
                      )}
                      {result.high > 0 && (
                        <div 
                          className="h-6 bg-orange-500 float-left flex items-center justify-center"
                          style={{ width: `${(result.high / totalVulnerabilities) * 100}%` }}
                        >
                          <span className="text-white text-xs font-medium">
                            {result.high > 0 && `${result.high}`}
                          </span>
                        </div>
                      )}
                      {result.medium > 0 && (
                        <div 
                          className="h-6 bg-yellow-500 float-left flex items-center justify-center"
                          style={{ width: `${(result.medium / totalVulnerabilities) * 100}%` }}
                        >
                          <span className="text-white text-xs font-medium">
                            {result.medium > 0 && `${result.medium}`}
                          </span>
                        </div>
                      )}
                      {result.low > 0 && (
                        <div 
                          className="h-6 bg-green-500 float-left flex items-center justify-center"
                          style={{ width: `${(result.low / totalVulnerabilities) * 100}%` }}
                        >
                          <span className="text-white text-xs font-medium">
                            {result.low > 0 && `${result.low}`}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between mt-2 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                        <span>Критичні</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
                        <span>Високі</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
                        <span>Середні</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                        <span>Низькі</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {result.complianceResults && result.complianceResults.length > 0 && (
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-sm font-medium mb-4">Відповідність стандартам безпеки</h3>
                      <div className="space-y-4">
                        {result.complianceResults.slice(0, 3).map((compliance, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{compliance.standard}</Badge>
                              <span className="text-sm">{compliance.passedChecks}/{compliance.totalChecks} пройдено</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`font-medium ${compliance.passRate >= 80 ? 'text-green-600' : compliance.passRate >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
                                {compliance.passRate}%
                              </span>
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${compliance.passRate >= 80 ? 'bg-green-500' : compliance.passRate >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                                  style={{ width: `${compliance.passRate}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                        {result.complianceResults.length > 3 && (
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="p-0"
                            onClick={() => setCurrentTab('compliance')}
                          >
                            Переглянути всі стандарти
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium mb-2">Найкритичніші вразливості</h3>
                    <div className="space-y-3">
                      {result.vulnerabilities
                        .filter(v => v.level === 'critical' || v.level === 'high')
                        .slice(0, 3)
                        .map(vuln => (
                          <div key={vuln.id} className="p-3 rounded-md border bg-muted/30">
                            <div className="flex items-center gap-2 mb-1">
                              {getLevelIcon(vuln.level)}
                              <span className="font-medium text-sm">{vuln.name}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{vuln.description}</p>
                            <div className="flex justify-end">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleShowVulnerabilityDetails(vuln)}
                              >
                                Деталі
                              </Button>
                            </div>
                          </div>
                        ))
                      }
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="p-0"
                        onClick={() => setCurrentTab('vulnerabilities')}
                      >
                        Переглянути всі вразливості
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vulnerabilities" className="pt-4">
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Вразливість</TableHead>
                        <TableHead>Рівень ризику</TableHead>
                        <TableHead>Місцезнаходження</TableHead>
                        <TableHead className="w-[150px]">Дії</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {result.vulnerabilities.map((vuln) => (
                        <TableRow key={vuln.id}>
                          <TableCell className="font-mono text-xs">{vuln.id}</TableCell>
                          <TableCell className="font-medium">
                            <div>
                              {vuln.name}
                              <div className="flex flex-wrap gap-1 mt-1">
                                {vuln.cveIds?.map((cve, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {cve}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {getLevelIcon(vuln.level)}
                              <span className={`
                                ${vuln.level === 'critical' ? 'text-red-500' : ''}
                                ${vuln.level === 'high' ? 'text-orange-500' : ''}
                                ${vuln.level === 'medium' ? 'text-yellow-500' : ''}
                                ${vuln.level === 'low' ? 'text-green-600' : ''}
                              `}>
                                {getLevelText(vuln.level)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{vuln.location}</TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleShowVulnerabilityDetails(vuln)}
                            >
                              Деталі
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="compliance" className="pt-4">
                {renderComplianceSection()}
              </TabsContent>
            </ScrollArea>
          </Tabs>

          <DialogFooter className="sm:justify-between mt-6">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Закрити
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Зберегти як PDF
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Завантажити звіт
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {isMobile ? (
        <Drawer open={drawerOpen && !!selectedVulnerability} onOpenChange={setDrawerOpen}>
          {selectedVulnerability && (
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{selectedVulnerability.name}</DrawerTitle>
                <DrawerDescription>
                  ID: {selectedVulnerability.id} • Рівень ризику: {getLevelText(selectedVulnerability.level)}
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 mb-6">
                <div className={`p-3 rounded-md border mb-4 ${getLevelColor(selectedVulnerability.level)}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {getLevelIcon(selectedVulnerability.level)}
                    <span className="font-medium">{getLevelText(selectedVulnerability.level)} рівень ризику</span>
                  </div>
                  <p className="text-sm">Місцезнаходження: {selectedVulnerability.location}</p>
                  {selectedVulnerability.cveIds && selectedVulnerability.cveIds.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm mb-1">Пов'язані CVE:</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedVulnerability.cveIds.map((cve, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {cve}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {selectedVulnerability.exploitAvailable !== undefined && (
                  <div className="flex items-center gap-4 mb-4 py-2 px-3 rounded-md border">
                    <div className="flex items-center gap-2">
                      <Badge className={selectedVulnerability.exploitAvailable ? "bg-red-500" : "bg-gray-500"}>
                        {selectedVulnerability.exploitAvailable ? "Експлойт доступний" : "Експлойт відсутній"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={selectedVulnerability.patchAvailable ? "bg-green-500" : "bg-red-500"}>
                        {selectedVulnerability.patchAvailable ? "Патч доступний" : "Патч відсутній"}
                      </Badge>
                    </div>
                  </div>
                )}
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="description">
                    <AccordionTrigger>Опис вразливості</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">{selectedVulnerability.detailedDescription || selectedVulnerability.description}</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="recommendations">
                    <AccordionTrigger>Рекомендації щодо усунення</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-1">Короткий огляд:</h4>
                          <p className="text-sm">{selectedVulnerability.recommendations}</p>
                        </div>
                        
                        {selectedVulnerability.remediation && (
                          <div>
                            <h4 className="text-sm font-medium mb-1">Детальні інструкції:</h4>
                            <p className="text-sm">{selectedVulnerability.remediation}</p>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {selectedVulnerability.complianceImpact && selectedVulnerability.complianceImpact.length > 0 && (
                    <AccordionItem value="compliance">
                      <AccordionTrigger>Вплив на відповідність стандартам</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1">
                          {selectedVulnerability.complianceImpact.map((standard, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-blue-500" />
                              <span className="text-sm">{standard}</span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {selectedVulnerability.affectedSystems && selectedVulnerability.affectedSystems.length > 0 && (
                    <AccordionItem value="systems">
                      <AccordionTrigger>Вражені системи</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1">
                          {selectedVulnerability.affectedSystems.map((system, index) => (
                            <div key={index} className="text-sm py-1 border-b last:border-b-0 border-muted">
                              {system}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                  
                  {selectedVulnerability.references && selectedVulnerability.references.length > 0 && (
                    <AccordionItem value="references">
                      <AccordionTrigger>Посилання</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {selectedVulnerability.references.map((ref, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <ExternalLink className="h-4 w-4 text-blue-500" />
                              <a
                                href={ref.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline"
                              >
                                {ref.title}
                              </a>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
              </div>
              <DrawerFooter>
                <Button variant="outline" onClick={() => setDrawerOpen(false)}>
                  Закрити
                </Button>
              </DrawerFooter>
            </DrawerContent>
          )}
        </Drawer>
      ) : (
        <Dialog open={drawerOpen && !!selectedVulnerability} onOpenChange={setDrawerOpen}>
          {selectedVulnerability && (
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{selectedVulnerability.name}</DialogTitle>
                <DialogDescription>
                  ID: {selectedVulnerability.id} • Рівень ризику: {getLevelText(selectedVulnerability.level)}
                </DialogDescription>
              </DialogHeader>
              <div>
                <div className={`p-3 rounded-md border mb-4 ${getLevelColor(selectedVulnerability.level)}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {getLevelIcon(selectedVulnerability.level)}
                    <span className="font-medium">{getLevelText(selectedVulnerability.level)} рівень ризику</span>
                  </div>
                  <p className="text-sm">Місцезнаходження: {selectedVulnerability.location}</p>
                  {selectedVulnerability.cveIds && selectedVulnerability.cveIds.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm mb-1">Пов'язані CVE:</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedVulnerability.cveIds.map((cve, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {cve}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {selectedVulnerability.exploitAvailable !== undefined && (
                  <div className="flex items-center gap-4 mb-4 py-2 px-3 rounded-md border">
                    <div className="flex items-center gap-2">
                      <Badge className={selectedVulnerability.exploitAvailable ? "bg-red-500" : "bg-gray-500"}>
                        {selectedVulnerability.exploitAvailable ? "Експлойт доступний" : "Експлойт відсутній"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={selectedVulnerability.patchAvailable ? "bg-green-500" : "bg-red-500"}>
                        {selectedVulnerability.patchAvailable ? "Патч доступний" : "Патч відсутній"}
                      </Badge>
                    </div>
                  </div>
                )}
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="description">
                    <AccordionTrigger>Опис вразливості</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">{selectedVulnerability.detailedDescription || selectedVulnerability.description}</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="recommendations">
                    <AccordionTrigger>Рекомендації щодо усунення</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-1">Короткий огляд:</h4>
                          <p className="text-sm">{selectedVulnerability.recommendations}</p>
                        </div>
                        
                        {selectedVulnerability.remediation && (
                          <div>
                            <h4 className="text-sm font-medium mb-1">Детальні інструкції:</h4>
                            <p className="text-sm">{selectedVulnerability.remediation}</p>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {selectedVulnerability.complianceImpact && selectedVulnerability.complianceImpact.length > 0 && (
                    <AccordionItem value="compliance">
                      <AccordionTrigger>Вплив на відповідність стандартам</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1">
                          {selectedVulnerability.complianceImpact.map((standard, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-blue-500" />
                              <span className="text-sm">{standard}</span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {selectedVulnerability.affectedSystems && selectedVulnerability.affectedSystems.length > 0 && (
                    <AccordionItem value="systems">
                      <AccordionTrigger>Вражені системи</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1">
                          {selectedVulnerability.affectedSystems.map((system, index) => (
                            <div key={index} className="text-sm py-1 border-b last:border-b-0 border-muted">
                              {system}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                  
                  {selectedVulnerability.references && selectedVulnerability.references.length > 0 && (
                    <AccordionItem value="references">
                      <AccordionTrigger>Посилання</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {selectedVulnerability.references.map((ref, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <ExternalLink className="h-4 w-4 text-blue-500" />
                              <a
                                href={ref.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline"
                              >
                                {ref.title}
                              </a>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDrawerOpen(false)}>
                  Закрити
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      )}
    </>
  );
};

export default ScanResultDialog;
