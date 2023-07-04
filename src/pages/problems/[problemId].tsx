import { settingsState } from "@/atoms/settings";
import Settings from "@/components/Modals/Settings";
import HomeNavBar from "@/components/NavBar/Home";
import Workspace from "@/components/Workspace";
import useHasMounted from "@/hooks/useHasMounted";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";
import { NextPage, GetStaticPathsResult, GetStaticPropsResult } from "next";
import { useRecoilValue } from "recoil";

type Props = {
  problem: Problem;
};

const ProblemPage: NextPage<Props> = ({ problem }) => {
  const { isModalOpen } = useRecoilValue(settingsState);
  const mounted = useHasMounted();
  if (!mounted) return null;
  return (
    <>
      <HomeNavBar problemPage={true} />
      <Workspace problem={problem} />
      {isModalOpen && <Settings />}
    </>
  );
};

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const paths = Object.keys(problems).map((problem) => ({
    params: { problemId: problem },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { problemId: string };
}): Promise<GetStaticPropsResult<{ problem: Problem }>> {
  const problem = problems[params.problemId];
  if (!problem) {
    return {
      notFound: true,
    };
  }
  problem.handlerFunction = problem.handlerFunction.toString();
  return {
    props: {
      problem,
    },
  };
}

export default ProblemPage;
