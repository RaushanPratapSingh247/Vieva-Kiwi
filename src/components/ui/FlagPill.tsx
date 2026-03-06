import React from 'react';
import { cn } from '../../lib/utils';
import { Flag } from '../../types';

interface FlagPillProps {
  flag: Flag;
  className?: string;
}

export function FlagPill({ flag, className }: FlagPillProps) {
  const styles = {
    blocking: 'bg-red-50 text-red-700 border-red-100',
    advisory: 'bg-orange-50 text-orange-700 border-orange-100',
    info: 'bg-gray-50 text-gray-600 border-gray-100',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border cursor-help',
        styles[flag.severity],
        className
      )}
      title={flag.hint}
    >
      {flag.label}
    </span>
  );
}
