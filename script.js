document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.buttons input');
    const contentSections = document.querySelectorAll('.content-section');
    const navMenu = document.getElementById('navMenu');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const correspondingSection = document.getElementById(this.name);

            if (correspondingSection) {
                contentSections.forEach(section => {
                    section.style.display = 'none';
                });

                if (this.checked) {
                    correspondingSection.style.display = 'block';
                    navMenu.classList.value = 'hidden';
                } else {
                    correspondingSection.style.display = 'none';
                }

                checkboxes.forEach(otherCheckbox => {
                    if (otherCheckbox !== this) {
                        otherCheckbox.checked = false;
                    }
                });
            }

            const boxes = Array.from(checkboxes);

            if (boxes.every(item => item.checked == false)) {
                welcome = document.getElementById('welcome');
                welcome.style.display = 'block';
            }
        });
    });

    contentSections.forEach(section => {
        if (section.id == 'welcome') {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });

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

function toggleMenu() {
    navMenu.classList.toggle('hidden');
}

const blogsJson = "./blogs.json";

function loadLandingPage() {
  fetch(blogsJson)
    .then((response) => response.json())
    .then((blogs) => {
      const content = document.querySelector("#blog");
      content.innerHTML = `<h1>Learning Blogs</h1><ul>`;
      blogs.forEach((blog) => {
        content.innerHTML += `<li><a href="#" onclick="loadBlog('${blog.file}'); return false;">${blog.title}</a></li>`;
      });
      content.innerHTML += `</ul>`;
    });
}

function loadBlog(blogFile) {
  fetch(blogFile)
    .then((response) => response.text())
    .then((content) => {
      document.querySelector("#blog").innerHTML = content;
      history.pushState({ blog: blogFile }, "", `?blog=${blogFile}`);
    });
}

window.addEventListener("popstate", (event) => {
  if (event.state && event.state.blog) {
    loadBlog(event.state.blog);
  } else {
    loadLandingPage();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const blog = urlParams.get("blog");
  if (blog) {
    loadBlog(blog);
  } else {
    loadLandingPage();
  }
});

