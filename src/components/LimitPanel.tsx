import { useState } from "react";
import { ArrowUpDown, Wallet } from "lucide-react";
import TokenSelector, { type Token } from "./TokenSelector";
import TokenIcon from "./TokenIcon";

interface LimitPanelProps {
  tokens: Token[];
}

const LimitPanel = ({ tokens }: LimitPanelProps) => {
  const [sellToken, setSellToken] = useState(tokens[0]);
  const [buyToken, setBuyToken] = useState(tokens[1]);
  const [limitPrice, setLimitPrice] = useState("10236");
  const [sellAmount, setSellAmount] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [activePreset, setActivePreset] = useState("market");
  const [expiry, setExpiry] = useState("1 day");

  const presets = [
    { id: "market", label: "Market" },
    { id: "1", label: "+1%" },
    { id: "5", label: "+5%" },
    { id: "10", label: "+10%" },
  ];

  const expiryOptions = ["1 day", "1 week", "1 month", "1 year"];

  const handleSwapTokens = () => {
    const tmp = sellToken;
    setSellToken(buyToken);
    setBuyToken(tmp);
  };

  return (
    <div className="bg-card rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border/50 p-1.5">
      {/* Price condition */}
      <div className="bg-muted/50 rounded-2xl px-4 py-3.5 mb-1.5">
        <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-2">
          <span>When 1</span>
          <TokenIcon symbol={sellToken.symbol} size={16} />
          <span className="font-medium text-foreground">{sellToken.name}</span>
          <span>is worth</span>
          <button className="ml-auto text-primary">
            <ArrowUpDown size={14} />
          </button>
        </div>
        <div className="flex items-center justify-between gap-3">
          <input
            type="text"
            inputMode="decimal"
            value={limitPrice}
            onChange={(e) => setLimitPrice(e.target.value)}
            className="bg-transparent text-[28px] sm:text-[32px] font-normal text-foreground outline-none w-full min-w-0 leading-tight"
          />
          <div className="flex items-center gap-2 shrink-0">
            <TokenIcon symbol={buyToken.symbol} size={24} />
            <span className="font-semibold text-sm text-foreground">{buyToken.symbol}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-3">
          {presets.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePreset(p.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                activePreset === p.id
                  ? "bg-card border-border text-foreground shadow-sm"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* You're selling */}
      <div className="bg-destructive/5 rounded-2xl px-4 py-3.5 mb-1.5 border border-destructive/10">
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

      {/* Arrow */}
      <div className="flex justify-center -my-[14px] relative z-10">
        <button
          onClick={handleSwapTokens}
          className="bg-card border border-border/60 rounded-xl p-[7px] hover:bg-muted/60 transition-colors text-primary shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
        >
          <ArrowUpDown size={15} strokeWidth={2} />
        </button>
      </div>

      {/* You're buying */}
      <div className="bg-muted/50 rounded-2xl px-4 py-3.5">
        <p className="text-[11px] font-medium text-muted-foreground tracking-wide">You're buying</p>
        <div className="flex items-center justify-between mt-1.5 gap-3">
          <input
            type="text"
            inputMode="decimal"
            placeholder="0"
            value={buyAmount}
            onChange={(e) => setBuyAmount(e.target.value)}
            className="bg-transparent text-[28px] sm:text-[32px] font-normal text-foreground outline-none w-full min-w-0 placeholder:text-muted-foreground/40 leading-tight"
          />
          <TokenSelector token={buyToken} onSelect={setBuyToken} tokens={tokens} />
        </div>
        <div className="flex items-center justify-between mt-2.5 pt-0.5">
          <span className="text-[13px] text-muted-foreground">$ 0.00</span>
          <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
            <Wallet size={13} strokeWidth={1.8} />
            <span>0.00</span>
          </div>
        </div>
      </div>

      {/* Expires in */}
      <div className="flex items-center gap-2 px-2 py-3">
        <span className="text-sm text-muted-foreground shrink-0">Expires in</span>
        <div className="flex items-center gap-1.5">
          {expiryOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setExpiry(opt)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                expiry === opt
                  ? "bg-card border-border text-foreground shadow-sm"
                  : "border-border/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Connect Wallet */}
      <button className="w-full h-[52px] rounded-2xl text-[15px] font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
        Connect Wallet
      </button>

      {/* Orders */}
      <button className="w-full mt-1.5 h-[44px] rounded-2xl text-[14px] font-medium text-muted-foreground border border-border/50 hover:bg-muted/30 transition-colors">
        Orders
      </button>

      {/* Powered by */}
      <p className="text-center text-xs text-muted-foreground mt-3 mb-1">
        Powered by Orbs 🌐
      </p>
    </div>
  );
};

export default LimitPanel;
