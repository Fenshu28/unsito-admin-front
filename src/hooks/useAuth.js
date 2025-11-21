import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                // Decode the token to get user information, including roles
                const decodedToken = jwtDecode(token);
                
                // Check if token is expired
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp > currentTime) {
                    setUser(decodedToken);
                } else {
                    // Token is expired, remove it
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
        } catch (error) {
            console.error("Failed to decode token:", error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // A function to check if the user has a specific role
    const hasRole = (role) => {
        if (!user || !user.roles) {
            return false;
        }
        return user.roles.includes(role);
    };

    return { user, isLoading, hasRole };
};

export default useAuth;
