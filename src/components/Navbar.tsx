import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = ["Trade", "Explore", "Positions", "Stake", "Validate"];

  return (
    <nav className="relative px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-2xl">🍣</span>
          <span className="text-xl font-bold text-foreground">Sushi</span>
          <ChevronDown size={16} className="text-muted-foreground" />
        </div>

        <div className="hidden md:flex items-center gap-6 ml-8">
          {navItems.map((item) => (
            <button
              key={item}
              className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {item}
              {["Trade", "Positions"].includes(item) && (
                <ChevronDown size={14} className="text-muted-foreground" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button className="hidden sm:flex items-center gap-2 bg-card border border-border rounded-full px-3 md:px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
            <span className="text-primary">⟠</span>
            <span className="hidden md:inline">Ethereum</span>
          </button>
          <button className="flex items-center gap-2 bg-card border border-border rounded-full px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-foreground hover:bg-secondary transition-colors">
            Connect Wallet
          </button>
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-card border-b border-border shadow-sm z-50 px-4 py-3 flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item}
              className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setMobileOpen(false)}
            >
              {item}
              {["Trade", "Positions"].includes(item) && (
                <ChevronDown size={14} className="text-muted-foreground" />
              )}
            </button>
          ))}
          <button className="sm:hidden flex items-center gap-2 text-sm font-medium text-foreground py-2">
            <span>⟠</span> Ethereum
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
