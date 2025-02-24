"use client";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { ProgramUtils } from "../utils/ProgramUtils";
import { Connection, PublicKey } from "@solana/web3.js";
import MarketCreatedModal from "../components/MarketCreatedModal";

export default function Create() {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const [iconType, setIconType] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [marketPDA, setMarketPDA] = useState<PublicKey | null>(null);
  const [transactionStatus, setTransactionStatus] = useState<string>("");
  // Initialize connection and program utils
  const connection = new Connection(
    process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com"
  );

  const showMarketDetails = async () => {
    if (!marketPDA) return;
    const programUtils = new ProgramUtils(connection, wallet);
    const market = await programUtils.getMarket(marketPDA);
    console.log(market);
    setShowSuccessModal(true);
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIconType(e.target.value);
    if (e.target.value !== "custom") {
      setCustomUrl(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!publicKey) {
      setError("Please connect your wallet first");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setTransactionStatus("Preparing transaction...");

    try {
      const programUtils = new ProgramUtils(connection, wallet);
      const iconUrl = iconType === "custom" ? customUrl : iconType;
      const seed = Math.floor(Math.random() * 1000000);

      setTransactionStatus("Creating and confirming transaction...");

      const marketPDA = await programUtils.initializeMarket(
        seed,
        title,
        description,
        iconUrl
      );

      setTransactionStatus(
        "Transaction submitted! Waiting for confirmation..."
      );
      setMarketPDA(marketPDA);

      console.log("Market created successfully. Market PDA:", marketPDA);
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Error creating market:", err);
      setError(err instanceof Error ? err.message : "Failed to create market");
    } finally {
      setIsSubmitting(false);
      setTransactionStatus("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-8 text-center">Create Market</h1>

        {publicKey ? (
          <>
            <button onClick={showMarketDetails}>Get Market</button>
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500">
                {error}
              </div>
            )}

            {isSubmitting && (
              <div className="mb-4 p-4 bg-blue-500/20 border border-blue-500 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                  <p className="text-blue-500">{transactionStatus}</p>
                </div>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-input-background border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-border"
                  placeholder="Market Title"
                  required
                />
              </div>

              <div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-input-background border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-border min-h-[100px]"
                  placeholder="Market Description"
                  required
                />
              </div>

              <div className="space-y-2">
                <select
                  className="w-full bg-input-background border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-border appearance-none"
                  value={iconType}
                  onChange={handleIconChange}
                  required
                >
                  <option value="">Select a token icon</option>
                  <option value="/images/solana.png">Solana</option>
                  <option value="/images/bitcoin.webp">Bitcoin</option>
                  <option value="/images/ethereum.webp">Ethereum</option>
                  <option value="custom">Custom URL</option>
                </select>

                {iconType === "custom" && (
                  <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    className="w-full bg-input-background border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-border"
                    placeholder="Enter custom icon URL"
                    required
                  />
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !publicKey}
                className={`w-full px-4 py-3 bg-input-background hover:bg-border transition-colors rounded-lg text-white font-medium ${
                  (isSubmitting || !publicKey) &&
                  "opacity-50 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "Creating Market..." : "Create Market"}
              </button>
            </form>
          </>
        ) : (
          <div>Please connect your wallet</div>
        )}
      </div>

      <MarketCreatedModal
        isOpen={showSuccessModal}
        marketPDA={marketPDA!}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}
