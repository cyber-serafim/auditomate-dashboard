
import React from 'react';
import MetricCard from '@/components/ui/MetricCard';
import { ShieldAlert, AlertTriangle, Laptop, Activity } from 'lucide-react';

const SummaryMetrics = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MetricCard 
        title="Vulnerabilities" 
        value="104" 
        description="Total across all systems" 
        trend={{ value: 12, isPositive: false }}
        icon={<ShieldAlert />}
      />
      <MetricCard 
        title="Critical Issues" 
        value="7" 
        description="Requiring immediate attention"
        trend={{ value: 3, isPositive: false }}
        icon={<AlertTriangle />} 
      />
      <MetricCard 
        title="Assets Monitored" 
        value="98" 
        description="Servers, applications, and services"
        trend={{ value: 5, isPositive: true }}
        icon={<Laptop />} 
      />
      <MetricCard 
        title="Service Uptime" 
        value="99.8%" 
        description="Average across all services"
        trend={{ value: 0.2, isPositive: true }}
        icon={<Activity />} 
      />
    </div>
  );
};

export default SummaryMetrics;
