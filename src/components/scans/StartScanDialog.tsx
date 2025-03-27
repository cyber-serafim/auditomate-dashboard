
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from "@/components/ui/form";
import { 
  Search, 
  AlertTriangle, 
  Server, 
  Network, 
  Globe, 
  Target, 
  Shield, 
  Smartphone,
  Laptop,
  Database,
  Cloud,
  Lock,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const scanFormSchema = z.object({
  name: z.string().min(3, { message: "Назва сканування має містити щонайменше 3 символи" }),
  scanType: z.enum(["full", "network", "api", "service", "compliance", "mobile", "web"], { 
    required_error: "Будь ласка, оберіть тип сканування" 
  }),
  target: z.string().min(1, { message: "Будь ласка, вкажіть ціль сканування" }),
  targetType: z.enum(["ip", "subnet", "service", "url", "hostname", "domain", "cloud", "container"], { 
    required_error: "Будь ласка, оберіть тип цілі" 
  }),
  complianceStandards: z.array(z.string()).optional(),
  scheduleEnabled: z.boolean().default(false).optional(),
  scheduleFrequency: z.string().optional(),
  reportFormat: z.enum(["pdf", "html", "csv", "xml"]).default("pdf").optional(),
  sendReportEmail: z.boolean().default(false).optional(),
  emailRecipients: z.string().optional(),
  scanDepth: z.enum(["basic", "standard", "deep"]).default("standard").optional(),
});

type ScanFormValues = z.infer<typeof scanFormSchema>;

interface StartScanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartScan: (values: ScanFormValues) => void;
}

const complianceOptions = [
  { id: "hipaa", label: "HIPAA" },
  { id: "pci", label: "PCI DSS" },
  { id: "cis", label: "CIS" },
  { id: "disa", label: "DISA STIGs" },
  { id: "ffiec", label: "FFIEC" },
  { id: "nerc", label: "NERC CIP" },
  { id: "cert", label: "CERT" },
  { id: "cobit", label: "COBIT/ITIL" },
  { id: "iso27001", label: "ISO 27001" },
  { id: "nist", label: "NIST 800-53" },
  { id: "gdpr", label: "GDPR" },
];

