import { useEffect, useState } from "react";

export type Breakpoint = 320 | 480 | 768 | 992 | 1024 | 1280 | 1440 | 1920;

const useBreakpointListener = (breakpoint: Breakpoint) => {
  const [breakpointReached, setBreakpointReached] = useState(
    window.innerWidth < breakpoint
  );

  useEffect(() => {
    const handleResize = () => {
      setBreakpointReached(window.innerWidth <= breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return breakpointReached;
};

export default useBreakpointListener;
