
import React from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import ServiceMonitor from '@/components/dashboard/ServiceMonitor';
import AlertHistory from '@/components/dashboard/AlertHistory';

const MonitoringSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Service monitoring */}
      <ErrorBoundary componentName="Service Monitor">
        <ServiceMonitor />
      </ErrorBoundary>
      
      {/* Alert history */}
      <ErrorBoundary componentName="Alert History">
        <AlertHistory />
      </ErrorBoundary>
    </div>
  );
};

export default MonitoringSection;
