"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { Market } from "../utils/ProgramUtils";
import { ShareButton } from "./ShareButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  market: Market;
  onResolve: (market: Market, outcome: boolean) => Promise<void>;
  isResolving: boolean;
}

export function CreatedMarketDetailsModal({
  isOpen,
  onClose,
  market,
  onResolve,
  isResolving,
}: Props) {
  const [showResolutionButtons, setShowResolutionButtons] = useState(false);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-background rounded-xl p-6 max-w-2xl w-full relative">
          <div className="absolute top-4 right-4 z-10">
            <ShareButton marketAddress={market.publicKey} />
          </div>
          {/* Image Section */}
          <div className="relative w-full h-[300px] rounded-lg overflow-hidden mb-6">
            <img
              src={market.icon}
              alt={market.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-2 flex flex-col gap-1">
              <div className="flex justify-between text-sm">
                <span className="text-green-400">
                  YES: {(market.yesAmount * 100).toFixed(1)}%
                </span>
                <span className="text-red-400">
                  NO: {(market.noAmount * 100).toFixed(1)}%
                </span>
              </div>
              <div className="text-sm text-white/80">
                Liquidity Pool: {market.liquidity.toFixed(2)} USDC
              </div>
            </div>
          </div>

          <Dialog.Title className="text-xl font-bold mb-2">
            {market.title}
          </Dialog.Title>
          <p className="text-white/60 text-sm mb-6">{market.desc}</p>

          {/* Market Status */}
          <div className="p-4 bg-white/5 rounded-lg mb-6">
            <p className="text-center text-lg">
              Status:{" "}
              <span className="text-white/90">
                {market.outcome !== null ? "Resolved" : "Active"}
              </span>
            </p>
          </div>

          {/* Market Controls */}
          {market.outcome === null && !showResolutionButtons && (
            <button
              onClick={() => setShowResolutionButtons(true)}
              className="w-full bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-500 py-3 rounded-lg text-sm font-medium transition-colors mb-4"
            >
              End Market
            </button>
          )}

          {/* Resolution Buttons */}
          {showResolutionButtons && (
            <div className="space-y-3 mb-4">
              <p className="text-center text-white/60 text-sm">
                How should this market be resolved?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => onResolve(market, true)}
                  disabled={isResolving}
                  className="flex-1 bg-green-600/20 hover:bg-green-600/30 text-green-500 py-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResolving ? "Processing..." : "Resolve YES"}
                </button>
                <button
                  onClick={() => onResolve(market, false)}
                  disabled={isResolving}
                  className="flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-500 py-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResolving ? "Processing..." : "Resolve NO"}
                </button>
              </div>
              <button
                onClick={() => setShowResolutionButtons(false)}
                className="w-full bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Close
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
