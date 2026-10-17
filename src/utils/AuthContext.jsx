import { UseGetMe } from "@/features/auth/hooks/useAuth";
import { createContext, useContext } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { data: user, isPending } = UseGetMe();

  const value = {
    isAuthPending: !!user && isPending,
    user: user,
    isUserNotLogin: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam AuthProvider");
  return ctx;
};
