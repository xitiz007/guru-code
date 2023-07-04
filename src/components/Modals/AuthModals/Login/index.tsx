import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "../..";
import { LoginSchema, loginSchema } from "@/zod/models/login";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Form/Input";
import useAuthModal from "@/hooks/useAuthModal";
import type { ModalType } from "@/atoms/authModalAtom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/router";
import ErrorMessage from "@/components/Form/ErrorMessage";
import useErrorMessage from "@/hooks/useErrorMessage";

type Props = {};

const Login: React.FC<Props> = ({}) => {
  const router = useRouter();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const { errorMessage } = useErrorMessage(error);
  const { updateAuthModalState } = useAuthModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const onClickHandler = (modalType: ModalType) => {
    updateAuthModalState({
      isOpen: true,
      type: modalType,
    });
  };

  const onSubmit: SubmitHandler<LoginSchema> = async (formData) => {
    try {
      const response = await signInWithEmailAndPassword(
        formData.email,
        formData.password
      );
      if (response) {
        router.replace("/");
      }
    } catch (err: any) {
      console.log(err?.message);
    }
  };

  return (
    <Modal title="Login" isLoading={loading}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Email"
          name="email"
          type="email"
          register={register}
          errors={errors}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          register={register}
          errors={errors}
        />
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <button
          disabled={loading}
          type="submit"
          className="text-center w-full bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200 ease-in-out rounded-md py-2 text-base md:text-lg font-medium tracking-wide"
        >
          {loading ? "Signing in" : "Sign in"}
        </button>
      </form>
      <div className="flex justify-end mt-2">
        <span
          onClick={() => onClickHandler("forgotPassword")}
          className="text-blue-600 font-normal text-sm hover:underline cursor-pointer"
        >
          Forgot Password ?
        </span>
      </div>
      <div className="font-normal text-sm text-black mt-2">
        Not registered ?{" "}
        <span
          onClick={() => onClickHandler("register")}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Create account
        </span>
      </div>
    </Modal>
  );
};

export default Login;
