import { firestore } from "@/firebase";
import { DBProblem } from "@/utils/types/problem";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const useGetProblem = (problemId: string) => {
  const [loading, setLoading] = useState(false);
  const [problem, setProblem] = useState<DBProblem | null>(null);

  const getProblem = async (problemId: string) => {
    setLoading(true);
    const docRef = doc(firestore, "problems", problemId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const problem = docSnap.data() as DBProblem;
      setProblem(problem);
    } else {
      setProblem(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProblem(problemId);
  }, [problemId]);

  return { loading, problem, setProblem };
};

export default useGetProblem;
