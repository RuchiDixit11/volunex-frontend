import { Box, Card, styled, useTheme } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
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
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Dashboard', path: '/' }, { name: 'Profile' }]} />
      </Box>
      <Card elevation={3} sx={{ pt: '20px', mb: 3 }} style={{ backgroundColor: '#ddd' }}>
        <div className="my-profile">
          <div class="box">
            <div id="overlay">
              <div class="image">
                <div class="trick"></div>
              </div>
              <ul class="text">Walter Wright</ul>
              <div class="text1">HTML + CSS</div>
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
                        <div class="title  btn btn-danger btn-outline btn-lg">ABOUT WALTER</div>
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
                      Walter has been building websites for years. He enjoys making unique websites
                      and web projects. His hobbies include photography, woodworking,
                      leatherworking, fishing, and mid century modern furniture.{' '}
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
                        <div class="title btn btn-danger btn-outline btn-lg">SOCIAL</div>
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
                      Walter has been building websites for years. He enjoys making unique websites
                      and web projects. His hobbies include photography, woodworking,
                      leatherworking, fishing, and mid century modern furniture.{' '}
                    </div>
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
                      <form id="form" class="topBefore">
                        <input id="name" type="text" placeholder="NAME" />
                        <input id="email" type="text" placeholder="E-MAIL" />
                        <textarea id="message" type="text" placeholder="MESSAGE"></textarea>
                        <input id="submit" type="submit" value="Submit Now!" />
                      </form>
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
