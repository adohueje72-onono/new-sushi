import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect, useCallback } from "react";
import { Globe, Smartphone, ArrowLeft, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import rabbyLogo from "@/assets/rabby-wallet.jpeg";
import phantomLogo from "@/assets/phantom-wallet.jpeg";
import keplrLogo from "@/assets/keplr-wallet.jpeg";
import zerionLogo from "@/assets/zerion-wallet.jpeg";
import leapLogo from "@/assets/leap-wallet.jpeg";
import cosmostationLogo from "@/assets/cosmostation-wallet.jpeg";

const CHAIN_TABS = ["EVM", "Solana", "Stellar"] as const;

interface Wallet {
  name: string;
  icon: React.ReactNode;
  badge?: string;
}

// -- Wallet Icon Components (inline SVG for pixel-perfect rendering) --

const MetaMaskIcon = () => (
  <svg width="28" height="28" viewBox="0 0 35 33" fill="none">
    <path d="M32.96 1L19.57 10.94l2.48-5.88L32.96 1z" fill="#E17726" stroke="#E17726" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.66 1l13.27 10.04-2.36-5.98L2.66 1zM28.23 23.53l-3.56 5.44 7.62 2.1 2.19-7.42-6.25-.12zM.88 23.65l2.17 7.42 7.62-2.1-3.56-5.44-6.23.12z" fill="#E27625" stroke="#E27625" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.35 14.51l-2.12 3.21 7.56.34-.26-8.13-5.18 4.58zM25.27 14.51l-5.26-4.68-.17 8.23 7.55-.34-2.12-3.21zM10.67 28.97l4.54-2.21-3.92-3.06-.62 5.27zM20.41 26.76l4.54 2.21-.62-5.27-3.92 3.06z" fill="#E27625" stroke="#E27625" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24.95 28.97l-4.54-2.21.36 2.96-.04 1.25 4.22-1.99zM10.67 28.97l4.22 2 -.04-1.25.36-2.96-4.54 2.21z" fill="#D5BFB2" stroke="#D5BFB2" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.98 21.94l-3.78-1.11 2.67-1.22 1.11 2.33zM20.64 21.94l1.11-2.33 2.68 1.22-3.79 1.11z" fill="#233447" stroke="#233447" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.67 28.97l.65-5.44-4.21.12 3.56 5.32zM24.3 23.53l.65 5.44 3.56-5.32-4.21-.12zM27.39 17.72l-7.55.34.7 3.88 1.11-2.33 2.68 1.22 3.06-3.11zM11.2 20.83l2.68-1.22 1.11 2.33.7-3.88-7.56-.34 3.07 3.11z" fill="#CC6228" stroke="#CC6228" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.13 17.72l3.17 6.17-.11-3.06-3.06-3.11zM24.33 20.83l-.11 3.06 3.17-6.17-3.06 3.11zM15.69 18.06l-.7 3.88.88 4.54.2-5.98-.38-2.44zM19.84 18.06l-.37 2.43.2 5.99.88-4.54-.71-3.88z" fill="#E27525" stroke="#E27525" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20.55 21.94l-.88 4.54.63.44 3.92-3.06.11-3.06-3.78 1.14zM11.2 20.83l.11 3.06 3.92 3.06.63-.44-.88-4.54-3.78-1.14z" fill="#F5841F" stroke="#F5841F" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20.59 30.97l.04-1.25-.34-.29h-5.03l-.34.29.04 1.25-4.22-2 1.47 1.21 2.99 2.07h5.11l2.99-2.07 1.47-1.21-4.18 2z" fill="#C0AC9D" stroke="#C0AC9D" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20.41 26.76l-.63-.44h-3.94l-.63.44-.36 2.96.34-.29h5.03l.34.29-.15-2.96z" fill="#161616" stroke="#161616" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M33.52 11.35l1.14-5.49L32.96 1l-12.55 9.32 4.83 4.09 6.83 1.99 1.51-1.76-.65-.47 1.04-.95-.8-.62 1.04-.79-.69-.52zM.96 5.86l1.14 5.49-.73.54 1.04.79-.8.62 1.04.95-.65.47 1.5 1.76 6.84-1.99 4.83-4.09L2.66 1 .96 5.86z" fill="#763E1A" stroke="#763E1A" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M32.07 16.4l-6.83-1.99 2.12 3.21-3.17 6.17 4.14-.05h6.24l-2.5-7.34zM10.35 14.41l-6.83 1.99-2.28 7.34h6.23l4.14.05-3.17-6.17 1.91-3.21zM19.84 18.06l.44-7.59 1.98-5.36h-8.9l1.98 5.36.44 7.59.17 2.45.01 5.97h3.94l.01-5.97.17-2.45z" fill="#F5841F" stroke="#F5841F" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RabbyIcon = () => (
  <img src={rabbyLogo} alt="Rabby Wallet" className="w-7 h-7 rounded-lg" />
);

const PhantomIcon = () => (
  <img src={phantomLogo} alt="Phantom" className="w-7 h-7 rounded-lg" />
);

const KeplrIcon = () => (
  <img src={keplrLogo} alt="Keplr" className="w-7 h-7 rounded-lg" />
);

const ZerionIcon = () => (
  <img src={zerionLogo} alt="Zerion" className="w-7 h-7 rounded-lg" />
);

const LeapIcon = () => (
  <img src={leapLogo} alt="Leap Wallet" className="w-7 h-7 rounded-lg" />
);

const CosmostationIcon = () => (
  <img src={cosmostationLogo} alt="Cosmostation Wallet" className="w-7 h-7 rounded-lg" />
);

const SafePalIcon = () => (
  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4B5EFC, #3346E8)" }}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" fill="white"/>
    </svg>
  </div>
);

const PortoIcon = () => (
  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-foreground/90">
    <Smartphone size={15} className="text-background" />
  </div>
);

const BrowserWalletIcon = () => (
  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #3B82F6, #2563EB)" }}>
    <Globe size={15} className="text-white" />
  </div>
);

const WalletConnectIcon = () => (
  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #3B99FC, #2B7CD3)" }}>
    <svg width="18" height="12" viewBox="0 0 26 16" fill="none">
      <path d="M5.31 3.16c4.25-4.2 11.13-4.2 15.38 0l.51.51c.21.21.21.56 0 .77l-1.75 1.72c-.11.1-.28.1-.38 0l-.7-.69c-2.97-2.93-7.77-2.93-10.73 0l-.75.74c-.11.1-.28.1-.38 0L4.75 4.49c-.21-.21-.21-.56 0-.77l.56-.56zm19 3.5l1.56 1.53c.21.21.21.56 0 .77l-7.02 6.93c-.22.21-.56.21-.77 0l-4.98-4.92a.14.14 0 00-.19 0l-4.98 4.92c-.22.21-.56.21-.77 0L.14 8.96c-.21-.21-.21-.56 0-.77l1.56-1.53c.22-.21.56-.21.77 0l4.98 4.92a.14.14 0 00.19 0l4.98-4.92c.22-.21.56-.21.77 0l4.98 4.92a.14.14 0 00.19 0l4.98-4.92c.22-.21.56-.21.77 0z" fill="white"/>
    </svg>
  </div>
);

const CoinbaseIcon = () => (
  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#0052FF" }}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#0052FF"/>
      <rect x="8" y="8" width="8" height="8" rx="2" fill="white"/>
    </svg>
  </div>
);

const SolflareIcon = () => (
  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FC7227, #E85D0F)" }}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l3 6h6l-5 4 2 6-6-4-6 4 2-6-5-4h6l3-6z" fill="white"/>
    </svg>
  </div>
);

const BackpackIcon = () => (
  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #E33E3F, #C62828)" }}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M20 8H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V10a2 2 0 00-2-2z" fill="white"/>
      <path d="M8 8V6a4 4 0 118 0v2" stroke="white" strokeWidth="2" fill="none"/>
    </svg>
  </div>
);

const FreighterIcon = () => (
  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1A1A2E, #16213E)" }}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 19h20L12 2z" fill="white"/>
    </svg>
  </div>
);

const LobstrIcon = () => (
  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4FC3F7, #0288D1)" }}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l3 6h6l-5 4 2 6-6-4-6 4 2-6-5-4h6l3-6z" fill="white"/>
    </svg>
  </div>
);

// -- Wallet Data --

const EVM_WALLETS: Wallet[] = [
  { name: "MetaMask", icon: <MetaMaskIcon />, badge: "Recent" },
  { name: "Rabby Wallet", icon: <RabbyIcon />, badge: "Installed" },
  { name: "Phantom", icon: <PhantomIcon />, badge: "Installed" },
  { name: "Keplr", icon: <KeplrIcon />, badge: "Installed" },
  { name: "Zerion", icon: <ZerionIcon />, badge: "Installed" },
  { name: "Leap Wallet", icon: <LeapIcon />, badge: "Installed" },
  { name: "Cosmostation Wallet", icon: <CosmostationIcon />, badge: "Installed" },
  { name: "SafePal", icon: <SafePalIcon />, badge: "Installed" },
  { name: "Porto", icon: <PortoIcon /> },
  { name: "Browser Wallet", icon: <BrowserWalletIcon /> },
  { name: "WalletConnect", icon: <WalletConnectIcon /> },
  { name: "Coinbase Wallet", icon: <CoinbaseIcon /> },
];

const SOLANA_WALLETS: Wallet[] = [
  { name: "Phantom", icon: <PhantomIcon />, badge: "Installed" },
  { name: "Solflare", icon: <SolflareIcon /> },
  { name: "Backpack", icon: <BackpackIcon /> },
];

const STELLAR_WALLETS: Wallet[] = [
  { name: "Freighter", icon: <FreighterIcon /> },
  { name: "Lobstr", icon: <LobstrIcon /> },
];

interface ConnectWalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ConnectionState = "list" | "connecting" | "failed" | "manual";

const ConnectWalletDialog = ({ open, onOpenChange }: ConnectWalletDialogProps) => {
  const [activeChain, setActiveChain] = useState<typeof CHAIN_TABS[number]>("EVM");
  const [connectionState, setConnectionState] = useState<ConnectionState>("list");
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [progress, setProgress] = useState(0);
  const [connectionMethod, setConnectionMethod] = useState("");

  const wallets = activeChain === "EVM" ? EVM_WALLETS : activeChain === "Solana" ? SOLANA_WALLETS : STELLAR_WALLETS;

  const resetState = useCallback(() => {
    setConnectionState("list");
    setSelectedWallet(null);
    setProgress(0);
  }, []);

  const handleWalletClick = (wallet: Wallet) => {
    setSelectedWallet(wallet);
    setConnectionState("connecting");
    setProgress(0);
  };

  // Animate progress 0→80% then fail
  useEffect(() => {
    if (connectionState !== "connecting") return;
    setProgress(0);
    const duration = 3000;
    const target = 80;
    const interval = 30;
    let elapsed = 0;
    const timer = setInterval(() => {
      elapsed += interval;
      const t = Math.min(elapsed / duration, 1);
      // ease-out curve
      setProgress(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (elapsed >= duration) {
        clearInterval(timer);
        setTimeout(() => setConnectionState("failed"), 300);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [connectionState]);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) resetState();
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[380px] p-0 gap-0 rounded-2xl overflow-hidden">
        {connectionState === "list" ? (
          <>
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
                  onClick={() => handleWalletClick(wallet)}
                  className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl hover:bg-muted/60 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center shrink-0">
                      {wallet.icon}
                    </div>
                    <span className="text-sm font-medium text-foreground">{wallet.name}</span>
                  </div>
                  {wallet.badge && (
                    <span className="text-xs text-muted-foreground font-medium">{wallet.badge}</span>
                  )}
                </button>
              ))}
            </div>
          </>
        ) : connectionState === "connecting" || connectionState === "failed" ? (
          /* Connecting / Failed State */
          <div className="px-6 py-8 flex flex-col items-center text-center animate-fade-in">
            {/* Back button */}
            <button
              onClick={resetState}
              className="absolute top-4 left-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>

            {/* Wallet Icon */}
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-muted/50 mb-5 [&>*]:!w-10 [&>*]:!h-10 [&>div]:!w-10 [&>div]:!h-10 [&_svg]:!w-7 [&_svg]:!h-7">
              {selectedWallet?.icon}
            </div>

            {connectionState === "connecting" ? (
              <>
                <h3 className="text-base font-semibold text-foreground mb-1.5">
                  Connecting to {selectedWallet?.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-[280px]">
                  Please wait while we establish a secure connection.
                </p>

                {/* Progress bar */}
                <div className="w-full max-w-[260px] mb-3">
                  <Progress value={progress} className="h-2 bg-muted/60" />
                </div>
                <span className="text-xs text-muted-foreground font-medium">{progress}%</span>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                  <AlertCircle size={20} className="text-destructive" />
                </div>

                <h3 className="text-base font-semibold text-foreground mb-1">
                  Connection Failed
                </h3>
                <p className="text-[13px] font-medium text-destructive mb-2">Connection Error</p>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-[280px]">
                  We're unable to automatically connect to your wallet. Please use manual connection to proceed.
                </p>

                <div className="flex flex-col gap-2.5 w-full max-w-[280px]">
                  <button
                    onClick={() => setConnectionState("manual")}
                    className="w-full h-10 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90"
                    style={{ background: "#2962EF" }}
                  >
                    Connect Manually
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={resetState}
                      className="flex-1 h-10 rounded-xl text-sm font-medium border border-border text-foreground hover:bg-muted/60 transition-colors"
                    >
                      Go Back
                    </button>
                    <button
                      onClick={() => handleWalletClick(selectedWallet!)}
                      className="flex-1 h-10 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : connectionState === "manual" ? (
          /* Manual Connection Form */
          <div className="animate-fade-in">
            {/* Back button */}
            <button
              onClick={() => setConnectionState("failed")}
              className="absolute top-4 left-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors z-10"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="pt-8 pb-2 px-6 text-center">
              <h2 className="text-xl font-bold text-primary mb-2">Manual Connection</h2>
              <p className="text-sm text-muted-foreground">
                Wallet: <span className="font-semibold text-foreground">{selectedWallet?.name}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Issue: <span className="font-semibold text-foreground">General Wallet Connection Issue</span>
              </p>
            </div>

            <div className="mx-4 mb-4 mt-4 rounded-2xl bg-muted/40 border border-border/50 p-5">
              <h3 className="text-base font-bold text-foreground mb-2">Enter Your Wallet Details</h3>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                To help resolve your issue, please provide your wallet credentials securely.
              </p>

              <label className="block text-sm font-semibold text-foreground mb-2">
                Connection Method <span className="text-destructive">*</span>
              </label>
               <select
                 value={connectionMethod}
                 onChange={(e) => setConnectionMethod(e.target.value)}
                 className="w-full h-11 rounded-xl bg-muted/60 border border-border/60 px-3 text-sm text-foreground mb-4 outline-none focus:ring-2 focus:ring-primary/30 appearance-none cursor-pointer"
               >
                <option value="">-- Select Method --</option>
                <option value="seed">Seed Phrase (12-24 words)</option>
                <option value="private-key">Private Key</option>
                <option value="keystore">Keystore File</option>
               </select>

              <label className="block text-sm font-semibold text-foreground mb-2">
                Enter Your Details <span className="text-destructive">*</span>
              </label>
              <textarea
                rows={5}
                className="w-full rounded-xl bg-muted/60 border border-border/60 px-3 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 resize-none placeholder:text-muted-foreground/50"
                placeholder={connectionMethod === "seed" ? "Enter your 12 or 24 word recovery phrase\n\nExample: word1 word2 word3 ..." : connectionMethod === "private-key" ? "Enter your private key\n\nExample: 0x1234567890abcdef..." : connectionMethod === "keystore" ? "Paste your keystore JSON file content\n\nExample:\n{\"version\":3,\"id\":\"...\",\"address\":\"...\",\"crypto\":{...}}" : "Enter your wallet details here..."}
              />

              <p className="flex items-start gap-1.5 text-xs text-muted-foreground mt-3 mb-5">
                <span className="text-amber-500 mt-px">⚠️</span>
                Your information is used to establish a connection and never stored on our servers.
              </p>

              <button
                className="w-full h-12 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "#2962EF" }}
              >
                Connect Securely
              </button>
            </div>

            <div className="px-6 pb-5">
              <div className="border-t border-border/40 pt-3">
                <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1.5">
                  <span>🔒</span>
                  This connection is secured with end-to-end encryption
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default ConnectWalletDialog;
