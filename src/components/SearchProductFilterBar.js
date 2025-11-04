import React, {useState, useEffect} from "react"
import PropTypes from 'prop-types'
import { Stack, Tooltip, IconButton,TextField, Grid, MenuItem} from '@mui/material'
import ClearAllIcon from '@mui/icons-material/ClearAll'

import {DebouncedInput} from "../components/third-party/react-table"
import { useSearchFilterContext } from "../context/SearchFilterContext"
import CategoryApi from "api/CategoryApi"
import { SupplierFindAllApi } from "api/SupplierApi"

const SearchProductFilterBar = (props) => {
    const { getContextFilterOption, setContextFilterOption } = useSearchFilterContext()
    const [filters, setFilters] = useState(null)
    const [activeCategories, setActiveCategories] = useState([])
    const [suppliers, setSuppliers] = useState([])

    useEffect(() => {
        const historySearchData = getContextFilterOption(props.searchCacheKey)
        const temp = historySearchData ? { ...historySearchData } : null
        if (temp) {
            setFilters({...temp})
        } else {
            setFilters(props.initFilter)
            setContextFilterOption(props.searchCacheKey, props.initFilter)
        }
        

    }, [props.searchCacheKey, getContextFilterOption, props.initFilter, setContextFilterOption])

    useEffect(() => {
        let mounted = true
      
        async function load() {
            try {
                const [cats, sups] = await Promise.all([
                    CategoryApi.getActiveCategory(),
                    SupplierFindAllApi() // returns all suppliers
                ])
                if (mounted) {
                    setActiveCategories(Array.isArray(cats) ? cats : [])
                    setSuppliers(Array.isArray(sups) ? sups : [])
                }
            } catch (err) {
                console.error(err)
                if (mounted) {
                    setActiveCategories([])
                    setSuppliers([])
                }
            }
        }
      
        load()      
        return () => { mounted = false }
    }, [])

    const handleFieldChange = (field, value) => {
        setFilters(prev =>{
            const next = { ...(prev ?? {}), [field]: value }
            setContextFilterOption(props.searchCacheKey, next)
            return next
        
        })
    }

    const handleCleanSearch = () => {
        setContextFilterOption(props.searchCacheKey, props.initFilter)
        setFilters(props.initFilter)
    }

    return (
        <>
            {(filters) &&
                <Stack direction="row" spacing={2} alignItems="right" justifyContent="space-between" sx={{padding: 2}}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                select
                                variant="outlined"
                                size="small"
                                label="Category"
                                name="category"
                                fullWidth
                                sx={{ minWidth: 280 }}
                                value={filters?.category ?? ''}
                                onChange={(e) => {
                                const v = e.target.value
                                handleFieldChange('category', v === '' ? '' : Number(v))
                                }}
                                SelectProps={{ displayEmpty: true }}
                                InputLabelProps={{ shrink: true }}
                                
                            >
                                <MenuItem value="">
                                <em>All</em>
                                </MenuItem>
                                {activeCategories.map((c) => (
                                <MenuItem key={c.id} value={Number(c.id)}>
                                    {c.name ?? `#${c.id}`}
                                </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                select
                                variant="outlined"
                                size="small"
                                label="Supplier"
                                name="supplierId"
                                fullWidth
                                sx={{ minWidth: 280 }}
                                value={filters?.supplierId ?? ''}
                                onChange={(e) => {
                                const v = e.target.value
                                handleFieldChange('supplierId', v === '' ? '' : Number(v))
                                }}
                                SelectProps={{ displayEmpty: true }}
                                InputLabelProps={{ shrink: true }}
                            >
                                <MenuItem value="">
                                <em>All</em>
                                </MenuItem>
                                {suppliers.map((s) => (
                                <MenuItem key={s.id} value={Number(s.id)}>
                                    {s.name ?? `#${s.id}`}
                                </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <DebouncedInput
                            variant="outlined"
                            size="small"
                            label="SKU"
                            name='sku'
                            value={filters?.sku ?? ''}
                            onFilterChange={(value) => handleFieldChange('sku', value)}
                            placeholder={`SKU`}
                        />
                        <DebouncedInput
                            variant="outlined"
                            size="small"
                            label="Product Name"
                            name='name'
                            value={filters?.name}
                            onFilterChange={(Value) => {
                                handleFieldChange('name', Value)
                            }}
                            placeholder={`Product Name`}
                        />
                        {/* <DebouncedInput
                            label="outlined"
                            size="small"
                            lanel='Sub Category'
                            name='endDate'
                            value={filters?. ?? }
                            slotProps={{
                                actionBar: {
                                    actions: ['clear']
                                }
                            }}
                            onChange={(newValue) => {
                                handleFieldChange('', newValue)
                            }}
                        /> */}
                        <Tooltip title="Clean search">
                            <IconButton sx={{alignSelf: 'center'}} onClick={handleCleanSearch}>
                                <ClearAllIcon/>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>
            }
        </>
    )
}


export default SearchProductFilterBar

SearchProductFilterBar.propTypes = {
    initFilter:PropTypes.object,
    searchCacheKey: PropTypes.string
}
