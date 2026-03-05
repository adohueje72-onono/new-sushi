import { useState } from "react";
import { ChevronDown, Search, Info } from "lucide-react";
import TokenIcon from "./TokenIcon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface Token {
  symbol: string;
  name: string;
}

interface TokenSelectorProps {
  token: Token;
  onSelect: (token: Token) => void;
  tokens: Token[];
}

const QUICK_TOKENS: Token[] = [
  { symbol: "ETH", name: "Ethereum" },
  { symbol: "WETH", name: "Wrapped Ether" },
  { symbol: "SUSHI", name: "SushiSwap" },
  { symbol: "WBTC", name: "Wrapped Bitcoin" },
  { symbol: "USDC", name: "USD Coin" },
  { symbol: "USDT", name: "Tether" },
  { symbol: "DAI", name: "Dai" },
];

const TRENDING_TOKENS: Token[] = [
  { symbol: "XAUt", name: "Tether Gold" },
  { symbol: "SHIB", name: "SHIBA INU" },
  { symbol: "KITE", name: "Kite" },
  { symbol: "PAXG", name: "Paxos Gold" },
  { symbol: "PEPE", name: "Pepe" },
  { symbol: "LINK", name: "Chainlink" },
  { symbol: "UNI", name: "Uniswap" },
];

const TokenSelector = ({ token, onSelect, tokens }: TokenSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const allTokens = [...tokens, ...TRENDING_TOKENS.filter(t => !tokens.find(tk => tk.symbol === t.symbol))];
  
  const filteredTrending = TRENDING_TOKENS.filter(
    (t) =>
      t.symbol.toLowerCase().includes(search.toLowerCase()) ||
      t.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (t: Token) => {
    onSelect(t);
    setOpen(false);
    setSearch("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-card hover:bg-secondary/80 rounded-full py-1.5 pl-1.5 pr-2.5 border border-border/60 transition-colors shrink-0 shadow-sm"
      >
        <TokenIcon symbol={token.symbol} size={24} />
        <span className="font-semibold text-sm text-foreground tracking-tight">{token.symbol}</span>
        <ChevronDown size={14} className="text-muted-foreground -ml-0.5" />
      </button>

      <Dialog open={open} onOpenChange={(isOpen) => { setOpen(isOpen); if (!isOpen) setSearch(""); }}>
        <DialogContent className="sm:max-w-[480px] p-0 gap-0 rounded-2xl overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle className="text-lg font-semibold text-foreground">Select a token</DialogTitle>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Select a token from our default list or search for a token by symbol or address.
            </p>
          </DialogHeader>

          {/* Search */}
          <div className="px-6 pb-3 pt-2">
            <div className="relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by token or address"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 rounded-xl bg-muted/50 border border-border/60 pl-10 pr-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground/60"
              />
            </div>
          </div>

          {/* Quick Select Chips */}
          <div className="px-6 pb-3">
            <div className="flex flex-wrap gap-2">
              {QUICK_TOKENS.map((t) => (
                <button
                  key={t.symbol}
                  onClick={() => handleSelect(t)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/60 bg-card hover:bg-muted/60 transition-colors text-sm font-medium text-foreground"
                >
                  <TokenIcon symbol={t.symbol} size={20} />
                  {t.symbol}
                </button>
              ))}
            </div>
          </div>

          {/* Trending Tokens */}
          <div className="px-6 pb-2">
            <h3 className="text-sm font-semibold text-foreground">Trending Tokens</h3>
          </div>

          <div className="px-3 pb-4 max-h-[320px] overflow-y-auto">
            {filteredTrending.map((t) => (
              <button
                key={t.symbol}
                onClick={() => handleSelect(t)}
                className="flex items-center justify-between w-full px-3 py-3 rounded-xl hover:bg-muted/60 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <TokenIcon symbol={t.symbol} size={36} />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-semibold text-foreground">{t.symbol}</span>
                    <span className="text-xs text-muted-foreground">{t.name}</span>
                  </div>
                </div>
                <Info size={16} className="text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
              </button>
            ))}
            {filteredTrending.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-6">No tokens found</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TokenSelector;
