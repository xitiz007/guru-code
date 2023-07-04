import useFullScreen from "@/hooks/useFullScreen";
import useSettings from "@/hooks/useSettings";
import {
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
  AiOutlineSetting,
} from "react-icons/ai";

type Props = {};

const Nav: React.FC<Props> = ({}) => {
  const { updateSettingsState } = useSettings();
  const { fullScreen, toggleFullScreen } = useFullScreen();

  return (
    <div className="flex items-center justify-between bg-dark-layer-2 h-11 w-full ">
      <button className="flex items-center rounded focus:outline-none bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2  px-2 py-1.5 font-medium">
        <span className="text-xs text-label-2 dark:text-dark-label-2">
          JavaScript
        </span>
      </button>

      <div className="flex items-center m-2">
        <button
          onClick={() => {
            updateSettingsState({ isModalOpen: true });
          }}
          className="preferenceBtn group"
        >
          <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
            <AiOutlineSetting />
          </div>
          <div className="preferenceBtn-tooltip">Settings</div>
        </button>

        <button className="preferenceBtn group" onClick={toggleFullScreen}>
          <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
            {fullScreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />}
          </div>
          <div className="preferenceBtn-tooltip">
            {fullScreen ? "Exit Full Screen" : "Full Screen"}
          </div>
        </button>
      </div>
    </div>
  );
};

export default Nav;
