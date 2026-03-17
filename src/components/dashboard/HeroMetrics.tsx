import { motion } from "framer-motion";
import { IndianRupee, Users, Clock, Cpu, Star } from "lucide-react";

const metrics = [
  { label: "Total Revenue", value: "₹4.2B", change: "+12.4%", icon: IndianRupee, positive: true },
  { label: "Active Users", value: "142,804", change: "Live", icon: Users, live: true },
  { label: "Avg Session", value: "8h 42m", change: "Neural: High", icon: Clock },
  { label: "Pod Utilization", value: "94.2%", change: "Capacity Warning", icon: Cpu, warning: true },
  { label: "CSAT Score", value: "4.92/5.0", change: "Global Avg", icon: Star },
];

const HeroMetrics = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
    className="glass-card mb-6"
  >
    <div className="flex items-center justify-between flex-wrap gap-4">
      {metrics.map((m, i) => (
        <div key={m.label} className="flex items-center gap-4">
          {i > 0 && <div className="hidden lg:block w-px h-12 bg-border opacity-30" />}
          <div className="flex items-center gap-3 min-w-[160px]">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
              <m.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="metric-label">{m.label}</p>
              <p className="text-xl font-mono font-semibold tabular-nums text-foreground tracking-tight">
                {m.value}
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

export default HeroMetrics;
