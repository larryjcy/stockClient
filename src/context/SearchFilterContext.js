import React, { createContext, useContext, useState } from "react"

// Create the Search Context
const SearchFilterContext = createContext(undefined)

// Provider Component
export const SearchFilterProvider = ({ children }) => {
    // State to store search results by type
    const [filterFieldOptions, setFilterFieldOptions] = useState({})
    const [selectSectors, setSelectSectors] = useState([])
    const [selectTags, setSelectTags] = useState([])
    const getContextFilterOption = (type) => filterFieldOptions[type] || null

    // Set results for a specific search type
    const setContextFilterOption = (field, value) => {
        setFilterFieldOptions((prev) => ({
            ...prev,
            [field]: value // Update only the specific search type
        }))
    }

    const getContextSelectSectors = () => selectSectors || []
    const setContextSelectSectors = (sectorList) => {
        setSelectSectors(sectorList)
    }

    const getContextSelectTags= () => selectTags || []
    const setContextSelectTags = (tagsList) => {
        setSelectTags(tagsList)
    }

    return (
        <SearchFilterContext.Provider value={{
                filterFieldOptions,
                selectSectors,
                selectTags,
                getContextFilterOption,
                setContextFilterOption,
                getContextSelectSectors,
                setContextSelectSectors,
                getContextSelectTags,
                setContextSelectTags
            }}
        >
            {children}
        </SearchFilterContext.Provider>
    )
}

// make sure use
export const useSearchFilterContext= () => {
    const context = useContext(SearchFilterContext)
    if (!context) {
        throw new Error("useSearch must be used within a SearchFilterProvider")
    }
    return context
}
