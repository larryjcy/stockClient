import React, {useEffect, useState} from "react"

// material-ui
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material'
import DialogContentText from '@mui/material/DialogContentText'

export default function ConfirmDialog(props) {
    const openConfirm = props.openConfirm
   // const show = props.open
    const [open, setOpen] = useState(false)
    useEffect(() => {
        if (props.openConfirm) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }, [openConfirm])

    return (
        <>
        {(open) &&
        <Dialog open={open}  aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
            <Box sx={{p: 1, py: 1.5}}>
                <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={props.handleCloseConfirm}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={props.handleSubmitConfirm} autoFocus>
                        Submit
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
        }
        </>
    )
}