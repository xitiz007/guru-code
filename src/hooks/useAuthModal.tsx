import { StateType, authModalState } from "@/atoms/authModalAtom";
import { useSetRecoilState } from "recoil";

const useAuthModal = () => {
  const setAuthState = useSetRecoilState(authModalState);
  const updateAuthModalState = (state: StateType) => {
    setAuthState(state);
  };
  return { updateAuthModalState };
};

export default useAuthModal;
