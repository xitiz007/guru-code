import Split from "react-split";
import Nav from "./Nav";
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "../EditorFooter";
import { Problem } from "@/utils/types/problem";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase";
import { toast } from "react-toastify";
import { problems } from "@/utils/problems";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { settingsState } from "@/atoms/settings";
import { getCodeFromFirestore, userSaveCode } from "@/helpers/saveCode";

type Props = {
  problem: Problem;
  setShowConfetti: Dispatch<SetStateAction<boolean>>;
  setSolved: Dispatch<SetStateAction<boolean>>;
};

const Playground: React.FC<Props> = ({
  problem,
  setShowConfetti,
  setSolved,
}) => {
  const [userCode, setUserCode] = useState(problem.starterCode);
  const [caseIndex, setCaseIndex] = useState(0);
  const { fontSize } = useRecoilValue(settingsState);
  const [user] = useAuthState(auth);
  const example = problem.examples[caseIndex];
  const handleSubmit = () => {
    if (!user) {
      toast.error("Please login to submit your code", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    try {
      const index = userCode.indexOf(problem.starterFunctionName);
      const cb = new Function(`return ${userCode.slice(index)}`)();
      const handler = problems[problem.id].handlerFunction;
      if (typeof handler === "function") {
        handler(cb);
        toast.success("Congrats! All tests passed!", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
        setShowConfetti(true);
        setSolved(true);
        const userRef = doc(firestore, "users", user.uid);
        updateDoc(userRef, {
          solvedProblems: arrayUnion(problem.id),
        });
      }
    } catch (error: any) {
      if (
        error.message.startsWith(
          "AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:"
        )
      ) {
        toast.error("Oops! One or more test cases failed", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      } else {
        toast.error("Something went wrong", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      }
    }
  };

  const onChangeHandler = (value: string) => {
    setUserCode(value);
    if (user) userSaveCode(user, problem.id, value);
  };

  useEffect(() => {
    async function getCode() {
      if (!user) return;
      const code = await getCodeFromFirestore(user, problem.id);
      if (code) setUserCode(code);
    }
    getCode();
  }, [user, problem.id]);

  return (
    <div className="flex flex-col bg-dark-layer-1 relative overflow-x-hidden">
      <Nav />
      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          <ReactCodeMirror
            onChange={onChangeHandler}
            value={userCode}
            theme={vscodeDark}
            extensions={[javascript()]}
            style={{ fontSize: Number(fontSize) }}
          />
        </div>
        <div className="w-full px-5 overflow-auto">
          {/* testcase heading */}
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5 text-white">
                Testcases
              </div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
            </div>
          </div>

          <div className="flex">
            {problem.examples.map((example, index) => (
              <div
                onClick={() => setCaseIndex(index)}
                key={example.id}
                className="mr-2 items-start mt-2 "
              >
                <div className="flex flex-wrap items-center gap-y-4">
                  <div
                    className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap ${
                      index === caseIndex ? "text-white" : "text-gray-500"
                    }`}
                  >
                    Case {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="font-semibold my-4">
            <p className="text-sm font-medium mt-4 text-white">Input:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
              {example.inputText}
            </div>
            <p className="text-sm font-medium mt-4 text-white">Output:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
              {example.outputText}
            </div>
          </div>
        </div>
      </Split>
      <EditorFooter handleSubmit={handleSubmit} />
    </div>
  );
};

export default Playground;
