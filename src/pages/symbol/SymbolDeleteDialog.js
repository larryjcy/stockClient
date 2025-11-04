import React from 'react'
import {Button} from '@mui/material'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import PropTypes from 'prop-types'
import ReferralApi from 'api/ReferralApi'
import { DialogActions } from '@mui/material'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'


export default function SymbolDeleteDialog(props) {
    const handleClose = () => {
        props.onClose()
    }
    const handleDelete = (async () => {
        let response = await ReferralApi.delete(props.id)
        if (response && response.status === 200) {
            enqueueSnackbar('Staff deletion success!', {
                variant: 'success',
                autoHideDuration: 2000,
                anchorOrigin: {horizontal: 'right', vertical: 'top'}
            })
            props.onClose()
        } else {
            console.log(response)
        }
    })
    return (
        <>
            <Dialog
                open={props.open}
                PaperProps={{
                    sx: {
                        width: 325,
                        maxHeight: 600
                    }
                }}
            >
                <DialogTitle align='center' sx={{mt:1}}>Are you sure you want to delete this staff?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleDelete}>Yes</Button>
                    <Button onClick={handleClose}>No</Button>
                </DialogActions>
            </Dialog>
            <SnackbarProvider />
        </>
    )
}


SymbolDeleteDialog.propTypes = {
    onClose: PropTypes.func,
    id: PropTypes.number
}
