import { PredictionGraph } from "./PredictionGraph";

import { Market } from "../utils/ProgramUtils";

type MarketDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  market: Market;
};

export function MarketDetailsModal({
  isOpen,
  onClose,
  market,
}: MarketDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div
        className="bg-background max-w-lg w-full rounded-xl p-6 space-y-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-medium text-white/90">{market.title}</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white/90 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="relative pt-[60%] w-full bg-white/5 rounded-lg overflow-hidden">
          <img
            src={market.icon}
            alt={market.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>

        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-sm font-medium text-white/90 mb-2">
              Current Prediction
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white/90">0.71</span>
              <span className="text-sm text-green-400">+2.1%</span>
            </div>
          </div>

          <PredictionGraph market={market} />

          <p className="text-white/60 text-sm leading-relaxed">{market.desc}</p>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            className="w-full bg-white/5 border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-border"
            placeholder="Enter amount"
          />

          <div className="flex gap-2">
            <button className="flex-1 bg-green-600/20 hover:bg-green-600/30 text-green-500 py-2 rounded-lg text-sm font-medium transition-colors">
              YES
            </button>
            <button className="flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-500 py-2 rounded-lg text-sm font-medium transition-colors">
              NO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
