$(document).ready(() => {
    console.log('>>>>>>');
    let currentPage = 1;
    let totalPage = 1;
    let offset = 0;
    let limit = 5;
    loadSymbols(  0);

    async function loadSymbols(offset) {
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
        let filterStr = '{}'
        let sortingstr = '{}'
        if (filter) {
            filterStr = JSON.stringify(filter)
        }
        if (sortingOption) {
            sortingstr = JSON.stringify(sortingOption)
        }
        const params = {
            filter: filterStr,
            sorting: sortingstr,
            offset: offset,
            limit: limit
        }
        try {
            const res = await axios.post(`${API_BASE}symbol/search`,
                params,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const symbols = res.data;
            const totalCount = parseInt(res.headers['x-total-count']);
            totalPage = Math.ceil(totalCount / limit);
            renderTable(symbols);
            renderPaging();
            updatePagingButtons();
        } catch (err) {
            console.error(err);
            // alert("Failed to load users, maybe token expired?");
            // localStorage.removeItem("jwt_token");
            // window.location.href = "login.html";
        }
    }

    function updatePagingButtons() {
        console.log(currentPage);
        if (currentPage <= 1) {
         //   $('#btnPrev').hide();
            $('#btnNext').show();
        } else {
            $('#btnPrev').show();
            $('#btnNext').show();
        }

        if (currentPage >= totalPage) {
            $('#btnNext').hide();
        } else {
            $('#btnNext').show();
        }
    }

    $("#btnNext").click(() => {
        $('#btnPrev').show();
        currentPage++;
        loadSymbols((currentPage -1) * 5);
    });

    $("#btnPrev").click(() => {
        if (currentPage > 1) {
            currentPage--
            loadSymbols((currentPage -1) * 5);
        }
    });

    $(document).on('click', '.page-link', function (e) {
        e.preventDefault();
        let offset = 0;
        const pageId = $(this).attr('pageId')
        if (pageId === 'prev') {
            currentPage -= 1;
        } else if (pageId === 'next') {
            currentPage += 1;
            // $('.page-link').parent().removeClass("active");
            // $(this).parent().addClass("active");
        } else {
            currentPage = Number($(this).attr('pageId'));
        }
        console.log(currentPage);

        offset = (currentPage - 1) * limit;


        loadSymbols(offset)
    });

    function renderTable(symbols) {
        const tbody = $("#symbolTable tbody");
        tbody.empty(); // clear old data
        symbols.forEach(item => {
            tbody.append(`
            <tr>
                <td>${item.ticker}</td>
                <td>${item.name}</td>
                <td>${item.sector}</td>
                <td>${item.industry}</td>
            </tr>
        `);
        });
    }

    // Render paging buttons
    function renderPaging() {
        // $("#btnPrev").toggle(currentPage > 1);
        // $("#btnNext").toggle(currentPage < totalPage);

        const pagingLink = $("#pagingLink");
        pagingLink.empty();

        const maxButtons = 10;
        let startPage = Math.max(currentPage - Math.floor(maxButtons / 2), 1);
        let endPage = startPage + maxButtons - 1;

        if (endPage > totalPage) {
            endPage = totalPage;
            startPage = Math.max(endPage - maxButtons + 1, 1);
        }
        if (currentPage !== 1) {
            const prevLink = $(`
                    <li class="page-item">
                        <a id="btnPrev" class="page-link" pageId="prev" href="#">&laquo;</a>
                    </li>
        `);
            pagingLink.append(prevLink);
        }
        console.log(typeof currentPage);

        for (let i = startPage; i <= endPage; i++) {
           // const btn = $(`<button class="btn btn-sm btn-secondary">${i}</button>`);
            let pagingNumLink = $(`<li class="page-item">
                                        <a class="page-link" pageId="${i}" href="#">${i}</a>
                                    </li>`
            );
            if (i === currentPage) {
                pagingNumLink = $(`<li class="page-item active">
                                        <a class="page-link" pageId="${i}" href="#">${i}</a>
                                    </li>`
                );
            }
         //   pagingNumLink.click(() => loadSymbols(i));
            pagingLink.append(pagingNumLink);
        }
        const nextLink = $(`<li class="page-item">
                                <a id="btnNext" class="page-link" pageId="next" href="#">&raquo;</a>
                           </li>
        `);
        pagingLink.append(nextLink);
    }
});