import React, {ChangeEvent, EventHandler, KeyboardEvent, useCallback, useTransition} from 'react';
import {TextField, InputAdornment, Box, SxProps} from "@mui/material";
import {Search as SearchIcon} from "@mui/icons-material";
import {useLocation, useNavigate} from "react-router-dom";
// own modules
import {useAppDispatch, useAppSelector} from "../../hooks/store.hook";
import {ROUTE} from "../../router";
// actions & thunks & selectors
import {addFilter} from "../../store/actions/filters";
import {createPath} from "../../router/createPath";

const Search = (props: {sx?: SxProps}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = useAppSelector(state => state.filters.filters.nameQuery);
    const dispatch = useAppDispatch();
    const [isPending, startTransition] = useTransition();

    const onValueChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        startTransition(() => dispatch(addFilter({filterType: "nameQuery", value: text} )))
    }, [])

    const onKeydownEnter = useCallback<EventHandler<KeyboardEvent<HTMLInputElement>>>((event) => {
        if (event.key === "Enter" && location.pathname !== ROUTE.FILTERING) {
            navigate(createPath({path: ROUTE.FILTERING_NAME, params: {nameQuery: query} }));
        }
    }, [location])

    return (
        <Box
            sx={{...props.sx}}
        >
            <TextField
                id="main-search"
                type="search"
                color="secondary"
                className="search-input"
                placeholder="Search..."
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon/>
                        </InputAdornment>
                    ),
                }}
                variant="standard"
                sx={{width: {xs: "100%"}}}
                value={query}
                onChange={onValueChange}
                onKeyDown={onKeydownEnter}
            />
        </Box>
    );
};

export default Search;