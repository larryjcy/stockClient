import PropTypes from 'prop-types'
import React from 'react'
import {Button, FormControl, Grid, RadioGroup} from '@mui/material'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'

import { DialogContent,DialogActions } from '@mui/material'
import ColorPalette from './ColorPalette'

export default function ColorDialog(props) {

    const handleSelectColor = async (event) => {
        props.handleSelectColor(event.target.value)
    }

    const handleClose = () => {
        props.onClose()
    }


    return (
        <div>
            <Dialog
                open={props.openColor}
                PaperProps={{
                    sx: {
                        width: 360,
                        maxHeight: 600
                    }
                }}
            >
                <DialogTitle><strong>Select Color</strong></DialogTitle>
                <DialogContent>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-label="color"
                                        defaultValue={props.colorCode}
                                        //  onChange={(e) => setFieldValue('color', e.target.value)}
                                        onChange={handleSelectColor}
                                        name="color-radio-buttons-group"
                                        sx={{ '& .MuiFormControlLabel-root': { mr: 2 } }}
                                    >
                                        {props.colorList.map((item, index) => (
                                            <ColorPalette key={index} value={item} color={item} />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>CLOSE</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

ColorDialog.propTypes = {
    id: PropTypes.number,
    aptId: PropTypes.number
}