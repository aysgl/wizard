const progress = document.querySelector("#progress");
const circles = document.querySelectorAll(".circle");
const prev = document.querySelector("#prev")
const next = document.querySelector("#next")
const content = document.querySelectorAll(".content")
const names = document.querySelector('[name="name"]')
const surname = document.querySelector('[name="surname"]')
const number = document.querySelector('[name="number"]')
const cvv = document.querySelector('[name="cvv"]')
const date = document.querySelector('[name="date"]')
const results = document.querySelector(".results")
const alerts = document.querySelector(".alert")

let currentActive = 1;

document.addEventListener("DOMContentLoaded", () => {
    update();
});

prev.addEventListener("click", () => {
    if (currentActive > 1) {
        currentActive--;
        update();
    }
});

next.addEventListener("click", () => {
    let html = `
            <p>${names.value} ${surname.value}</p>
            <p>Thanks</p>
            `
    results.innerHTML = html;
    if (currentActive == 1) {
        if (names.value != "" && surname.value != "") {
            currentActive++;
            update();
        } else {
            showAlert("warning", "Please enter valid")
        }
    } else if (currentActive == 2) {
        if (number.value != "" && cvv.value != "" && date.value != "") {
            currentActive++;
            update();
        } else {
            showAlert("warning", "Please enter valid")
        }
    }
});

const update = () => {
    circles.forEach((circle, index) => {
        if (index < currentActive - 1) {
            circle.classList.remove("active");
        } else if (index === currentActive - 1) {
            circle.classList.add("active");
        } else {
            circle.classList.remove("active");
        }
    });

    content.forEach((contentItem, index) => {
        if (index === currentActive - 1) {
            contentItem.style.display = "block";
        } else {
            contentItem.style.display = "none";
        }
    });

    const width = (currentActive - 1) * (100 / (circles.length - 1)) + "%";
    progress.style.width = width;

    // Disable buttons based on currentActive value
    if (currentActive === 1) {
        prev.disabled = true;
    } else if (currentActive === circles.length) {
        next.disabled = true;
    } else {
        prev.disabled = false;
        next.disabled = false;
    }
};

const showAlert = (type, message) => {
    let html = ""
    html = `<div class="alert-${type}">${message}</div>`
    alerts.innerHTML = html;
    setTimeout(() => {
        alerts.innerHTML = '';
    }, 2500);
}