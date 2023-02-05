import {useNavigate} from "react-router-dom";
import React, {FC, MouseEvent, useCallback, useEffect, useMemo, useState} from "react";
import {Button, Grid, Menu, MenuItem, Stack} from "@mui/material";
import {KeyboardArrowRight as KeyboardArrowRightIcon, Menu as MenuIcon} from "@mui/icons-material";
// own modules
import ChildCategories from "../childCategories/ChildCategories";
import {useAppSelector} from "../../hooks/store.hook";
// types
import {ICategoryTree} from "../../models/ICategoryTree";

interface ICatalogProps {
    onClickOverload?: (id: number) => void
}

const Catalog: FC<ICatalogProps> = ({onClickOverload}) => {
    const navigate = useNavigate();
    const categories = useAppSelector(state => state.categories.categories) as ICategoryTree[];

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [parentId, setParentId] = useState<ICategoryTree["id"] | null>();
    const onOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget), []);
    const onClose = useCallback(() => setAnchorEl(null), []);
    const isOpen = Boolean(anchorEl);

    useEffect(() => {
        if(categories && categories[0]) {
            setParentId(categories[0].id);
        }
    }, [categories])

    const onChangeChildCategories = useCallback((event: MouseEvent<HTMLElement>) => {
        const targetEl = event.target;
        if(targetEl instanceof HTMLElement) {
            const id = targetEl.getAttribute("data-category-id");
            setParentId(id ? +id : 0);
        }
    }, [])

    const onClick = (id: ICategoryTree["id"]) => {
        onClose();
        if(onClickOverload) {
            onClickOverload(id);
        }
        else {
            navigate("/"+id)
        }
    }

    const categoryElements = useMemo(() => {
        return categories.map(({id, label, name, parentId}) => (
            <MenuItem
                onMouseEnter={onChangeChildCategories}
                onClick={() => onClick(id)}

                key={name+id}
                data-category-name={name}
                data-category-id={id}
                data-category-parent-id={parentId}
            >
                <Stack direction="row" justifyContent="space-between" width="100%">
                    {label}
                    <KeyboardArrowRightIcon/>
                </Stack>
            </MenuItem>
        ))
    }, [categories])

    return (
        <>
            <Button
                id="catalog-menu-button"
                variant="contained"
                startIcon={<MenuIcon/>}
                sx={{display: {xs: "none", sm: "flex"}, mr: "1rem", width: "max-content", padding: ".5rem 1.5rem"}}
                onClick={onOpen}
                aria-controls={isOpen ? "catalog-dropdown-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={isOpen ? 'true' : undefined}
            >
                Каталог
            </Button>
            <Menu
                id="catalog-dropdown-menu"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={isOpen}
                onClose={onClose}
                MenuListProps={{
                    'aria-labelledby': 'catalog-menu-button',
                }}
            >
                <Grid container sx={{width: "80vw", height: "max-content", minHeight: "50vh"}} spacing={5}>
                    <Grid item xs={2}>
                        <Stack direction="column">
                            {categoryElements}
                        </Stack>
                    </Grid>
                    <Grid item xs={10}>
                        {parentId ? <ChildCategories categories={categories} parentId={parentId} onClick={(id) => onClick(id)}/> : null}
                    </Grid>
                </Grid>
            </Menu>
        </>
    )
}

export default Catalog;