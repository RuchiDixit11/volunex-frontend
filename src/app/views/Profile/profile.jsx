import { Box, Card, styled, useTheme } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));
const Profile = () => {
  const { palette } = useTheme();

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Dashboard", path: "/" },
            { name: "Profile" },
          ]}
        />
      </Box>
      <Card elevation={3} sx={{ pt: "20px", mb: 3 }}></Card>
    </Container>
  );
};

export default Profile;
