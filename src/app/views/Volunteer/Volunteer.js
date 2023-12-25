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
  Checkbox,
  Button,
} from '@mui/material';
import { Paragraph } from 'app/components/Typography';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useEffect, useState } from 'react';
import EnhancedTable from './VolunteerTable';
import useAuth from 'app/hooks/useAuth';

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
const VolunteerList = () => {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;
  const [filteredData, setFilteredData] = useState([]);
  const [volData, setVolData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState('1');
  const token = localStorage.getItem('disasterToken');
  const [isChecked, setIsChecked] = useState(false);
  const { sendRequest, getVolunteerList, searchVolunteer } = useAuth();

  const handleIsChecked = (name) => (event) => {
    console.log('Checking ', name);
    // setState({ ...state, [name]: event.target.checked });
    setIsChecked(event.target.checked);
  };

  const filtereApi = async () => {
    const response = await searchVolunteer(selectedItemId);
    const { data, msg } = response;

    setFilteredData(data.data);
  };

  const handleChange = async (event) => {
    console.log('eveeed: handleChange', event.target.value);
    setSelectedItemId(event.target.value);
  };

  useEffect(() => {
    if (!!selectedItemId.length) {
      filtereApi();
    }
  }, [selectedItemId]);
  const handleSendRequest = async (v_id, message, setOpenCampaignMessage) => {
    const orgId = localStorage.getItem('user_id');
    const payload = {
      org_id: orgId,
      campaign_id: '65843fe45cb75b6b569dbdc6',
      volunteer_id: v_id,
      notes: message, //'Please Join us',
    };

    const volunteer_id = JSON.stringify(v_id);
    const formData = new FormData();
    formData.append('org_id', orgId);
    formData.append('campaign_id', '65843fe45cb75b6b569dbdc6');
    formData.append('volunteer_id', volunteer_id);
    formData.append('notes', message);

    try {
      const response = sendRequest(formData);
      const { data } = await response.json();
      console.log('Send request .... ' + data);
      setOpenCampaignMessage(false);
    } catch (e) {
      console.log('error', e);
    }
    setOpenCampaignMessage(false);
  };

  const getAllVolunteers = async () => {
    try {
      const res = await getVolunteerList();
      console.log(' getVolunteerList :::::::', res);
      const { data } = res;
      setFilteredData(data);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getAllVolunteers();
  }, []);

  console.log('filteredData  ', filteredData);

  // const getAllVolunteers = async () => {
  //   try {
  //     const res = await getVolunteerList();
  //     console.log(res, 'ffffffffff');
  //     const data = await res.json();
  //     console.log('getVolunteerList :::::', res, 'hghghjjh', data);
  //   } catch (error) {
  //     return error;
  //   }
  // };

  // useEffect(() => {
  //   getAllVolunteers();
  // }, []);

  console.log('filteredData :::::', filteredData);
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Dashboard', path: '/' }, { name: 'Volunteer' }]} />
      </Box>
      <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
        <CardHeader>
          <Title>Volunteer List</Title>
          <Select
            size="small"
            defaultValue="Swimming"
            value={selectedItemId}
            onChange={handleChange}
          >
            <MenuItem value="1">Swimming </MenuItem>
            <MenuItem value="2">Mountain climber</MenuItem>
            <MenuItem value="3">Fire&Safety</MenuItem>
          </Select>
        </CardHeader>
        <EnhancedTable handleSendRequest={handleSendRequest} data={filteredData} />
      </Card>
    </Container>
  );
};

export default VolunteerList;
