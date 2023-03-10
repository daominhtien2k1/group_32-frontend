import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import { Alert } from '@mui/lab';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// project imports
import useScriptRef from 'hooks/useScriptRef';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { login } from '../../../../redux/actions/UserActions';

// ============================|| LOGIN ||============================ //

const AuthLogin = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [checked, setChecked] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, success, userInfo } = userLogin;

    useEffect(() => {
        if (success) {
            toast.success('Login success!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            });
        }
        if (userInfo) {
            navigate('/');
        }
    }, [userInfo, navigate]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (email, password) => {
        dispatch(login(email, password));
        if (error) throw new Error(error);
    };

    return (
        <>
            {loading && <CircularProgress color="success" />}
            {error && (
                <Alert variant="filled" severity="error">
                    {error}
                </Alert>
            )}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
            />
            <Formik
                initialValues={{
                    email: 'tienvd@gmail.com',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Ph???i l?? email h???p l???')
                        .min(6, 'Email/T??n ph???i c?? ??t nh???t 6 k?? t???')
                        .max(30, 'Email/T??n c?? t???i ??a 30 k?? t???')
                        .required('Email l?? tr?????ng b???t bu???c'),
                    password: Yup.string()
                        .min(6, 'M???t kh???u ph???i c?? ??t nh???t 6 k?? t???')
                        .max(30, 'M???t kh???u c?? t???i ??a 30 k?? t???')
                        .required('M???t kh???u l?? tr?????ng b???t bu???c')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                            // alert(JSON.stringify(values, null, 2));
                            handleSubmit(values.email, values.password);
                        }
                    } catch (err) {
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, isValid, dirty }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-login">?????a ch??? email / T??n</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="?????a ch??? email / T??n"
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">M???t kh???u</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="M???t kh???u"
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Ghi nh???"
                            />
                            <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                                Qu??n m???t kh???u?
                            </Typography>
                        </Stack>
                        {/* L???i n??m ra c???a Formilk b??? ch???m 1 l???n ?????u ti??n */}
                        {/*{errors.submit && (*/}
                        {/*    <Box sx={{ mt: 3 }}>*/}
                        {/*        <FormHelperText error>{errors.submit}</FormHelperText>*/}
                        {/*    </Box>*/}
                        {/*)}*/}

                        <Box sx={{ mt: 2 }}>
                            <Button
                                disableElevation
                                disabled={!(isValid && dirty)}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="secondary"
                            >
                                ????ng nh???p
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthLogin;
