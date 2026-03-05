import { useState } from "react";
import { Wallet, Info } from "lucide-react";
import ConnectWalletDialog from "./ConnectWalletDialog";
import TokenSelector, { type Token } from "./TokenSelector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DCAPanelProps {
  tokens: Token[];
}

const DCAPanel = ({ tokens }: DCAPanelProps) => {
  const [walletOpen, setWalletOpen] = useState(false);
  const [sellToken, setSellToken] = useState(tokens[0]);
  const [buyToken, setBuyToken] = useState(tokens[1]);
  const [sellAmount, setSellAmount] = useState("");
  const [overTrades, setOverTrades] = useState("1");
  const [everyInterval, setEveryInterval] = useState("5");
  const [intervalUnit, setIntervalUnit] = useState("minutes");

  return (
    <div className="bg-card rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border/50 p-1.5">
      {/* You're selling */}
      <div className="bg-[hsl(var(--destructive)/0.08)] rounded-2xl px-4 py-3.5">
        <p className="text-[11px] font-medium text-muted-foreground tracking-wide">You're selling</p>
        <div className="flex items-center justify-between mt-1.5 gap-3">
          <input
            type="text"
            inputMode="decimal"
            placeholder="0.0"
            value={sellAmount}
            onChange={(e) => setSellAmount(e.target.value)}
            className="bg-transparent text-[28px] sm:text-[32px] font-normal text-foreground outline-none w-full min-w-0 placeholder:text-muted-foreground/40 leading-tight"
          />
          <TokenSelector token={sellToken} onSelect={setSellToken} tokens={tokens} />
        </div>
        <div className="flex items-center justify-between mt-2.5 pt-0.5">
          <span className="text-[13px] text-muted-foreground">$ 0.00</span>
          <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
            <Wallet size={13} strokeWidth={1.8} />
            <span>0.00</span>
          </div>
        </div>
      </div>

      {/* Swap icon */}
      <div className="flex justify-center -my-[14px] relative z-10">
        <div className="bg-card border border-border/60 rounded-xl p-[7px] text-primary shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </div>
      </div>

      {/* You're buying */}
      <div className="bg-muted/50 rounded-2xl px-4 py-3.5">
        <p className="text-[11px] font-medium text-muted-foreground tracking-wide">You're buying</p>
        <div className="flex items-center justify-between mt-1.5 gap-3">
          <TokenSelector token={buyToken} onSelect={setBuyToken} tokens={tokens} />
          <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground ml-auto">
            <Wallet size={13} strokeWidth={1.8} />
            <span>0.00</span>
          </div>
        </div>
      </div>

      {/* Over / Every */}
      <div className="px-2 pt-3 pb-1">
        <div className="flex gap-3">
          {/* Over */}
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-1.5">
              <span className="text-[12px] font-medium text-muted-foreground">Over</span>
              <Info size={12} className="text-muted-foreground/60" />
            </div>
            <div className="bg-[hsl(var(--destructive)/0.08)] rounded-xl px-3.5 py-3">
              <input
                type="text"
                inputMode="decimal"
                value={overTrades}
                onChange={(e) => setOverTrades(e.target.value)}
                className="bg-transparent text-lg font-medium text-foreground outline-none w-full"
              />
            </div>
          </div>

          {/* Every */}
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-1.5">
              <span className="text-[12px] font-medium text-muted-foreground">Every</span>
              <Info size={12} className="text-muted-foreground/60" />
            </div>
            <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-3.5 py-3 border border-border/40">
              <input
                type="text"
                inputMode="decimal"
                value={everyInterval}
                onChange={(e) => setEveryInterval(e.target.value)}
                className="bg-transparent text-lg font-medium text-foreground outline-none w-16"
              />
              <Select value={intervalUnit} onValueChange={setIntervalUnit}>
                <SelectTrigger className="h-auto border-0 bg-transparent p-0 text-[13px] font-medium text-foreground shadow-none focus:ring-0 w-auto gap-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minutes">Minutes</SelectItem>
                  <SelectItem value="hours">Hours</SelectItem>
                  <SelectItem value="days">Days</SelectItem>
                  <SelectItem value="weeks">Weeks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <p className="text-xs text-destructive mt-2">
          0.00 {sellToken.symbol} per trade ($0.00 - min $200)
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={() => setWalletOpen(true)}
        className="w-full mt-1.5 h-[52px] rounded-2xl text-[15px] font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Connect Wallet
      </button>
      <ConnectWalletDialog open={walletOpen} onOpenChange={setWalletOpen} />

      {/* Orders */}
      <button className="w-full mt-1.5 h-[44px] rounded-2xl text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors border border-border/40">
        Orders
      </button>

      {/* Powered by */}
      <p className="text-center text-xs text-muted-foreground mt-3 mb-1">
        Powered by Orbs 🌐
      </p>
    </div>
  );
};

export default DCAPanel;
