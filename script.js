document.addEventListener('DOMContentLoaded', function () {
    document.querySelector("#themeButton")
        .addEventListener('click', swapDarkLight);

    if (window.matchMedia
        && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        activateDarkMode();
    } else {
        activateLightMode();
    }
});

function swapDarkLight() {
    const toggleButton = document.querySelector("#themeButton");
    if (toggleButton.innerText == "Switch to Light Mode") {
        activateLightMode();
    } else {
        activateDarkMode();
    }
}

function activateDarkMode() {
    const mode = document.body.classList;
    mode.remove("light-mode");
    mode.add("dark-mode");
    document.querySelector("#themeButton").innerText = "Switch to Light Mode";
}

function activateLightMode() {
    const mode = document.body.classList;
    mode.remove("dark-mode");
    mode.add("light-mode");
    document.querySelector("#themeButton").innerText = "Switch to Dark Mode";
}
