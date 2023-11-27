document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const toggleButton = document.createElement('button');
    toggleButton.innerText = 'Toggle Dark Mode';
    toggleButton.addEventListener('click', toggleDarkMode);

    // Append the toggle button to the body
    document.body.appendChild(toggleButton);

    // Function to toggle dark mode
    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
    }
});
