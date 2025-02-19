import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navigation } from "./components/navigation";
import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletSection } from "./components/WalletSection";
import { SolanaWalletProvider } from "./components/WalletProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "F4See - Foresee the Future",
  description: "Social First Prediction Market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
      >
        <SolanaWalletProvider>
          <div className="flex h-screen">
            <div className="w-[270px] flex flex-col border-r border-white/10">
              <div className="p-4">
                <h1 className="text-xl font-medium">F4See</h1>
              </div>
              <Navigation />
              <div className="p-4 mt-auto border-t border-white/10">
                <WalletSection />
              </div>
            </div>
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </SolanaWalletProvider>
      </body>
    </html>
  );
}
