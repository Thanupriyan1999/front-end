import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface UserInfo {
  // Define the properties of your user info here
  // Example:
  name?: string;
  email?: string;
}

interface UserContextProps {
  userInfo: UserInfo;
  setUserInfo: Dispatch<SetStateAction<UserInfo>>;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserContextProviderProps {
  children: ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [userInfo, setUserInfo] = useState<UserInfo>({});

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
