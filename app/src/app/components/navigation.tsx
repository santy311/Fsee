"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Navigation() {
  const pathname = usePathname();
  const [isMarketsOpen, setIsMarketsOpen] = useState(true);

  console.log("URL: ", process.env.NEXT_PUBLIC_RPC_URL);
  const isMarketSection = pathname.startsWith("/markets");

  return (
    <nav className="px-4 py-2">
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => setIsMarketsOpen(!isMarketsOpen)}
            className={`w-full flex items-center justify-between px-4 py-2 text-sm font-mono ${
              isMarketSection
                ? "text-white/90 bg-white/10"
                : "text-muted-foreground hover:bg-white/10"
            } rounded-lg`}
          >
            <span>MARKETS</span>
            <span className="text-xs">{isMarketsOpen ? "▼" : "▶"}</span>
          </button>
          {isMarketsOpen && (
            <ul className="ml-4 mt-2 space-y-2">
              <li>
                <Link
                  href="/markets/live"
                  className={`block px-4 py-2 text-sm font-mono ${
                    pathname === "/markets/live"
                      ? "text-white/90 bg-white/10"
                      : "text-muted-foreground hover:bg-white/10"
                  } rounded-lg`}
                >
                  LIVE
                </Link>
              </li>
              <li>
                <Link
                  href="/markets/completed"
                  className={`block px-4 py-2 text-sm font-mono ${
                    pathname === "/markets/completed"
                      ? "text-white/90 bg-white/10"
                      : "text-muted-foreground hover:bg-white/10"
                  } rounded-lg`}
                >
                  COMPLETED
                </Link>
              </li>
              <li>
                <Link
                  href="/markets/created"
                  className={`block px-4 py-2 text-sm font-mono ${
                    pathname === "/markets/created"
                      ? "text-white/90 bg-white/10"
                      : "text-muted-foreground hover:bg-white/10"
                  } rounded-lg`}
                >
                  CREATED
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link
            href="/create"
            className={`block px-4 py-2 text-sm font-mono ${
              pathname === "/create"
                ? "text-white/90 bg-white/10"
                : "text-muted-foreground hover:bg-white/10"
            } rounded-lg`}
          >
            CREATE
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            className={`block px-4 py-2 text-sm font-mono ${
              pathname === "/settings"
                ? "text-white/90 bg-white/10"
                : "text-muted-foreground hover:bg-white/10"
            } rounded-lg`}
          >
            SETTINGS
          </Link>
        </li>
      </ul>
    </nav>
  );
}
