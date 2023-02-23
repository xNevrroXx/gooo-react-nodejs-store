import {createAction} from "@reduxjs/toolkit";
import {IProductInCart} from "../../models/IProduct";

export const changeProductIsSelectedField = createAction<{ productId: IProductInCart["id"], isSelected: IProductInCart["isSelected"] }>("changeProductIsSelectedField");