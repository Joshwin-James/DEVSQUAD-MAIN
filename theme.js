function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update toggle button icon and gradient
    const icon = document.querySelector('.theme-icon');
    const button = document.getElementById('theme-toggle');
    
    if (theme === 'dark') {
        icon.textContent = '☀️';
        button.style.background = 'linear-gradient(145deg, #3730a3, #1e3a8a)';
    } else {
        icon.textContent = '🌙';
        button.style.background = 'linear-gradient(145deg, #4338ca, #2563eb)';
    }
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Add click handler to toggle button
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);
});
