import React from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

import './Search.css';

type Props = {
    handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchTerm: string;
}

const Search = ({ handleFilter, searchTerm }: Props) => {

    return (
        <TextField
            value={searchTerm}
            onChange={handleFilter}
            className="search"
            label="Search by customer name, card type, card number"
            variant="outlined"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
        )
}

export default Search;