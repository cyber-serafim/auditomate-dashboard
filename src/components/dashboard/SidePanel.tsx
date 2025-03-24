
import React from 'react';
import QuickActions from './QuickActions';
import LastScanResults from './LastScanResults';

const SidePanel = () => {
  return (
    <div className="space-y-4">
      <QuickActions />
      <LastScanResults />
    </div>
  );
};

export default SidePanel;
