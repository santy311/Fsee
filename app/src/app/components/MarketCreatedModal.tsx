"use client";
import { FC, useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { ProgramUtils } from "../utils/ProgramUtils";
import { Dialog } from "@headlessui/react";
import { Market } from "../utils/ProgramUtils";

interface MarketCreatedModalProps {
  isOpen: boolean;
  marketPDA: PublicKey;
  onClose: () => void;
}

const MarketCreatedModal: FC<MarketCreatedModalProps> = ({
  isOpen,
  marketPDA,
  onClose,
}) => {
  const wallet = useWallet();
  const [liquidityAmount, setLiquidityAmount] = useState("");
  const [isAddingLiquidity, setIsAddingLiquidity] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [marketData, setMarketData] = useState<Market | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const connection = new Connection(
    process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com"
  );

  useEffect(() => {
    const fetchMarketData = async () => {
      if (!isOpen || !marketPDA) return;

      setIsLoading(true);
      try {
        const programUtils = new ProgramUtils(connection, wallet);
        const market = await programUtils.getMarket(marketPDA);

        setMarketData(market);
      } catch (err) {
        console.error("Error fetching market data:", err);
        setError("Failed to load market data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketData();
  }, [isOpen]);

  const handleAddLiquidity = async () => {
    if (!wallet.publicKey || !marketData) {
      setError("Please connect your wallet first");
      return;
    }

    if (
      !liquidityAmount ||
      isNaN(Number(liquidityAmount)) ||
      Number(liquidityAmount) <= 0
    ) {
      setError("Please enter a valid amount");
      return;
    }

    setIsAddingLiquidity(true);
    setError(null);

    try {
      const programUtils = new ProgramUtils(connection, wallet);
      const amount = Number(liquidityAmount);
      const tx = await programUtils.addLiquidity(marketData.publicKey, amount);
      console.log("Liquidity added successfully. Transaction signature:", tx);
      //router.push("/markets/live");
      onClose();
    } catch (err) {
      console.error("Error adding liquidity:", err);
      setError(err instanceof Error ? err.message : "Failed to add liquidity");
    } finally {
      setIsAddingLiquidity(false);
    }
  };

  if (isLoading) {
    return (
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-background rounded-xl p-6">
            <div className="text-white">Loading market data...</div>
          </Dialog.Panel>
        </div>
      </Dialog>
    );
  }

  if (!marketData) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-background rounded-xl p-6 max-w-lg w-full">
          {/* Image Section */}
          <div className="relative w-full h-[200px] rounded-lg overflow-hidden mb-4">
            <img
              src={marketData.icon}
              alt={marketData.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-2 flex flex-col gap-1">
              <div className="flex justify-between text-sm">
                <span className="text-green-400">
                  YES: {(marketData.yesAmount * 100).toFixed(2)}%
                </span>
                <span className="text-red-400">
                  NO: {(marketData.noAmount * 100).toFixed(2)}%
                </span>
              </div>
              <div className="text-sm text-white/80">
                Liquidity Pool: {marketData.liquidity.toFixed(2)} USDC
              </div>
            </div>
          </div>

          <Dialog.Title className="text-xl font-bold mb-2">
            {marketData.title}
          </Dialog.Title>
          <p className="text-white/60 text-sm mb-6">{marketData.desc}</p>

          {/* Liquidity Input */}
          <div className="mt-6">
            <input
              type="number"
              value={liquidityAmount}
              onChange={(e) => setLiquidityAmount(e.target.value)}
              className="w-full bg-white/5 border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-border text-sm"
              placeholder="Enter initial liquidity amount"
              step="0.01"
              min="0"
            />
            <button
              onClick={handleAddLiquidity}
              disabled={isAddingLiquidity}
              className="mt-4 w-full bg-green-600/20 hover:bg-green-600/30 text-green-500 py-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAddingLiquidity
                ? "Adding Liquidity..."
                : "Add Initial Liquidity"}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={onClose}
            className="mt-6 w-full bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Close
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default MarketCreatedModal;
