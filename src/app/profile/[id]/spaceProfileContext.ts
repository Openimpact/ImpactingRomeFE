import { createContext, useContext } from "react";

export const spaceProfileContext = createContext({}as any);
export const useSpaceProfileContext = () => useContext(spaceProfileContext);