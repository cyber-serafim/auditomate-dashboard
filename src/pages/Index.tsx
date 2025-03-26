
import React from 'react';
import { Separator } from '@/components/ui/separator';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SummaryMetrics from '@/components/dashboard/SummaryMetrics';
import SystemStatus from '@/components/dashboard/SystemStatus';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import MainChartSection from '@/components/dashboard/MainChartSection';
import MonitoringSection from '@/components/dashboard/MonitoringSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
    </div>
  );
};

export default Index;
