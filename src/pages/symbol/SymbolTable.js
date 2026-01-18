import PropTypes from 'prop-types'
import React, { useState, useMemo } from 'react'
import { useCallback,  useEffect } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

// material-ui
import {
    // Paper,
    Grid,
    Table,
    TableBody,
    TableContainer,
    TableCell,
    TableHead,
    TableRow,
    Stack,
    Box,
    Divider,
    FormControl,
    Tooltip, Button, Typography, InputLabel,
    FormControlLabel,
    Checkbox
} from '@mui/material'
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import {EditOutlined, PlusOutlined} from '@ant-design/icons'
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import IconButton from 'components/@extended/IconButton'
import EditNoteIcon from '@mui/icons-material/EditNote';
import { DebouncedInput } from '../../components/third-party/react-table'

// third-party
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender, getPaginationRowModel } from '@tanstack/react-table'
import Breadcrumbs from "../../components/@extended/Breadcrumbs"
import MainCard from 'components/MainCard'
import ScrollX from 'components/ScrollX'
import { TablePagination, HeaderSort } from 'components/third-party/react-table' // HeaderSort
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { useSearchFilterContext } from '../../context/SearchFilterContext'
import AddEventDialog from "./AddEventDialog";
import {STATUS_ACTIVE, STATUS_DISABLE} from "../../constants/userConstants"
import SymbolApi from "../../api/SymbolApi"
import SearchOptionsHelp from "../../lib/SearchOptionsHelp"
import SymbolHelp from '../../lib/SymbolHelp'
import SymbolEventApi from "../../api/SymbolEventApi";

