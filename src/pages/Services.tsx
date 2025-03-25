
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ServiceMonitor from '@/components/dashboard/ServiceMonitor';
import { AlertTriangle, CheckCircle, Clock, Plus, Search, ServerCrash, XCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AddServiceDialog from '@/components/services/AddServiceDialog';
import { toast } from "sonner";

// Sample services data
const initialServicesData = [
  { id: '1', name: 'Веб-сервер', status: 'online', uptime: '99.9%', lastChecked: '2 хвилини тому', type: 'web', description: 'Основний веб-сервер для обслуговування HTTP запитів' },
  { id: '2', name: 'База даних', status: 'online', uptime: '99.8%', lastChecked: '5 хвилин тому', type: 'database', description: 'Сервер PostgreSQL для зберігання даних' },
  { id: '3', name: 'Сервіс автентифікації', status: 'warning', uptime: '98.5%', lastChecked: '1 хвилина тому', type: 'auth', description: 'Служба управління ідентифікацією користувачів' },
  { id: '4', name: 'Файлове сховище', status: 'online', uptime: '99.9%', lastChecked: '3 хвилини тому', type: 'storage', description: 'Сервіс для зберігання та доступу до файлів' },
  { id: '5', name: 'API шлюз', status: 'online', uptime: '99.7%', lastChecked: '1 хвилина тому', type: 'web', description: 'Шлюз для маршрутизації API запитів' },
  { id: '6', name: 'Резервний сервер', status: 'offline', uptime: '95.2%', lastChecked: '10 хвилин тому', type: 'storage', description: 'Сервер для резервного копіювання даних' },
  { id: '7', name: 'DNS сервер', status: 'online', uptime: '99.9%', lastChecked: '4 хвилини тому', type: 'network', description: 'Сервер доменних імен' },
  { id: '8', name: 'Поштовий сервер', status: 'maintenance', uptime: '-', lastChecked: '30 хвилин тому', type: 'web', description: 'Сервер для обробки електронної пошти' },
  { id: '9', name: 'Балансувальник навантаження', status: 'online', uptime: '99.8%', lastChecked: '2 хвилини тому', type: 'network', description: 'Розподіл навантаження між серверами' },
  { id: '10', name: 'Кеш-сервер', status: 'online', uptime: '99.9%', lastChecked: '1 хвилина тому', type: 'database', description: 'Кешування даних для швидкого доступу' },
];

// Status icon mapping
const statusIcons = {
  online: <CheckCircle className="h-4 w-4 text-green-500" />,
  offline: <XCircle className="h-4 w-4 text-red-500" />,
  warning: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
  maintenance: <Clock className="h-4 w-4 text-blue-500" />
};

// Status text mapping in Ukrainian
const statusText = {
  online: "Працює",
  offline: "Не працює",
  warning: "Попередження",
  maintenance: "Обслуговування"
};

const ServiceHealth = ({ services }) => {
  // Count services by status
  const statusCounts = {
    online: services.filter(service => service.status === 'online').length,
    warning: services.filter(service => service.status === 'warning').length,
    offline: services.filter(service => service.status === 'offline').length,
    maintenance: services.filter(service => service.status === 'maintenance').length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 flex flex-col items-center">
          <div className="rounded-full bg-green-100 p-3 mb-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-sm font-medium">Працюють</p>
          <p className="text-3xl font-bold mt-1">{statusCounts.online}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col items-center">
          <div className="rounded-full bg-yellow-100 p-3 mb-2">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
          </div>
          <p className="text-sm font-medium">Попередження</p>
          <p className="text-3xl font-bold mt-1">{statusCounts.warning}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col items-center">
          <div className="rounded-full bg-red-100 p-3 mb-2">
            <XCircle className="h-6 w-6 text-red-500" />
          </div>
          <p className="text-sm font-medium">Не працюють</p>
          <p className="text-3xl font-bold mt-1">{statusCounts.offline}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col items-center">
          <div className="rounded-full bg-blue-100 p-3 mb-2">
            <Clock className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-sm font-medium">Обслуговування</p>
          <p className="text-3xl font-bold mt-1">{statusCounts.maintenance}</p>
        </CardContent>
      </Card>
    </div>
  );
};

const Services = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('list');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [servicesData, setServicesData] = useState(initialServicesData);
  
  const filteredServices = servicesData.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle adding a new service
  const handleAddService = (values) => {
    const newService = {
      id: (servicesData.length + 1).toString(),
      name: values.name,
      status: 'online',
      uptime: '100%',
      lastChecked: 'щойно',
      type: values.type,
      description: values.description
    };
    
    setServicesData([...servicesData, newService]);
    setShowAddDialog(false);
    toast.success("Сервіс успішно додано", {
      description: `Сервіс "${values.name}" додано до системи моніторингу.`
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header />
        
        <main className="container py-6 space-y-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">Сервіси</h1>
            <p className="text-sm text-muted-foreground">
              Моніторинг та управління сервісами інфраструктури.
            </p>
          </div>
          
          <ServiceHealth services={servicesData} />
          
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Пошук сервісів"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              className="w-full md:w-auto"
              onClick={() => setShowAddDialog(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Додати новий сервіс
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="list">Список</TabsTrigger>
              <TabsTrigger value="monitor">Монітор</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Список сервісів</CardTitle>
                  <CardDescription>Огляд всіх сервісів та їх статусу.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Назва</TableHead>
                        <TableHead>Опис</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Час роботи</TableHead>
                        <TableHead>Остання перевірка</TableHead>
                        <TableHead className="text-right">Дії</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredServices.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell className="font-medium">{service.name}</TableCell>
                          <TableCell>{service.description}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {statusIcons[service.status]}
                              <span className="text-sm">{statusText[service.status]}</span>
                            </div>
                          </TableCell>
                          <TableCell>{service.uptime}</TableCell>
                          <TableCell>{service.lastChecked}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">Деталі</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="monitor">
              <ServiceMonitor />
            </TabsContent>
          </Tabs>
        </main>
      </div>
      
      {/* Add Service Dialog */}
      <AddServiceDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
        onSubmit={handleAddService}
      />
    </div>
  );
};

export default Services;
