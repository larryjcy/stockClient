import { createChart, LineSeries } from 'lightweight-charts';
import * as _ from 'lodash'

$(document).ready(function() {
    const queryString = window.location.search; // ?ticker=A

    // Parse the query string
    const urlParams = new URLSearchParams(queryString);

    // Get the value of 'ticker'
    const ticker = urlParams.get('ticker');

    console.log("Ticker:", ticker);
    $('#tickerTitle').html("<b>" + ticker + "</b>  ");
    loadStockChart(ticker);


    async function loadStockChart(ticker) {
        console.log('chart');
        const API_BASE = 'http://localhost:4000/api/';

        const token = localStorage.getItem("access_token");
        console.log(token)
        if (!token) {
            return window.location.href = "/login.html"; // not logged in
            console.log('not login');
        }
        const params = {
            table: 'stock_day',
            symbol: ticker
        }
        try {
            const res = await axios.post(`${API_BASE}stock/search`,
                params,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = res.data;
            console.log(res.data);
            drawGraph(data);
            return data;
        } catch (err) {
            console.error(err);
            // alert("Failed to load users, maybe token expired?");
            // localStorage.removeItem("jwt_token");
            // window.location.href = "login.html";
        }
    }

    function drawGraph(tickerData) {
        console.log("LightweightCharts:", window.LightweightCharts);
        const widget = document.getElementById('tvChart');
        const chart = createChart(widget, {
            width: 800,
            height: 600,
            layout: {
                background: { color: '#0D0D0D' },      // 背景颜色
                textColor: '#D1D4DC',                 // 坐标轴文字颜色
            },
            grid: {
                vertLines: { color: '#202020' },       // 竖线
                horzLines: { color: '#202020' },       // 横线
            },
        });

        const dailyData =  calculateDailyMA(tickerData);
        // chart.addCandlestickSeries()
        const lineSeries = chart.addSeries(LineSeries, {
            color: '#4A90E2',
            lineWidth: 1
        });
console.log(dailyData)
        lineSeries.setData(dailyData);

        const ma240Series = chart.addSeries(LineSeries, {
            color: '#FFFFFF',
            lineWidth: 1
        });
        const ma240Data =  calculateMA(tickerData, 240);
        console.log(ma240Data)
        ma240Series.setData(ma240Data);

        const ma120Series = chart.addSeries(LineSeries, {
            color: '#0000FF',
            lineWidth: 1
        });
        const ma120Data =  calculateMA(tickerData, 120);
        console.log(ma120Data)
        ma120Series.setData(ma120Data);

        const ma90Series = chart.addSeries(LineSeries, {
            color: '#00FFFF',
            lineWidth: 1
        });
        const ma90Data =  calculateMA(tickerData, 90);
        console.log(ma90Data)
        ma90Series.setData(ma90Data);

        const ma60Series = chart.addSeries(LineSeries, {
            color: '#00FF00',
            lineWidth: 1
        });
        const ma60Data =  calculateMA(tickerData, 60);
        console.log(ma60Data)
        ma60Series.setData(ma60Data);

        const ma30Series = chart.addSeries(LineSeries, {
            color: '#CC66FF',
            lineWidth: 1
        });
        const ma30Data =  calculateMA(tickerData, 30);
        console.log(ma30Data)
        ma30Series.setData(ma30Data);

        const ma5Series = chart.addSeries(LineSeries, {
            color: '#FFFF00',
            lineWidth: 1
        });
        const ma5Data =  calculateMA(tickerData, 5);
        console.log(ma5Data)
        ma5Series.setData(ma5Data);

        // auto resize
        new ResizeObserver(() => chart.applyOptions({ width: widget.clientWidth })).observe(widget);
    }

    function calculateDailyMA(data, period) {
        let result = [];
        _.forEach(data, (item) => {
           // item.value =  item.close
            result.push({
                time: item.time,
                value: item.close
            });
        })
        return result;
    }

    function calculateMA(data, period) {
        let result = [];
        for (let i = 0; i < data.length; i++) {
            if (i < period - 1) {
                // result.push({ time: data[i].time, value: null });
                continue;
            }
            const slice = data.slice(i - period + 1, i + 1);
            const sum = slice.reduce((s, d) => s + d.close, 0);
            result.push({
                time: data[i].time,
                value: Number((sum / period).toFixed(2)),
            });
        }
        return result;
    }
});