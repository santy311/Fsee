"use client";

import { useMemo } from "react";

interface PredictionGraphProps {
  yesAmount: number;
  noAmount: number;
  className?: string;
}

export function PredictionGraph({
  yesAmount,
  noAmount,
  className = "",
}: PredictionGraphProps) {
  const total = useMemo(() => yesAmount + noAmount, [yesAmount, noAmount]);
  const yesPercentage = useMemo(
    () => (total > 0 ? (yesAmount / total) * 100 : 50),
    [yesAmount, total]
  );
  const noPercentage = useMemo(
    () => (total > 0 ? (noAmount / total) * 100 : 50),
    [noAmount, total]
  );

  return (
    <div className={`w-full space-y-2 ${className}`}>
      {/* Graph bars */}
      <div className="h-8 w-full flex rounded-lg overflow-hidden">
        <div
          style={{ width: `${yesPercentage}%` }}
          className="bg-green-600/20 flex items-center justify-center text-sm font-medium text-green-500"
        >
          {yesPercentage.toFixed(1)}%
        </div>
        <div
          style={{ width: `${noPercentage}%` }}
          className="bg-red-600/20 flex items-center justify-center text-sm font-medium text-red-500"
        >
          {noPercentage.toFixed(1)}%
        </div>
      </div>

      {/* Labels */}
      <div className="flex justify-between text-sm text-white/60">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-600/20" />
          <span>Yes: {yesAmount.toFixed(2)} SOL</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-600/20" />
          <span>No: {noAmount.toFixed(2)} SOL</span>
        </div>
      </div>
    </div>
  );
}
