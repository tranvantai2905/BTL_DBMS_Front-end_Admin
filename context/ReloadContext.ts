import { createContext } from "react";

interface ReloadContextType {
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReloadContext = createContext<ReloadContextType>({
  reload: false,
  setReload: () => {},
});

export default ReloadContext;
