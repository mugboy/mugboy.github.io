// Function to set theme based on system preference
function setThemeBasedOnSystemPreference() {
    const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', theme);
}

// Call the function to set the theme on page load
setThemeBasedOnSystemPreference();

// Optional: Listen for changes in the theme preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setThemeBasedOnSystemPreference);