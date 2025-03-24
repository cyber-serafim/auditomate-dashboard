
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, AlertTriangle, Shield, CheckCircle, XCircle, Calendar, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";

const scansData = [
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

const ScanSummary = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 flex flex-col items-center">
          <div className="rounded-full bg-red-100 p-3 mb-2">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
          <p className="text-sm font-medium">Критичні вразливості</p>
          <p className="text-3xl font-bold mt-1">7</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col items-center">
          <div className="rounded-full bg-orange-100 p-3 mb-2">
            <AlertTriangle className="h-6 w-6 text-orange-500" />
          </div>
          <p className="text-sm font-medium">Високий ризик</p>
          <p className="text-3xl font-bold mt-1">15</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col items-center">
          <div className="rounded-full bg-yellow-100 p-3 mb-2">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
          </div>
          <p className="text-sm font-medium">Середній ризик</p>
          <p className="text-3xl font-bold mt-1">28</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col items-center">
          <div className="rounded-full bg-green-100 p-3 mb-2">
            <Shield className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-sm font-medium">Низький ризик</p>
          <p className="text-3xl font-bold mt-1">54</p>
        </CardContent>
      </Card>
    </div>
  );
};

const Scans = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredScans = scansData.filter(scan => 
    scan.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Сканування вразливостей</h1>
        <p className="text-sm text-muted-foreground">
          Перегляд історії сканувань та управління скануваннями безпеки.
        </p>
      </div>
      
      <ScanSummary />
      
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
        <Button className="w-full md:w-auto">
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
                    <Button variant="ghost" size="sm">Деталі</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Scans;
