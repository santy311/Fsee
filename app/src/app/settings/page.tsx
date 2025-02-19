"use client";

import { LogOut } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export default function SettingsPage() {
  const { disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const handleSwitchWallet = async () => {
    try {
      // First disconnect the current wallet
      await disconnect();
      // Then open the wallet modal
      setVisible(true);
    } catch (error) {
      console.error("Error switching wallet:", error);
    }
  };

  const handleLogOut = async () => {
    try {
      await disconnect();
      // router.push("/"); // Redirect to home page after disconnect
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-mono mb-8">SETTINGS</h1>

        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-white/5">
            <h2 className="text-sm font-mono text-muted-foreground mb-4">
              NETWORK
            </h2>
            <select className="w-full bg-input-background border-border rounded-lg px-4 py-2 text-sm font-mono text-white focus:outline-none focus:ring-1 focus:ring-border">
              <option value="devnet">Solana Devnet</option>
              <option value="mainnet">Solana Mainnet</option>
            </select>
          </div>

          <div className="p-4 rounded-xl bg-white/5">
            <h2 className="text-sm font-mono text-muted-foreground mb-4">
              SECURITY
            </h2>
            <div className="space-y-4">
              <button
                onClick={handleSwitchWallet}
                className="w-full px-4 py-2 text-sm font-mono border border-white/10 rounded-lg hover:bg-white/5"
              >
                SWITCH WALLET
              </button>
              <button
                onClick={handleLogOut}
                className="w-full px-4 py-2 text-sm font-mono border border-white/10 rounded-lg hover:bg-white/5 flex items-center justify-center gap-2"
              >
                <LogOut size={16} />
                SIGN OUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
