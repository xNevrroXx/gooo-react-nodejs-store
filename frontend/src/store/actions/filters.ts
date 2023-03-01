import {createAction} from "@reduxjs/toolkit";
import {IFilter, TFilterField, TSorting} from "../../models/IFilter";


export const addFilter =  createAction< TFilterField<"nameQuery"> | TFilterField<"categoryId"> | TFilterField<"price"> | TFilterField<"weight"> >("filters/addFilter");
export const resetFilters = createAction<{filterFieldsToReset: (keyof IFilter)[]}>("filters/resetFilters");
export const setFilters = createAction<IFilter>("filters/setFilters");
export const changeSortMethod = createAction<TSorting>("filters/changeSortMethod");
// function withPayloadType<T extends keyof IFilter>() { // todo find out how to infer type
//     return ( t: TFilterField<T> ) => ({ payload: t })
// }
// export const addFilter = createAction("filters/addFilter", withPayloadType()); // => wrong typization

