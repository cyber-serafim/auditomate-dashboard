
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Box, FileText, HardDrive, Image, Laptop, Package, Search, Server, Smartphone, Plus, Database, Archive, Folder } from 'lucide-react';

// Sample assets data
const assetsData = [
  { 
    id: '1', 
    name: 'Робоча станція HR-01', 
    type: 'laptop', 
    status: 'активний', 
    os: 'Windows 11 Pro', 
    location: 'Офіс HR',
    lastScan: '2 дні тому',
    vulnerabilities: 2,
    owner: 'Олена Петренко'
  },
  { 
    id: '2', 
    name: 'Сервер DB-MAIN', 
    type: 'server', 
    status: 'активний', 
    os: 'Ubuntu 22.04 LTS', 
    location: 'Серверна A',
    lastScan: '1 день тому',
    vulnerabilities: 0,
    owner: 'IT відділ'
  },
  { 
    id: '3', 
    name: 'Файловий сервер', 
    type: 'storage', 
    status: 'активний', 
    os: 'Windows Server 2022', 
    location: 'Серверна B',
    lastScan: '3 дні тому',
    vulnerabilities: 4,
    owner: 'IT відділ'
  },
  { 
    id: '4', 
    name: 'Робоча станція DEV-05', 
    type: 'desktop', 
    status: 'неактивний', 
    os: 'Ubuntu 20.04 LTS', 
    location: 'Відділ розробки',
    lastScan: '7 днів тому',
    vulnerabilities: 1,
    owner: 'Іван Ковальчук'
  },
  { 
    id: '5', 
    name: 'Мережевий комутатор', 
    type: 'network', 
    status: 'активний', 
    os: 'Cisco IOS', 
    location: 'Серверна A',
    lastScan: '5 днів тому',
    vulnerabilities: 0,
    owner: 'IT відділ'
  },
  { 
    id: '6', 
    name: 'IP Телефон', 
    type: 'phone', 
    status: 'активний', 
    os: 'Polycom OS', 
    location: 'Приймальня',
    lastScan: '10 днів тому',
    vulnerabilities: 0,
    owner: 'Марія Шевченко'
  },
  { 
    id: '7', 
    name: 'Смартфон BYOD-022', 
    type: 'mobile', 
    status: 'активний', 
    os: 'Android 13', 
    location: 'Мобільний',
    lastScan: '3 дні тому',
    vulnerabilities: 1,
    owner: 'Олексій Бондаренко'
  },
  { 
    id: '8', 
    name: 'Планшет iPad-003', 
    type: 'tablet', 
    status: 'активний', 
    os: 'iPadOS 16', 
    location: 'Відділ продажів',
    lastScan: '4 дні тому',
    vulnerabilities: 0,
    owner: 'Юлія Мельник'
  },
  { 
    id: '9', 
    name: 'Принтер HP-2022', 
    type: 'printer', 
    status: 'активний', 
    os: 'HP Firmware v3.2', 
    location: 'Офіс HR',
    lastScan: '14 днів тому',
    vulnerabilities: 2,
    owner: 'Загальний доступ'
  },
  { 
    id: '10', 
    name: 'Сканер документів', 
    type: 'scanner', 
    status: 'неактивний', 
    os: 'Canon Firmware', 
    location: 'Архів',
    lastScan: '30 днів тому',
    vulnerabilities: 3,
    owner: 'Архівний відділ'
  },
];

// Type icon mapping
const typeIcons = {
  laptop: <Laptop className="h-4 w-4" />,
  desktop: <HardDrive className="h-4 w-4" />,
  server: <Server className="h-4 w-4" />,
  storage: <Database className="h-4 w-4" />,
  network: <HardDrive className="h-4 w-4" />,
  phone: <Smartphone className="h-4 w-4" />,
  mobile: <Smartphone className="h-4 w-4" />,
  tablet: <Smartphone className="h-4 w-4" />,
  printer: <FileText className="h-4 w-4" />,
  scanner: <Image className="h-4 w-4" />
};

// Asset type mapping
const assetTypes = {
  laptop: "Ноутбук",
  desktop: "Робоча станція",
  server: "Сервер",
  storage: "Сховище даних",
  network: "Мережеве обладнання",
  phone: "Телефон",
  mobile: "Смартфон",
  tablet: "Планшет",
  printer: "Принтер",
  scanner: "Сканер"
};

const AssetsByType = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 rounded-full">
              <Laptop className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Комп'ютери</p>
              <p className="text-2xl font-bold">23</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">18 активних</Badge>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-purple-100 rounded-full">
              <Server className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Сервери</p>
              <p className="text-2xl font-bold">8</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">7 активних</Badge>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-amber-100 rounded-full">
              <Smartphone className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Мобільні пристрої</p>
              <p className="text-2xl font-bold">15</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">12 активних</Badge>
        </CardContent>
      </Card>
    </div>
  );
};

