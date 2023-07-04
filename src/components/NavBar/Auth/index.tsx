import useAuthModal from "@/hooks/useAuthModal";
import NavBar from "..";

type Props = {
  className?: string;
};

const AuthNavBar: React.FC<Props> = ({ className = "" }) => {
  const { updateAuthModalState } = useAuthModal();
  const onSigninHandler = () => {
    updateAuthModalState({
      isOpen: true,
      type: "login",
    });
  };
  return (
    <NavBar className={className}>
      <button
        onClick={onSigninHandler}
        className="bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium
                hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange border-2 border-transparent
                transition duration-300 ease-in-out
                "
      >
        Sign In
      </button>
    </NavBar>
  );
};

export default AuthNavBar;
