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
  background: '#1A2038',
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

const JwtRegister = () => {
  const theme = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({ date: new Date() });

  const [personName, setPersonName] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleDateChange = (date) => setState({ ...state, date });

  const handleFormSubmit = (values) => {
    console.log('values on submit', values);
    setLoading(true);
    try {
      register(
        values.user_type,
        values.email,
        values.password,
        values.fullname,
        values.gender,
        values.dob,
        values.phone,
        values.address,
        values.city,
        values.state,
        values.zip,
        values.skills,
        values.volunteer_experience,
        values.languages_spoken,
        values.emergency_contact,
        values.short_bio
      );
      navigate('/');
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <JWTRegister>
      <Card className="card">
        <Grid container>
          <Box p={4} height="100%">
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <FormLabel component="legend">User type</FormLabel>
                    <Box p={2} height="100%">
                      <RadioGroup
                        // value={value}
                        name="user_type"
                        className="group"
                        aria-label="User type"
                        onChange={handleChange}
                        value={values.user_type}
                        // onChange={handleChange}
                      >
                        <FormControlLabel value="1" control={<Radio />} label="Orgnaization" />
                        <FormControlLabel value="2" control={<Radio />} label="Volunteer" />
                      </RadioGroup>
                    </Box>

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

                    <FormLabel component="legend">Gender</FormLabel>
                    <Box>
                      <RadioGroup
                        // value={value}
                        name="gender"
                        className="group"
                        aria-label="Gender"
                        onChange={handleChange}
                        value={values.gender}
                        // onChange={handleChange}
                      >
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                      </RadioGroup>
                    </Box>

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
                            sx={{ mb: 2, width: '100%' }}
                          />
                        )}
                      />
                    </LocalizationProvider>

                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      name="phone"
                      value={values.phone || ''}
                      label="Mobile Nubmer"
                      onChange={handleChange}
                      validators={['required']}
                      errorMessages={['this field is required']}
                      variant="outlined"
                      onBlur={handleBlur}
                      helperText={touched.phone && errors.phone}
                      error={Boolean(errors.phone && touched.phone)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="address"
                      value={values.address || ''}
                      label="Address"
                      onChange={handleChange}
                      validators={['required']}
                      errorMessages={['this field is required']}
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
                      value={values.city || ''}
                      label="City"
                      onChange={handleChange}
                      validators={['required']}
                      errorMessages={['this field is required']}
                      variant="outlined"
                      onBlur={handleBlur}
                      helperText={touched.city && errors.city}
                      error={Boolean(errors.city && touched.city)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="state"
                      value={values.city || ''}
                      label="State"
                      onChange={handleChange}
                      validators={['required']}
                      errorMessages={['this field is required']}
                      variant="outlined"
                      onBlur={handleBlur}
                      helperText={touched.state && errors.state}
                      error={Boolean(errors.state && touched.state)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      name="zip"
                      value={values.city || ''}
                      label="Zip Code"
                      onChange={handleChange}
                      validators={['required']}
                      errorMessages={['this field is required']}
                      variant="outlined"
                      onBlur={handleBlur}
                      helperText={touched.zip && errors.zip}
                      error={Boolean(errors.zip && touched.zip)}
                      sx={{ mb: 3 }}
                    />

                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="demo-multiple-name-label">Select skkills</InputLabel>
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

                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="volunteer_experience"
                      value={values.volunteer_experience || ''}
                      label="volunteer Experience"
                      onChange={handleChange}
                      validators={['required']}
                      errorMessages={['this field is required']}
                      variant="outlined"
                      onBlur={handleBlur}
                      helperText={touched.volunteer_experience && errors.volunteer_experience}
                      error={Boolean(errors.volunteer_experience && touched.volunteer_experience)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="languages_spoken"
                      value={values.languages_spoken || ''}
                      label="State"
                      onChange={handleChange}
                      validators={['required']}
                      errorMessages={['this field is required']}
                      variant="outlined"
                      onBlur={handleBlur}
                      helperText={touched.languages_spoken && errors.languages_spoken}
                      error={Boolean(errors.languages_spoken && touched.languages_spoken)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      name="emergency_contact"
                      value={values.emergency_contact || ''}
                      label="Emergency contact"
                      onChange={handleChange}
                      validators={['required']}
                      errorMessages={['this field is required']}
                      variant="outlined"
                      onBlur={handleBlur}
                      helperText={touched.emergency_contact && errors.emergency_contact}
                      error={Boolean(errors.emergency_contact && touched.emergency_contact)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="short_bio"
                      value={values.short_bio || ''}
                      label="Short Bio"
                      onChange={handleChange}
                      validators={['required']}
                      errorMessages={['this field is required']}
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

                  <Paragraph>
                    Already have an account?
                    <NavLink
                      to="/session/signin"
                      style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                    >
                      Login
                    </NavLink>
                  </Paragraph>
                </form>
              )}
            </Formik>
          </Box>
          {/* </Grid> */}
        </Grid>
      </Card>
    </JWTRegister>
  );
};

export default JwtRegister;
