import { createContext, FC, useState } from "react";

interface UserInfo {
  id: any;
  email: string;
  name: string;
}

interface UserContextType {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

interface UserContextProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<UserContextType>({
  userInfo: {
    id: "",
    email: "",
    name: "",
  },
  setUserInfo: () => {},
});

const UserContextProvider: FC<UserContextProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    name: "",
    id: "",
  });

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
