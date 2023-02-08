import React, { FC, SyntheticEvent, useState } from 'react';
import { Autocomplete, Stack, Button, SxProps, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useFormik } from "formik";
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
import {IUserRegistration} from "../../models/IUser";

const Registration: FC<{ sx?: SxProps }> = ({sx}) => {
    const dispatch = useAppDispatch();
    const [addressSuggestions, setAddressSuggestions] = useState<DaDataSuggestion<DaDataAddress>[]>([]);

    const formik = useFormik<IUserRegistration>({
        initialValues: {
            email: "",
            password: "",
            username: "",
            firstname: "",
            lastname: "",
            location: "",
            isAdmin: 0
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
            dispatch(registrationThunk(values))
            setSubmitting(false);
        },
        validateOnBlur: false
    });

    const handleLocationInput = async (event: SyntheticEvent<Element, Event>) => {
        const query = (event.target as HTMLInputElement).value;

        formik.handleChange(event);
        const response = await DadataService.getSuggestion(query);
        setAddressSuggestions(response.data.suggestions)
    }

    return (
        <Stack
            gap="2rem"
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
                freeSolo
                options={addressSuggestions}
                getOptionLabel={option => {
                    if(option instanceof Object) {
                        return option.value;
                    }

                    return option;
                }}
                value={formik.values.location}
                renderInput={(params) => {
                    const inputProps = params.inputProps;
                    inputProps.autoComplete = "none";

                    return (
                        <TextField
                            {...params}
                            fullWidth
                            onChange={handleLocationInput}
                            name="location"
                            label="Адрес для доставки"
                            error={!!(formik.errors.location && formik.touched.location)}
                            helperText={formik.errors.location}
                            variant="outlined"
                        />
                    )
                }}
            />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Хочу быть администратором(В целях тестирования приложения)</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="isAdmin"
                    label="Хочу быть администратором(В целях тестирования приложения)"
                    error={!!(formik.errors.isAdmin && formik.touched.isAdmin)}
                    value={formik.values.isAdmin}
                    onChange={formik.handleChange}
                >
                    <MenuItem value={1}>Да</MenuItem>
                    <MenuItem value={0}>Нет</MenuItem>
                </Select>
            </FormControl>

            <Button
                type="submit"
                disabled={formik.isSubmitting}
                variant="outlined">
                Зарегистрироваться
            </Button>
        </Stack>
    )
};

export default Registration;