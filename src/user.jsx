import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));
    const [user, setUser] = useState(null);

    const getUserData = () => {
        if (userToken != null) {
            const decoded = jwtDecode(userToken);
            setUser(decoded);
        }
    }
    useEffect(() => {
        getUserData();
    }, [userToken])

    return <UserContext.Provider value={{ user, setUser, userToken, setUserToken }}>
        {children}
    </UserContext.Provider>
}

export default UserContextProvider;