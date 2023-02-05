import React, {FC} from 'react';
import {Box, Button, SxProps, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";

// own modules
import {registrationThunk} from "../../actions/authentication";
import {
    emailValidation,
    lastnameValidation,
    firstnameValidation,
    passwordValidation,
    usernameValidation
} from "../../validation/validation";
import {useAppDispatch} from "../../hooks/store.hook";

const Registration: FC<{ sx?: SxProps }> = ({sx}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {email: "", password: "", username: "", firstname: "", lastname: ""},
        validationSchema: Yup.object({
            email: emailValidation,
            password: passwordValidation,
            username: usernameValidation,
            firstname: firstnameValidation,
            lastname: lastnameValidation
        }),
        onSubmit: (values, {setSubmitting}) => {
            dispatch(registrationThunk(values.email, values.password, values.username, values.firstname, values.lastname))
            setSubmitting(false);
        },
        validateOnBlur: false
    });

    return (
        <Box
            sx={{display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: "2rem"}}
            component="form"
            className="login-content__form"
            onSubmit={formik.handleSubmit}
        >
            <Typography variant="h5">Регистрация</Typography>
            <TextField
                name="email"
                error={!!(formik.errors.email && formik.touched.email)}
                onChange={formik.handleChange}
                value={formik.values.email}
                label="Почта"
                variant="outlined"
                helperText={formik.errors.email}/>
            <TextField
                name="password"
                error={!!(formik.errors.password && formik.touched.password)}
                onChange={formik.handleChange}
                value={formik.values.password}
                label="Пароль"
                variant="outlined"
                helperText={formik.errors.password}/>
            <TextField
                name="username"
                error={!!(formik.errors.username && formik.touched.username)}
                onChange={formik.handleChange}
                value={formik.values.username}
                label="Псевдоним"
                variant="outlined"
                helperText={formik.errors.username}/>
            <TextField
                name="firstname"
                error={!!(formik.errors.firstname && formik.touched.firstname)}
                onChange={formik.handleChange}
                value={formik.values.firstname}
                label="Имя"
                variant="outlined"
                helperText={formik.errors.firstname}/>
            <TextField
                name="lastname"
                error={!!(formik.errors.lastname && formik.touched.lastname)}
                onChange={formik.handleChange}
                value={formik.values.lastname}
                label="Фамилия"
                variant="outlined"
                helperText={formik.errors.lastname}/>

            <Button
                type="submit"
                disabled={formik.isSubmitting}
                variant="outlined">
                Зарегистрироваться
            </Button>
        </Box>
    )
};

export default Registration;