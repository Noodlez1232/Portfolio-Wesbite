//Put all global functions in here

var hamburgerMenuIsOpen = false
var hamburgerTimeout = null;

var hamburgerClass = document.getElementById("hamburger").getAttribute("class");


function onHamburgerClick() {
    hamburger = document.getElementById("hamburger");
    hamburgerMenu = document.getElementById("hamburger-menu");
    if (!hamburgerMenuIsOpen) {
        hamburger.setAttribute("class", "transition");
        hamburgerMenu.setAttribute("class", "transition");
        hamburgerMenuIsOpen = true;
        hamburgerTimeout = setTimeout(function () {
            if (hamburgerMenuIsOpen) {
                hamburgerMenu.setAttribute("class", "");
                hamburger.setAttribute("class", "");
                hamburgerMenuIsOpen = false;
            }
        }, 5000);
    } else {
        hamburgerMenuIsOpen = false;
        hamburger.setAttribute("class", "");
        hamburgerMenu.setAttribute("class", "");
        clearTimeout(hamburgerTimeout);
    }
}
