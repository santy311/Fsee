"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function WalletSection() {
  const { publicKey, wallet } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Function to shorten address
  const shortenAddress = (address: string | null) => {
    if (!address) return "Not connected";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const handleCopyAddress = async () => {
    if (publicKey) {
      await navigator.clipboard.writeText(publicKey.toString());
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  useEffect(() => {
    // Reset balance when wallet is disconnected
    if (!publicKey) {
      setBalance(0);
      setIsExpanded(false);
      return;
    }

    const fetchBalance = async () => {
      if (publicKey) {
        try {
          const balance = await connection.getBalance(publicKey);
          setBalance(balance / LAMPORTS_PER_SOL);
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };

    fetchBalance();
    // Set up balance update interval
    const intervalId = setInterval(fetchBalance, 10000);
    return () => clearInterval(intervalId);
  }, [publicKey, connection]);

  return (
    <div className="p-4 rounded-xl bg-white/5">
      <div className="font-mono">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xs text-muted-foreground">WALLET</h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground hover:text-white transition-colors"
          >
            {isExpanded ? "▼" : "▶"}
          </button>
        </div>

        {isExpanded && (
          <div className="mb-4 text-xs border-b border-white/10 pb-3">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Address</span>
                <div className="flex items-center gap-2">
                  <span>{shortenAddress(publicKey?.toString() || null)}</span>
                  <button
                    onClick={handleCopyAddress}
                    className="text-muted-foreground hover:text-white transition-colors"
                    title={copySuccess ? "Copied!" : "Copy address"}
                  >
                    {copySuccess ? (
                      <span className="text-green-500">✓</span>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          ry="2"
                        />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Network</span>
                <span>Devnet</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Wallet</span>
                <span>{wallet?.adapter.name || "None"}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">◆</span>
            <span>{balance.toFixed(4)} SOL</span>
          </div>
          <span className="text-muted-foreground">
            ${(balance * 200).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {!publicKey ? (
          <div className="col-span-2">
            <WalletMultiButton className="w-full !font-mono !text-xs" />
          </div>
        ) : (
          <>
            <button className="px-4 py-2 text-xs font-mono border border-white/10 rounded-lg hover:bg-white/5">
              DEPOSIT
            </button>
            <button className="px-4 py-2 text-xs font-mono border border-white/10 rounded-lg hover:bg-white/5">
              WITHDRAW
            </button>
          </>
        )}
      </div>
    </div>
  );
}
