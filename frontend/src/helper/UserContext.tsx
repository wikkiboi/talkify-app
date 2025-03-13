import React, { createContext, useState, useContext, ReactNode } from "react";

// Define types for your context state
interface UserInfo {
  username: string;
  status: "online" | "offline" | "idle";
}

// Create the context with a default value (could be null or an empty object)
const UserContext = createContext<
  | {
      userInfo: UserInfo;
      setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
    }
  | undefined
>(undefined);

// Context Provider Component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: "",
    status: "offline",
  });

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access context values
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
