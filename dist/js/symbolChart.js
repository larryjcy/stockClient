import { createChart, LineSeries } from 'lightweight-charts';

$(document).ready(function() {
    const queryString = window.location.search; // ?ticker=A

    // Parse the query string
    const urlParams = new URLSearchParams(queryString);

    // Get the value of 'ticker'
    const ticker = urlParams.get('ticker');

    console.log("Ticker:", ticker);
    $('#tickerTitle').val(ticker);
    loadStockChart(ticker);


    async function loadStockChart(ticker) {
        console.log('chart');
        const API_BASE = 'http://localhost:4000/api/';

        const token = localStorage.getItem("access_token");
        console.log(token)
        if (!token) {
            // return window.location.href = "/login.html"; // not logged in
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
        const chart = createChart(widget, { width: 400, height: 300 });
        const lineSeries = chart.addSeries(LineSeries);
        // lineSeries.setData([
        //     { time: '2019-04-11', value: 80.01 },
        //     { time: '2019-04-12', value: 96.63 },
        //     { time: '2019-04-13', value: 76.64 },
        //     { time: '2019-04-14', value: 81.89 },
        //     { time: '2019-04-15', value: 74.43 },
        //     { time: '2019-04-16', value: 80.01 },
        //     { time: '2019-04-17', value: 96.63 },
        //     { time: '2019-04-18', value: 76.64 },
        //     { time: '2019-04-19', value: 81.89 },
        //     { time: '2019-04-20', value: 74.43 },
        // ]);
        lineSeries.setData(tickerData);
        // auto resize
        new ResizeObserver(() => chart.applyOptions({ width: widget.clientWidth })).observe(widget);
    }
});