window.themesDefault = {"name": "Ultra Blue", "data": "linear-gradient(45deg, #0087ff, #101671)", "mean": "#084eb8", "dark": false}
window.currentTheme = localStorage.getItem("theme") ? JSON.parse(localStorage.getItem("theme")) : window.themesDefault
document.body.style.backgroundImage = window.currentTheme.data