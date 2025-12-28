import React, { useEffect, useRef } from 'react'

const TradingViewWidget = ({ symbol = 'NASDAQ:AAPL' }) => {
    const container = useRef()

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js'
        script.type = 'text/javascript'
        script.async = true
        script.innerHTML = JSON.stringify({
            symbols: [[symbol]],
            chartOnly: false,
            width: "100%",
            height: "500",
            locale: "en",
            colorTheme: "dark",
            autosize: true,
            showVolume: true,
            showMA: true
        })
        container.current.innerHTML = ''
        container.current.appendChild(script)
    }, [symbol])

    return <div ref={container} />
}

export default TradingViewWidget