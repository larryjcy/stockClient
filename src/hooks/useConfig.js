import { useContext } from 'react'
import { ConfigContext } from 'context/ConfigContext'

// ==============================|| CONFIG - HOOKS ||============================== //

const useConfig = () => useContext(ConfigContext)

export default useConfig
