
import React from 'react';
import { Search, Server, ShieldAlert, Link2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const handleRunScan = () => {
    navigate('/scans', { state: { openScanDialog: true } });
  };

  return (
    <div className="bg-card rounded-lg p-4 border">
      <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        <button 
          className="flex flex-col items-center justify-center p-3 bg-secondary rounded-md hover:bg-secondary/80 transition-colors"
          onClick={handleRunScan}
        >
          <Search className="h-5 w-5 mb-2" />
          <span className="text-xs">Run Scan</span>
        </button>
        <button className="flex flex-col items-center justify-center p-3 bg-secondary rounded-md hover:bg-secondary/80 transition-colors">
          <Server className="h-5 w-5 mb-2" />
          <span className="text-xs">Add Service</span>
        </button>
        <button className="flex flex-col items-center justify-center p-3 bg-secondary rounded-md hover:bg-secondary/80 transition-colors">
          <ShieldAlert className="h-5 w-5 mb-2" />
          <span className="text-xs">Security Report</span>
        </button>
        <button className="flex flex-col items-center justify-center p-3 bg-secondary rounded-md hover:bg-secondary/80 transition-colors">
          <Link2 className="h-5 w-5 mb-2" />
          <span className="text-xs">New Connection</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
