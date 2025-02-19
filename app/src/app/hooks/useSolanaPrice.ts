import { useState, useEffect } from 'react';

interface PriceResponse {
  data: {
    So11111111111111111111111111111111111111112: {
      price: string;
    };
  };
}

interface UseSolanaPriceReturn {
  price: number | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useSolanaPrice(refreshInterval = 30000): UseSolanaPriceReturn {
  const [price, setPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPrice = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        "https://api.jup.ag/price/v2?ids=JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN,So11111111111111111111111111111111111111112"
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch SOL price');
      }

      const data: PriceResponse = await response.json();
      setPrice(Number(data.data.So11111111111111111111111111111111111111112.price));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch SOL price'));
      console.error("Failed to fetch SOL price:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();

    if (refreshInterval > 0) {
      const interval = setInterval(fetchPrice, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [refreshInterval]);

  return {
    price,
    isLoading,
    error,
    refetch: fetchPrice
  };
} 