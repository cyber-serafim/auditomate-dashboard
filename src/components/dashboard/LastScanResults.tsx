
import React from 'react';

const LastScanResults = () => {
  return (
    <div className="bg-card rounded-lg p-4 border">
      <h3 className="text-sm font-medium mb-3">Last Scan Results</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-2 bg-red-50 rounded-md">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-red-500 rounded-full"></div>
            <span className="text-xs font-medium">Critical</span>
          </div>
          <span className="text-xs font-bold">7</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-orange-50 rounded-md">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
            <span className="text-xs font-medium">High</span>
          </div>
          <span className="text-xs font-bold">15</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-md">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
            <span className="text-xs font-medium">Medium</span>
          </div>
          <span className="text-xs font-bold">28</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-green-50 rounded-md">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <span className="text-xs font-medium">Low</span>
          </div>
          <span className="text-xs font-bold">54</span>
        </div>
      </div>
      <div className="pt-3 mt-3 border-t border-border">
        <p className="text-xs text-muted-foreground">Last full scan: <span className="font-medium">Today, 09:45 AM</span></p>
      </div>
    </div>
  );
};

export default LastScanResults;
