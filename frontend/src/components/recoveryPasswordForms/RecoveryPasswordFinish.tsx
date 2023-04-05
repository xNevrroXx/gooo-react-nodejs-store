import React, {FC, useState} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {Button, Stack, TextField} from "@mui/material";
import {useParams} from "react-router-dom";
// own modules
import {useAppDispatch} from "../../hooks/store.hook";
import {passwordValidation} from "../../validation/validation";
import {helperTextWithCapsLock, onTypingCapsLock} from "../supportingFunctions/helperTextWithCapsLock";
// actions
import {recoveryPasswordChangePassword} from "../../store/thunks/authentication";
// types
import {IUser} from "../../models/IUser";

const RecoveryPasswordFinish: FC = () => {
    const dispatch = useAppDispatch();
    const {recoveryLink} = useParams();
    const [isCapsLockUsing, setIsCapsLockUsing] = useState<boolean>(false);

    const formik = useFormik<{password: IUser["password"], confirmationPassword: IUser["password"]}>({
        initialValues: {
            password: "",
            confirmationPassword: ""
        },
        validationSchema: Yup.object({
            password: passwordValidation,
            confirmationPassword: passwordValidation.oneOf([Yup.ref("password"), "null"], "Пароли должны совпадать"),
        }),
        onSubmit: (values, {setSubmitting}) => {
            dispatch(recoveryPasswordChangePassword({code: recoveryLink as string, password: values.password}));
            setSubmitting(false);
        }
    });


    return (
        <Stack onSubmit={formik.handleSubmit} component="form" sx={{width: "50%", height: "30vh"}} justifyContent="center" gap="2rem" onKeyDown={(event) => onTypingCapsLock(event, setIsCapsLockUsing)}>
            <TextField
                error={!!(formik.errors.password && formik.touched.password)}
                value={formik.values.password}
                onChange={formik.handleChange}
                variant="outlined"
                label="Новый пароль"
                name="password"
                autoComplete="none"
                type="password"
                helperText={helperTextWithCapsLock(formik.errors.password, isCapsLockUsing)}
            />
            <TextField
                error={!!(formik.errors.confirmationPassword && formik.touched.confirmationPassword)}
                value={formik.values.confirmationPassword}
                onChange={formik.handleChange}
                variant="outlined"
                label="Повторите пароль"
                name="confirmationPassword"
                autoComplete="none"
                type="password"
                helperText={helperTextWithCapsLock(formik.errors.confirmationPassword, isCapsLockUsing)}
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