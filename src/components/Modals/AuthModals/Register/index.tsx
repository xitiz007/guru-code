import Input from "@/components/Form/Input";
import Modal from "../..";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/zod/models/register";
import useAuthModal from "@/hooks/useAuthModal";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ErrorMessage from "@/components/Form/ErrorMessage";
import { doc, setDoc } from "firebase/firestore";

type Props = {};

const Register: React.FC<Props> = ({}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [createUserWithEmailAndPassword, _, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const { updateAuthModalState } = useAuthModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  const onClickHandler = () => {
    updateAuthModalState({
      isOpen: true,
      type: "login",
    });
  };

  const onSubmit: SubmitHandler<RegisterSchema> = async (formData) => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        formData.email,
        formData.password
      );
      if (!newUser) return;
      const userData = {
        uid: newUser.user.uid,
        email: newUser.user.email,
        displayName: formData.name,
        likedProblems: [],
        dislikedProblems: [],
        solvedProblems: [],
        starredProblems: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      await setDoc(doc(firestore, "users", newUser.user.uid), userData);
      router.replace("/");
    } catch (err: any) {
      console.log(err?.message);
    }
  };

  useEffect(() => {
    error && setErrorMessage(error?.message);
    const timeout = setTimeout(() => {
      setErrorMessage("");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <Modal title="Register" isLoading={loading}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Email"
          name="email"
          type="email"
          register={register}
          errors={errors}
        />
        <Input
          label="Name"
          name="name"
          type="text"
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
          {loading ? "Signing up" : "Sign up"}
        </button>
      </form>
      <div className="font-normal text-sm text-black mt-2">
        Already have an account ?{" "}
        <span
          onClick={onClickHandler}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Login
        </span>
      </div>
    </Modal>
  );
};

export default Register;
