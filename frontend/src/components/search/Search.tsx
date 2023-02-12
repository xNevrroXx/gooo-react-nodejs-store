import React, {useState} from 'react';
import {TextField, InputAdornment, Box, SxProps} from "@mui/material";
import {Search as SearchIcon} from "@mui/icons-material";

const Search = (props: {sx?: SxProps}) => {
  const [value, setValue] = useState("");

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
        value={value}
        onChange={event => setValue(event.target.value)}
      />
    </Box>
  );
};

export default Search;