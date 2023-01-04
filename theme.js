window.themesDefault = "linear-gradient(45deg, #0087ff, #101671)"
xhr = new XMLHttpRequest()
xhr.open('GET', 'themes.json')
xhr.onload = function() {window.themes = JSON.parse(this.responseText); window.loadThemeButtons()}
xhr.send()