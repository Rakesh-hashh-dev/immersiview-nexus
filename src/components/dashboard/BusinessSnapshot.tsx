import GlassCard from "./GlassCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const revenueStreams = [
  { name: "Pay-per-use", value: 35, color: "hsl(190,100%,50%)" },
  { name: "Subscription", value: 45, color: "hsl(280,100%,65%)" },
  { name: "Corporate", value: 20, color: "hsl(330,100%,65%)" },
];

const tiers = [
  { name: "Explorer", price: "₹999/mo", features: "5 sessions, Basic worlds", users: "62K" },
  { name: "Voyager", price: "₹2,499/mo", features: "Unlimited, Premium worlds", users: "54K" },
  { name: "Cosmos", price: "₹7,999/mo", features: "Enterprise, Custom worlds", users: "27K" },
];

const segments = [
  { label: "Individual Users", pct: 52, color: "bg-primary" },
  { label: "Enterprise", pct: 31, color: "bg-secondary" },
  { label: "Premium Users", pct: 17, color: "bg-neon-pink" },
];

const BusinessSnapshot = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <GlassCard delay={0.4} className="flex flex-col gap-3">
      <h3 className="metric-label">Revenue Streams</h3>
      <div className="h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={revenueStreams}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={65}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {revenueStreams.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: "hsl(230,20%,7%)", border: "1px solid hsl(230,15%,15%)", borderRadius: 8, fontSize: 11, fontFamily: "monospace" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-1.5">
        {revenueStreams.map((s) => (
          <div key={s.name} className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
            <span className="text-muted-foreground">{s.name}</span>
            <span className="ml-auto font-mono tabular-nums text-foreground">{s.value}%</span>
          </div>
        ))}
      </div>
    </GlassCard>

    <GlassCard delay={0.45} className="flex flex-col gap-3">
      <h3 className="metric-label">Pricing Tiers</h3>
      <div className="space-y-3 flex-1">
        {tiers.map((t, i) => (
          <div key={t.name} className={`p-3 rounded-lg bg-muted/50 ${i === 1 ? "gradient-border" : ""}`}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-mono font-semibold text-foreground">{t.name}</span>
              <span className="text-xs font-mono neon-text-cyan">{t.price}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">{t.features}</p>
            <p className="text-[10px] font-mono text-muted-foreground mt-1">{t.users} users</p>
          </div>
        ))}
      </div>
    </GlassCard>

    <GlassCard delay={0.5} className="flex flex-col gap-3">
      <h3 className="metric-label">Customer Segments</h3>
      <div className="space-y-4 flex-1 flex flex-col justify-center">
        {segments.map((s) => (
          <div key={s.label} className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <span className="text-xs font-mono tabular-nums text-foreground">{s.pct}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="pt-2 border-t border-border/30 flex justify-between items-center">
        <span className="metric-label">Total Users</span>
        <span className="text-sm font-mono tabular-nums text-foreground">142,804</span>
      </div>
    </GlassCard>
  </div>
);

export default BusinessSnapshot;
