import { useState } from "react";
import { ArrowUpDown, Settings, Wallet } from "lucide-react";
import TokenSelector, { type Token } from "./TokenSelector";
import TokenIcon from "./TokenIcon";
import LimitPanel from "./LimitPanel";

const TOKENS: Token[] = [
  { symbol: "ETH", name: "Ethereum" },
  { symbol: "SUSHI", name: "SushiSwap" },
  { symbol: "USDC", name: "USD Coin" },
  { symbol: "DAI", name: "Dai" },
  { symbol: "WBTC", name: "Wrapped Bitcoin" },
  { symbol: "USDT", name: "Tether" },
];

const SwapCard = () => {
  const [activeTab, setActiveTab] = useState("swap");
  const [sellToken, setSellToken] = useState(TOKENS[0]);
  const [buyToken, setBuyToken] = useState(TOKENS[1]);
  const [sellAmount, setSellAmount] = useState("");
  const [buyAmount, setBuyAmount] = useState("");

  const tabs = [
    { id: "swap", label: "Swap" },
    { id: "limit", label: "Limit" },
    { id: "dca", label: "DCA" },
    { id: "cross", label: "Cross-Chain", accent: true, icon: "⇄" },
  ];

  const handleSwapTokens = () => {
    const tmp = sellToken;
    setSellToken(buyToken);
    setBuyToken(tmp);
    setSellAmount(buyAmount);
    setBuyAmount(sellAmount);
  };

  return (
    <div className="w-full max-w-[464px] mx-auto">
      {/* Tabs Row */}
      <div className="flex items-center gap-0.5 mb-3 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-card shadow-[0_1px_3px_rgba(0,0,0,0.06)] text-foreground"
                : "text-muted-foreground hover:text-foreground"
            } ${tab.accent && activeTab !== tab.id ? "!text-accent" : ""}`}
          >
            {tab.icon && <span className="mr-1">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
        <button className="ml-auto p-2 text-muted-foreground hover:text-foreground transition-colors shrink-0 rounded-lg hover:bg-card">
          <Settings size={17} strokeWidth={1.8} />
        </button>
      </div>

      {/* Conditional Content */}
      {activeTab === "limit" ? (
        <LimitPanel tokens={TOKENS} />
      ) : (
        /* Main Swap Card */
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
              <TokenSelector token={sellToken} onSelect={setSellToken} tokens={TOKENS} />
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
            <button
              onClick={handleSwapTokens}
              className="bg-card border border-border/60 rounded-xl p-[7px] hover:bg-muted/60 transition-colors text-primary shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            >
              <ArrowUpDown size={15} strokeWidth={2} />
            </button>
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
              <TokenSelector token={buyToken} onSelect={setBuyToken} tokens={TOKENS} />
            </div>
            <div className="flex items-center justify-between mt-2.5 pt-0.5">
              <span className="text-[13px] text-muted-foreground">$ 0.00</span>
              <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                <Wallet size={13} strokeWidth={1.8} />
                <span>0.00</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full mt-1.5 h-[52px] rounded-2xl text-[15px] font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            Connect EVM Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default SwapCard;
