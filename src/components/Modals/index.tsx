import { initialAuthModalState } from "@/atoms/authModalAtom";
import useAuthModal from "@/hooks/useAuthModal";
import useSettings from "@/hooks/useSettings";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface Props {
  children: React.ReactNode;
  title: string;
  isLoading?: boolean;
}

const Modal: React.FC<Props> = ({ title, children, isLoading = false }) => {
  const { updateAuthModalState } = useAuthModal();
  const { updateSettingsState } = useSettings();
  const onCloseHandler = () => {
    !isLoading && updateAuthModalState(initialAuthModalState);
    !isLoading && updateSettingsState({ isModalOpen: false });
  };

  useEffect(() => {
    const handleESC = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseHandler();
    };
    window.addEventListener("keydown", handleESC);

    return () => window.removeEventListener("keydown", handleESC);
  }, []);

  return (
    <>
      <div
        onClick={onCloseHandler}
        className="absolute z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50"
      />

      <div className="absolute z-20 top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-white w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] rounded-lg h-18 overflow-hidden">
        <div className="flex items-center justify-between h-12 bg-gray-100 px-2">
          <h1 className="font-medium text-2xl tracking-wide text-black">
            {title}
          </h1>
          <IoClose
            onClick={onCloseHandler}
            className="text-xl hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer text-black"
          />
        </div>
        <div className="p-2 md:p-6">{children}</div>
      </div>
    </>
  );
};

export default Modal;
