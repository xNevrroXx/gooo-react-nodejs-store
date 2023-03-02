import React, {FC} from 'react';
import {FormControl, FormControlLabel, RadioGroup, Radio} from "@mui/material";
// actions
import {useAppDispatch, useAppSelector} from "../../hooks/store.hook";
import {changeSortMethod} from "../../store/actions/filters";
// types
import {TSorting} from "../../models/IFilter";

const SortingSwitch: FC = () => {
    const sorting = useAppSelector(state => state.filters.sorting);

    const handleChange = (sortMethod: TSorting) => {
        dispatch(changeSortMethod(sortMethod));
    };
    const dispatch = useAppDispatch();

    return (
        <FormControl>
            <RadioGroup row>
                <FormControlLabel
                    control={<Radio size="small" />}
                    value="По умолчанию"
                    checked={sorting.label === "По умолчанию"}
                    label="По умолчанию"
                    onChange={() => handleChange({label: "По умолчанию", filterParam: "none"})}
                />
                <FormControlLabel
                    control={<Radio size="small" />}
                    value="По убыванию цены"
                    checked={sorting.label === "По убыванию цены"}
                    label="По убыванию цены"
                    onChange={() => handleChange({label: "По убыванию цены", filterParam: "price", startFrom: "max"})}
                />
                <FormControlLabel
                    control={<Radio size="small" />}
                    value="По возрастанию цены"
                    checked={sorting.label === "По возрастанию цены"}
                    label="По возрастанию цены"
                    onChange={() => handleChange({label: "По возрастанию цены", filterParam: "price", startFrom: "min"})}
                />
            </RadioGroup>
        </FormControl>
    );
};

export default SortingSwitch;