const Assets = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredAssets = assetsData.filter(asset => 
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.os.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getAssetsByStatus = (status: string) => {
    return filteredAssets.filter(asset => asset.status === status);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header />
        
        <main className="container py-6 space-y-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">Активи</h1>
            <p className="text-sm text-muted-foreground">
              Управління та моніторинг апаратних і програмних активів організації.
            </p>
          </div>
          
          <AssetsByType />
          
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Пошук активів"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Додати новий актив
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="all">Всі активи</TabsTrigger>
              <TabsTrigger value="active">Активні</TabsTrigger>
              <TabsTrigger value="inactive">Неактивні</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Список активів</CardTitle>
                  <CardDescription>Повний перелік усіх апаратних і програмних активів.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Назва</TableHead>
                        <TableHead>Тип</TableHead>
                        <TableHead>Операційна система</TableHead>
                        <TableHead>Розташування</TableHead>
                        <TableHead>Останнє сканування</TableHead>
                        <TableHead>Вразливості</TableHead>
                        <TableHead>Власник</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead className="text-right">Дії</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAssets.map((asset) => (
                        <TableRow key={asset.id}>
                          <TableCell className="font-medium">{asset.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {typeIcons[asset.type]}
                              <span className="text-sm">{assetTypes[asset.type]}</span>
                            </div>
                          </TableCell>
                          <TableCell>{asset.os}</TableCell>
                          <TableCell>{asset.location}</TableCell>
                          <TableCell>{asset.lastScan}</TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                asset.vulnerabilities > 0 
                                  ? "bg-red-100 text-red-800 hover:bg-red-200" 
                                  : "bg-green-100 text-green-800 hover:bg-green-200"
                              }
                            >
                              {asset.vulnerabilities}
                            </Badge>
                          </TableCell>
                          <TableCell>{asset.owner}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={asset.status === "активний" ? "default" : "secondary"}
                            >
                              {asset.status}
                            </Badge>
                          </TableCell>
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
            
            <TabsContent value="active">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Активні пристрої</CardTitle>
                  <CardDescription>Пристрої та системи, що зараз активні в мережі.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Назва</TableHead>
                        <TableHead>Тип</TableHead>
                        <TableHead>Операційна система</TableHead>
                        <TableHead>Розташування</TableHead>
                        <TableHead>Останнє сканування</TableHead>
                        <TableHead>Вразливості</TableHead>
                        <TableHead>Власник</TableHead>
                        <TableHead className="text-right">Дії</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getAssetsByStatus('активний').map((asset) => (
                        <TableRow key={asset.id}>
                          <TableCell className="font-medium">{asset.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {typeIcons[asset.type]}
                              <span className="text-sm">{assetTypes[asset.type]}</span>
                            </div>
                          </TableCell>
                          <TableCell>{asset.os}</TableCell>
                          <TableCell>{asset.location}</TableCell>
                          <TableCell>{asset.lastScan}</TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                asset.vulnerabilities > 0 
                                  ? "bg-red-100 text-red-800 hover:bg-red-200" 
                                  : "bg-green-100 text-green-800 hover:bg-green-200"
                              }
                            >
                              {asset.vulnerabilities}
                            </Badge>
                          </TableCell>
                          <TableCell>{asset.owner}</TableCell>
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
            
            <TabsContent value="inactive">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Неактивні пристрої</CardTitle>
                  <CardDescription>Пристрої та системи, що зараз не підключені до мережі.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Назва</TableHead>
                        <TableHead>Тип</TableHead>
                        <TableHead>Операційна система</TableHead>
                        <TableHead>Розташування</TableHead>
                        <TableHead>Останнє сканування</TableHead>
                        <TableHead>Вразливості</TableHead>
                        <TableHead>Власник</TableHead>
                        <TableHead className="text-right">Дії</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getAssetsByStatus('неактивний').map((asset) => (
                        <TableRow key={asset.id}>
                          <TableCell className="font-medium">{asset.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {typeIcons[asset.type]}
                              <span className="text-sm">{assetTypes[asset.type]}</span>
                            </div>
                          </TableCell>
                          <TableCell>{asset.os}</TableCell>
                          <TableCell>{asset.location}</TableCell>
                          <TableCell>{asset.lastScan}</TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                asset.vulnerabilities > 0 
                                  ? "bg-red-100 text-red-800 hover:bg-red-200" 
                                  : "bg-green-100 text-green-800 hover:bg-green-200"
                              }
                            >
                              {asset.vulnerabilities}
                            </Badge>
                          </TableCell>
                          <TableCell>{asset.owner}</TableCell>
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
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Assets;
