xhr = new XMLHttpRequest()
xhr.open('GET', 'themes.json')
xhr.onload = function() {window.themes = JSON.parse(this.responseText); window.loadThemeButtons()}
xhr.send()