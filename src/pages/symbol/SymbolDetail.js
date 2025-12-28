import {useCallback, useEffect, useState} from "react"
import { useParams } from 'react-router-dom'
import {Formik} from "formik"
import * as Yup from "yup"
import {
    Button,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack
} from "@mui/material"
import AnimateButton from "../../components/@extended/AnimateButton"
import UsersApi from "../../api/UsersApi"


const SymbolDetail = () => {
    const { id } = useParams()
    const [symbol, setSymbol] = useState()

    const getInit = useCallback(async () => {
        try {
            const data = await UsersApi.detail(id)
            if (data) {
                setSymbol(data)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        getInit()
    }, [getInit])

    return (
        <>
            {(symbol) &&
            <Formik
                initialValues={{
                    username: symbol.username,
                    firstName: symbol.firstName,
                    lastName: symbol.lastName,
                    email: symbol.email,
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string().max(255).required('First Name is required'),
                    lastName: Yup.string().max(255).required('Last Name is required'),
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false })
                        setSubmitting(false)
                    } catch (err) {
                        console.error(err)
                        setStatus({ success: false })
                        setErrors({ submit: err.message })
                        setSubmitting(false)
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="firstName-signup">First Name*</InputLabel>
                                    <OutlinedInput
                                        id="firstName-login"
                                        type="firstName"
                                        value={values.firstName}
                                        name="firstName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="John"
                                        fullWidth
                                        error={Boolean(touched.firstName && errors.firstName)}
                                    />
                                    {touched.firstName && errors.firstName && (
                                        <FormHelperText error id="helper-text-firstName-signup">
                                            {errors.firstName}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.lastName && errors.lastName)}
                                        id="lastname-signup"
                                        type="lastname"
                                        value={values.lastName}
                                        name="lastname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Doe"
                                        inputProps={{}}
                                    />
                                    {touched.lastName && errors.lastName && (
                                        <FormHelperText error id="helper-text-lastname-signup">
                                            {errors.lastName}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                        id="email-login"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="demo@company.com"
                                        inputProps={{}}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="helper-text-email-signup">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                                        edit
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
            }
        </>
    )
}
export default SymbolDetail