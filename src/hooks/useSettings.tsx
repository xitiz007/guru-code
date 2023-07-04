import { SettingsProps, settingsState } from "@/atoms/settings";
import { useSetRecoilState } from "recoil";

const useSettings = () => {
  const setSettingsState = useSetRecoilState(settingsState);
  const updateSettingsState = (args: SettingsProps) => {
    setSettingsState((state) => ({ ...state, ...args }));
  };
  return { updateSettingsState };
};

export default useSettings;
