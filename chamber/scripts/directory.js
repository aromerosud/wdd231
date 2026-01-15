const url = 'data/members.json';

const cards = document.querySelector('#cards');
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");

const displayMembers = (members) => {
    members.forEach((member) => {
        let card = document.createElement('section');
        let portrait = document.createElement('img');
        let name = document.createElement('h3');
        let address = document.createElement("p");
        let phoneNumber = document.createElement("p");
        let webSite = document.createElement("a");

        portrait.setAttribute('src', member.image);
        portrait.setAttribute('alt', `Portrait of ${member.name}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '150');
        portrait.setAttribute('height', '60');

        name.textContent = member.name;
        address.innerHTML = `${member.address}`;
        phoneNumber.innerHTML = `${member.phonenumber}`;
        webSite.textContent = member.website;
        webSite.href = `${member.website}`;
        webSite.target = "_blank";

        card.appendChild(portrait);
        card.appendChild(name); 
        card.appendChild(address);
        card.appendChild(phoneNumber);
        card.appendChild(webSite);
        cards.appendChild(card);
    });
}

async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();
    //console.table(data.members);
    displayMembers(data.members);
}

gridbutton.addEventListener("click", () => {
    cards.classList.add("grid");
    cards.classList.remove("list");
});

listbutton.addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");
});

getMemberData();