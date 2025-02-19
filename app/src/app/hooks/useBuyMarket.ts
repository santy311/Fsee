import { useState } from "react";
import { Market, ProgramUtils } from "../utils/ProgramUtils";
import { Connection } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

interface Amounts {
  [key: number]: string;
}

export function useBuyMarket() {
  const [error, setError] = useState<string | null>(null);
  const [isBuying, setIsBuying] = useState<number | null>(null);
  const [amounts, setAmounts] = useState<Amounts>({});
  const wallet = useWallet();

  const handleBuy = async (market: Market, buyingYes: boolean) => {
    if (!wallet.publicKey) {
      setError("Please connect your wallet first");
      return;
    }

    const amount = amounts[market.seed];
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setIsBuying(market.seed);
    setError(null);

    try {
      const connection = new Connection(
        process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com"
      );
      const programUtils = new ProgramUtils(connection, wallet);
      const tx = await programUtils.buy(
        market.publicKey,
        buyingYes,
        Number(amount)
      );
      console.log("Buy successful. Transaction signature:", tx);
      // Reset amount after successful purchase
      setAmounts((prev) => ({ ...prev, [market.seed]: "" }));
    } catch (err) {
      console.error("Error buying tokens:", err);
      setError(err instanceof Error ? err.message : "Failed to buy tokens");
    } finally {
      setIsBuying(null);
    }
  };

  return {
    handleBuy,
    error,
    isBuying,
    amounts,
    setAmounts,
  };
} 