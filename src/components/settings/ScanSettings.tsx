
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Mail, Calendar, Settings, Scan, Clock } from "lucide-react";

export const ScanSettings = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-1 md:grid-cols-3 w-full mb-4">
          <TabsTrigger value="general">
            <Settings className="h-4 w-4 mr-2" />
            Загальні налаштування
          </TabsTrigger>
          <TabsTrigger value="compliance">
            <Shield className="h-4 w-4 mr-2" />
            Стандарти відповідності
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Mail className="h-4 w-4 mr-2" />
            Сповіщення
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Конфігурація сканування</CardTitle>
              <CardDescription>Налаштуйте параметри сканування безпеки.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Автоматичне сканування</Label>
                  <p className="text-sm text-muted-foreground">Запускати сканування автоматично за розкладом</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Частота сканування (годин)</Label>
                    <Badge variant="outline">24</Badge>
                  </div>
                  <Slider defaultValue={[24]} max={72} min={1} step={1} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Глибоке сканування</Label>
                    <p className="text-sm text-muted-foreground">Увімкнути комплексний аналіз безпеки</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <Label className="text-base font-medium">Типи сканування</Label>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox id="vuln-scan" defaultChecked />
                    <div className="grid gap-1.5">
                      <Label htmlFor="vuln-scan" className="font-medium">Сканування вразливостей</Label>
                      <p className="text-sm text-muted-foreground">
                        Виявлення відомих вразливостей у системі
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox id="config-scan" defaultChecked />
                    <div className="grid gap-1.5">
                      <Label htmlFor="config-scan" className="font-medium">Перевірка конфігурацій</Label>
                      <p className="text-sm text-muted-foreground">
                        Пошук неправильних налаштувань системи
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox id="port-scan" defaultChecked />
                    <div className="grid gap-1.5">
                      <Label htmlFor="port-scan" className="font-medium">Сканування портів</Label>
                      <p className="text-sm text-muted-foreground">
                        Виявлення відкритих мережевих портів
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox id="malware-scan" defaultChecked />
                    <div className="grid gap-1.5">
                      <Label htmlFor="malware-scan" className="font-medium">Виявлення шкідливого ПЗ</Label>
                      <p className="text-sm text-muted-foreground">
                        Пошук шкідливого програмного забезпечення
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox id="web-scan" defaultChecked />
                    <div className="grid gap-1.5">
                      <Label htmlFor="web-scan" className="font-medium">Сканування веб-додатків</Label>
                      <p className="text-sm text-muted-foreground">
                        Перевірка вразливостей у веб-застосунках
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox id="api-scan" defaultChecked />
                    <div className="grid gap-1.5">
                      <Label htmlFor="api-scan" className="font-medium">Сканування API</Label>
                      <p className="text-sm text-muted-foreground">
                        Перевірка вразливостей у API-інтерфейсах
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <Label className="text-base font-medium">Цілі сканування</Label>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox id="servers" defaultChecked />
                    <div className="grid gap-1.5">
                      <Label htmlFor="servers" className="font-medium">Сервери</Label>
                      <p className="text-sm text-muted-foreground">
                        Фізичні та віртуальні сервери
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox id="workstations" defaultChecked />
                    <div className="grid gap-1.5">
                      <Label htmlFor="workstations" className="font-medium">Робочі станції</Label>
                      <p className="text-sm text-muted-foreground">
                        Комп'ютери користувачів
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox id="network-devices" defaultChecked />
                    <div className="grid gap-1.5">
                      <Label htmlFor="network-devices" className="font-medium">Мережеве обладнання</Label>
                      <p className="text-sm text-muted-foreground">
                        Маршрутизатори, комутатори, точки доступу
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox id="mobile-devices" defaultChecked />
                    <div className="grid gap-1.5">
                      <Label htmlFor="mobile-devices" className="font-medium">Мобільні пристрої</Label>
                      <p className="text-sm text-muted-foreground">
                        Смартфони та планшети
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox id="cloud-resources" defaultChecked />
                    <div className="grid gap-1.5">
                      <Label htmlFor="cloud-resources" className="font-medium">Cloud-ресурси</Label>
                      <p className="text-sm text-muted-foreground">
                        AWS, Azure, Google Cloud
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox id="containers" defaultChecked />
                    <div className="grid gap-1.5">
                      <Label htmlFor="containers" className="font-medium">Контейнери</Label>
                      <p className="text-sm text-muted-foreground">
                        Docker, Kubernetes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Стандарти відповідності</CardTitle>
              <CardDescription>Налаштуйте перевірку на відповідність стандартам безпеки.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Увімкнути перевірку відповідності</Label>
                  <p className="text-sm text-muted-foreground">Сканувати на відповідність стандартам безпеки</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <Label className="text-base font-medium">Стандарти безпеки</Label>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox id="pci-dss" defaultChecked />
                    <div className="grid gap-1.5">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="pci-dss" className="font-medium">PCI DSS</Label>
                        <Badge variant="outline">v4.0</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Payment Card Industry Data Security Standard
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox id="hipaa" defaultChecked />
                    <div className="grid gap-1.5">
                      <Label htmlFor="hipaa" className="font-medium">HIPAA</Label>
                      <p className="text-sm text-muted-foreground">
                        Health Insurance Portability and Accountability Act
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox id="iso27001" defaultChecked />
                    <div className="grid gap-1.5">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="iso27001" className="font-medium">ISO 27001</Label>
                        <Badge variant="outline">2022</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Information Security Management
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox id="nist" defaultChecked />
                    <div className="grid gap-1.5">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="nist" className="font-medium">NIST 800-53</Label>
                        <Badge variant="outline">Rev. 5</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Security and Privacy Controls
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox id="cis" defaultChecked />
                    <div className="grid gap-1.5">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="cis" className="font-medium">CIS Controls</Label>
                        <Badge variant="outline">v8</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Center for Internet Security Benchmarks
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox id="disa" defaultChecked />
                    <div className="grid gap-1.5">
                      <Label htmlFor="disa" className="font-medium">DISA STIGs</Label>
                      <p className="text-sm text-muted-foreground">
                        Security Technical Implementation Guides
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox id="gdpr" defaultChecked />
                    <div className="grid gap-1.5">
                      <Label htmlFor="gdpr" className="font-medium">GDPR</Label>
                      <p className="text-sm text-muted-foreground">
                        General Data Protection Regulation
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox id="ffiec" defaultChecked />
                    <div className="grid gap-1.5">
                      <Label htmlFor="ffiec" className="font-medium">FFIEC</Label>
                      <p className="text-sm text-muted-foreground">
                        Financial Services Guidelines
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox id="nerc-cip" />
                    <div className="grid gap-1.5">
                      <Label htmlFor="nerc-cip" className="font-medium">NERC CIP</Label>
                      <p className="text-sm text-muted-foreground">
                        Critical Infrastructure Protection
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox id="cobit" />
                    <div className="grid gap-1.5">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="cobit" className="font-medium">COBIT</Label>
                        <Badge variant="outline">2019</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Control Objectives for IT
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <Label className="text-base font-medium">Налаштування перевірки</Label>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Детальний звіт про відповідність</Label>
                      <p className="text-sm text-muted-foreground">Створювати докладний звіт з рекомендаціями</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Мінімальний рівень відповідності для успішної перевірки (%)</Label>
                      <Badge variant="outline">85%</Badge>
                    </div>
                    <Slider defaultValue={[85]} max={100} min={50} step={5} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Налаштування сповіщень</CardTitle>
              <CardDescription>Налаштуйте сповіщення про результати сканування.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Сповіщення про критичні вразливості</Label>
                  <p className="text-sm text-muted-foreground">Надсилати сповіщення при виявленні критичних вразливостей</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Щотижневий звіт</Label>
                  <p className="text-sm text-muted-foreground">Надсилати щотижневий звіт про стан безпеки</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <Label className="text-base font-medium">Отримувачі сповіщень</Label>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Адміністратори безпеки</Label>
                      <Input 
                        placeholder="Email адреси через кому" 
                        defaultValue="security@example.com, admin@example.com" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Технічні спеціалісти</Label>
                      <Input 
                        placeholder="Email адреси через кому" 
                        defaultValue="tech@example.com, support@example.com" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Формат звіту</Label>
                    <Select defaultValue="pdf">
                      <SelectTrigger>
                        <SelectValue placeholder="Оберіть формат звіту" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="html">HTML</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="xml">XML</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>
                  Зберегти налаштування
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
