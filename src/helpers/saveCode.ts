import { firestore } from "@/firebase";
import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { debounce } from "lodash";

export const userSaveCode = debounce(
  async (user: User, id: string, code: string) => {
    const userRef = doc(firestore, "users", user.uid);
    const userSnapshot = await getDoc(userRef);
    if (!userSnapshot.exists()) return;
    const userData = userSnapshot.data();
    userData.code = (userData.code || []) as Array<object>;
    const index = userData.code.findIndex(
      (code: { id: string }) => code.id === id
    );
    if (index !== -1) {
      userData.code[index].code = code;
    } else {
      userData.code.push({ id, code });
    }
    setDoc(userRef, userData);
  },
  1000
);

export const getCodeFromFirestore = async (
  user: User,
  id: string
): Promise<string | null> => {
  try {
    const userRef = doc(firestore, "users", user.uid);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const codeObject = userData.code.find(
        (code: { id: string; code: string }) => code.id === id
      );
      return codeObject ? codeObject.code : null;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
