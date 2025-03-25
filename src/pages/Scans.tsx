
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, AlertTriangle, Shield, CheckCircle, XCircle, Calendar, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import StartScanDialog from '@/components/scans/StartScanDialog';
import ScanProgressDialog from '@/components/scans/ScanProgressDialog';
import ScanResultDialog from '@/components/scans/ScanResultDialog';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';

// Initial scan data
const initialScansData = [
  {
    id: 1,
    name: "Повне сканування системи",
    date: "18 червня 2023",
    time: "09:45",
    status: "completed",
    critical: 3,
    high: 7,
    medium: 12,
    low: 24,
  },
  {
    id: 2,
    name: "Сканування вразливостей мережі",
    date: "15 червня 2023",
    time: "14:30",
    status: "completed",
    critical: 1,
    high: 5,
    medium: 8,
    low: 17,
  },
  {
    id: 3,
    name: "Аудит безпеки API",
    date: "10 червня 2023",
    time: "11:20",
    status: "completed",
    critical: 0,
    high: 3,
    medium: 6,
    low: 11,
  },
  {
    id: 4,
    name: "Щотижневе автоматичне сканування",
    date: "5 червня 2023",
    time: "03:00",
    status: "completed",
    critical: 5,
    high: 9,
    medium: 14,
    low: 22,
  },
  {
    id: 5,
    name: "Заплановане сканування",
    date: "25 червня 2023",
    time: "08:00",
    status: "scheduled",
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
  },
];

const ScanStatusBadge = ({ status }: { status: string }) => {
  if (status === "completed") {
    return (
      <div className="flex items-center gap-1">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <span className="text-green-500 text-sm">Завершено</span>
      </div>
    );
  } else if (status === "scheduled") {
    return (
      <div className="flex items-center gap-1">
        <Calendar className="h-4 w-4 text-blue-500" />
        <span className="text-blue-500 text-sm">Заплановано</span>
      </div>
    );
  } else if (status === "in-progress") {
    return (
      <div className="flex items-center gap-1">
        <Clock className="h-4 w-4 text-amber-500 animate-pulse" />
        <span className="text-amber-500 text-sm">В процесі</span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-1">
        <XCircle className="h-4 w-4 text-red-500" />
        <span className="text-red-500 text-sm">Помилка</span>
      </div>
    );
  }
};

const ScanSummary = ({ scansData }: { scansData: any[] }) => {
  // Calculate totals from all completed scans
  const totals = scansData
    .filter(scan => scan.status === "completed")
    .reduce(
      (acc, scan) => {
        acc.critical += scan.critical;
        acc.high += scan.high;
        acc.medium += scan.medium;
        acc.low += scan.low;
        return acc;
      },
      { critical: 0, high: 0, medium: 0, low: 0 }
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 flex flex-col items-center">
          <div className="rounded-full bg-red-100 p-3 mb-2">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
          <p className="text-sm font-medium">Критичні вразливості</p>
          <p className="text-3xl font-bold mt-1">{totals.critical}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col items-center">
          <div className="rounded-full bg-orange-100 p-3 mb-2">
            <AlertTriangle className="h-6 w-6 text-orange-500" />
          </div>
          <p className="text-sm font-medium">Високий ризик</p>
          <p className="text-3xl font-bold mt-1">{totals.high}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col items-center">
          <div className="rounded-full bg-yellow-100 p-3 mb-2">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
          </div>
          <p className="text-sm font-medium">Середній ризик</p>
          <p className="text-3xl font-bold mt-1">{totals.medium}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col items-center">
          <div className="rounded-full bg-green-100 p-3 mb-2">
            <Shield className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-sm font-medium">Низький ризик</p>
          <p className="text-3xl font-bold mt-1">{totals.low}</p>
        </CardContent>
      </Card>
    </div>
  );
};

