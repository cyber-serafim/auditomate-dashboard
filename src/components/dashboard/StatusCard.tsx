
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type StatusType = 'online' | 'offline' | 'warning';

type StatusCardProps = {
  title: string;
  status: StatusType;
  description?: string;
  timestamp?: string;
  details?: string;
  className?: string;
};

const statusConfig = {
  online: {
    label: 'Online',
    color: 'bg-green-500',
    animation: 'animate-status-pulse'
  },
  warning: {
    label: 'Warning',
    color: 'bg-yellow-400',
    animation: 'animate-status-pulse-warning'
  },
  offline: {
    label: 'Offline',
    color: 'bg-red-500',
    animation: 'animate-status-pulse-error'
  }
};

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  status,
  description,
  timestamp,
  details,
  className
}) => {
  const { label, color, animation } = statusConfig[status];
  
  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-md", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <div className="flex items-center gap-2">
            <div className={cn("h-2.5 w-2.5 rounded-full", color, animation)} />
            <span className="text-xs font-medium">{label}</span>
          </div>
        </div>
        {description && (
          <CardDescription className="text-xs">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {details && <p className="text-sm">{details}</p>}
      </CardContent>
      {timestamp && (
        <CardFooter className="pt-1 text-xs text-muted-foreground">
          Last checked: {timestamp}
        </CardFooter>
      )}
    </Card>
  );
};

export default StatusCard;
