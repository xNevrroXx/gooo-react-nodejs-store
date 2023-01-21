import React, {FC, useState} from 'react';
import {Box, Button, SxProps, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import {CSSTransition} from "react-transition-group";

import AuthService from "../../services/AuthService";
import {emailValidation, loginPasswordValidation} from "../../validation/validation";
import {useNavigate} from "react-router-dom";
import {INotifier} from "../../models/INotifier";
import axios, {AxiosError} from "axios";

const Login: FC<{ sx?: SxProps, onErrorLogin: (description: string) => void }> = ({sx, onErrorLogin}) => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {email: "", password: ""},
        validationSchema: Yup.object({
                email: emailValidation,
                password: loginPasswordValidation
            }),
        onSubmit: (values, {setSubmitting}) => {
            AuthService.login(values.email, values.password)
                .then(() => navigate("/main"))
                .catch((error: Error | AxiosError) => {
                    if(axios.isAxiosError(error) && error.response) {
                        onErrorLogin(error.response.data.message)
                    }
                    else {
                        onErrorLogin(error.message)
                    }
                })
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