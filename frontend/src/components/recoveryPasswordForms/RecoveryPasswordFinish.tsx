import React, {FC} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {Button, Stack, TextField} from "@mui/material";
// own modules
import {useAppDispatch} from "../../hooks/store.hook";
import {passwordValidation} from "../../validation/validation";
import {recoveryPasswordChangePasswordThunk} from "../../actions/authentication";
// types
import {IUser} from "../../models/IUser";
import {useParams} from "react-router-dom";

const RecoveryPasswordFinish: FC = () => {
    const dispatch = useAppDispatch();
    const {recoveryLink} = useParams();

    const formik = useFormik<{newPassword: IUser["password"], passwordRepeat: IUser["password"]}>({
        initialValues: {
            newPassword: "",
            passwordRepeat: ""
        },
        validationSchema: Yup.object({
            newPassword: passwordValidation,
            passwordRepeat: passwordValidation,
        }),
        onSubmit: (values, {setSubmitting}) => {
            dispatch(recoveryPasswordChangePasswordThunk({code: recoveryLink as string, password: values.newPassword}))
            setSubmitting(false);
        }
    });

    return (
        <Stack onSubmit={formik.handleSubmit} component="form" sx={{width: "50%", height: "30vh"}} justifyContent="center" gap="2rem">
            <TextField
                error={!!(formik.errors.newPassword && formik.touched.newPassword)}
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                variant="outlined"
                label="Новый пароль"
                name="newPassword"
                autoComplete="none"
                type="password"
                helperText={formik.errors.newPassword}
            />
            <TextField
                error={!!(formik.errors.passwordRepeat && formik.touched.passwordRepeat)}
                value={formik.values.passwordRepeat}
                onChange={formik.handleChange}
                variant="outlined"
                label="Повторите пароль"
                name="passwordRepeat"
                autoComplete="none"
                type="password"
                helperText={formik.errors.passwordRepeat}
            />

            <Button
                type="submit"
                disabled={formik.isSubmitting}
                variant="outlined"
            >
                Изменить пароль
            </Button>
        </Stack>
    );
};

export default RecoveryPasswordFinish;