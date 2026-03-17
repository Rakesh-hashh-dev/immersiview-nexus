import GlassCard from "./GlassCard";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";

const worlds = [
  { name: "Neo-Tokyo 2099", pct: 42, color: "bg-primary" },
  { name: "Zenith Meditation", pct: 28, color: "bg-secondary" },
  { name: "Mars Colony Alpha", pct: 15, color: "bg-neon-pink" },
  { name: "Deep Ocean Explorer", pct: 10, color: "bg-neon-green" },
  { name: "Other Worlds", pct: 5, color: "bg-muted-foreground" },
];

const emotionData = [
  { emotion: "Relaxed", score: 80 },
  { emotion: "Euphoric", score: 60 },
  { emotion: "Focused", score: 72 },
  { emotion: "Excited", score: 55 },
  { emotion: "Calm", score: 85 },
  { emotion: "Creative", score: 48 },
];

const UserExperienceAnalytics = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <GlassCard delay={0.3} className="flex flex-col gap-4">
      <h3 className="metric-label">Popular Worlds</h3>
      <div className="space-y-3">
        {worlds.map((w) => (
          <div key={w.name} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">{w.name}</span>
              <span className="text-xs font-mono tabular-nums text-foreground">{w.pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div className={`h-full rounded-full ${w.color} transition-all duration-700`} style={{ width: `${w.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center pt-2 border-t border-border/30">
        <span className="metric-label">Completion Rate</span>
        <span className="text-lg font-mono tabular-nums neon-text-cyan">99.2%</span>
      </div>
    </GlassCard>

    <GlassCard delay={0.35} className="flex flex-col gap-3">
      <h3 className="metric-label">Emotion Indicators</h3>
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={emotionData} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="hsl(230,15%,15%)" />
            <PolarAngleAxis dataKey="emotion" tick={{ fill: "hsl(215,15%,55%)", fontSize: 10, fontFamily: "monospace" }} />
            <Radar name="Score" dataKey="score" stroke="hsl(190,100%,50%)" fill="hsl(190,100%,50%)" fillOpacity={0.15} strokeWidth={2} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Happy", value: "86%" },
          { label: "Relaxed", value: "80%" },
          { label: "Excited", value: "72%" },
        ].map((e) => (
          <div key={e.label} className="text-center">
            <p className="text-xs text-muted-foreground">{e.label}</p>
            <p className="text-sm font-mono tabular-nums text-foreground">{e.value}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  </div>
);

export default UserExperienceAnalytics;
