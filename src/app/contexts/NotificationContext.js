import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_NOTIFICATIONS': {
      return {
        ...state,
        notifications: action.payload,
      };
    }
    case 'DELETE_NOTIFICATION': {
      return {
        ...state,
        notifications: action.payload,
      };
    }
    case 'CLEAR_NOTIFICATIONS': {
      return {
        ...state,
        notifications: action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const NotificationContext = createContext({
  notifications: [],
  deleteNotification: () => {},
  clearNotifications: () => {},
  getNotifications: () => {},
  createNotification: () => {},
});

export const NotificationProvider = ({ settings, children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  const deleteNotification = async (notificationID) => {
    try {
      const res = await axios.post('/api/notification/delete', {
        id: notificationID,
      });
      dispatch({
        type: 'DELETE_NOTIFICATION',
        payload: res.data,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const clearNotifications = async () => {
    try {
      const res = await axios.post('/api/notification/delete-all');
      dispatch({
        type: 'CLEAR_NOTIFICATIONS',
        payload: res.data,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const getNotifications = async () => {
    const volunteer_id = localStorage.getItem('user_id');
    const base_url = process.env.REACT_APP_API_URL;
    try {
      const res = await axios.get(
        `${base_url}/api/user/get_notification?volunteer_id=${volunteer_id}`
      );
      dispatch({
        type: 'LOAD_NOTIFICATIONS',
        payload: res.data,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const createNotification = async (notification) => {
    try {
      const res = await axios.post('/api/notification/add', {
        notification,
      });
      dispatch({
        type: 'CREATE_NOTIFICATION',
        payload: res.data,
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications: state.notifications,
        deleteNotification,
        clearNotifications,
        getNotifications,
        createNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
