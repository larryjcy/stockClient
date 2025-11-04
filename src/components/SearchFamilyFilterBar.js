import React, { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { Stack, Tooltip, IconButton, CircularProgress, TextField } from '@mui/material'
import ClearAllIcon from '@mui/icons-material/ClearAll'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Autocomplete from '@mui/material/Autocomplete'
import dayjs from 'dayjs'

import { DebouncedInput } from '../components/third-party/react-table'
import { useSearchFilterContext } from '../context/SearchFilterContext'

const SearchFamilyFilterBar = (props) => {
  const { getContextFilterOption, setContextFilterOption } = useSearchFilterContext()

  const [filters, setFilters] = useState(null)

  // Autocomplete state
  const [acOpen, setAcOpen] = useState(false)
  const [nameInput, setNameInput] = useState('')
  const [nameOptions, setNameOptions] = useState([])
  const [nameLoading, setNameLoading] = useState(false)

  const reqIdRef = useRef(0)
  const debounceTimerRef = useRef(null)

  const commitFilterChange = useCallback((field, value) => {
    setFilters((prev) => {
      const next = { ...(prev || {}), [field]: value }
      setContextFilterOption(props.searchCacheKey, next)
      return next
    })
  }, [props.searchCacheKey, setContextFilterOption])

  useEffect(() => {
    const cached = getContextFilterOption(props.searchCacheKey)
    if (cached) {
      // Respect cached values; do NOT force a default date
      const temp = { ...cached }
      // keep legacy fields but treat startDate as the "cutoff" if present
      temp.startDate = cached.startDate ? dayjs(cached.startDate) : null
      temp.endDate   = cached.endDate   ? dayjs(cached.endDate)   : null
      setFilters(temp)
      setNameInput(temp?.clientKeyword ?? props.initFilter?.clientKeyword ?? '')
    } else {
      // Default: no cutoff date (null), so a recompute without cutoff rebuilds all
      const init = { ...(props.initFilter || {}), startDate: null, endDate: null }
      setFilters(init)
      setNameInput(props.initFilter?.clientKeyword ?? '')
      setContextFilterOption(props.searchCacheKey, init)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchCacheKey])

  const handleCleanSearch = () => {
    const reset = {
      ...(props.initFilter || {}),
      startDate: null,
      endDate: null,
      clientUid: '',
      clientKeyword: '',
      familyId: ''
    }
    setContextFilterOption(props.searchCacheKey, reset)
    setFilters(reset)
    setNameInput('')
    setNameOptions([])
    setAcOpen(false)
  }

  // single date -> set BOTH startDate and endDate; allow null for "no cutoff"
  const handleSingleDateChange = (value) => {
    const v = value ? dayjs(value) : null
    setFilters((prev) => {
      const next = { ...(prev || {}), startDate: v, endDate: v }
      setContextFilterOption(props.searchCacheKey, next)
      return next
    })
  }

  // ---- async search (debounced) ----
  const triggerNameSearch = useCallback((keyword) => {
    if (!props.fetchNameOptions) {
      if (process.env.NODE_ENV !== 'production') console.warn('SearchFamilyFilterBar: fetchNameOptions prop is missing.')
      return
    }

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
    const q = (keyword || '').trim()
    if (!q) {
      setNameOptions([])
      setNameLoading(false)
      return
    }

    debounceTimerRef.current = setTimeout(async () => {
      const myReq = ++reqIdRef.current
      try {
        setNameLoading(true)
        const raw = await props.fetchNameOptions(q)
        if (myReq !== reqIdRef.current) return
        const opts = Array.isArray(raw)
          ? raw.map((r) => {
              const id   = r?.id ?? r?.clientUid ?? r?.uid ?? r?.value ?? r?.name ?? q
              const name = r?.name ?? r?.fullName ?? r?.label ?? r?.displayName ?? String(id)
              return { id, name }
            })
          : []
        setNameOptions(opts)
      } catch {
        setNameOptions([])
      } finally {
        if (myReq === reqIdRef.current) setNameLoading(false)
      }
    }, 250)
  }, [props])

  return (
    <>
      {filters && (
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{ padding: 2, flexWrap: 'wrap' }}
        >
          <Stack direction="row" spacing={2} alignItems="center" sx={{ flexWrap: 'wrap' }}>
            <DebouncedInput
              variant="outlined"
              size="small"
              label="Client ID"
              name="clientUid"
              value={filters?.clientUid ?? ''}
              onFilterChange={(v) => commitFilterChange('clientUid', v)}
              placeholder="Client ID"
            />

            <Autocomplete
              freeSolo
              options={nameOptions}
              disablePortal
              open={acOpen}
              onOpen={() => {
                setAcOpen(true)
                const txt = nameInput.trim()
                if (txt && nameOptions.length === 0) triggerNameSearch(txt)
              }}
              onClose={() => setAcOpen(false)}
              loading={nameLoading}
              value={null}
              inputValue={nameInput}
              onInputChange={(_, newInput, reason) => {
                const txt = newInput ?? ''
                setNameInput(txt)
                if (reason === 'input') {
                  setAcOpen(Boolean(txt.trim()))
                  triggerNameSearch(txt)
                }
                if (!txt) setNameOptions([])
              }}
              onChange={(_, newValue) => {
                if (!newValue) {
                  setNameInput('')
                  commitFilterChange('clientKeyword', '')
                  commitFilterChange('clientUid', '')
                  setAcOpen(false)
                  return
                }
                const selectedName = typeof newValue === 'string' ? newValue : newValue.name
                const selectedId   = typeof newValue === 'string' ? ''       : (newValue.id ?? '')
                setNameInput(selectedName)
                commitFilterChange('clientKeyword', selectedName)
                if (selectedId) commitFilterChange('clientUid', String(selectedId || ''))
                setAcOpen(false)
                setNameOptions([])
              }}
              onFocus={() => {
                const txt = nameInput.trim()
                if (txt) {
                  triggerNameSearch(txt)
                  setAcOpen(true)
                }
              }}
              isOptionEqualToValue={(opt, val) => {
                const on = typeof opt === 'string' ? opt : opt?.name
                const vn = typeof val === 'string' ? val : val?.name
                return on === vn
              }}
              filterOptions={(x) => x}
              autoHighlight
              openOnFocus
              ListboxProps={{ onMouseDown: (e) => e.preventDefault() }}
              noOptionsText={nameLoading ? 'Searching…' : (nameInput.trim() ? 'No matches' : 'Type a name')}
              getOptionLabel={(opt) => (typeof opt === 'string' ? opt : (opt?.name ?? ''))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Name"
                  size="small"
                  placeholder="Type to search…"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {nameLoading ? <CircularProgress color="inherit" size={16} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    )
                  }}
                  sx={{ minWidth: 260 }}
                />
              )}
            />

            <DebouncedInput
              variant="outlined"
              size="small"
              label="Family ID"
              name="familyId"
              value={filters?.familyId ?? ''}
              onFilterChange={(v) => commitFilterChange('familyId', v)}
              placeholder="Family ID"
            />

            <DatePicker
              label="Cutoff (before)"
              format="YYYY-MM-DD"
              value={filters?.startDate ?? null}
              slotProps={{ actionBar: { actions: ['clear', 'today'] },
                textField: { size: 'small', variant: 'outlined', sx: { minWidth: 180 } } 
              }}
              onChange={handleSingleDateChange}
              // when cleared, MUI passes `null` -> handleSingleDateChange(null)
            />

            <Tooltip title="Clean search">
              <IconButton sx={{ alignSelf: 'center' }} onClick={handleCleanSearch}>
                <ClearAllIcon />
              </IconButton>
            </Tooltip>
          </Stack>

          {/* Right-side custom actions (optional) */}
          {props.rightActions ? (
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: { xs: 1, sm: 0 } }}>
              {props.rightActions}
            </Stack>
          ) : null}
        </Stack>
      )}
    </>
  )
}

SearchFamilyFilterBar.propTypes = {
  initFilter: PropTypes.object,
  searchCacheKey: PropTypes.string,
  allowEditStaffKeyword: PropTypes.bool,
  /** (keyword: string) => Promise<Array<{ id: string|number, name: string }>> */
  fetchNameOptions: PropTypes.func,
  /** Right-side custom actions node (e.g., Recompute button) */
  rightActions: PropTypes.node
}

export default SearchFamilyFilterBar
