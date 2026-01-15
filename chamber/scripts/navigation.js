const tempButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

tempButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    tempButton.classList.toggle("open");
});

const navLinks = document.querySelectorAll(".navigation a");

navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
    });
});