import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  Icon,
  IconButton,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';

import Button from '@mui/material/Button';
import { Paragraph } from 'app/components/Typography';
import { Breadcrumb, SimpleCard } from 'app/components';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CreateCampaign from './CreateCampaign';
import useAuth from 'app/hooks/useAuth';
import fetch from 'cross-fetch';
import { Link } from 'react-router-dom';
import EditCampaign from './EditCampaign';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: 'pre',
  '& small': {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
  },
  '& td': { borderBottom: 'none' },
  '& td:first-of-type': { paddingLeft: '16px !important' },
}));

const Small = styled('small')(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  overflow: 'hidden',
  background: bgcolor,
  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}));

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));
const Campaigns = () => {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;
  const [open, setOpen] = React.useState(false);
  const [campaignsList, setCampaignList] = useState([]);
  const { getRequest, deleteEvent } = useAuth();
  const [openEditCampaign, setOpenEditCampaign] = useState(false);
  const token = localStorage.getItem('disasterToken');
  const orgId = localStorage.getItem('user_id');
  const userType = localStorage.getItem('user_type');
  const [openDeleteCampaign, setOpenDeleteCampaign] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEditCampaign = () => {
    setOpenEditCampaign(false);
  };

  const handleDeleteCampaign = (event_id) => {
    try {
      deleteEvent(event_id);
    } catch (error) {
      return error;
    }
    setOpenDeleteCampaign(false);
  };

  React.useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3300/api/event/event_list?org_id=${orgId}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          mode: 'no-cors',
          'x-auth-token': `${token}`,
        },
      });
      const { data } = await response.json();
      setCampaignList(data);
    })();
  }, []);

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Dashboard', path: '/' }, { name: 'Campaigns' }]} />
      </Box>
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
        }}
      >
        <Button variant="outlined" onClick={handleClickOpen} sx={{ mb: 4 }}>
          Create Campaign
        </Button>
      </div>
      <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
        <CardHeader>
          <Title>Campaigns List</Title>
        </CardHeader>

        <Box overflow="auto">
          <ProductTable>
            <TableHead>
              <TableRow>
                <TableCell sx={{ px: 3 }} colSpan={4}>
                  Campaigns Name
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={2}>
                  Date
                </TableCell>
                <TableCell sx={{ px: 3 }} colSpan={4}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {campaignsList &&
                campaignsList?.map((cam, index) => (
                  <TableRow key={index} hover>
                    <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                      <Box display="flex" alignItems="center">
                        <Paragraph sx={{ m: 0, ml: 4 }}>{cam?.event_name}</Paragraph>
                      </Box>
                    </TableCell>

                    <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                      {cam?.from_date}
                    </TableCell>

                    <TableCell sx={{ px: 3 }} colSpan={4}>
                      <IconButton>
                        <Icon color="primary" onClick={() => setOpenEditCampaign(true)}>
                          edit
                        </Icon>
                      </IconButton>

                      {/* open dialog for edit campaigns */}

                      <Dialog
                        open={openEditCampaign}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleCloseEditCampaign}
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <DialogTitle>{'Edit Campaigns'}</DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-slide-description">
                            <EditCampaign
                              eventId={cam?._id}
                              handleClose={handleCloseEditCampaign}
                            />
                          </DialogContentText>
                        </DialogContent>
                      </Dialog>

                      <IconButton>
                        <Icon color="primary" onClick={() => setOpenDeleteCampaign(true)}>
                          remove
                        </Icon>
                      </IconButton>
                      <Button variant="outlined">
                        <Link to={'/volunteers'}>Find Volunteers </Link>
                      </Button>

                      {/* open dialog for delete campaigns */}

                      <Dialog
                        open={openDeleteCampaign}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={() => setOpenDeleteCampaign(false)}
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <DialogTitle>{'Delete Campaigns'}</DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-slide-description">
                            Do you want to delete the campaign ?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => setOpenDeleteCampaign(false)} color="primary">
                            Disagree
                          </Button>
                          <Button onClick={() => handleDeleteCampaign(cam?._id)} color="primary">
                            Agree
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </ProductTable>
        </Box>
      </Card>
      {/* Open dialog for create campaigns */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Create Campaign'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <CreateCampaign handleClose={handleClose} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

const productList = [
  {
    imgUrl: '/assets/images/products/headphone-2.jpg',
    name: 'earphone',
    skill: 100,
    location: 15,
  },
  {
    imgUrl: '/assets/images/products/headphone-3.jpg',
    name: 'earphone',
    skill: 1500,
    location: 30,
  },
  {
    imgUrl: '/assets/images/products/iphone-2.jpg',
    name: 'iPhone x',
    skill: 1900,
    location: 35,
  },
  {
    imgUrl: '/assets/images/products/iphone-1.jpg',
    name: 'iPhone x',
    skill: 100,
    location: 0,
  },
  {
    imgUrl: '/assets/images/products/headphone-3.jpg',
    name: 'Head phone',
    skill: 1190,
    location: 5,
  },
];

export default Campaigns;
