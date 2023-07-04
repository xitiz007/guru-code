import { auth, firestore } from "@/firebase";
import { User } from "@/utils/types/user";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
const initialState = {
  liked: false,
  disliked: false,
  starred: false,
  solved: false,
};

const useGetUserDataOnProblem = (problemId: string) => {
  const [data, setData] = useState(initialState);
  const [user] = useAuthState(auth);
  const getUserDataOnProblem = async (problemId: string) => {
    const userRef = doc(firestore, "users", user!.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data() as User;
      const {
        solvedProblems,
        likedProblems,
        dislikedProblems,
        starredProblems,
      } = data;
      setData({
        liked: likedProblems.includes(problemId),
        disliked: dislikedProblems.includes(problemId),
        starred: starredProblems.includes(problemId),
        solved: solvedProblems.includes(problemId),
      });
    }
  };

  useEffect(() => {
    user && getUserDataOnProblem(problemId);
    return () => {
      setData(initialState);
    };
  }, [problemId, user]);

  return { data, setData, user };
};

export default useGetUserDataOnProblem;
