import Link from "next/link";
import { BsCheckCircle } from "react-icons/bs";
import { AiFillYoutube } from "react-icons/ai";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import ReactYoutube from "react-youtube";
import Skeleton from "../Skeleton";
import useGetProblems from "@/hooks/useGetProblems";
import useGetSolvedProblems from "@/hooks/useGetSolvedProblems";

type Props = {};
const defaultPlayerState = {
  isOpen: false,
  videoId: "",
};

const ProblemsTable: React.FC<Props> = ({}) => {
  const { loading, problems } = useGetProblems();
  const solvedProblems = useGetSolvedProblems();
  const [youtubePlayer, setYoutubePlayer] = useState<{
    isOpen: boolean;
    videoId: string;
  }>(defaultPlayerState);

  const closeModal = () => {
    setYoutubePlayer(defaultPlayerState);
  };

  useEffect(() => {
    const handleESC = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleESC);

    return () => window.removeEventListener("keydown", handleESC);
  }, []);

  if (loading) {
    return (
      <div className="relative overflow-x-auto mx-auto px-6 pb-10">
        {loading && (
          <div className="animate-pulse max-w-[1200px] mx-auto w-full">
            {[...Array(10)].map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <table className="text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b">
          <tr>
            <th scope="col" className="px-1 py-3 w-0 font-medium">
              Status
            </th>
            <th scope="col" className="px-6 py-3 w-0 font-medium">
              Title
            </th>
            <th scope="col" className="px-6 py-3 w-0 font-medium">
              Difficulty
            </th>
            <th scope="col" className="px-6 py-3 w-0 font-medium">
              Category
            </th>
            <th scope="col" className="px-6 py-3 w-0 font-medium">
              Solution
            </th>
          </tr>
        </thead>
        <tbody className="text-white">
          {problems.map((problem, index) => {
            const problemSolved = solvedProblems.includes(problem.id);
            const rowBgColor = index % 2 === 0 ? "" : "bg-dark-layer-1";
            const difficultyColor =
              problem.difficulty === "Easy"
                ? "text-dark-green-s"
                : problem.difficulty === "Medium"
                ? "text-dark-yellow"
                : "text-dark-pink";
            return (
              <tr key={index} className={rowBgColor}>
                <td className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s">
                  {problemSolved && <BsCheckCircle title="Solved" fontSize={18} width={18} />}
                </td>
                <td className="px-6 py-4">
                  {problem.link ? (
                    <Link
                      target="_blank"
                      className="hover:text-blue-600"
                      href={problem.link}
                    >
                      {problem.title}
                    </Link>
                  ) : (
                    <Link
                      className="hover:text-blue-600"
                      href={`/problems/${problem.id}`}
                    >
                      {problem.title}
                    </Link>
                  )}
                </td>
                <td className={`px-6 py-4 ${difficultyColor}`}>
                  {problem.difficulty}
                </td>
                <td className="px-6 py-4">{problem.category}</td>
                <td className={"px-6 py-4"}>
                  {problem.videoId ? (
                    <AiFillYoutube
                      onClick={() => {
                        setYoutubePlayer({
                          isOpen: true,
                          videoId: problem.videoId!,
                        });
                      }}
                      fontSize={"18"}
                      className="cursor-pointer hover:text-red-500"
                    />
                  ) : (
                    <p className="text-gray-400">Coming soon</p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {youtubePlayer.isOpen && (
        <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
          <div
            className="bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute"
            onClick={closeModal}
          />
          <div className="w-full z-20 max-w-4xl mx-auto relative px-4">
            <IoClose
              onClick={closeModal}
              fontSize={"35"}
              className="cursor-pointer absolute -top-16 right-0"
            />
            <ReactYoutube
              videoId={youtubePlayer.videoId}
              loading="lazy"
              iframeClassName="w-full min-h-[500px]"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProblemsTable;
