import { settingsState } from "@/atoms/settings";
import Modal from "..";
import { useRecoilValue } from "recoil";
import { ChangeEvent } from "react";
import useSettings from "@/hooks/useSettings";
import useLocalStorage from "@/hooks/useLocalStorage";

type Props = {};

const options = [13, 14, 15, 16, 17, 18, 19, 20];

const Settings: React.FC<Props> = ({}) => {
  const { updateSettingsState } = useSettings();
  const [_, setFontSize] = useLocalStorage("fontSize", "14");
  const { fontSize } = useRecoilValue(settingsState);
  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    updateSettingsState({ fontSize: Number(event.target.value) });
    setFontSize(event.target.value);
  };

  return (
    <Modal title="Settings">
      <div className="flex items-start justify-between text-black">
        <div className="space-y-2">
          <h2 className="font-semibold text-lg">Font Size</h2>
          <p className="text-sm font-medium">
            Choose your preferred font size for the code editor.Choose your
            preferred font size for the code editor.
          </p>
        </div>
        <select
          className="w-[200px] rounded-sm border-gray-300"
          name="fontSize"
          id="fontSize"
          defaultValue={Number(fontSize)}
          onChange={onChangeHandler}
        >
          {options.map((option) => (
            <option key={option} value={option} className="p-2">
              {option + " px"}
            </option>
          ))}
        </select>
      </div>
    </Modal>
  );
};

export default Settings;
