import { useEffect, useState } from "react";
import { Market, ProgramUtils } from "../utils/ProgramUtils";
import { Connection } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

export function useMarkets(filter?: (market: Market) => boolean) {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const wallet = useWallet();

  const loadMarkets = async () => {
    try {
      setLoading(true);
      const connection = new Connection(
        process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com"
      );
      console.log("Calling hook");
      const programUtils = new ProgramUtils(connection, wallet);
      const allMarkets = await programUtils.getMarkets();
      const filteredMarkets = filter ? allMarkets.filter(filter) : allMarkets;
      setMarkets(filteredMarkets);
    } catch (err) {
      console.error("Error loading markets:", err);
      setError(err instanceof Error ? err.message : "Failed to load markets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMarkets();
  }, [wallet.publicKey]);

  return { markets, loading, error, reload: loadMarkets };
} 