import * as React from "react";
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

import Button from "@mui/material/Button";
import { Paragraph } from "app/components/Typography";
import { Breadcrumb, SimpleCard } from "app/components";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CreateCampaign from "./CreateCampaign";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
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
const Campaigns = () => {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Dashboard", path: "/" },
            { name: "Campaigns" },
          ]}
        />
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button variant="outlined" onClick={handleClickOpen} sx={{ mb: 4 }}>
          Creat Campaigns
        </Button>
      </div>
      <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
        <CardHeader>
          <Title>Campaigns List</Title>
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
                  Campaigns Name
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={2}>
                  Organization
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={2}>
                  No of volunteer
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
                    {product.location ? (
                      product.location < 20 ? (
                        <Small bgcolor={bgSecondary}>
                          {product.location} location
                        </Small>
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
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Craete Campaigns"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <CreateCampaign />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Craete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

const productList = [
  {
    imgUrl: "/assets/images/products/headphone-2.jpg",
    name: "earphone",
    skill: 100,
    location: 15,
  },
  {
    imgUrl: "/assets/images/products/headphone-3.jpg",
    name: "earphone",
    skill: 1500,
    location: 30,
  },
  {
    imgUrl: "/assets/images/products/iphone-2.jpg",
    name: "iPhone x",
    skill: 1900,
    location: 35,
  },
  {
    imgUrl: "/assets/images/products/iphone-1.jpg",
    name: "iPhone x",
    skill: 100,
    location: 0,
  },
  {
    imgUrl: "/assets/images/products/headphone-3.jpg",
    name: "Head phone",
    skill: 1190,
    location: 5,
  },
];

export default Campaigns;
