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
} from "@mui/material";
import { Paragraph } from "app/components/Typography";
import { Breadcrumb, SimpleCard } from "app/components";

const CardHeader = styled(Box)(() => ({
  display: "flex",
  paddingLeft: "24px",
  paddingRight: "24px",
  marginBottom: "12px",
  alignItems: "center",
  justifyContent: "space-between",
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize",
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: "pre",
  "& small": {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
  },
  "& td": { borderBottom: "none" },
  "& td:first-of-type": { paddingLeft: "16px !important" },
}));

const Small = styled("small")(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: "#fff",
  padding: "2px 8px",
  borderRadius: "4px",
  overflow: "hidden",
  background: bgcolor,
  boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
}));

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));
const VolunteerList = () => {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Dashboard", path: "/" },
            { name: "Volunteer" },
          ]}
        />
      </Box>
      <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
        <CardHeader>
          <Title>Volunteer List</Title>
          <Select size="small" defaultValue="swimming">
            <MenuItem value="swimming">swimming </MenuItem>
            <MenuItem value="runners ">runners </MenuItem>
            <MenuItem value="Everest">Training for Everest</MenuItem>
          </Select>
        </CardHeader>

        <Box overflow="auto">
          <ProductTable>
            <TableHead>
              <TableRow>
                <TableCell sx={{ px: 3 }} colSpan={4}>
                  Volunteer Name
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={2}>
                  volunteer Skill
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={2}>
                  volunteer Location
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={1}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {productList.map((product, index) => (
                <TableRow key={index} hover>
                  <TableCell
                    colSpan={4}
                    align="left"
                    sx={{ px: 0, textTransform: "capitalize" }}
                  >
                    <Box display="flex" alignItems="center">
                      <Avatar src={product.imgUrl} />
                      <Paragraph sx={{ m: 0, ml: 4 }}>{product.name}</Paragraph>
                    </Box>
                  </TableCell>

                  <TableCell
                    align="left"
                    colSpan={2}
                    sx={{ px: 0, textTransform: "capitalize" }}
                  >
                    {product.skill > 999
                      ? (product.skill / 1000).toFixed(1) + ""
                      : product.skill}
                  </TableCell>

                  <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                    {product.location}
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
    imgUrl: "account_circle",
    name: "earphone",
    skill: "Runner",
    location: "Indore",
  },
  {
    imgUrl: "account_circle",
    name: "earphone",
    skill: "Runner",
    location: "Delhi",
  },
  {
    imgUrl: "account_circle",
    name: "iPhone x",
    skill: "Runner",
    location: "Mumbai",
  },
  {
    imgUrl: "account_circle",
    name: "iPhone x",
    skill: "Runner",
    location: "Bhopal",
  },
  {
    imgUrl: "account_circle",
    name: "Head phone",
    skill: "Runner",
    location: "Mohali",
  },
];

export default VolunteerList;
