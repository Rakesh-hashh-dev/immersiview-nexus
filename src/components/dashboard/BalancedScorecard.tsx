import GlassCard from "./GlassCard";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp, Users, Server, Brain } from "lucide-react";

const revenueData = [
  { m: "J", v: 2800 }, { m: "F", v: 3100 }, { m: "M", v: 3400 },
  { m: "A", v: 3200 }, { m: "M", v: 3800 }, { m: "J", v: 4200 },
];

const Sparkline = ({ data, color }: { data: { m: string; v: number }[]; color: string }) => (
  <ResponsiveContainer width="100%" height={60}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <Tooltip
        contentStyle={{ background: "hsl(230,20%,7%)", border: "1px solid hsl(230,15%,15%)", borderRadius: 8, fontSize: 11, fontFamily: "monospace" }}
        labelStyle={{ display: "none" }}
      />
      <Area type="monotone" dataKey="v" stroke={color} fill={`url(#grad-${color})`} strokeWidth={2} dot={false} />
    </AreaChart>
  </ResponsiveContainer>
);

const quadrants = [
  {
    title: "Financial",
    icon: TrendingUp,
    color: "neon-text-purple",
    items: [
      { label: "Revenue Growth", value: "+12.4% YoY" },
      { label: "ARPU", value: "₹28,400" },
      { label: "Profit Margin", value: "34.2%" },
    ],
    chart: true,
  },
  {
    title: "Customer",
    icon: Users,
    color: "neon-text-cyan",
    items: [
      { label: "CSAT Score", value: "4.92/5.0" },
      { label: "Repeat Usage", value: "92%" },
      { label: "Net Promoter Score", value: "88" },
    ],
  },
  {
    title: "Internal Processes",
    icon: Server,
    color: "neon-text-pink",
    items: [
      { label: "Pod Uptime", value: "99.999%" },
      { label: "Avg Load Time", value: "1.2s" },
      { label: "Session Success Rate", value: "99.2%" },
    ],
  },
  {
    title: "Learning & Growth",
    icon: Brain,
    color: "neon-text-cyan",
    items: [
      { label: "AI Accuracy", value: "98.4%" },
      { label: "New Experiences/Mo", value: "24" },
      { label: "R&D Investment", value: "22% OpEx" },
    ],
  },
];

const BalancedScorecard = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {quadrants.map((q, i) => (
      <GlassCard key={q.title} delay={0.1 + i * 0.05} className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <q.icon className={`w-4 h-4 ${q.color === "neon-text-purple" ? "text-secondary" : q.color === "neon-text-pink" ? "text-neon-pink" : "text-primary"}`} />
          <h3 className="metric-label !text-[11px]">{q.title}</h3>
        </div>
        {q.chart && <Sparkline data={revenueData} color="hsl(280, 100%, 65%)" />}
        <div className="space-y-2">
          {q.items.map((item) => (
            <div key={item.label} className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">{item.label}</span>
              <span className="text-sm font-mono tabular-nums text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    ))}
  </div>
);

export default BalancedScorecard;
