import * as Yup from 'yup';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Formik, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import {
  Card,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  Box,
  FormControl,
  InputLabel,
  Select,
  RadioGroup,
  TextField,
  Menu,
  MenuItem,
  OutlinedInput,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import useAuth from 'app/hooks/useAuth';
const UserType = ['Orgnaization', 'Volunteer'];
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
const names = ['Swimmer', 'Web', 'Event Planning', 'Ralph Hubbard', 'Omar Alexander'];

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }
function getSteps() {
  return ['', '', '', ''];
}

function getStepContent(
  stepIndex,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setSelectedUserType,
  selectedUserType
) {
  // const [personName, setPersonName] = useState([]);

  // const handleChange = (e) => {
  //   console.log('Step index: ' + step, 'eeeee', e);
  // };

  // const theme = useTheme();

  const handleUserTypeChange = (event) => {
    const selectedUserType = event.target.value;
    setSelectedUserType(selectedUserType);
    console.log('Selected User Type:', selectedUserType);
  };

  switch (stepIndex) {
    case 0:
      return (
        <div>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
            <FormControl sx={{ width: '100%', mb: 3 }}>
              <InputLabel id="demo-simple-select-label">User Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.user_type}
                label="User Type"
                onChange={(e) => {
                  handleChange(e);
                  handleUserTypeChange(e);
                }}
                onBlur={handleBlur}
                name="user_type"
              >
                <MenuItem value={'1'}>Organization</MenuItem>
                <MenuItem value={'2'}>Volunteer</MenuItem>
              </Select>
            </FormControl>

            {selectedUserType === '2' ? (
              <>
                <TextField
                  fullWidth
                  size="full"
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
                  size="full"
                  type="email"
                  name="email"
                  label="email"
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
                  size="full"
                  name="password"
                  type="password"
                  label="Password"
                  variant="outlined"
                  onBlur={handleBlur}
                  value={values.password}
                  onChange={handleChange}
                  helperText={touched.password && errors.password}
                  error={Boolean(errors.password && touched.password)}
                  sx={{ mb: 3 }}
                />
              </>
            ) : (
              <>
                <div>
                  <TextField
                    fullWidth
                    size="full"
                    type="text"
                    name="organization_name"
                    value={values.organization_name || ''}
                    label="Organization Name"
                    onChange={handleChange}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    variant="outlined"
                    onBlur={handleBlur}
                    helperText={touched.organization_name && errors.organization_name}
                    error={Boolean(errors.organization_name && touched.organization_name)}
                    sx={{ mb: 3 }}
                  />

                  <TextField
                    fullWidth
                    size="full"
                    type="text"
                    name="organization_type"
                    value={values.organization_type || ''}
                    label="Organization type"
                    onChange={handleChange}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    variant="outlined"
                    onBlur={handleBlur}
                    helperText={touched.organization_type && errors.organization_type}
                    error={Boolean(errors.organization_type && touched.organization_type)}
                    sx={{ mb: 3 }}
                  />
                </div>
              </>
            )}
          </Grid>
        </div>
      );
    case 1:
      return (
        <>
          {selectedUserType === '2' ? (
            <>
              <div>
                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
                  <FormControl sx={{ width: '100%', mb: 3 }} style={{}}>
                    <FormLabel component="legend">Gender</FormLabel>
                    <Box>
                      <RadioGroup
                        name="gender"
                        className="group"
                        aria-label="Gender"
                        // onChange={(event) => {
                        //   handleChange(event); // Pass event to handleChange
                        // }}
                        value={values.gender}
                        style={{ display: 'flex', flexDirection: 'row' }}
                        onChange={handleChange}
                      >
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                      </RadioGroup>
                    </Box>
                  </FormControl>
                  <FormControl sx={{ width: '100%', mb: 1 }}>
                    <FormLabel component="legend">Date of Birth</FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={values.dob}
                        onChange={handleChange} //{handleDateChange}
                        renderInput={() => (
                          <TextField
                            //   {...props}
                            label="Date picker"
                            id="mui-pickers-date"
                            sx={{ mb: 2, width: '100%' }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </FormControl>

                  <TextField
                    fullWidth
                    size="full"
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

                  <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="demo-multiple-name-label">Select skkills</InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      value={values.skills}
                      onChange={handleChange}
                      input={<OutlinedInput label="Select skills" />}
                      MenuProps={MenuProps}
                    >
                      {names.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          // style={getStyles(name, personName, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </div>
            </>
          ) : (
            <>
              <div>
                <TextField
                  fullWidth
                  size="full"
                  type="text"
                  name="organization_year_founded"
                  value={values.organization_year_founded || ''}
                  label="Organization year founded"
                  onChange={handleChange}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  variant="outlined"
                  onBlur={handleBlur}
                  helperText={touched.organization_year_founded && errors.organization_year_founded}
                  error={Boolean(
                    errors.organization_year_founded && touched.organization_year_founded
                  )}
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  size="full"
                  type="text"
                  name="organization_employees"
                  value={values.organization_employees || ''}
                  label="Organization employees"
                  onChange={handleChange}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  variant="outlined"
                  onBlur={handleBlur}
                  helperText={touched.organization_employees && errors.organization_employees}
                  error={Boolean(errors.organization_employees && touched.organization_employees)}
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  size="full"
                  type="text"
                  name="organization_focusarea"
                  value={values.organization_focusarea || ''}
                  label="Organization Focusarea"
                  onChange={handleChange}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  variant="outlined"
                  onBlur={handleBlur}
                  helperText={touched.organization_focusarea && errors.organization_focusarea}
                  error={Boolean(errors.organization_focusarea && touched.organization_focusarea)}
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  size="full"
                  type="text"
                  name="organization_supports"
                  value={values.organization_supports || ''}
                  label="Organization supports"
                  onChange={handleChange}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  variant="outlined"
                  onBlur={handleBlur}
                  helperText={touched.organization_supports && errors.organization_supports}
                  error={Boolean(errors.organization_supports && touched.organization_supports)}
                  sx={{ mb: 3 }}
                />
              </div>
            </>
          )}
        </>
      );

    case 2:
      return (
        <>
          {selectedUserType === '2' ? (
            <>
              <div>
                <TextField
                  fullWidth
                  size="full"
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

                <TextField
                  fullWidth
                  size="full"
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
                  size="full"
                  type="text"
                  name="state"
                  value={values.state || ''}
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
                  size="full"
                  type="text"
                  name="zip"
                  value={values.zip || ''}
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
              </div>
            </>
          ) : (
            <>
              <div>
                <TextField
                  fullWidth
                  size="full"
                  type="text"
                  name="organization_address"
                  value={values.organization_address || ''}
                  label="Organization address"
                  onChange={handleChange}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  variant="outlined"
                  onBlur={handleBlur}
                  helperText={touched.organization_address && errors.organization_address}
                  error={Boolean(errors.organization_address && touched.organization_address)}
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  size="full"
                  type="text"
                  name="organization_city"
                  value={values.organization_city || ''}
                  label="Organization city"
                  onChange={handleChange}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  variant="outlined"
                  onBlur={handleBlur}
                  helperText={touched.organization_city && errors.organization_city}
                  error={Boolean(errors.organization_city && touched.organization_city)}
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  size="full"
                  type="text"
                  name="organization_state"
                  value={values.organization_state || ''}
                  label="Organization state"
                  onChange={handleChange}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  variant="outlined"
                  onBlur={handleBlur}
                  helperText={touched.organization_state && errors.organization_state}
                  error={Boolean(errors.organization_state && touched.organization_state)}
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  size="full"
                  type="text"
                  name="organization_zip"
                  value={values.organization_zip || ''}
                  label="Organization zip"
                  onChange={handleChange}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  variant="outlined"
                  onBlur={handleBlur}
                  helperText={touched.organization_zip && errors.organization_zip}
                  error={Boolean(errors.organization_zip && touched.organization_zip)}
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  size="full"
                  type="number"
                  name="organization_phone"
                  value={values.organization_phone || ''}
                  label="Organization phone"
                  onChange={handleChange}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  variant="outlined"
                  onBlur={handleBlur}
                  helperText={touched.organization_phone && errors.organization_phone}
                  error={Boolean(errors.organization_phone && touched.organization_phone)}
                  sx={{ mb: 3 }}
                />
              </div>
            </>
          )}
        </>
      );

    case 3:
      return (
        <>
          {selectedUserType === '2' ? (
            <>
              <div>
                <TextField
                  fullWidth
                  size="full"
                  type="text"
                  name="volunteer_experience"
                  value={values.volunteer_experience || ''}
                  label="Volunteer experience"
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
                  size="full"
                  type="text"
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
                  size="full"
                  type="text"
                  name="languages_spoken"
                  value={values.languages_spoken || ''}
                  label="Languages spoken"
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
                  size="full"
                  type="text"
                  name="short_bio"
                  value={values.short_bio || ''}
                  label="Short bio"
                  onChange={handleChange}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  variant="outlined"
                  onBlur={handleBlur}
                  helperText={touched.short_bio && errors.short_bio}
                  error={Boolean(errors.short_bio && touched.short_bio)}
                  sx={{ mb: 3 }}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <TextField
                  fullWidth
                  size="full"
                  type="number"
                  name="organization_mission"
                  value={values.organization_mission || ''}
                  label="Organization mission"
                  onChange={handleChange}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  variant="outlined"
                  onBlur={handleBlur}
                  helperText={touched.organization_mission && errors.organization_mission}
                  error={Boolean(errors.organization_mission && touched.organization_mission)}
                  sx={{ mb: 3 }}
                />
              </div>
            </>
          )}
        </>
      );
    // default:
    //   return `Aenean arcu ligula, porttitor id neque imperdiet, congue convallis erat. Integer libero sapien, convallis a vulputate vel, pretium vulputate metus. Donec leo justo, viverra ut tempor commodo, laoreet eu velit. Donec vel sem quis velit pharetra elementum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam in commodo mauris. Ut iaculis ipsum velit.`;
  }
}

export default function StepperFormRegistration() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [personName, setPersonName] = useState([]);
  const [selectedUserType, setSelectedUserType] = useState('');
  const steps = getSteps();

  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (values) => {
    console.log('handleFormSubmit called ', values);
    setLoading(true);
    const payload = {
      email: values?.target?.email,
      password: values?.target?.password,
      user_type: values?.target?.user_type,
      email: '',
      password: '',
      fullname: '',
      gender: '',
      dob: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      skills: [],
      volunteer_experience: '',
      languages_spoken: '',
      emergency_contact: '',
      short_bio: '',
    };
    try {
      await register(payload);
      console.log('user login::::', values);
      navigate('/');
    } catch (e) {
      setLoading(false);
    }
  };
  // inital login credentials

  const initialValues = {
    email: '',
    password: '123456',
    remember: true,
    user_type: '1',
    email: '',
    password: '',
    fullname: '',
    gender: '',
    dob: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    skills: [],
    volunteer_experience: '',
    languages_spoken: '',
    emergency_contact: '',
    short_bio: '',

    organization_name: '',
    organization_type: '',
    organization_address: '',
    organization_city: '',
    organization_state: '',
    organization_zip: '',
    organization_phone: '',
    organization_mission: '',
    organization_year_founded: '',
    organization_employees: '',
    organization_focusarea: '',
    organization_supports: '',
    organization_id: '',
  };

  // form field validation schema
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must be 6 character length')
      .required('Password is required!'),
    email: Yup.string().email('Invalid Email address').required('Email is required!'),
  });

  const handleNext = () => {
    console.log('---------next', activeStep === steps.length - 1 ? 'submit' : '');
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => setActiveStep(0);

  // const handleFormSubmit = async (values) => {
  //   values.preventDefault();
  //   console.log('Registration:::: handle submit ', values);
  //   // setLoading(true);

  //   const organization = {
  //     user_type: values.user_type,
  //     email: values.email,
  //   };

  //   try {
  //     await register(organization);
  //     // navigate('/');
  //     console.log('register success');
  //   } catch (e) {
  //     // setLoading(false);
  //     console.log('error:::', e);
  //   }
  // };

  const handleUserTypeChange = (event) => {
    const selectedUserType = event.target.value;
    console.log('Selected User Type:', selectedUserType);
  };
  return (
    <>
      <Box>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box mt={4}>
          {activeStep === steps.length ? (
            <Box>
              <Typography>All steps completed</Typography>

              <Button sx={{ mt: 2 }} variant="contained" color="secondary" onClick={handleReset}>
                Reset
              </Button>
            </Box>
          ) : (
            <>
              <Formik
                // onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form
                    onSubmit={(values) => {
                      values.preventDefault();
                      // handleSubmit();
                      handleFormSubmit(values);
                    }}
                  >
                    <Box>
                      <Typography>
                        {getStepContent(
                          activeStep,
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          setSelectedUserType,
                          selectedUserType
                        )}
                      </Typography>

                      <Box pt={2}>
                        <Button
                          variant="contained"
                          color="secondary"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                        >
                          Back
                        </Button>

                        {activeStep !== steps.length - 1 ? (
                          <Button
                            sx={{ ml: 2 }}
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                          >
                            {'Next'}
                          </Button>
                        ) : (
                          <Button
                            sx={{ ml: 2 }}
                            variant="contained"
                            color="primary"
                            type="submit"
                            // onClick={(e) => handleFinish(e, values)}
                          >
                            Submit
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </form>
                )}
              </Formik>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
