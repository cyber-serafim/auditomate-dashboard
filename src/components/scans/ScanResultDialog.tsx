
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
import { AlertTriangle, CheckCircle, Download, Shield, XCircle, Link2, ArrowDown, ArrowUp } from "lucide-react";
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

interface Vulnerability {
  id: string;
  name: string;
  description: string;
  level: 'critical' | 'high' | 'medium' | 'low';
  location: string;
  recommendations: string;
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

          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                
                <Card className="col-span-1">
                  <CardContent className="p-4 flex flex-col items-center">
                    <div className="rounded-full bg-blue-100 p-3 mb-2">
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                    </div>
                    <p className="text-sm font-medium">Всього</p>
                    <p className="text-3xl font-bold mt-1">{totalVulnerabilities}</p>
                  </CardContent>
                </Card>
              </div>
              
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
                        <TableCell className="font-medium">{vuln.name}</TableCell>
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
            </div>
          </ScrollArea>

          <DialogFooter className="sm:justify-between mt-6">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Закрити
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Завантажити звіт
            </Button>
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
              <div className="px-4">
                <div className={`p-3 rounded-md border mb-4 ${getLevelColor(selectedVulnerability.level)}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {getLevelIcon(selectedVulnerability.level)}
                    <span className="font-medium">{getLevelText(selectedVulnerability.level)} рівень ризику</span>
                  </div>
                  <p className="text-sm">Місцезнаходження: {selectedVulnerability.location}</p>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="description">
                    <AccordionTrigger>Опис вразливості</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">{selectedVulnerability.description}</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="recommendations">
                    <AccordionTrigger>Рекомендації щодо усунення</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">{selectedVulnerability.recommendations}</p>
                    </AccordionContent>
                  </AccordionItem>
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
            <DialogContent className="sm:max-w-[425px]">
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
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="description">
                    <AccordionTrigger>Опис вразливості</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">{selectedVulnerability.description}</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="recommendations">
                    <AccordionTrigger>Рекомендації щодо усунення</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">{selectedVulnerability.recommendations}</p>
                    </AccordionContent>
                  </AccordionItem>
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
