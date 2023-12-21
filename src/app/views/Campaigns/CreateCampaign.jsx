import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Button, Grid, Icon, styled } from '@mui/material';
import { Span } from 'app/components/Typography';
import { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import useAuth from 'app/hooks/useAuth';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

const CreateCampaign = () => {
  const [state, setState] = useState({ date: new Date() });
  const { addEvent } = useAuth();

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule('isPasswordMatch');
  }, [state.password]);

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleDateChange = (date) => setState({ ...state, date });

  const { event_name, short_bio, from_date, to_date } = state;

  return (
    <div>
      <ValidatorForm onError={() => null}>
        <form>
          <Grid container spacing={1}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                type="text"
                name="event_name"
                id="standard-basic"
                value={event_name || ''}
                onChange={handleChange}
                errorMessages={['this field is required']}
                label="Event Name (Min length 4, Max length 9)"
                validators={['required', 'minStringLength: 4', 'maxStringLength: 9']}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                type="text"
                name="short_bio"
                label="Dscription"
                onChange={handleChange}
                value={short_bio || ''}
                validators={['required']}
                errorMessages={['this field is required']}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={from_date}
                  onChange={handleDateChange}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      label=" Start Date"
                      id="from_date"
                      sx={{ mb: 2, width: '100%' }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={to_date}
                  onChange={handleDateChange}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      label=" End Date"
                      id=" to_date"
                      sx={{ mb: 2, width: '100%' }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </form>
      </ValidatorForm>
    </div>
  );
};

export default CreateCampaign;
