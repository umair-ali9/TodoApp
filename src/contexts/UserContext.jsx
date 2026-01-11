import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("todo_user");
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("todo_user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("todo_user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};