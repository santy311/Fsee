"use client";

import { useEffect, useState } from "react";
import { CompletedMarketDetailsModal } from "../../components/CompletedMarketDetailsModal";
import { useWallet } from "@solana/wallet-adapter-react";
import { ProgramUtils, Market } from "../../utils/ProgramUtils";
import { Connection } from "@solana/web3.js";
import { ShareButton } from "../../components/ShareButton";

export default function CompletedMarketsPage() {
  const [selectedMarket, setSelectedMarket] = useState<number | null>(null);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isRedeeming, setIsRedeeming] = useState<number | null>(null);
  const wallet = useWallet();

  const loadMarkets = async () => {
    const connection = new Connection(
      process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com"
    );
    console.log("wallet", wallet.publicKey);
    const programUtils = new ProgramUtils(connection, wallet);
    const allMarkets = await programUtils.getMarkets();
    const filteredMarkets = allMarkets.filter(
      (market) => market.outcome !== null
    );
    console.log("filteredMarkets", filteredMarkets);
    setMarkets(filteredMarkets);
  };

  useEffect(() => {
    loadMarkets();
  }, []);

  const handleRedeem = async (market: Market) => {
    if (!wallet.publicKey) {
      setError("Please connect your wallet first");
      return;
    }

    setIsRedeeming(market.seed);
    setError(null);

    try {
      const connection = new Connection(
        process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com"
      );
      const programUtils = new ProgramUtils(connection, wallet);
      // For now, we're passing 1000 as placeholder amounts. You'll need to get actual token amounts.
      const tx = await programUtils.redeemTokens(
        market.publicKey,
        market.userYesBalance || 0,
        market.userNoBalance || 0
      );
      console.log("Redeem successful. Transaction signature:", tx);
      await loadMarkets(); // Reload markets to update state
    } catch (err) {
      console.error("Error redeeming tokens:", err);
      setError(err instanceof Error ? err.message : "Failed to redeem tokens");
    } finally {
      setIsRedeeming(null);
    }
  };

  const selectedMarketData = markets.find((m) => m.seed === selectedMarket);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Completed Markets</h1>
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm">
          {error}
        </div>
      )}
      {markets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {markets.map((market) => (
            <div
              key={market.seed}
              className="bg-input-background rounded-xl p-4 flex flex-col gap-4 group"
            >
              {/* Image container with overlay button */}
              <div className="relative pt-[70%] w-full bg-white/5 rounded-lg overflow-hidden">
                <img
                  src={market.icon}
                  alt={`Market ${market.seed}`}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <ShareButton
                    marketAddress={market.publicKey}
                    className="bg-black/30 hover:bg-black/50"
                  />
                </div>
                <button
                  onClick={() => setSelectedMarket(market.seed)}
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  <span className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/20">
                    +
                  </span>
                </button>
              </div>

              {/* Title and Result */}
              <div>
                <h3 className="font-medium text-white/90 line-clamp-2">
                  {market.title}
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    market.outcome ? "text-green-500" : "text-red-500"
                  }`}
                >
                  Resolved: {market.outcome ? "YES" : "NO"}
                </p>
              </div>

              {/* Redeem button */}
              {market.outcome !== null &&
              (market.userYesBalance || market.userNoBalance) ? (
                <button
                  onClick={() => handleRedeem(market)}
                  disabled={isRedeeming === market.seed}
                  className="w-full bg-green-600/20 hover:bg-green-600/30 text-green-500 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRedeeming === market.seed
                    ? "Processing..."
                    : "Redeem Winnings"}
                </button>
              ) : (
                <p className="text-white/60 text-sm text-center">
                  No tokens to redeem
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 mb-4 rounded-full bg-white/5 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-white/90 mb-2">
            No Completed Markets
          </h3>
          <p className="text-white/60 max-w-sm">
            There are no completed markets yet. Markets will appear here once
            they are resolved.
          </p>
        </div>
      )}

      {selectedMarketData && (
        <CompletedMarketDetailsModal
          isOpen={!!selectedMarket}
          onClose={() => setSelectedMarket(null)}
          market={selectedMarketData}
          onRedeem={handleRedeem}
          isRedeeming={isRedeeming === selectedMarketData.seed}
        />
      )}
    </div>
  );
}
