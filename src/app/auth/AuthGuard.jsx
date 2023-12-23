import useAuth from 'app/hooks/useAuth';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  let { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  const token = localStorage.getItem('disasterToken');
  useEffect(() => {
    console.log('token ,', token);
  }, [token]);

  let authenticated = isAuthenticated;

  return (
    <>
      {authenticated ? (
        children
      ) : (
        <Navigate replace to="/session/signin" state={{ from: pathname }} />
      )}
    </>
  );
};

export default AuthGuard;
