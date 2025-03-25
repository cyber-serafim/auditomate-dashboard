
import React, { useEffect, useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle, Network, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScanProgressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scanName: string;
  scanTarget: string;
  onScanComplete: (scanResults: any) => void;
}

const ScanProgressDialog = ({ 
  open, 
  onOpenChange, 
  scanName, 
  scanTarget,
  onScanComplete 
}: ScanProgressDialogProps) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'initializing' | 'scanning' | 'analyzing' | 'complete' | 'failed'>('initializing');
  const [statusMessages, setStatusMessages] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!open) return;

    // Reset progress and status on open
    setProgress(0);
    setStatus('initializing');
    setStatusMessages(['Ініціалізація сканування...']);

    let timer: NodeJS.Timeout;
    
    const advanceProgress = () => {
      setProgress(prev => {
        const nextProgress = prev + Math.floor(Math.random() * 5) + 1;
        
        // Update status messages based on progress
        if (nextProgress >= 5 && prev < 5) {
          setStatusMessages(msgs => [...msgs, 'Підготовка до сканування...']);
        }
        if (nextProgress >= 15 && prev < 15) {
          setStatus('scanning');
          setStatusMessages(msgs => [...msgs, `Сканування цілі ${scanTarget}...`]);
        }
        if (nextProgress >= 40 && prev < 40) {
          setStatusMessages(msgs => [...msgs, 'Перевірка відкритих портів...']);
        }
        if (nextProgress >= 55 && prev < 55) {
          setStatusMessages(msgs => [...msgs, 'Виявлення вразливостей...']);
        }
        if (nextProgress >= 70 && prev < 70) {
          setStatus('analyzing');
          setStatusMessages(msgs => [...msgs, 'Аналіз виявлених вразливостей...']);
        }
        if (nextProgress >= 85 && prev < 85) {
          setStatusMessages(msgs => [...msgs, 'Підготовка звіту...']);
        }
        if (nextProgress >= 100) {
          setStatus('complete');
          setStatusMessages(msgs => [...msgs, 'Сканування завершено!']);
          clearInterval(timer);
          
          // Generate mock scan results
          const results = generateMockScanResults();
          onScanComplete(results);
          
          toast({
            title: "Сканування завершено",
            description: `${scanName} завершено успішно.`,
          });
          
          return 100;
        }
        
        return nextProgress;
      });
    };
    
    timer = setInterval(advanceProgress, 400);
    
    return () => {
      clearInterval(timer);
    };
  }, [open, scanTarget, scanName, onScanComplete, toast]);
  
  // Generate mock scan results
  const generateMockScanResults = () => {
    const vulnerabilityLevels = ['critical', 'high', 'medium', 'low'];
    const results = {
      id: Math.floor(Math.random() * 1000),
      name: scanName,
      date: new Date().toLocaleDateString('uk-UA'),
      time: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
      status: 'completed',
      critical: Math.floor(Math.random() * 5),
      high: Math.floor(Math.random() * 10),
      medium: Math.floor(Math.random() * 15),
      low: Math.floor(Math.random() * 25),
      vulnerabilities: []
    };
    
    // Generate mock vulnerabilities
    const vulnCount = results.critical + results.high + results.medium + results.low;
    
    for (let i = 0; i < vulnCount; i++) {
      const level = vulnerabilityLevels[Math.floor(Math.random() * vulnerabilityLevels.length)];
      results.vulnerabilities.push({
        id: `VULN-${Math.floor(Math.random() * 10000)}`,
        name: getRandomVulnerabilityName(),
        description: 'Детальний опис вразливості та її потенційних наслідків',
        level,
        location: scanTarget,
        recommendations: 'Рекомендації щодо усунення вразливості'
      });
    }
    
    return results;
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
    <Dialog open={open} onOpenChange={(value) => {
      // Prevent closing while scan is in progress
      if (status !== 'complete' && status !== 'failed' && value === false) {
        toast({
          title: "Операція не дозволена",
          description: "Неможливо закрити вікно під час сканування",
          variant: "destructive"
        });
        return;
      }
      onOpenChange(value);
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {status === 'complete' ? 'Сканування завершено' : 'Сканування в процесі'}
          </DialogTitle>
          <DialogDescription>
            {scanName} - {scanTarget}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Прогрес сканування</span>
              <span className="text-sm">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="border rounded-md p-4 space-y-2 h-[200px] overflow-y-auto">
            <div className="flex items-center gap-2 mb-2">
              {status === 'initializing' && (
                <Clock className="h-5 w-5 text-blue-500 animate-pulse" />
              )}
              {status === 'scanning' && (
                <Network className="h-5 w-5 text-amber-500 animate-pulse" />
              )}
              {status === 'analyzing' && (
                <Clock className="h-5 w-5 text-purple-500 animate-pulse" />
              )}
              {status === 'complete' && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
              {status === 'failed' && (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="font-medium">
                {status === 'initializing' && 'Ініціалізація'}
                {status === 'scanning' && 'Сканування'}
                {status === 'analyzing' && 'Аналіз даних'}
                {status === 'complete' && 'Завершено'}
                {status === 'failed' && 'Помилка'}
              </span>
            </div>
            
            <div className="space-y-1 text-sm">
              {statusMessages.map((message, index) => (
                <p key={index} className="text-muted-foreground">
                  {message}
                </p>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            disabled={status !== 'complete' && status !== 'failed'} 
            onClick={() => onOpenChange(false)}
          >
            {status === 'complete' ? 'Переглянути результати' : 'Закрити'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScanProgressDialog;
