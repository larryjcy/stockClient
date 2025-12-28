import PropTypes from 'prop-types'
import React, { useState, useMemo } from 'react'
import { useCallback,  useEffect } from 'react'
import {Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'

import {
    InsuranceOutlined
} from '@ant-design/icons'

import {
    Table,
    TableBody,
    TableContainer,
    TableCell,
    TableHead,
    TableRow,
    Stack,
    Box,
    Tooltip
} from '@mui/material'
import {EditOutlined, ScheduleOutlined} from '@ant-design/icons'
import IconButton from 'components/@extended/IconButton'
// third-party
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { DownloadOutlined } from '@ant-design/icons'

import Breadcrumbs from "../../components/@extended/Breadcrumbs"
import MainCard from 'components/MainCard'
import ScrollX from 'components/ScrollX'

import ProgramConfigApi from "../../api/ProgramConfigApi"
import ResourceApi from '../../api/ResourceApi'

const Acts = ({ row }) => {

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Edit">
                {/* <IconButton color="primary" name="edit" component={Link} to={`/product/edit/${row.original.id}`} > */}
                <IconButton color="primary" name="edit" component={Link} to={`/Licence/edit/${row.original.id}`} >
                    <EditOutlined />
                </IconButton>
            </Tooltip>
            <Tooltip title="Licence Schedule">
                <IconButton color="primary" name="shift" component={Link} to={`/licenceSchedule/${row.original.userId}`} >
                    <ScheduleOutlined />
                </IconButton>
            </Tooltip>
            <Tooltip title="Insurance Schedule">
                <IconButton color="primary" name="shift" component={Link} to={`/insuranceSchedule/${row.original.userId}`} >
                    <InsuranceOutlined />
                </IconButton>
            </Tooltip>
        </Stack>
    )
}
Acts.propTypes = {
    row: PropTypes.object,
    table: PropTypes.object,
    options: PropTypes.array,
    id: PropTypes.number,
    index: PropTypes.number
}

const HelpTable = () => {
    const theme = useTheme()

    const [data, setData] = useState([])

    const getInit = useCallback(async () => {
        const settingFilter = {
            module: 'guides'
        }
        const formResults = await ProgramConfigApi.search(settingFilter)
        setData(formResults)
    }, [])
    useEffect(() => {
        getInit()
    }, [getInit])


    const columns = useMemo(
        () => [
            {
                header: 'File Name',
                accessorKey: 'key',
                enableSorting: true
            },

            {
                header: 'Download',
                id: 'listAction',
                cell: ({ row }) => {
                    return (
                        <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
                            <Tooltip title="Download">
                                <IconButton onClick={() => { ResourceApi.guide(row.original.id, row.original.key)}}>
                                    <DownloadOutlined style={{ color: theme.palette.grey[900] }} />
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
        pageCount: 1,
        getCoreRowModel: getCoreRowModel()
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
            <Breadcrumbs custom heading='Help Document' />
            <MainCard>
                <ScrollX>
                    <Stack>
                        <TableContainer sx={{ maxWidth: '500px', overflowX: 'auto' }}>
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
                                                    >
                                                        {header.isPlaceholder ? null : (
                                                            <Stack direction="row" spacing={1} alignItems="center">
                                                                <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>
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

HelpTable.propTypes = {
    getValue: PropTypes.func
}

export default HelpTable
