import Split from "react-split";
import ProblemDescription from "./ProblemDescription";
import Playground from "./Playground";
import { Problem } from "@/utils/types/problem";
import ReactConfetti from "react-confetti";
import useWindowSize from "@/hooks/useWindowSize";
import useConfetti from "@/hooks/useConfetti";
import { useState } from "react";

type Props = {
  problem: Problem;
};

const Workspace: React.FC<Props> = ({ problem }) => {
  const [solved, setSolved] = useState(false);
  const { width, height } = useWindowSize();
  const { showConfetti, setShowConfetti } = useConfetti();

  return (
    <Split className="split w-full" minSize={0}>
      <ProblemDescription problem={problem} solved={solved} />
      <div>
        {showConfetti && (
          <ReactConfetti
            className="w-full"
            gravity={0.3}
            tweenDuration={4000}
            width={width}
            height={height}
          />
        )}
        <Playground
          problem={problem}
          setShowConfetti={setShowConfetti}
          setSolved={setSolved}
        />
      </div>
    </Split>
  );
};

export default Workspace;
