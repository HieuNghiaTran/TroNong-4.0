import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                setIsAuthenticated(true);
                const userInfo = await AsyncStorage.getItem('userInfo');
                setUser(JSON.parse(userInfo));
            }
        };
        checkAuthStatus();
    }, []);

    const login = async (user) => {
        await AsyncStorage.setItem('userToken', user._id);
        await AsyncStorage.setItem('userInfo', JSON.stringify(user));
        setUser(user);
        setIsLogin(true);
    }

    const logOut = async () => {

        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userInfo');
        setUser(null);
        setIsAuthenticated(false);

    }


    return (
        <UserContext.Provider value={{
            isLogin,
            user,
            login,
            logOut
        }}>
            {children}

        </UserContext.Provider>



    );
};

export { UserProvider }
