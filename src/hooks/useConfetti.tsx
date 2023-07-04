import { useEffect, useState } from "react";

const useConfetti = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showConfetti) {
      timeout = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [showConfetti]);
  return { showConfetti, setShowConfetti };
};

export default useConfetti;
