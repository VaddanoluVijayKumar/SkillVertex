document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        // Redirect if no token is found
        window.location.href = 'login.html';
        return;
    }

    // Verify token with the server
    const response = await fetch('/api/dashboard', {
        headers: { 'x-auth-token': token },
    });

    if (!response.ok) {
        // If token is invalid, remove it and redirect
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    }

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token'); // Clear the token
        window.location.href = 'login.html'; // Redirect to login
    });
});