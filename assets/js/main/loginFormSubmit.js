async function loginFormSubmit(form) {
    const fd = new FormData(form);

    const data = {
        username: fd.get("username"),
        password: fd.get("password"),
    };

    try {
        const res = await axios.post("http://localhost:4000/api/auth/login", data);
        console.log("Success", res.data);
    } catch (err) {
        console.error("Error:", err);
    }
}