const StartScanDialog = ({ open, onOpenChange, onStartScan }: StartScanDialogProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("basic");
  
  const form = useForm<ScanFormValues>({
    resolver: zodResolver(scanFormSchema),
    defaultValues: {
      name: `Сканування від ${new Date().toLocaleDateString('uk-UA')}`,
      scanType: "full",
      target: "",
      targetType: "ip",
      complianceStandards: [],
      scheduleEnabled: false,
      scheduleFrequency: "weekly",
      reportFormat: "pdf",
      sendReportEmail: false,
      emailRecipients: "",
      scanDepth: "standard",
    },
  });

  const onSubmit = (values: ScanFormValues) => {
    onStartScan(values);
    onOpenChange(false);
    toast({
      title: "Сканування запущено",
      description: `Розпочато ${values.name} для ${values.target}`,
    });
  };

  const getScanTypeIcon = (type: string) => {
    switch (type) {
      case "full": return <Shield className="h-4 w-4" />;
      case "network": return <Network className="h-4 w-4" />;
      case "api": return <Globe className="h-4 w-4" />;
      case "service": return <Server className="h-4 w-4" />;
      case "compliance": return <Lock className="h-4 w-4" />;
      case "mobile": return <Smartphone className="h-4 w-4" />;
      case "web": return <Globe className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const scanTypeDependent = form.watch("scanType");
  const scheduleEnabled = form.watch("scheduleEnabled");
  const sendReportEmail = form.watch("sendReportEmail");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Запустити нове сканування</DialogTitle>
          <DialogDescription>
            Налаштуйте параметри для запуску сканування вразливостей.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="basic">Основне</TabsTrigger>
                <TabsTrigger value="compliance">Відповідність стандартам</TabsTrigger>
                <TabsTrigger value="schedule">Планування та звіти</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Назва сканування</FormLabel>
                      <FormControl>
                        <Input placeholder="Введіть назву сканування" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="scanType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Тип сканування</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="full" />
                              </FormControl>
                              <FormLabel className="font-normal flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                Повне сканування
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="network" />
                              </FormControl>
                              <FormLabel className="font-normal flex items-center gap-2">
                                <Network className="h-4 w-4" />
                                Мережеве сканування
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="web" />
                              </FormControl>
                              <FormLabel className="font-normal flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                Веб-застосунки
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="api" />
                              </FormControl>
                              <FormLabel className="font-normal flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                API сканування
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="service" />
                              </FormControl>
                              <FormLabel className="font-normal flex items-center gap-2">
                                <Server className="h-4 w-4" />
                                Сканування сервісів
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="compliance" />
                              </FormControl>
                              <FormLabel className="font-normal flex items-center gap-2">
                                <Lock className="h-4 w-4" />
                                Перевірка відповідності
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="mobile" />
                              </FormControl>
                              <FormLabel className="font-normal flex items-center gap-2">
                                <Smartphone className="h-4 w-4" />
                                Мобільні пристрої
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="targetType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Тип цілі</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-2 gap-4"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="ip" />
                              </FormControl>
                              <FormLabel className="font-normal">IP-адреса</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="subnet" />
                              </FormControl>
                              <FormLabel className="font-normal">Підмережа</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="hostname" />
                              </FormControl>
                              <FormLabel className="font-normal">Hostname</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="domain" />
                              </FormControl>
                              <FormLabel className="font-normal">Домен</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="service" />
                              </FormControl>
                              <FormLabel className="font-normal">Сервіс</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="url" />
                              </FormControl>
                              <FormLabel className="font-normal">URL</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="cloud" />
                              </FormControl>
                              <FormLabel className="font-normal">Cloud</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="container" />
                              </FormControl>
                              <FormLabel className="font-normal">Контейнер</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="scanDepth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Глибина сканування</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Оберіть глибину сканування" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="basic">Базове (швидко)</SelectItem>
                            <SelectItem value="standard">Стандартне</SelectItem>
                            <SelectItem value="deep">Поглиблене (повільно)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Визначає детальність та тривалість сканування
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="target"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ціль сканування</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" placeholder="Вкажіть ціль сканування" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>
                        {form.watch("targetType") === "ip" && "Введіть IP-адресу, наприклад 192.168.1.1"}
                        {form.watch("targetType") === "subnet" && "Введіть підмережу, наприклад 192.168.1.0/24"}
                        {form.watch("targetType") === "hostname" && "Введіть ім'я хоста, наприклад server1.domain.com"}
                        {form.watch("targetType") === "domain" && "Введіть домен, наприклад domain.com"}
                        {form.watch("targetType") === "service" && "Введіть назву сервісу або ID"}
                        {form.watch("targetType") === "url" && "Введіть URL, наприклад https://example.com"}
                        {form.watch("targetType") === "cloud" && "Введіть ID ресурсу або адресу cloud-сервісу"}
                        {form.watch("targetType") === "container" && "Введіть ID або назву контейнера"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="compliance" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="complianceStandards"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Стандарти відповідності</FormLabel>
                        <FormDescription>
                          Виберіть стандарти, на відповідність яким потрібно перевірити систему
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {complianceOptions.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="complianceStandards"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        const currentValue = field.value || [];
                                        return checked
                                          ? field.onChange([...currentValue, item.id])
                                          : field.onChange(
                                              currentValue.filter((value) => value !== item.id)
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="rounded-md bg-blue-50 p-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-5 w-5 text-blue-500" />
                    <span className="font-medium text-blue-800">Про стандарти відповідності</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Перевірка відповідності сканує систему на відповідність обраним стандартам безпеки і
                    надає детальний звіт про знайдені невідповідності з рекомендаціями щодо усунення.
                    Сканування на відповідність стандартам зазвичай займає більше часу, оскільки включає додаткові перевірки.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="schedule" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="scheduleEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Запланувати регулярне сканування
                        </FormLabel>
                        <FormDescription>
                          Автоматично запускати сканування за розкладом
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                {scheduleEnabled && (
                  <FormField
                    control={form.control}
                    name="scheduleFrequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Частота сканування</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Оберіть частоту сканування" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="daily">Щодня</SelectItem>
                            <SelectItem value="weekly">Щотижня</SelectItem>
                            <SelectItem value="biweekly">Раз на два тижні</SelectItem>
                            <SelectItem value="monthly">Щомісяця</SelectItem>
                            <SelectItem value="quarterly">Щокварталу</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <FormField
                  control={form.control}
                  name="reportFormat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Формат звіту</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Оберіть формат звіту" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="html">HTML</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="xml">XML</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="sendReportEmail"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Надсилати звіт електронною поштою
                        </FormLabel>
                        <FormDescription>
                          Автоматично надсилати звіт після завершення сканування
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                {sendReportEmail && (
                  <FormField
                    control={form.control}
                    name="emailRecipients"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Отримувачі звіту</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="email1@domain.com, email2@domain.com" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Введіть email-адреси через кому
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </TabsContent>
            </Tabs>

            <DialogFooter className="mt-6 flex justify-between">
              <div className="flex gap-2">
                {activeTab !== "basic" && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setActiveTab(activeTab === "compliance" ? "basic" : "compliance")}
                  >
                    Назад
                  </Button>
                )}
                {activeTab !== "schedule" && (
                  <Button 
                    type="button" 
                    onClick={() => setActiveTab(activeTab === "basic" ? "compliance" : "schedule")}
                  >
                    Далі
                  </Button>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Скасувати
                </Button>
                {activeTab === "schedule" && (
                  <Button type="submit">
                    <Search className="mr-2 h-4 w-4" />
                    Запустити сканування
                  </Button>
                )}
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default StartScanDialog;
