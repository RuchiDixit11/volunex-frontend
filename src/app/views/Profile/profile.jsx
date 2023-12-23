import { Box, Card, styled, useTheme } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import Logo from '../../../assets/img/mylog.png';
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));
const Profile = () => {
  const { palette } = useTheme();
  const localData = localStorage.getItem('userdata');
  const user = JSON.parse(localData);
  console.log(user, 'userdata');
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Dashboard', path: '/' }, { name: 'Profile' }]} />
      </Box>
      <Card elevation={3} sx={{ pt: '20px', mb: 3 }} style={{ backgroundColor: '#ddd' }}>
        <div className="my-profile">
          <div class="box">
            <div id="overlay">
              {/* <div>
                <img className="img-fluid"  style={{maxS}}src={Logo} alt="org name" />
              </div> */}
              <div class="image">
                <div class="trick"></div>
              </div>
              <ul class="text">
                {user?.user_type === '1' ? user?.organization_name : user?.fullname}
              </ul>
              <div style={{ marginBottom: '20px ' }} class="text1">
                {user?.email}
              </div>
              <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                <div class="panel panel-default">
                  <div class="panel-heading " role="tab" id="headingOne">
                    <h4 class="panel-title ">
                      <a
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#collapseOne"
                        aria-expanded=""
                        aria-controls="collapseOne"
                      >
                        <div class="title  btn btn-danger btn-outline btn-lg">ABOUT </div>
                      </a>
                    </h4>
                  </div>
                  <div
                    id="collapseOne"
                    class="panel-collapse collapse in"
                    role="tabpanel"
                    aria-labelledby="headingOne"
                  >
                    <div class="panel-body">
                      {' '}
                      <div style={{ marginBottom: '20px' }}>
                        <div>About:-</div>
                        {user?.user_type === '1'
                          ? user?.organization_mission
                          : user?.short_bio}{' '}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>No of employees </span>{' '}
                        <b> {user?.user_type === '1' ? user?.organization_employees : ''} </b>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="panel panel-default">
                  <div class="panel-heading" role="tab" id="headingTwo">
                    <h4 class="panel-title">
                      <a
                        class="collapsed"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        <div class="title btn btn-danger btn-outline btn-lg">Location</div>
                      </a>
                    </h4>
                  </div>
                  <div
                    id="collapseTwo"
                    class="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="headingTwo"
                  >
                    <div class="panel-body">
                      {' '}
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Address </span>{' '}
                        <b>
                          {' '}
                          {user?.user_type === '1'
                            ? user?.organization_address
                            : user?.address}{' '}
                        </b>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>State </span>{' '}
                        <b> {user?.user_type === '1' ? user?.organization_state : user?.state} </b>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Zip Code </span>{' '}
                        <b> {user?.user_type === '1' ? user?.organization_zip : user?.zip} </b>
                      </div>
                    </div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
                <div class="panel panel-default">
                  <div class="panel-heading" role="tab" id="headingThree">
                    <h4 class="panel-title">
                      <a
                        class="collapsed"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        <div class="title btn btn-danger btn-outline btn-lg">CONTACT</div>
                      </a>
                    </h4>
                  </div>
                  <div
                    id="collapseThree"
                    class="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="headingThree"
                  >
                    <div class="panel-body">
                      <div class="">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>Phone Number </span>{' '}
                          <b>
                            {' '}
                            {user?.user_type === '1' ? user?.organization_phone : user?.phone}
                            {user?.user_type === '1' ? '' : user?.emergency_contact}{' '}
                          </b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
};
export default Profile;
