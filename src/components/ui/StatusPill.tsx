import React from 'react';
import { cn } from '../../lib/utils';

interface StatusPillProps {
  label: string;
  tone?: 'default' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

export function StatusPill({ label, tone = 'default', className }: StatusPillProps) {
  const styles = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-green-50 text-green-700 border border-green-100',
    warning: 'bg-amber-50 text-amber-700 border border-amber-100',
    error: 'bg-red-50 text-red-700 border border-red-100',
    info: 'bg-blue-50 text-blue-700 border border-blue-100',
    pending: 'bg-cyan-50 text-cyan-700 border border-cyan-100',
    uploaded: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
  };

  // Map labels to tones if tone is default
  let effectiveTone = tone;
  if (tone === 'default') {
    if (label === 'Submitted for QC') effectiveTone = 'info';
    else if (label === 'Uploaded') effectiveTone = 'uploaded';
    else if (label === 'QC pending') effectiveTone = 'pending';
    else if (label === 'Re-inspection needed') effectiveTone = 'warning';
    else if (label === 'Rejected') effectiveTone = 'error';
    else if (label === 'QC in progress') effectiveTone = 'warning';
    else if (label === 'Approved') effectiveTone = 'success';
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap',
        // @ts-ignore
        styles[effectiveTone] || styles.default,
        className
      )}
    >
      {label}
    </span>
  );
}
