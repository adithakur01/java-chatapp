import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setAuthUser(null);
        setRegistered(false);
        setLoading(false);
        return;
      }

      setAuthUser(currentUser);
      setLoading(true);

      try {
        const token = await currentUser.getIdToken();
        const res = await fetch("http://localhost:8080/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRegistered(res.ok);
      } catch (err) {
        setRegistered(false);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, user: authUser, registered, setRegistered, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);