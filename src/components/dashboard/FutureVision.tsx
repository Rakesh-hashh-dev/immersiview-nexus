import GlassCard from "./GlassCard";
import { Rocket, Globe, Handshake } from "lucide-react";

const features = [
  { name: "Memory Retention Tech", status: "Beta", q: "Q3 2050", color: "neon-text-cyan" },
  { name: "Inter-Pod Telepathy", status: "Regulatory", q: "Q4 2050", color: "neon-text-purple" },
  { name: "AI Dream Builder v2", status: "In Development", q: "Q1 2051", color: "neon-text-pink" },
  { name: "Custom World SDK", status: "Planning", q: "Q2 2051", color: "neon-text-cyan" },
];

const expansion = [
  { city: "Mumbai Phase II", status: "Deploying" },
  { city: "Mars Prime", status: "Operational" },
  { city: "Neo-London", status: "Construction" },
  { city: "Sydney Hub", status: "Planning" },
];

const partners = [
  { name: "NeuroLink Corp", type: "VR Hardware" },
  { name: "ZenithWell", type: "Wellness Industry" },
  { name: "DreamWorks XR", type: "Entertainment" },
  { name: "CosmoPharm", type: "Therapeutic VR" },
];

const FutureVision = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <GlassCard delay={0.7} className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Rocket className="w-4 h-4 text-primary" />
        <h3 className="metric-label">Upcoming Features</h3>
      </div>
      <div className="space-y-3">
        {features.map((f) => (
          <div key={f.name} className="flex items-center justify-between">
            <div>
              <p className="text-xs text-foreground">{f.name}</p>
              <p className="text-[10px] text-muted-foreground">{f.q}</p>
            </div>
            <span className={`text-[10px] font-mono ${f.color}`}>{f.status}</span>
          </div>
        ))}
      </div>
    </GlassCard>

    <GlassCard delay={0.75} className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Globe className="w-4 h-4 text-secondary" />
        <h3 className="metric-label">Expansion Roadmap</h3>
      </div>
      <div className="space-y-3">
        {expansion.map((e) => (
          <div key={e.city} className="flex items-center justify-between">
            <span className="text-xs text-foreground">{e.city}</span>
            <span className={`text-[10px] font-mono ${
              e.status === "Operational" ? "neon-text-cyan"
                : e.status === "Deploying" ? "neon-text-purple"
                  : "text-muted-foreground"
            }`}>
              {e.status}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>

    <GlassCard delay={0.8} className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Handshake className="w-4 h-4 text-neon-pink" />
        <h3 className="metric-label">Strategic Partners</h3>
      </div>
      <div className="space-y-3">
        {partners.map((p) => (
          <div key={p.name} className="flex items-center justify-between">
            <span className="text-xs text-foreground">{p.name}</span>
            <span className="text-[10px] text-muted-foreground">{p.type}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  </div>
);

export default FutureVision;
