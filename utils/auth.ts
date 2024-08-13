// utils/auth.ts
import Cookies from 'js-cookie';

export const getToken = () => Cookies.get('access_token');

export const logout = () => {
    Cookies.remove('access_token');
    localStorage.removeItem('user');
    // Redirect to login page or home
  };