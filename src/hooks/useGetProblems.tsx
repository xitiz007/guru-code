import { firestore } from "@/firebase";
import { DBProblem } from "@/utils/types/problem";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

const useGetProblems = () => {
  const [loading, setLoading] = useState(false);
  const [problems, setProblems] = useState<Array<DBProblem>>([]);

  const getProblems = async () => {
    setLoading(true);
    const q = query(collection(firestore, "problems"), orderBy("order", "asc"));
    const querySnapShot = await getDocs(q);
    const temp: Array<DBProblem> = [];
    querySnapShot.forEach((doc) => {
      temp.push({ id: doc.id, ...doc.data() } as DBProblem);
    });
    setProblems(temp);
    setLoading(false);
  };
  useEffect(() => {
    getProblems();
  }, []);

  return { loading, problems };
};

export default useGetProblems;
