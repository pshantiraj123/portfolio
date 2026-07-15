// ===== Typing Effect =====

const roles = [
    "DevOps Engineer",
    "Site Reliability Engineer",
    "AWS Engineer",
    "Kubernetes Engineer",
    "Cloud Engineer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const roleElement = document.querySelector(".hero h3");

function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!isDeleting) {
        roleElement.textContent = currentRole.substring(0, charIndex++);
    } else {
        roleElement.textContent = currentRole.substring(0, charIndex--);
    }

    let speed = 120;

    if (!isDeleting && charIndex === currentRole.length + 1) {
        isDeleting = true;
        speed = 1500;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();


// ===== Fade Animation =====

const cards = document.querySelectorAll(".card");

window.addEventListener("scroll", () => {

    cards.forEach(card => {

        const top = card.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {
            card.classList.add("show");
        }

    });

});


// ===== Scroll To Top =====

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

window.onscroll = function(){

    if(document.documentElement.scrollTop > 300){

        topBtn.style.display = "block";

    }

    else{

        topBtn.style.display = "none";

    }

}

topBtn.onclick = function(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}
