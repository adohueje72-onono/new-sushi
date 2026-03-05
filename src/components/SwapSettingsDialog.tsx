import { useState } from "react";
import { X, Info } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface SwapSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SLIPPAGE_PRESETS = ["0.1", "0.5", "1.0"];

const SwapSettingsDialog = ({ open, onOpenChange }: SwapSettingsDialogProps) => {
  const [autoSlippage, setAutoSlippage] = useState(false);
  const [slippage, setSlippage] = useState("0.5");
  const [customSlippage, setCustomSlippage] = useState("0.5");

  const activeSlippage = autoSlippage ? "0.5" : slippage;

  const handlePresetClick = (value: string) => {
    setSlippage(value);
    setCustomSlippage(value);
  };

  const handleCustomChange = (value: string) => {
    // Only allow valid decimal numbers
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setCustomSlippage(value);
      if (value && parseFloat(value) > 0) {
        setSlippage(value);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-foreground">Settings</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Adjust to your personal preferences.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-4">
          {/* Automatic Slippage Tolerance */}
          <div className="bg-muted/40 rounded-xl p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Automatic Slippage Tolerance</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Turn off automatic slippage tolerance to adjust the value.
                </p>
              </div>
              <Switch
                checked={autoSlippage}
                onCheckedChange={setAutoSlippage}
                className="shrink-0 mt-0.5"
              />
            </div>
          </div>

          {/* Slippage */}
          <div className="border-t border-border/40 pt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-foreground">Slippage</span>
                <Info size={13} className="text-muted-foreground/60" />
              </div>
              <span className="text-sm font-medium text-foreground">{activeSlippage}%</span>
            </div>

            <div className="flex items-center bg-muted/40 rounded-xl overflow-hidden border border-border/40">
              {SLIPPAGE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  onClick={() => handlePresetClick(preset)}
                  disabled={autoSlippage}
                  className={`flex-shrink-0 px-4 py-2.5 text-sm font-medium transition-colors ${
                    !autoSlippage && slippage === preset
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  } ${autoSlippage ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {preset}%
                </button>
              ))}
              <div className="flex items-center flex-1 px-3">
                <input
                  type="text"
                  inputMode="decimal"
                  value={customSlippage}
                  onChange={(e) => handleCustomChange(e.target.value)}
                  disabled={autoSlippage}
                  className={`bg-transparent text-sm font-medium text-foreground outline-none w-full placeholder:text-muted-foreground/50 ${
                    autoSlippage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  placeholder="0.5"
                />
                <span className="text-sm text-muted-foreground ml-1">%</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SwapSettingsDialog;
