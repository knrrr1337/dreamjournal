import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [loginFailed, setLoginFailed] = useState(false);
    const [user, setUser] = useState(null);
    const [canProceed, setCanProceed] = useState(false);
    const [rememberMe, setRememberMe] = useState(false)

    // const navigate = useNavigate()

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        // checkIfUserExists()
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (username, password, rememberMe, callback) => {
        try {
            axios.post("http://localhost:4400/account/login", { username, password }).then((response) => {
                const userData = response.data;

                if (userData.id !== undefined) { 
                    setUser(userData);
                    if (callback) {
                        callback();
                    }
                    if (rememberMe) {
                        localStorage.setItem("user", JSON.stringify(userData));
                    } else {
                        sessionStorage.setItem("user", JSON.stringify(userData));
                    }
                    setCanProceed(true);
                } else {
                    setLoginFailed(true);
                }
            }).catch((error) => console.log(error));
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
    };

    const checkIfUserExists = () => {
        if (!user) {
            logout()
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, canProceed, rememberMe, setRememberMe }}>
            {children}
            <Snackbar message="Login failed. Check credentials." autoHideDuration={3000} onClose={() => setLoginFailed(false)} open={loginFailed}></Snackbar>
        </AuthContext.Provider>
    );
}

