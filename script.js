document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.buttons input');
    const contentSections = document.querySelectorAll('.content-section');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const correspondingSection = document.getElementById(this.name);

            if (correspondingSection) {
                contentSections.forEach(section => {
                    section.style.display = 'none';
                });

                if (this.checked) {
                    correspondingSection.style.display = 'block';
                } else {
                    correspondingSection.style.display = 'none';
                }

                checkboxes.forEach(otherCheckbox => {
                    if (otherCheckbox !== this) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        });
    });

    const initialCheckbox = document.querySelector('input[name="skills"]');
    initialCheckbox.checked = true;
    initialCheckbox.dispatchEvent(new Event('change'));

    /* Set initial text of "swap-colors" button. */
    const style = document.documentElement.style;
    const darkMode = style.getPropertyValue( "--dark-base");
    const currentMode = style.getPropertyValue(
        "--base-background-color");
    const button = document.getElementById("swap-colors");

    if (currentMode == darkMode) {
        button.innerText = "Toggle Light Mode";
    } else {
        button.innerText = "Toggle Dark Mode";
    }
});


function swapColors() {
    const button = document.getElementById("swap-colors");
    const colors = document.body.classList;

    if (button.innerText == "Toggle Light Mode") {
        colors.remove("dark-mode");
        colors.add("light-mode");
        button.innerText = "Toggle Dark Mode";
    } else {
        colors.remove("light-mode");
        colors.add("dark-mode");
        button.innerText = "Toggle Light Mode";
    }
}
