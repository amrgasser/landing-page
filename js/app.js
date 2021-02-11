/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const navbar = document.getElementById("navbar__list");
const buttons = document.querySelectorAll("button");
const sectionHeaders = document.querySelector("h2");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
// function scrollTo(hash) {
//   location.hash = "#" + hash;
// }

// Check if Element is in visualport
let  elementInViewport = (element) => {
  let top = element.offsetTop;
  let left = element.offsetLeft;
  let width = element.offsetWidth;
  let height = element.offsetHeight;

  while (element.offsetParent) {
    element = element.offsetParent;
    top += element.offsetTop;
    left += element.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    top + height <= window.pageYOffset + window.innerHeight &&
    left + width <= window.pageXOffset + window.innerWidth
  );
}

//   Changing the navbar and making it disappear if scrolling stopped
let changeNavbar= ()=> {
  
  navbar.parentElement.parentElement.style.opacity = "1";
  setTimeout( ()=> {
  navbar.parentElement.parentElement.style.opacity = "0";
  }, 2000);
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
let buildNav= ()=> {
  let sections = document.querySelectorAll("section");
  for (const section of sections) {
    let element = document.createElement("li");
    element.innerHTML = `<li class="navbar__menu menu__link"><a href="#${
      section.id
    }">${section.querySelector("h2").textContent}</a></li>`;
    navbar.appendChild(element);
  }
}

// Add class 'active' to section when near top of viewport
let activateSections = ()=>{
document.addEventListener("scroll",  ()=> {
  let sections = document.querySelectorAll("section");
  if (elementInViewport(document.querySelector('footer'))) {
    document.getElementById('scroll_btn').classList.add('show-btn')
  } else {
    document.getElementById('scroll_btn').classList.remove('show-btn')
  }

  for (const section of sections) {
    if (elementInViewport(section)) {
      section.classList.add("your-active-class");
    } else {
      section.classList.remove("your-active-class");
    }
  }
  changeNavbar();
});
}

// Scroll to anchor ID using scrollTO event
// navbar.addEventListener('click', function(event){
//     console.log(event.target.hash);
//     // window.scroll(event.target.hash);
// });
document.getElementById('scroll_btn').addEventListener('click',()=>{
  window.scrollTo(0,0)
})
/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildNav();
// Scroll to section on link click

//Done using page anchors

// Set sections as active
activateSections();

//Creating the collapsible sections

for (const button of buttons) {
  let sectionHeader = document.createElement("h2");
  button.insertAdjacentElement("beforebegin", sectionHeader);
  sectionHeader.textContent = button.nextElementSibling.querySelector("h2").textContent;
  sectionHeader.style.display="none";

  button.addEventListener("click",  ()=> {
    button.classList.toggle("active");
    button.firstChild.classList.toggle("up");
    button.firstChild.classList.toggle("down");

    if (button.classList.contains("active")) {
      button.nextElementSibling.style.display = "none";
      sectionHeader.style.display="block";

      
    } else {
      button.nextElementSibling.style.display = "block";
      sectionHeader.style.display="none";
    }
  });
}

