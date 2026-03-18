import { useState, useEffect, useCallback, useMemo } from "react";
import GlassCard from "./GlassCard";
import { Shield, Wifi, Zap, AlertTriangle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type PodStatus = "active" | "standby" | "maintenance";

interface PodData {
  userId: string;
  heartRate: number;
  neuralLoad: number;
}

const generatePodData = (index: number, status: PodStatus): PodData => {
  const seed = index * 7 + 13;
  return {
    userId: status === "maintenance" ? "—" : `USR-${(10000 + ((seed * 31) % 90000)).toString()}`,
    heartRate: status === "maintenance" ? 0 : 58 + (seed % 22),
    neuralLoad: status === "maintenance" ? 0 : 60 + (seed % 35),
  };
};

const PodGrid = ({ pods }: { pods: PodStatus[] }) => {
  const podData = useMemo(
    () => pods.map((s, i) => generatePodData(i, s)),
    [pods]
  );

  return (
    <TooltipProvider delayDuration={100}>
      <div className="grid gap-[2px]" style={{ gridTemplateColumns: "repeat(20, 1fr)" }}>
        {pods.map((status, i) => {
          const d = podData[i];
          return (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <div
                  className={`aspect-square rounded-[2px] transition-colors duration-700 cursor-pointer ${
                    status === "active"
                      ? "bg-primary/30 hover:bg-primary"
                      : status === "standby"
                        ? "bg-yellow-500/30 hover:bg-yellow-500/60"
                        : "bg-destructive/40 animate-pulse"
                  }`}
                />
              </TooltipTrigger>
              <TooltipContent side="top" className="glass-card p-0 border-border/50 text-[10px] font-mono min-w-[140px]">
                <div className="px-2.5 py-1.5 border-b border-border/30 flex items-center justify-between">
                  <span className="text-foreground font-semibold">Pod {i + 1}</span>
                  <span className={`uppercase text-[9px] px-1.5 py-0.5 rounded ${
                    status === "active" ? "bg-primary/20 text-primary" : status === "standby" ? "bg-yellow-500/20 text-yellow-400" : "bg-destructive/20 text-destructive"
                  }`}>{status}</span>
                </div>
                <div className="px-2.5 py-1.5 space-y-1">
                  <div className="flex justify-between"><span className="text-muted-foreground">User ID</span><span className="text-foreground">{d.userId}</span></div>
                  {status !== "maintenance" && (
                    <>
                      <div className="flex justify-between"><span className="text-muted-foreground">Heart Rate</span><span className="text-foreground">{d.heartRate} bpm</span></div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Neural Load</span>
                        <span className={d.neuralLoad > 85 ? "text-warning" : "neon-text-cyan"}>{d.neuralLoad}%</span>
                      </div>
                    </>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

const systemHealth = [
  { label: "Neural Sync", status: "Stable", icon: Wifi, ok: true },
  { label: "Oxygen Mix", status: "Optimal", icon: Shield, ok: true },
  { label: "AI Dream Engine", status: "Nominal", icon: Zap, ok: true },
  { label: "Cooling System", status: "Warning", icon: AlertTriangle, ok: false },
];

const initialAlerts = [
  { msg: "Pod Sector 7 — Thermal spike detected", time: "2m ago", severity: "high" },
  { msg: "Neural sync latency in Mumbai hub", time: "8m ago", severity: "medium" },
  { msg: "Scheduled maintenance — Neo-London", time: "1h ago", severity: "low" },
];

const newAlertPool = [
  { msg: "Memory buffer overflow — Tokyo cluster", severity: "high" },
  { msg: "Dream sequence anomaly — Pod 221", severity: "medium" },
  { msg: "Power fluctuation — Mars Prime grid", severity: "high" },
  { msg: "Biometric calibration drift — Singapore", severity: "medium" },
  { msg: "Coolant pressure drop — Sector 3", severity: "low" },
];

const cities = [
  { name: "Mumbai", pods: 120, active: 114 },
  { name: "Tokyo", pods: 100, active: 98 },
  { name: "Mars Prime", pods: 80, active: 72 },
  { name: "Neo-London", pods: 60, active: 54 },
  { name: "Singapore", pods: 40, active: 40 },
];

const initPods = (): PodStatus[] =>
  Array.from({ length: 400 }, (_, i) => {
    if (i < 378) return "active";
    if (i < 390) return "standby";
    return "maintenance";
  });

const OperationsControl = () => {
  const [pods, setPods] = useState<PodStatus[]>(initPods);
  const [alerts, setAlerts] = useState(initialAlerts);

  const mutatePods = useCallback(() => {
    setPods((prev) => {
      const next = [...prev];
      for (let k = 0; k < 3; k++) {
        const idx = Math.floor(Math.random() * 400);
        const r = Math.random();
        next[idx] = r < 0.8 ? "active" : r < 0.93 ? "standby" : "maintenance";
      }
      return next;
    });
  }, []);

  const cycleAlerts = useCallback(() => {
    const pick = newAlertPool[Math.floor(Math.random() * newAlertPool.length)];
    setAlerts((prev) => [{ ...pick, time: "Just now" }, ...prev.slice(0, 2)]);
  }, []);

  useEffect(() => {
    const podTimer = setInterval(mutatePods, 3000);
    const alertTimer = setInterval(cycleAlerts, 8000);
    return () => { clearInterval(podTimer); clearInterval(alertTimer); };
  }, [mutatePods, cycleAlerts]);

  const counts = pods.reduce(
    (acc, s) => { acc[s]++; return acc; },
    { active: 0, standby: 0, maintenance: 0 } as Record<PodStatus, number>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <GlassCard delay={0.55} className="lg:col-span-2 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="metric-label">Live Pod Grid — Sector Alpha</h3>
          <div className="flex items-center gap-4 text-[10px] font-mono">
            <span className="flex items-center gap-1"><span className="status-dot-active" /> {counts.active} Active</span>
            <span className="flex items-center gap-1"><span className="status-dot-standby" /> {counts.standby} Standby</span>
            <span className="flex items-center gap-1"><span className="status-dot-warning" /> {counts.maintenance} Maintenance</span>
          </div>
        </div>
        <PodGrid pods={pods} />
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
};

export default OperationsControl;
