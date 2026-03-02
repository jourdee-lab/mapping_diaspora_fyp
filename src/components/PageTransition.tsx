import { motion } from 'framer-motion';
import { usePageDirection } from '@/hooks/usePageDirection';

const DURATION = 0.22;
const DISTANCE = '25%';
const EASE = [0.35, 0, 0.25, 1] as const;

export function PageTransition({ children }: { children: React.ReactNode }) {
  const direction = usePageDirection();

  const variants = {
    enter: { x: direction > 0 ? DISTANCE : `-${DISTANCE}`, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: direction > 0 ? `-${DISTANCE}` : DISTANCE, opacity: 0 },
  };

  return (
    <motion.div
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: DURATION, ease: EASE }}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
}
