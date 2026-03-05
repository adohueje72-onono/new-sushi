import { useState } from "react";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";

// Mock TVL data
const tvlData = Array.from({ length: 180 }, (_, i) => {
  const date = new Date(2025, 8, 6);
  date.setDate(date.getDate() + i);
  const base = 180 - i * 0.7;
  const noise = Math.random() * 10 - 5;
  return {
    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    v2: Math.max(20, base + noise) * 0.3,
    v3: Math.max(10, base * 0.4 + noise),
    blade: Math.max(2, base * 0.05 + Math.random() * 3),
  };
});

// Mock Volume data
const volumeData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2026, 1, 2);
  date.setDate(date.getDate() + i);
  return {
    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    v2: Math.random() * 3 + 1,
    v3: Math.random() * 5 + 2,
    blade: Math.random() * 2 + 0.5,
  };
});

// Mock pools data
const poolsData = [
  { pair: "WETH / USDC", version: "v3", tvl: "$12.4m", apr: "24.5%", volume24h: "$4.2m", fees24h: "$12.6k", isFarm: true },
  { pair: "WETH / USDT", version: "v3", tvl: "$8.7m", apr: "18.2%", volume24h: "$3.1m", fees24h: "$9.3k", isFarm: true },
  { pair: "WBTC / WETH", version: "v3", tvl: "$6.2m", apr: "12.8%", volume24h: "$2.5m", fees24h: "$7.5k", isFarm: false },
  { pair: "SUSHI / WETH", version: "v2", tvl: "$4.1m", apr: "32.1%", volume24h: "$1.8m", fees24h: "$5.4k", isFarm: true },
  { pair: "DAI / USDC", version: "v3", tvl: "$3.8m", apr: "8.4%", volume24h: "$1.2m", fees24h: "$3.6k", isFarm: false },
  { pair: "LINK / WETH", version: "v3", tvl: "$2.9m", apr: "15.7%", volume24h: "$980k", fees24h: "$2.9k", isFarm: false },
  { pair: "UNI / WETH", version: "v2", tvl: "$2.1m", apr: "11.3%", volume24h: "$720k", fees24h: "$2.2k", isFarm: false },
  { pair: "AAVE / WETH", version: "v3", tvl: "$1.8m", apr: "14.9%", volume24h: "$540k", fees24h: "$1.6k", isFarm: true },
];

const Explore = () => {
  const [activeTab, setActiveTab] = useState("pools");
  const tabs = ["Tokens", "Pools", "Blade Pools", "Smart Pools"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-[1400px] mx-auto px-4 md:px-6 py-6">
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* TVL Chart */}
          <div>
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="text-[13px] text-muted-foreground">Ethereum TVL</p>
                <p className="text-3xl font-bold text-foreground tracking-tight">$55.86m</p>
                <p className="text-[12px] text-muted-foreground mt-0.5">04 Mar 2026<br />01:00 AM</p>
              </div>
              <div className="flex flex-col items-end gap-0.5 text-[12px]">
                <span className="flex items-center gap-1.5"><span>v2</span><span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" /></span>
                <span className="flex items-center gap-1.5"><span>v3</span><span className="w-2.5 h-2.5 rounded-full bg-violet-500 inline-block" /></span>
                <span className="flex items-center gap-1.5"><span>blade</span><span className="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block" /></span>
              </div>
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tvlData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="tvlV2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(228, 76%, 60%)" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="hsl(228, 76%, 60%)" stopOpacity={0.2} />
                    </linearGradient>
                    <linearGradient id="tvlV3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} interval={29} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 12, border: "1px solid hsl(220,13%,91%)" }} />
                  <Area type="monotone" dataKey="v2" stackId="1" stroke="hsl(228, 76%, 60%)" fill="url(#tvlV2)" strokeWidth={1.5} />
                  <Area type="monotone" dataKey="v3" stackId="1" stroke="#8b5cf6" fill="url(#tvlV3)" strokeWidth={1.5} />
                  <Area type="monotone" dataKey="blade" stackId="1" stroke="#ec4899" fill="#ec4899" fillOpacity={0.3} strokeWidth={1.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Volume Chart */}
          <div>
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="text-[13px] text-muted-foreground">Ethereum Volume</p>
                <p className="text-3xl font-bold text-foreground tracking-tight">$111.42m</p>
                <p className="text-[12px] text-muted-foreground mt-0.5">Past month</p>
              </div>
              <div className="flex flex-col items-end gap-0.5 text-[12px]">
                <span className="flex items-center gap-1.5"><span>v2</span><span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" /></span>
                <span className="flex items-center gap-1.5"><span>v3</span><span className="w-2.5 h-2.5 rounded-full bg-violet-500 inline-block" /></span>
                <span className="flex items-center gap-1.5"><span>blade</span><span className="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block" /></span>
              </div>
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} interval={6} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 12, border: "1px solid hsl(220,13%,91%)" }} />
                  <Bar dataKey="v2" stackId="1" fill="hsl(228, 76%, 60%)" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="v3" stackId="1" fill="#8b5cf6" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="blade" stackId="1" fill="#ec4899" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase().replace(" ", "-"))}
              className={`px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-all ${
                activeTab === tab.toLowerCase().replace(" ", "-")
                  ? "bg-card shadow-[0_1px_3px_rgba(0,0,0,0.06)] text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search + Filters */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <div className="relative w-full max-w-[280px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-card border border-border/60 rounded-xl pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/30"
            />
          </div>
          <button className="flex items-center gap-1.5 bg-card border border-border/60 rounded-xl px-3 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors">
            <span className="text-muted-foreground">⊕</span> Type
          </button>
          <button className="flex items-center gap-1.5 bg-card border border-border/60 rounded-xl px-3 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors">
            🐮 Farms only
          </button>
          <button className="flex items-center gap-1.5 bg-card border border-border/60 rounded-xl px-3 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors">
            💡 Smart pool
          </button>
        </div>

        {/* Pools Table */}
        <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-border/40">
            <span className="font-semibold text-foreground">Pools</span>
            <span className="text-muted-foreground ml-1">(1498)</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30 text-muted-foreground text-[12px]">
                  <th className="text-left font-medium px-5 py-3">Pool</th>
                  <th className="text-left font-medium px-3 py-3">Version</th>
                  <th className="text-right font-medium px-3 py-3">TVL</th>
                  <th className="text-right font-medium px-3 py-3">APR</th>
                  <th className="text-right font-medium px-3 py-3">Volume (24h)</th>
                  <th className="text-right font-medium px-5 py-3">Fees (24h)</th>
                </tr>
              </thead>
              <tbody>
                {poolsData.map((pool, i) => (
                  <tr key={i} className="border-b border-border/20 hover:bg-muted/30 transition-colors cursor-pointer">
                    <td className="px-5 py-3.5 font-medium text-foreground flex items-center gap-2">
                      {pool.pair}
                      {pool.isFarm && <span className="text-[10px] bg-primary/10 text-primary rounded px-1.5 py-0.5 font-semibold">🌾 Farm</span>}
                    </td>
                    <td className="px-3 py-3.5">
                      <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                        pool.version === "v3" ? "bg-violet-100 text-violet-600" : "bg-primary/10 text-primary"
                      }`}>
                        {pool.version}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 text-right text-foreground">{pool.tvl}</td>
                    <td className="px-3 py-3.5 text-right text-green-600 font-medium">{pool.apr}</td>
                    <td className="px-3 py-3.5 text-right text-foreground">{pool.volume24h}</td>
                    <td className="px-5 py-3.5 text-right text-foreground">{pool.fees24h}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Explore;
