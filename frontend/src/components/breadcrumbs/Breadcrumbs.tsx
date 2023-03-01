import React, {FC, useCallback} from 'react';
import {Breadcrumbs as MuiBreadcrumbs, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
// own modules
import LinkTypography from "../styledComponents/LinkTypography";
import {useAppSelector} from "../../hooks/store.hook";
import {createPath} from "../../router/createPath";
import {ROUTE} from "../../router";
// selectors
import {hierarchyCategoriesArrSelector} from "../../store/selectors/categories";

interface IBreadcrumbs {
    targetCategoryId: number,
    isLastLink?: boolean
}
const Breadcrumbs: FC<IBreadcrumbs> = ({targetCategoryId, isLastLink = false}) => {
    const navigate = useNavigate();
    const hierarchyCategoriesArr = useAppSelector(state => hierarchyCategoriesArrSelector(state, targetCategoryId)) ;

    const onClick = useCallback((route: string) => {
        navigate(route);
    }, [])

    return (
        <MuiBreadcrumbs aria-label="breadcrumb" maxItems={5} sx={{mb: "1rem"}}>
            {hierarchyCategoriesArr.map((category, index) => {
                if (index === hierarchyCategoriesArr.length - 1 && !isLastLink) {
                    return <Typography color="text.primary">{category.label}</Typography>
                }
                return (
                    <LinkTypography color="inherit" onClick={() => onClick(createPath({ path: ROUTE.MAIN_WITH_FILTERS, params: {categoryId: category.id} } ))}>
                        {category.label}
                    </LinkTypography>
                )
            })}
        </MuiBreadcrumbs>
    );
};

export default Breadcrumbs;