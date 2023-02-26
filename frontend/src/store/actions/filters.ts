import {createAction} from "@reduxjs/toolkit";
import {IFilter, TFilterField} from "../../models/IFilter";


export const addFilter =  createAction< TFilterField<"nameQuery"> | TFilterField<"categoryId"> | TFilterField<"price"> | TFilterField<"weight"> >("filters/addFilter")

// function withPayloadType<T extends keyof IFilter>() {
//     return ( t: TFilterField<T> ) => ({ payload: t })
// }
// export const addFilter = createAction("filters/addFilter", withPayloadType()); // хочется что-то вроде этого, но тогда работает неправильно

