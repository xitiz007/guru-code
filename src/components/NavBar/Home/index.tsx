import Link from "next/link";
import NavBar from "..";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import Image from "next/image";
import Logout from "@/components/Buttons/Logout";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import { User } from "firebase/auth";
import Timer from "@/components/Timer";
import { useRouter } from "next/router";
import { problems } from "@/utils/problems";

type Props = {
  problemPage?: boolean;
};

const Problem: React.FC = () => {
  const router = useRouter();
  const {
    query: { problemId },
  } = router;

  const onChangeHandler = (next: boolean) => {
    const order = problems[problemId as string].order;
    const nextOrder = next ? order + 1 : order - 1;
    let nextProblemKey = Object.keys(problems).find(
      (key) => problems[key].order === nextOrder
    );
    if (next && !nextProblemKey) {
      nextProblemKey = Object.keys(problems).find(
        (problemKey) => problems[problemKey].order === 1
      );
    } else if (!next && !nextProblemKey) {
      nextProblemKey = Object.keys(problems).find(
        (problemKey) =>
          problems[problemKey].order === Object.keys(problems).length
      );
    }
    return router.push(`/problems/${nextProblemKey}`);
  };

  return (
    <div className="flex items-center gap-4 justify-center">
      <div
        onClick={() => onChangeHandler(false)}
        className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
      >
        <FaChevronLeft />
      </div>
      <Link
        href="/"
        className="flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer"
      >
        <div>
          <BsList />
        </div>
        <p>Problem List</p>
      </Link>
      <div
        onClick={() => onChangeHandler(true)}
        className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
      >
        <FaChevronRight />
      </div>
    </div>
  );
};

const AuthUser: React.FC<{ user: User; problemPage: boolean }> = ({
  user,
  problemPage,
}) => {
  return (
    <div className="flex items-center space-x-4">
      {problemPage && <Timer />}
      <div className="cursor-pointer group relative">
        <Image
          src="/avatar.png"
          alt="user profile image"
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="absolute top-10 left-2/4 mx-auto -translate-x-2/4 bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg z-40 group-hover:scale-100 scale-0 transiti duration-300 ease-in-out">
          <p className="text-sm">{user.email}</p>
        </div>
      </div>
      <Logout />
    </div>
  );
};

const HomeNavBar: React.FC<Props> = ({ problemPage = false }) => {
  const [user] = useAuthState(auth);

  return (
    <NavBar className="md:px-28">
      {problemPage && <Problem />}
      {!user && (
        <Link href="/login">
          <button className="bg-dark-fill-3 py-1 px-2 cursor-pointer rounded">
            Sign In
          </button>
        </Link>
      )}
      {user && <AuthUser user={user} problemPage={problemPage} />}
    </NavBar>
  );
};

export default HomeNavBar;
