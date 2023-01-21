import * as Yup from "yup";


export const emailValidation =
    Yup.string()
        .email("Неверный формат почтового адреса")
        .required("*Обязательное поле");

export const passwordValidation =
    Yup.string()
        .required("*Обязательное поле")
        .min(8, "Минимум 8 символов")
        .max(16, "Максимум 16 символов")
        .matches(/^.*(?=.*[a-z]).*$/, "Минимум 1 латинская строчная буква")
        .matches(/^.*(?=.*[A-Z]).*$/, "Минимум 1 прописная латинская буква")
        .matches(/^.*(?=.*\d).*$/, "Минимум 1 цифра")
        .matches(/^.*(?=.*[!#$%&? "]).*$/, "Минимум 1 из символов: !#$%&? \"");

export const loginPasswordValidation =
    Yup.string()
        .required("*Обязательное поле");

export const usernameValidation =
    Yup.string()
        .required("*Обязательное поле")
        .min(2, "Минимум 2 символа")
        .max(20, "Максимум 20 символов");

export const firstnameValidation =
    Yup.string()
        .required("*Обязательное поле")
        .min(2, "Минимум 2 символа")
        .max(150, "Максимум 150 символов");

export const lastnameValidation =
    Yup.string()
        .required("*Обязательное поле")
        .min(2, "Минимум 2 символа")
        .max(150, "Максимум 150 символов");