const Scans = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [scansData, setScansData] = useState(initialScansData);
  const [startScanDialogOpen, setStartScanDialogOpen] = useState(false);
  const [scanProgressDialogOpen, setScanProgressDialogOpen] = useState(false);
  const [scanResultDialogOpen, setScanResultDialogOpen] = useState(false);
  const [currentScanConfig, setCurrentScanConfig] = useState<any>(null);
  const [currentScanResult, setCurrentScanResult] = useState<any>(null);
  const { toast } = useToast();
  
  // Check if we need to open the scan dialog (coming from dashboard)
  useEffect(() => {
    if (location.state?.openScanDialog) {
      setStartScanDialogOpen(true);
      // Clear the state so refreshing doesn't reopen the dialog
      window.history.replaceState({}, document.title);
    }
  }, [location]);
  
  const filteredScans = scansData.filter(scan => 
    scan.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleStartScan = (values: any) => {
    setCurrentScanConfig({
      name: values.name,
      target: values.target,
      scanType: values.scanType,
      targetType: values.targetType
    });
    setScanProgressDialogOpen(true);
    
    // Add the scan in progress to the list
    const newScan = {
      id: Date.now(),
      name: values.name,
      date: new Date().toLocaleDateString('uk-UA'),
      time: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
      status: "in-progress",
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
    };
    
    setScansData(prev => [newScan, ...prev]);
  };
  
  const handleScanComplete = (results: any) => {
    // Update the scan in the list with the results
    setScansData(prev => 
      prev.map(scan => 
        scan.status === "in-progress" 
          ? { 
              ...scan, 
              status: "completed", 
              critical: results.critical,
              high: results.high,
              medium: results.medium,
              low: results.low
            } 
          : scan
      )
    );
    
    setCurrentScanResult(results);
    
    // Wait briefly before showing the results dialog
    setTimeout(() => {
      setScanProgressDialogOpen(false);
      setScanResultDialogOpen(true);
    }, 1000);
  };
  
  const handleShowDetails = (scanId: number) => {
    const scan = scansData.find(s => s.id === scanId);
    
    if (scan.status === "completed") {
      // Generate mock vulnerabilities for the selected scan
      const mockVulnerabilities = [];
      
      for (let i = 0; i < scan.critical; i++) {
        mockVulnerabilities.push({
          id: `VULN-${Math.floor(Math.random() * 10000)}`,
          name: getRandomVulnerabilityName(),
          description: 'Детальний опис вразливості та її потенційних наслідків',
          level: 'critical',
          location: 'Server',
          recommendations: 'Рекомендації щодо усунення вразливості'
        });
      }
      
      for (let i = 0; i < scan.high; i++) {
        mockVulnerabilities.push({
          id: `VULN-${Math.floor(Math.random() * 10000)}`,
          name: getRandomVulnerabilityName(),
          description: 'Детальний опис вразливості та її потенційних наслідків',
          level: 'high',
          location: 'Server',
          recommendations: 'Рекомендації щодо усунення вразливості'
        });
      }
      
      for (let i = 0; i < scan.medium; i++) {
        mockVulnerabilities.push({
          id: `VULN-${Math.floor(Math.random() * 10000)}`,
          name: getRandomVulnerabilityName(),
          description: 'Детальний опис вразливості та її потенційних наслідків',
          level: 'medium',
          location: 'Server',
          recommendations: 'Рекомендації щодо усунення вразливості'
        });
      }
      
      for (let i = 0; i < scan.low; i++) {
        mockVulnerabilities.push({
          id: `VULN-${Math.floor(Math.random() * 10000)}`,
          name: getRandomVulnerabilityName(),
          description: 'Детальний опис вразливості та її потенційних наслідків',
          level: 'low',
          location: 'Server',
          recommendations: 'Рекомендації щодо усунення вразливості'
        });
      }
      
      setCurrentScanResult({
        ...scan,
        vulnerabilities: mockVulnerabilities
      });
      
      setScanResultDialogOpen(true);
    } else if (scan.status === "scheduled") {
      toast({
        title: "Заплановане сканування",
        description: "Це сканування ще не було запущено",
      });
    }
  };
  
  const getRandomVulnerabilityName = () => {
    const vulnNames = [
      'SQL Injection', 
      'Cross-Site Scripting (XSS)', 
      'Outdated SSL Certificate', 
      'Insecure Direct Object References',
      'Security Misconfiguration',
      'Missing Authentication',
      'Cross-Site Request Forgery (CSRF)',
      'Using Components with Known Vulnerabilities',
      'Sensitive Data Exposure',
      'Insufficient Logging & Monitoring',
      'Broken Access Control',
      'Buffer Overflow',
      'Unpatched Software',
      'Default Credentials',
      'Directory Traversal'
    ];
    
    return vulnNames[Math.floor(Math.random() * vulnNames.length)];
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Сканування вразливостей</h1>
        <p className="text-sm text-muted-foreground">
          Перегляд історії сканувань та управління скануваннями безпеки.
        </p>
      </div>
      
      <ScanSummary scansData={scansData} />
      
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Пошук сканувань"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button 
          className="w-full md:w-auto"
          onClick={() => setStartScanDialogOpen(true)}
        >
          <Search className="mr-2 h-4 w-4" />
          Запустити нове сканування
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Історія сканувань</CardTitle>
          <CardDescription>Список усіх проведених та запланованих сканувань.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Назва</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Час</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-center">Крит.</TableHead>
                <TableHead className="text-center">Вис.</TableHead>
                <TableHead className="text-center">Сер.</TableHead>
                <TableHead className="text-center">Низ.</TableHead>
                <TableHead className="text-right">Дії</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredScans.map((scan) => (
                <TableRow key={scan.id}>
                  <TableCell className="font-medium">{scan.name}</TableCell>
                  <TableCell>{scan.date}</TableCell>
                  <TableCell>{scan.time}</TableCell>
                  <TableCell>
                    <ScanStatusBadge status={scan.status} />
                  </TableCell>
                  <TableCell className="text-center">
                    {scan.status === "completed" ? (
                      <span className={`font-semibold ${scan.critical > 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
                        {scan.critical}
                      </span>
                    ) : '-'}
                  </TableCell>
                  <TableCell className="text-center">
                    {scan.status === "completed" ? (
                      <span className={`font-semibold ${scan.high > 0 ? 'text-orange-500' : 'text-muted-foreground'}`}>
                        {scan.high}
                      </span>
                    ) : '-'}
                  </TableCell>
                  <TableCell className="text-center">
                    {scan.status === "completed" ? (
                      <span className={`font-semibold ${scan.medium > 0 ? 'text-yellow-500' : 'text-muted-foreground'}`}>
                        {scan.medium}
                      </span>
                    ) : '-'}
                  </TableCell>
                  <TableCell className="text-center">
                    {scan.status === "completed" ? (
                      <span className={`font-semibold ${scan.low > 0 ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {scan.low}
                      </span>
                    ) : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleShowDetails(scan.id)}
                    >
                      Деталі
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Dialogs */}
      <StartScanDialog 
        open={startScanDialogOpen} 
        onOpenChange={setStartScanDialogOpen}
        onStartScan={handleStartScan}
      />
      
      {currentScanConfig && (
        <ScanProgressDialog
          open={scanProgressDialogOpen}
          onOpenChange={setScanProgressDialogOpen}
          scanName={currentScanConfig.name}
          scanTarget={currentScanConfig.target}
          onScanComplete={handleScanComplete}
        />
      )}
      
      <ScanResultDialog
        open={scanResultDialogOpen}
        onOpenChange={setScanResultDialogOpen}
        result={currentScanResult}
      />
    </div>
  );
};

export default Scans;
