$(document).ready(function() {
    // Get the full query string from the URL
    const queryString = window.location.search; // ?ticker=A

    // Parse the query string
    const urlParams = new URLSearchParams(queryString);

    // Get the value of 'ticker'
    const ticker = urlParams.get('ticker');

    console.log("Ticker:", ticker);
    loadSymbol(ticker);

    // Example: put it in an input field
   // $('#tickerInput').val(ticker);

    async function loadSymbol(ticker) {
        const filter = null;
        const sortingOption = null;
        console.log('loadSymbols');
        const API_BASE = 'http://localhost:4000/api/';

        const token = localStorage.getItem("access_token");
        console.log(token)
        if (!token) {
            // return window.location.href = "/login.html"; // not logged in
            console.log('not login');
        }
        try {
            const res = await axios.get(`${API_BASE}symbol/` + ticker,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const symbol = res.data;
            console.log(symbol);
            if (symbol) {
                $('#ticker').val(symbol.ticker);
                $('#name').val(symbol.name);
                $('#sector').val(symbol.sector);
                $('#industry').val(symbol.industry);
                if (symbol.status) {
                    $('#status').prop('checked', true);
                } else {
                    $('#status').prop('checked', false);
                }
            }
        } catch (err) {
            console.error(err);
            // alert("Failed to load users, maybe token expired?");
            // localStorage.removeItem("jwt_token");
            // window.location.href = "login.html";
        }
    }
});