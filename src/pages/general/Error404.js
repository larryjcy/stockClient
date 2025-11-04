// material-ui
import { Typography } from '@mui/material'

// project import
import MainCard from 'components/MainCard'

// ==============================|| SAMPLE PAGE ||============================== //

const Error404 = () => (
    <MainCard title="404 Not found">
        <Typography variant="body2">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Oops! We can't seem to find the page you're looking for.
        </Typography>
    </MainCard>
)

export default Error404
