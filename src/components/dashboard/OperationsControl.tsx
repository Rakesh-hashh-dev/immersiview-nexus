import { useMemo } from "react";
import GlassCard from "./GlassCard";
import { Shield, Wifi, Zap, AlertTriangle } from "lucide-react";

const PodGrid = () => {
  const pods = useMemo(() => {
    return Array.from({ length: 400 }, (_, i) => {
      if (i < 378) return "active";
      if (i < 390) return "standby";
      return "maintenance";
    });
  }, []);

  return (
    <div className="grid grid-cols-20 gap-[2px]" style={{ gridTemplateColumns: "repeat(20, 1fr)" }}>
      {pods.map((status, i) => (
        <div
          key={i}
          className={`aspect-square rounded-[2px] transition-colors ${
            status === "active"
              ? "bg-primary/30 hover:bg-primary"
              : status === "standby"
                ? "bg-yellow-500/30"
                : "bg-destructive/40 animate-pulse"
          }`}
          title={`Pod ${i + 1}: ${status}`}
        />
      ))}
    </div>
  );
};

const systemHealth = [
  { label: "Neural Sync", status: "Stable", icon: Wifi, ok: true },
  { label: "Oxygen Mix", status: "Optimal", icon: Shield, ok: true },
  { label: "AI Dream Engine", status: "Nominal", icon: Zap, ok: true },
  { label: "Cooling System", status: "Warning", icon: AlertTriangle, ok: false },
];

const alerts = [
  { msg: "Pod Sector 7 — Thermal spike detected", time: "2m ago", severity: "high" },
  { msg: "Neural sync latency in Mumbai hub", time: "8m ago", severity: "medium" },
  { msg: "Scheduled maintenance — Neo-London", time: "1h ago", severity: "low" },
];

const cities = [
  { name: "Mumbai", pods: 120, active: 114 },
  { name: "Tokyo", pods: 100, active: 98 },
  { name: "Mars Prime", pods: 80, active: 72 },
  { name: "Neo-London", pods: 60, active: 54 },
  { name: "Singapore", pods: 40, active: 40 },
];

const OperationsControl = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <GlassCard delay={0.55} className="lg:col-span-2 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="metric-label">Live Pod Grid — Sector Alpha</h3>
        <div className="flex items-center gap-4 text-[10px] font-mono">
          <span className="flex items-center gap-1"><span className="status-dot-active" /> 378 Active</span>
          <span className="flex items-center gap-1"><span className="status-dot-standby" /> 12 Standby</span>
          <span className="flex items-center gap-1"><span className="status-dot-warning" /> 10 Maintenance</span>
        </div>
      </div>
      <PodGrid />
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 border-t border-border/30">
        {cities.map((c) => (
          <div key={c.name} className="text-center">
            <p className="text-[10px] text-muted-foreground">{c.name}</p>
            <p className="text-sm font-mono tabular-nums text-foreground">{c.active}/{c.pods}</p>
          </div>
        ))}
      </div>
    </GlassCard>

    <div className="flex flex-col gap-4">
      <GlassCard delay={0.6} className="flex flex-col gap-3">
        <h3 className="metric-label">System Health</h3>
        <div className="space-y-2.5">
          {systemHealth.map((s) => (
            <div key={s.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <s.icon className={`w-3.5 h-3.5 ${s.ok ? "text-primary" : "text-warning"}`} />
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
              <span className={`text-xs font-mono ${s.ok ? "neon-text-cyan" : "text-warning"}`}>{s.status}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard delay={0.65} className="flex flex-col gap-3">
        <h3 className="metric-label">Active Alerts</h3>
        <div className="space-y-2.5">
          {alerts.map((a, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className={`mt-1 ${a.severity === "high" ? "status-dot-warning" : a.severity === "medium" ? "status-dot-standby" : "status-dot-active"}`} />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-foreground truncate">{a.msg}</p>
                <p className="text-[10px] text-muted-foreground">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  </div>
);

export default OperationsControl;
