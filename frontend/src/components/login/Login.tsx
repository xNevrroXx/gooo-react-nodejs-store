import React, {FC} from 'react';
import {Box, Button, SxProps, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";

// own modules
import {loginThunk} from "../../actions/authentication";
import {emailValidation, loginPasswordValidation} from "../../validation/validation";
import {useAppDispatch} from "../../hooks/store.hook";

const Login: FC<{ sx?: SxProps }> = ({sx}) => {
    const dispatch = useAppDispatch();
    
    const formik = useFormik({
        initialValues: {email: "", password: ""},
        validationSchema: Yup.object({
                email: emailValidation,
                password: loginPasswordValidation
        }),
        onSubmit: (values, {setSubmitting}) => {
            dispatch(loginThunk(values.email, values.password));
            setSubmitting(false);
        },
        validateOnBlur: false
    });

    return (
        <Box
            sx={{display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: "2rem", ...sx}}
            component="form"
            className="login-content__form"
            onSubmit={formik.handleSubmit}
        >
            <Typography variant="h5">Вход</Typography>
            <TextField
                error={!!(formik.errors.email && formik.touched.email)}
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                label="Почта"
                variant="outlined"
                helperText={formik.errors.email}
            />

            <TextField
                error={!!(formik.errors.password && formik.touched.password)}
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                label="Пароль"
                variant="outlined"
                helperText={formik.errors.password}
            />

            <Button
                type="submit"
                disabled={formik.isSubmitting}
                variant="outlined">
                Войти
            </Button>
        </Box>
    );
};

export default Login;