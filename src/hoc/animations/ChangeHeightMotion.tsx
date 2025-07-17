import React, { FC, useRef } from 'react';
import { type Easing, motion } from 'motion/react';

interface ChangeHeightMotionProps {
  children: React.ReactNode;
  reanimate: any;
  initialHeight?: number;
  duration?: number;
  ease?: Easing | Easing[];
  easeWithSpring?: boolean;
  delay?: number;
}

/**Плавно изменяет высоту children при изменении контента */
const ChangeHeightMotion: FC<ChangeHeightMotionProps> = ({
  children,
  reanimate,
  initialHeight = 0,
  duration = 0.5, // sec
  ease = 'linear',
  easeWithSpring = true,
  delay = 0,
}) => {
  const motionElemRef = useRef(null);
  const initialHeightRef = useRef('');

  const handleCompleteAnimation = () => {
    if (motionElemRef.current) {
      initialHeightRef.current = getComputedStyle(motionElemRef.current).height;
    }
  };

  return (
    <motion.div
      key={reanimate}
      ref={motionElemRef}
      initial={{ height: initialHeightRef.current || initialHeight }}
      animate={{ height: 'auto' }}
      onAnimationComplete={handleCompleteAnimation}
      transition={{ duration, ease, type: easeWithSpring ? 'spring' : 'tween', delay }}
    >
      {children}
    </motion.div>
  );
};

export default ChangeHeightMotion;
