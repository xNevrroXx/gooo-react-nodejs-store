import * as YupOriginal from "yup";
const Yup = YupOriginal;

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
        .matches(/^[а-яёА-ЯЁa-z\d,.()]+( [а-яёА-ЯЁa-z\d,.()+/]+)*$/i, "Допустимые символы: русские и латинские буквы, цифры, а также: ,.()+/");

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
        .matches(/^https?:\/\/[-a-zA-Z0-9@:%._+~#=/]+$/, "Строка должна быть ссылкой")

// Yup.addMethod(Yup.array, "unique", function(message, mapper = (a: any) => a) {
//     return this.test("unique", message, function(list) {
//         return list!.length === new Set(list!.map(mapper)).size;
//     })
// })
export const arrayLinksValidation =
    Yup.array()
        .min(1, "Добавьте хотя бы 1-ну ссылку на фотографию товара")
        .max(5, "Максимум 5 изображений")
        .of(linkValidation)
        .test(
            'unique',
            (value) => {
                const message = "Значение должно быть уникальным, копия находится в поле номер ";
                const uniqueFieldIds: (string | null)[] = [];

                for (let i = 0; i < value.originalValue.length; i++) {
                    const targetStr = value.originalValue[i];

                    for (let j = 0; j < value.originalValue.length; j++) {
                        const str = value.originalValue[j];

                        if(j !== i && targetStr === str) {
                            uniqueFieldIds.push(message + (j + 1))
                            break;
                        }
                    }

                    if (!uniqueFieldIds[i]) {
                        uniqueFieldIds[i] = null;
                    }
                }

                return uniqueFieldIds;
            },
            (value) => {
                return value ? value.length === new Set(value)?.size : true;
            }
        )


Yup.addMethod(Yup.array, "unique", function (standardMessage?: string) {
    return this.test(
        'unique',
        "standard message",
        function (value) {
            const areOnlyUnique = value ? value.length === new Set(value)?.size : true;

            console.log("this: ", this);
            if (!areOnlyUnique) {
                let message: string;
                if (standardMessage) message = standardMessage
                else message = "The value must be an unique, but you have the copy in the field ";

                const arrayErrorMessages: (string | null)[] = [];

                for (let i = 0; i < value!.length; i++) {
                    const targetStr = value![i];

                    for (let j = 0; j < value!.length; j++) {
                        const str = value![j];

                        if(j !== i && targetStr === str) {
                            arrayErrorMessages.push(message + (j + 1))
                            break;
                        }
                    }

                    if (!arrayErrorMessages[i]) {
                        arrayErrorMessages[i] = null;
                    }
                }

                console.log("arrayErrorMessages: ", arrayErrorMessages);
                return this.createError({path: this.path, message: arrayErrorMessages as any})
            }

            return true;
        }
    )
})

export default Yup;