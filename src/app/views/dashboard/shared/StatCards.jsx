import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { Small } from 'app/components/Typography';
import { useNavigate } from 'react-router-dom';
import bellIcon from '../../../../assets/img/bell-alert.gif';
import { locale } from 'moment';
import { useEffect, useState } from 'react';
import useAuth from 'app/hooks/useAuth';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': {
    opacity: 0.6,
    fontSize: '44px',
    color: theme.palette.primary.main,
  },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const StatCards = () => {
  const { getCountList } = useAuth();
  const [count, setCount] = useState({});

  const navigate = useNavigate();
  const NotificationRoute = () => {
    navigate('/notification');
  };

  const findCount = async () => {
    try {
      const res = await getCountList();
      const { data } = res;
      setCount(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    findCount();
  }, []);

  const cardList = [
    { name: 'All Organization ', amount: count?.org_count, icon: 'group' },
    { name: 'All Volunteers', amount: count?.vol_count, icon: 'group' },
    {
      name: 'All Organization Campaigns',
      amount: count?.camp_count,
      icon: 'store',
    },
  ];
  const localData = localStorage.getItem('userdata');
  const user = JSON.parse(localData);

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      {user?.user_type == '2' && (
        <Grid item xs={12} md={12}>
          <StyledCard
            onClick={NotificationRoute}
            elevation={6}
            style={{
              minHeight: '400px',
              justifyContent: 'center',
              backgroundColor: '#5B1F6B',
            }}
          >
            <ContentBox>
              <img src={bellIcon} />
            </ContentBox>
          </StyledCard>
        </Grid>
      )}

      {cardList.map((item, index) => (
        <Grid item xs={12} md={6} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">
                <Small>{item.name}</Small>
                <Heading>{item.amount}</Heading>
              </Box>
            </ContentBox>

            <Tooltip title="View Details" placement="top">
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
