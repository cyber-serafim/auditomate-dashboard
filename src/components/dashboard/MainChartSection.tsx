
import React from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import FixedVulnerabilityChart from '@/components/dashboard/FixedVulnerabilityChart';
import SidePanel from './SidePanel';

const MainChartSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Vulnerability analysis chart */}
      <div className="lg:col-span-2">
        <ErrorBoundary componentName="Vulnerability Chart">
          <FixedVulnerabilityChart />
        </ErrorBoundary>
      </div>
      
      {/* Quick actions and last scan results */}
      <SidePanel />
    </div>
  );
};

export default MainChartSection;
