import React, { useEffect, useRef } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export default function TradingViewChart({
                                             ticker,
                                             exchange,
                                             interval = 'D',
                                             height = 500,
                                         }) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // 清空旧 widget（安全）
        if (containerRef.current) containerRef.current.innerHTML = '';
        const symbol = exchange + ':' + ticker

        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;

        script.onload = () => {
            if (!containerRef.current) return; // ✅ 安全检查

            new window.TradingView.widget({
                container_id: containerRef.current.id,
                symbol,
                interval,
                timezone: 'America/New_York',
                theme: 'dark',
                style: '1',
                locale: 'en',
                autosize: true,
                studies: [
                    'MASimple@tv-basicstudies',
                    'MAExp@tv-basicstudies',
                ],
                hide_top_toolbar: false,
                hide_side_toolbar: false,
                withdateranges: true,
                allow_symbol_change: true,
            });
        };

        document.body.appendChild(script);

        // cleanup
        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, [ticker, interval]);

    return (
        <Card sx={{ height }}>
            <CardContent sx={{ height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                    交易所： {exchange} 代码： {ticker}
                </Typography>
                <div
                    id={`tv_${ticker}`}
                    ref={containerRef}
                    style={{ height: height - 50 }}
                />
            </CardContent>
        </Card>
    );
}
