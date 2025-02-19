"use client";

import { ShareIcon } from "@heroicons/react/24/outline";
import { PublicKey } from "@solana/web3.js";

interface ShareButtonProps {
  marketAddress: PublicKey;
  className?: string;
}

export function ShareButton({
  marketAddress,
  className = "",
}: ShareButtonProps) {
  const handleShare = () => {
    const shareUrl = `https://dial.to/?action=solana-action:http://localhost:3001/api/donate?address=${marketAddress.toString()}`;

    // Copy to clipboard
    navigator.clipboard.writeText(shareUrl);

    // Open in new tab
    window.open(shareUrl, "_blank");
  };

  return (
    <button
      onClick={handleShare}
      className={`p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white ${className}`}
      title="Share market"
    >
      <ShareIcon className="w-5 h-5" />
    </button>
  );
}
