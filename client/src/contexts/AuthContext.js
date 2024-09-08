import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  const register = (userData) => {
    localStorage.setItem("authToken", userData.jwt);
    localStorage.setItem("authId", userData.user.id);
  };

  const login = (userData) => {
    localStorage.setItem("authToken", userData.jwt);
    localStorage.setItem("authId", userData.userId);

    setAuthData(userData);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authId");

    window.location.reload();
  };

  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(max-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        matches,
        authData,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
