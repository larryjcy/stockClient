import PropTypes from 'prop-types'
import React, { useState, useMemo } from 'react'
import { useCallback,  useEffect } from 'react'
import { Link } from 'react-router-dom'
// material-ui
import {
    // Paper,
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
    Tooltip, Button, Typography, InputLabel
} from '@mui/material'
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import {EditOutlined, PlusOutlined} from '@ant-design/icons'
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart'
import IconButton from 'components/@extended/IconButton'
// third-party
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender, getPaginationRowModel } from '@tanstack/react-table'
import Breadcrumbs from "../../components/@extended/Breadcrumbs"
import MainCard from 'components/MainCard'
import ScrollX from 'components/ScrollX'
import { TablePagination, HeaderSort } from 'components/third-party/react-table' // HeaderSort

import {STATUS_ACTIVE, STATUS_DISABLE} from "../../constants/userConstants"
import SymbolApi from "../../api/SymbolApi"
import SearchOptionsHelp from "../../lib/SearchOptionsHelp"


const EditAction = ({ row }) => {
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="走势图">
                <IconButton color="primary" name="edit" component={Link} to={`/chart/${row.original.ticker}`} >
                    <WaterfallChartIcon />
                </IconButton>
                <IconButton color="primary" name="edit" component={Link} to={`/symbol/edit/${row.original.id}`} >
                    <EditOutlined />
                </IconButton>
            </Tooltip>
        </Stack>
    )
}

EditAction.propTypes = {
    row: PropTypes.object,
    table: PropTypes.object,
    options: PropTypes.array,
    id: PropTypes.number,
    index: PropTypes.number
}

const SymbolTable = () => {
    const [filterOptions, setFilterOptions] = useState({
        status: STATUS_ACTIVE
    })
    const [statusFilter, setStatusFilter] = useState(STATUS_ACTIVE)
    const statusOptions = SearchOptionsHelp.statusOptions()

    const [data, setData] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [sorting, setSorting] = useState([])

    const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 50 })

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
        getInit(filterOptions, sorting, pageIndex, pageSize)
    }, [getInit, filterOptions, statusFilter, sorting, pageIndex, pageSize])

    const handleStatusFilter = (event) => {
        let temp = filterOptions
        temp.status = event.target.value
        setFilterOptions(temp)
        setStatusFilter(event.target.value)
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
                header: '关注状态',
                accessorKey: 'status',
                cell: ({ getValue }) => (
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Stack spacing={0}>
                            <Typography variant="subtitle1">
                                {(getValue() === STATUS_ACTIVE) &&
                                    <>Active</>
                                }
                                {(getValue() === STATUS_DISABLE) &&
                                    <>Disable</>
                                }
                            </Typography>
                        </Stack>
                    </Stack>
                ),
                enableSorting: true
            },
            {
                header: 'Action',
                id: 'listAction',
                cell: EditAction,
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
            <Breadcrumbs custom heading='Staffs' />
            <MainCard>
                <Stack direction="row" spacing={2} alignItems="right" justifyContent="space-between" sx={{ padding: 2 }}>
                    <Stack key={'left_top'} direction="row" spacing={2} alignItems="center">
                        <Button variant="contained" startIcon={<PlusOutlined />} component={Link} to={`/symbol/create`}>
                            添加新股票
                        </Button>
                    </Stack>
                </Stack>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <InputLabel sx={{ marginRight: 2 }}>股票关注状态</InputLabel>
                    <FormControl>
                        <Select
                            labelId="status"
                            id="status"
                            value={statusFilter}
                            label=''
                            sx={{ marginLeft: 1 }}
                            onChange={handleStatusFilter}
                        >
                            {statusOptions.map((statusOption) => (
                                <MenuItem key={'filter_status' + statusOption.value} value={statusOption.value}>{statusOption.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

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
                                    initialPageSize: 50
                                }}
                            />
                        </Box>

                    </Stack>
                </ScrollX>
            </MainCard>
        </>
    )
}

SymbolTable.propTypes = {
    getValue: PropTypes.func
}

export default SymbolTable
