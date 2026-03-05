import { ChevronDown } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-2xl">🍣</span>
          <span className="text-xl font-bold text-foreground">Sushi</span>
          <ChevronDown size={16} className="text-muted-foreground" />
        </div>
        <div className="hidden md:flex items-center gap-6">
          {["Trade", "Explore", "Positions", "Stake"].map((item) => (
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
          <button className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Validate
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
          <span>⟠</span>
          Ethereum
        </button>
        <button className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
          <span>🟡</span>
          0xf977...dB08
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
