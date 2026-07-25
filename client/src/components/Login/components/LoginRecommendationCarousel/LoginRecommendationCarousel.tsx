import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RECOMMENDATIONS } from "../../Login.data";
import { LoginRecommendation } from "../LoginRecommendation";
import { getNextRecIndex } from "../LoginRecommendation/helpers";

export const LoginRecommendationCarousel = () => {
  const [currentRecIndex, setCurrentRecIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsExiting(true);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
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
        <LoginRecommendation
          recommendation={RECOMMENDATIONS[getNextRecIndex(currentRecIndex)]}
          isNextRecommendation
        />
      </div>
    </>
  );
};
