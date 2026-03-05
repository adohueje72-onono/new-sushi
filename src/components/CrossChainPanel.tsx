import { useState } from "react";
import { ArrowUpDown, Wallet, ChevronRight } from "lucide-react";
import ConnectWalletDialog from "./ConnectWalletDialog";
import TokenIcon from "./TokenIcon";
import { type Token } from "./TokenSelector";

interface CrossChainPanelProps {
  tokens: Token[];
}

const CrossChainPanel = ({ tokens }: CrossChainPanelProps) => {
  const [walletOpen, setWalletOpen] = useState(false);
  const [sellToken] = useState(tokens[0]);
  const [buyToken] = useState<Token>({ symbol: "ARB", name: "Arbitrum One" });
  const [sellAmount, setSellAmount] = useState("");
  const [buyAmount, setBuyAmount] = useState("");

  return (
    <div className="bg-card rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border/50 p-1.5">
      {/* Sell */}
      <div className="bg-muted/50 rounded-2xl px-4 py-3.5">
        <p className="text-[11px] font-medium text-muted-foreground tracking-wide">Sell</p>
        <div className="flex items-center justify-between mt-1.5 gap-3">
          <input
            type="text"
            inputMode="decimal"
            placeholder="0.0"
            value={sellAmount}
            onChange={(e) => setSellAmount(e.target.value)}
            className="bg-transparent text-[28px] sm:text-[32px] font-normal text-foreground outline-none w-full min-w-0 placeholder:text-muted-foreground/40 leading-tight"
          />
          <button className="flex items-center gap-2 bg-card border border-border/60 rounded-full pl-1.5 pr-2.5 py-1.5 hover:bg-muted/60 transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.04)] shrink-0">
            <div className="relative">
              <TokenIcon symbol={sellToken.symbol} size={28} />
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-primary border-2 border-card flex items-center justify-center">
                <TokenIcon symbol="ETH" size={8} />
              </div>
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-sm font-semibold text-foreground">{sellToken.symbol}</span>
              <span className="text-[10px] text-muted-foreground">Ethereum</span>
            </div>
            <ChevronRight size={14} className="text-muted-foreground" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-2.5 pt-0.5">
          <span className="text-[13px] text-muted-foreground">$ 0.00</span>
          <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
            <Wallet size={13} strokeWidth={1.8} />
            <span>0.00</span>
          </div>
        </div>
      </div>

      {/* Swap Direction */}
      <div className="flex justify-center -my-[14px] relative z-10">
        <div className="bg-card border border-border/60 rounded-xl p-[7px] text-primary shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <ArrowUpDown size={15} strokeWidth={2} />
        </div>
      </div>

      {/* Buy */}
      <div className="bg-muted/50 rounded-2xl px-4 py-3.5">
        <p className="text-[11px] font-medium text-muted-foreground tracking-wide">Buy</p>
        <div className="flex items-center justify-between mt-1.5 gap-3">
          <input
            type="text"
            inputMode="decimal"
            placeholder="0.0"
            value={buyAmount}
            onChange={(e) => setBuyAmount(e.target.value)}
            className="bg-transparent text-[28px] sm:text-[32px] font-normal text-foreground outline-none w-full min-w-0 placeholder:text-muted-foreground/40 leading-tight"
          />
          <button className="flex items-center gap-2 bg-card border border-border/60 rounded-full pl-1.5 pr-2.5 py-1.5 hover:bg-muted/60 transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.04)] shrink-0">
            <div className="relative">
              <TokenIcon symbol={buyToken.symbol} size={28} />
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-accent border-2 border-card flex items-center justify-center">
                <span className="text-[6px] font-bold text-accent-foreground">A</span>
              </div>
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-sm font-semibold text-foreground">{buyToken.symbol}</span>
              <span className="text-[10px] text-muted-foreground">{buyToken.name}</span>
            </div>
            <ChevronRight size={14} className="text-muted-foreground" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-2.5 pt-0.5">
          <span className="text-[13px] text-muted-foreground">$ 0.00</span>
          <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
            <Wallet size={13} strokeWidth={1.8} />
            <span>0.00</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => setWalletOpen(true)}
        className="w-full mt-1.5 h-[52px] rounded-2xl text-[15px] font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Connect EVM Wallet
      </button>
      <ConnectWalletDialog open={walletOpen} onOpenChange={setWalletOpen} />
    </div>
  );
};

export default CrossChainPanel;
