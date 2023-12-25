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
const names = ['Swimmer', ' mountain climber', 'Fire&Safety'];

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
              <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
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
