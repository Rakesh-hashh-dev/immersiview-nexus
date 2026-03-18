import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { IndianRupee, Users, Clock, Cpu, Star } from "lucide-react";

const baseMetrics = [
  { label: "Total Revenue", baseValue: 4200000000, format: "currency", change: "+12.4%", icon: IndianRupee, positive: true },
  { label: "Active Users", baseValue: 142804, format: "number", change: "Live", icon: Users, live: true },
  { label: "Avg Session", baseValue: 522, format: "time", change: "Neural: High", icon: Clock },
  { label: "Pod Utilization", baseValue: 94.2, format: "percent", change: "Capacity Warning", icon: Cpu, warning: true },
  { label: "CSAT Score", baseValue: 4.92, format: "score", change: "Global Avg", icon: Star },
];

const formatValue = (value: number, format: string) => {
  switch (format) {
    case "currency": return `₹${(value / 1e9).toFixed(1)}B`;
    case "number": return value.toLocaleString("en-IN");
    case "time": {
      const h = Math.floor(value / 60);
      const m = value % 60;
      return `${h}h ${m}m`;
    }
    case "percent": return `${value.toFixed(1)}%`;
    case "score": return `${value.toFixed(2)}/5.0`;
    default: return String(value);
  }
};

const HeroMetrics = () => {
  const [values, setValues] = useState(baseMetrics.map((m) => m.baseValue));

  const tick = useCallback(() => {
    setValues((prev) =>
      prev.map((v, i) => {
        switch (i) {
          case 0: return v + Math.floor(Math.random() * 500000);
          case 1: return v + Math.floor(Math.random() * 5) - 1;
          case 2: return v + (Math.random() > 0.7 ? 1 : 0);
          case 3: return Math.min(99.9, Math.max(90, v + (Math.random() - 0.48) * 0.1));
          case 4: return Math.min(5, Math.max(4.8, v + (Math.random() - 0.5) * 0.01));
          default: return v;
        }
      })
    );
  }, []);

  useEffect(() => {
    const id = setInterval(tick, 2000);
    return () => clearInterval(id);
  }, [tick]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className="glass-card mb-6"
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        {baseMetrics.map((m, i) => (
          <div key={m.label} className="flex items-center gap-4">
            {i > 0 && <div className="hidden lg:block w-px h-12 bg-border opacity-30" />}
            <div className="flex items-center gap-3 min-w-[160px]">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                <m.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="metric-label">{m.label}</p>
                <p className="text-xl font-mono font-semibold tabular-nums text-foreground tracking-tight transition-all duration-500">
                  {formatValue(values[i], m.format)}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {m.live && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                  )}
                  {m.warning && <span className="status-dot-warning" />}
                  {m.positive && <span className="text-neon-green text-[10px] font-mono">{m.change}</span>}
                  {!m.positive && !m.warning && !m.live && (
                    <span className="text-muted-foreground text-[10px] font-mono">{m.change}</span>
                  )}
                  {m.warning && <span className="text-warning text-[10px] font-mono">{m.change}</span>}
                  {m.live && <span className="neon-text-cyan text-[10px] font-mono">{m.change}</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default HeroMetrics;
