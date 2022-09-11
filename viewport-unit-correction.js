let vh = window.innerHeight * 0.01;
function SetVH() {
	vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}
SetVH()
window.addEventListener('resize', SetVH);