import { createContext, useState } from "react";

const UserContext = createContext({});

export default UserContext;

export function UserProvider({ children }) {

  const localData = JSON.parse(localStorage.getItem("Linkr"));

  const [token, setToken] = useState(() => {
    return (localData?.token) ? localData.token : null;
  });

  delete localData?.token;

  const [user, setUser] = useState(() => {
    return (localData) ? localData : null;
  });

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
}