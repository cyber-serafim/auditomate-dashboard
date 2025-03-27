
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, AlertTriangle, Shield, CheckCircle, XCircle, Calendar, Clock, FileText, Filter, MoreHorizontal, FileBarChart } from "lucide-react";
import { Input } from "@/components/ui/input";
import StartScanDialog from '@/components/scans/StartScanDialog';
import ScanProgressDialog from '@/components/scans/ScanProgressDialog';
import ScanResultDialog from '@/components/scans/ScanResultDialog';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Enhanced scan data with compliance results
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
    scanType: "Повне сканування",
    scanTarget: "192.168.1.0/24",
    scanDuration: "01:32:45",
    scanDepth: "Стандартна",
    complianceResults: [
      { standard: "PCI DSS", passRate: 73, totalChecks: 248, passedChecks: 181, failedChecks: 67 },
      { standard: "ISO 27001", passRate: 82, totalChecks: 167, passedChecks: 137, failedChecks: 30 },
      { standard: "HIPAA", passRate: 68, totalChecks: 157, passedChecks: 107, failedChecks: 50 }
    ]
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
    scanType: "Мережеве сканування",
    scanTarget: "10.0.0.0/8",
    scanDuration: "00:48:22"
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
    scanType: "API сканування",
    scanTarget: "https://api.example.com",
    scanDuration: "00:25:18",
    complianceResults: [
      { standard: "OWASP API Top 10", passRate: 85, totalChecks: 48, passedChecks: 41, failedChecks: 7 }
    ]
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
    scanType: "Планове сканування",
    scanTarget: "Вся інфраструктура",
    scanDuration: "03:15:42",
    complianceResults: [
      { standard: "CIS", passRate: 91, totalChecks: 156, passedChecks: 142, failedChecks: 14 },
      { standard: "NIST 800-53", passRate: 87, totalChecks: 204, passedChecks: 178, failedChecks: 26 }
    ]
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
    scanType: "Повне сканування",
    scanTarget: "192.168.1.0/24",
  },
  {
    id: 6,
    name: "Сканування мобільних пристроїв",
    date: "20 червня 2023",
    time: "15:30",
    status: "scheduled",
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    scanType: "Мобільні пристрої",
    scanTarget: "Корпоративні пристрої"
  },
  {
    id: 7,
    name: "Перевірка відповідності GDPR",
    date: "12 червня 2023",
    time: "10:15",
    status: "completed",
    critical: 2,
    high: 4,
    medium: 12,
    low: 8,
    scanType: "Перевірка відповідності",
    scanTarget: "Інфраструктура обробки даних",
    scanDuration: "01:22:10",
    complianceResults: [
      { standard: "GDPR", passRate: 76, totalChecks: 118, passedChecks: 90, failedChecks: 28 }
    ]
  }
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

  // Calculate compliance averages
  const complianceData = scansData
    .filter(scan => scan.complianceResults && scan.complianceResults.length > 0)
    .flatMap(scan => scan.complianceResults);
  
  const complianceScans = complianceData.length;
  
  const complianceAverage = complianceData.length > 0
    ? Math.round(complianceData.reduce((acc, curr) => acc + curr.passRate, 0) / complianceData.length)
    : 0;

  const topStandards = [...new Set(complianceData.map(item => item.standard))]
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Vulnerability Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

      {/* Compliance Summary */}
      {complianceScans > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Відповідність стандартам</CardTitle>
            <CardDescription>
              Середній показник відповідності стандартам безпеки
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-full md:w-auto flex-shrink-0">
                <div className="relative flex items-center justify-center w-32 h-32 mx-auto">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={complianceAverage >= 80 ? "#10b981" : complianceAverage >= 60 ? "#f59e0b" : "#ef4444"}
                      strokeWidth="10"
                      strokeDasharray={`${complianceAverage * 2.83} ${283 - complianceAverage * 2.83}`}
                      strokeDashoffset="70.75"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">{complianceAverage}%</span>
                  </div>
                </div>
              </div>
              <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {topStandards.map((standard, index) => {
                  const standardData = complianceData.find(item => item.standard === standard);
                  if (!standardData) return null;
                  
                  return (
                    <Card key={index} className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="font-medium text-sm mb-1">{standard}</div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xl font-bold ${
                            standardData.passRate >= 80 ? "text-green-600" : 
                            standardData.passRate >= 60 ? "text-amber-600" : 
                            "text-red-600"
                          }`}>
                            {standardData.passRate}%
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
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
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Check if we need to open the scan dialog (coming from dashboard)
  useEffect(() => {
    if (location.state?.openScanDialog) {
      setStartScanDialogOpen(true);
      // Clear the state so refreshing doesn't reopen the dialog
      window.history.replaceState({}, document.title);
    }
  }, [location]);
  
  const filteredScans = scansData.filter(scan => {
    // Apply search filter
    const matchesSearch = scan.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    const matchesStatus = statusFilter ? scan.status === statusFilter : true;
    
    // Apply type filter
    const matchesType = typeFilter ? scan.scanType === typeFilter : true;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  const handleStartScan = (values: any) => {
    setCurrentScanConfig({
      name: values.name,
      target: values.target,
      scanType: values.scanType,
      targetType: values.targetType,
      complianceStandards: values.complianceStandards,
      reportFormat: values.reportFormat,
      scanDepth: values.scanDepth,
      scheduleEnabled: values.scheduleEnabled,
      scheduleFrequency: values.scheduleFrequency
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
      scanType: getScanTypeName(values.scanType),
      scanTarget: values.target,
    };
    
    setScansData(prev => [newScan, ...prev]);
  };
  
  const getScanTypeName = (type: string) => {
    switch (type) {
      case "full": return "Повне сканування";
      case "network": return "Мережеве сканування";
      case "api": return "API сканування";
      case "service": return "Сканування сервісів";
      case "compliance": return "Перевірка відповідності";
      case "mobile": return "Мобільні пристрої";
      case "web": return "Веб-застосунки";
      default: return type;
    }
  };
  
  const handleScanComplete = (results: any) => {
    // Generate mocked compliance results if this is a compliance scan
    let complianceResults = null;
    if (currentScanConfig?.complianceStandards?.length > 0) {
      complianceResults = currentScanConfig.complianceStandards.map((standard: string) => {
        const passRate = Math.floor(Math.random() * 30) + 70; // 70-99%
        const totalChecks = Math.floor(Math.random() * 100) + 100; // 100-199
        const passedChecks = Math.floor(totalChecks * passRate / 100);
        const failedChecks = totalChecks - passedChecks;
        
        let standardName = standard;
        switch (standard) {
          case "hipaa": standardName = "HIPAA"; break;
          case "pci": standardName = "PCI DSS"; break;
          case "cis": standardName = "CIS"; break;
          case "disa": standardName = "DISA STIGs"; break;
          case "ffiec": standardName = "FFIEC"; break;
          case "nerc": standardName = "NERC CIP"; break;
          case "cert": standardName = "CERT"; break;
          case "cobit": standardName = "COBIT/ITIL"; break;
          case "iso27001": standardName = "ISO 27001"; break;
          case "nist": standardName = "NIST 800-53"; break;
          case "gdpr": standardName = "GDPR"; break;
          default: standardName = standard;
        }
        
        return {
          standard: standardName,
          passRate,
          totalChecks,
          passedChecks,
          failedChecks
        };
      });
    }
    
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
              low: results.low,
              scanDuration: getRandomDuration(),
              complianceResults
            } 
          : scan
      )
    );
    
    // Prepare the vulnerability results with more detailed information
    const enhancedVulnerabilities = results.vulnerabilities.map((vuln: any) => {
      const cveIds = vuln.level === 'critical' || vuln.level === 'high' 
        ? generateRandomCVEs() 
        : (Math.random() > 0.7 ? generateRandomCVEs(1) : undefined);
      
      const exploitAvailable = vuln.level === 'critical' 
        ? Math.random() > 0.3 
        : vuln.level === 'high' 
          ? Math.random() > 0.6 
          : vuln.level === 'medium' 
            ? Math.random() > 0.8 
            : false;
      
      const references = generateReferences(vuln.name);
      
      const complianceImpact = complianceResults 
        ? complianceResults
            .filter(() => Math.random() > 0.6)
            .map((c: any) => `${c.standard} - Відповідність знижена`) 
        : undefined;
      
      const affectedSystems = generateAffectedSystems();
      
      return {
        ...vuln,
        cveIds,
        exploitAvailable,
        publiclyDisclosed: Math.random() > 0.5,
        patchAvailable: Math.random() > 0.3,
        references,
        complianceImpact,
        affectedSystems,
        detailedDescription: `${vuln.description} Ця вразливість може дозволити зловмиснику отримати несанкціонований доступ до системи, що може призвести до компрометації даних, порушення цілісності системи або відмови в обслуговуванні. Системні адміністратори повинні негайно застосувати рекомендовані виправлення.`,
        remediation: `Для усунення цієї вразливості рекомендується виконати наступні кроки:
1. Оновіть програмне забезпечення до останньої версії.
2. Застосуйте всі доступні патчі безпеки.
3. Налаштуйте правила брандмауера для обмеження доступу.
4. Впровадьте принцип найменших привілеїв для всіх облікових записів.
5. Регулярно перевіряйте журнали безпеки на наявність підозрілої активності.`
      };
    });
    
    setCurrentScanResult({
      ...results,
      vulnerabilities: enhancedVulnerabilities,
      scanType: getScanTypeName(currentScanConfig.scanType),
      scanTarget: currentScanConfig.target,
      scanDuration: getRandomDuration(),
      scanDepth: getDepthName(currentScanConfig.scanDepth),
      complianceResults
    });
    
    // Wait briefly before showing the results dialog
    setTimeout(() => {
      setScanProgressDialogOpen(false);
      setScanResultDialogOpen(true);
    }, 1000);
  };

  const getDepthName = (depth: string) => {
    switch (depth) {
      case "basic": return "Базова";
      case "standard": return "Стандартна";
      case "deep": return "Поглиблена";
      default: return "Стандартна";
    }
  };
  
  const getRandomDuration = () => {
    const hours = Math.floor(Math.random() * 2);
    const minutes = Math.floor(Math.random() * 60);
    const seconds = Math.floor(Math.random() * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const generateRandomCVEs = (count = Math.floor(Math.random() * 3) + 1) => {
    const cves = [];
    for (let i = 0; i < count; i++) {
      const year = Math.floor(Math.random() * 5) + 2018;
      const id = Math.floor(Math.random() * 10000);
      cves.push(`CVE-${year}-${id.toString().padStart(4, '0')}`);
    }
    return cves;
  };
  
  const generateReferences = (vulnName: string) => {
    const references = [];
    
    if (Math.random() > 0.3) {
      references.push({
        url: "https://www.cve.org/",
        title: "CVE Database - " + vulnName
      });
    }
    
    if (Math.random() > 0.5) {
      references.push({
        url: "https://nvd.nist.gov/",
        title: "NIST Vulnerability Database"
      });
    }
    
    if (Math.random() > 0.7) {
      references.push({
        url: "https://cwe.mitre.org/",
        title: "Common Weakness Enumeration"
      });
    }
    
    if (vulnName.includes("SQL")) {
      references.push({
        url: "https://owasp.org/www-community/attacks/SQL_Injection",
        title: "OWASP SQL Injection"
      });
    }
    
    if (vulnName.includes("XSS")) {
      references.push({
        url: "https://owasp.org/www-community/attacks/xss/",
        title: "OWASP Cross Site Scripting"
      });
    }
    
    return references;
  };
  
  const generateAffectedSystems = () => {
    const systems = [
      "Web Server (Apache 2.4.41)",
      "Database Server (MySQL 5.7.32)",
      "Application Server (Tomcat 9.0.37)",
      "Load Balancer (NGINX 1.18.0)",
      "API Gateway",
      "Authentication Server",
      "File Server",
      "Mail Server",
      "DNS Server",
      "DHCP Server"
    ];
    
    const count = Math.floor(Math.random() * 3) + 1;
    const selectedSystems = [];
    
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * systems.length);
      selectedSystems.push(systems[randomIndex]);
      systems.splice(randomIndex, 1);
    }
    
    return selectedSystems;
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
          location: scan.scanTarget || 'Server',
          recommendations: 'Рекомендації щодо усунення вразливості',
          cveIds: generateRandomCVEs(),
          exploitAvailable: Math.random() > 0.3,
          publiclyDisclosed: Math.random() > 0.2,
          patchAvailable: Math.random() > 0.4,
          references: generateReferences(getRandomVulnerabilityName()),
          affectedSystems: generateAffectedSystems(),
          detailedDescription: 'Розширений детальний опис вразливості, включаючи технічні деталі, вектори атаки та потенційні наслідки для безпеки системи.',
          remediation: 'Докладні кроки для усунення вразливості, включаючи оновлення, зміни конфігурації та рекомендовані заходи безпеки.'
        });
      }
      
      for (let i = 0; i < scan.high; i++) {
        mockVulnerabilities.push({
          id: `VULN-${Math.floor(Math.random() * 10000)}`,
          name: getRandomVulnerabilityName(),
          description: 'Детальний опис вразливості та її потенційних наслідків',
          level: 'high',
          location: scan.scanTarget || 'Server',
          recommendations: 'Рекомендації щодо усунення вразливості',
          cveIds: Math.random() > 0.3 ? generateRandomCVEs() : undefined,
          exploitAvailable: Math.random() > 0.5,
          publiclyDisclosed: Math.random() > 0.4,
          patchAvailable: Math.random() > 0.3,
          references: generateReferences(getRandomVulnerabilityName()),
          affectedSystems: generateAffectedSystems(),
          detailedDescription: 'Розширений детальний опис вразливості, включаючи технічні деталі, вектори атаки та потенційні наслідки для безпеки системи.',
          remediation: 'Докладні кроки для усунення вразливості, включаючи оновлення, зміни конфігурації та рекомендовані заходи безпеки.'
        });
      }
      
      for (let i = 0; i < scan.medium; i++) {
        mockVulnerabilities.push({
          id: `VULN-${Math.floor(Math.random() * 10000)}`,
          name: getRandomVulnerabilityName(),
          description: 'Детальний опис вразливості та її потенційних наслідків',
          level: 'medium',
          location: scan.scanTarget || 'Server',
          recommendations: 'Рекомендації щодо усунення вразливості',
          cveIds: Math.random() > 0.7 ? generateRandomCVEs(1) : undefined,
          exploitAvailable: Math.random() > 0.8,
          publiclyDisclosed: Math.random() > 0.6,
          patchAvailable: Math.random() > 0.2,
          references: Math.random() > 0.5 ? generateReferences(getRandomVulnerabilityName()) : [],
          affectedSystems: generateAffectedSystems(),
          detailedDescription: 'Розширений детальний опис вразливості, включаючи технічні деталі, вектори атаки та потенційні наслідки для безпеки системи.',
          remediation: 'Докладні кроки для усунення вразливості, включаючи оновлення, зміни конфігурації та рекомендовані заходи безпеки.'
        });
      }
      
      for (let i = 0; i < scan.low; i++) {
        mockVulnerabilities.push({
          id: `VULN-${Math.floor(Math.random() * 10000)}`,
          name: getRandomVulnerabilityName(),
          description: 'Детальний опис вразливості та її потенційних наслідків',
          level: 'low',
          location: scan.scanTarget || 'Server',
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
    } else if (scan.status === "in-progress") {
      toast({
        title: "Сканування в процесі",
        description: "Результати будуть доступні після завершення сканування",
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
      'Directory Traversal',
      'XML External Entities (XXE)',
      'Server-Side Request Forgery (SSRF)',
      'Insecure Deserialization',
      'Remote Code Execution',
      'Path Traversal',
      'Authentication Bypass',
      'Command Injection',
      'Open Redirect',
      'Weak Password Policy',
      'Privilege Escalation'
    ];
    
    return vulnNames[Math.floor(Math.random() * vulnNames.length)];
  };
  
  const getUniqueScanTypes = () => {
    const types = new Set<string>();
    scansData.forEach(scan => {
      if (scan.scanType) {
        types.add(scan.scanType);
      }
    });
    return Array.from(types);
  };
  
  const handleScheduleScan = (id: number) => {
    toast({
      title: "Сканування заплановано",
      description: "Сканування буде запущено автоматично за розкладом",
    });
  };
  
  const handleDeleteScan = (id: number) => {
    setScansData(prev => prev.filter(scan => scan.id !== id));
    toast({
      title: "Сканування видалено",
      description: "Сканування та його результати було видалено",
    });
  };
  
  const handleExportReport = (id: number, format: string) => {
    toast({
      title: "Експорт звіту",
      description: `Звіт експортовано у форматі ${format.toUpperCase()}`,
    });
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
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Пошук сканувань"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}>
              <SelectTrigger className="w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Всі статуси</SelectItem>
                <SelectItem value="completed">Завершено</SelectItem>
                <SelectItem value="in-progress">В процесі</SelectItem>
                <SelectItem value="scheduled">Заплановано</SelectItem>
              </SelectContent>
            </Select>
            
            <Select onValueChange={(value) => setTypeFilter(value === "all" ? null : value)}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Тип сканування" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Всі типи</SelectItem>
                {getUniqueScanTypes().map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
                <TableHead className="w-[250px]">Назва</TableHead>
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
              {filteredScans.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    Не знайдено сканувань, що відповідають критеріям пошуку
                  </TableCell>
                </TableRow>
              ) : (
                filteredScans.map((scan) => (
                  <TableRow key={scan.id}>
                    <TableCell className="font-medium">
                      <div>
                        {scan.name}
                        {scan.scanType && (
                          <Badge variant="outline" className="ml-2">
                            {scan.scanType}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
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
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleShowDetails(scan.id)}
                        >
                          Деталі
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Меню</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {scan.status === "completed" && (
                              <>
                                <DropdownMenuItem onClick={() => handleExportReport(scan.id, "pdf")}>
                                  <FileText className="mr-2 h-4 w-4" />
                                  <span>Експорт PDF</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleExportReport(scan.id, "csv")}>
                                  <FileBarChart className="mr-2 h-4 w-4" />
                                  <span>Експорт CSV</span>
                                </DropdownMenuItem>
                              </>
                            )}
                            {scan.status === "scheduled" && (
                              <DropdownMenuItem onClick={() => handleScheduleScan(scan.id)}>
                                <Calendar className="mr-2 h-4 w-4" />
                                <span>Змінити розклад</span>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem 
                              onClick={() => handleDeleteScan(scan.id)}
                              className="text-red-600 hover:text-red-600 focus:text-red-600"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              <span>Видалити</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
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
