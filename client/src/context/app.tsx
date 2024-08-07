import { getAccessTokenFromLS, getProfileFromLS } from "@/lib/auth";
import { User } from "@/types/user.type";
import { createContext, useState } from "react";

interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  tag: string;
  setTag: React.Dispatch<React.SetStateAction<string>>;
  profile: User | null;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>;
  reset: () => void;
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  tag: "",
  setTag: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  reset: () => null,
};

export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialAppContext.isAuthenticated
  );
  const [profile, setProfile] = useState<User | null>(
    initialAppContext.profile
  );
  const [tag, setTag] = useState<string>(initialAppContext.tag);

  const reset = () => {
    setIsAuthenticated(false);
    setProfile(null);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        reset,
        setTag,
        tag,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
