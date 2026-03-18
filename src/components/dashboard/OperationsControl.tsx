import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "./GlassCard";
import { Shield, Wifi, Zap, AlertTriangle, X, Activity, Brain, Thermometer, Clock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

type PodStatus = "active" | "standby" | "maintenance";

interface PodData {
  userId: string;
  heartRate: number;
  neuralLoad: number;
}

interface TimelineEvent {
  time: string;
  label: string;
  type: "start" | "experience" | "biometric" | "system" | "end";
}

const generatePodData = (index: number, status: PodStatus): PodData => {
  const seed = index * 7 + 13;
  return {
    userId: status === "maintenance" ? "—" : `USR-${(10000 + ((seed * 31) % 90000)).toString()}`,
    heartRate: status === "maintenance" ? 0 : 58 + (seed % 22),
    neuralLoad: status === "maintenance" ? 0 : 60 + (seed % 35),
  };
};

const experiencePool = [
  "Deep Ocean Exploration", "Mars Colony Tour", "Neural Meditation",
  "Zero-G Concert", "Memory Lane Replay", "Quantum Dream State",
  "Rainforest Immersion", "Aurora Borealis Flight", "Ancient Rome Walk",
];

const generateTimeline = (index: number, status: PodStatus): TimelineEvent[] => {
  if (status === "maintenance") {
    return [
      { time: "14:00", label: "Maintenance cycle initiated", type: "system" },
      { time: "14:02", label: "Neural calibration reset", type: "system" },
      { time: "14:05", label: "Coolant flush in progress", type: "system" },
    ];
  }
  if (status === "standby") {
    return [
      { time: "13:45", label: "Previous session ended", type: "end" },
      { time: "13:46", label: "Pod sanitization complete", type: "system" },
      { time: "13:50", label: "Awaiting next user", type: "system" },
    ];
  }
  const seed = index * 7 + 13;
  const exp = experiencePool[seed % experiencePool.length];
  const startH = 6 + (seed % 12);
  return [
    { time: `${String(startH).padStart(2, "0")}:${String(seed % 60).padStart(2, "0")}`, label: "User entered pod — biometric scan OK", type: "start" },
    { time: `${String(startH).padStart(2, "0")}:${String((seed + 3) % 60).padStart(2, "0")}`, label: "Neural sync established at 99.2%", type: "system" },
    { time: `${String(startH).padStart(2, "0")}:${String((seed + 5) % 60).padStart(2, "0")}`, label: `Experience loaded: ${exp}`, type: "experience" },
    { time: `${String(startH + 1).padStart(2, "0")}:${String((seed + 12) % 60).padStart(2, "0")}`, label: "Heart rate spike — auto-adjusted stimulus", type: "biometric" },
    { time: `${String(startH + 2).padStart(2, "0")}:${String((seed + 30) % 60).padStart(2, "0")}`, label: "REM phase detected — deepening immersion", type: "biometric" },
    { time: `${String(startH + 4).padStart(2, "0")}:${String((seed + 45) % 60).padStart(2, "0")}`, label: "Experience milestone reached (75%)", type: "experience" },
    { time: `${String(startH + 6).padStart(2, "0")}:${String((seed + 50) % 60).padStart(2, "0")}`, label: "Session ongoing — all vitals nominal", type: "system" },
  ];
};

const typeIcon = (type: TimelineEvent["type"]) => {
  switch (type) {
    case "start": return <Clock className="w-3 h-3 text-primary" />;
    case "experience": return <Brain className="w-3 h-3 text-accent" />;
    case "biometric": return <Activity className="w-3 h-3 text-neon-pink" />;
    case "system": return <Zap className="w-3 h-3 text-muted-foreground" />;
    case "end": return <Clock className="w-3 h-3 text-warning" />;
  }
};

const PodDetailPanel = ({
  podIndex,
  status,
  data,
  onClose,
}: {
  podIndex: number;
  status: PodStatus;
  data: PodData;
  onClose: () => void;
}) => {
  const timeline = useMemo(() => generateTimeline(podIndex, status), [podIndex, status]);
  const seed = podIndex * 7 + 13;
  const temp = status === "maintenance" ? "—" : `${36.2 + (seed % 8) * 0.1}°C`;
  const sessionDur = status === "active" ? `${1 + (seed % 8)}h ${seed % 55}m` : "—";
  const experience = status === "active" ? experiencePool[seed % experiencePool.length] : "—";

  const heartRateHistory = status === "active" ? [
    { time: "T-6", bpm: 65 + (seed % 10) },
    { time: "T-5", bpm: 70 + (seed % 8) },
    { time: "T-4", bpm: data.heartRate + 5 },
    { time: "T-3", bpm: data.heartRate - 3 },
    { time: "T-2", bpm: data.heartRate + 8 },
    { time: "T-1", bpm: data.heartRate - 2 },
    { time: "Now", bpm: data.heartRate },
  ] : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className="glass-card p-0 overflow-hidden mt-3"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${
            status === "active" ? "bg-primary neon-glow-cyan" : status === "standby" ? "bg-yellow-500" : "bg-destructive animate-pulse"
          }`} />
          <div>
            <span className="text-sm font-mono font-semibold text-foreground">Pod {podIndex + 1}</span>
            <span className={`ml-2 uppercase text-[9px] px-1.5 py-0.5 rounded font-mono ${
              status === "active" ? "bg-primary/20 text-primary" : status === "standby" ? "bg-yellow-500/20 text-yellow-400" : "bg-destructive/20 text-destructive"
            }`}>{status}</span>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.5fr] divide-y sm:divide-y-0 sm:divide-x divide-border/30">
        {/* Stats */}
        <div className="p-4 space-y-3">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono mb-2">Session Data</p>
          {[
            { label: "User ID", value: data.userId },
            { label: "Heart Rate", value: status !== "maintenance" ? `${data.heartRate} bpm` : "—", icon: <Activity className="w-3 h-3 text-neon-pink" /> },
            { label: "Neural Load", value: status !== "maintenance" ? `${data.neuralLoad}%` : "—", icon: <Brain className="w-3 h-3 text-primary" />, highlight: data.neuralLoad > 85 },
            { label: "Core Temp", value: temp, icon: <Thermometer className="w-3 h-3 text-warning" /> },
            { label: "Duration", value: sessionDur, icon: <Clock className="w-3 h-3 text-muted-foreground" /> },
            { label: "Experience", value: experience },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-muted-foreground flex items-center gap-1.5">
                {row.icon}
                {row.label}
              </span>
              <span className={row.highlight ? "text-warning" : "text-foreground"}>{row.value}</span>
            </div>
          ))}
          {status === "active" && (
            <div className="mt-3 pt-3 border-t border-border/30">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono mb-2">Heart Rate Trend</p>
              <ResponsiveContainer width="100%" height={80}>
                <LineChart data={heartRateHistory}>
                  <XAxis dataKey="time" stroke="#444" tick={{ fontSize: 9 }} />
                  <YAxis domain={["auto", "auto"]} stroke="#444" tick={{ fontSize: 9 }} width={28} />
                  <RechartsTooltip contentStyle={{ background: "#0f0f0f", border: "1px solid #333", fontSize: 10 }} />
                  <Line type="monotone" dataKey="bpm" stroke="#f43f5e" strokeWidth={1.5} dot={{ fill: "#f43f5e", r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="p-4">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono mb-3">Session Timeline</p>
          <div className="relative space-y-0">
            {timeline.map((evt, i) => (
              <div key={i} className="flex items-start gap-3 relative pb-3 last:pb-0">
                {/* Vertical line */}
                {i < timeline.length - 1 && (
                  <div className="absolute left-[5.5px] top-4 w-px h-[calc(100%-4px)] bg-border/40" />
                )}
                <div className="mt-0.5 flex-shrink-0">{typeIcon(evt.type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-foreground leading-tight">{evt.label}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{evt.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PodGrid = ({ pods, onPodClick }: { pods: PodStatus[]; onPodClick: (index: number) => void }) => {
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
                  onClick={() => onPodClick(i)}
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
  const [selectedPod, setSelectedPod] = useState<number | null>(null);
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
        <PodGrid pods={pods} onPodClick={(i) => setSelectedPod(selectedPod === i ? null : i)} />
        <AnimatePresence>
          {selectedPod !== null && (
            <PodDetailPanel
              podIndex={selectedPod}
              status={pods[selectedPod]}
              data={generatePodData(selectedPod, pods[selectedPod])}
              onClose={() => setSelectedPod(null)}
            />
          )}
        </AnimatePresence>
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
