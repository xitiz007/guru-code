import AuthModals from "@/components/Modals/AuthModals";
import AuthNavBar from "@/components/NavBar/Auth";
import { auth } from "@/firebase";
import useAuthModal from "@/hooks/useAuthModal";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type Props = {};

const Login: NextPage<Props> = ({}) => {
  const [pageLoading, setPageLoading] = useState(true);
  const [user, loading] = useAuthState(auth);
  const { updateAuthModalState } = useAuthModal();
  const router = useRouter();

  useEffect(() => {
    user && router.replace("/");
    if (!loading && !user) setPageLoading(false);
  }, [user, router, loading]);

  useEffect(() => {
    updateAuthModalState({
      isOpen: true,
      type: "login",
    });
  }, []);

  if (pageLoading) return <p>Loading...</p>;
  return (
    <>
      <AuthModals />
      <div className="bg-gradient-to-b from-gray-600 to-black relative">
        <AuthNavBar className="max-w-7xl mx-auto" />
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
            <Image src="/hero.png" alt="Hero img" width={700} height={700} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
