// third-party modules
import React, {FC, useState} from 'react';
import {Stack, Button, SxProps, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
// own modules
import {emailValidation, loginPasswordValidation} from "../../validation/validation";
import {useAppDispatch} from "../../hooks/store.hook";
import {helperTextWithCapsLock, onTypingCapsLock} from "../supportingFunctions/helperTextWithCapsLock";
// actions
import {login} from "../../store/thunks/authentication";

const Login: FC<{ sx?: SxProps }> = ({sx}) => {
    const dispatch = useAppDispatch();
    const [isCapsLockUsing, setIsCapsLockUsing] = useState<boolean>(false);
    
    const formik = useFormik({
        initialValues: {email: "", password: ""},
        validationSchema: Yup.object({
                email: emailValidation,
                password: loginPasswordValidation
        }),
        onSubmit: (values, {setSubmitting}) => {
            dispatch(login(values));
            setSubmitting(false);
        },
        validateOnBlur: false
    });

    return (
        <Stack
            gap="2rem"
            sx={sx}
            component="form"
            className="login-content__form"
            onSubmit={formik.handleSubmit}
            onKeyDown={(event) => onTypingCapsLock(event, setIsCapsLockUsing)}
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
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                label="Пароль"
                variant="outlined"
                helperText={helperTextWithCapsLock(formik.errors.password, isCapsLockUsing)}
            />

            <Button
                type="submit"
                disabled={formik.isSubmitting}
                variant="outlined">
                Войти
            </Button>
        </Stack>
    );
};

export default Login;