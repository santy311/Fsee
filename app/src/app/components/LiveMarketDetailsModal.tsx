"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { Market, ProgramUtils } from "../utils/ProgramUtils";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { ShareButton } from "./ShareButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  market: Market;
}

export function LiveMarketDetailsModal({ isOpen, onClose, market }: Props) {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [predictionAmount, setPredictionAmount] = useState("");
  const [liquidityAmount, setLiquidityAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isAddingLiquidity, setIsAddingLiquidity] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [isRemovingLiquidity, setIsRemovingLiquidity] = useState(false);
  const wallet = useWallet();

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const handleAddLiquidity = async () => {
    if (!wallet.publicKey) {
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
      const connection = new Connection(
        process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com"
      );
      const programUtils = new ProgramUtils(connection, wallet);
      const amount = Number(liquidityAmount);
      const tx = await programUtils.addLiquidity(market.publicKey, amount);
      console.log("Liquidity added successfully. Transaction signature:", tx);
      onClose();
    } catch (err) {
      console.error("Error adding liquidity:", err);
      setError(err instanceof Error ? err.message : "Failed to add liquidity");
    } finally {
      setIsAddingLiquidity(false);
    }
  };

  const handleBuy = async (buyingYes: boolean) => {
    if (!wallet.publicKey) {
      setError("Please connect your wallet first");
      return;
    }

    if (
      !predictionAmount ||
      isNaN(Number(predictionAmount)) ||
      Number(predictionAmount) <= 0
    ) {
      setError("Please enter a valid amount");
      return;
    }

    setIsBuying(true);
    setError(null);

    try {
      const connection = new Connection(
        process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com"
      );
      const programUtils = new ProgramUtils(connection, wallet);
      const amount = Number(predictionAmount);
      const tx = await programUtils.buy(market.publicKey, buyingYes, amount);
      console.log("Buy successful. Transaction signature:", tx);
      onClose();
    } catch (err) {
      console.error("Error buying tokens:", err);
      setError(err instanceof Error ? err.message : "Failed to buy tokens");
    } finally {
      setIsBuying(false);
    }
  };

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

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-background rounded-xl w-full max-w-lg relative">
          <div className="absolute top-4 right-4 z-10">
            <ShareButton marketAddress={market.publicKey} />
          </div>
          {/* Main Content */}
          <div className="p-6">
            {/* Image and Title Section */}
            <div className="relative w-full h-[200px] rounded-lg overflow-hidden mb-4">
              <img
                src={market.icon}
                alt={market.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-2 flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="text-green-400">
                    YES: {(market.yesAmount * 100).toFixed(2)}%
                  </span>
                  <span className="text-red-400">
                    NO: {(market.noAmount * 100).toFixed(2)}%
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

            {/* Accordions */}
            <div className="space-y-2">
              {/* Predict Section */}
              <div className="border border-white/10 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleAccordion("predict")}
                  className="w-full px-4 py-3 flex justify-between items-center hover:bg-white/5"
                >
                  <span className="font-medium">Predict</span>
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${
                      activeAccordion === "predict" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeAccordion === "predict" && (
                  <div className="p-4 border-t border-white/10">
                    <input
                      type="number"
                      value={predictionAmount}
                      onChange={(e) => setPredictionAmount(e.target.value)}
                      className="w-full bg-white/5 border-border rounded-lg px-3 py-2 text-sm text-white mb-3"
                      placeholder="Enter amount"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleBuy(true)}
                        disabled={isBuying}
                        className="flex-1 bg-green-600/20 hover:bg-green-600/30 text-green-500 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isBuying ? "Processing..." : "YES"}
                      </button>
                      <button
                        onClick={() => handleBuy(false)}
                        disabled={isBuying}
                        className="flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-500 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isBuying ? "Processing..." : "NO"}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Add Liquidity Section */}
              <div className="border border-white/10 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleAccordion("liquidity")}
                  className="w-full px-4 py-3 flex justify-between items-center hover:bg-white/5"
                >
                  <span className="font-medium">Liquidity</span>
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${
                      activeAccordion === "liquidity" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeAccordion === "liquidity" && (
                  <div className="p-4 border-t border-white/10">
                    {/* Show LP balance if exists */}
                    {market.userLpBalance && market.userLpBalance > 0 && (
                      <div className="mb-4 p-3 bg-white/5 rounded-lg">
                        <p className="text-sm text-white/60 mb-1">
                          Your LP Balance:
                        </p>
                        <p className="text-white font-medium">
                          {market.userLpBalance.toFixed(2)} LP
                        </p>
                      </div>
                    )}

                    {/* Add Liquidity UI */}
                    <input
                      type="number"
                      value={liquidityAmount}
                      onChange={(e) => setLiquidityAmount(e.target.value)}
                      className="w-full bg-white/5 border-border rounded-lg px-3 py-2 text-sm text-white mb-3"
                      placeholder="Enter liquidity amount"
                    />
                    <button
                      onClick={handleAddLiquidity}
                      disabled={isAddingLiquidity}
                      className="w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-500 py-2 rounded-lg text-sm font-medium mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAddingLiquidity
                        ? "Adding Liquidity..."
                        : "Add Liquidity"}
                    </button>

                    {/* Remove Liquidity button - only show if user has LP tokens */}
                    {market.userLpBalance && market.userLpBalance > 0 && (
                      <button
                        onClick={handleRemoveLiquidity}
                        disabled={isRemovingLiquidity}
                        className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-500 py-2 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isRemovingLiquidity
                          ? "Removing Liquidity..."
                          : "Remove All Liquidity"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm">
                {error}
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
