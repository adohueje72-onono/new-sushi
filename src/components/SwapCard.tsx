import { useState } from "react";
import { ArrowUpDown, Settings, ChevronDown, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import TokenSelector from "./TokenSelector";

const TOKENS = [
  { symbol: "ETH", name: "Ethereum", icon: "⟠", color: "text-blue-500" },
  { symbol: "SUSHI", name: "SushiSwap", icon: "🍣", color: "text-pink-500" },
  { symbol: "USDC", name: "USD Coin", icon: "💲", color: "text-green-500" },
  { symbol: "DAI", name: "Dai", icon: "◈", color: "text-yellow-500" },
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
    { id: "cross", label: "Cross-Chain", accent: true },
  ];

  const handleSwapTokens = () => {
    setSellToken(buyToken);
    setBuyToken(sellToken);
    setSellAmount(buyAmount);
    setBuyAmount(sellAmount);
  };

  return (
    <div className="w-full max-w-[480px] mx-auto">
      {/* Tabs */}
      <div className="flex items-center gap-0.5 sm:gap-1 mb-4 px-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-card shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            } ${tab.accent ? "text-accent" : ""}`}
          >
            {tab.id === "cross" && <span className="mr-1">⇄</span>}
            {tab.label}
          </button>
        ))}
        <button className="ml-auto p-2 text-muted-foreground hover:text-foreground transition-colors shrink-0">
          <Settings size={18} />
        </button>
      </div>

      {/* Card */}
      <div className="bg-card rounded-2xl shadow-sm border border-border p-1">
        {/* Sell Section */}
        <div className="bg-input rounded-xl p-4">
          <span className="text-xs text-muted-foreground">Sell</span>
          <div className="flex items-center justify-between mt-1">
            <input
              type="text"
              placeholder="0.0"
              value={sellAmount}
              onChange={(e) => setSellAmount(e.target.value)}
              className="bg-transparent text-2xl sm:text-3xl font-light text-foreground outline-none w-full min-w-0 placeholder:text-muted-foreground/50"
            />
            <TokenSelector token={sellToken} onSelect={setSellToken} tokens={TOKENS} />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-muted-foreground">$ 0.00</span>
            <div className="flex items-center gap-1 text-sm text-primary">
              <Wallet size={14} />
              <span>0.0001626947</span>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center -my-3 relative z-10">
          <button
            onClick={handleSwapTokens}
            className="bg-card border border-border rounded-xl p-2 hover:bg-input transition-colors text-primary"
          >
            <ArrowUpDown size={16} />
          </button>
        </div>

        {/* Buy Section */}
        <div className="bg-input rounded-xl p-4">
          <span className="text-xs text-muted-foreground">Buy</span>
          <div className="flex items-center justify-between mt-1">
            <input
              type="text"
              placeholder="0.0"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
              className="bg-transparent text-2xl sm:text-3xl font-light text-foreground outline-none w-full min-w-0 placeholder:text-muted-foreground/50"
            />
            <TokenSelector token={buyToken} onSelect={setBuyToken} tokens={TOKENS} />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-muted-foreground">$ 0.00</span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Wallet size={14} />
              <span>0.00</span>
            </div>
          </div>
        </div>

        {/* Enter Amount Button */}
        <Button
          className="w-full mt-1 h-14 rounded-xl text-base font-medium bg-swap-button text-primary-foreground/70 hover:bg-primary/30"
          disabled={!sellAmount}
        >
          Enter Amount
        </Button>
      </div>
    </div>
  );
};

export default SwapCard;
