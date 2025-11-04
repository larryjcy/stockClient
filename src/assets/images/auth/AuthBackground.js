import { Box } from '@mui/material'

const AuthBackground = () => {
    let background = {
        zIndex: -10,
        position: 'absolute',
        width: '100%',
        height: '100%', // Set your desired height
        backgroundSize: 'cover',
        backgroundPosition: 'left',
        backgroundRepeat: 'no-repeat'
    }

    return (
        <Box
          sx={background}
        >
        </Box>
    )
}

export default AuthBackground
