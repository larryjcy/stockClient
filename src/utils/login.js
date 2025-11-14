// Define login function
async function login(username, password) {
    const response = await axios.post(`${API_BASE}auth/login`, { username, password });
    console.log(response.data);
    return response.data
}

// Attach function to form
$('#loginForm').on('submit', function(e) {
    e.preventDefault();

    const username = $('#username').val();
    const password = $('#password').val();

    login(username, password)
        .then(res => {
            // access_token
            alert('Login successful!');
            console.log(res?.access_token)
            localStorage.setItem('jwt_token', res?.access_token);

            window.location.href = '/';
        })
        .catch(err => {
            alert('Login failed!');
            // localStorage.setItem('jwt_token', '');
            console.error(err.response?.data || err);
        });
});