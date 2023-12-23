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

const setSession = (accessToken, data) => {
  console.log(data, 'dataa set');
  if (accessToken) {
    localStorage.setItem('disasterToken', accessToken);
    localStorage.setItem('user_id', data?._id);
    localStorage.setItem('user_type', data?.user_type);
    localStorage.setItem('userdata', JSON.stringify(data));
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
      return {
        ...state,
        isAuthenticated: false,
        user: null,
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
  editEvent: () => Promise.resolve(),
  sendRequest: () => Promise.resolve(),
  getCampaigns: () => Promise.resolve(),
  getCountList: () => Promise.resolve(),
  allOrgList: () => Promise.resolve(),
  searchVolunteer: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const token = localStorage.getItem('disasterToken');
  const orgId = localStorage.getItem('user_id');
  const base_url = process.env.REACT_APP_API_URL;

  const login = async (email, password, user_type) => {
    const response = await axios.post(`${base_url}/api/auth/login`, {
      email,
      password,
      user_type,
    });

    const { token, data } = response.data;
    console.log('token received', token, 'data::::', data);
    setSession(token, data);

    dispatch({
      type: 'LOGIN',
      payload: {
        data,
      },
    });
  };

  const getRequest = async () => {
    const token = localStorage.getItem('disasterToken');

    const response = await axios.get(`${base_url}/api/user/filters`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-auth-token': `${token}`,
      },
    });
    const { data, msg } = response;
    console.log(data, '<-----data', msg);

    dispatch({
      type: 'GET_REQUEST',
      // payload: {
      //   user,
      // },
    });
  };

  const getCountList = async () => {
    const token = localStorage.getItem('disasterToken');
    const orgId = localStorage.getItem('user_id');
    const response = await axios.get(`${base_url}/api/user/count_list`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-auth-token': `${token}`,
      },
    });
    const { data } = await response;
    console.log(data, '<-----data COUNT');
    return data;
  };

  const getVolunteerList = async () => {
    const token = localStorage.getItem('disasterToken');
    const orgId = localStorage.getItem('user_id');
    const response = await axios.get(`${base_url}/api/user/volunteer_list`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-auth-token': `${token}`,
      },
    });
    const { data } = await response;
    console.log(data, '<----volunteeer');
    return data;
  };

  const allEventList = async () => {
    const response = axios.get(`${base_url}/api/event/all_event_list`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-auth-token': `${token}`,
      },
    });
    const { data } = await response.json();
    console.log(data, '<-----data EVENT LIST');
    return data;
  };

  const allOrgList = async () => {
    const response = axios.get(`${base_url}/api/user/org_list`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-auth-token': `${token}`,
      },
    });
    const { data } = await response;
    console.log(data, '<-----data ORG LIST');
    return data;
  };

  const getCampaigns = async () => {
    const orgId = localStorage.getItem('user_id');
    const response = await axios.get(`${base_url}/api/event/event_list?org_id=${orgId}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-auth-token': `${token}`,
      },
    });
    const { data } = await response.json();
    console.log(data, '<-----data campaign');
    return data;
  };

  const register = async (payload) => {
    const response = await axios.post(`${base_url}/api/auth/signup`, payload);
    console.log(response, 'response sigup ');
    return response;
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const addEvent = async (payload) => {
    const token = localStorage.getItem('disasterToken');
    const response = await axios.post(`${base_url}/api/event/add_event`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-auth-token': `${token}`,
      },
    });
    return response;
  };

  const sendRequest = async (payload) => {
    const token = localStorage.getItem('disasterToken');
    const response = await axios.post(`${base_url}/api/user/send_notification`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-auth-token': `${token}`,
      },
    });

    return response;
  };

  const editEvent = async (payload) => {
    const token = localStorage.getItem('disasterToken');
    const response = await axios.patch(`${base_url}/api/event/event_update`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-auth-token': `${token}`,
      },
    });
    console.log(response, 'response');
    return response;
  };

  const deleteEvent = async (event_id) => {
    const token = localStorage.getItem('disasterToken');
    const response = await axios.delete(`${base_url}/api/event/delete_event/${event_id}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-auth-token': `${token}`,
      },
    });
    console.log(response, 'response');
    return response;
  };

  const searchVolunteer = async (id) => {
    const token = localStorage.getItem('disasterToken');
    const response = await axios.get(`${base_url}/api/user/filters?skill_id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-auth-token': `${token}`,
      },
    });
    const data = response;

    console.log(data, 'fffff searchVolunteer');
    return data;
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem('disasterToken');

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
        editEvent,
        deleteEvent,
        sendRequest,
        getCampaigns,
        getCountList,
        allEventList,
        allOrgList,
        getVolunteerList,
        searchVolunteer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
