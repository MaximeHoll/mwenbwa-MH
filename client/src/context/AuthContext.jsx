import React, { useMemo, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";


const AuthContext = React.createContext()

export const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                isLoggedIn: true,
                authUser: action.payload
            }
        case 'LOGOUT':
            return {
                isLoggedIn: false,
                authUser: ""
            }
        default :
            return state
    }
}




export function AuthProvider({children}) {
    // const [authUser, setAuthUser] = useState(null)
    // const [isLoggedIn, setIsLoggedIn] = useState(false)

    // const value = {
    //     authUser,
    //     setAuthUser,
    //     isLoggedIn,
    //     setIsLoggedIn
    // }

    // const [state, dispatch] = useReducer(authReducer, {
    //     isLoggedIn: false,
    //     authUser: ""
    // })

    const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data) => {
    setUser(data);
    navigate("/user/profile");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>

    )
}

export function useAuth() {
    return useContext(AuthContext)
}