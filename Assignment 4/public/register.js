document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageEl = document.getElementById('message');

    const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        messageEl.textContent = 'Registration successful!';
        messageEl.style.color = 'green';
        window.location.href = 'login.html'; // Redirect to login page
    } else {
        messageEl.textContent = data.msg;
        messageEl.style.color = 'red';
    }
});