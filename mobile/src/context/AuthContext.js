import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "expo-async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("userToken");
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (err) {
      console.error("Failed to restore token:", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      setUser(null);
      setToken(null);
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  const contextValue = {
    user,
    setUser,
    token,
    setToken,
    loading,
    error,
    setError,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
