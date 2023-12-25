import { Card, Grid } from '@mui/material';
import useNotification from 'app/hooks/useNotification';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Notification = () => {
  //   const { deleteNotification, clearNotifications, notifications, getNotifications } =
  //     useNotification();
  const [notifications, setNotifications] = useState();
  const getNotifications = async () => {
    const volunteer_id = localStorage.getItem('user_id');
    const base_url = process.env.REACT_APP_API_URL;
    try {
      const res = await axios.get(
        `${base_url}/api/user/get_notification?volunteer_id=${volunteer_id}`
      );
      console.log('  fdgdfgfdgfd ', res);
      const { eventInfo } = res?.data;
      setNotifications(eventInfo);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  console.log(notifications, 'notifications');
  return (
    <>
      <div style={{ padding: '20px' }}>
        <h3 style={{ marginBottom: '20px' }}>Notification</h3>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {notifications &&
              notifications?.map((notification) => (
                <Card className="notification-data" sx={{ maxWidth: '100%', px: 4, py: 2, mb: 3 }}>
                  <div>
                    <div></div>
                    <div>
                      <h6 className="notification-title">Hey! you have notification.</h6>
                      <p>{notification?.notes}</p>
                    </div>
                  </div>
                </Card>
              ))}
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default Notification;
