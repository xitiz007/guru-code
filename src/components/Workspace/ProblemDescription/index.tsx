import {
  AiFillDislike,
  AiFillLike,
  AiFillStar,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { TiStarOutline } from "react-icons/ti";
import { BsCheck2Circle } from "react-icons/bs";
import { Problem } from "@/utils/types/problem";
import useGetProblem from "@/hooks/useGetProblem";
import RectangleSkeleton from "@/components/Skeleton/Rectangle";
import CircleSkeleton from "@/components/Skeleton/Circle";
import useGetUserDataOnProblem from "@/hooks/useGetUserDataOnProblem";
import { toast } from "react-toastify";
import {
  arrayRemove,
  arrayUnion,
  doc,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "@/firebase";
import { useState } from "react";

type Props = {
  problem: Problem;
  solved: boolean;
};

const ProblemDescription: React.FC<Props> = ({ problem, solved }) => {
  const [updating, setupdating] = useState(false);
  const {
    loading,
    problem: dbProblem,
    setProblem: setDbProblem,
  } = useGetProblem(problem.id);

  const { data, setData, user } = useGetUserDataOnProblem(problem?.id);
  const difficultyClassName =
    dbProblem?.difficulty === "Easy"
      ? "bg-olive text-olive"
      : dbProblem?.difficulty === "Medium"
      ? "bg-dark-yellow text-dark-yellow"
      : "bg-dark-pink text-dark-pink";

  const handleLike = async () => {
    if (!user)
      return toast.error("You must be logged in to like a problem", {
        position: "top-left",
        theme: "dark",
      });
    setupdating(true);
    try {
      await runTransaction(firestore, async (transaction) => {
        const userRef = doc(firestore, "users", user.uid);
        const problemRef = doc(firestore, "problems", problem.id);
        const userDoc = await transaction.get(userRef);
        const problemDoc = await transaction.get(problemRef);
        if (!userDoc.exists() || !problemDoc.exists()) return;
        if (data.liked) {
          transaction.update(userRef, {
            likedProblems: userDoc
              .data()
              .likedProblems.filter((id: string) => id !== problem.id),
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes - 1,
          });
          setData((data) => ({ ...data, liked: false }));
          setDbProblem((problem) =>
            problem ? { ...problem, likes: problem.likes - 1 } : null
          );
        } else if (data.disliked) {
          transaction.update(userRef, {
            likedProblems: [...userDoc.data().likedProblems, problem.id],
            dislikedProblems: userDoc
              .data()
              .dislikedProblems.filter((id: string) => id !== problem.id),
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes + 1,
            dislikes: problemDoc.data().dislikes - 1,
          });
          setData((data) => ({ ...data, liked: true, disliked: false }));
          setDbProblem((problem) =>
            problem
              ? {
                  ...problem,
                  likes: problem.likes + 1,
                  dislikes: problem.dislikes - 1,
                }
              : null
          );
        } else {
          transaction.update(userRef, {
            likedProblems: [...userDoc.data().likedProblems, problem.id],
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes + 1,
          });
          setData((data) => ({ ...data, liked: true }));
          setDbProblem((problem) =>
            problem
              ? {
                  ...problem,
                  likes: problem.likes + 1,
                }
              : null
          );
        }
      });
    } catch (e) {
      console.log("Transaction failed: ", e);
    } finally {
      setupdating(false);
    }
  };

  const handleDisLike = async () => {
    if (!user)
      return toast.error("You must be logged in to like a problem", {
        position: "top-left",
        theme: "dark",
      });
    setupdating(true);
    try {
      await runTransaction(firestore, async (transaction) => {
        const userRef = doc(firestore, "users", user.uid);
        const problemRef = doc(firestore, "problems", problem.id);
        const userDoc = await transaction.get(userRef);
        const problemDoc = await transaction.get(problemRef);
        if (!userDoc.exists() || !problemDoc.exists()) return;
        if (data.disliked) {
          transaction.update(userRef, {
            dislikedProblems: userDoc
              .data()
              .dislikedProblems.filter((id: string) => id !== problem.id),
          });
          transaction.update(problemRef, {
            dislikes: problemDoc.data().dislikes - 1,
          });
          setData((data) => ({ ...data, disliked: false }));
          setDbProblem((problem) =>
            problem ? { ...problem, dislikes: problem.dislikes - 1 } : null
          );
        } else if (data.liked) {
          transaction.update(userRef, {
            dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
            likedProblems: userDoc
              .data()
              .likedProblems.filter((id: string) => id !== problem.id),
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes - 1,
            dislikes: problemDoc.data().dislikes + 1,
          });
          setData((data) => ({ ...data, liked: false, disliked: true }));
          setDbProblem((problem) =>
            problem
              ? {
                  ...problem,
                  likes: problem.likes - 1,
                  dislikes: problem.dislikes + 1,
                }
              : null
          );
        } else {
          transaction.update(userRef, {
            dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
          });
          transaction.update(problemRef, {
            dislikes: problemDoc.data().dislikes + 1,
          });
          setData((data) => ({ ...data, disliked: true }));
          setDbProblem((problem) =>
            problem
              ? {
                  ...problem,
                  dislikes: problem.dislikes + 1,
                }
              : null
          );
        }
      });
    } catch (e) {
      console.log("Transaction failed: ", e);
    } finally {
      setupdating(false);
    }
  };

  const handleStar = async () => {
    if (!user)
      return toast.error("You must be logged in to like a problem", {
        position: "top-left",
        theme: "dark",
      });
    setupdating(true);
    const userRef = doc(firestore, "users", user.uid);
    if (!data.starred) {
      await updateDoc(userRef, {
        starredProblems: arrayUnion(problem.id),
      });
      setData((data) => ({ ...data, starred: true }));
    } else {
      await updateDoc(userRef, {
        starredProblems: arrayRemove(problem.id),
      });
      setData((data) => ({ ...data, starred: false }));
    }
    setupdating(false);
  };

  return (
    <div className="bg-dark-layer-1">
      <div className="flex items-center bg-dark-layer-2 h-11 pt-2 w-full text-white">
        <div className="bg-drak-layer-1 rounded-t-[5px]  px-5 py-2 text-xs cursor-pointer">
          Description
        </div>
      </div>

      <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
        <div className="px-5">
          <div className="w-full">
            <div className="text-lg text-white font-medium">
              {problem.title}
            </div>
            {loading ? (
              <div className="mt-3 flex space-x-2">
                <RectangleSkeleton />
                <CircleSkeleton />
                <RectangleSkeleton />
                <RectangleSkeleton />
                <CircleSkeleton />
              </div>
            ) : !loading && dbProblem ? (
              <div className="flex items-center mt-3">
                <div
                  className={`${difficultyClassName} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize`}
                >
                  {dbProblem.difficulty}
                </div>
                {(data.solved || solved) && (
                  <div
                    title="Solved"
                    className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s"
                  >
                    <BsCheck2Circle />
                  </div>
                )}
                <button
                  disabled={updating}
                  onClick={handleLike}
                  className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6"
                >
                  {data.liked && !updating && (
                    <AiFillLike className="text-dark-blue-s" />
                  )}
                  {!data.liked && !updating && <AiFillLike />}
                  {updating && (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  )}
                  <span className="text-xs">{dbProblem.likes}</span>
                </button>
                <button
                  disabled={updating}
                  onClick={handleDisLike}
                  className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6"
                >
                  {data.disliked && !updating && (
                    <AiFillDislike className="text-dark-blue-s" />
                  )}
                  {!data.disliked && !updating && <AiFillDislike />}
                  {updating && (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  )}
                  <span className="text-xs">{dbProblem.dislikes}</span>
                </button>
                <button
                  disabled={updating}
                  onClick={handleStar}
                  className="cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 "
                >
                  {data.starred && !updating && (
                    <AiFillStar className="text-dark-yellow" />
                  )}
                  {!data.starred && !updating && <TiStarOutline />}
                  {updating && (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  )}
                </button>
              </div>
            ) : null}

            {/* Problem Statement */}
            <div className="text-white text-sm">
              <div
                dangerouslySetInnerHTML={{
                  __html: problem.problemStatement,
                }}
              />
            </div>

            {/* Example */}
            <div className="mt-4">
              {problem.examples.map((problem, index) => (
                <div key={problem.id}>
                  <p className="font-medium text-white">Example {index + 1}:</p>
                  {problem.img && (
                    <img src={problem.img} alt="example" className="mt-3" />
                  )}
                  <div className="example-card">
                    <pre>
                      <strong className="text-white">Input: </strong>
                      {problem.inputText}
                      <br />
                      <strong>Output:</strong> {problem.outputText} <br />
                      <strong>Explanation</strong> {problem.explanation}
                    </pre>
                  </div>
                </div>
              ))}

              {/* Constraints */}
              <div className="my-8 pb-4">
                <div className="text-white text-sm font-medium">
                  Constraints:
                </div>
                <ul className="text-white ml-5 list-disc">
                  <div
                    dangerouslySetInnerHTML={{ __html: problem.constraints }}
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;
