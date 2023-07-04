import { AuthError } from "firebase/auth";
import { useEffect, useState } from "react";

type CustomError = AuthError | undefined | Error;

const useErrorMessage = (error: CustomError) => {
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (error?.message) {
      setErrorMessage(error.message);
      timeout = setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [error]);
  return { errorMessage };
};

export default useErrorMessage;
