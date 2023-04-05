import React, {FC, useCallback} from 'react';
import {Breadcrumbs as MuiBreadcrumbs, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
// own modules
import LinkTypography from "../styledComponents/LinkTypography";
import {useAppDispatch, useAppSelector} from "../../hooks/store.hook";
import {createPath} from "../../router/createPath";
import {ROUTE} from "../../router";
// actions & thunks & selectors
import {hierarchyCategoriesArrSelector} from "../../store/selectors/categories";
import {addFilter} from "../../store/actions/filters";
import {filteredProductsSelector} from "../../store/selectors/products";
// types
import {ICategory} from "../../models/ICategory";

interface IBreadcrumbs {
    targetCategoryId: number,
    isLastLink?: boolean
}
const Breadcrumbs: FC<IBreadcrumbs> = ({targetCategoryId, isLastLink = false}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const products = useAppSelector(filteredProductsSelector);
    const hierarchyCategoriesArr = useAppSelector(state => hierarchyCategoriesArrSelector(state, targetCategoryId)) ;

    const onClick = useCallback((route: string, categoryId: ICategory["id"]) => {
        dispatch(addFilter({filterType: "categoryId", value: categoryId}))
        navigate(route);
    }, [])

    if (!hierarchyCategoriesArr) return null;

    return (
        <MuiBreadcrumbs aria-label="breadcrumb" maxItems={5} sx={{mb: "1.5rem"}}>
            {hierarchyCategoriesArr.map((category, index) => {
                if (index === hierarchyCategoriesArr.length - 1 && !isLastLink) {
                    return (
                        <Typography key={category.label + index + "breadcrumb"} color="text.primary">
                            {category.label}
                            ({products.length})
                        </Typography>
                    )
                }
                return (
                    <LinkTypography key={category.label + index + "breadcrumb"} color="inherit" onClick={() => onClick( createPath({path: ROUTE.FILTERING_CATEGORY, params: { category: category.id }}), category.id )} >
                        {category.label}
                    </LinkTypography>
                )
            })}
        </MuiBreadcrumbs>
    );
};

export default Breadcrumbs;