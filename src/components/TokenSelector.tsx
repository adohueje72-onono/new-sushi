import { ChevronDown } from "lucide-react";
import TokenIcon from "./TokenIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Token {
  symbol: string;
  name: string;
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
        <button className="flex items-center gap-2 bg-card hover:bg-secondary/80 rounded-full py-1.5 pl-1.5 pr-2.5 border border-border/60 transition-colors shrink-0 shadow-sm">
          <TokenIcon symbol={token.symbol} size={24} />
          <span className="font-semibold text-sm text-foreground tracking-tight">{token.symbol}</span>
          <ChevronDown size={14} className="text-muted-foreground -ml-0.5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52 p-1">
        {tokens.map((t) => (
          <DropdownMenuItem
            key={t.symbol}
            onClick={() => onSelect(t)}
            className="flex items-center gap-2.5 cursor-pointer rounded-lg px-2.5 py-2"
          >
            <TokenIcon symbol={t.symbol} size={28} />
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-foreground">{t.symbol}</span>
              <span className="text-xs text-muted-foreground leading-tight">{t.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TokenSelector;
