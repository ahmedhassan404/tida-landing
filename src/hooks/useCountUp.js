import { useEffect, useState } from "react";

export function useCountUp(target, active, reduceMotion) {
  const [count, setCount] = useState(reduceMotion ? target : 0);

  useEffect(() => {
    if (!active || reduceMotion) return undefined;

    const startedAt = performance.now();
    let frameId;

    const updateCount = (timestamp) => {
      const progress = Math.min((timestamp - startedAt) / 1200, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      setCount(Math.round(target * easedProgress));
      if (progress < 1) frameId = requestAnimationFrame(updateCount);
    };

    frameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(frameId);
  }, [active, reduceMotion, target]);

  return reduceMotion && active ? target : count;
}
