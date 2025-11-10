function loadInto(selector, file) {
    fetch(file)
        .then(response => response.text())
        .then(html => {
            document.querySelector(selector).innerHTML = html;
        })
        .catch(err => console.error("Layout load error:", file, err));
}

// Load shared components
loadInto("#header", "/components/header.html");
loadInto("#sidebar", "/components/sidebar.html");
loadInto("#topNav", "/components/topNav.html");
loadInto("#footer", "/components/footer.html");