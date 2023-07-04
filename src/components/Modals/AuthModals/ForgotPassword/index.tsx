import Input from "@/components/Form/Input";
import Modal from "../..";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from "@/zod/models/forgotPassword";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import { toast } from "react-toastify";
import ErrorMessage from "@/components/Form/ErrorMessage";
import useErrorMessage from "@/hooks/useErrorMessage";

type Props = {};

const ForgotPassword: React.FC<Props> = ({}) => {
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const { errorMessage } = useErrorMessage(error);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const actionCodeSettings = {
    url: "http://localhost:3000/login",
  };

  const onSubmit: SubmitHandler<ForgotPasswordSchema> = async (formData) => {
    const success = await sendPasswordResetEmail(
      formData.email,
      actionCodeSettings
    );
    if (success) {
      reset();
      toast.success("A password reset email has been sent");
    }
  };

  return (
    <Modal title="Forgot Password">
      <p className="text-black font-normal text-sm">
        Enter your email address to reset your password. You&apos;ll receive an
        email with instructions. Please follow the steps in the email to reset
        your password.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Email"
          name="email"
          type="email"
          register={register}
          errors={errors}
        />
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <button
          disabled={sending}
          type="submit"
          className="text-center w-full bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200 ease-in-out rounded-md py-2 text-base md:text-lg font-medium tracking-wide"
        >
          {sending ? "Resetting Password" : "Reset Password"}
        </button>
      </form>
    </Modal>
  );
};

export default ForgotPassword;
