import { useEffect, useState, useCallback } from 'react'
import { fetchProductsByServiceId } from '../lib/selectproductHelp'

export default function useEligibleProducts({
  serviceId = 1,
  preferId,
  ProductApi,
  CategoryApi
} = {}) {
  const [products, setProducts] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const reload = useCallback(async (nextPreferId) => {
    try {
      setLoading(true)
      setError(null)
      const list = await fetchProductsByServiceId({
        serviceId,
        ProductApi,
        CategoryApi
      })
      setProducts(list)

      if (list.length) {
        const preferred = nextPreferId ?? preferId
        const keep =
          preferred && list.some((p) => String(p.id) === String(preferred))
        setSelectedId(keep ? String(preferred) : String(list[0].id))
      } else {
        setSelectedId('')
      }
    } catch (e) {
      setError(e)
      setProducts([])
      setSelectedId('')
    } finally {
      setLoading(false)
    }
  }, [serviceId, preferId, ProductApi, CategoryApi])

  useEffect(() => {
    reload()
  }, [reload])

  return {
    products,
    selectedId,
    setSelectedId,
    reload,
    loading,
    error
  }
}
