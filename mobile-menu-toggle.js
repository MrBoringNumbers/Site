// Mobile Nav Toggle
const mNav = document.getElementById('mobile_nav')
const navBg = document.querySelector('.nav_bg')
const nav = document.getElementById('nav')

function Toggle_Mobile_Nav() {
    if (mNav.src.includes('/assets/close.svg')) {Close_Mobile_Nav()}
    else {Open_Mobile_Nav()}
}

function Open_Mobile_Nav() {
    window.removeEventListener('scroll', checkNavBgScroll)
    navBg.classList.remove('scrolled_nav')

    nav.classList.remove('hidden');
    mNav.src = './assets/close.svg';
    document.body.style.overflow = 'hidden';
}

function Close_Mobile_Nav() {
    window.addEventListener('scroll', checkNavBgScroll)
    checkNavBgScroll();

    nav.classList.add('hidden');
    mNav.src = './assets/hamburger.svg';
    document.body.style.overflow = '';
}

// Mobile Nav Scroll Background
const minScrollElement = document.getElementsByClassName('min_scroll')[0]
window.checkNavBgScroll = function() {
    if (window.scrollY > ((minScrollElement) ? minScrollElement.offsetHeight-72 : 72)) {
        navBg.classList.add('scrolled_nav')
    } else {
        navBg.classList.remove('scrolled_nav')
    }
}
window.addEventListener('scroll', checkNavBgScroll)

// Calc Window Size
function CalcWindowSize() {
    let window_size = Math.ceil(Math.sqrt(window.innerHeight ** 2 + window.innerWidth ** 2))
    document.documentElement.style.setProperty('--window_size', `${window_size}px`);
}
CalcWindowSize()
window.addEventListener('resize', CalcWindowSize);