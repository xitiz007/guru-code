import { useEffect, useState } from "react";

const useFullScreen = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const toggleFullScreen = () => {
    fullScreen ? exitFullScreen() : enterFullScreen();
  };

  const enterFullScreen = () => {
    const element = document.documentElement as any;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      const fullScreenElement =
        document.fullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).msFullscreenElement;
      setFullScreen(!!fullScreenElement);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "F11") {
        handleFullScreenChange();
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("msfullscreenchange", handleFullScreenChange);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return { fullScreen, toggleFullScreen };
};

export default useFullScreen;
