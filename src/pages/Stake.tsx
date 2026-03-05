import { useState } from "react";
import { ExternalLink, HelpCircle, ArrowDown, Wallet, TrendingUp } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import Navbar from "@/components/Navbar";
import TokenIcon from "@/components/TokenIcon";
import ConnectWalletDialog from "@/components/ConnectWalletDialog";

// Mock APR chart data
const aprData = Array.from({ length: 365 }, (_, i) => {
  const date = new Date(2025, 2, 5);
  date.setDate(date.getDate() + i);
  const base = 5.5 - i * 0.003;
  const noise = (Math.random() - 0.5) * 0.8;
  return {
    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    apr: Math.max(2, base + noise),
  };
});

const Stake = () => {
  const [manageTab, setManageTab] = useState<"stake" | "unstake">("stake");
  const [amount, setAmount] = useState("");
  const [aprTab, setAprTab] = useState("APR");
  const [aprRange, setAprRange] = useState("1Y");
  const [walletOpen, setWalletOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-[900px] mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <TokenIcon symbol="SUSHI" size={48} />
            <h1 className="text-3xl sm:text-4xl font-bold">
              <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">Sushi</span>
              <span className="text-muted-foreground font-light ml-1">Bar</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed mb-5">
            For every swap on Sushi, a portion of the swap fee is locked into the liquidity pool awaiting to be served to xSUSHI holders.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm mb-5">
            <div>
              <span className="font-semibold text-foreground">APY (1m)</span>{" "}
              <span className="underline text-foreground">&lt;0.01%</span>
            </div>
            <div>
              <span className="font-semibold text-foreground">Network</span>{" "}
              <span className="text-foreground">Ethereum</span>
            </div>
            <div>
              <span className="font-semibold text-foreground">XSUSHI</span>{" "}
              <a href="https://etherscan.io/token/0x8798249c2e607446efb7ad49ec89dd1865ff4272" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                0×8798...4272 <ExternalLink size={12} />
              </a>
            </div>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            <ExternalLink size={15} />
            Learn More
          </a>
        </div>

        {/* Voting Power Card */}
        <div className="bg-card rounded-2xl border border-border/50 p-5 sm:p-6 mb-6">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
            Your Voting Power <HelpCircle size={14} />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-foreground mb-1">0 SUSHI POWAH</p>
          <a href="https://snapshot.org/#/s:sushigov.eth/delegates" target="_blank" rel="noopener noreferrer" className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1">
            Delegate <ExternalLink size={12} />
          </a>
        </div>

        {/* Manage + Balance Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Manage Card */}
          <div className="md:col-span-3 bg-card rounded-2xl border border-border/50 p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-foreground mb-1">Manage</h2>
            <p className="text-sm text-muted-foreground mb-5">Manage your position in the Sushi Bar.</p>

            {/* Stake / Unstake Toggle */}
            <div className="flex bg-muted/50 rounded-xl p-1 mb-5">
              <button
                onClick={() => setManageTab("stake")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  manageTab === "stake"
                    ? "bg-card shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Stake
              </button>
              <button
                onClick={() => setManageTab("unstake")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  manageTab === "unstake"
                    ? "bg-card shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Unstake
              </button>
            </div>

            <div className="border-t border-border/40 pt-5">
              <h3 className="text-base font-semibold text-foreground mb-2">
                {manageTab === "stake" ? "Stake" : "Unstake"}
              </h3>

              {/* Conversion rate */}
              <div className="flex items-center gap-1.5 text-sm text-primary mb-4">
                <TrendingUp size={14} />
                <span>
                  {manageTab === "stake"
                    ? "1 SUSHI ($0.21) = 0.6349 XSUSHI ($0.21)"
                    : "1 XSUSHI ($0.33) = 1.5751 SUSHI ($0.33)"}
                </span>
              </div>

              {/* Input token */}
              <div className="bg-muted/50 rounded-xl p-4 mb-1">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0.0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-transparent text-2xl font-normal text-foreground outline-none w-full min-w-0 placeholder:text-muted-foreground/40"
                  />
                  <div className="flex items-center gap-2 shrink-0">
                    <TokenIcon symbol="SUSHI" size={24} />
                    <span className="font-semibold text-sm text-foreground">
                      {manageTab === "stake" ? "SUSHI" : "XSUSHI"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                  <span>$ 0.00</span>
                  <div className="flex items-center gap-1 text-primary">
                    <Wallet size={13} />
                    <span>0.00</span>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center -my-1.5 relative z-10">
                <div className="text-muted-foreground">
                  <ArrowDown size={16} />
                </div>
              </div>

              {/* Output token */}
              <div className="bg-muted/50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-normal text-muted-foreground/40">0.0</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <TokenIcon symbol="SUSHI" size={24} />
                    <span className="font-semibold text-sm text-foreground">
                      {manageTab === "stake" ? "XSUSHI" : "SUSHI"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                  <span>$ 0.00</span>
                  <div className="flex items-center gap-1">
                    <Wallet size={13} />
                    <span>0.00</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setWalletOpen(true)}
                className="w-full h-12 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Connect Wallet
              </button>
              <ConnectWalletDialog open={walletOpen} onOpenChange={setWalletOpen} />
            </div>
          </div>

          {/* Your Balance Card */}
          <div className="md:col-span-2 bg-card rounded-2xl border border-border/50 p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-foreground mb-1">Your Balance</h2>
            <p className="text-muted-foreground text-sm mb-5">$0.00</p>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Staked</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TokenIcon symbol="SUSHI" size={22} />
                    <span className="text-sm font-medium text-foreground">XSUSHI</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-foreground">0</span>
                    <span className="text-sm text-muted-foreground ml-1.5">$0.00</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-2">Available</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TokenIcon symbol="SUSHI" size={22} />
                    <span className="text-sm font-medium text-foreground">SUSHI</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-foreground">0</span>
                    <span className="text-sm text-muted-foreground ml-1.5">$0.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* APR Chart Section */}
            <div className="border-t border-border/40 pt-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex bg-muted/50 rounded-lg p-0.5">
                  {["APR", "Total Supply"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setAprTab(tab)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                        aprTab === tab
                          ? "bg-card shadow-sm text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-0.5">
                  {["1D", "1W", "1M", "1Y", "All"].map((range) => (
                    <button
                      key={range}
                      onClick={() => setAprRange(range)}
                      className={`px-2 py-1 rounded-md text-xs font-medium transition-all ${
                        aprRange === range
                          ? "bg-card shadow-sm text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-2">
                <p className="text-xl font-bold text-foreground">4.82%</p>
                <p className="text-xs text-muted-foreground">05 Mar 2026 01:00</p>
              </div>

              <div className="h-[120px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={aprData.slice(-90)} margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>
                    <XAxis dataKey="date" hide />
                    <YAxis hide domain={["auto", "auto"]} />
                    <Tooltip
                      contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(220,13%,91%)" }}
                      formatter={(value: number) => [`${value.toFixed(2)}%`, "APR"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="apr"
                      stroke="hsl(228, 76%, 60%)"
                      strokeWidth={1.5}
                      dot={false}
                      activeDot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Stake;
