import { debounce } from "lodash";
import { useEffect, useState } from "react";

function useScreenSize() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

  const handleWindowSizeChange = debounce(() => {
    setIsMobile(window.innerWidth <= 500);
  }, 100);

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return isMobile;
};

export default useScreenSize;
