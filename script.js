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
});
