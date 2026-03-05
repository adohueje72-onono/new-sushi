import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

const CHAIN_TABS = ["EVM", "Solana", "Stellar"] as const;

interface Wallet {
  name: string;
  icon: string;
  badge?: string;
}

const EVM_WALLETS: Wallet[] = [
  { name: "MetaMask", icon: "🦊", badge: "Recent" },
  { name: "Rabby Wallet", icon: "🐰", badge: "Installed" },
  { name: "Phantom", icon: "👻", badge: "Installed" },
  { name: "Keplr", icon: "🟢", badge: "Installed" },
  { name: "Zerion", icon: "🔷", badge: "Installed" },
  { name: "Leap Wallet", icon: "🐸", badge: "Installed" },
  { name: "Cosmostation Wallet", icon: "🌐", badge: "Installed" },
  { name: "SafePal", icon: "🟣", badge: "Installed" },
  { name: "Porto", icon: "📱" },
  { name: "Browser Wallet", icon: "🔵" },
  { name: "WalletConnect", icon: "🔗" },
  { name: "Coinbase Wallet", icon: "🔵" },
];

const SOLANA_WALLETS: Wallet[] = [
  { name: "Phantom", icon: "👻", badge: "Installed" },
  { name: "Solflare", icon: "🔥" },
  { name: "Backpack", icon: "🎒" },
];

const STELLAR_WALLETS: Wallet[] = [
  { name: "Freighter", icon: "🚀" },
  { name: "Lobstr", icon: "⭐" },
];

interface ConnectWalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConnectWalletDialog = ({ open, onOpenChange }: ConnectWalletDialogProps) => {
  const [activeChain, setActiveChain] = useState<typeof CHAIN_TABS[number]>("EVM");

  const wallets = activeChain === "EVM" ? EVM_WALLETS : activeChain === "Solana" ? SOLANA_WALLETS : STELLAR_WALLETS;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[380px] p-0 gap-0 rounded-2xl overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-3">
          <DialogTitle className="text-lg font-semibold text-foreground">Connect</DialogTitle>
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
            By connecting your wallet, you agree to Sushi Labs'{" "}
            <a href="https://www.sushi.com/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="https://www.sushi.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </DialogHeader>

        {/* Chain Tabs */}
        <div className="px-6 pb-3">
          <div className="flex bg-muted/50 rounded-xl p-1">
            {CHAIN_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveChain(tab)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeChain === tab
                    ? "bg-card shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Wallet List */}
        <div className="px-3 pb-4 max-h-[400px] overflow-y-auto">
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl hover:bg-muted/60 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl w-8 h-8 flex items-center justify-center">{wallet.icon}</span>
                <span className="text-sm font-medium text-foreground">{wallet.name}</span>
              </div>
              {wallet.badge && (
                <span className="text-xs text-muted-foreground font-medium">{wallet.badge}</span>
              )}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectWalletDialog;
