import PropTypes from 'prop-types'
import React, { useState, useMemo } from 'react'
import { useCallback,  useEffect } from 'react'
import {Link} from 'react-router-dom'
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
    Tooltip, Button, Typography
} from '@mui/material'
//import {EditOutlined, EyeOutlined, PlusOutlined} from '@ant-design/icons'
import {EditOutlined, PlusOutlined} from '@ant-design/icons'
import IconButton from 'components/@extended/IconButton'
// third-party
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender, getPaginationRowModel } from '@tanstack/react-table'

import Breadcrumbs from "../../components/@extended/Breadcrumbs"
import MainCard from 'components/MainCard'
import ScrollX from 'components/ScrollX'
import {
    HeaderSort
} from 'components/third-party/react-table' // HeaderSort

import CategoryApi from "../../api/CategoryApi"
import {
    STATUS_ACTIVE,
    STATUS_DISABLE
} from "../../constants/userConstants"


const EditAction = ({ row }) => {
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Edit">
                <IconButton color="primary" name="edit" component={Link} to={`/category/edit/${row.original.id}`} >
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

const CategoryTable = () => {
    const [data, setData] = useState([])
    const [sorting, setSorting] = useState([])

    const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 50 })

    const getCategories = useCallback(async () => {
        try {

            const result = await CategoryApi.getAllCategory()
            setData(result)
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        getCategories()
    }, [])

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
                header: 'Category ID',
                accessorKey: 'id'
            },

            {
                header: 'Name',
                accessorKey: 'name'
            },
            {
                header: 'Description',
                accessorKey: 'description',
                enableSorting: true
            },
            {
                header: 'Status',
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
                header: 'Service',
                accessorKey: 'serviceId',
                cell: ({ getValue }) => (
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Stack spacing={0}>
                            <Typography variant="subtitle1">
                                {(getValue() === TREATMENT_SERVICEID) &&
                                    <>Treatment</>
                                }
                                {(getValue() === PRODUCT_SEREVICEID) &&
                                    <>Product</>
                                }
                            </Typography>
                        </Stack>
                    </Stack>
                ),
                enableSorting: true
            },
            {
                header: 'Tax',
                accessorKey: 'tax'
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
        pageCount: 1,
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
            <Breadcrumbs custom heading='Category' />
            <MainCard>
                <Stack direction="row" spacing={2} alignItems="right" justifyContent="space-between" sx={{ padding: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Button variant="contained" startIcon={<PlusOutlined />} component={Link} to={`/category/create`}>
                            Add New Category
                        </Button>
                    </Stack>
                </Stack>
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


                    </Stack>
                </ScrollX>
            </MainCard>
        </>
    )
}

CategoryTable.propTypes = {
    getValue: PropTypes.func
}

export default CategoryTable
