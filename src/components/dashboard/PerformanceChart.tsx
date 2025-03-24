
import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

// Sample data for line chart
const performanceData = [
  { name: '00:00', value: 65 },
  { name: '02:00', value: 59 },
  { name: '04:00', value: 80 },
  { name: '06:00', value: 81 },
  { name: '08:00', value: 56 },
  { name: '10:00', value: 55 },
  { name: '12:00', value: 40 },
  { name: '14:00', value: 70 },
  { name: '16:00', value: 90 },
  { name: '18:00', value: 85 },
  { name: '20:00', value: 75 },
  { name: '22:00', value: 60 },
];

const tooltipStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  border: "1px solid rgba(0, 0, 0, 0.05)",
  borderRadius: "8px",
  padding: "8px 12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  fontSize: "12px",
};

const PerformanceChart = () => {
  return (
    <div className="bg-card rounded-lg p-4 mb-6 border">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">System Performance (24h)</h3>
      </div>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <CartesianGrid stroke="rgba(0,0,0,0.05)" strokeDasharray="3 3" />
            <Tooltip contentStyle={tooltipStyle} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--accent))" 
              strokeWidth={2}
              dot={{ r: 3, strokeWidth: 1 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
