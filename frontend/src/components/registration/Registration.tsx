import React, {FC, SyntheticEvent, useState} from 'react';
import {Autocomplete, Box, Button, SxProps, TextField, Typography} from "@mui/material";
import { useFormik} from "formik";
import * as Yup from "yup";

// own modules
import DadataService from "../../services/DadataService";
import {registrationThunk} from "../../actions/authentication";
import {
    emailValidation,
    lastnameValidation,
    firstnameValidation,
    passwordValidation,
    usernameValidation, location
} from "../../validation/validation";
import {useAppDispatch} from "../../hooks/store.hook";
// types
import {DaDataAddress, DaDataSuggestion} from "react-dadata";

const Registration: FC<{ sx?: SxProps }> = ({sx}) => {
    const dispatch = useAppDispatch();
    const [addressSuggestions, setAddressSuggestions] = useState<DaDataSuggestion<DaDataAddress>["value"][]>([]);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            username: "",
            firstname: "",
            lastname: "",
            location: ""
        },
        validationSchema: Yup.object({
            email: emailValidation,
            password: passwordValidation,
            username: usernameValidation,
            firstname: firstnameValidation,
            lastname: lastnameValidation,
            location: location
        }),
        onSubmit: (values, {setSubmitting}) => {
            dispatch(registrationThunk(values.email, values.password, values.username, values.firstname, values.lastname, values.location))
            setSubmitting(false);
        },
        validateOnBlur: false
    });

    const handleLocationInput = async (event: SyntheticEvent<Element, Event>) => {
        const query = (event.target as HTMLInputElement).value;

        await formik.setFieldValue("location", query);
        const response = await DadataService.getSuggestion(query);
        setAddressSuggestions(response.data.suggestions.map(address => address.value))
    }

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
            <Autocomplete
                options={addressSuggestions}
                getOptionLabel={(contact) => contact}
                value={formik.values.location}
                isOptionEqualToValue={() => false}
                renderInput={(params) => {
                    const inputProps = params.inputProps;
                    inputProps.autoComplete = "off";

                    return (
                        <TextField
                            {...params}
                            onChange={handleLocationInput}
                            fullWidth
                            name="location"
                            label="Адрес для доставки"
                            error={!!(formik.errors.location && formik.touched.location)}
                            helperText={formik.errors.location}
                            variant="outlined"
                        />
                    )
                }}
            />

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