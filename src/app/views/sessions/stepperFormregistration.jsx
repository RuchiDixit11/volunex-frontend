import * as Yup from "yup";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import React from "react";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useFormik } from "formik";
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
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
const UserType = ["Orgnaization", "Volunteer"];
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
  "Swimmer",
  "Web",
  "Event Planning",
  "Ralph Hubbard",
  "Omar Alexander",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
function getSteps() {
  return ["", "", ""];
}

function getStepContent(stepIndex, formik) {
  const [personName, setPersonName] = useState([]);
  const handleChange = () => {};
  const theme = useTheme();
  switch (stepIndex) {
    case 0:
      return (
        <div>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
            <FormControl sx={{ width: "100%", mb: 3 }}>
              <InputLabel id="demo-simple-select-label">User Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value="fff"
                label="User Type"
                onChange={(event) => {
                  formik.handleChange(event);
                }}
                // onBlur={handleBlur}
                name="user_type"
              >
                <MenuItem value={1}>Volunteer</MenuItem>
                <MenuItem value={2}>Organization</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              size="full"
              type="text"
              name="fullname"
              label="Username"
              variant="outlined"
              //   onBlur={handleBlur}
              //   value={values.fullname}
              //   onChange={handleChange}
              //   helperText={touched.fullname && errors.fullname}
              //   error={Boolean(errors.fullname && touched.fullname)}
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              size="full"
              type="text"
              name="email"
              label="email"
              variant="outlined"
              //   onBlur={handleBlur}
              //   value={values.fullname}
              //   onChange={handleChange}
              //   helperText={touched.fullname && errors.fullname}
              //   error={Boolean(errors.fullname && touched.fullname)}
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              size="full"
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              //   onBlur={handleBlur}
              // value={values.password}
              // onChange={handleChange}
              // helperText={touched.password && errors.password}
              // error={Boolean(errors.password && touched.password)}
              sx={{ mb: 3 }}
            />
          </Grid>
        </div>
      );
    case 1:
      return (
        <div>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
            <FormControl sx={{ width: "100%", mb: 3 }} style={{}}>
              <FormLabel component="legend">Gender</FormLabel>
              <Box>
                <RadioGroup
                  name="gender"
                  className="group"
                  aria-label="Gender"
                  onChange={(event) => {
                    formik.handleChange(event); // Pass event to handleChange
                  }}
                  // value={formik.values.gender}
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
            </FormControl>
            <FormControl sx={{ width: "100%", mb: 1 }}>
              <FormLabel component="legend">Date of Birth</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  //   value={values.dob}
                  //   onChange={handleDateChange}
                  renderInput={() => (
                    <TextField
                      //   {...props}
                      label="Date picker"
                      id="mui-pickers-date"
                      sx={{ mb: 2, width: "100%" }}
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
              // value={values.phone || ""}
              label="Mobile Nubmer"
              // onChange={handleChange}
              // validators={["required"]}
              // errorMessages={["this field is required"]}
              // variant="outlined"
              // onBlur={handleBlur}
              // helperText={touched.phone && errors.phone}
              // error={Boolean(errors.phone && touched.phone)}
              sx={{ mb: 3 }}
            />
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
        </div>
      );

    case 2:
      return (
        <div>
          <TextField
            fullWidth
            size="full"
            type="text"
            name="state"
            // value={values.city || ""}
            label="State"
            // onChange={handleChange}
            // validators={["required"]}
            // errorMessages={["this field is required"]}
            variant="outlined"
            // onBlur={handleBlur}
            // helperText={touched.state && errors.state}
            // error={Boolean(errors.state && touched.state)}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            size="full"
            type="text"
            name="state"
            // value={values.city || ""}
            label="State"
            // onChange={handleChange}
            // validators={["required"]}
            // errorMessages={["this field is required"]}
            variant="outlined"
            // onBlur={handleBlur}
            // helperText={touched.state && errors.state}
            // error={Boolean(errors.state && touched.state)}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            size="full"
            type="text"
            name="state"
            // value={values.city || ""}
            label="State"
            // onChange={handleChange}
            // validators={["required"]}
            // errorMessages={["this field is required"]}
            variant="outlined"
            // onBlur={handleBlur}
            // helperText={touched.state && errors.state}
            // error={Boolean(errors.state && touched.state)}
            sx={{ mb: 3 }}
          />
        </div>
      );

    default:
      return `Aenean arcu ligula, porttitor id neque imperdiet, congue convallis erat. Integer libero sapien, convallis a vulputate vel, pretium vulputate metus. Donec leo justo, viverra ut tempor commodo, laoreet eu velit. Donec vel sem quis velit pharetra elementum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam in commodo mauris. Ut iaculis ipsum velit.`;
  }
}

export default function StepperFormRegistration({ handleSubmit }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [personName, setPersonName] = useState([]);

  const steps = getSteps();
  const formik = useFormik({
    initialValues: {
      user_type: 1,
      fullname: "",
      email: "",
      password: "",
      gender: "",
      dob: null,
      phone: "",
      skills: [],
      state: "",
    },
    validationSchema: Yup.object().shape({
      // Define your validation schema here
      // Example:
      email: Yup.string()
        .email("Invalid Email address")
        .required("Email is required!"),
      // ... add more validations for other fields
    }),
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log("Form Submitted with values:", values);
      // ... (your existing submission logic)
    },
  });
  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => setActiveStep(0);
  const handleFinish = () => {
    // Trigger form submission logic
    formik.handleSubmit();
    // You can also access formik.values to get the form data
    console.log("Form Data:", formik.values);
    // Call the provided handleSubmit function with form data
    handleSubmit(formik.values);
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

              <Button
                sx={{ mt: 2 }}
                variant="contained"
                color="secondary"
                onClick={handleReset}
              >
                Reset
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography>{getStepContent(activeStep)}</Typography>

              <Box pt={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  Back
                </Button>

                <Button
                  sx={{ ml: 2 }}
                  variant="contained"
                  color="primary"
                  onClick={
                    activeStep === steps.length - 1 ? handleFinish : handleNext
                  }
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
