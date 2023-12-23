import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Button, Grid, Icon, styled } from '@mui/material';
import { Span } from 'app/components/Typography';
import { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import * as Yup from 'yup';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

const CreateCampaign = ({ handleClose }) => {
  const [state, setState] = useState({ date: new Date() });
  const { addEvent } = useAuth();
  const [selectedEndDate, setSelectedEndDate] = useState(new Date('2014-08-18T21:11:54'));
  const [selectedFromDate, setSelectedFromDate] = useState(new Date('2014-08-18T21:11:54'));

  const orgId = localStorage.getItem('user_id');

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== state.password) return false;
      return true;
    });
    return () => ValidatorForm.removeValidationRule('isPasswordMatch');
  }, [state.password]);

  const formDataObject = new FormData();

  const handleFormSubmit = async (values) => {
    console.log('res::::: submit', values);
    formDataObject.append('org_id', orgId); // '65843d2d5cb75b6b569dbdb9'
    formDataObject.append('event_name', values.event_name);
    formDataObject.append('short_bio', values.short_bio);
    formDataObject.append('to_date', values.to_date);
    formDataObject.append('from_date', values.from_date);
    try {
      console.log('FormData ::::', formDataObject);
      const res = addEvent(formDataObject);
      console.log('res::::: addd event ', res);
      handleClose();
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  const initialValues = {
    org_id: '',
    event_name: '',
    short_bio: '',
    event_name: '',
    to_date: '',
    from_date: '',
  };

  const validationSchema = Yup.object().shape({
    event_name: Yup.string().required('Event is required!'),
    short_bio: Yup.string().required('Short bio is required!'),
  });

  return (
    <div>
      <ValidatorForm onError={() => null}>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    type="text"
                    name="event_name"
                    id="standard-basic"
                    onChange={handleChange}
                    errorMessages={['this field is required']}
                    label="Event Name"
                    validators={['required']}
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.event_name}
                    helperText={touched.event_name && errors.event_name}
                    error={Boolean(errors.event_name && touched.event_name)}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    name="short_bio"
                    label="Description"
                    onChange={handleChange}
                    value={values.short_bio || ''}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    type="text"
                    id="standard-basic"
                    variant="outlined"
                    onBlur={handleBlur}
                    helperText={touched.short_bio && errors.short_bio}
                    error={Boolean(errors.short_bio && touched.short_bio)}
                    sx={{ mb: 3 }}
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={values.from_date}
                      onChange={handleChange} //{handleDateChange}
                      renderInput={() => (
                        <TextField
                          //   {...props}
                          // label="Start date"
                          // id="mui-pickers-date"
                          // sx={{ mb: 2, width: '100%' }}

                          name="from_date"
                          label="Start date"
                          onChange={handleChange}
                          value={values.from_date || ''}
                          validators={['required']}
                          errorMessages={['this field is required']}
                          type="text"
                          id="standard-basic"
                          variant="outlined"
                          onBlur={handleBlur}
                          helperText={touched.from_date && errors.from_date}
                          error={Boolean(errors.from_date && touched.from_date)}
                          sx={{ mb: 3 }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={values.to_date}
                      onChange={handleChange} //{handleDateChange}
                      renderInput={() => (
                        <TextField
                          //   {...props}
                          // label="End date"
                          // id="mui-pickers-date"
                          // sx={{ mb: 2, width: '100%' }}
                          name="to_date"
                          label="End date"
                          onChange={handleChange}
                          value={values.to_date || ''}
                          validators={['required']}
                          errorMessages={['this field is required']}
                          type="text"
                          id="standard-basic"
                          variant="outlined"
                          onBlur={handleBlur}
                          helperText={touched.to_date && errors.to_date}
                          error={Boolean(errors.to_date && touched.to_date)}
                          sx={{ mb: 3 }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item sx={{ mt: 2 }}>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit" onClick={handleSubmit}>
                    Create
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </ValidatorForm>
    </div>
  );
};

export default CreateCampaign;
