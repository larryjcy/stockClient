import PropTypes from 'prop-types'
import React, { useState, useEffect, useCallback } from 'react'
import debounce from 'lodash.debounce'
// import InputAdornment from "@mui/material/InputAdornment"
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"

// material-ui
import { TextField } from '@mui/material'
// assets

// ==============================|| FILTER - INPUT ||============================== //

export const DebouncedInput = ({
  value: initialValue,
  onFilterChange,
  delay = 500,
  size,
  ...props
}) => {
  const [value, setValue] = useState(initialValue)
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const debouncedChangeHandler = useCallback(
      debounce((newValue) => {
        onFilterChange(newValue)
      }, delay),
      [onFilterChange, delay]
  )

  const handleInputChange = (event) => {
    setValue(event.target.value)
    debouncedChangeHandler(event.target.value)
  }

  return (
    <TextField
      {...props}
      value={value}
      onChange={handleInputChange}
      sx={{ minWidth: 100 }}
      {...(size && { size })}
    />
  )
}

DebouncedInput.propTypes = {
  filename: PropTypes.string,
  data: PropTypes.array,
  value: PropTypes.string,
  onFilterChange: PropTypes.func,
  debounce: PropTypes.number,
  size: PropTypes.string,
  startAdornment: PropTypes.node
}

export default DebouncedInput
