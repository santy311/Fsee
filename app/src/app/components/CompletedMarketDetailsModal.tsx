"use client";

import { Dialog } from "@headlessui/react";
import { Market, ProgramUtils } from "../utils/ProgramUtils";
import { Connection } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import Image from "next/image";
import { ShareButton } from "./ShareButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  market: Market;
  onRedeem: (market: Market) => Promise<void>;
  isRedeeming: boolean;
}

export function CompletedMarketDetailsModal({
  isOpen,
  onClose,
  market,
  onRedeem,
  isRedeeming,
}: Props) {
  const [isRemovingLiquidity, setIsRemovingLiquidity] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wallet = useWallet();

  const handleRemoveLiquidity = async () => {
    if (!wallet.publicKey) {
      setError("Please connect your wallet first");
      return;
    }

    setIsRemovingLiquidity(true);
    setError(null);

    try {
      const connection = new Connection(
        process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com"
      );
      const programUtils = new ProgramUtils(connection, wallet);
      const tx = await programUtils.removeLiquidity(
        market.publicKey,
        market.userLpBalance || 0
      );
      console.log("Liquidity removed successfully. Transaction signature:", tx);
      onClose();
    } catch (err) {
      console.error("Error removing liquidity:", err);
      setError(
        err instanceof Error ? err.message : "Failed to remove liquidity"
      );
    } finally {
      setIsRemovingLiquidity(false);
    }
  };

  const hasTokens =
    (market.userYesBalance || 0) > 0 || (market.userNoBalance || 0) > 0;

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
                Final Liquidity: {market.liquidity.toFixed(2)} USDC
              </div>
            </div>
          </div>

          <Dialog.Title className="text-xl font-bold mb-2">
            {market.title}
          </Dialog.Title>
          <p className="text-white/60 text-sm mb-6">{market.desc}</p>

          {/* Add token balance display */}
          <div className="p-4 bg-white/5 rounded-lg mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-white/60">Your YES tokens:</span>
              <span className="text-white">
                {(market.userYesBalance || 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Your NO tokens:</span>
              <span className="text-white">
                {(market.userNoBalance || 0).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Add LP balance display if exists */}
          {market.userLpBalance && market.userLpBalance > 0 && (
            <div className="p-4 bg-white/5 rounded-lg mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-white/60">Your LP tokens:</span>
                <span className="text-white">
                  {market.userLpBalance.toFixed(2)} LP
                </span>
              </div>
              <button
                onClick={handleRemoveLiquidity}
                disabled={isRemovingLiquidity}
                className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-500 py-2 rounded-lg text-sm font-medium mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRemovingLiquidity
                  ? "Removing Liquidity..."
                  : "Remove Liquidity"}
              </button>
            </div>
          )}

          {/* Market Result */}
          <div className="p-4 bg-white/5 rounded-lg mb-6">
            <p className="text-center text-lg">
              Result:{" "}
              <span
                className={market.outcome ? "text-green-500" : "text-red-500"}
              >
                {market.outcome ? "YES" : "NO"}
              </span>
            </p>
          </div>

          {/* Redeem Button - only show if user has tokens */}
          {hasTokens ? (
            <button
              onClick={() => onRedeem(market)}
              disabled={isRedeeming}
              className="w-full bg-green-600/20 hover:bg-green-600/30 text-green-500 py-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              {isRedeeming ? "Processing..." : "Redeem Winnings"}
            </button>
          ) : (
            <p className="text-white/60 text-sm text-center mb-4">
              You do not have any tokens to redeem for this market
            </p>
          )}

          <button
            onClick={onClose}
            className="w-full bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Close
          </button>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
