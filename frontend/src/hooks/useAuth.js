import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (data) => {
    setUser(data);
    navigate('/profile');
    setLoading(false);
  };

  const removeUser = () => {
    setUser(null);
  }

  const changeUserAvatar = (avatar) => {
    setUser(prev => ({ ...prev, avatar: avatar }));
  }

  const logout = () => {
    setUser(null);
    Cookies.remove('Access_token');
    Cookies.remove('Refresh_token');
    navigate('/login', { replace: true });
  };
  
  const refreshToken = async () => {
    try {
      const response = await axios.get(`/api/v1/protected-route`, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('Access_token')}`,
          'Refresh-Token': Cookies.get('Refresh_token')
        }
      });
      const { userData } = response.data;
      setUser(userData);
    } catch (error) {
      console.error("Failed to refresh token", error);
      logout();
    }
  };

  useEffect(() => {
    if (Cookies.get('Refresh_token')) {
        refreshToken().then(() => setLoading(false));
    } else {
        setUser(null)
        setLoading(false)
    }
  }, []);

  const value = useMemo(() => ({
    user,
    login,
    logout,
    refreshToken,
    removeUser,
    changeUserAvatar,
    loading,
  }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
