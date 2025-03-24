
import React from 'react';
import StatusCard from '@/components/dashboard/StatusCard';

const SystemStatus = () => {
  return (
    <>
      <h2 className="text-lg font-medium tracking-tight mb-4">System Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatusCard 
          title="Web Infrastructure" 
          status="online" 
          description="Web servers and applications"
          timestamp="2 minutes ago"
          details="5/5 services operational" 
        />
        <StatusCard 
          title="Database Cluster" 
          status="warning" 
          description="Primary and replica databases"
          timestamp="1 minute ago"
          details="High load on primary server" 
        />
        <StatusCard 
          title="Authentication Services" 
          status="offline" 
          description="User authentication and SSO"
          timestamp="5 minutes ago"
          details="Scheduled maintenance in progress" 
        />
      </div>
    </>
  );
};

export default SystemStatus;
