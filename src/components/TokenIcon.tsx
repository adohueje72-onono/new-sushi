import sushiLogo from "@/assets/sushi-token.jpg";
import ethLogo from "@/assets/eth-logo.png";

interface TokenIconProps {
  symbol: string;
  size?: number;
}

const IMAGE_TOKENS: Record<string, { src: string; alt: string; bg?: string }> = {
  SUSHI: { src: sushiLogo, alt: "SUSHI" },
  ETH: { src: ethLogo, alt: "ETH", bg: "#627EEA" },
};

const TOKEN_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  USDC: { bg: "#2775CA", text: "#fff", label: "$" },
  DAI: { bg: "#F5AC37", text: "#fff", label: "◆" },
  WBTC: { bg: "#F09242", text: "#fff", label: "₿" },
  USDT: { bg: "#26A17B", text: "#fff", label: "₮" },
};

const TokenIcon = ({ symbol, size = 28 }: TokenIconProps) => {
  const imageToken = IMAGE_TOKENS[symbol];
  if (imageToken) {
    return (
      <div
        className="rounded-full shrink-0 flex items-center justify-center overflow-hidden"
        style={{
          width: size,
          height: size,
          backgroundColor: imageToken.bg || "transparent",
        }}
      >
        <img
          src={imageToken.src}
          alt={imageToken.alt}
          className="object-contain"
          style={{ width: size * 0.7, height: size * 0.7 }}
        />
      </div>
    );
  }

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
