import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Token {
  symbol: string;
  name: string;
  icon: string;
  color: string;
}

interface TokenSelectorProps {
  token: Token;
  onSelect: (token: Token) => void;
  tokens: Token[];
}

const TokenSelector = ({ token, onSelect, tokens }: TokenSelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 bg-card hover:bg-secondary rounded-full py-1.5 px-3 border border-border transition-colors shrink-0">
          <span className="text-lg">{token.icon}</span>
          <span className="font-semibold text-foreground">{token.symbol}</span>
          <ChevronDown size={16} className="text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {tokens.map((t) => (
          <DropdownMenuItem
            key={t.symbol}
            onClick={() => onSelect(t)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-lg">{t.icon}</span>
            <div>
              <div className="font-medium text-foreground">{t.symbol}</div>
              <div className="text-xs text-muted-foreground">{t.name}</div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TokenSelector;
