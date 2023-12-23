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
import { useEffect, useState } from 'react';
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
  const { allOrgList } = useAuth();
  const [orgData, setOrgData] = useState([]);

  const getOrganizationsList = async () => {
    try {
      const res = await allOrgList();
      console.log(' allOrgList :::::::', res);
      const orgs = res.data;
      setOrgData(orgs);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getOrganizationsList();
  }, []);
  console.log('data orgData', orgData);

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Dashboard', path: '/' }, { name: 'Organization' }]} />
      </Box>
      <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
        <CardHeader>
          <Title>Register Organization </Title>
        </CardHeader>

        <Box overflow="auto">
          <ProductTable>
            <TableHead>
              <TableRow>
                <TableCell sx={{ px: 3 }} colSpan={4}>
                  #
                </TableCell>
                <TableCell sx={{ px: 3 }} colSpan={4}>
                  Name
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={2}>
                  No of volunteers
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={2}>
                  Location
                </TableCell>
                {/* <TableCell sx={{ px: 0 }} colSpan={1}>
                  Action
                </TableCell> */}
              </TableRow>
            </TableHead>

            <TableBody>
              {orgData?.length &&
                orgData?.map((org, index) => (
                  <TableRow key={index} hover>
                    <TableCell align="left" colSpan={4}>
                      {index + 1}
                    </TableCell>
                    <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                      <Box display="flex" alignItems="center">
                        {/* <Avatar src={org.imgUrl} /> */}
                        <Paragraph sx={{ m: 0, ml: 4 }}>{org?.organization_name}</Paragraph>
                      </Box>
                    </TableCell>

                    <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                      {org?.organization_employees > 999
                        ? (org?.organization_employees / 1000).toFixed(1) + ''
                        : org?.organization_employees}
                    </TableCell>

                    <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                      {org?.organization_address}
                    </TableCell>

                    {/* <TableCell sx={{ px: 0 }} colSpan={1}>
                      <IconButton>
                        <Icon color="primary">edit</Icon>
                      </IconButton>
                    </TableCell> */}
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
