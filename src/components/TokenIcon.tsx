interface TokenIconProps {
  symbol: string;
  size?: number;
}

const TOKEN_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  ETH: { bg: "#627EEA", text: "#fff", label: "Ξ" },
  SUSHI: { bg: "#D65A8A", text: "#fff", label: "🍣" },
  USDC: { bg: "#2775CA", text: "#fff", label: "$" },
  DAI: { bg: "#F5AC37", text: "#fff", label: "◆" },
  WBTC: { bg: "#F09242", text: "#fff", label: "₿" },
  USDT: { bg: "#26A17B", text: "#fff", label: "₮" },
};

const TokenIcon = ({ symbol, size = 28 }: TokenIconProps) => {
  const style = TOKEN_STYLES[symbol] || { bg: "#8B8B8B", text: "#fff", label: "?" };

  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0 font-bold select-none"
      style={{
        width: size,
        height: size,
        backgroundColor: style.bg,
        color: style.text,
        fontSize: size * 0.45,
        lineHeight: 1,
      }}
    >
      {style.label}
    </div>
  );
};

export default TokenIcon;
