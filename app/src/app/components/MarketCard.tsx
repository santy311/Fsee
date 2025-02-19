import { Market } from "../utils/ProgramUtils";

interface MarketCardProps {
  market: Market;
  onSelect: (market: Market) => void;
  renderActions?: (market: Market) => React.ReactNode;
  showPrices?: boolean;
}

export function MarketCard({
  market,
  onSelect,
  renderActions,
  showPrices,
}: MarketCardProps) {
  return (
    <div className="bg-input-background rounded-xl p-4 flex flex-col gap-4 group">
      {/* Image container with overlay button */}
      <div className="relative pt-[70%] w-full bg-white/5 rounded-lg overflow-hidden">
        <img
          src={market.icon}
          alt={`Market ${market.seed}`}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        {showPrices && (
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
              Liquidity: {market.liquidity.toFixed(2)} USDC
            </div>
          </div>
        )}
        <button
          onClick={() => onSelect(market)}
          className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
        >
          <span className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/20">
            +
          </span>
        </button>
      </div>

      {/* Title */}
      <div>
        <h3 className="font-medium text-white/90 line-clamp-2">
          {market.title}
        </h3>
        {market.outcome !== undefined && (
          <p className="text-sm mt-1 text-white/60">
            Status:{" "}
            {market.outcome === null
              ? "Active"
              : market.outcome
              ? "Resolved: YES"
              : "Resolved: NO"}
          </p>
        )}
      </div>

      {renderActions && renderActions(market)}
    </div>
  );
}
