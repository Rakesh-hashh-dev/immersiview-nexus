import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const GlassCard = ({ children, className = "", delay = 0 }: GlassCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: [0.2, 0.8, 0.2, 1] }}
    whileHover={{ y: -2 }}
    className={`glass-card-hover ${className}`}
  >
    {children}
  </motion.div>
);

export default GlassCard;
