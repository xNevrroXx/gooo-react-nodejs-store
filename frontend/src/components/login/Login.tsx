import React, {FC, useState} from 'react';
import {Box, Button, SxProps, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import {CSSTransition} from "react-transition-group";

import AuthService from "../../services/AuthService";
import {emailValidation, loginPasswordValidation} from "../../validation/validation";
import {useNavigate} from "react-router-dom";
import Notifier from "../notifier/Notifier";


const Login: FC<{ sx?: SxProps }> = ({sx}) => {
    const [isShowNotifier, setIsShowNotifier] = useState<boolean>(true);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {email: "", password: ""},
        validationSchema: Yup.object({
                email: emailValidation,
                password: loginPasswordValidation
            }),
        onSubmit: (values, {setSubmitting}) => {
            setIsShowNotifier(!isShowNotifier)
            // AuthService.login(values.email, values.password)
            //     // .then(() => navigate("/main"));
            //     // .then(() => setIsShowNotifier(!isShowNotifier))
            //     .catch(() => setIsShowNotifier(!isShowNotifier))
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
            <CSSTransition classNames="notifier" in={isShowNotifier} timeout={200}>
                <Notifier icon="information" title="Title" description="mini-description"/>
            </CSSTransition>
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