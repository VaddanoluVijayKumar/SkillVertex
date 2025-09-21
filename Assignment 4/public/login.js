document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageEl = document.getElementById('message');

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token); // Store token
        messageEl.textContent = 'Login successful!';
        messageEl.style.color = 'green';
        window.location.href = 'dashboard.html'; // Redirect to dashboard
    } else {
        messageEl.textContent = data.msg;
        messageEl.style.color = 'red';
    }
});