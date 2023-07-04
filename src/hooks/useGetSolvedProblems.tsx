import { auth, firestore } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const useGetSolvedProblems = () => {
  const [solvedProblems, setSolvedProblems] = useState<Array<string>>([]);
  const [user] = useAuthState(auth);
  const getSolvedProblems = async () => {
    const userRef = doc(firestore, "users", user!.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      setSolvedProblems(userDoc.data().solvedProblems);
    }
  };
  
  useEffect(() => {
    user && getSolvedProblems();
  }, [user]);

  return solvedProblems;
};

export default useGetSolvedProblems;
