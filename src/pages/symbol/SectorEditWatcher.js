import { useEffect } from 'react'
import { useFormikContext } from 'formik'
import SymbolHelp from "../../lib/SymbolHelp";

function SectorEditWatcher({ setAvailableTags }) {
    const { values, setFieldValue } = useFormikContext()

    useEffect(() => {
        const tags = SymbolHelp.sectorTagMap[values.sector] || []

        // update tag list
        setAvailableTags(tags)

        // reset selected tags when sector changes
        setFieldValue('tags', [])
    }, [values.sector])

    return null
}
