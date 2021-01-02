'use strict'

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
const navbarMenu = document.querySelector('.navbar__menu');

navbarMenu.addEventListener("click", (e) => {
    const link = e.target.dataset.link;
    if (link == null){
        return;
    }
    document.querySelectorAll('.navbar__menu__item').forEach(item =>{
        item.classList.remove('active')
    } )
    e.target.classList.add('active');
    scrollIntoView(link)
    selectNavItem(target);
}) 
const checkpoint = 640;

window.addEventListener("scroll", () => {
const currentScroll = window.pageYOffset;
if (currentScroll <= checkpoint) {
    var opacity = 1 - currentScroll / checkpoint;
} else {
    var opacity = 0;
}
document.querySelector(".home__container").style.opacity = opacity;
});

const arrowUp = document.querySelector(".arrow-up");
document.addEventListener('scroll', () => {
        if(window.scrollY > 360){
            arrowUp.classList.add('visible');
        }else {
            arrowUp.classList.remove('visible');
        }
})

arrowUp.addEventListener('click', ()=> {
    scrollIntoView('#home');
})
document.querySelector("#toTop")
const toTop = () => {
    window.scrollTo(0,0)
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

//  Make navbar transparent when it is on the top
document.addEventListener('scroll', () => {
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else{
        navbar.classList.remove('navbar--dark')
    }
});

//Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project')
workBtnContainer.addEventListener('click', (e)=> {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null){
        return;
    }

    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');

    setTimeout(() => {
        projects.forEach((project) => {
            if(filter === '*' || filter === project.dataset.type){
                project.classList.remove('invisible');
            }
            else {
                project.classList.add('invisible');
            }
        });
    projectContainer.classList.remove('anim-out');
    },300)
})

document.querySelector('.navbar__toggle-btn').addEventListener('click', ()=>{
    navbarMenu.classList.toggle('active');
})

//Scroll & Nav

const sectionIds = ['#home', '#about', '#skills', '#work', '#testimonials', '#contact'];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));

let selectedNavIndex = 0;

let selectedNavItem = navItems[0];

function selectNavItem(selected){
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active')
}
function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior:'smooth'});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}
const observerOptions = {
    root: null,
    rootMargin:'0px',
    threshold:0.3,
}
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0) {
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            //스크롤링이 아래로 되어서 페이지가 올라옴
            if(entry.boundingClientRect.y < 0){
                selectedNavIndex = index +1;
            }else{
                selectedNavIndex = index -1;
            }
        }
    })
}
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {
    if(window.scrollY === 0){
        selectedNavIndex = 0;
    } else if (Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight){
        selectedNavIndex = navItems.length -1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});
