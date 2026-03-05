import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import TokenIcon from "./TokenIcon";
import sushiNavLogo from "@/assets/sushi-token.jpg";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Trade", hasDropdown: true },
    { label: "Explore", hasDropdown: false },
    { label: "Positions", hasDropdown: true },
    { label: "Stake", hasDropdown: false },
    { label: "Validate", hasDropdown: false },
  ];

  return (
    <nav className="relative px-4 md:px-6 py-3.5 border-b border-border/30">
      <div className="flex items-center justify-between">
        {/* Logo + Nav */}
        <div className="flex items-center gap-7">
          <div className="flex items-center gap-2 cursor-pointer group">
            <img src={sushiNavLogo} alt="Sushi" className="w-7 h-7 rounded-full object-cover" />
            <span className="text-lg font-bold text-foreground tracking-tight">Sushi</span>
            <ChevronDown size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px] font-medium text-foreground/80 hover:text-foreground hover:bg-muted/60 transition-all"
              >
                {item.label}
                {item.hasDropdown && (
                  <ChevronDown size={13} className="text-muted-foreground" />
                )}
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
          {navItems.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-1 w-full text-left text-sm font-medium text-foreground hover:bg-muted/60 transition-colors py-2.5 px-2 rounded-lg"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
              {item.hasDropdown && (
                <ChevronDown size={13} className="text-muted-foreground" />
              )}
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
