import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, X } from "lucide-react";
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

const notifications = [
  { id: 1, text: "Pod Sector 7 — Thermal spike detected", time: "2m ago", read: false },
  { id: 2, text: "Neural sync calibration complete", time: "15m ago", read: false },
  { id: 3, text: "Mars Prime hub reached 90% capacity", time: "1h ago", read: true },
  { id: 4, text: "Monthly report ready for review", time: "3h ago", read: true },
];

const Index = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
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
        {/* Search */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 220, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="relative">
                <input
                  ref={searchRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search systems..."
                  className="w-full h-8 pl-3 pr-8 rounded-md bg-muted border border-border/50 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
                <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
          <Search className="w-4 h-4" />
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button onClick={() => setNotifOpen(!notifOpen)} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground relative">
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-[9px] font-mono text-destructive-foreground flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-10 w-72 glass-card z-50 p-0 overflow-hidden"
              >
                <div className="px-3 py-2 border-b border-border/30">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Notifications</p>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className={`px-3 py-2.5 border-b border-border/20 hover:bg-muted/30 transition-colors ${!n.read ? "bg-primary/5" : ""}`}>
                      <div className="flex items-start gap-2">
                        {!n.read && <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
                        <div className={!n.read ? "" : "ml-3.5"}>
                          <p className="text-[11px] text-foreground leading-tight">{n.text}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-px h-5 bg-border/30 hidden sm:block" />
        <span className="text-[10px] font-mono text-muted-foreground hidden sm:inline">SYSTEMS OPERATIONAL</span>
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
      <p className="text-[15px] font-mono text-muted-foreground tracking-[0.15em]">
        The TEAM - Rakesh Swayam Yashi Manoj Shubh Lakshita Kunal
      </p>
    </motion.div>
  </div>
  );
};

export default Index;
