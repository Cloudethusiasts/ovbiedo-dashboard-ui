import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, IconButton, Box } from '@mui/material';
import { Search } from '@mui/icons-material';


const SearchBar = () => {

  const [searchTerm, setSearchTerm ] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if(searchTerm) {
      navigate(`./search/${searchTerm}`)
    }
    setSearchTerm('')
  }

  return (
    <Paper
    component="form"
    onSubmit={handleSubmit}
    direction="row"
    justifyContent='center'
    zIndex={-1}
    sx={{
      width:'373px',
      height:'50px',
      display:'flex',
    }}
    >
      <IconButton type='submit' sx={{ color: '#0C0000'}}>
        <Search/>
      </IconButton>
      <input
        className='search-bar'
        placeholder='Search'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Paper>
  )
}

export default SearchBar

