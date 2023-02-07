import React, { useState, useEffect, useContext, useReducer } from "react";


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

export function useAuth() {
    return useContext(AuthContext)
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

    const [state, dispatch] = useReducer(authReducer, {
        isLoggedIn: false,
        authUser: ""
    })


    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>

    )
}