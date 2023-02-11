import React, {FC} from 'react';
import {Stack, TextField, Button} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
// own modules
import {emailValidation} from "../../validation/validation";
import {useAppDispatch} from "../../hooks/store.hook";
import {recoveryPasswordGetLinkThunk} from "../../actions/authentication";
// types
import {IUser} from "../../models/IUser";


const RecoveryPasswordStart: FC = () => {
    const dispatch = useAppDispatch();

    const formik = useFormik<{email: IUser["email"]}>({
        initialValues: {email: ""},
        validationSchema: Yup.object({
            email: emailValidation
        }),
        onSubmit: (values, {setSubmitting}) => {
            dispatch(recoveryPasswordGetLinkThunk(values));
            setSubmitting(false);
        }
    });

    return (
        <Stack onSubmit={formik.handleSubmit} component="form" sx={{width: "50%", height: "30vh"}} justifyContent="center" gap="2rem">
            <TextField
                error={!!(formik.errors.email && formik.touched.email)}
                value={formik.values.email}
                onChange={formik.handleChange}
                variant="outlined"
                label="email"
                name="email"
                helperText={formik.errors.email}
            />

            <Button
                type="submit"
                disabled={formik.isSubmitting}
                variant="outlined"
            >
                Получить email
            </Button>
        </Stack>
    );
};

export default RecoveryPasswordStart;