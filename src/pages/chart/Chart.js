import React, {useCallback, useEffect, useRef} from 'react'
import {
    createChart,
    CandlestickSeries,
    LineSeries
} from 'lightweight-charts'
import SymbolApi from "../../api/SymbolApi";
import TickerApi from "../../api/TickerApi";

// ==========================
// Helper: Moving Average
// ==========================
function calculateMA(data, period) {
    const result = []
    for (let i = 0; i < data.length; i++) {
        if (i < period - 1) continue
        const slice = data.slice(i - period + 1, i + 1)
        const avg = slice.reduce((sum, c) => sum + c.close, 0) / period
        result.push({
            time: data[i].time,
            value: avg
        })
    }
    return result
}

export default function CandleChartV5() {
    const chartRef = useRef(null)

    const getInit = useCallback(async (filterOptions) => {
        try {
            const results = await TickerApi.search(filterOptions)
            if (results?.data) {
                // setData(results.data)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        const container = chartRef.current
        if (!container) return

        // ==========================
        // Create Chart
        // ==========================
        const chart = createChart(container, {
            width: container.clientWidth,
            height: 400,
            layout: {
                background: { color: '#ffffff' },
                textColor: '#333333'
            },
            grid: {
                vertLines: { color: '#efefef' },
                horzLines: { color: '#efefef' }
            },
            timeScale: {
                timeVisible: true,
                borderVisible: false
            },
            rightPriceScale: {
                borderVisible: false
            }
        })

        // ==========================
        // Candlestick Series (v5)
        // ==========================
        const candleSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#26a69a',
            downColor: '#ef5350',
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
            borderVisible: false
        })

        // Example candlestick data
        const candleData = [
            { time: '2025-10-28', open: 100, high: 110, low: 95, close: 105 },
            { time: '2025-10-29', open: 105, high: 115, low: 100, close: 108 },
            { time: '2025-10-30', open: 108, high: 118, low: 105, close: 115 },
            { time: '2025-10-31', open: 115, high: 120, low: 110, close: 112 },
            { time: '2025-11-01', open: 112, high: 125, low: 110, close: 122 },
            { time: '2025-11-02', open: 122, high: 130, low: 120, close: 128 },
            { time: '2025-11-03', open: 128, high: 132, low: 126, close: 130 }
        ]

        candleSeries.setData(candleData)

        // ==========================
        // Calculate MA lines
        // ==========================
        const ma3 = calculateMA(candleData, 3)
        const ma5 = calculateMA(candleData, 5)

        // ==========================
        // Line Series (v5)
        // ==========================
        const ma3Series = chart.addSeries(LineSeries, {
            color: '#2962FF',
            lineWidth: 2
        })
        ma3Series.setData(ma3)

        const ma5Series = chart.addSeries(LineSeries, {
            color: '#FF6D00',
            lineWidth: 2
        })
        ma5Series.setData(ma5)

        // ==========================
        // Resize Observer
        // ==========================
        const resizeObserver = new ResizeObserver(entries => {
            window.requestAnimationFrame(() => {
                const { width } = entries[0].contentRect
                chart.applyOptions({ width })
            })
        })

        resizeObserver.observe(chartRef.current)

        return () => {
            resizeObserver.disconnect()
            chart.remove()
        }
    }, [])

    return (
        <div
            ref={chartRef}
            style={{ width: '100%', height: 400 }}
        />
    )
}
