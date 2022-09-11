// Smooth Scroll Anchor Links

function set_smooth_scroll(element, position, offset) {
	element.addEventListener('click', function(e) {
		e.preventDefault();
		target = document.querySelector(this.getAttribute('href'));
		if (position == 'start' && offset) {
			window.scrollTo({
				top: window.pageYOffset + target.getBoundingClientRect().top + offset,
				behavior: 'smooth'
			});
		} else {
			target.scrollIntoView({behavior: 'smooth', block: position, inline: (position) ? position : "center"});
		}
	})
}

function set_smooth_scroll_all(position, offset) {
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		set_smooth_scroll(anchor, position, offset)
	})
}