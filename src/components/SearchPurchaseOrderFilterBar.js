import React, { useEffect, useState, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Stack,
  Tooltip,
  IconButton,
  Grid,
  MenuItem,
  TextField
} from '@mui/material'
import ClearAllIcon from '@mui/icons-material/ClearAll'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

import { DebouncedInput } from '../components/third-party/react-table'
import { useSearchFilterContext } from '../context/SearchFilterContext'
import { SupplierFindAllApi } from 'api/SupplierApi'

const toDayjs = (v) => {
  if (!v) return null
  if (dayjs.isDayjs(v)) return v
  const d = dayjs(v)
  return d.isValid() ? d : null
}
const fmt = (d) => (d ? dayjs(d).format('YYYY-MM-DD') : null)

const FIELD_MIN_WIDTH = 240

const SearchPurchaseOrderFilterBar = (props) => {
  const { getContextFilterOption, setContextFilterOption } = useSearchFilterContext()

  const [filters, setFilters] = useState(null)
  const [suppliers, setSuppliers] = useState([])
  const [supplierId, setSupplierId] = useState(null)
  const isInitialized = useRef(false)

  // Build init filter for UI (dates default to NULL to show all records)
  const buildInit = useCallback(() => {
    const base = props.initFilter || {}
    return {
      supplierId: base.supplierId ?? null,
      supplierName: base.supplierName ?? '',
      staffName: base.staffName ?? '',
      startDate: null,
      endDate: toDayjs(base.endDate) ?? null
    }
  }, [props.initFilter])

  // Load persisted filters or initialize
  useEffect(() => {
    // Only run once on mount
    if (isInitialized.current) return
    isInitialized.current = true

    const history = getContextFilterOption(props.searchCacheKey)
    if (history) {
      const temp = {
        supplierId: history.supplierId ?? null,
        supplierName: history.supplierName ?? '',
        staffName: history.staffName ?? '',
        startDate: toDayjs(history.startDate),
        endDate: toDayjs(history.endDate)
      }
      setFilters(temp)
      setSupplierId(temp.supplierId ?? null)
    } else {
      const init = buildInit()
      setFilters(init)
      setSupplierId(init.supplierId ?? null)
      
      // Persist initial state (but don't send null/empty values)
      const persistData = {}
      if (init.startDate) persistData.startDate = fmt(init.startDate)
      if (init.endDate) persistData.endDate = fmt(init.endDate)
      if (init.supplierId) persistData.supplierId = init.supplierId
      if (init.supplierName) persistData.supplierName = init.supplierName
      if (init.staffName) persistData.staffName = init.staffName
      
      // Only persist if there's actual data
      if (Object.keys(persistData).length > 0) {
        setContextFilterOption(props.searchCacheKey, persistData)
      }
    }
  }, [props.searchCacheKey, getContextFilterOption, setContextFilterOption, buildInit])

  // Fetch suppliers once
  useEffect(() => {
    (async () => {
      try {
        const res = await SupplierFindAllApi()
        const raw =
          Array.isArray(res) ? res :
          Array.isArray(res?.data) ? res.data :
          Array.isArray(res?.items) ? res.items :
          Array.isArray(res?.data?.items) ? res.data.items : []
        const normalized = (raw || [])
          .filter(s => s && s.id != null)
          .map(s => ({
            id: Number(s.id),
            label: s.name ?? s.supplier ?? s.displayName ?? s.companyName ?? `#${s.id}`
          }))
          .sort((a, b) => a.label.localeCompare(b.label, 'en', { sensitivity: 'base' }))
        setSuppliers(normalized)
      } catch (e) {
        console.log('SupplierFindAllApi error:', e)
        setSuppliers([])
      }
    })()
  }, [])

  // Keep Dayjs in state; persist only non-null primitives to context
  const updateAndPersist = useCallback((nextPartial) => {
    setFilters((prev) => {
      const next = { ...(prev || buildInit()), ...nextPartial }
      
      // Only persist non-null/non-empty values
      const persistData = {}
      if (next.startDate) persistData.startDate = fmt(next.startDate)
      if (next.endDate) persistData.endDate = fmt(next.endDate)
      if (next.supplierId) persistData.supplierId = next.supplierId
      if (next.supplierName) persistData.supplierName = next.supplierName
      if (next.staffName) persistData.staffName = next.staffName
      
      setContextFilterOption(props.searchCacheKey, persistData)
      return next
    })
  }, [props.searchCacheKey, setContextFilterOption, buildInit])

  const handleFieldChange = useCallback((field, value) => {
    updateAndPersist({ [field]: value })
  }, [updateAndPersist])

  const handleCleanSearch = useCallback(() => {
    const reset = buildInit()
    reset.supplierId = null
    reset.supplierName = ''
    reset.staffName = ''
    reset.startDate = null
    reset.endDate = null

    setFilters(reset)
    setSupplierId(null)
    
    // Clear all persisted filters
    setContextFilterOption(props.searchCacheKey, {})
  }, [buildInit, props.searchCacheKey, setContextFilterOption])

  return (
    <>
      {filters && (
        <Stack sx={{ p: 2 }}>
          <Grid
            container
            spacing={2}
            alignItems="center"
          >
            {/* Supplier */}
            <Grid item xs={12} sm={6} md="auto" sx={{ minWidth: FIELD_MIN_WIDTH }}>
              <TextField
                select
                label="Supplier"
                size="small"
                value={supplierId ?? ''}
                onChange={(e) => {
                  const val = e.target.value === '' ? null : Number(e.target.value)
                  setSupplierId(val)
                  handleFieldChange('supplierId', val)
                }}
                sx={{ minWidth: 200 }}
                fullWidth
              >
                <MenuItem value=""><em>All</em></MenuItem>
                {suppliers.map(s => (
                  <MenuItem key={s.id} value={s.id}>{s.label}</MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Staff Name */}
            <Grid item xs={12} sm={6} md="auto" sx={{ minWidth: FIELD_MIN_WIDTH }}>
              <DebouncedInput
                fullWidth
                variant="outlined"
                size="small"
                label="Staff Name"
                name="staffName"
                value={filters.staffName ?? ''}
                onFilterChange={(v) => handleFieldChange('staffName', v)}
                placeholder="Staff (ID or name)"
              />
            </Grid>

            {/* Start Date */}
            <Grid item xs={12} sm={6} md="auto" sx={{ minWidth: FIELD_MIN_WIDTH }}>
              <DatePicker
                label="Start Date"
                format="YYYY-MM-DD"
                value={filters.startDate ?? null}
                onChange={(d) => handleFieldChange('startDate', d ?? null)}
                slotProps={{
                  textField: { fullWidth: true, size: 'small' }
                }}
              />
            </Grid>

            {/* End Date */}
            <Grid item xs={12} sm={6} md="auto" sx={{ minWidth: FIELD_MIN_WIDTH }}>
              <DatePicker
                label="End Date"
                format="YYYY-MM-DD"
                value={filters.endDate ?? null}
                onChange={(d) => handleFieldChange('endDate', d ?? null)}
                slotProps={{
                  textField: { fullWidth: true, size: 'small' }
                }}
              />
            </Grid>

            {/* Actions */}
            <Grid item xs="auto">
              <Tooltip title="Clean search">
                <IconButton onClick={handleCleanSearch} sx={{ mt: { xs: 0, md: 0.5 } }}>
                  <ClearAllIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Stack>
      )}
    </>
  )
}

SearchPurchaseOrderFilterBar.propTypes = {
  initFilter: PropTypes.object.isRequired,
  searchCacheKey: PropTypes.string.isRequired
}

export default SearchPurchaseOrderFilterBar