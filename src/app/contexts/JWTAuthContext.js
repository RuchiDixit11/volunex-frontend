import React, { createContext, useEffect, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios.js';
import { MatxLoading } from 'app/components';

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decodedToken = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('disasterToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('disasterToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case 'LOGIN': {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case 'REGISTER': {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case 'GET_REQUEST': {
      return {
        ...state,
        isAuthenticated: true,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: 'JWT',
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve(),
  getRequest: () => Promise.resolve(),
  addEvent: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password, user_type) => {
    const response = await axios.post('http://localhost:3300/api/auth/login', {
      email,
      password,
      user_type,
    });

    const { token, data } = response.data;
    console.log('token received', token, 'data::::', data);
    // localStorage.setItem('token', token);
    setSession(token);

    dispatch({
      type: 'LOGIN',
      payload: {
        data,
      },
    });
  };

  const getRequest = async () => {
    // const token =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4MWY0MGE1NDk2OGU4NzZhZjVmNjIyIn0sImlhdCI6MTcwMzEyNTQwNSwiZXhwIjoxNzAzMTMzODA1fQ.9qGp6emm1w7ErhETY8RLRTSiOxhexhWVyLecYCCQ_1s';
    const token = localStorage.getItem('disasterToken');

    const response = await axios.get('http://localhost:3300/api/user/filters', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-auth-token': `${token}`,
      },
    });
    const { data, msg } = response;
    console.log(data, '-----data----', msg);

    dispatch({
      type: 'GET_REQUEST',
      // payload: {
      //   user,
      // },
    });
  };

  const register = async (
    // email, username, password
    // user_type,
    // email,
    // password,
    // fullname,
    // gender,
    // dob,
    // phone,
    // address,
    // city,
    // state,
    // zip,
    // skills,
    // volunteer_experience,
    // languages_spoken,
    // emergency_contact,
    // short_bio
    payload
  ) => {
    const response = await axios.post('http://localhost:3300/api/auth/signup', payload);
    console.log(response, 'response sigup ');
    // const { accessToken, user } = response.data;

    // setSession(accessToken);

    // dispatch({
    //   type: 'REGISTER',
    //   payload: {
    //     user,
    //   },
    // });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const addEvent = async (payload) => {
    const token = localStorage.getItem('disasterToken');
    const response = await axios.post('http://localhost:3300/api/user/add_event', payload, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-auth-token': `${token}`,
      },
    });
    console.log(response, 'response sigup ');
    // const { accessToken, user } = response.data;
    return response;
    // setSession(accessToken);

    // dispatch({
    //   type: 'ADD_EVENT',
    //   payload: {
    //     user,
    //   },
    // });
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await axios.get('/api/auth/profile');
          const { user } = response.data;

          dispatch({
            type: 'INIT',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INIT',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INIT',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    })();
  }, []);

  if (!state.isInitialised) {
    return <MatxLoading />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'JWT',
        login,
        logout,
        register,
        getRequest,
        addEvent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
