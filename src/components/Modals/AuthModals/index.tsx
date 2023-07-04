import { authModalState, modals } from "@/atoms/authModalAtom";
import { useRecoilValue } from "recoil";

type Props = {};

const AuthModals: React.FC<Props> = ({}) => {
  const authState = useRecoilValue(authModalState);
  if (!authState.isOpen) return null;
  const Modal = modals[authState.type];
  return <Modal />;
};

export default AuthModals;
