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

export const technicalNameValidation =
    Yup.string()
        .required("*Обязательное поле")
        .min(2, "Минимум 2 символа")
        .max(150, "Максимум 150 символов")
        .matches(/^[a-z]+(-[a-z]+)*$/, "Только на английском языке в формате: name-of-the-category");

export const labelValidation =
    Yup.string()
        .required("*Обязательное поле")
        .min(2, "Минимум 2 символа")
        .max(150, "Максимум 150 символов")
        .matches(/^[а-яёА-ЯЁa-z\d/\\,+.)(-]+( [а-яёА-ЯЁa-z\d/\\,+.)(-]+)*$/i, "Допустимые символы: русские и латинские буквы, цифры, а также: ,.-+/\\)(");

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

export const positiveNumberValidation =
    Yup.number()
        .required("*Обязательное поле")
        .test(
            'Положительное число?',
            'Число должно быть больше 0',
            (value) => {
                if(value) {
                    return value > 0
                }
                return false;
            }
        );

export const weightUnitsValidation =
    Yup.string()
        .required("*Обязательное поле")
        .oneOf(["kilogram", "gram"], 'Возможно использовать либо "килограмм", либо "грамм"')

export const shortDescriptionValidation =
    Yup.string()
        .required("*Обязательное поле")
        .min(100, "Минимум 100 символов")
        .max(250, "Максимум 250 символов")

export const longDescriptionValidation =
    Yup.string()
        .required("*Обязательное поле")
        .min(500, "Минимум 500 символов")
        .max(5000, "Максимум 5000 символов")

export const linkValidation =
    Yup.string()
        .required("*Обязательное поле")
        .matches(/^https?:\/\/[-a-zA-Z0-9@:%._+~#=\/]+$/, "Строка должна быть ссылкой")

export const arrayLinksValidation =
    Yup.array()
        .min(1, "Добавьте хотя бы 1-ну ссылку на фотографию товара")
        .max(5, "Максимум 5 изображений")
        .of(linkValidation)