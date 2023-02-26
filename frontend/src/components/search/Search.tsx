import React, {ChangeEvent, ChangeEventHandler, useCallback, useMemo, useState, useTransition} from 'react';
import {TextField, InputAdornment, Box, SxProps} from "@mui/material";
import {Search as SearchIcon} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../hooks/store.hook";
import {addFilter} from "../../store/actions/filters";

const Search = (props: {sx?: SxProps}) => {
    const query = useAppSelector(state => state.filters.filters.name);
    const dispatch = useAppDispatch();
    const [isPending, startTransition] = useTransition();

    const onValueChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        startTransition(() => dispatch(addFilter({filterType: "nameQuery", value: text === "" ? null : text} )))
    }, [])

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
            />
        </Box>
    );
};

export default Search;