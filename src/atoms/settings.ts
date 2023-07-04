import useLocalStorage from "@/hooks/useLocalStorage";
import useSettings from "@/hooks/useSettings";
import { useEffect } from "react";
import { atom } from "recoil";

export interface Settings {
  fontSize: number;
  isModalOpen: boolean;
}

export interface SettingsProps {
  fontSize?: number;
  isModalOpen?: boolean;
}

export const initialSettingsState: Settings = {
  fontSize: 14,
  isModalOpen: false,
};

export const settingsState = atom({
  key: "settingsState",
  default: initialSettingsState,
});

export const SettingsProvider = () => {
  const [fontSize] = useLocalStorage("fontSize", "14");
  const { updateSettingsState } = useSettings();

  useEffect(() => {
    updateSettingsState({ fontSize: Number(fontSize) });
  }, [fontSize]);

  return null;
};
