// import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
import {
  Card,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Menu,
  MenuItem,
} from '@mui/material';
import { Box, styled } from '@mui/system';
import { Paragraph } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import BannerImage from '../../../assets/img/waldemar.jpg';
import StepperFormRegistration from './stepperFormregistration';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const UserType = ['Orgnaization', 'Volunteer'];
const names = ['Marketing', 'Web Development', 'Event Planning', 'Ralph Hubbard', 'Omar Alexander'];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const JWTRegister = styled(JustifyBox)(() => ({
  backgroundImage: `url(${BannerImage})`,
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
  backgroundRepeat: ' no-repeat',
  backgroundSize: 'cover',
  display: 'grid',
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
  },
}));

// inital login credentials
const initialValues = {
  user_type: null,
  email: '',
  password: '',
  fullname: '',
  gender: null,
  dob: '',
  phone: null,
  address: '',
  city: '',
  state: '',
  zip: '',
  skills: '',
  volunteer_experience: '',
  languages_spoken: '',
  emergency_contact: '',
  short_bio: '',
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be 6 character length')
    .required('Password is required!'),
  email: Yup.string().email('Invalid Email address').required('Email is required!'),
});

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];
const ContentBox = styled(JustifyBox)(() => ({
  height: '100%',
  padding: '32px',
  background: 'rgba(0, 0, 0, 0.01)',
}));
const JwtRegister = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({ date: new Date() });

  const [personName, setPersonName] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <JWTRegister>
      <Card className="card">
        <Grid container>
          <Box p={4} height="100%">
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <ContentBox>
                  <img
                    width="100%"
                    alt="Register"
                    src="/assets/images/illustrations/posting_photo.svg"
                  />
                </ContentBox>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <h2 style={{ textAlign: 'center' }}>Sign Up </h2>
                <StepperFormRegistration />
              </Grid>
            </Grid>

            <Paragraph>
              Already have an account?
              <NavLink
                to="/session/signin"
                style={{
                  color: theme.palette.primary.main,
                  marginLeft: 5,
                }}
              >
                Login
              </NavLink>
            </Paragraph>
          </Box>
        </Grid>
      </Card>
    </JWTRegister>
  );
};

export default JwtRegister;

