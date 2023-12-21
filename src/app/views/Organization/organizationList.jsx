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
import { Paragraph } from 'app/components/Typography';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useEffect } from 'react';
import useAuth from 'app/hooks/useAuth';
import fetch from 'cross-fetch';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));
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

const OrganizationList = () => {
  const { palette } = useTheme();
  const { getRequest } = useAuth();

  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;

  const getOrganizationsList = async () => {
    try {
      const res = await getRequest();
      console.log(' getRequest()::::', res);
      // navigate('/');
    } catch (e) {
      // setLoading(false);
      console.log(e, 'getRequest error');
    }
  };

  useEffect(() => {
    getOrganizationsList();
  }, []);
  // -----------
  function sleep(delay = 0) {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }
  const token = localStorage.getItem('disasterToken');
  useEffect(() => {
    (async () => {
      console.log('disasterToken', token);
      const response = await fetch(
        'http://localhost:3300/api/event/event_list?org_id=657afa9d2ab2dd6ae80b76e1',
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            mode: 'no-cors',
            'x-auth-token': `${token}`,
            // 'x-auth-token':
            //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3OWFiZTQ0NDNmYmNmOGE0ZmIzZjE0In0sImlhdCI6MTcwMjQ3NzE4OSwiZXhwIjoxNzAyNDg1NTg5fQ.4uTAF9w0wRGUgN2G-uSMTymwRkDLUKEr8aBfIeZmy4w',
          },
        }
      );
      await sleep(3000); // For demo purposes.
      const countries = await response.json();
      console.log('REsssss: ' + countries);
      // if (active) {
      //   setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
      // }
    })();

    return () => {
      console.log('Active false');
      // active = false;
    };
  }, []);

  // -----------
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Dashboard', path: '/' }, { name: 'Organization' }]} />
      </Box>
      <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
        <CardHeader>
          <Title>Register Organization List</Title>
          <Select size="small" defaultValue="this_month">
            <MenuItem value="this_month">This Month</MenuItem>
            <MenuItem value="last_month">Last Month</MenuItem>
          </Select>
        </CardHeader>

        <Box overflow="auto">
          <ProductTable>
            <TableHead>
              <TableRow>
                <TableCell sx={{ px: 3 }} colSpan={4}>
                  Organization Name
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={2}>
                  no of volunteers
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={2}>
                  Organization Location
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={1}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {productList.map((product, index) => (
                <TableRow key={index} hover>
                  <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                    <Box display="flex" alignItems="center">
                      <Avatar src={product.imgUrl} />
                      <Paragraph sx={{ m: 0, ml: 4 }}>{product.name}</Paragraph>
                    </Box>
                  </TableCell>

                  <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                    {product.volunteers > 999
                      ? (product.volunteers / 1000).toFixed(1) + ''
                      : product.volunteers}
                  </TableCell>

                  <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                    {product.location ? (
                      product.location < 20 ? (
                        <Small bgcolor={bgSecondary}>{product.location} location</Small>
                      ) : (
                        <Small bgcolor={bgPrimary}>in stock</Small>
                      )
                    ) : (
                      <Small bgcolor={bgError}>out of stock</Small>
                    )}
                  </TableCell>

                  <TableCell sx={{ px: 0 }} colSpan={1}>
                    <IconButton>
                      <Icon color="primary">edit</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </ProductTable>
        </Box>
      </Card>
    </Container>
  );
};

const productList = [
  {
    imgUrl: '/assets/images/products/headphone-2.jpg',
    name: 'earphone',
    volunteers: 100,
    location: 15,
  },
  {
    imgUrl: '/assets/images/products/headphone-3.jpg',
    name: 'earphone',
    volunteers: 1500,
    location: 30,
  },
  {
    imgUrl: '/assets/images/products/iphone-2.jpg',
    name: 'iPhone x',
    volunteers: 1900,
    location: 35,
  },
  {
    imgUrl: '/assets/images/products/iphone-1.jpg',
    name: 'iPhone x',
    volunteers: 100,
    location: 0,
  },
  {
    imgUrl: '/assets/images/products/headphone-3.jpg',
    name: 'Head phone',
    volunteers: 1190,
    location: 5,
  },
];

export default OrganizationList;
