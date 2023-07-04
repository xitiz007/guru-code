import { auth } from "@/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
import { FiLogOut } from "react-icons/fi";

type Props = {};

const Logout: React.FC<Props> = ({}) => {
  const [signOut, loading] = useSignOut(auth);
  return (
    <button
      onClick={signOut}
      disabled={loading}
      className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange "
    >
      <FiLogOut />
    </button>
  );
};

export default Logout;
