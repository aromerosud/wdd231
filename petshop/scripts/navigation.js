const tempButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");
const titleSpan = document.querySelector("#petshop-title");
const logo = document.querySelector("#logo-header");
const icon = document.querySelector("#icon-header");

tempButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    tempButton.classList.toggle("open");

    if (navigation.classList.contains("open")) {
        titleSpan.style.display = "none";
        logo.style.display = "none";
        icon.style.display = "none";
    } else {
        titleSpan.style.display = "flex";
        logo.style.display = "flex";
        icon.style.display = "flex";
    }
});

const navLinks = document.querySelectorAll(".navigation a");

navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
    });
});