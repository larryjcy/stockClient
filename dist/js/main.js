async function main(username, password) {
    const response = await axios.post(`${API_BASE}auth/login`, { username, password });
    console.log(response.data);
    return response.data
}
$('#loginForm').on('submit', function(e) {
    e.preventDefault();

    const username = $('#username').val();
    const password = $('#password').val();

    main(username, password)
        .then(res => {
            // access_token
            alert('Login successful!');
            console.log(res?.access_token)
            localStorage.setItem('access_token', res?.access_token);

            window.location.href = '/';
        })
        .catch(err => {
            console.log('Login failed!');
            // localStorage.setItem('jwt_token', '');
            console.error(err.response?.data || err);
        });
});
