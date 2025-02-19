"use client";

import { useEffect, useState } from "react";
import { CreatedMarketDetailsModal } from "../../components/CreatedMarketDetailsModal";
import { useWallet } from "@solana/wallet-adapter-react";
import { ProgramUtils, Market } from "../../utils/ProgramUtils";
import { Connection } from "@solana/web3.js";
import { ShareButton } from "../../components/ShareButton";

export default function CreatedMarketsPage() {
  const [selectedMarket, setSelectedMarket] = useState<number | null>(null);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isResolving, setIsResolving] = useState<number | null>(null);
  const wallet = useWallet();
  console.log("wallet outer", wallet.publicKey?.toBase58());

  const loadMarkets = async () => {
    if (!wallet.publicKey) {
      console.log("No wallet connected");
      setMarkets([]);
      return;
    }

    const connection = new Connection(
      process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com"
    );
    const programUtils = new ProgramUtils(connection, wallet);
    const allMarkets = await programUtils.getMarkets();
    const createdMarkets = allMarkets.filter((m) => {
      console.log("m.creator", m.creator.toBase58());
      console.log("wallet.publicKey", wallet.publicKey?.toBase58());
      return m.creator.toBase58() === wallet.publicKey?.toBase58();
    });
    setMarkets(createdMarkets);
  };

  useEffect(() => {
    loadMarkets();
  }, [wallet.publicKey]);

  const selectedMarketData = markets.find((m) => m.seed === selectedMarket);

  const handleResolveMarket = async (market: Market, outcome: boolean) => {
    if (!wallet.publicKey) {
      setError("Please connect your wallet first");
      return;
    }

    setIsResolving(market.seed);
    setError(null);

    try {
      const connection = new Connection(
        process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com"
      );
      const programUtils = new ProgramUtils(connection, wallet);
      const tx = await programUtils.resolveMarket(market.publicKey, outcome);
      console.log("Market resolved successfully. Transaction signature:", tx);
      await loadMarkets(); // Reload markets to update state
      setSelectedMarket(null); // Close the modal
    } catch (err) {
      console.error("Error resolving market:", err);
      setError(err instanceof Error ? err.message : "Failed to resolve market");
    } finally {
      setIsResolving(null);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Markets You Created</h1>
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm">
          {error}
        </div>
      )}
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

            {/* Title and Status */}
            <div>
              <h3 className="font-medium text-white/90 line-clamp-2">
                {market.title}
              </h3>
              <p className="text-sm mt-1 text-white/60">
                Status: {market.outcome ? "Resolved" : "Active"}
              </p>
            </div>

            {/* End Market button */}
            {market.outcome === null && (
              <button
                onClick={() => setSelectedMarket(market.seed)}
                className="w-full bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-500 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                End Market
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedMarketData && (
        <CreatedMarketDetailsModal
          isOpen={!!selectedMarket}
          onClose={() => setSelectedMarket(null)}
          market={selectedMarketData}
          onResolve={handleResolveMarket}
          isResolving={isResolving === selectedMarketData.seed}
        />
      )}
    </div>
  );
}
