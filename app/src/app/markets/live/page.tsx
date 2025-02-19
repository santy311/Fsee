"use client";

import { useState } from "react";
import { LiveMarketDetailsModal } from "../../components/LiveMarketDetailsModal";
import { useWallet } from "@solana/wallet-adapter-react";
import { Market } from "../../utils/ProgramUtils";
import { MarketCard } from "../../components/MarketCard";
import { useMarkets } from "../../hooks/useMarkets";
import { EmptyState } from "../../components/EmptyState";
import { useBuyMarket } from "../../hooks/useBuyMarket";
import { ShareButton } from "../../components/ShareButton";

export default function Markets() {
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const { publicKey } = useWallet();
  const { markets, loading, error } = useMarkets((m) => !m.resolved);
  const {
    handleBuy,
    error: buyError,
    isBuying,
    amounts,
    setAmounts,
  } = useBuyMarket();

  const renderMarketActions = (market: Market) => (
    <>
      <input
        type="number"
        value={amounts[market.seed] || ""}
        onChange={(e) =>
          setAmounts((prev) => ({ ...prev, [market.seed]: e.target.value }))
        }
        className="w-full bg-white/5 border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-border"
        placeholder="Enter amount"
      />
      <div className="flex gap-2">
        <button
          onClick={() => handleBuy(market, true)}
          disabled={isBuying === market.seed}
          className="flex-1 bg-green-600/20 hover:bg-green-600/30 text-green-500 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isBuying === market.seed ? "Processing..." : "YES"}
        </button>
        <button
          onClick={() => handleBuy(market, false)}
          disabled={isBuying === market.seed}
          className="flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-500 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isBuying === market.seed ? "Processing..." : "NO"}
        </button>
      </div>
    </>
  );

  if (!publicKey) {
    return (
      <EmptyState
        icon="lock"
        title="Wallet Not Connected"
        description="Please connect your wallet to view and participate in markets."
      />
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Markets</h1>
      {(error || buyError) && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm">
          {error || buyError}
        </div>
      )}

      {markets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {markets.map((market) => (
            <div className="relative">
              <MarketCard
                key={market.seed}
                market={market}
                onSelect={setSelectedMarket}
                renderActions={() => renderMarketActions(market)}
                showPrices
              />
              <div className="absolute top-2 right-2">
                <ShareButton
                  marketAddress={market.publicKey}
                  className="bg-black/30 hover:bg-black/50"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="info"
          title="No Markets Available"
          description="There are currently no live markets available. Check back later or create your own market."
        />
      )}

      {selectedMarket && (
        <LiveMarketDetailsModal
          isOpen={!!selectedMarket}
          onClose={() => setSelectedMarket(null)}
          market={selectedMarket}
        />
      )}
    </div>
  );
}
