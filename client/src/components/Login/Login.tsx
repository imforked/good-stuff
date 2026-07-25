import { LoginRecommendation } from "./components/LoginRecommendation";
import { Drawer } from "./components/Drawer";
import { useEffect, useState } from "react";
import { RECOMMENDATIONS } from "./Login.data";
import { getNextRecIndex } from "./components/LoginRecommendation/helpers";
import { motion, AnimatePresence } from "motion/react";

export const Login = () => {
  const [currentRecIndex, setCurrentRecIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsExiting(true);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  const NextRecommendation = () => (
    <LoginRecommendation
      recommendation={RECOMMENDATIONS[getNextRecIndex(currentRecIndex)]}
      isNextRecommendation
    />
  );

  return (
    <div className="relative flex-1 bg-surface overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={currentRecIndex}
          className="absolute inset-0 z-2"
          initial={{ opacity: 0 }}
          animate={isExiting ? { opacity: 0, x: -40 } : { opacity: 1, x: 0 }}
          transition={{ duration: isExiting ? 1.5 : 0 }}
          onAnimationComplete={() => {
            if (!isExiting) {
              return;
            }
            setCurrentRecIndex((prev) => getNextRecIndex(prev));
            setIsExiting(false);
          }}
        >
          <LoginRecommendation
            recommendation={RECOMMENDATIONS[currentRecIndex]}
          />
        </motion.div>
      </AnimatePresence>
      <div
        key={getNextRecIndex(currentRecIndex)}
        className="absolute inset-0 z-1"
      >
        <NextRecommendation />
      </div>
      <Drawer />
    </div>
  );
};