{
  /* <Grid container spacing={2}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <FormControl
                        sx={{ width: "100%" }}
                        style={{ padding: "5px 0", height: "10px" }}
                      >
                        <InputLabel id="demo-multiple-name-label">
                          User typesss
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          multiple
                          value={personName}
                          onChange={handleChange}
                          input={<OutlinedInput label="Select skills" />}
                          MenuProps={MenuProps}
                          style={{ height: "35px" }}
                        >
                          {UserType.map((name) => (
                            <MenuItem
                              key={name}
                              value={name}
                              style={getStyles(name, personName, theme)}
                            >
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <TextField
                        fullWidth
                        size="small"
                        type="text"
                        name="fullname"
                        label="Username"
                        variant="outlined"
                        onBlur={handleBlur}
                        value={values.fullname}
                        onChange={handleChange}
                        helperText={touched.fullname && errors.fullname}
                        error={Boolean(errors.fullname && touched.fullname)}
                        sx={{ mb: 3 }}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <TextField
                        fullWidth
                        size="small"
                        type="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        onBlur={handleBlur}
                        value={values.email}
                        onChange={handleChange}
                        helperText={touched.email && errors.email}
                        error={Boolean(errors.email && touched.email)}
                        sx={{ mb: 3 }}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <TextField
                        fullWidth
                        size="small"
                        name="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        onBlur={handleBlur}
                        value={values.password}
                        onChange={handleChange}
                        helperText={touched.password && errors.password}
                        error={Boolean(errors.password && touched.password)}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <FormLabel component="legend">Gender</FormLabel>
                      <Box>
                        <RadioGroup
                          name="gender"
                          className="group"
                          aria-label="Gender"
                          onChange={handleChange}
                          value={values.gender}
                          style={{ display: "flex", flexDirection: "row" }}
                          // onChange={handleChange}
                        >
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                          />
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                          />
                        </RadioGroup>
                      </Box>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <FormLabel component="legend">Date of Birth</FormLabel>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          value={values.dob}
                          onChange={handleDateChange}
                          renderInput={(props) => (
                            <TextField
                              {...props}
                              label="Date picker"
                              id="mui-pickers-date"
                              sx={{ mb: 2, width: "100%" }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        name="phone"
                        value={values.phone || ""}
                        label="Mobile Nubmer"
                        onChange={handleChange}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                        variant="outlined"
                        onBlur={handleBlur}
                        helperText={touched.phone && errors.phone}
                        error={Boolean(errors.phone && touched.phone)}
                        sx={{ mb: 3 }}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <TextField
                        fullWidth
                        size="small"
                        type="text"
                        name="address"
                        value={values.address || ""}
                        label="Address"
                        onChange={handleChange}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                        variant="outlined"
                        onBlur={handleBlur}
                        helperText={touched.address && errors.address}
                        error={Boolean(errors.address && touched.address)}
                        sx={{ mb: 3 }}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <TextField
                        fullWidth
                        size="small"
                        type="text"
                        name="city"
                        value={values.city || ""}
                        label="City"
                        onChange={handleChange}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                        variant="outlined"
                        onBlur={handleBlur}
                        helperText={touched.city && errors.city}
                        error={Boolean(errors.city && touched.city)}
                        sx={{ mb: 3 }}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <TextField
                        fullWidth
                        size="small"
                        type="text"
                        name="state"
                        value={values.city || ""}
                        label="State"
                        onChange={handleChange}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                        variant="outlined"
                        onBlur={handleBlur}
                        helperText={touched.state && errors.state}
                        error={Boolean(errors.state && touched.state)}
                        sx={{ mb: 3 }}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        name="zip"
                        value={values.city || ""}
                        label="Zip Code"
                        onChange={handleChange}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                        variant="outlined"
                        onBlur={handleBlur}
                        helperText={touched.zip && errors.zip}
                        error={Boolean(errors.zip && touched.zip)}
                        sx={{ mb: 3 }}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="demo-multiple-name-label">
                          Select skkills
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          multiple
                          value={personName}
                          onChange={handleChange}
                          input={<OutlinedInput label="Select skills" />}
                          MenuProps={MenuProps}
                        >
                          {names.map((name) => (
                            <MenuItem
                              key={name}
                              value={name}
                              style={getStyles(name, personName, theme)}
                            >
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <TextField
                        fullWidth
                        size="small"
                        type="text"
                        name="volunteer_experience"
                        value={values.volunteer_experience || ""}
                        label="volunteer Experience"
                        onChange={handleChange}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                        variant="outlined"
                        onBlur={handleBlur}
                        helperText={
                          touched.volunteer_experience &&
                          errors.volunteer_experience
                        }
                        error={Boolean(
                          errors.volunteer_experience &&
                            touched.volunteer_experience
                        )}
                        sx={{ mb: 3 }}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <TextField
                        fullWidth
                        size="small"
                        type="text"
                        name="languages_spoken"
                        value={values.languages_spoken || ""}
                        label="State"
                        onChange={handleChange}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                        variant="outlined"
                        onBlur={handleBlur}
                        helperText={
                          touched.languages_spoken && errors.languages_spoken
                        }
                        error={Boolean(
                          errors.languages_spoken && touched.languages_spoken
                        )}
                        sx={{ mb: 3 }}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        name="emergency_contact"
                        value={values.emergency_contact || ""}
                        label="Emergency contact"
                        onChange={handleChange}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                        variant="outlined"
                        onBlur={handleBlur}
                        helperText={
                          touched.emergency_contact && errors.emergency_contact
                        }
                        error={Boolean(
                          errors.emergency_contact && touched.emergency_contact
                        )}
                        sx={{ mb: 3 }}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <TextField
                        fullWidth
                        size="small"
                        type="text"
                        name="short_bio"
                        value={values.short_bio || ""}
                        label="Short Bio"
                        onChange={handleChange}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                        variant="outlined"
                        onBlur={handleBlur}
                        helperText={touched.short_bio && errors.short_bio}
                        error={Boolean(errors.short_bio && touched.short_bio)}
                        sx={{ mb: 3 }}
                      />
                    </Grid>
                    <FlexBox gap={1} alignItems="center">
                      <Checkbox
                        size="small"
                        name="remember"
                        onChange={handleChange}
                        checked={values.remember}
                        sx={{ padding: 0 }}
                      />

                      <Paragraph fontSize={13}>
                        I have read and agree to the terms of service.
                      </Paragraph>
                    </FlexBox>
                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ mb: 2, mt: 3 }}
                    >
                      Regiser
                    </LoadingButton>
                  </Grid> */
}
