// Set animation duration for all "ticker" class elements based on width

function SetTickerDurations() {
	Ticker_Elements = document.getElementsByClassName("Ticker")
	for (var i = 0; i < Ticker_Elements.length; i++) {
		try {
			var duration = (Ticker_Elements.item(i).firstElementChild.firstElementChild.offsetWidth-Ticker_Elements.item(i).firstElementChild.offsetWidth)*20
			if (duration < 1000) {duration = 1000}
			Ticker_Elements.item(i).style.animationDuration = `${duration}ms`
		}
		catch {
			console.log('failed to set animation duration')
		}
	}
}

SetTickerDurations()