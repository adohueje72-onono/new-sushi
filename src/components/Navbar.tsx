import { useState } from "react";
import { ChevronDown, Menu, X, ArrowLeftRight, CreditCard, Gift } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import TokenIcon from "./TokenIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import sushiNavLogo from "@/assets/sushi-token.jpg";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const simpleNavItems = [
    { label: "Explore", path: "/explore" },
    { label: "Stake", path: "/stake" },
    { label: "Validate" },
  ];

  return (
    <nav className="relative px-4 md:px-6 py-3.5 border-b border-border/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-7">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate("/")}>
            <img src={sushiNavLogo} alt="Sushi" className="w-7 h-7 rounded-full object-cover" />
            <span className="text-lg font-bold text-foreground tracking-tight">Sushi</span>
            <ChevronDown size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>

          <div className="hidden md:flex items-center gap-1">
            {/* Trade Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px] font-medium text-foreground/80 hover:text-foreground hover:bg-muted/60 transition-all">
                  Trade
                  <ChevronDown size={13} className="text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-44 p-1">
                <DropdownMenuItem className="flex items-center gap-2.5 cursor-pointer rounded-lg px-2.5 py-2" onClick={() => navigate("/")}>
                  <ArrowLeftRight size={15} />
                  <span className="text-sm font-medium">Swap</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2.5 cursor-pointer rounded-lg px-2.5 py-2">
                  <CreditCard size={15} />
                  <span className="text-sm font-medium">Buy Crypto</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Positions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px] font-medium text-foreground/80 hover:text-foreground hover:bg-muted/60 transition-all">
                  Positions
                  <ChevronDown size={13} className="text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-44 p-1">
                <DropdownMenuItem className="flex items-center gap-2.5 cursor-pointer rounded-lg px-2.5 py-2">
                  <span className="text-sm font-medium">Manage liquidity pool positions</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2.5 cursor-pointer rounded-lg px-2.5 py-2">
                  <Gift size={15} />
                  <span className="text-sm font-medium">Claim</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {simpleNavItems.map((item) => (
              <button
                key={item.label}
                onClick={() => item.path && navigate(item.path)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all ${
                  item.path && location.pathname === item.path
                    ? "text-foreground bg-muted/60"
                    : "text-foreground/80 hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button className="hidden sm:flex items-center gap-2 bg-card border border-border/60 rounded-full pl-2 pr-3.5 py-1.5 text-[13px] font-medium text-foreground hover:bg-muted/50 transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <TokenIcon symbol="ETH" size={20} />
            <span className="hidden md:inline">Ethereum</span>
          </button>
          <button className="flex items-center bg-card border border-border/60 rounded-full px-3.5 py-1.5 text-[13px] font-medium text-foreground hover:bg-muted/50 transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            Connect Wallet
          </button>
          <button
            className="md:hidden p-2 text-foreground rounded-lg hover:bg-muted/60 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-card border-b border-border shadow-lg z-50 px-4 py-2">
          <p className="text-[11px] font-medium text-muted-foreground px-2 pt-1 pb-1">Trade</p>
          <button className="flex items-center gap-2 w-full text-left text-sm font-medium text-foreground hover:bg-muted/60 transition-colors py-2 px-2 rounded-lg" onClick={() => setMobileOpen(false)}>
            <ArrowLeftRight size={15} /> Swap
          </button>
          <button className="flex items-center gap-2 w-full text-left text-sm font-medium text-foreground hover:bg-muted/60 transition-colors py-2 px-2 rounded-lg" onClick={() => setMobileOpen(false)}>
            <CreditCard size={15} /> Buy Crypto
          </button>
           <div className="border-t border-border/50 my-1" />
          <p className="text-[11px] font-medium text-muted-foreground px-2 pt-1 pb-1">Positions</p>
          <button className="flex items-center w-full text-left text-sm font-medium text-foreground hover:bg-muted/60 transition-colors py-2 px-2 rounded-lg" onClick={() => setMobileOpen(false)}>
            Manage liquidity pool positions
          </button>
          <button className="flex items-center gap-2 w-full text-left text-sm font-medium text-foreground hover:bg-muted/60 transition-colors py-2 px-2 rounded-lg" onClick={() => setMobileOpen(false)}>
            <Gift size={15} /> Claim
          </button>
          <div className="border-t border-border/50 my-1" />
          {simpleNavItems.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-1 w-full text-left text-sm font-medium text-foreground hover:bg-muted/60 transition-colors py-2.5 px-2 rounded-lg"
              onClick={() => { item.path && navigate(item.path); setMobileOpen(false); }}
            >
              {item.label}
            </button>
          ))}
          <button className="sm:hidden flex items-center gap-2 text-sm font-medium text-foreground py-2.5 px-2 rounded-lg w-full hover:bg-muted/60">
            <TokenIcon symbol="ETH" size={18} /> Ethereum
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
