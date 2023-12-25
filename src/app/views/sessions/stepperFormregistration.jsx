import * as Yup from 'yup';
import Button from '@mui/material/Button';
import React from 'react';
import { useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Formik, useFormik } from 'formik';
import {
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
import { useNavigate } from 'react-router-dom';
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
const names = [
  { id: 1, name: 'Swimmer' },
  { id: 2, name: ' mountain climber' },
  { id: 3, name: 'Fire&Safety' },
];
// const names = ['Swimmer', 'Web', 'Event Planning', 'Ralph Hubbard', 'Omar Alexander'];

export default function StepperFormRegistration({ handleFormSubmit }) {
  const [selectedUserType, setSelectedUserType] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  // inital login credentials
  const orgInitialValues = {
    email: '',
    password: '',
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

  const volunteerinitialValues = {
    email: '',
    remember: true,
    user_type: '1',
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

  // form field validation schema
  const orgValidationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required!'),
    password: Yup.string().required('Password is required!'),
    organization_id: Yup.string().required('ID is required!'),
    organization_name: Yup.string().required('Name is required!'),
    organization_type: Yup.string().required('Type is required!'),
    organization_address: Yup.string().required('Address is required!'),
    organization_city: Yup.string().required('City is required!'),
    organization_state: Yup.string().required('State is required!'),
    organization_zip: Yup.string().required('Zip is required!'),
    organization_phone: Yup.string().required('Phone is required!'),
    organization_mission: Yup.string().required('Mission is required!'),
    organization_year_founded: Yup.string().required('Year founded is required!'),
    organization_employees: Yup.string().required('Employees is required!'),
    organization_focusarea: Yup.string().required('Focusarea is required!'),
    organization_supports: Yup.string().required('Supports is required!'),
  });

  const userValidationSchema = Yup.object().shape({
    // password: Yup.string()
    //   .min(6, 'Password must be 6 character length')
    //   .required('Password is required!'),
    // email: Yup.string().email('Invalid Email address').required('Email is required!'),
    email: Yup.string().required('Email is required!'),
    // user_type : Yup.string().required(' is required!'),
    password: Yup.string().required('Password is required!'),
    fullname: Yup.string().required('Name is required!'),
    gender: Yup.string().required('Gender is required!'),
    dob: Yup.string().required('DOB is required!'),
    phone: Yup.string().required('Contact is required!'),
    address: Yup.string().required('Address is required!'),
    city: Yup.string().required('City is required!'),
    state: Yup.string().required('State is required!'),
    zip: Yup.string().required('Zip is required!'),
    skills: Yup.string().required('Skills is required!'),
    volunteer_experience: Yup.string().required('Volunteer experience is required!'),
    languages_spoken: Yup.string().required('Languages spoken is required!'),
    emergency_contact: Yup.string().required('Emergency contact is required!'),
    short_bio: Yup.string().required('Short bio is required!'),
  });

  const handleFinish = async (values) => {
    // e.preventDefault();
    console.log('Form Data:', values);
    const res = await register(values);
    console.log(res, '------resss');
    if (res?.status == 200) {
      navigate('/session/signin');
    }
  };

  const handleUserTypeChange = (event) => {
    setSelectedUserType(event.target.value);
  };

  return (
    <>
      <Box>
        <Box mt={4}>
          <Formik
            onSubmit={handleFinish}
            initialValues={selectedUserType == '1' ? orgInitialValues : volunteerinitialValues}
            validationSchema={selectedUserType == '1' ? orgValidationSchema : userValidationSchema}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm }) => (
              <form onSubmit={handleSubmit}>
                <Box>
                  {console.log(errors, '------------->>> errors')}
                  <div>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <FormControl sx={{ width: '100%', mb: 3 }}>
                        <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={values.user_type}
                          label="User Type"
                          onChange={(e) => {
                            resetForm();
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
                    </Grid>
                    {selectedUserType === '2' ? (
                      <>
                        <Grid container spacing={2}>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
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
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
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
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
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
                          </Grid>

                          <Grid item lg={6} md={6} sm={12} xs={12}>
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
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
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
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
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
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
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
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <FormControl sx={{ width: '100%', mb: 3 }} style={{}}>
                              {/* <FormLabel component="legend">Gender</FormLabel> */}
                              <Box>
                                <RadioGroup
                                  name="gender"
                                  className="group"
                                  aria-label="Gender"
                                  // onChange={(event) => {
                                  //   handleChange(event); // Pass event to handleChange
                                  // }}
                                  value={values.gender}
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                  }}
                                  onChange={handleChange}
                                >
                                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                                  <FormControlLabel
                                    value="female"
                                    control={<Radio />}
                                    label="Female"
                                  />
                                </RadioGroup>
                              </Box>
                            </FormControl>
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <FormControl sx={{ width: '100%', mb: 1 }}>
                              {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                  value={values.dob}
                                  name={'dob'}
                                  onChange={handleChange} //{handleDateChange}
                                  renderInput={() => ( */}
                              <TextField
                                value={values.dob}
                                name={'dob'}
                                onChange={handleChange}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                variant="outlined"
                                onBlur={handleBlur}
                                helperText={touched.dob && errors.dob}
                                error={Boolean(errors.dob && touched.dob)}
                                //   {...props}
                                label="date of Birth"
                                id="mui-pickers-date"
                                sx={{ mb: 2, width: '100%' }}
                              />
                              {/* )}
                                />
                              </LocalizationProvider> */}
                            </FormControl>
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
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
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <FormControl sx={{ width: '100%' }}>
                              <InputLabel id="demo-multiple-name-label">Select skkills</InputLabel>
                              <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                value={values.skills}
                                onChange={handleChange}
                                name="skills"
                                input={<OutlinedInput label="Select skills" />}
                                MenuProps={MenuProps}
                              >
                                {names.map((name) => (
                                  <MenuItem
                                    key={name.id}
                                    value={name.id}
                                    // style={getStyles(name, personName, theme)}
                                  >
                                    {name.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
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
                              helperText={
                                touched.volunteer_experience && errors.volunteer_experience
                              }
                              error={Boolean(
                                errors.volunteer_experience && touched.volunteer_experience
                              )}
                              sx={{ mb: 3 }}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
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
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
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
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
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
                          </Grid>
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Grid container spacing={2}>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              size="full"
                              type="text"
                              name="organization_name"
                              value={values.organization_name || ''}
                              label="Name"
                              onChange={handleChange}
                              validators={['required']}
                              errorMessages={['this field is required']}
                              variant="outlined"
                              onBlur={handleBlur}
                              // helperText={touched.organization_name && errors.organization_name}
                              // error={Boolean(errors.organization_name && touched.organization_name)}
                              sx={{ mb: 3 }}
                            />
                          </Grid>

                          <Grid item lg={6} md={6} sm={12} xs={12}>
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
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
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
                          </Grid>

                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              size="full"
                              type="text"
                              name="organization_id"
                              value={values.organization_id || ''}
                              label="ID"
                              onChange={handleChange}
                              validators={['required']}
                              errorMessages={['this field is required']}
                              variant="outlined"
                              onBlur={handleBlur}
                              helperText={touched.organization_id && errors.organization_id}
                              error={Boolean(errors.organization_id && touched.organization_id)}
                              sx={{ mb: 3 }}
                            />
                          </Grid>

                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              size="full"
                              type="text"
                              name="organization_type"
                              value={values.organization_type || ''}
                              label="Type"
                              onChange={handleChange}
                              validators={['required']}
                              errorMessages={['this field is required']}
                              variant="outlined"
                              onBlur={handleBlur}
                              helperText={touched.organization_type && errors.organization_type}
                              error={Boolean(errors.organization_type && touched.organization_type)}
                              sx={{ mb: 3 }}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              size="full"
                              type="text"
                              name="organization_address"
                              value={values.organization_address || ''}
                              label="Address"
                              onChange={handleChange}
                              validators={['required']}
                              errorMessages={['this field is required']}
                              variant="outlined"
                              onBlur={handleBlur}
                              helperText={
                                touched.organization_address && errors.organization_address
                              }
                              error={Boolean(
                                errors.organization_address && touched.organization_address
                              )}
                              sx={{ mb: 3 }}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              size="full"
                              type="text"
                              name="organization_city"
                              value={values.organization_city || ''}
                              label="City"
                              onChange={handleChange}
                              validators={['required']}
                              errorMessages={['this field is required']}
                              variant="outlined"
                              onBlur={handleBlur}
                              helperText={touched.organization_city && errors.organization_city}
                              error={Boolean(errors.organization_city && touched.organization_city)}
                              sx={{ mb: 3 }}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              size="full"
                              type="text"
                              name="organization_state"
                              value={values.organization_state || ''}
                              label="State"
                              onChange={handleChange}
                              validators={['required']}
                              errorMessages={['this field is required']}
                              variant="outlined"
                              onBlur={handleBlur}
                              helperText={touched.organization_state && errors.organization_state}
                              error={Boolean(
                                errors.organization_state && touched.organization_state
                              )}
                              sx={{ mb: 3 }}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              size="full"
                              type="number"
                              name="organization_zip"
                              value={values.organization_zip || ''}
                              label="Zip"
                              onChange={handleChange}
                              validators={['required']}
                              errorMessages={['this field is required']}
                              variant="outlined"
                              onBlur={handleBlur}
                              helperText={touched.organization_zip && errors.organization_zip}
                              error={Boolean(errors.organization_zip && touched.organization_zip)}
                              sx={{ mb: 3 }}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              size="full"
                              type="number"
                              name="organization_phone"
                              value={values.organization_phone || ''}
                              label="Phone"
                              onChange={handleChange}
                              validators={['required']}
                              errorMessages={['this field is required']}
                              variant="outlined"
                              onBlur={handleBlur}
                              helperText={touched.organization_phone && errors.organization_phone}
                              error={Boolean(
                                errors.organization_phone && touched.organization_phone
                              )}
                              sx={{ mb: 3 }}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            {' '}
                            <TextField
                              fullWidth
                              size="full"
                              type="number"
                              name="organization_year_founded"
                              value={values.organization_year_founded || ''}
                              label="Year founded"
                              onChange={handleChange}
                              validators={['required']}
                              errorMessages={['this field is required']}
                              variant="outlined"
                              onBlur={handleBlur}
                              helperText={
                                touched.organization_year_founded &&
                                errors.organization_year_founded
                              }
                              error={Boolean(
                                errors.organization_year_founded &&
                                  touched.organization_year_founded
                              )}
                              sx={{ mb: 3 }}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              size="full"
                              type="text"
                              name="organization_employees"
                              value={values.organization_employees || ''}
                              label="No of Employees"
                              onChange={handleChange}
                              validators={['required']}
                              errorMessages={['this field is required']}
                              variant="outlined"
                              onBlur={handleBlur}
                              helperText={
                                touched.organization_employees && errors.organization_employees
                              }
                              error={Boolean(
                                errors.organization_employees && touched.organization_employees
                              )}
                              sx={{ mb: 3 }}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              size="full"
                              type="text"
                              name="organization_focusarea"
                              value={values.organization_focusarea || ''}
                              label="Focusarea"
                              onChange={handleChange}
                              validators={['required']}
                              errorMessages={['this field is required']}
                              variant="outlined"
                              onBlur={handleBlur}
                              helperText={
                                touched.organization_focusarea && errors.organization_focusarea
                              }
                              error={Boolean(
                                errors.organization_focusarea && touched.organization_focusarea
                              )}
                              sx={{ mb: 3 }}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              size="full"
                              type="text"
                              name="organization_supports"
                              value={values.organization_supports || ''}
                              label="Supports"
                              onChange={handleChange}
                              validators={['required']}
                              errorMessages={['this field is required']}
                              variant="outlined"
                              onBlur={handleBlur}
                              helperText={
                                touched.organization_supports && errors.organization_supports
                              }
                              error={Boolean(
                                errors.organization_supports && touched.organization_supports
                              )}
                              sx={{ mb: 3 }}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              size="full"
                              type="text"
                              name="organization_mission"
                              value={values.organization_mission || ''}
                              label="mission"
                              onChange={handleChange}
                              validators={['required']}
                              errorMessages={['this field is required']}
                              variant="outlined"
                              onBlur={handleBlur}
                              helperText={
                                touched.organization_mission && errors.organization_mission
                              }
                              error={Boolean(
                                errors.organization_mission && touched.organization_mission
                              )}
                              sx={{ mb: 3 }}
                            />
                          </Grid>
                        </Grid>{' '}
                      </>
                    )}
                  </div>

                  <Box pt={2}>
                    <Button sx={{ ml: 2 }} variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
}
