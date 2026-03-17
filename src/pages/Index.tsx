import { motion } from "framer-motion";
import HeroMetrics from "@/components/dashboard/HeroMetrics";
import BalancedScorecard from "@/components/dashboard/BalancedScorecard";
import UserExperienceAnalytics from "@/components/dashboard/UserExperienceAnalytics";
import BusinessSnapshot from "@/components/dashboard/BusinessSnapshot";
import OperationsControl from "@/components/dashboard/OperationsControl";
import FutureVision from "@/components/dashboard/FutureVision";

const SectionTitle = ({ children, delay = 0 }: { children: string; delay?: number }) => (
  <motion.h2
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="text-[11px] uppercase tracking-[0.2em] font-mono text-muted-foreground mb-3"
  >
    {children}
  </motion.h2>
);

const Index = () => (
  <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
    {/* Header */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex items-center justify-between mb-6"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-primary neon-glow-cyan" />
        </div>
        <div>
          <h1 className="text-sm font-mono font-semibold tracking-tight text-foreground">
            IMMERSISPHERE
          </h1>
          <p className="text-[10px] font-mono text-muted-foreground tracking-[0.1em]">
            OPERATIONS CONTROL — 2050
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-mono text-muted-foreground">SYSTEMS OPERATIONAL</span>
        <span className="status-dot-active" />
      </div>
    </motion.div>

    {/* Hero Metrics */}
    <HeroMetrics />

    {/* Balanced Scorecard */}
    <SectionTitle delay={0.1}>Balanced Scorecard</SectionTitle>
    <div className="mb-6">
      <BalancedScorecard />
    </div>

    {/* UX Analytics */}
    <SectionTitle delay={0.25}>User Experience Analytics</SectionTitle>
    <div className="mb-6">
      <UserExperienceAnalytics />
    </div>

    {/* Business Snapshot */}
    <SectionTitle delay={0.35}>Business Model Snapshot</SectionTitle>
    <div className="mb-6">
      <BusinessSnapshot />
    </div>

    {/* Operations */}
    <SectionTitle delay={0.5}>Operations Control</SectionTitle>
    <div className="mb-6">
      <OperationsControl />
    </div>

    {/* Future Vision */}
    <SectionTitle delay={0.65}>Future Vision & Expansion</SectionTitle>
    <div className="mb-6">
      <FutureVision />
    </div>

    {/* Footer */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9 }}
      className="text-center py-4 border-t border-border/30"
    >
      <p className="text-[10px] font-mono text-muted-foreground tracking-[0.15em]">
        IMMERSISPHERE CORP © 2050 — NEURAL SYNC AT 99.4% STABILITY
      </p>
    </motion.div>
  </div>
);

export default Index;