const SymbolTable = () => {
    const searchCacheKey= 'symbol_search';
    const {
        getContextFilterOption,
        setContextFilterOption,
        getContextSelectSectors,
        setContextSelectSectors,
        getContextSelectTags,
        setContextSelectTags
    } = useSearchFilterContext()
    const [filterOptions, setFilterOptions] = useState({
        status: STATUS_ACTIVE,
        keyword: ''
    })
   // const [statusFilter, setStatusFilter] = useState(STATUS_ACTIVE)
    const statusOptions = SearchOptionsHelp.statusOptions()

    const [data, setData] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [sorting, setSorting] = useState([])

    const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 500 })

    const [selectedSectors, setSelectedSectors] = useState([])
    const [selectedTags, setSelectedTags]  = useState([])

    const [currentTicker, setCurrentTicker] = useState(null)
    const [addEventOpen, setAddEventOpen] = useState(false)

    const getInit = useCallback(async (filterOptions, sorting, pageIndex, pageSize) => {
        const offset = pageIndex * pageSize
        try {
            let sortingOption = {
                sortId: null,
                sortDesc: null
            }
            if (sorting && sorting[0]) {
                if (sorting[0].id) {
                    sortingOption.sortId = sorting[0].id
                    sortingOption.sortDesc = sorting[0].desc
                }
            }
            const results = await SymbolApi.search(filterOptions, sortingOption, offset, pageSize)
            if (results?.data) {
                _.forEach(results.data, result => {
                    result.actionId = result.id
                })
                setData(results.data)
                setTotalPage(Math.ceil(results?.totalCount / pageSize))
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        setContextFilterOption(searchCacheKey, filterOptions)
        getInit(filterOptions, sorting, pageIndex, pageSize)
    }, [getInit, filterOptions, sorting, pageIndex, pageSize])

    useEffect(() => {
        const historySearchData = getContextFilterOption(searchCacheKey)
        if (historySearchData) {
            setFilterOptions({ ...historySearchData })
        } else {
            setContextFilterOption(searchCacheKey, filterOptions)
        }
        const historySelectSectorData = getContextSelectSectors()
        console.log(historySelectSectorData)
        if (historySelectSectorData?.length > 0) {
            setSelectedSectors(historySelectSectorData)
        }
        const historySelectTagData = getContextSelectTags()
        console.log(historySelectTagData)
        if (historySelectTagData?.length > 0) {
            setSelectedTags(historySelectTagData)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setContextSelectTags(selectedTags);
    }, [selectedTags])

    useEffect(() => {
        setContextSelectSectors(selectedSectors);
    }, [selectedSectors])

    const handleStatusFilter = (event) => {
        // let temp = filterOptions
        // temp.status = event.target.value
        // setFilterOptions(temp)
       // setStatusFilter(event.target.value)
        setFilterOptions(prevOptions => ({
            ...prevOptions,
            status: event.target.value
        }))
    }

    const handleSectorChange = (sector, checked) => {
        setSelectedSectors(prev => {
            const nextSectors = checked
                ? prev.includes(sector) ? prev : [...prev, sector]
                : prev.filter(s => s !== sector)

            // ✅ update filterOptions with NEW object
            setFilterOptions(prevOptions => ({
                ...prevOptions,
                sectors: nextSectors
            }))
            selectedSectors
                .flatMap(sector => SymbolHelp.sectorTagMap[sector] || [])
                .filter((tag, index, arr) => arr.indexOf(tag) === index);
            return nextSectors
        })

    }

    const handleTagChange = (tag, checked) => {
        setSelectedTags(prev => {
            const nextTags = checked
                ? prev.includes(tag) ? prev : [...prev, tag]
                : prev.filter(s => s !== tag)

            // ✅ update filterOptions with NEW object
            setFilterOptions(prevOptions => ({
                ...prevOptions,
                tags: nextTags
            }))

            return nextTags
        })
    }

    const handleFieldChange = (field, value) => {
        setFilterOptions(prev => {
            const next = { ...(prev ?? {}), [field]: value }
            return next
        })
    }

    const handleShowAddEvent = (ticker) => {
        console.log(ticker)
        setCurrentTicker(ticker)
        setAddEventOpen(true)
    }

    const handleCloseAddEvent = () => {
        setCurrentTicker(null)
        setAddEventOpen(false)
        enqueueSnackbar('成功保存!', {
            variant: 'success',
            autoHideDuration: 3000,
            anchorOrigin: {horizontal: 'right', vertical: 'top'}
        })
    }

    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize
        }),
        [pageIndex, pageSize]
    )

    const columns = useMemo(
        () => [
            {
                header: '代码',
                accessorKey: 'ticker',
                enableSorting: true
            },

            {
                header: '公司名',
                accessorKey: 'name',
                enableSorting: true
            },
            {
                header: '分类',
                accessorKey: 'sector',
                enableSorting: true
            },
            {
                header: '行业',
                accessorKey: 'industry',
                enableSorting: false
            },
            {
                header: '标签',
                enableSorting: false,
                cell: ({ row }) => {
                    const tags = row.original?.SymbolTags ?? [];

                    const tempTags = tags.length > 0
                        ? tags.map(item => item.tagName).join(', ')
                        : '';

                    return (
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <Typography variant="subtitle1">
                                {tempTags || '-'}
                            </Typography>
                        </Stack>
                    );
                }
            },

            {
                header: '关注状态',
                accessorKey: 'status',
                cell: ({ getValue }) => (
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Stack spacing={0}>
                            <Typography variant="subtitle1">
                                {(getValue() === STATUS_ACTIVE) &&
                                    <>激活</>
                                }
                                {(getValue() === STATUS_DISABLE) &&
                                    <>停止</>
                                }
                            </Typography>
                        </Stack>
                    </Stack>
                ),
                enableSorting: true
            },
            {
                header: '动作',
                id: 'listAction',
                cell: ({ row }) => {
                    return (
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Tooltip title="Trade View 图">
                                <IconButton color="primary" name="chart" component={Link} to={`/tradeView/${row.original.ticker}?exchange=${row.original.exchange}`} >
                                    <QueryStatsIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="走势图">
                                <IconButton color="primary" name="chart" component={Link} to={`/chart/${row.original.ticker}`} >
                                    <ShowChartIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="标注">
                                <IconButton color="primary" name="eventSymbol"  onClick = {() => handleShowAddEvent(row.original.ticker)} >
                                    <EditNoteIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="编辑">
                                <IconButton color="primary" name="edit" component={Link} to={`/symbol/edit/${row.original.ticker}`} >
                                    <EditOutlined />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    )
                },
                meta: {
                    className: 'cell-right'
                }
            }
        ],
        []
    )

    const table = useReactTable({
        data,
        columns,
        pageCount: totalPage,
        state: {
            sorting,
            pagination
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        manualPagination: true,
        manualSorting: true,
        getSortedRowModel: getSortedRowModel(),
        onPaginationChange: setPagination
    })

    let headers = []
    table.getAllColumns().map((columns) =>
        headers.push({
            label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
            // @ts-ignore
            key: columns.columnDef.accessorKey
        })
    )
    return (
        <>
            <Breadcrumbs custom heading='股票代码清单' />
            <MainCard>
                <Stack direction="row" spacing={2} alignItems="right" justifyContent="space-between" sx={{ padding: 2 }}>
                    <Stack key={'left_top'} direction="row" spacing={2} alignItems="center">
                        <Button variant="contained" startIcon={<PlusOutlined />} component={Link} to={`/symbol/create`}>
                            添加新股票
                        </Button>
                    </Stack>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="right" justifyContent="space-between" sx={{ padding: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ flexWrap: 'wrap' }}>
                        <Grid item xs={12} sm={6} md={4}>
                            <InputLabel sx={{ marginRight: 2 }}>关键字查询</InputLabel>
                            <DebouncedInput
                               // variant="outlined"
                                size="small"
                               // label="关键字"
                                name="keyword"
                                value={filterOptions?.keyword ?? ''}
                                onFilterChange={(value) => handleFieldChange('keyword', value)}
                                placeholder="关键字"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <InputLabel sx={{ marginRight: 2 }}>股票关注状态</InputLabel>
                            <FormControl>
                                <Select
                                    labelId="status"
                                    id="status"
                                    value={filterOptions?.status}
                                    label=''
                                    sx={{ marginLeft: 1 }}
                                    onChange={handleStatusFilter}
                                >
                                    {statusOptions.map((statusOption, index) => (
                                        <MenuItem key={'filter_status' + index} value={statusOption.value}>{statusOption.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Stack>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="right" justifyContent="space-between" sx={{ padding: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ flexWrap: 'wrap' }}>
                        <InputLabel sx={{ marginRight: 2 }}>分类</InputLabel>
                        {SymbolHelp.getSectors().map((sector, index) => (
                            <FormControlLabel
                                key={sector + '-' + index} // ✅ REQUIRED
                                control={
                                    <Checkbox
                                        checked={selectedSectors.includes(sector)}
                                        onChange={(e) => handleSectorChange(sector, e.target.checked)}
                                    />
                                }
                                label={sector}
                                labelPlacement="end"
                            />
                        ))}
                    </Stack>
                </Stack>
                {selectedSectors.map((sector, index) => (
                    <Stack key={`sector-${sector}-tag`} direction="row" spacing={1} alignItems="right" justifyContent="space-between" sx={{ padding: 1 }}>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: 'wrap' }}>
                            <InputLabel sx={{ marginRight: 2 }}>{sector}:</InputLabel>
                            {SymbolHelp.sectorTagMap(sector).map((tag, index) => (
                                <FormControlLabel
                                    key={tag + '-' + index} // ✅ REQUIRED
                                    control={
                                        <Checkbox
                                            checked={selectedTags.includes(tag)}
                                            onChange={(e) => handleTagChange(tag, e.target.checked)}
                                        />
                                    }
                                    label={tag}
                                    labelPlacement="end"
                                />
                            ))}
                        </Stack>
                    </Stack>
                ))}
                <ScrollX>
                    <Stack>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => {
                                                if (header.column.columnDef.meta !== undefined && header.column.getCanSort()) {
                                                    Object.assign(header.column.columnDef.meta, {
                                                        className: header.column.columnDef.meta.className + ' cursor-pointer prevent-select'
                                                    })
                                                }

                                                return (
                                                    <TableCell
                                                        key={header.id}
                                                        {...header.column.columnDef.meta}
                                                        onClick={header.column.getToggleSortingHandler()}
                                                        {...(header.column.getCanSort() &&
                                                            header.column.columnDef.meta === undefined && {
                                                                className: 'cursor-pointer prevent-select'
                                                            })}
                                                    >
                                                        {header.isPlaceholder ? null : (
                                                            <Stack direction="row" spacing={1} alignItems="center">
                                                                <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>
                                                                {header.column.getCanSort() &&
                                                                    <HeaderSort column={header.column}/>}
                                                            </Stack>
                                                        )}
                                                    </TableCell>
                                                )
                                            })}
                                        </TableRow>
                                    ))}
                                </TableHead>
                                <TableBody>
                                    {table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Divider/>
                        <Box sx={{p: 2}}>
                            <TablePagination
                                {...{
                                    setPageSize: table.setPageSize,
                                    setPageIndex: table.setPageIndex,
                                    getState: table.getState,
                                    getPageCount: table.getPageCount,
                                    initialPageSize: 500
                                }}
                            />
                        </Box>

                    </Stack>
                </ScrollX>
            </MainCard>
            <SnackbarProvider />
            {(addEventOpen && currentTicker) &&
                <AddEventDialog
                    ticker={currentTicker}
                    open={addEventOpen}
                    handleCloseAddEvent={handleCloseAddEvent}
                />
            }
        </>
    )
}

SymbolTable.propTypes = {
    getValue: PropTypes.func
}

export default SymbolTable
