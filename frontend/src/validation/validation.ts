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
        .matches(/^.*(?=.*[!#$%&? "]).*$/, "Минимум 1 из символов: !#$% &?\"");

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

export const technicalNameCategoryValidation =
    Yup.string()
        .required("*Обязательное поле")
        .min(2, "Минимум 2 символа")
        .max(150, "Максимум 150 символов")
        .matches(/^[a-z]+(-[a-z]+)*$/, "Только на английском языке в формате: name-of-the-category");

export const labelCategoryValidation =
    Yup.string()
        .required("*Обязательное поле")
        .min(2, "Минимум 2 символа")
        .max(150, "Максимум 150 символов")
        .matches(/^[а-яёА-ЯЁa-z]+( [а-яёА-ЯЁa-z]+)*$/i, "Только на русском и английском языке в формате: Машинки для стрижки и триммеры");

export const categoryIdValidation =
    Yup.string()
        .required("*Обязательное поле")
        .matches(/^[0-9]+$/, "Только цифры, представляющие собой идентификатор родительской категории");

export const locationValidation =
    Yup.string()
        .required("*Обязательное поле")
        .min(2, "Минимум 2 символа")
        .max(150, "Максимум 150 символов");

export const isAdminValidation =
    Yup.number()
        .required("*Обязательное поле")
        .min(0, "Возможно выбрать либо <b>да(1)</b>, либо <b>нет(0)</b>.")
        .max(1, "Возможно выбрать либо <b>да(1)</b>, либо <b>нет(0)</b>.")