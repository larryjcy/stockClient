import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Alert
} from '@mui/material'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import PropTypes from 'prop-types'
import { enqueueSnackbar } from 'notistack'

import { displayMultiError } from 'lib/help'
import SubCategoryApi from 'api/SubCategoryApi'
import { STATUS_ACTIVE, STATUS_DISABLE } from 'constants/userConstants'

const statusOptions = [
  { id: STATUS_ACTIVE, name: 'Active' },
  { id: STATUS_DISABLE, name: 'Disabled' }
]

const SubCategoryCreate = ({ categoryId, onClose }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        categoryId: Number(categoryId) || '',
        name: '',
        status: STATUS_ACTIVE,
        submit: null
      }}
      validationSchema={Yup.object().shape({
        categoryId: Yup.number().required('Category is required'),
        name: Yup.string().max(255).required('SubCategory Name is required'),
        status: Yup.number().oneOf([STATUS_ACTIVE, STATUS_DISABLE]).required('Status is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const payload = {
            categoryId: Number(values.categoryId),
            name: values.name?.trim(),
            status: Number(values.status)
          }
          const response = await SubCategoryApi.create(payload)
          if (response && response.status === 200) {
            enqueueSnackbar('SubCategory created successfully!', {
              variant: 'success',
              autoHideDuration: 2500,
              anchorOrigin: { horizontal: 'right', vertical: 'top' }
            })
            onClose && onClose()
          } else {
            const normalized = displayMultiError(response)
            setStatus({ success: false })
            setErrors({ submit: normalized.message })
            setSubmitting(false)
          }
        } catch (error) {
          const normalized = displayMultiError(error)
          setStatus({ success: false })
          setErrors({ submit: normalized.message })
          setSubmitting(false)
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values, isSubmitting }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="categoryId">Parent Category</InputLabel>
                <OutlinedInput
                  id="categoryId"
                  type="text"
                  value={values.categoryId}
                  name="categoryId"
                  inputProps={{ readOnly: true }}
                  fullWidth
                />
                {touched.categoryId && errors.categoryId && (
                  <FormHelperText error id="helper-categoryId">{errors.categoryId}</FormHelperText>
                )}
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="name-edit">SubCategory Name</InputLabel>
                <OutlinedInput
                  id="name-edit"
                  type="text"
                  value={values.name}
                  name="name"
                  inputProps={{ 'data-testid': 'name' }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter SubCategory Name"
                  fullWidth
                  error={Boolean(touched.name && errors.name)}
                />
                {touched.name && errors.name && (
                  <FormHelperText error id="helper-name">{errors.name}</FormHelperText>
                )}
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="status">Status</InputLabel>
                <Select
                  labelId="status"
                  id="status"
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  error={Boolean(touched.status && errors.status)}
                >
                  {statusOptions.map((s) => (
                    <MenuItem key={`status-${s.id}`} value={s.id}>
                      {s.name}
                    </MenuItem>
                  ))}
                </Select>
                {touched.status && errors.status && (
                  <FormHelperText error id="helper-status">{errors.status}</FormHelperText>
                )}
              </Stack>
            </Grid>

            {errors.submit && (
              <Grid item xs={12}>
                {Array.isArray(errors.submit) ? (
                  errors.submit.map((msg, idx) => (
                    <Alert key={`err-${idx}`} severity="error">{msg}</Alert>
                  ))
                ) : (
                  <Alert severity="error">{errors.submit}</Alert>
                )}
              </Grid>
            )}

            <Grid item xs={12}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button variant="outlined" onClick={onClose} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving…' : 'Save'}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  )
}

SubCategoryCreate.propTypes = {
  categoryId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClose: PropTypes.func
}

export default SubCategoryCreate
