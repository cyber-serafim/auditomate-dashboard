
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Separator } from '@/components/ui/separator';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SummaryMetrics from '@/components/dashboard/SummaryMetrics';
import SystemStatus from '@/components/dashboard/SystemStatus';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import MainChartSection from '@/components/dashboard/MainChartSection';
import MonitoringSection from '@/components/dashboard/MonitoringSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-64"> {/* Same width as sidebar */}
        <Header />
        
        <main className="p-6">
          <DashboardHeader />
          
          {/* Summary metrics */}
          <SummaryMetrics />
          
          {/* System status */}
          <SystemStatus />
          
          {/* Performance chart */}
          <PerformanceChart />
          
          <MainChartSection />
          
          <Separator className="my-8" />
          
          <MonitoringSection />
        </main>
      </div>
    </div>
  );
};

export default Index;
